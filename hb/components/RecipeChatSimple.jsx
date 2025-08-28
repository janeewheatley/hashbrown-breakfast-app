import { useState, useCallback, useEffect } from 'react'
import { useStructuredCompletion } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { RecipeCard } from './RecipeCard.jsx'

export const RecipeChatSimple = ({ ingredients, onIngredientRequest, onReady }) => {
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Use structured completion for recipe generation
  const { output: recipe, isLoading } = useStructuredCompletion({
    debugName: 'RecipeGenerator',
    model: 'gpt-4.1',
    system: `You are a creative breakfast chef assistant. Generate delicious breakfast recipes based on the ingredients users provide.
      Create engaging breakfast recipes that use the provided ingredients creatively.
      Always include clear ingredients lists, step-by-step directions, servings, and cooking time.`,
    input: currentPrompt,
    schema: s.object('Recipe', {
      title: s.string('Recipe title'),
      description: s.string('Brief description'),
      servings: s.string('Number of servings'),
      prepTime: s.string('Preparation time'),
      ingredients: s.array('List of ingredients', s.string('Ingredient')),
      instructions: s.array('Cooking instructions', s.string('Instruction step'))
    }),
    enabled: currentPrompt !== '' && isGenerating
  })
  
  const generateRecipe = useCallback((ingredientList) => {
    if (!ingredientList || ingredientList.length === 0) {
      if (onIngredientRequest) {
        onIngredientRequest('Please select some ingredients first!')
      }
      return
    }
    
    const prompt = `Create a delicious breakfast recipe using these ingredients: ${ingredientList.join(', ')}`
    setCurrentPrompt(prompt)
    setIsGenerating(true)
  }, [onIngredientRequest])
  
  // Stop generating once we have output
  useEffect(() => {
    if (recipe && isGenerating) {
      setIsGenerating(false)
    }
  }, [recipe, isGenerating])
  
  // Expose generateRecipe function to parent component
  useEffect(() => {
    if (onReady) {
      onReady({ generateRecipe })
    }
  }, [onReady, generateRecipe])
  
  // Handle save
  const handleSaveRecipe = (recipeData) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    savedRecipes.push({
      ...recipeData,
      savedAt: new Date().toISOString()
    })
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
    if (onIngredientRequest) {
      onIngredientRequest('Recipe saved successfully!')
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Working indicator */}
      {isLoading && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-gray-700 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-300 border-t-red-600"></div>
            Thinking about your ingredients...
          </div>
        </div>
      )}
      
      {/* Recipe Display */}
      <div className="flex-1 overflow-y-auto">
        {recipe ? (
          <RecipeCard 
            recipe={recipe} 
            onSave={handleSaveRecipe}
          />
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍳</span>
            </div>
            <p>Select ingredients and I'll create a recipe for you!</p>
          </div>
        )}
      </div>
      
      {/* Manual Generate Button (if needed) */}
      {ingredients && ingredients.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => generateRecipe(ingredients)}
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {isLoading ? 'Creating Recipe...' : 'Generate New Recipe'}
          </button>
        </div>
      )}
    </div>
  )
}