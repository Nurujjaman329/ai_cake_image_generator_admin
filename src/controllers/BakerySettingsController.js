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

  getPreheatTime() {
    return this.settings.preheatTime;
  }

  setPreheatTime(time) {
    if (time >= 0 && time <= 30) {
      this.settings.preheatTime = time;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getOvenMode() {
    return this.settings.ovenMode;
  }

  setOvenMode(mode) {
    this.settings.ovenMode = mode;
    this.saveToStorage();
    return true;
  }

  getHumidity() {
    return this.settings.humidity;
  }

  setHumidity(level) {
    if (level >= 0 && level <= 100) {
      this.settings.humidity = level;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getFanSpeed() {
    return this.settings.fanSpeed;
  }

  setFanSpeed(speed) {
    if (speed >= 0 && speed <= 100) {
      this.settings.fanSpeed = speed;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getRackPosition() {
    return this.settings.rackPosition;
  }

  setRackPosition(position) {
    this.settings.rackPosition = position;
    this.saveToStorage();
    return true;
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

    if (this.settings.preheatTime < 0 || this.settings.preheatTime > 30) {
      errors.push('Preheat time must be between 0 and 30 minutes');
    }

    if (this.settings.humidity < 0 || this.settings.humidity > 100) {
      errors.push('Humidity must be between 0% and 100%');
    }

    if (this.settings.fanSpeed < 0 || this.settings.fanSpeed > 100) {
      errors.push('Fan speed must be between 0% and 100%');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const bakerySettingsController = new BakerySettingsController();
export default bakerySettingsController;
