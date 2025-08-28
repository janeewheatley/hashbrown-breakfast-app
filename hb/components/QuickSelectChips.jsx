import { useState } from 'react'

const COMMON_INGREDIENTS = [
  'Eggs', 'Bacon', 'Bread', 'Butter', 'Milk', 'Cheese',
  'Flour', 'Sugar', 'Salt', 'Pepper', 'Oil', 'Onions',
  'Potatoes', 'Tomatoes', 'Spinach', 'Mushrooms',
  'Oats', 'Bananas', 'Berries', 'Yogurt', 'Honey',
  'Avocado', 'Ham', 'Sausage', 'Bell Peppers'
]

export const QuickSelectChips = ({ selectedIngredients = [], onSelectionChange }) => {
  const [selected, setSelected] = useState(new Set(selectedIngredients))

  const toggleIngredient = (ingredient) => {
    const newSelected = new Set(selected)
    
    if (newSelected.has(ingredient)) {
      newSelected.delete(ingredient)
    } else {
      newSelected.add(ingredient)
    }
    
    setSelected(newSelected)
    onSelectionChange(Array.from(newSelected))
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-amber-900 mb-3">
        Or select common ingredients:
      </label>
      <div className="flex flex-wrap gap-2">
        {COMMON_INGREDIENTS.map((ingredient) => {
          const isSelected = selected.has(ingredient)
          return (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md opacity-100'
                  : 'bg-white text-amber-700 border-amber-200 hover:border-amber-300 opacity-70 hover:opacity-90'
              }`}
            >
              {ingredient}
            </button>
          )
        })}
      </div>
      {selected.size > 0 && (
        <div className="mt-3 p-2 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <span className="font-medium">Selected:</span>{' '}
            {Array.from(selected).join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}