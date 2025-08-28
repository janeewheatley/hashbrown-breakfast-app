import { z } from 'zod'

export const generateRequestSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt is required')
    .max(2000, 'Prompt must be less than 2000 characters')
    .refine(
      (prompt) => prompt.trim().length > 0,
      'Prompt cannot be empty or just whitespace'
    ),
  
  options: z.object({
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().min(1).max(4000).optional(),
    includeNutrition: z.boolean().optional(),
    dietaryRestrictions: z.array(z.string()).optional(),
    complexity: z.enum(['simple', 'moderate', 'complex']).optional(),
    contentType: z.enum(['recipe', 'menu', 'story', 'tips', 'mixed']).optional()
  }).optional()
})

export const recipeIngredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.string().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  isOptional: z.boolean().default(false)
})

export const recipeInstructionSchema = z.object({
  step: z.number().min(1),
  instruction: z.string().min(1, 'Instruction text is required'),
  duration: z.string().optional(),
  temperature: z.string().optional(),
  tips: z.array(z.string()).optional()
})

export const recipeSchema = z.object({
  title: z.string().min(1, 'Recipe title is required'),
  description: z.string().optional(),
  servings: z.string().or(z.number()).optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  
  ingredients: z.array(recipeIngredientSchema).min(1, 'At least one ingredient is required'),
  instructions: z.array(recipeInstructionSchema).min(1, 'At least one instruction is required'),
  
  nutrition: z.object({
    calories: z.number().min(0).optional(),
    protein: z.number().min(0).optional(),
    carbs: z.number().min(0).optional(),
    fat: z.number().min(0).optional(),
    fiber: z.number().min(0).optional(),
    sugar: z.number().min(0).optional(),
    sodium: z.number().min(0).optional()
  }).optional(),
  
  tags: z.array(z.string()).optional(),
  cuisine: z.string().optional(),
  category: z.array(z.string()).optional(),
  
  tips: z.array(z.string()).optional(),
  variations: z.array(z.string()).optional(),
  storage: z.string().optional(),
  
  allergens: z.array(z.enum([
    'dairy', 'eggs', 'gluten', 'nuts', 'soy', 'shellfish', 'fish', 'sesame'
  ])).optional()
})

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Menu item name is required'),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  
  allergens: z.array(z.string()).optional(),
  dietaryTags: z.array(z.enum([
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb', 'high-protein'
  ])).optional(),
  
  spiceLevel: z.enum(['mild', 'medium', 'hot', 'very-hot']).optional(),
  availability: z.enum(['always', 'seasonal', 'weekend-only', 'limited']).optional(),
  
  nutrition: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional()
  }).optional()
})

export const menuSectionSchema = z.object({
  title: z.string().min(1, 'Menu section title is required'),
  description: z.string().optional(),
  items: z.array(menuItemSchema).min(1, 'At least one menu item is required'),
  displayOrder: z.number().optional()
})

export const nutritionFactsSchema = z.object({
  servingSize: z.string().optional(),
  servingsPerContainer: z.number().optional(),
  
  calories: z.number().min(0).optional(),
  caloriesFromFat: z.number().min(0).optional(),
  
  totalFat: z.number().min(0).optional(),
  saturatedFat: z.number().min(0).optional(),
  transFat: z.number().min(0).optional(),
  
  cholesterol: z.number().min(0).optional(),
  sodium: z.number().min(0).optional(),
  
  totalCarbs: z.number().min(0).optional(),
  dietaryFiber: z.number().min(0).optional(),
  sugars: z.number().min(0).optional(),
  addedSugars: z.number().min(0).optional(),
  
  protein: z.number().min(0).optional(),
  
  vitaminA: z.number().min(0).optional(),
  vitaminC: z.number().min(0).optional(),
  calcium: z.number().min(0).optional(),
  iron: z.number().min(0).optional(),
  
  percentDailyValues: z.record(z.string(), z.number()).optional()
})

export const tipSchema = z.object({
  title: z.string().min(1, 'Tip title is required'),
  content: z.string().min(1, 'Tip content is required'),
  category: z.enum(['cooking', 'prep', 'storage', 'nutrition', 'technique', 'ingredient', 'equipment']).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  tags: z.array(z.string()).optional()
})

export const storySchema = z.object({
  title: z.string().min(1, 'Story title is required'),
  content: z.union([
    z.string(),
    z.array(z.string())
  ]).refine(
    (content) => {
      if (typeof content === 'string') return content.trim().length > 0
      return Array.isArray(content) && content.length > 0 && content.every(p => p.trim().length > 0)
    },
    'Story content cannot be empty'
  ),
  author: z.string().optional(),
  mood: z.enum(['nostalgic', 'humorous', 'heartwarming', 'adventurous', 'cozy', 'inspiring']).optional(),
  setting: z.string().optional(),
  characters: z.array(z.string()).optional(),
  theme: z.string().optional(),
  wordCount: z.number().min(0).optional()
})