// Ingredient Controller
// Handles CRUD operations for ingredients

import { Ingredient, SAMPLE_INGREDIENTS } from '../models/Ingredient';
import { Storage, STORAGE_KEYS } from '../utils/Storage';

class IngredientController {
  constructor() {
    this.ingredients = [];
    this.loadIngredients();
  }

  // Load ingredients from storage or initialize with samples
  loadIngredients() {
    const stored = Storage.get(STORAGE_KEYS.INGREDIENTS, null);
    if (stored && stored.length > 0) {
      this.ingredients = stored.map(data => Ingredient.fromJSON(data));
    } else {
      this.ingredients = SAMPLE_INGREDIENTS.map(data => new Ingredient(data));
      this.saveToStorage();
    }
  }

  // Save ingredients to storage
  saveToStorage() {
    Storage.set(STORAGE_KEYS.INGREDIENTS, this.ingredients.map(ing => ing.toJSON()));
  }

  // Get all ingredients
  getAllIngredients() {
    return [...this.ingredients];
  }

  // Get ingredient by ID
  getIngredientById(id) {
    return this.ingredients.find(ing => ing.id === id);
  }

  // Get ingredients by category ID
  getIngredientsByCategoryId(categoryId) {
    return this.ingredients.filter(ing => ing.categoryId === categoryId);
  }

  // Add a new ingredient
  addIngredient(ingredientData) {
    const newIngredient = new Ingredient({
      id: Date.now().toString(),
      ...ingredientData
    });
    this.ingredients.push(newIngredient);
    this.saveToStorage();
    return newIngredient;
  }

  // Update an existing ingredient
  updateIngredient(id, updates) {
    const ingredient = this.getIngredientById(id);
    if (ingredient) {
      ingredient.update(updates);
      this.saveToStorage();
      return ingredient;
    }
    return null;
  }

  // Delete an ingredient
  deleteIngredient(id) {
    const index = this.ingredients.findIndex(ing => ing.id === id);
    if (index !== -1) {
      const deleted = this.ingredients.splice(index, 1)[0];
      this.saveToStorage();
      return deleted;
    }
    return null;
  }

  // Search ingredients by name
  searchIngredients(query) {
    const lowerQuery = query.toLowerCase();
    return this.ingredients.filter(ing => 
      ing.name.toLowerCase().includes(lowerQuery) ||
      ing.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Get ingredients with pagination
  getIngredientsPaginated(page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: this.ingredients.slice(startIndex, endIndex),
      total: this.ingredients.length,
      page,
      limit,
      totalPages: Math.ceil(this.ingredients.length / limit)
    };
  }

  // Get ingredients sorted by name
  getIngredientsSortedByName(order = 'asc') {
    const sorted = [...this.ingredients].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    return sorted;
  }

  // Batch delete ingredients
  batchDeleteIngredients(ids) {
    const deleted = [];
    ids.forEach(id => {
      const ingredient = this.deleteIngredient(id);
      if (ingredient) {
        deleted.push(ingredient);
      }
    });
    return deleted;
  }

  // Initialize with sample ingredients
  resetToSamples() {
    this.ingredients = SAMPLE_INGREDIENTS.map(data => new Ingredient(data));
    this.saveToStorage();
    return [...this.ingredients];
  }
}

// Export singleton instance
export const ingredientController = new IngredientController();
export default ingredientController;
