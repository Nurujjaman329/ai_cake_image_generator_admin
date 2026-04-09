import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ingredientController } from '../../controllers/IngredientController';
import { categoryController } from '../../controllers/CategoryController';
import '../../styles/IngredientForm.css';

const IngredientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: ''
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
    if (isEditMode) {
      loadIngredient();
    }
  }, [id]);

  useEffect(() => {
    if (formData.categoryId) {
      const subs = categoryController.getSubcategoriesByCategoryId(formData.categoryId);
      setSubcategories(subs);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const loadCategories = () => {
    setCategories(categoryController.getAllCategories());
  };

  const loadIngredient = () => {
    const ingredient = ingredientController.getIngredientById(id);
    if (ingredient) {
      setFormData({
        name: ingredient.name,
        categoryId: ingredient.categoryId,
        description: ingredient.description
      });
    } else {
      navigate('/ingredients');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ingredient name is required';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        ingredientController.updateIngredient(id, formData);
      } else {
        ingredientController.addIngredient(formData);
      }
      
      navigate('/ingredients');
    } catch (error) {
      setErrors({ submit: 'Failed to save ingredient. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/ingredients');
  };

  return (
    <div className="ingredient-form fade-in">
      <div className="form-header">
        <h1 className="form-title">
          <span>{isEditMode ? '✏️' : '➕'}</span>
          {isEditMode ? 'Edit Ingredient' : 'Add New Ingredient'}
        </h1>
        <p className="form-subtitle">
          {isEditMode ? 'Update the ingredient details below' : 'Fill in the details to add a new ingredient'}
        </p>
      </div>

      {errors.submit && (
        <div className="error-banner">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-section">
            <h2 className="section-title">
              <span>📝</span>
              Basic Information
            </h2>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Ingredient Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g., Organic Whole Milk"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="categoryId" className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`form-select ${errors.categoryId ? 'error' : ''}`}
              >
                <option value="">Select a category...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
            </div>

            {subcategories.length > 0 && (
              <div className="form-group">
                <label htmlFor="subcategory" className="form-label">
                  Subcategory (Optional)
                </label>
                <select
                  id="subcategory"
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a subcategory...</option>
                  {subcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describe this ingredient..."
                rows="4"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Ingredient' : 'Add Ingredient')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientForm;
