// Category Controller
// Handles CRUD operations for ingredient categories

import { Category, DEFAULT_CATEGORIES } from '../models/Category';
import { Storage, STORAGE_KEYS } from '../utils/Storage';

class CategoryController {
  constructor() {
    this.categories = [];
    this.loadCategories();
  }

  // Load categories from storage or initialize with defaults
  loadCategories() {
    const stored = Storage.get(STORAGE_KEYS.CATEGORIES, null);
    if (stored && stored.length > 0) {
      this.categories = stored.map(data => Category.fromJSON(data));
    } else {
      this.categories = DEFAULT_CATEGORIES.map(data => new Category(data));
      this.saveToStorage();
    }
  }

  // Save categories to storage
  saveToStorage() {
    Storage.set(STORAGE_KEYS.CATEGORIES, this.categories.map(cat => cat.toJSON()));
  }

  // Get all categories
  getAllCategories() {
    return [...this.categories];
  }

  // Get category by ID
  getCategoryById(id) {
    return this.categories.find(cat => cat.id === id);
  }

  // Get category by name (case-insensitive)
  getCategoryByName(name) {
    return this.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  }

  // Add a new category
  addCategory(categoryData) {
    const newCategory = new Category({
      id: Date.now().toString(),
      ...categoryData
    });
    this.categories.push(newCategory);
    this.saveToStorage();
    return newCategory;
  }

  // Update an existing category
  updateCategory(id, updates) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      this.categories[index] = new Category({
        ...this.categories[index].toJSON(),
        ...updates
      });
      this.saveToStorage();
      return this.categories[index];
    }
    return null;
  }

  // Delete a category and optionally its subcategories
  deleteCategory(id) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      const deleted = this.categories.splice(index, 1)[0];
      this.saveToStorage();
      return deleted;
    }
    return null;
  }

  // Add subcategory to a category
  addSubcategory(categoryId, subcategoryData) {
    const category = this.getCategoryById(categoryId);
    if (category) {
      category.addSubcategory(subcategoryData);
      this.saveToStorage();
      return category;
    }
    return null;
  }

  // Update subcategory
  updateSubcategory(categoryId, subcategoryId, updates) {
    const category = this.getCategoryById(categoryId);
    if (category) {
      category.updateSubcategory(subcategoryId, updates);
      this.saveToStorage();
      return category;
    }
    return null;
  }

  // Delete subcategory
  deleteSubcategory(categoryId, subcategoryId) {
    const category = this.getCategoryById(categoryId);
    if (category) {
      category.removeSubcategory(subcategoryId);
      this.saveToStorage();
      return category;
    }
    return null;
  }

  // Get all subcategories across all categories
  getAllSubcategories() {
    return this.categories.flatMap(cat => 
      cat.subcategories.map(sub => ({
        ...sub,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryColor: cat.color
      }))
    );
  }

  // Get subcategories for a specific category
  getSubcategoriesByCategoryId(categoryId) {
    const category = this.getCategoryById(categoryId);
    return category ? [...category.subcategories] : [];
  }

  // Search categories by name
  searchCategories(query) {
    const lowerQuery = query.toLowerCase();
    return this.categories.filter(cat => 
      cat.name.toLowerCase().includes(lowerQuery)
    );
  }

  // Initialize with default categories
  resetToDefaults() {
    this.categories = DEFAULT_CATEGORIES.map(data => new Category(data));
    this.saveToStorage();
    return [...this.categories];
  }
}

// Export singleton instance
export const categoryController = new CategoryController();
export default categoryController;
