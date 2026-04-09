# 🧁 Felicitas Bakery Admin Panel

A comprehensive admin panel for managing bakery ingredients, categories, oven settings, and AI-powered cake image generation. Built with React.js using the MVC pattern.

## ✨ Features

### 📊 Dashboard
- Overview of total ingredients, categories, and stock alerts
- Quick access to recent ingredients
- Oven temperature preview
- Beautiful gradient stat cards with animations

### 🥘 Ingredients Management
- **View all ingredients** in a beautiful table layout
- **Add new ingredients** with detailed information
- **Edit existing ingredients** 
- **Delete ingredients** (single or batch delete)
- **Search & Filter** by name, category, stock level
- **Sort** by name, stock, or price
- **Stock alerts** - Visual indicators for low/out-of-stock items
- **Pagination support**

### 📁 Categories Management
- **Create/Edit/Delete categories** with custom icons and color themes
- **Add subcategories** (e.g., Milk → Cow Milk, Goat Milk, Almond Milk)
- **9 pre-configured bakery categories** with color coding
- **Icon picker** for visual category identification
- **Color theme selector** for bakery-themed color codes

### 🔥 Oven Settings
- **Temperature control** (50°C - 300°C) with visual slider
- **Oven mode selection**: Conventional, Convection, Fan-Assisted, Grill, Bottom Heat
- **Baking time configuration**
- **Preheat time settings**
- **Humidity control**
- **Fan speed adjustment**
- **Rack position selection**
- **Total estimated time calculation**
- **Visual gauges and displays**

### 🎨 AI Cake Generator
- **Select ingredients** from categories
- **Configure cake settings**:
  - Style: Classic, Modern, Rustic, Elegant, Fun, Minimalist
  - Size: Small, Medium, Large, Extra Large
  - Layers: 1-5 layers
- **Custom prompt input** for additional details
- **AI image generation** (simulated with placeholder)
- **Generation history** - Save last 10 generations
- **Beautiful UI** with animations

## 🎨 Color Theme

The admin panel uses a unique bakery-themed color palette:

