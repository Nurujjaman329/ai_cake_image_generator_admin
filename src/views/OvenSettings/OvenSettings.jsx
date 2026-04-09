import React, { useState, useEffect } from 'react';
import { bakerySettingsController } from '../../controllers/BakerySettingsController';
import { OVEN_MODES, RACK_POSITIONS } from '../../models/BakerySettings';
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
    
    if (formData.preheatTime < 5 || formData.preheatTime > 60) {
      newErrors.preheatTime = 'Preheat time must be between 5 and 60 minutes';
    }
    
    if (formData.humidity < 0 || formData.humidity > 100) {
      newErrors.humidity = 'Humidity must be between 0% and 100%';
    }
    
    if (formData.fanSpeed < 0 || formData.fanSpeed > 100) {
      newErrors.fanSpeed = 'Fan speed must be between 0 and 100';
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

  const getOvenModeIcon = (mode) => {
    const ovenMode = OVEN_MODES.find(m => m.value === mode);
    return ovenMode ? ovenMode.icon : '🔥';
  };

  const getOvenModeDescription = (mode) => {
    const ovenMode = OVEN_MODES.find(m => m.value === mode);
    return ovenMode ? ovenMode.description : '';
  };

  const getRackPositionDescription = (position) => {
    const rackPos = RACK_POSITIONS.find(p => p.value === position);
    return rackPos ? rackPos.description : '';
  };

  return (
    <div className="oven-settings fade-in">
      <div className="oven-header">
        <div className="header-left">
          <h1 className="oven-title">
            <span>🔥</span>
            Oven Settings
          </h1>
          <p className="oven-subtitle">Configure temperature, mode, and baking parameters</p>
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
            <div className="mode-display">
              <span className="mode-icon">{getOvenModeIcon(settings.ovenMode)}</span>
              <span className="mode-name">{settings.ovenMode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
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
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <div className="stat-value">{settings.preheatTime} min</div>
                <div className="stat-label">Preheat Time</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💨</div>
              <div className="stat-info">
                <div className="stat-value">{settings.humidity}%</div>
                <div className="stat-label">Humidity</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌀</div>
              <div className="stat-info">
                <div className="stat-value">{settings.fanSpeed}%</div>
                <div className="stat-label">Fan Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2 className="section-title">
            <span>🌡️</span>
            Temperature & Mode
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

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Oven Mode</span>
            </label>
            {isEditing ? (
              <div className="oven-modes-grid">
                {OVEN_MODES.map(mode => (
                  <button
                    key={mode.value}
                    className={`oven-mode-option ${formData.ovenMode === mode.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, ovenMode: mode.value }))}
                  >
                    <div className="mode-icon-large">{mode.icon}</div>
                    <div className="mode-label">{mode.label}</div>
                    <div className="mode-description">{mode.description}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="setting-display">
                <div className="mode-badge">
                  <span className="mode-icon">{getOvenModeIcon(settings.ovenMode)}</span>
                  <span>{getOvenModeDescription(settings.ovenMode)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">
            <span>⏱️</span>
            Time Settings
          </h2>
          
          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Preheat Time</span>
              <span className="label-value">{formData.preheatTime} minutes</span>
            </label>
            {isEditing ? (
              <>
                <input
                  type="range"
                  name="preheatTime"
                  min="5"
                  max="60"
                  step="5"
                  value={formData.preheatTime}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
                {errors.preheatTime && (
                  <span className="error-message">{errors.preheatTime}</span>
                )}
              </>
            ) : (
              <div className="setting-display">
                <div className="time-display">{settings.preheatTime} min</div>
              </div>
            )}
          </div>

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

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Total Estimated Time</span>
            </label>
            <div className="setting-display">
              <div className="total-time">
                {bakerySettingsController.getEstimatedTotalTime()} minutes
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">
            <span>⚙️</span>
            Advanced Settings
          </h2>
          
          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Humidity</span>
              <span className="label-value">{formData.humidity}%</span>
            </label>
            {isEditing ? (
              <>
                <input
                  type="range"
                  name="humidity"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.humidity}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                {errors.humidity && (
                  <span className="error-message">{errors.humidity}</span>
                )}
              </>
            ) : (
              <div className="setting-display">
                <div className="humidity-gauge">
                  <div 
                    className="humidity-fill" 
                    style={{ width: `${settings.humidity}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Fan Speed</span>
              <span className="label-value">{formData.fanSpeed}%</span>
            </label>
            {isEditing ? (
              <>
                <input
                  type="range"
                  name="fanSpeed"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.fanSpeed}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                {errors.fanSpeed && (
                  <span className="error-message">{errors.fanSpeed}</span>
                )}
              </>
            ) : (
              <div className="setting-display">
                <div className="fan-gauge">
                  <div 
                    className="fan-fill" 
                    style={{ width: `${settings.fanSpeed}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Rack Position</span>
            </label>
            {isEditing ? (
              <div className="rack-positions">
                {RACK_POSITIONS.map(pos => (
                  <button
                    key={pos.value}
                    className={`rack-option ${formData.rackPosition === pos.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, rackPosition: pos.value }))}
                  >
                    <div className="rack-label">{pos.label}</div>
                    <div className="rack-description">{pos.description}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="setting-display">
                <div className="rack-display">
                  {settings.rackPosition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div className="rack-description-small">
                  {getRackPositionDescription(settings.rackPosition)}
                </div>
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
            <p>Are you sure you want to reset all oven settings to their default values?</p>
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
