export function getEnvironmentConfig() {
  const provider = process.env.AI_PROVIDER || 'openai'
  
  const configs = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  }
  
  const config = configs[provider] || configs.openai
  
  if (!config.apiKey) {
    console.warn(`Missing API key for provider: ${provider}`)
  }
  
  return config
}

export function validateEnvironment() {
  const config = getEnvironmentConfig()
  
  const issues = []
  
  if (!config.apiKey) {
    issues.push(`Missing API key for provider: ${config.provider}`)
  }
  
  if (!config.model) {
    issues.push(`Missing model configuration for provider: ${config.provider}`)
  }
  
  if (config.provider === 'azure' && !config.baseURL) {
    issues.push('Azure OpenAI requires AZURE_OPENAI_ENDPOINT to be set')
  }
  
  if (config.provider === 'custom' && !config.baseURL) {
    issues.push('Custom provider requires CUSTOM_BASE_URL to be set')
  }
  
  return {
    valid: issues.length === 0,
    issues,
    config
  }
}

export function getClientSafeConfig() {
  // Return only non-sensitive config for client-side use
  const config = getEnvironmentConfig()
  
  return {
    provider: config.provider,
    model: config.model.replace(/^[^\/]*\//, ''), // Remove any prefix before model name
    hasApiKey: Boolean(config.apiKey),
    // Never include actual API keys or full URLs
  }
}