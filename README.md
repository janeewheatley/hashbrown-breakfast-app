# 🧠 Breakfast Brain

A Next.js 15 breakfast-themed application powered by Hashbrown AI for generating dynamic breakfast content including recipes, menus, stories, and cooking tips.

## ✨ Features

- **AI-Powered Content Generation**: Create breakfast recipes, menus, stories, and tips using LLMs
- **Structured Output**: Uses JSON Schema to ensure consistent, well-formatted content
- **Interactive Components**: Beautiful Tailwind-styled components with Radix UI primitives
- **Secure API Routes**: Server-side LLM integration with environment-based configuration
- **Multi-Provider Support**: Works with OpenAI, Anthropic, Azure OpenAI, and custom endpoints
- **Responsive Design**: Mobile-first design with warm breakfast-themed colors

## 🏗️ Architecture

### Frontend (`/app`)
- **Next.js 15 App Router**: Modern React with server/client components
- **Vanilla JavaScript**: No TypeScript dependencies
- **Tailwind CSS**: Utility-first styling with custom breakfast theme
- **Radix UI**: Accessible component primitives

### Hashbrown Integration (`/hb`)
- **Components**: Reusable UI components (RecipeCard, MenuSection, etc.)
- **Functions**: Local mock functions for nutrition calculation, timing, etc.
- **Schema**: JSON Schema definitions for structured LLM output

### Backend (`/lib`)
- **Environment Config**: Multi-provider API key management
- **Zod Schemas**: Request/response validation
- **Edge Runtime**: Fast, globally distributed API routes

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   Create a `.env.local` file:
   ```env
   # OpenAI (default)
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-4o-mini
   
   # Or Anthropic
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ANTHROPIC_MODEL=claude-3-sonnet-20240229
   
   # Or Azure OpenAI
   AI_PROVIDER=azure
   AZURE_OPENAI_API_KEY=your_azure_key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_MODEL=gpt-4o-mini
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
breakfast-brain/
├── app/                     # Next.js App Router
│   ├── layout.jsx          # Root layout with Tailwind styles
│   ├── page.jsx            # Main application page (client)
│   └── api/
│       └── generate/
│           └── route.js    # AI generation API (edge runtime)
├── hb/                     # Hashbrown components & functions
│   ├── components.jsx      # UI component definitions
│   ├── functions.js        # Mock utility functions
│   └── schema.js          # JSON Schema for LLM output
├── lib/                   # Utilities & configuration
│   ├── env.js            # Environment & provider config
│   └── schemas.js        # Zod validation schemas
├── src/styles/           # Styling
│   └── globals.css       # Tailwind directives
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── next.config.mjs       # Next.js configuration (ESM)
├── jsconfig.json         # Path aliases configuration
└── package.json          # Dependencies & scripts
```

## 🔧 Configuration

### AI Providers

The app supports multiple AI providers through environment variables:

- **OpenAI**: Standard OpenAI API
- **Anthropic**: Claude models
- **Azure OpenAI**: Enterprise OpenAI deployment  
- **Custom**: Any OpenAI-compatible API

### Content Types

Generated content can be:
- **Recipes**: Complete breakfast recipes with ingredients and instructions
- **Menus**: Restaurant-style breakfast menus with prices
- **Stories**: Breakfast-themed narratives and anecdotes
- **Tips**: Cooking and preparation advice
- **Mixed**: Combination content types

### Components

Hashbrown components include:
- `RecipeCard`: Full recipe display with ingredients and steps
- `MenuSection`: Restaurant menu with items and prices
- `TipCard`: Cooking tips and advice
- `NutritionInfo`: Nutritional information display
- `StorySection`: Narrative content with styling

## 🔐 Security

- API keys are never exposed to client-side code
- All LLM requests go through secure server-side API routes
- Input validation using Zod schemas
- Environment-based configuration management

## 🎨 Theming

The app uses a warm breakfast-inspired color palette:
- **Primary**: Amber tones (amber-50 to amber-900)
- **Accents**: Orange, yellow, and warm browns
- **Backgrounds**: Soft gradients and subtle textures

## 📦 Dependencies

### Core
- `next@15.5.2`: React framework
- `react@18.3.1`: UI library
- `@hashbrownai/react@0.2.3`: Hashbrown React integration
- `@hashbrownai/core@0.2.3`: Core Hashbrown functionality
- `@hashbrownai/openai@0.2.3`: OpenAI provider

### UI & Styling  
- `tailwindcss`: Utility-first CSS
- `@radix-ui/react-*`: Accessible components
- `postcss` & `autoprefixer`: CSS processing

### Validation
- `zod`: Runtime type validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.