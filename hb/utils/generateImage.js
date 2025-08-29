export async function generateRecipeImage(recipeTitle) {
  console.log('Requesting image for recipe title:', recipeTitle);
  
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeTitle }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate image');
    }

    if (data.cached) {
      console.log('Using cached image');
    } else {
      console.log('Generated new image');
    }

    return data.image; // Returns base64 data URL
  } catch (error) {
    console.error('Error getting recipe image:', error);
    throw error;
  }
}