'use client'

import { useState, useEffect } from 'react'
import { HashbrownProvider } from '@hashbrownai/react'
import { HamburgerMenu } from '../../hb/components/HamburgerMenu.jsx'
import { useRouter } from 'next/navigation'

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([])
  const router = useRouter()

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = localStorage.getItem('savedRecipes')
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved recipes:', error)
        setSavedRecipes([])
      }
    }
  }, [])

  const removeRecipe = (index) => {
    const updatedRecipes = savedRecipes.filter((_, i) => i !== index)
    setSavedRecipes(updatedRecipes)
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes))
  }

  return (
    <HashbrownProvider url="/api/generate">
  <div className="min-h-screen bg-white flex flex-col items-center">
        {/* Header */}
  {/* <header className="bg-white border-b border-red-200 sticky top-0 z-30 w-full">
          <div className="container mx-auto px-4 py-4 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-black text-center">Saved Recipes</h1>
          </div>
        </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {savedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📖</span>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">No Saved Recipes Yet</h2>
            <p className="text-gray-700 mb-6">
              Save recipes from the home page to see them here!
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Find Recipes
            </a>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Your Recipe Collection</h2>
              <p className="text-gray-700">
                You have {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Scrollable Recipe List */}
            <div className="space-y-4 max-h-screen overflow-y-auto">
              {savedRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-red-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/recipe/${index}`)}
                >
                  <div className="flex">
                    {/* Recipe Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🍽️</span>
                    </div>

                    {/* Recipe Info */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black mb-1">
                            {recipe.title || recipe.name || `Recipe ${index + 1}`}
                          </h3>
                          
                          {/* Recipe Meta */}
                          <div className="flex gap-4 text-sm text-gray-600 mb-2">
                            {recipe.servings && (
                              <span className="flex items-center gap-1">
                                <span>🍽️</span>
                                {recipe.servings}
                              </span>
                            )}
                            {(recipe.time || recipe.prepTime) && (
                              <span className="flex items-center gap-1">
                                <span>⏱️</span>
                                {recipe.time || recipe.prepTime}
                              </span>
                            )}
                            {recipe.ingredients && (
                              <span className="flex items-center gap-1">
                                <span>🥘</span>
                                {recipe.ingredients.length} ingredients
                              </span>
                            )}
                          </div>

                          {/* Description Preview */}
                          {recipe.description && (
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {recipe.description}
                            </p>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeRecipe(index)
                          }}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove recipe"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      </div>
    </HashbrownProvider>
  )
}