import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), '.cache', 'recipe-images');
const CACHE_INDEX_FILE = path.join(CACHE_DIR, 'index.json');
const CACHE_EXPIRY_DAYS = 30;

// Ensure cache directory exists
async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
}

// Generate a safe filename from recipe title
function getCacheFileName(recipeTitle) {
  const hash = crypto.createHash('md5').update(recipeTitle).digest('hex');
  return `${hash}.json`;
}

// Load the cache index
async function loadCacheIndex() {
  try {
    await ensureCacheDir();
    const indexData = await fs.readFile(CACHE_INDEX_FILE, 'utf-8');
    return JSON.parse(indexData);
  } catch (error) {
    // If index doesn't exist, return empty object
    return {};
  }
}

// Save the cache index
async function saveCacheIndex(index) {
  try {
    await ensureCacheDir();
    await fs.writeFile(CACHE_INDEX_FILE, JSON.stringify(index, null, 2));
  } catch (error) {
    console.error('Error saving cache index:', error);
  }
}

// Get cached image
export async function getCachedImage(recipeTitle) {
  try {
    const index = await loadCacheIndex();
    const cacheEntry = index[recipeTitle];
    
    if (!cacheEntry) {
      return null;
    }
    
    // Check if cache is expired
    const expiryDate = new Date(cacheEntry.expiry);
    if (expiryDate < new Date()) {
      // Remove expired entry
      await removeCachedImage(recipeTitle);
      return null;
    }
    
    // Read the cached image file
    const cacheFilePath = path.join(CACHE_DIR, cacheEntry.filename);
    const cacheData = await fs.readFile(cacheFilePath, 'utf-8');
    const { image } = JSON.parse(cacheData);
    
    console.log(`Found cached image for: ${recipeTitle}`);
    return image;
  } catch (error) {
    console.error('Error reading cached image:', error);
    return null;
  }
}

// Save image to cache
export async function setCachedImage(recipeTitle, imageData) {
  try {
    await ensureCacheDir();
    
    const filename = getCacheFileName(recipeTitle);
    const cacheFilePath = path.join(CACHE_DIR, filename);
    
    // Save image data to file
    const cacheData = {
      title: recipeTitle,
      image: imageData,
      createdAt: new Date().toISOString()
    };
    await fs.writeFile(cacheFilePath, JSON.stringify(cacheData));
    
    // Update index
    const index = await loadCacheIndex();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + CACHE_EXPIRY_DAYS);
    
    index[recipeTitle] = {
      filename,
      expiry: expiry.toISOString(),
      createdAt: new Date().toISOString()
    };
    
    await saveCacheIndex(index);
    console.log(`Cached image for: ${recipeTitle}`);
  } catch (error) {
    console.error('Error saving cached image:', error);
  }
}

// Remove cached image
export async function removeCachedImage(recipeTitle) {
  try {
    const index = await loadCacheIndex();
    const cacheEntry = index[recipeTitle];
    
    if (cacheEntry) {
      // Delete the cache file
      const cacheFilePath = path.join(CACHE_DIR, cacheEntry.filename);
      try {
        await fs.unlink(cacheFilePath);
      } catch (error) {
        // File might not exist
      }
      
      // Remove from index
      delete index[recipeTitle];
      await saveCacheIndex(index);
    }
  } catch (error) {
    console.error('Error removing cached image:', error);
  }
}

// Clear all cached images
export async function clearImageCache() {
  try {
    await fs.rm(CACHE_DIR, { recursive: true, force: true });
    console.log('Image cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

// Clean up expired cache entries
export async function cleanupExpiredCache() {
  try {
    const index = await loadCacheIndex();
    const now = new Date();
    let hasChanges = false;
    
    for (const [title, entry] of Object.entries(index)) {
      const expiryDate = new Date(entry.expiry);
      if (expiryDate < now) {
        await removeCachedImage(title);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      console.log('Cleaned up expired cache entries');
    }
  } catch (error) {
    console.error('Error cleaning up cache:', error);
  }
}