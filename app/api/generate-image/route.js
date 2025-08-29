import { getCachedImage, setCachedImage, cleanupExpiredCache } from '../utils/imageFileCache.js';

export const runtime = 'nodejs'; // ensure Node runtime (not edge)

export async function POST(req) {
  try {
    const body = await req.json();
    const { recipeTitle } = body;

    if (!recipeTitle) {
      return Response.json(
        { error: 'Recipe title is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cachedImage = await getCachedImage(recipeTitle);
    if (cachedImage) {
      console.log(`Returning cached image for: ${recipeTitle}`);
      return Response.json({
        success: true,
        image: cachedImage,
        cached: true
      });
    }

    // Check if API key is configured
    if (!process.env.STABILITY_API_KEY) {
      console.error('STABILITY_API_KEY is not configured');
      return Response.json(
        { error: 'Image generation service is not configured' },
        { status: 500 }
      );
    }

    // Periodically clean up expired cache entries
    if (Math.random() < 0.1) { // 10% chance on each request
      cleanupExpiredCache().catch(console.error);
    }

    const engineId = "stable-diffusion-xl-1024-v1-0";
    const apiHost = process.env.STABILITY_API_HOST ?? "https://api.stability.ai";

    // Create a breakfast-themed prompt based on the recipe title
    const prompt = `Professional food photography of ${recipeTitle}, breakfast dish, delicious, appetizing, on a beautiful plate, warm lighting, shallow depth of field, high quality, detailed, vibrant colors, morning light`;

    // Request an image from Stability
    const stabilityRes = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            },
            {
              text: "blurry, bad quality, distorted, ugly, bad composition, text, watermark",
              weight: -1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
          style_preset: "photographic"
        }),
      }
    );

    if (!stabilityRes.ok) {
      const errorData = await stabilityRes.json();
      console.error('Stability API error:', errorData);
      return Response.json(
        { error: `Image generation failed: ${errorData.message || 'Unknown error'}` },
        { status: stabilityRes.status }
      );
    }

    const responseData = await stabilityRes.json();
    
    if (!responseData.artifacts || responseData.artifacts.length === 0) {
      return Response.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    // Get the base64 image
    const image = responseData.artifacts[0];
    const imageDataUrl = `data:image/png;base64,${image.base64}`;
    
    // Save to cache
    await setCachedImage(recipeTitle, imageDataUrl);
    
    return Response.json({
      success: true,
      image: imageDataUrl,
      seed: image.seed,
      cached: false
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return Response.json(
      { error: 'Failed to generate image', details: error.message },
      { status: 500 }
    );
  }
}