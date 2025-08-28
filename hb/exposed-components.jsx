import { exposeComponent } from '@hashbrownai/react'
import { s } from '@hashbrownai/core'
import { IngredientTextInput } from './components/IngredientTextInput.jsx'
import { QuickSelectChips } from './components/QuickSelectChips.jsx'
import { RecipeCard } from './components/RecipeCard.jsx'

// Expose components for Hashbrown to use in AI-generated UI
export const exposedComponents = [
  exposeComponent(IngredientTextInput, {
    name: 'IngredientTextInput',
    description: 'A text input component for entering ingredients',
    props: {
      placeholder: s.string('Placeholder text for the input'),
    },
    // onIngredientsChange callback is handled internally
  }),

  exposeComponent(QuickSelectChips, {
    name: 'QuickSelectChips',
    description: 'Pill-shaped buttons for quickly selecting common breakfast ingredients',
    props: {
      selectedIngredients: s.array('Array of currently selected ingredients', s.string()),
    },
    // onSelectionChange callback is handled internally
  }),

  exposeComponent(RecipeCard, {
    name: 'RecipeCard',
    description: 'A card component that displays a complete recipe with ingredients, directions, and save functionality',
    props: {
      recipe: s.object('Recipe object', {
        title: s.string('Recipe title'),
        name: s.string('Recipe name (alternative to title)'),
        description: s.string('Recipe description'),
        ingredients: s.array('List of ingredients', s.string()),
        directions: s.array('List of cooking directions', s.string()),
        instructions: s.array('List of cooking instructions (alternative to directions)', s.string()),
        servings: s.string('Number of servings'),
        time: s.string('Total cooking time'),
        prepTime: s.string('Preparation time'),
      }),
    },
    // onSave callback is handled internally
  }),
]

// Helper component for displaying markdown content
export const MarkdownComponent = ({ children }) => (
  <div className="prose prose-amber max-w-none">
    <div dangerouslySetInnerHTML={{ __html: children }} />
  </div>
)

// Helper card component for structured layout
export const CardComponent = ({ title, description, children }) => (
  <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
    {title && <h3 className="text-xl font-bold text-amber-900 mb-2">{title}</h3>}
    {description && <p className="text-amber-700 mb-4">{description}</p>}
    <div className="space-y-4">
      {children}
    </div>
  </div>
)

// Add these to the exposed components
export const allExposedComponents = [
  ...exposedComponents,
  exposeComponent(MarkdownComponent, {
    name: 'Markdown',
    description: 'Show markdown or HTML content to the user',
    children: 'text',
  }),
  exposeComponent(CardComponent, {
    name: 'Card',
    description: 'Show a card with title, description and children components',
    children: 'any',
    props: {
      title: s.string('The title of the card'),
      description: s.string('The description of the card'),
    },
  }),
]