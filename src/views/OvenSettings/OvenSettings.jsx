import React, { useState, useEffect } from 'react';
import { bakerySettingsController } from '../../controllers/BakerySettingsController';
import { OVEN_MODES, RACK_POSITIONS } from '../../models/BakerySettings';
import '../../styles/OvenSettings.css';

const OvenSettings = () => {
  const [settings, setSettings] = useState(bakerySettingsController.getSettings());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...settings });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setSettings(bakerySettingsController.getSettings());
    setFormData({ ...bakerySettingsController.getSettings() });
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    bakerySettingsController.updateSettings(formData);
    setSettings({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...settings });
    setIsEditing(false);
  };

  const getModeIcon = (modeId) => {
    const mode = OVEN_MODES.find(m => m.id === modeId);
    return mode ? mode.icon : '🔥';
  };

  const getRackIcon = (rackId) => {
    const rack = RACK_POSITIONS.find(r => r.id === rackId);
    return rack ? rack.icon : '➡️';
  };

  return (
    <div className="oven-settings-page">
      {/* Header */}
      <div className="oven-header-new">
        <h1 className="oven-title-new">Oven Settings</h1>
        <div className="header-actions-new">
          {!isEditing ? (
            <button className="btn-edit-new" onClick={() => setIsEditing(true)}>
              Edit Settings
            </button>
          ) : (
            <>
              <button className="btn-cancel-new-oven" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-save-new-oven" onClick={handleSave}>
                Save & Close
              </button>
            </>
          )}
        </div>
      </div>

      {/* Temperature Display Card */}
      <div className="oven-display-card">
        <div className="temp-value-new">{settings.ovenTemperature}°C</div>
        <div className="temp-label-new">TEMPERATURE</div>
      </div>

      {/* Baking Time Display */}
      <div className="baking-time-card">
        <div className="time-icon-new">⏱️</div>
        <div className="time-value-new">{settings.bakingTime} MIN</div>
        <div className="time-label-new">BAKING TIME</div>
      </div>

      {/* Slider Controls */}
      <div className="oven-controls-grid">
        {/* Temperature Slider */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">🌡️</div>
            <div className="control-title">
              <span>Temperature</span>
              <span className="control-subtitle">Oven Temperature</span>
            </div>
            <div className="control-value-badge">{formData.ovenTemperature}°C</div>
          </div>
          {isEditing ? (
            <div className="slider-container">
              <input
                type="range"
                name="ovenTemperature"
                min="50"
                max="300"
                step="5"
                value={formData.ovenTemperature}
                onChange={handleSliderChange}
                className="range-slider-new"
              />
              <div className="slider-labels">
                <span>50°C</span>
                <span>300°C</span>
              </div>
            </div>
          ) : (
            <div className="slider-bar-static">
              <div
                className="slider-fill"
                style={{ width: `${((settings.ovenTemperature - 50) / 250) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Baking Time Slider */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">⏱️</div>
            <div className="control-title">
              <span>Baking Time</span>
              <span className="control-subtitle">Baking Time</span>
            </div>
            <div className="control-value-badge">{formData.bakingTime} Min</div>
          </div>
          {isEditing ? (
            <div className="slider-container">
              <input
                type="range"
                name="bakingTime"
                min="5"
                max="180"
                step="5"
                value={formData.bakingTime}
                onChange={handleSliderChange}
                className="range-slider-new"
              />
              <div className="slider-labels">
                <span>5 Min</span>
                <span>180 Min</span>
              </div>
            </div>
          ) : (
            <div className="slider-bar-static">
              <div
                className="slider-fill"
                style={{ width: `${((settings.bakingTime - 5) / 175) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Preheat Time Slider */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">⏲️</div>
            <div className="control-title">
              <span>Preheat Time</span>
              <span className="control-subtitle">Preheat Duration</span>
            </div>
            <div className="control-value-badge">{formData.preheatTime} Min</div>
          </div>
          {isEditing ? (
            <div className="slider-container">
              <input
                type="range"
                name="preheatTime"
                min="0"
                max="30"
                step="1"
                value={formData.preheatTime}
                onChange={handleSliderChange}
                className="range-slider-new"
              />
              <div className="slider-labels">
                <span>0 Min</span>
                <span>30 Min</span>
              </div>
            </div>
          ) : (
            <div className="slider-bar-static">
              <div
                className="slider-fill"
                style={{ width: `${(settings.preheatTime / 30) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Humidity Slider */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">💧</div>
            <div className="control-title">
              <span>Humidity</span>
              <span className="control-subtitle">Oven Humidity Level</span>
            </div>
            <div className="control-value-badge">{formData.humidity}%</div>
          </div>
          {isEditing ? (
            <div className="slider-container">
              <input
                type="range"
                name="humidity"
                min="0"
                max="100"
                step="5"
                value={formData.humidity}
                onChange={handleSliderChange}
                className="range-slider-new"
              />
              <div className="slider-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          ) : (
            <div className="slider-bar-static">
              <div
                className="slider-fill"
                style={{ width: `${settings.humidity}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Fan Speed Slider */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">🌀</div>
            <div className="control-title">
              <span>Fan Speed</span>
              <span className="control-subtitle">Fan Intensity</span>
            </div>
            <div className="control-value-badge">{formData.fanSpeed}%</div>
          </div>
          {isEditing ? (
            <div className="slider-container">
              <input
                type="range"
                name="fanSpeed"
                min="0"
                max="100"
                step="5"
                value={formData.fanSpeed}
                onChange={handleSliderChange}
                className="range-slider-new"
              />
              <div className="slider-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          ) : (
            <div className="slider-bar-static">
              <div
                className="slider-fill"
                style={{ width: `${settings.fanSpeed}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Oven Mode Select */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">{getModeIcon(formData.ovenMode)}</div>
            <div className="control-title">
              <span>Oven Mode</span>
              <span className="control-subtitle">Heating Method</span>
            </div>
          </div>
          {isEditing ? (
            <div className="select-container">
              <select
                name="ovenMode"
                value={formData.ovenMode}
                onChange={handleSelectChange}
                className="oven-select"
              >
                {OVEN_MODES.map(mode => (
                  <option key={mode.id} value={mode.id}>
                    {mode.icon} {mode.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mode-display">
              <span className="mode-icon-large">{getModeIcon(settings.ovenMode)}</span>
              <span className="mode-name">
                {OVEN_MODES.find(m => m.id === settings.ovenMode)?.name || 'Conventional'}
              </span>
            </div>
          )}
        </div>

        {/* Rack Position Select */}
        <div className="control-card">
          <div className="control-header">
            <div className="control-icon">{getRackIcon(formData.rackPosition)}</div>
            <div className="control-title">
              <span>Rack Position</span>
              <span className="control-subtitle">Shelf Location</span>
            </div>
          </div>
          {isEditing ? (
            <div className="select-container">
              <select
                name="rackPosition"
                value={formData.rackPosition}
                onChange={handleSelectChange}
                className="oven-select"
              >
                {RACK_POSITIONS.map(rack => (
                  <option key={rack.id} value={rack.id}>
                    {rack.icon} {rack.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mode-display">
              <span className="mode-icon-large">{getRackIcon(settings.rackPosition)}</span>
              <span className="mode-name">
                {RACK_POSITIONS.find(r => r.id === settings.rackPosition)?.name || 'Middle'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OvenSettings;
