import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ingredientController } from '../../controllers/IngredientController';
import { categoryController } from '../../controllers/CategoryController';
import { bakerySettingsController } from '../../controllers/BakerySettingsController';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIngredients: 0,
    totalCategories: 0,
    ovenTemp: 0,
    recentIngredients: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const ingredients = ingredientController.getAllIngredients();
    const categories = categoryController.getAllCategories();
    const ovenTemp = bakerySettingsController.getOvenTemperature();

    setStats({
      totalIngredients: ingredients.length,
      totalCategories: categories.length,
      ovenTemp,
      recentIngredients: ingredients.slice(-5).reverse()
    });
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header-new">
        <div className="header-text">
          <h1 className="dashboard-title-new">Dashboard</h1>
          <p className="dashboard-subtitle-new">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button className="notification-btn" title="Notifications">
            🔔
          </button>
          <div className="user-profile">
            <div className="user-avatar-small">A</div>
            <span className="user-name-text">Administrator</span>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards-row">
        <div className="stat-card-new">
          <div className="stat-card-left">
            <div className="stat-label-new">Total Ingredients</div>
            <div className="stat-value-new">{stats.totalIngredients}</div>
          </div>
          <div className="stat-icon-box">
            📦
          </div>
        </div>

        <div className="stat-card-new">
          <div className="stat-card-left">
            <div className="stat-label-new">Total Categories</div>
            <div className="stat-value-new">{stats.totalCategories}</div>
          </div>
          <div className="stat-icon-box">
            📁
          </div>
        </div>

        <div className="stat-card-new">
          <div className="stat-card-left">
            <div className="stat-label-new">Oven Temperature</div>
            <div className="stat-value-new">{stats.ovenTemp}°C</div>
          </div>
          <div className="stat-icon-box">
            🔥
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Ingredients Table */}
        <div className="recent-ingredients-section">
          <h2 className="section-title-new">Recent Ingredients</h2>
          <div className="table-wrapper-new">
            {stats.recentIngredients.length > 0 ? (
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentIngredients.map(ingredient => {
                    const category = categoryController.getCategoryById(ingredient.categoryId);
                    return (
                      <tr key={ingredient.id}>
                        <td className="ingredient-cell-new">{ingredient.name}</td>
                        <td>
                          <span className="category-pill">
                            {category?.name || 'Uncategorized'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-state-new">
                <p>No ingredients yet. Add your first ingredient!</p>
                <Link to="/ingredients/add" className="btn-add-ingredient">Add Ingredient</Link>
              </div>
            )}
          </div>
        </div>

        {/* Oven Preview Card */}
        <div className="oven-preview-card">
          <div className="oven-icon-display">🧁</div>
          <div className="oven-temp-display">{stats.ovenTemp}°C</div>
          <Link to="/oven-settings" className="btn-oven-settings">
            Oven Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
