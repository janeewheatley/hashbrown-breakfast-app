import { s } from '@hashbrownai/core'

export const generateRequestSchema = s.object('Generate request', {
  prompt: s.string('The user prompt for content generation')
})

export const recipeIngredientSchema = s.object('Recipe ingredient', {
  name: s.string('Ingredient name')
})

export const recipeInstructionSchema = s.object('Recipe instruction', {
  step: s.number('Step number'),
  instruction: s.string('Instruction text')
})

export const recipeSchema = s.object('Recipe', {
  title: s.string('Recipe title'),
  ingredients: s.array('Recipe ingredients', recipeIngredientSchema),
  instructions: s.array('Recipe instructions', recipeInstructionSchema)
})

export const menuItemSchema = s.object('Menu item', {
  name: s.string('Menu item name')
})

export const menuSectionSchema = s.object('Menu section', {
  title: s.string('Section title'),
  items: s.array('Menu items', menuItemSchema)
})

export const nutritionFactsSchema = s.object('Nutrition facts', {
  calories: s.number('Calories')
})

export const tipSchema = s.object('Cooking tip', {
  title: s.string('Tip title'),
  content: s.string('Tip content')
})

export const storySchema = s.object('Breakfast story', {
  title: s.string('Story title'),
  content: s.string('Story content')
})