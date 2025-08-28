'use client'

import { useState } from 'react'
import { HashbrownProvider } from '@hashbrownai/react'
import { IngredientTextInput } from '../hb/components/IngredientTextInput.jsx'
import { QuickSelectChips } from '../hb/components/QuickSelectChips.jsx'
import { HamburgerMenu } from '../hb/components/HamburgerMenu.jsx'
import { RecipeChat } from '../hb/components/RecipeChat.jsx'

export default function HomePage() {
  const [typedIngredients, setTypedIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredientFeedback, setIngredientFeedback] = useState('')


  const allIngredients = [...typedIngredients, ...selectedIngredients]

  return (
    <HashbrownProvider url="/api/generate">
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-amber-100 border-b border-amber-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <HamburgerMenu />
          <h1 className="text-2xl font-bold text-amber-800">🧠 Breakfast Brain</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[calc(100vh-8rem)]">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <IngredientTextInput 
              onIngredientsChange={setTypedIngredients}
            />
            
            <QuickSelectChips 
              selectedIngredients={selectedIngredients}
              onSelectionChange={setSelectedIngredients}
            />

            {/* Feedback message */}
            {ingredientFeedback && (
              <div className="text-center text-amber-700 text-sm bg-amber-100 p-3 rounded-lg">
                {ingredientFeedback}
              </div>
            )}
          </div>

          {/* Right Column - Recipe Chat */}
          <div className="bg-amber-25 rounded-lg p-4">
            <RecipeChat 
              ingredients={allIngredients}
              onIngredientRequest={setIngredientFeedback}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-lg text-amber-700">
              What's in your kitchen?
            </p>
          </div>

          <IngredientTextInput 
            onIngredientsChange={setTypedIngredients}
          />
          
          <QuickSelectChips 
            selectedIngredients={selectedIngredients}
            onSelectionChange={setSelectedIngredients}
          />

          {/* Feedback message */}
          {ingredientFeedback && (
            <div className="text-center text-amber-700 text-sm bg-amber-100 p-3 rounded-lg">
              {ingredientFeedback}
            </div>
          )}

          {/* Recipe Chat */}
          <div className="bg-amber-25 rounded-lg p-4 min-h-64">
            <RecipeChat 
              ingredients={allIngredients}
              onIngredientRequest={setIngredientFeedback}
            />
          </div>
        </div>
      </main>
    </div>
    </HashbrownProvider>
  )
}