// Bakery Settings Model
// Represents oven settings and bakery configurations

export class BakerySettings {
  constructor({
    id = 'default',
    ovenTemperature = 180,
    ovenMode = 'conventional',
    bakingTime = 30,
    preheatTime = 15,
    humidity = 50,
    rackPosition = 'middle',
    fanSpeed = 50,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.ovenTemperature = ovenTemperature; // Celsius
    this.ovenMode = ovenMode; // conventional, convection, fan-assisted
    this.bakingTime = bakingTime; // minutes
    this.preheatTime = preheatTime; // minutes
    this.humidity = humidity; // percentage
    this.rackPosition = rackPosition; // top, middle, bottom
    this.fanSpeed = fanSpeed; // 0-100
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
      ovenMode: this.ovenMode,
      bakingTime: this.bakingTime,
      preheatTime: this.preheatTime,
      humidity: this.humidity,
      rackPosition: this.rackPosition,
      fanSpeed: this.fanSpeed,
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
  { value: 'conventional', label: 'Conventional', icon: '🔥', description: 'Traditional heating, top and bottom elements' },
  { value: 'convection', label: 'Convection', icon: '🌀', description: 'Fan circulates hot air evenly' },
  { value: 'fan-assisted', label: 'Fan-Assisted', icon: '💨', description: 'Fan with heating elements' },
  { value: 'grill', label: 'Grill', icon: '♨️', description: 'Top element only for browning' },
  { value: 'bottom-heat', label: 'Bottom Heat', icon: '⬇️', description: 'Bottom element only' }
];

// Rack position options
export const RACK_POSITIONS = [
  { value: 'top', label: 'Top Rack', description: 'Closest to top element' },
  { value: 'upper-middle', label: 'Upper Middle', description: 'Between top and center' },
  { value: 'middle', label: 'Middle', description: 'Center of the oven' },
  { value: 'lower-middle', label: 'Lower Middle', description: 'Between center and bottom' },
  { value: 'bottom', label: 'Bottom Rack', description: 'Closest to bottom element' }
];
