import { useState } from 'react'
import { useStructuredCompletion } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'

export const QuickSelectChips = ({ selectedIngredients = [], onSelectionChange }) => {
  const [selected, setSelected] = useState(new Set(selectedIngredients))
  const { output } = useStructuredCompletion({
    debugName: 'CommonIngredients',
    model: 'gpt-4.1',
    system: `You are a helpful assistant that suggests common breakfast ingredients.`,
    input: 'List common breakfast ingredients.',
    schema: s.streaming.array('The list of common breakfast ingredients', s.string('An ingredient name')),
  })

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
        {output && output.map((ingredient) => {
          const isSelected = selected.has(ingredient)
          return (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                isSelected
                  ? 'bg-red-500 text-white border-red-500 shadow-md opacity-100'
                  : 'bg-white text-black border-red-200 hover:border-red-300 opacity-70 hover:opacity-90'
              }`}
            >
              {ingredient}
            </button>
          )
        })}
      </div>
      {selected.size > 0 && (
        <div className="mt-3 p-2 bg-red-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <span className="font-medium">Selected:</span>{' '}
            {Array.from(selected).join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}