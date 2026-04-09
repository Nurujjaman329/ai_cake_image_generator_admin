# 📁 Project Structure

```
Felicitas-Bakery-Frontend/
│
├── 📁 src/
│   ├── 📁 models/                      # Data Models (MVC - Model Layer)
│   │   ├── Category.js                 # Category & subcategory model with color themes
│   │   ├── Ingredient.js               # Ingredient model with unit types
│   │   └── BakerySettings.js           # Oven settings configuration model
│   │
│   ├── 📁 controllers/                 # Business Logic (MVC - Controller Layer)
│   │   ├── CategoryController.js       # CRUD operations for categories
│   │   ├── IngredientController.js     # CRUD operations for ingredients
│   │   └── BakerySettingsController.js # Oven settings management
│   │
│   ├── 📁 views/                       # UI Components (MVC - View Layer)
│   │   ├── 📁 Dashboard/
│   │   │   └── Dashboard.jsx           # Main dashboard overview
│   │   ├── 📁 Ingredients/
│   │   │   ├── IngredientList.jsx      # Ingredients table with search/filter
│   │   │   └── IngredientForm.jsx      # Add/Edit ingredient form
│   │   ├── 📁 Categories/
│   │   │   └── Categories.jsx          # Category management interface
│   │   ├── 📁 OvenSettings/
│   │   │   └── OvenSettings.jsx        # Oven configuration page
│   │   └── 📁 AIGenerator/
│   │       └── AIGenerator.jsx         # AI cake image generator
│   │
│   ├── 📁 components/                  # Reusable Components
│   │   └── Sidebar.jsx                 # Navigation sidebar
│   │
│   ├── 📁 utils/                       # Utility Functions
│   │   └── Storage.js                  # LocalStorage wrapper
│   │
│   ├── 📁 styles/                      # CSS Stylesheets
│   │   ├── global.css                  # Global styles & variables
│   │   ├── App.css                     # Main app layout
│   │   ├── Sidebar.css                 # Sidebar styling
│   │   ├── Dashboard.css               # Dashboard styles
│   │   ├── IngredientList.css          # Ingredient table styles
│   │   ├── IngredientForm.css          # Form styles
│   │   ├── Categories.css              # Category manager styles
│   │   ├── OvenSettings.css            # Oven settings styles
│   │   └── AIGenerator.css             # AI generator styles
│   │
│   ├── App.jsx                         # Main app component with routing
│   └── main.jsx                        # Application entry point
│
├── 📁 dist/                            # Production build (after npm run build)
│
├── 📁 node_modules/                    # Dependencies
│
├── index.html                          # HTML template
├── package.json                        # Project dependencies & scripts
├── vite.config.js                      # Vite configuration
├── README.md                           # Full documentation
└── QUICKSTART.md                       # Quick start guide
```

## 🏗️ Architecture Pattern: MVC

### **Model** (`src/models/`)
- Defines data structures
- Contains business rules
- Handles data serialization
- Examples: Category, Ingredient, BakerySettings

### **View** (`src/views/`)
- React components for UI
- User interaction handling
- State management with hooks
- Examples: Dashboard, IngredientList, Categories

### **Controller** (`src/controllers/`)
- CRUD operations
- Data persistence (localStorage)
- Business logic
- Examples: CategoryController, IngredientController

## 📊 Data Flow

```
User Action → View Component → Controller → Model → Storage
                ↑                                      ↓
                └────────── Update State ←──────────┘
```

## 🎨 Color System

### Primary Colors
- **Primary**: `#6C63FF` (Purple)
- **Secondary**: `#FF6B9D` (Pink)
- **Accent**: `#FFD93D` (Yellow)

### Category Colors
Each category has a unique color theme:
- **Milk**: Blue (`#4A90E2`)
- **Flour**: Gold (`#F5A623`)
- **Sugar**: Pink (`#FF69B4`)
- **Eggs**: Yellow (`#FFD700`)
- **Butter**: Cream (`#FFE4B5`)
- **Chocolate**: Brown (`#8B4513`)
- **Fruits**: Green (`#4CAF50`)
- **Nuts**: Taupe (`#8D6E63`)
- **Flavorings**: Purple (`#9C27B0`)

## 📦 Dependencies

### Production
- **react** (v18.2.0): UI library
- **react-dom** (v18.2.0): React DOM rendering
- **react-router-dom** (v6.22.0): Client-side routing

### Development
- **vite** (v5.1.0): Build tool & dev server
- **@vitejs/plugin-react**: React support for Vite

## 🚀 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 💾 Storage Keys

All data is stored in localStorage with these keys:
- `bakery_categories`: Categories & subcategories
- `bakery_ingredients`: Ingredients list
- `bakery_settings`: Oven configuration
- `bakery_ai_prompts`: AI generation history

## 🎯 Key Features by File

### Models
- **Category.js**: 9 default categories, color themes, subcategory management
- **Ingredient.js**: 9 unit types, sample ingredients, stock tracking
- **BakerySettings.js**: 5 oven modes, 5 rack positions, validation

### Controllers
- **CategoryController**: CRUD, search, subcategory operations
- **IngredientController**: CRUD, filtering, sorting, pagination, batch operations
- **BakerySettingsController**: Settings management, validation, presets

### Views
- **Dashboard**: Stats overview, recent items, quick access
- **IngredientList**: Search, filter, sort, batch delete, stock alerts
- **IngredientForm**: Add/edit with validation, subcategory selection
- **Categories**: Visual cards, icon picker, color themes
- **OvenSettings**: Sliders, visual gauges, mode selection
- **AIGenerator**: Ingredient selection, cake config, image generation

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 CSS Features

- CSS Variables for theming
- Gradient backgrounds
- Smooth animations
- Flexbox & Grid layouts
- Custom scrollbar styling
- Responsive design

## 🔐 Security Notes

- All data stored client-side (localStorage)
- No server communication
- No authentication (add your own if needed)
- No sensitive data storage

## 🔄 State Management

- React Hooks (useState, useEffect)
- Controller singletons for global state
- LocalStorage for persistence

---

**This project follows modern React development best practices with a clean MVC architecture!** 🧁
