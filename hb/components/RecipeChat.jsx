import { useMemo, useEffect, useCallback } from 'react'
import { useUiChat } from '@hashbrownai/react'
import { functions } from '../functions.js'
import { allExposedComponents } from '../exposed-components.jsx'
import { RichMessage } from './RichMessage.jsx'

export const RecipeChat = ({ ingredients, onIngredientRequest, onReady }) => {
  // Hashbrown UI Chat for enhanced recipe generation
  const {
    messages,
    sendMessage,
    isSending,
    isReceiving,
    isRunningToolCalls,
  } = useUiChat({
    model: 'gpt-4.1',
    debugName: 'RecipeGenerator',
    system: `
      You are a creative breakfast chef assistant. Generate delicious breakfast recipes based on the ingredients users provide.
      
      When users provide ingredients, create engaging breakfast recipes that use those ingredients creatively.
      Format recipes with clear ingredients lists, step-by-step directions, servings, and cooking time.
      
      Always respond with structured recipe data that includes:
      - title (recipe name)
      - ingredients (array of ingredient strings)
      - directions or instructions (array of step strings)  
      - servings (string like "2-4 servings")
      - time or prepTime (string like "20 minutes")
      - description (brief description of the recipe)

      Use the RecipeCard component to display recipes in an appealing format.
      Be enthusiastic about breakfast and cooking!
      
      Always generate recipes as UI components using the RecipeCard component for better presentation.
    `,
    tools: [functions.getRecipe],
    components: allExposedComponents,
  })

  const isWorking = useMemo(() => {
    return isSending || isReceiving || isRunningToolCalls
  }, [isSending, isReceiving, isRunningToolCalls])

  const generateRecipe = useCallback((ingredientList) => {
    if (!ingredientList || ingredientList.length === 0) {
      if (onIngredientRequest) {
        onIngredientRequest('Please select some ingredients first!')
      }
      return
    }
    
    // Check if sendMessage is available
    if (!sendMessage) {
      console.error('sendMessage is not available from useUiChat')
      if (onIngredientRequest) {
        onIngredientRequest('Recipe generation is not available at the moment')
      }
      return
    }
    
    const messageContent = `Create a delicious breakfast recipe using these ingredients: ${ingredientList.join(', ')}`
    
    try {
      // Send message to Hashbrown UI Chat system - sendMessage expects just the content string
      sendMessage(messageContent)
    } catch (error) {
      console.error('Error sending message:', error)
      if (onIngredientRequest) {
        onIngredientRequest('Failed to generate recipe. Please try again.')
      }
    }
  }, [sendMessage, onIngredientRequest])

  // Remove auto-generation - only generate on explicit user action
  
  // Expose generateRecipe function to parent component
  useEffect(() => {
    if (onReady && generateRecipe) {
      onReady({ generateRecipe })
    }
  }, [onReady, generateRecipe])

  return (
    <div className="flex flex-col h-full">
      {/* Working indicator */}
      {isWorking && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-amber-700 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-300 border-t-red-600"></div>
            Thinking about your ingredients...
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-black-600 mt-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍳</span>
            </div>
            <p>Select ingredients and I'll create a recipe for you!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <RichMessage
              key={index}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))
        )}
      </div>

      {/* Manual Generate Button (if needed) */}
      {ingredients && ingredients.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => generateRecipe(ingredients)}
            disabled={isWorking}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {isWorking ? 'Creating Recipe...' : 'Generate New Recipe'}
          </button>
        </div>
      )}
    </div>
  )
}