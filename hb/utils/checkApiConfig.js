let configCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export async function isImageGenerationEnabled() {
  // Return cached value if it's still fresh
  if (configCache !== null && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return configCache;
  }

  try {
    const response = await fetch('/api/check-config');
    const data = await response.json();
    
    configCache = data.imageGenerationEnabled;
    cacheTimestamp = Date.now();
    
    return configCache;
  } catch (error) {
    console.error('Error checking API configuration:', error);
    return false;
  }
}