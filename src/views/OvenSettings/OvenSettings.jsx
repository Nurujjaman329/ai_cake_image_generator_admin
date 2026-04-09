import React, { useState, useEffect } from 'react';
import { bakerySettingsController } from '../../controllers/BakerySettingsController';
import '../../styles/OvenSettings.css';

const OvenSettings = () => {
  const [settings, setSettings] = useState(bakerySettingsController.getSettings());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...settings });
  const [errors, setErrors] = useState({});
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setSettings(bakerySettingsController.getSettings());
    setFormData({ ...bakerySettingsController.getSettings() });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (formData.ovenTemperature < 50 || formData.ovenTemperature > 300) {
      newErrors.ovenTemperature = 'Temperature must be between 50°C and 300°C';
    }
    
    if (formData.bakingTime < 5 || formData.bakingTime > 180) {
      newErrors.bakingTime = 'Baking time must be between 5 and 180 minutes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    bakerySettingsController.updateSettings(formData);
    setSettings({ ...formData });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({ ...settings });
    setIsEditing(false);
    setErrors({});
  };

  const handleReset = () => {
    bakerySettingsController.resetToDefaults();
    loadSettings();
    setShowResetModal(false);
  };

  return (
    <div className="oven-settings fade-in">
      <div className="oven-header">
        <div className="header-left">
          <h1 className="oven-title">
            <span>🔥</span>
            Oven Settings
          </h1>
          <p className="oven-subtitle">Configure temperature and baking time</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <>
              <button className="btn-secondary" onClick={() => setShowResetModal(true)}>
                🔄 Reset Defaults
              </button>
              <button className="btn-primary" onClick={() => setIsEditing(true)}>
                ✏️ Edit Settings
              </button>
            </>
          ) : (
            <>
              <button className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                💾 Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div className="oven-preview-section">
        <div className="oven-visual">
          <div className="oven-display">
            <div className="oven-icon-large">🎂</div>
            <div className="temperature-display">
              <div className="temp-value">{settings.ovenTemperature}°C</div>
              <div className="temp-label">Temperature</div>
            </div>
          </div>
          
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <div className="stat-value">{settings.bakingTime} min</div>
                <div className="stat-label">Baking Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2 className="section-title">
            <span>🌡️</span>
            Temperature
          </h2>
          
          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Oven Temperature</span>
              <span className="label-value">{formData.ovenTemperature}°C</span>
            </label>
            {isEditing ? (
              <>
                <input
                  type="range"
                  name="ovenTemperature"
                  min="50"
                  max="300"
                  step="5"
                  value={formData.ovenTemperature}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>50°C</span>
                  <span>300°C</span>
                </div>
                {errors.ovenTemperature && (
                  <span className="error-message">{errors.ovenTemperature}</span>
                )}
              </>
            ) : (
              <div className="setting-display">
                <div className="temperature-gauge">
                  <div 
                    className="temperature-fill" 
                    style={{ width: `${((settings.ovenTemperature - 50) / 250) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">
            <span>⏱️</span>
            Baking Time
          </h2>
          
          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Baking Time</span>
              <span className="label-value">{formData.bakingTime} minutes</span>
            </label>
            {isEditing ? (
              <>
                <input
                  type="range"
                  name="bakingTime"
                  min="5"
                  max="180"
                  step="5"
                  value={formData.bakingTime}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>5 min</span>
                  <span>180 min</span>
                </div>
                {errors.bakingTime && (
                  <span className="error-message">{errors.bakingTime}</span>
                )}
              </>
            ) : (
              <div className="setting-display">
                <div className="time-display">{settings.bakingTime} min</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>🔄 Reset to Defaults</h3>
            <p>Are you sure you want to reset oven settings to their default values?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowResetModal(false)}>Cancel</button>
              <button className="btn-confirm-reset" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OvenSettings;
