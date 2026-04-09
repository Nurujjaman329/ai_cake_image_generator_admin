import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ingredientController } from '../../controllers/IngredientController';
import { categoryController } from '../../controllers/CategoryController';
import '../../styles/IngredientList.css';

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIngredients(ingredientController.getAllIngredients());
    setCategories(categoryController.getAllCategories());
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      ingredientController.deleteIngredient(id);
      loadData();
    }
  };

  const handleBatchDelete = () => {
    if (selectedIngredients.length > 0) {
      ingredientController.batchDeleteIngredients(selectedIngredients);
      setSelectedIngredients([]);
      setShowDeleteModal(false);
      loadData();
    }
  };

  const toggleSelect = (id) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(ingId => ingId !== id));
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIngredients.length === filteredIngredients().length) {
      setSelectedIngredients([]);
    } else {
      setSelectedIngredients(filteredIngredients().map(ing => ing.id));
    }
  };

  const filteredIngredients = () => {
    let filtered = [...ingredients];

    // Search filter
    if (searchTerm) {
      filtered = ingredientController.searchIngredients(searchTerm);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(ing => ing.categoryId === filterCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  const getCategoryName = (categoryId) => {
    const category = categoryController.getCategoryById(categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const getCategoryColor = (categoryId) => {
    const category = categoryController.getCategoryById(categoryId);
    return category ? category.color : 'default';
  };

  return (
    <div className="ingredient-list fade-in">
      <div className="list-header">
        <div className="header-left">
          <h1 className="list-title">
            <span>🥘</span>
            Ingredients Manager
          </h1>
          <p className="list-subtitle">Manage all your bakery ingredients in one place</p>
        </div>
        <div className="header-right">
          <Link to="/ingredients/add" className="btn-add">
            <span>➕</span>
            Add Ingredient
          </Link>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search ingredients..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-');
              setSortBy(by);
              setSortOrder(order);
            }}
            className="filter-select"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>

        {selectedIngredients.length > 0 && (
          <div className="batch-actions">
            <span>{selectedIngredients.length} selected</span>
            <button 
              className="btn-batch-delete"
              onClick={() => setShowDeleteModal(true)}
            >
              🗑️ Delete Selected
            </button>
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedIngredients.length === filteredIngredients().length && filteredIngredients().length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Ingredient</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients().length > 0 ? (
              filteredIngredients().map(ingredient => {
                return (
                  <tr key={ingredient.id}>
                    <td className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient.id)}
                        onChange={() => toggleSelect(ingredient.id)}
                      />
                    </td>
                    <td className="ingredient-cell">
                      <div className="ingredient-name">{ingredient.name}</div>
                    </td>
                    <td>
                      <span 
                        className="category-tag" 
                        style={{ 
                          background: `var(--${getCategoryColor(ingredient.categoryId)}-secondary, #667eea)` 
                        }}
                      >
                        {getCategoryName(ingredient.categoryId)}
                      </span>
                    </td>
                    <td className="description-cell">
                      {ingredient.description || '-'}
                    </td>
                    <td className="actions-cell">
                      <Link to={`/ingredients/edit/${ingredient.id}`} className="btn-icon edit" title="Edit">
                        ✏️
                      </Link>
                      <button 
                        onClick={() => handleDelete(ingredient.id)} 
                        className="btn-icon delete" 
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="empty-row">
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No ingredients found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠️ Confirm Delete</h3>
            <p>Are you sure you want to delete {selectedIngredients.length} ingredient(s)?</p>
            <p className="modal-warning">This action cannot be undone!</p>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={handleBatchDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-footer">
        <span className="total-count">
          Showing {filteredIngredients().length} of {ingredients.length} ingredients
        </span>
      </div>
    </div>
  );
};

export default IngredientList;
