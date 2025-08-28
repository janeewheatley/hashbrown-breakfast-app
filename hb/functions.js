// Simplified breakfast recipe function for use with Hashbrown useTool

export const functions = {
  getRecipe: {
    name: 'getRecipe',
    description: 'Fetch and generate a breakfast recipe based on input text',
    parameters: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          description: 'User input describing what kind of breakfast recipe they want'
        }
      },
      required: ['input']
    },
    execute: async ({ input }) => {
      // This function will call the API route to generate the recipe
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.content
    }
  }
}