import { HashbrownOpenAI } from '@hashbrownai/openai';

export const runtime = 'nodejs'; // ensure Node runtime (not edge)

export async function POST(req) {
  const body = await req.json()

  const stream = HashbrownOpenAI.stream.text({
    apiKey: process.env.OPENAI_API_KEY,
    request: body,
  });

  // Transform the stream into a Web standard ReadableStream
  const transformStream = new TransformStream();
  const writer = transformStream.writable.getWriter();
  
  // Process the stream in the background
  (async () => {
    try {
      for await (const chunk of stream) {
        await writer.write(chunk);
      }
    } catch (error) {
      console.error('Stream error:', error);
    } finally {
      await writer.close();
    }
  })();

  // Return the stream as a response
  return new Response(transformStream.readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}