import React, { useState, useEffect } from 'react';
import { bakerySettingsController } from '../../controllers/BakerySettingsController';
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

  const handleSave = () => {
    bakerySettingsController.updateSettings(formData);
    setSettings({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...settings });
    setIsEditing(false);
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
      </div>
    </div>
  );
};

export default OvenSettings;
