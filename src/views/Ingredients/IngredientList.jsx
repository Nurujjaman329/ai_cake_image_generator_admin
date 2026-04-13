import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ingredientController } from '../../controllers/IngredientController';
import { categoryController } from '../../controllers/CategoryController';
import '../../styles/IngredientList.css';

const IngredientList = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedSubcategoryCategory, setSelectedSubcategoryCategory] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(categoryController.getAllCategories());
  };

  const handleAddIngredient = () => {
    if (!newIngredientName.trim() || !selectedCategory) return;

    ingredientController.addIngredient({
      name: newIngredientName,
      categoryId: selectedCategory,
      description: ''
    });

    setNewIngredientName('');
    setSelectedCategory('');
    setShowAddModal(false);
    loadCategories();
  };

  const handleDeleteIngredient = (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      ingredientController.deleteIngredient(id);
      loadCategories();
    }
  };

  const handleAddSubcategory = () => {
    if (!newSubcategoryName.trim() || !selectedSubcategoryCategory) return;

    categoryController.addSubcategory(selectedSubcategoryCategory, {
      name: newSubcategoryName
    });

    setNewSubcategoryName('');
    setSelectedSubcategoryCategory('');
    setShowSubcategoryModal(false);
    loadCategories();
  };

  const handleEditSubcategory = (category, subcategory) => {
    setSelectedSubcategoryCategory(category.id);
    setNewSubcategoryName(subcategory.name);
    setEditingSubcategory({ categoryId: category.id, subcategoryId: subcategory.id });
    setShowSubcategoryModal(true);
  };

  const handleUpdateSubcategory = () => {
    if (!newSubcategoryName.trim() || !editingSubcategory) return;

    categoryController.updateSubcategory(
      editingSubcategory.categoryId,
      editingSubcategory.subcategoryId,
      { name: newSubcategoryName }
    );

    setNewSubcategoryName('');
    setEditingSubcategory(null);
    setShowSubcategoryModal(false);
    loadCategories();
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    if (window.confirm('Delete this subcategory?')) {
      categoryController.deleteSubcategory(categoryId, subcategoryId);
      loadCategories();
    }
  };

  const resetSubcategoryForm = () => {
    setNewSubcategoryName('');
    setSelectedSubcategoryCategory('');
    setEditingSubcategory(null);
  };

  return (
    <div className="ingredient-list">
      <div className="ingredient-header">
        <div className="header-left">
          <h1 className="ingredient-title">Ingredients Manager</h1>
          <p className="ingredient-subtitle">Organize ingredients by category and manage subcategories</p>
        </div>
        <div className="header-right">
          <button
            className="btn-add-new"
            onClick={() => setShowAddModal(true)}
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-ingredients-grid">
        {categories.map(category => (
          <div key={category.id} className="category-ingredient-card">
            <div className="category-ingredient-header">
              <div className="category-icon-name">
                <span className="category-icon-small">{category.icon}</span>
                <span className="category-name-text">{category.name}</span>
              </div>
              <button
                className="btn-add-sub-small"
                onClick={() => {
                  setSelectedSubcategoryCategory(category.id);
                  setEditingSubcategory(null);
                  setNewSubcategoryName('');
                  setShowSubcategoryModal(true);
                }}
              >
                + Add
              </button>
            </div>

            <div className="subcategory-items">
              {category.subcategories.map(sub => (
                <div key={sub.id} className="subcategory-item-new">
                  <span className="subcategory-name-new">{sub.name}</span>
                  <div className="subcategory-actions-new">
                    <button
                      className="btn-icon-small-edit"
                      onClick={() => handleEditSubcategory(category, sub)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon-small-delete"
                      onClick={() => handleDeleteSubcategory(category.id, sub.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Ingredient Modal */}
      {showAddModal && (
        <div className="modal-overlay-new" onClick={() => setShowAddModal(false)}>
          <div className="modal-new" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title-new">Add Ingredients</h3>
            <p className="modal-subtitle-new">Create and manage ingredients here</p>

            <div className="modal-form-new">
              <div className="form-group-new">
                <label className="form-label-new">Ingredients Name</label>
                <input
                  type="text"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  className="form-input-new"
                  placeholder="e.g., Organic Flour"
                  autoFocus
                />
              </div>

              <div className="form-group-new">
                <label className="form-label-new">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select-new"
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-new">
                <label className="form-label-new">Upload Image</label>
                <div className="image-upload-area">
                  <div className="upload-icon">📤</div>
                  <p>Drag file or browse</p>
                  <span className="upload-hint">Supports: JPG, PNG, HEIC</span>
                  <button className="btn-choose-file">Choose a file</button>
                </div>
              </div>
            </div>

            <div className="modal-actions-new">
              <button
                className="btn-save-new"
                onClick={handleAddIngredient}
                disabled={!newIngredientName.trim() || !selectedCategory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="modal-overlay-new" onClick={() => { setShowSubcategoryModal(false); resetSubcategoryForm(); }}>
          <div className="modal-new modal-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title-new">
              {editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
            </h3>
            <p className="modal-subtitle-new">
              {editingSubcategory ? 'Update subcategory details' : 'Create a new subcategory'}
            </p>

            <div className="modal-form-new">
              <div className="form-group-new">
                <label className="form-label-new">Category</label>
                <select
                  value={selectedSubcategoryCategory}
                  onChange={(e) => setSelectedSubcategoryCategory(e.target.value)}
                  className="form-select-new"
                  disabled={!!editingSubcategory}
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-new">
                <label className="form-label-new">Subcategory Name</label>
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  className="form-input-new"
                  placeholder="e.g., Whole Wheat Flour"
                  autoFocus
                />
              </div>

              <div className="form-group-new">
                <label className="form-label-new">Description</label>
                <textarea
                  className="form-textarea-new"
                  placeholder="Enter description..."
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-actions-new">
              <button
                className="btn-save-new"
                onClick={editingSubcategory ? handleUpdateSubcategory : handleAddSubcategory}
                disabled={!newSubcategoryName.trim() || !selectedSubcategoryCategory}
              >
                {editingSubcategory ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientList;
