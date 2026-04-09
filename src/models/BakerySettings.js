// Bakery Settings Model
// Represents oven settings and bakery configurations

export class BakerySettings {
  constructor({
    id = 'default',
    ovenTemperature = 180,
    bakingTime = 30,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.ovenTemperature = ovenTemperature;
    this.bakingTime = bakingTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update(updates) {
    Object.assign(this, updates, { updatedAt: new Date() });
  }

  toJSON() {
    return {
      id: this.id,
      ovenTemperature: this.ovenTemperature,
      bakingTime: this.bakingTime,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new BakerySettings({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    });
  }
}
