export const RecipeCard = ({ 
  recipe, 
  onSave,
  className = ""
}) => {
  if (!recipe) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-red-200 p-6 ${className}`}>
        <div className="text-center text-red-600">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍳</span>
          </div>
          <p>Enter ingredients to get recipe suggestions!</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    if (onSave) {
      onSave(recipe)
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden ${className}`}>
      {/* Recipe Image */}
      <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
        <div className="text-center text-amber-800">
          <span className="text-4xl mb-2 block">🍽️</span>
          <p className="text-sm opacity-75">Recipe Image</p>
        </div>
      </div>

      <div className="p-6">
        {/* Recipe Title */}
        <h2 className="text-2xl font-bold text-amber-900 mb-4">{recipe.title || recipe.name}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Servings, Time, Ingredients */}
          <div className="space-y-4">
            {/* Servings and Time */}
            <div className="flex gap-4 text-sm text-amber-700">
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <span>🍽️</span>
                  <span className="font-medium">{recipe.servings} servings</span>
                </div>
              )}
              {recipe.time && (
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span className="font-medium">{recipe.time}</span>
                </div>
              )}
              {recipe.prepTime && (
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span className="font-medium">{recipe.prepTime}</span>
                </div>
              )}
            </div>

            {/* Ingredients List */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Ingredients</h3>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 text-amber-800">
                      <span className="text-amber-600 mt-1 text-sm">•</span>
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Directions */}
          <div className="space-y-4">
            {/* Directions */}
            {recipe.directions && recipe.directions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Directions</h3>
                <ol className="space-y-2">
                  {recipe.directions.map((direction, index) => (
                    <li key={index} className="flex gap-3 text-amber-800">
                      <span className="bg-amber-200 text-amber-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{direction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {recipe.instructions && recipe.instructions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Instructions</h3>
                <ol className="space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-amber-800">
                      <span className="bg-amber-200 text-amber-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Save Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Description if exists */}
        {recipe.description && (
          <div className="mt-6 pt-4 border-t border-red-100">
            <p className="text-amber-800 leading-relaxed">{recipe.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}