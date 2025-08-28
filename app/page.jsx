'use client'

import { useState } from 'react'
import { useTool } from '@hashbrownai/react'
import { components } from '../hb/components.jsx'
import { functions } from '../hb/functions.js'

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState(null)
  
  // Use the simplified getRecipe function
  const { execute: getRecipe, isLoading } = useTool(functions.getRecipe)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    try {
      const content = await getRecipe({ input: prompt.trim() })
      setGeneratedContent(content)
    } catch (error) {
      console.error('Generation failed:', error)
      setGeneratedContent({ error: 'Failed to generate content. Please try again.' })
    }
  }

  const renderContent = (content) => {
    if (!content || !content.sections) {
      return <div className="text-amber-800">{JSON.stringify(content, null, 2)}</div>
    }

    return (
      <div className="space-y-6">
        {content.title && (
          <h3 className="text-2xl font-bold text-amber-900 mb-4">{content.title}</h3>
        )}
        
        {content.sections?.map((section, index) => {
          const Component = components[section.type]
          if (!Component) {
            return (
              <div key={index} className="text-red-600">
                Unknown component type: {section.type}
              </div>
            )
          }
          
          return <Component key={index} {...section.props} />
        })}
        
        {content.metadata && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h4 className="font-semibold text-amber-800 mb-2">Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-amber-700">
              {content.metadata.difficulty && (
                <div>Difficulty: <span className="font-medium">{content.metadata.difficulty}</span></div>
              )}
              {content.metadata.estimatedTime && (
                <div>Time: <span className="font-medium">{content.metadata.estimatedTime}</span></div>
              )}
              {content.metadata.cuisine && (
                <div>Cuisine: <span className="font-medium">{content.metadata.cuisine}</span></div>
              )}
              {content.metadata.dietaryTags && (
                <div className="col-span-2">
                  Tags: {content.metadata.dietaryTags.map(tag => (
                    <span key={tag} className="inline-block bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-800">🧠 Breakfast Brain</h1>
        <p className="text-lg text-amber-700">
          Generate breakfast-themed content with AI
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-amber-900 mb-2">
            What would you like to create?
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a breakfast recipe, menu, or story..."
            className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows={4}
            disabled={isLoading}
          />
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {generatedContent && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">Generated Content</h2>
          {generatedContent.error ? (
            <p className="text-red-600">{generatedContent.error}</p>
          ) : (
            <div className="prose prose-amber max-w-none">
              {renderContent(generatedContent)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}