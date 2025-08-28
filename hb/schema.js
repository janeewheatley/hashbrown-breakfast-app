export const layoutSchema = {
  type: 'object',
  properties: {
    contentType: {
      type: 'string',
      enum: ['recipe', 'menu', 'story', 'tips', 'mixed'],
      description: 'The type of breakfast content being generated'
    },
    title: {
      type: 'string',
      description: 'Main title for the content'
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['RecipeCard', 'MenuSection', 'TipCard', 'NutritionInfo', 'StorySection']
          },
          props: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              
              // RecipeCard props
              ingredients: {
                type: 'array',
                items: { type: 'string' }
              },
              instructions: {
                type: 'array',
                items: { type: 'string' }
              },
              servings: { type: 'string' },
              prepTime: { type: 'string' },
              
              // MenuSection props
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'string' },
                    allergens: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['name']
                }
              },
              
              // TipCard props
              tip: { type: 'string' },
              category: { type: 'string' },
              
              // NutritionInfo props
              calories: { type: 'number' },
              protein: { type: 'number' },
              carbs: { type: 'number' },
              fat: { type: 'number' },
              fiber: { type: 'number' },
              sugar: { type: 'number' },
              
              // StorySection props
              content: {
                oneOf: [
                  { type: 'string' },
                  {
                    type: 'array',
                    items: { type: 'string' }
                  }
                ]
              },
              mood: { type: 'string' },
              author: { type: 'string' }
            }
          }
        },
        required: ['type', 'props']
      }
    },
    metadata: {
      type: 'object',
      properties: {
        difficulty: {
          type: 'string',
          enum: ['easy', 'medium', 'hard']
        },
        cuisine: { type: 'string' },
        dietaryTags: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb', 'high-protein']
          }
        },
        estimatedTime: { type: 'string' },
        season: {
          type: 'string',
          enum: ['spring', 'summer', 'fall', 'winter', 'year-round']
        }
      }
    }
  },
  required: ['contentType', 'title', 'sections']
}