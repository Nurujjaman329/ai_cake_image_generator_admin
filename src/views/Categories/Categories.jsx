import React, { useState, useEffect } from 'react';
import { categoryController } from '../../controllers/CategoryController';
import { CATEGORY_COLORS } from '../../models/Category';
import '../../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📦');
  const [newCategoryColor, setNewCategoryColor] = useState('default');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(categoryController.getAllCategories());
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    if (editingCategory) {
      categoryController.updateCategory(editingCategory.id, {
        name: newCategoryName,
        icon: newCategoryIcon,
        color: newCategoryColor
      });
    } else {
      categoryController.addCategory({
        name: newCategoryName,
        icon: newCategoryIcon,
        color: newCategoryColor,
        subcategories: []
      });
    }

    resetForm();
    loadCategories();
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryIcon(category.icon);
    setNewCategoryColor(category.color);
    setShowAddModal(true);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? All subcategories will be removed as well.')) {
      categoryController.deleteCategory(id);
      loadCategories();
    }
  };

  const handleAddSubcategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setNewSubcategoryName('');
    setEditingSubcategory(null);
    setShowSubcategoryModal(true);
  };

  const handleEditSubcategory = (category, subcategory) => {
    setSelectedCategory(category.id);
    setNewSubcategoryName(subcategory.name);
    setEditingSubcategory(subcategory);
    setShowSubcategoryModal(true);
  };

  const handleSaveSubcategory = () => {
    if (!newSubcategoryName.trim() || !selectedCategory) return;

    if (editingSubcategory) {
      categoryController.updateSubcategory(selectedCategory, editingSubcategory.id, {
        name: newSubcategoryName
      });
    } else {
      categoryController.addSubcategory(selectedCategory, {
        name: newSubcategoryName
      });
    }

    setShowSubcategoryModal(false);
    loadCategories();
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    if (window.confirm('Delete this subcategory?')) {
      categoryController.deleteSubcategory(categoryId, subcategoryId);
      loadCategories();
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryIcon('📦');
    setNewCategoryColor('default');
  };

  const iconOptions = ['🥛', '🌾', '🍬', '🥚', '🧈', '🍫', '🍓', '🥜', '🌿', '📦', '🎂', '🍰', '🍞', '🥐', '🍩'];

  return (
    <div className="categories fade-in">
      <div className="categories-header">
        <div className="header-left">
          <h1 className="categories-title">
            <span>📁</span>
            Categories Manager
          </h1>
          <p className="categories-subtitle">Organize ingredients into categories and subcategories</p>
        </div>
        <button 
          className="btn-add-category"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <span>➕</span>
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => {
          const colors = CATEGORY_COLORS[category.color] || CATEGORY_COLORS.default;
          
          return (
            <div 
              key={category.id} 
              className="category-card"
              style={{ 
                borderColor: colors.secondary 
              }}
            >
              <div 
                className="category-header"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
                }}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <span className="subcategory-count">
                    {category.subcategories.length} item{category.subcategories.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="category-actions">
                  <button 
                    className="btn-icon-small edit"
                    onClick={() => handleEditCategory(category)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-icon-small delete"
                    onClick={() => handleDeleteCategory(category.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="subcategory-section">
                <div className="subcategory-header">
                  <h4 className="subcategory-title">Subcategories</h4>
                  <button 
                    className="btn-add-sub"
                    onClick={() => handleAddSubcategory(category.id)}
                  >
                    + Add
                  </button>
                </div>

                {category.subcategories.length > 0 ? (
                  <div className="subcategory-list">
                    {category.subcategories.map(sub => (
                      <div key={sub.id} className="subcategory-item">
                        <div className="subcategory-dot"></div>
                        <span className="subcategory-name">{sub.name}</span>
                        <div className="subcategory-actions">
                          <button 
                            className="btn-icon-xs"
                            onClick={() => handleEditSubcategory(category, sub)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-icon-xs delete"
                            onClick={() => handleDeleteSubcategory(category.id, sub.id)}
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-subcategories">
                    <p>No subcategories yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal category-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingCategory ? '✏️ Edit Category' : '➕ Add New Category'}</h3>
            
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="form-input"
                  placeholder="e.g., Milk & Dairy"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon</label>
                <div className="icon-picker">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      className={`icon-option ${newCategoryIcon === icon ? 'selected' : ''}`}
                      onClick={() => setNewCategoryIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Color Theme</label>
                <div className="color-picker">
                  {Object.entries(CATEGORY_COLORS).map(([key, colors]) => (
                    <button
                      key={key}
                      className={`color-option ${newCategoryColor === key ? 'selected' : ''}`}
                      onClick={() => setNewCategoryColor(key)}
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        border: newCategoryColor === key ? '3px solid #333' : '3px solid transparent'
                      }}
                      title={key}
                    >
                      {key.charAt(0).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={resetForm}>Cancel</button>
              <button 
                className="btn-submit"
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
              >
                {editingCategory ? 'Update' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="modal-overlay" onClick={() => setShowSubcategoryModal(false)}>
          <div className="modal subcategory-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSubcategory ? '✏️ Edit Subcategory' : '➕ Add Subcategory'}</h3>
            
            <div className="form-group">
              <label className="form-label">Subcategory Name</label>
              <input
                type="text"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                className="form-input"
                placeholder="e.g., Cow Milk"
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowSubcategoryModal(false)}>Cancel</button>
              <button 
                className="btn-submit"
                onClick={handleSaveSubcategory}
                disabled={!newSubcategoryName.trim()}
              >
                {editingSubcategory ? 'Update' : 'Add Subcategory'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
