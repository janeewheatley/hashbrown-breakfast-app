'use client'

import { useState, useEffect } from 'react'
import { HashbrownProvider } from '@hashbrownai/react'
import { IngredientTextInput } from '../hb/components/IngredientTextInput.jsx'
import { QuickSelectChips } from '../hb/components/QuickSelectChips.jsx'
import { HamburgerMenu } from '../hb/components/HamburgerMenu.jsx'
import { RecipeChatSimple as RecipeChat } from '../hb/components/RecipeChatSimple.jsx'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [typedIngredients, setTypedIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredientFeedback, setIngredientFeedback] = useState('')
  const [recipeChatRef, setRecipeChatRef] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const allIngredients = [...typedIngredients, ...selectedIngredients]
  
  const handleGenerateRecipe = (ingredients) => {
    if (recipeChatRef && recipeChatRef.generateRecipe) {
      recipeChatRef.generateRecipe(ingredients)
    }
  }
  
  // Prevent SSR issues by not rendering HashbrownProvider until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-700">Loading...</div>
      </div>
    )
  }

  return (
    <HashbrownProvider url="/api/generate">
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 bg-white">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[calc(100vh-8rem)]">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <IngredientTextInput 
              onIngredientsChange={setTypedIngredients}
              onSubmit={handleGenerateRecipe}
            />
            
            <QuickSelectChips 
              selectedIngredients={selectedIngredients}
              onSelectionChange={setSelectedIngredients}
            />

            {/* Feedback message */}
            {ingredientFeedback && (
              <div className="text-center text-red-700 text-sm bg-red-100 p-3 rounded-lg">
                {ingredientFeedback}
              </div>
            )}
          </div>

          {/* Right Column - Recipe Chat */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <RecipeChat 
              ingredients={allIngredients}
              onIngredientRequest={setIngredientFeedback}
              onReady={setRecipeChatRef}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6 max-w-lg mx-auto">
          {/* <div className="text-center">
            <p className="text-lg font-bold text-black">
              What's in your kitchen?
            </p>
          </div> */}

          <IngredientTextInput 
            onIngredientsChange={setTypedIngredients}
            onSubmit={handleGenerateRecipe}
          />
          
          <QuickSelectChips 
            selectedIngredients={selectedIngredients}
            onSelectionChange={setSelectedIngredients}
          />

          {/* Feedback message */}
          {ingredientFeedback && (
            <div className="text-center text-red-700 text-sm bg-red-100 p-3 rounded-lg">
              {ingredientFeedback}
            </div>
          )}

          {/* Recipe Chat */}
          <div className="bg-white rounded-lg p-4 min-h-64 border border-gray-200 shadow-sm">
            <RecipeChat 
              ingredients={allIngredients}
              onIngredientRequest={setIngredientFeedback}
              onReady={setRecipeChatRef}
            />
          </div>
        </div>
      </main>
    </div>
    </HashbrownProvider>
  )
}