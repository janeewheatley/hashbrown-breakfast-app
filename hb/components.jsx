import * as Separator from '@radix-ui/react-separator'
import * as Label from '@radix-ui/react-label'

export const components = {
  RecipeCard: ({ title, description, ingredients, instructions, servings, prepTime }) => (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-amber-900">{title}</h3>
        <div className="flex gap-4 text-sm text-amber-700">
          {servings && <span>🍽️ {servings} servings</span>}
          {prepTime && <span>⏱️ {prepTime}</span>}
        </div>
      </div>
      
      {description && (
        <p className="text-amber-800 mb-4 leading-relaxed">{description}</p>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {ingredients && ingredients.length > 0 && (
          <div>
            <Label.Root className="text-lg font-semibold text-amber-900 block mb-3">
              Ingredients
            </Label.Root>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-amber-800">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {instructions && instructions.length > 0 && (
          <div>
            <Label.Root className="text-lg font-semibold text-amber-900 block mb-3">
              Instructions
            </Label.Root>
            <ol className="space-y-3">
              {instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-amber-800">
                  <span className="bg-amber-200 text-amber-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  ),

  MenuSection: ({ title, items, description }) => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">{title}</h3>
        {description && (
          <p className="text-amber-700 text-lg">{description}</p>
        )}
      </div>
      
      <Separator.Root className="bg-amber-300 h-px w-full my-6" />
      
      <div className="grid gap-4">
        {items && items.map((item, index) => (
          <div key={index} className="flex justify-between items-start bg-white/50 rounded-lg p-4 border border-amber-100">
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 text-lg">{item.name}</h4>
              {item.description && (
                <p className="text-amber-700 mt-1">{item.description}</p>
              )}
              {item.allergens && (
                <p className="text-xs text-amber-600 mt-2">
                  Contains: {item.allergens.join(', ')}
                </p>
              )}
            </div>
            {item.price && (
              <span className="font-bold text-amber-900 text-lg ml-4">
                {item.price}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  ),

  TipCard: ({ title, tip, category }) => (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">💡</span>
        <h4 className="font-semibold text-amber-900">{title}</h4>
        {category && (
          <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        )}
      </div>
      <p className="text-amber-800 leading-relaxed">{tip}</p>
    </div>
  ),

  NutritionInfo: ({ calories, protein, carbs, fat, fiber, sugar }) => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
        <span>🥗</span>
        Nutrition Information (per serving)
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {calories && (
          <div className="flex justify-between">
            <span className="text-green-700">Calories:</span>
            <span className="font-medium text-green-900">{calories}</span>
          </div>
        )}
        {protein && (
          <div className="flex justify-between">
            <span className="text-green-700">Protein:</span>
            <span className="font-medium text-green-900">{protein}g</span>
          </div>
        )}
        {carbs && (
          <div className="flex justify-between">
            <span className="text-green-700">Carbs:</span>
            <span className="font-medium text-green-900">{carbs}g</span>
          </div>
        )}
        {fat && (
          <div className="flex justify-between">
            <span className="text-green-700">Fat:</span>
            <span className="font-medium text-green-900">{fat}g</span>
          </div>
        )}
        {fiber && (
          <div className="flex justify-between">
            <span className="text-green-700">Fiber:</span>
            <span className="font-medium text-green-900">{fiber}g</span>
          </div>
        )}
        {sugar && (
          <div className="flex justify-between">
            <span className="text-green-700">Sugar:</span>
            <span className="font-medium text-green-900">{sugar}g</span>
          </div>
        )}
      </div>
    </div>
  ),

  StorySection: ({ title, content, mood, author }) => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-purple-900 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-purple-700">
          {mood && <span className="flex items-center gap-1">✨ {mood}</span>}
          {author && <span className="flex items-center gap-1">👤 {author}</span>}
        </div>
      </div>
      <div className="prose prose-purple max-w-none">
        {Array.isArray(content) ? (
          content.map((paragraph, index) => (
            <p key={index} className="text-purple-800 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-purple-800 leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  )
}