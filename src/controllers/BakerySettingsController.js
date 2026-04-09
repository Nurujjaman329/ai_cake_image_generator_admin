// Bakery Settings Controller
// Handles oven settings and bakery configurations

import { BakerySettings, OVEN_MODES, RACK_POSITIONS } from '../models/BakerySettings';
import { Storage, STORAGE_KEYS } from '../utils/Storage';

class BakerySettingsController {
  constructor() {
    this.settings = new BakerySettings({});
    this.loadSettings();
  }

  // Load settings from storage
  loadSettings() {
    const stored = Storage.get(STORAGE_KEYS.BAKERY_SETTINGS, null);
    if (stored) {
      this.settings = BakerySettings.fromJSON(stored);
    } else {
      this.saveToStorage();
    }
  }

  // Save settings to storage
  saveToStorage() {
    Storage.set(STORAGE_KEYS.BAKERY_SETTINGS, this.settings.toJSON());
  }

  // Get current settings
  getSettings() {
    return { ...this.settings };
  }

  // Update settings
  updateSettings(updates) {
    this.settings.update(updates);
    this.saveToStorage();
    return this.getSettings();
  }

  // Get oven temperature
  getOvenTemperature() {
    return this.settings.ovenTemperature;
  }

  // Set oven temperature
  setOvenTemperature(temp) {
    if (temp >= 50 && temp <= 300) {
      this.settings.ovenTemperature = temp;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get oven mode
  getOvenMode() {
    return this.settings.ovenMode;
  }

  // Set oven mode
  setOvenMode(mode) {
    if (OVEN_MODES.find(m => m.value === mode)) {
      this.settings.ovenMode = mode;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get baking time
  getBakingTime() {
    return this.settings.bakingTime;
  }

  // Set baking time
  setBakingTime(time) {
    if (time >= 5 && time <= 180) {
      this.settings.bakingTime = time;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get preheat time
  getPreheatTime() {
    return this.settings.preheatTime;
  }

  // Set preheat time
  setPreheatTime(time) {
    if (time >= 5 && time <= 60) {
      this.settings.preheatTime = time;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get humidity
  getHumidity() {
    return this.settings.humidity;
  }

  // Set humidity
  setHumidity(humidity) {
    if (humidity >= 0 && humidity <= 100) {
      this.settings.humidity = humidity;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get rack position
  getRackPosition() {
    return this.settings.rackPosition;
  }

  // Set rack position
  setRackPosition(position) {
    if (RACK_POSITIONS.find(p => p.value === position)) {
      this.settings.rackPosition = position;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get fan speed
  getFanSpeed() {
    return this.settings.fanSpeed;
  }

  // Set fan speed
  setFanSpeed(speed) {
    if (speed >= 0 && speed <= 100) {
      this.settings.fanSpeed = speed;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get all oven modes
  getOvenModes() {
    return [...OVEN_MODES];
  }

  // Get all rack positions
  getRackPositions() {
    return [...RACK_POSITIONS];
  }

  // Reset to default settings
  resetToDefaults() {
    this.settings = new BakerySettings();
    this.saveToStorage();
    return this.getSettings();
  }

  // Get estimated total baking time (preheat + baking)
  getEstimatedTotalTime() {
    return this.settings.preheatTime + this.settings.bakingTime;
  }

  // Validate all settings
  validateSettings() {
    const errors = [];
    
    if (this.settings.ovenTemperature < 50 || this.settings.ovenTemperature > 300) {
      errors.push('Oven temperature must be between 50°C and 300°C');
    }
    
    if (this.settings.bakingTime < 5 || this.settings.bakingTime > 180) {
      errors.push('Baking time must be between 5 and 180 minutes');
    }
    
    if (this.settings.preheatTime < 5 || this.settings.preheatTime > 60) {
      errors.push('Preheat time must be between 5 and 60 minutes');
    }
    
    if (this.settings.humidity < 0 || this.settings.humidity > 100) {
      errors.push('Humidity must be between 0% and 100%');
    }
    
    if (this.settings.fanSpeed < 0 || this.settings.fanSpeed > 100) {
      errors.push('Fan speed must be between 0 and 100');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const bakerySettingsController = new BakerySettingsController();
export default bakerySettingsController;
