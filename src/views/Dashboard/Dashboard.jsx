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

  const statCards = [
    {
      title: 'Total Ingredients',
      value: stats.totalIngredients,
      icon: '🥘',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: '/ingredients'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: '📁',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      link: '/categories'
    },
    {
      title: 'Oven Temperature',
      value: `${stats.ovenTemp}°C`,
      icon: '🔥',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      link: '/oven-settings'
    }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="title-emoji">🧁</span>
          Bakery Admin Dashboard
        </h1>
        <p className="dashboard-subtitle">Manage your ingredients, categories, and oven settings</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card">
            <div className="stat-card-bg" style={{ background: stat.gradient }}></div>
            <div className="stat-card-content">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2 className="section-title">
            <span>📋</span>
            Recent Ingredients
          </h2>
          <div className="recent-list">
            {stats.recentIngredients.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentIngredients.map(ingredient => {
                    const category = categoryController.getCategoryById(ingredient.categoryId);
                    
                    return (
                      <tr key={ingredient.id}>
                        <td>
                          <span className="ingredient-name">{ingredient.name}</span>
                        </td>
                        <td>
                          <span className="category-badge" style={{ 
                            background: category ? `var(--${category.color}-secondary, #667eea)` : '#667eea'
                          }}>
                            {category?.name || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="description-cell">
                          {ingredient.description || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No ingredients yet. Add your first ingredient!</p>
                <Link to="/ingredients" className="btn-primary">Add Ingredient</Link>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">
            <span>🔥</span>
            Quick Oven Settings
          </h2>
          <div className="oven-preview">
            <div className="oven-visual">
              <div className="oven-icon">🎂</div>
              <div className="oven-temp">{stats.ovenTemp}°C</div>
            </div>
            <Link to="/oven-settings" className="btn-secondary">
              Adjust Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
