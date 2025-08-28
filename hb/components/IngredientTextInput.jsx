import { useState } from 'react'

export const IngredientTextInput = ({ onIngredientsChange, onSubmit, placeholder = "Enter ingredients separated by commas..." }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    
    // Parse ingredients from comma-separated string
    const ingredients = newValue
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0)
    
    // Update parent component with current ingredients (for display purposes)
    if (onIngredientsChange) {
      onIngredientsChange(ingredients)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      
      // Parse and submit ingredients
      const ingredients = value
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0)
      
      if (ingredients.length > 0 && onSubmit) {
        onSubmit(ingredients)
      }
    }
  }

  return (
    <div className="w-full">
      <label htmlFor="ingredients" className="block text-sm font-medium text-amber-900 mb-2">
        What ingredients do you have?
      </label>
      <textarea
        id="ingredients"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        rows={3}
      />
      <p className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded mt-1 inline-block">
        Separate multiple ingredients with commas
      </p>
    </div>
  )
}