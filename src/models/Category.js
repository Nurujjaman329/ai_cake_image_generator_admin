// Category Model
// Represents ingredient categories (e.g., Milk, Flour, Sugar, etc.)

export class Category {
  constructor({ id, name, icon, color, subcategories = [], createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.subcategories = subcategories;
    this.createdAt = createdAt;
  }

  // Add a subcategory
  addSubcategory(subcategory) {
    this.subcategories.push({
      id: Date.now().toString(),
      ...subcategory,
      createdAt: new Date()
    });
  }

  // Remove a subcategory by ID
  removeSubcategory(subcategoryId) {
    this.subcategories = this.subcategories.filter(sub => sub.id !== subcategoryId);
  }

  // Update a subcategory by ID
  updateSubcategory(subcategoryId, updates) {
    const index = this.subcategories.findIndex(sub => sub.id === subcategoryId);
    if (index !== -1) {
      this.subcategories[index] = { ...this.subcategories[index], ...updates };
    }
  }

  // Convert to plain object for serialization
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      color: this.color,
      subcategories: this.subcategories,
      createdAt: this.createdAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new Category({
      ...data,
      createdAt: new Date(data.createdAt)
    });
  }
}

// Bakery-themed color codes for different categories
export const CATEGORY_COLORS = {
  milk: { primary: '#E8F4FD', secondary: '#4A90E2', accent: '#2C5F8A', text: '#1A3A5C' },
  flour: { primary: '#FFF8E7', secondary: '#F5A623', accent: '#D4891C', text: '#8B5E1C' },
  sugar: { primary: '#FFF0F5', secondary: '#FF69B4', accent: '#D147A3', text: '#8B2252' },
  eggs: { primary: '#FFFDD0', secondary: '#FFD700', accent: '#D4AF37', text: '#8B7500' },
  butter: { primary: '#FFFACD', secondary: '#FFE4B5', accent: '#DEB887', text: '#8B6914' },
  chocolate: { primary: '#F5E6D3', secondary: '#8B4513', accent: '#654321', text: '#3E2723' },
  fruits: { primary: '#E8F5E9', secondary: '#4CAF50', accent: '#388E3C', text: '#1B5E20' },
  nuts: { primary: '#EFEBE9', secondary: '#8D6E63', accent: '#6D4C41', text: '#4E342E' },
  flavorings: { primary: '#F3E5F5', secondary: '#9C27B0', accent: '#7B1FA2', text: '#4A148C' },
  default: { primary: '#F5F5F5', secondary: '#9E9E9E', accent: '#757575', text: '#424242' }
};

// Default categories for bakery
export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Milk & Dairy', icon: '🥛', color: 'milk', subcategories: [
    { id: '1a', name: 'Cow Milk' },
    { id: '1b', name: 'Goat Milk' },
    { id: '1c', name: 'Almond Milk' },
    { id: '1d', name: 'Buttermilk' }
  ]},
  { id: '2', name: 'Flour & Grains', icon: '🌾', color: 'flour', subcategories: [
    { id: '2a', name: 'All-Purpose Flour' },
    { id: '2b', name: 'Whole Wheat Flour' },
    { id: '2c', name: 'Almond Flour' },
    { id: '2d', name: 'Oat Flour' }
  ]},
  { id: '3', name: 'Sugar & Sweeteners', icon: '🍬', color: 'sugar', subcategories: [
    { id: '3a', name: 'White Sugar' },
    { id: '3b', name: 'Brown Sugar' },
    { id: '3c', name: 'Powdered Sugar' },
    { id: '3d', name: 'Honey' }
  ]},
  { id: '4', name: 'Eggs', icon: '🥚', color: 'eggs', subcategories: [
    { id: '4a', name: 'Large Eggs' },
    { id: '4b', name: 'Egg Whites' },
    { id: '4c', name: 'Duck Eggs' }
  ]},
  { id: '5', name: 'Butter & Fats', icon: '🧈', color: 'butter', subcategories: [
    { id: '5a', name: 'Unsalted Butter' },
    { id: '5b', name: 'Salted Butter' },
    { id: '5c', name: 'Margarine' },
    { id: '5d', name: 'Coconut Oil' }
  ]},
  { id: '6', name: 'Chocolate & Cocoa', icon: '🍫', color: 'chocolate', subcategories: [
    { id: '6a', name: 'Dark Chocolate' },
    { id: '6b', name: 'Milk Chocolate' },
    { id: '6c', name: 'Cocoa Powder' },
    { id: '6d', name: 'White Chocolate' }
  ]},
  { id: '7', name: 'Fruits & Berries', icon: '🍓', color: 'fruits', subcategories: [
    { id: '7a', name: 'Strawberries' },
    { id: '7b', name: 'Blueberries' },
    { id: '7c', name: 'Raspberries' },
    { id: '7d', name: 'Cherries' }
  ]},
  { id: '8', name: 'Nuts & Seeds', icon: '🥜', color: 'nuts', subcategories: [
    { id: '8a', name: 'Almonds' },
    { id: '8b', name: 'Walnuts' },
    { id: '8c', name: 'Pecans' },
    { id: '8d', name: 'Cashews' }
  ]},
  { id: '9', name: 'Flavorings', icon: '🌿', color: 'flavorings', subcategories: [
    { id: '9a', name: 'Vanilla Extract' },
    { id: '9b', name: 'Almond Extract' },
    { id: '9c', name: 'Cinnamon' },
    { id: '9d', name: 'Nutmeg' }
  ]}
];
