'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RecipeCard } from '@/hb/components/RecipeCard'

export default function RecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = localStorage.getItem('savedRecipes')
    if (saved) {
      try {
        const recipes = JSON.parse(saved)
        const recipeIndex = parseInt(params.id)
        
        if (recipes[recipeIndex]) {
          setRecipe(recipes[recipeIndex])
        } else {
          // Recipe not found, redirect to saved recipes
          router.push('/saved-recipes')
        }
      } catch (error) {
        console.error('Error loading recipe:', error)
        router.push('/saved-recipes')
      }
    } else {
      // No saved recipes, redirect
      router.push('/saved-recipes')
    }
    setLoading(false)
  }, [params.id, router])

  const handleRemoveRecipe = () => {
    const saved = localStorage.getItem('savedRecipes')
    if (saved) {
      try {
        const recipes = JSON.parse(saved)
        const recipeIndex = parseInt(params.id)
        const updatedRecipes = recipes.filter((_, i) => i !== recipeIndex)
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes))
        router.push('/saved-recipes')
      } catch (error) {
        console.error('Error removing recipe:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-2xl">🍳</span>
          </div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button and actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/saved-recipes')}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Saved Recipes</span>
          </button>
          
          <button
            onClick={handleRemoveRecipe}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Remove Recipe</span>
          </button>
        </div>

        {/* Recipe Card without save button */}
        <RecipeCard recipe={recipe} />
      </div>
    </div>
  )
}