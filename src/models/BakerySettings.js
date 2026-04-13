// Bakery Settings Model
// Represents oven settings and bakery configurations

export class BakerySettings {
  constructor({
    id = 'default',
    ovenTemperature = 180,
    bakingTime = 30,
    preheatTime = 10,
    ovenMode = 'conventional',
    humidity = 50,
    fanSpeed = 50,
    rackPosition = 'middle',
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.ovenTemperature = ovenTemperature;
    this.bakingTime = bakingTime;
    this.preheatTime = preheatTime;
    this.ovenMode = ovenMode;
    this.humidity = humidity;
    this.fanSpeed = fanSpeed;
    this.rackPosition = rackPosition;
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
      preheatTime: this.preheatTime,
      ovenMode: this.ovenMode,
      humidity: this.humidity,
      fanSpeed: this.fanSpeed,
      rackPosition: this.rackPosition,
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

// Oven mode options
export const OVEN_MODES = [
  { id: 'conventional', name: 'Conventional', icon: '🔥' },
  { id: 'convection', name: 'Convection', icon: '💨' },
  { id: 'fan', name: 'Fan-Assisted', icon: '🌀' },
  { id: 'grill', name: 'Grill', icon: '♨️' },
  { id: 'bottom', name: 'Bottom Heat', icon: '⬇️' }
];

// Rack position options
export const RACK_POSITIONS = [
  { id: 'top', name: 'Top', icon: '⬆️' },
  { id: 'upper-middle', name: 'Upper Middle', icon: '↗️' },
  { id: 'middle', name: 'Middle', icon: '➡️' },
  { id: 'lower-middle', name: 'Lower Middle', icon: '↙️' },
  { id: 'bottom', name: 'Bottom', icon: '⬇️' }
];
