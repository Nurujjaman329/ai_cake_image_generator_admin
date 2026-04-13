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
    <div className="ingredient-form-page">
      <div className="form-header-new">
        <h1 className="form-title-new">
          {isEditMode ? 'Edit Ingredients' : 'Add Ingredients'}
        </h1>
        <p className="form-subtitle-new">
          {isEditMode ? 'Update ingredient details below' : 'Create and manage ingredients here'}
        </p>
      </div>

      {errors.submit && (
        <div className="error-banner-new">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="ingredient-form-container">
        <div className="form-section-new">
          <div className="form-group-new">
            <label htmlFor="name" className="form-label-new">
              Ingredients Name <span className="required-new">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input-new ${errors.name ? 'error-new' : ''}`}
              placeholder="e.g., Organic Whole Milk"
              autoFocus
            />
            {errors.name && <span className="error-message-new">{errors.name}</span>}
          </div>

          <div className="form-group-new">
            <label htmlFor="categoryId" className="form-label-new">
              Category <span className="required-new">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`form-select-new ${errors.categoryId ? 'error-new' : ''}`}
            >
              <option value="">Select a category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <span className="error-message-new">{errors.categoryId}</span>}
          </div>

          {subcategories.length > 0 && (
            <div className="form-group-new">
              <label htmlFor="subcategory" className="form-label-new">
                Subcategory (Optional)
              </label>
              <select
                id="subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="form-select-new"
              >
                <option value="">Select a subcategory...</option>
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group-new">
            <label htmlFor="description" className="form-label-new">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea-new"
              placeholder="Describe this ingredient..."
              rows="4"
            />
          </div>

          <div className="form-group-new">
            <label className="form-label-new">Upload Image</label>
            <div className="image-upload-area-new">
              <div className="upload-icon-new">📤</div>
              <p>Drag file or browse</p>
              <span className="upload-hint-new">Supports: JPG, PNG, HEIC</span>
              <button type="button" className="btn-choose-file-new">Choose a file</button>
            </div>
          </div>
        </div>

        <div className="form-actions-new">
          <button
            type="button"
            className="btn-cancel-new"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit-new"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientForm;
