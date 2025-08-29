import { useState, useEffect } from 'react';
import { generateRecipeImage } from '../utils/generateImage';
import { isImageGenerationEnabled } from '../utils/checkApiConfig';

export const RecipeCard = ({ 
  recipe, 
  onSave,
  className = ""
}) => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState(null);

  // Auto-generate image when recipe is loaded
  useEffect(() => {
    if (!recipe) return;
    
    const recipeTitle = recipe.title || recipe.name;
    if (!recipeTitle) return;

    // If recipe already has an image, use it
    if (recipe.image) {
      setRecipeImage(recipe.image);
      return;
    }

    // Otherwise, auto-generate the image if API is configured
    const generateImageAsync = async () => {
      // First check if image generation is enabled
      const isEnabled = await isImageGenerationEnabled();
      if (!isEnabled) {
        console.log('Image generation is not configured');
        return;
      }

      // Check if we already have an image being generated or error state
      if (isGeneratingImage || imageError) return;
      
      setIsGeneratingImage(true);
      setImageError(null);
      
      try {
        const image = await generateRecipeImage(recipeTitle);
        setRecipeImage(image);
      } catch (error) {
        // Only log error, don't show it to user for auto-generation
        console.error('Auto-generation failed:', error);
        // Don't set error state for auto-generation to avoid UI clutter
        // Users can still manually trigger generation if needed
      } finally {
        setIsGeneratingImage(false);
      }
    };

    // Auto-generate image
    generateImageAsync();
  }, [recipe]);

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
      // Include the generated image if available
      const recipeWithImage = recipeImage 
        ? { ...recipe, image: recipeImage }
        : recipe;
      onSave(recipeWithImage)
    }
  }

  // Handle both title and name properties
  const recipeTitle = recipe.title || recipe.name || "Delicious Breakfast Recipe"
  
  // Ensure arrays for ingredients and directions/instructions
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
  const directions = recipe.directions || recipe.instructions || []
  const directionsArray = Array.isArray(directions) ? directions : []

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden ${className}`}>
      {/* Recipe Image */}
      <div className="w-full h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
        {recipeImage ? (
          <img 
            src={recipeImage} 
            alt={recipeTitle}
            className="w-full h-full object-cover"
          />
        ) : isGeneratingImage ? (
          <div className="text-center text-red-800">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm opacity-75">Generating image...</p>
          </div>
        ) : (
          <div className="text-center text-red-800">
            <span className="text-4xl mb-2 block">🍽️</span>
            <p className="text-sm opacity-75">Recipe Image</p>
          </div>
        )}
        {imageError && (
          <div className="absolute bottom-2 left-2 right-2 bg-red-600 text-white text-xs p-2 rounded">
            {imageError}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Recipe Title */}
        <h2 className="text-2xl font-bold text-black mb-4">{recipeTitle}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Servings, Time, Ingredients */}
          <div className="space-y-4">
            {/* Servings and Time */}
            <div className="flex gap-4 text-sm text-gray-700">
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <span>🍽️</span>
                  <span className="font-medium">{recipe.servings}</span>
                </div>
              )}
              {(recipe.time || recipe.prepTime) && (
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span className="font-medium">{recipe.time || recipe.prepTime}</span>
                </div>
              )}
            </div>

            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Ingredients</h3>
                <ul className="space-y-1">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-800 animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                      <span className="text-red-600 mt-1 text-sm">•</span>
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
            {directionsArray.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {recipe.directions ? 'Directions' : 'Instructions'}
                </h3>
                <ol className="space-y-2">
                  {directionsArray.map((direction, index) => (
                    <li key={index} className="flex gap-3 text-gray-800 animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                      <span className="bg-red-200 text-red-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{direction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Save Button */}
            {onSave && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Save Recipe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description if exists */}
        {recipe.description && (
          <div className="mt-6 pt-4 border-t border-red-100">
            <p className="text-gray-800 leading-relaxed">{recipe.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}