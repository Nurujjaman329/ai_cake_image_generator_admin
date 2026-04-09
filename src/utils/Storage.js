// Local Storage Utility
// Handles data persistence in browser localStorage

export class Storage {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  }
}

// Storage keys
export const STORAGE_KEYS = {
  CATEGORIES: 'bakery_categories',
  INGREDIENTS: 'bakery_ingredients',
  BAKERY_SETTINGS: 'bakery_settings',
  AI_PROMPTS: 'bakery_ai_prompts',
  GENERATED_IMAGES: 'bakery_generated_images'
};
