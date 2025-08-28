import { useState } from 'react'

export const IngredientTextInput = ({ onIngredientsChange, placeholder = "Enter ingredients separated by commas..." }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    
    // Parse ingredients from comma-separated string
    const ingredients = newValue
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0)
    
    onIngredientsChange(ingredients)
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
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
        rows={3}
      />
      <p className="text-xs text-amber-600 mt-1">
        Separate multiple ingredients with commas
      </p>
    </div>
  )
}