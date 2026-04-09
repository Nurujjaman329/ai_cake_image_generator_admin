// Bakery Settings Controller
// Handles oven settings and bakery configurations

import { BakerySettings } from '../models/BakerySettings';
import { Storage, STORAGE_KEYS } from '../utils/Storage';

class BakerySettingsController {
  constructor() {
    this.settings = new BakerySettings({});
    this.loadSettings();
  }

  loadSettings() {
    const stored = Storage.get(STORAGE_KEYS.BAKERY_SETTINGS, null);
    if (stored) {
      this.settings = BakerySettings.fromJSON(stored);
    } else {
      this.saveToStorage();
    }
  }

  saveToStorage() {
    Storage.set(STORAGE_KEYS.BAKERY_SETTINGS, this.settings.toJSON());
  }

  getSettings() {
    return { ...this.settings };
  }

  updateSettings(updates) {
    this.settings.update(updates);
    this.saveToStorage();
    return this.getSettings();
  }

  getOvenTemperature() {
    return this.settings.ovenTemperature;
  }

  setOvenTemperature(temp) {
    if (temp >= 50 && temp <= 300) {
      this.settings.ovenTemperature = temp;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getBakingTime() {
    return this.settings.bakingTime;
  }

  setBakingTime(time) {
    if (time >= 5 && time <= 180) {
      this.settings.bakingTime = time;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  resetToDefaults() {
    this.settings = new BakerySettings({});
    this.saveToStorage();
    return this.getSettings();
  }

  validateSettings() {
    const errors = [];
    
    if (this.settings.ovenTemperature < 50 || this.settings.ovenTemperature > 300) {
      errors.push('Oven temperature must be between 50°C and 300°C');
    }
    
    if (this.settings.bakingTime < 5 || this.settings.bakingTime > 180) {
      errors.push('Baking time must be between 5 and 180 minutes');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const bakerySettingsController = new BakerySettingsController();
export default bakerySettingsController;