- **Primary**: Purple gradient (#667eea → #764ba2)
- **Secondary**: Pink gradient (#f093fb → #f5576c)
- **Accent**: Warm yellow (#fa709a → #fee140)
- **Category Colors**: Milk (Blue), Flour (Gold), Sugar (Pink), Eggs (Yellow), Butter (Cream), Chocolate (Brown), Fruits (Green), Nuts (Taupe), Flavorings (Purple)

## 🏗️ Architecture

### MVC Pattern

**Models** (`src/models/`)
- `Category.js` - Category and subcategory data structure
- `Ingredient.js` - Ingredient data and unit types
- `BakerySettings.js` - Oven settings configuration

**Views** (`src/views/`)
- `Dashboard/` - Main dashboard overview
- `Ingredients/` - Ingredient list and forms
- `Categories/` - Category management
- `OvenSettings/` - Oven configuration
- `AIGenerator/` - AI cake image generator

**Controllers** (`src/controllers/`)
- `CategoryController.js` - CRUD operations for categories
- `IngredientController.js` - CRUD operations for ingredients
- `BakerySettingsController.js` - Oven settings management

**Components** (`src/components/`)
- `Sidebar.jsx` - Navigation sidebar
- Reusable UI components

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd Felicitas-Bakery-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Felicitas-Bakery-Frontend/
├── src/
│   ├── models/
│   │   ├── Category.js
│   │   ├── Ingredient.js
│   │   └── BakerySettings.js
│   ├── controllers/
│   │   ├── CategoryController.js
│   │   ├── IngredientController.js
│   │   └── BakerySettingsController.js
│   ├── views/
│   │   ├── Dashboard/
│   │   ├── Ingredients/
│   │   ├── Categories/
│   │   ├── OvenSettings/
│   │   └── AIGenerator/
│   ├── components/
│   │   └── Sidebar.jsx
│   ├── utils/
│   │   └── Storage.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── Sidebar.css
│   │   ├── Dashboard.css
│   │   ├── IngredientList.css
│   │   ├── IngredientForm.css
│   │   ├── Categories.css
│   │   ├── OvenSettings.css
│   │   └── AIGenerator.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💾 Data Persistence

All data is stored in **localStorage** for persistence across browser sessions. This includes:
- Categories and subcategories
- Ingredients
- Oven settings
- AI generation history

## 🎯 Key Features

### Unique UI Elements
- ✨ Gradient backgrounds and smooth animations
- 🎨 Bakery-themed color palette
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔄 Collapsible sidebar navigation
- 🎭 Beautiful modals and forms
- 📊 Data visualization with gauges and charts
- ⚡ Real-time search and filtering
- 🗑️ Batch operations with confirmation
- 🔔 Stock level alerts
- 🎨 Icon and color pickers

### User Experience
- Smooth page transitions
- Hover effects and micro-interactions
- Loading states and animations
- Empty states with helpful messages
- Form validation with error messages
- Confirmation modals for destructive actions
- Tooltips and help text

## 🔧 Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with gradients and animations
- **LocalStorage API** - Client-side data persistence

## 🎨 Default Categories

1. 🥛 **Milk & Dairy** - Cow Milk, Goat Milk, Almond Milk, Buttermilk
2. 🌾 **Flour & Grains** - All-Purpose Flour, Whole Wheat, Almond Flour, Oat Flour
3. 🍬 **Sugar & Sweeteners** - White Sugar, Brown Sugar, Powdered Sugar, Honey
4. 🥚 **Eggs** - Large Eggs, Egg Whites, Duck Eggs
5. 🧈 **Butter & Fats** - Unsalted Butter, Salted Butter, Margarine, Coconut Oil
6. 🍫 **Chocolate & Cocoa** - Dark Chocolate, Milk Chocolate, Cocoa Powder, White Chocolate
7. 🍓 **Fruits & Berries** - Strawberries, Blueberries, Raspberries, Cherries
8. 🥜 **Nuts & Seeds** - Almonds, Walnuts, Pecans, Cashews
9. 🌿 **Flavorings** - Vanilla Extract, Almond Extract, Cinnamon, Nutmeg

## 📝 Usage Tips

### Adding Ingredients
1. Navigate to Ingredients → Add Ingredient
2. Select a category (e.g., Milk & Dairy)
3. Choose a subcategory if available (e.g., Cow Milk)
4. Fill in stock levels, unit type, and price
5. Save and repeat!

### Managing Categories
1. Go to Categories
2. Click "Add Category" to create new ones
3. Click the "+ Add" button on any category to add subcategories
4. Edit or delete using the action buttons

### Configuring Oven Settings
1. Navigate to Oven Settings
2. Click "Edit Settings"
3. Adjust temperature with the slider
4. Select oven mode from the visual options
5. Configure time, humidity, fan speed, and rack position
6. Save changes

### Generating Cake Images
1. Go to AI Cake Generator
2. Select a category (e.g., Milk & Dairy)
3. Choose specific ingredients (e.g., Cow Milk, Butter)
4. Configure cake style, size, and layers
5. Add custom prompt text (optional)
6. Click "Generate Cake Image"
7. View your generated image and prompt details

## 🌟 Future Enhancements

- Integration with real AI image generation API (DALL-E, Stable Diffusion)
- Backend API integration for multi-user support
- Export/import data functionality
- Advanced analytics and charts
- Recipe management
- Order tracking
- User authentication and roles
- Dark mode toggle
- Print-friendly reports

## 📄 License

This project is created for Felicitas Bakery.

## 👨‍💻 Developer Notes

- All controllers are singleton instances for consistent state management
- The app uses localStorage for persistence (can be replaced with backend API)
- Responsive breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- Default oven settings: 180°C, Conventional mode, 30min baking, 15min preheat

## 🐛 Troubleshooting

**Issue: App not loading**
- Make sure the dev server is running (`npm run dev`)
- Check browser console for errors
- Clear browser cache and localStorage

**Issue: Data not persisting**
- Check if localStorage is enabled in your browser
- Try clearing localStorage and refreshing

**Issue: Images not loading**
- The AI generator uses Unsplash placeholder images
- Make sure you have an internet connection

## 📞 Support

For issues or questions, please check the code comments or refer to this README.

---

**Made with 🧁 and ❤️ for Felicitas Bakery**
