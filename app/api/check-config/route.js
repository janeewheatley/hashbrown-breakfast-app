export const runtime = 'nodejs';

export async function GET() {
  return Response.json({
    imageGenerationEnabled: !!process.env.STABILITY_API_KEY
  });
}