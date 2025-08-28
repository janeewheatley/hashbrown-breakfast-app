import { exposeComponent } from '@hashbrownai/react'
import { IngredientTextInput } from './components/IngredientTextInput.jsx'
import { QuickSelectChips } from './components/QuickSelectChips.jsx'
import { RecipeCard } from './components/RecipeCard.jsx'

// Expose components for Hashbrown to use in AI-generated UI
export const exposedComponents = [
  exposeComponent(IngredientTextInput, {
    name: 'IngredientTextInput',
    description: 'A text input component for entering ingredients',
    props: {
      placeholder: 'string',
    },
    // onIngredientsChange callback is handled internally
  }),

  exposeComponent(QuickSelectChips, {
    name: 'QuickSelectChips',
    description: 'Pill-shaped buttons for quickly selecting common breakfast ingredients',
    props: {
      selectedIngredients: 'array',
    },
    // onSelectionChange callback is handled internally
  }),

  exposeComponent(RecipeCard, {
    name: 'RecipeCard',
    description: 'A card component that displays a complete recipe with ingredients, directions, and save functionality',
    props: {
      recipe: 'object',
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
      title: 'string',
      description: 'string',
    },
  }),
]