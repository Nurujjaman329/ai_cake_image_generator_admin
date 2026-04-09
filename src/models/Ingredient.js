// Ingredient Model
// Represents individual ingredients within categories

export class Ingredient {
  constructor({ 
    id, 
    name, 
    categoryId, 
    description = '', 
    image = null,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.description = description;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Update ingredient properties
  update(updates) {
    Object.assign(this, updates, { updatedAt: new Date() });
  }

  // Convert to plain object for serialization
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
      description: this.description,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from plain object
  static fromJSON(data) {
    return new Ingredient({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    });
  }
}

// Sample ingredients for initial data
export const SAMPLE_INGREDIENTS = [
  {
    id: '1',
    name: 'Whole Milk',
    categoryId: '1',
    description: 'Fresh whole milk from local dairy farms'
  },
  {
    id: '2',
    name: 'Organic All-Purpose Flour',
    categoryId: '2',
    description: 'Premium quality organic flour'
  },
  {
    id: '3',
    name: 'Caster Sugar',
    categoryId: '3',
    description: 'Fine granulated sugar for baking'
  },
  {
    id: '4',
    name: 'Free-Range Eggs',
    categoryId: '4',
    description: 'Large free-range eggs'
  },
  {
    id: '5',
    name: 'European Butter',
    categoryId: '5',
    description: 'High-fat European style butter'
  },
  {
    id: '6',
    name: 'Belgian Dark Chocolate',
    categoryId: '6',
    description: '70% cocoa Belgian dark chocolate'
  }
];
