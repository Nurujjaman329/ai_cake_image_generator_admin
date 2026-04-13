import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to update profile
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
    setIsEditing(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!user) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">
        {isEditing ? 'Edit Profile' : 'Profile'}
      </h1>

      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="profile-name-display">
              {formData.name || 'Administrator'}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form-section">
          <div className="form-group-profile">
            <label className="form-label-profile">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input-profile"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group-profile">
            <label className="form-label-profile">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input-profile"
              readOnly={!isEditing}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="form-group-profile">
              <label className="form-label-profile">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input-profile password-input"
                  placeholder="Enter new password"
                />
                <div className="password-actions">
                  <button
                    type="button"
                    className="password-icon-btn"
                    onClick={() => copyToClipboard(formData.password)}
                    title="Copy password"
                  >
                    📋
                  </button>
                  <button
                    type="button"
                    className="password-icon-btn"
                    onClick={togglePasswordVisibility}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <button className="btn-update-profile" onClick={handleSave}>
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
