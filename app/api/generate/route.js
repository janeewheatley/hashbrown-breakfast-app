import { NextResponse } from 'next/server'
import { HashbrownOpenAI } from '@hashbrownai/openai'
import { layoutSchema } from '../../../hb/schema.js'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate request
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request format: prompt is required and must be a string' },
        { status: 400 }
      )
    }

    const { prompt } = body
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing API credentials' },
        { status: 500 }
      )
    }

    // Generate breakfast-themed content using Hashbrown streaming pattern
    const systemPrompt = `You are a creative breakfast expert. Generate engaging, breakfast-themed content that's informative and delicious. 
    Focus on recipes, cooking tips, breakfast stories, or menu ideas. Keep responses warm and inviting.
    Structure your response using the provided schema for better presentation.`

    const completionParams = {
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'breakfast_content',
          schema: layoutSchema
        }
      }
    }

    // Use HashbrownOpenAI.stream.text pattern
    const response = HashbrownOpenAI.stream.text({
      apiKey: OPENAI_API_KEY,
      request: completionParams,
    })

    let content = ''
    for await (const chunk of response) {
      content += chunk
    }

    if (!content) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    let parsedContent
    try {
      parsedContent = JSON.parse(content)
    } catch (parseError) {
      // Fallback to plain text if JSON parsing fails
      parsedContent = { type: 'text', content }
    }

    return NextResponse.json({
      content: parsedContent,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API Error:', error)
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}