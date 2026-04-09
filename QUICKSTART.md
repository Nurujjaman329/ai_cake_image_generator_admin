# 🚀 Quick Start Guide - Felicitas Bakery Admin Panel

## ✅ Installation Complete!

Your admin panel has been successfully created and built. Here's how to use it:

## 🎯 Running the Application

### Development Mode (Recommended for Development)
```bash
npm run dev
```
This will start the development server on `http://localhost:5173`

### Production Mode
```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📱 How to Access

Once the server is running, open your browser and visit:
**http://localhost:5173**

## 🎨 Features Overview

### 1. **Dashboard** (`/`)
- Overview statistics with beautiful gradient cards
- Recent ingredients list
- Quick access to all sections
- Low stock alerts

### 2. **Ingredients Manager** (`/ingredients`)
- **View** all ingredients in a sortable table
- **Search** by name or description
- **Filter** by category and stock level
- **Add** new ingredients with the "+ Add Ingredient" button
- **Edit** existing ingredients
- **Delete** single or batch ingredients
- **Stock alerts** - Visual indicators for low/out-of-stock items

### 3. **Categories Manager** (`/categories`)
- **9 pre-configured categories**: Milk & Dairy, Flour & Grains, Sugar & Sweeteners, Eggs, Butter & Fats, Chocolate & Cocoa, Fruits & Berries, Nuts & Seeds, Flavorings
- **Add new categories** with custom icons and colors
- **Add subcategories** (e.g., Milk → Cow Milk, Goat Milk, Almond Milk)
- **Edit/Delete** categories and subcategories
- **Icon picker** and **color theme selector**

### 4. **Oven Settings** (`/oven-settings`)
- **Temperature control** (50°C - 300°C)
- **5 oven modes**: Conventional, Convection, Fan-Assisted, Grill, Bottom Heat
- **Baking & Preheat time** configuration
- **Humidity & Fan speed** controls
- **5 rack positions**
- **Visual gauges** and real-time previews

### 5. **AI Cake Generator** (`/ai-generator`)
- **Select ingredients** from categories
- **Configure cake settings**:
  - 6 styles: Classic, Modern, Rustic, Elegant, Fun, Minimalist
  - 4 sizes: Small, Medium, Large, Extra Large
  - 1-5 layers
- **Custom prompt** for additional details
- **Generate beautiful AI-created cake images**
- **View generation history**

## 🎯 Sample Workflow

### Adding Your First Ingredient:
1. Go to **Ingredients** from the sidebar
2. Click **"+ Add Ingredient"**
3. Select a category (e.g., "Milk & Dairy")
4. Choose a subcategory (e.g., "Cow Milk")
5. Fill in:
   - Name: "Organic Whole Milk"
   - Stock: 5000
   - Unit: ml
   - Price: 0.002
6. Click **"Add Ingredient"**
7. Repeat for more ingredients!

### Managing Categories:
1. Go to **Categories**
2. Click **"Add Category"** to create new ones
3. Click **"+ Add"** on any category card to add subcategories
4. Use the ✏️ and 🗑️ buttons to edit/delete

### Configuring Oven:
1. Go to **Oven Settings**
2. Click **"Edit Settings"**
3. Adjust the temperature slider
4. Select your preferred oven mode
5. Configure time, humidity, fan, and rack position
6. Click **"Save Changes"**

### Generating Cake Images:
1. Go to **AI Cake Generator**
2. Select a category (e.g., "Milk & Dairy")
3. Select ingredients (e.g., "Cow Milk", "Butter")
4. Choose cake style, size, and layers
5. Add custom prompt (optional)
6. Click **"Generate Cake Image"**
7. Wait for the AI to create your masterpiece!

## 🎨 Color Themes

The admin panel uses beautiful bakery-themed colors:
- **Primary**: Purple gradient
- **Secondary**: Pink gradient
- **Categories**: Each has a unique color (Milk=Blue, Flour=Gold, Sugar=Pink, etc.)

## 💾 Data Storage

All your data is saved in **localStorage** and will persist between browser sessions:
- Categories & subcategories
- Ingredients
- Oven settings
- AI generation history

## 📱 Responsive Design

The app works on all devices:
- **Desktop** (>1024px): Full sidebar navigation
- **Tablet** (768-1024px): Collapsible sidebar
- **Mobile** (<768px): Hamburger menu

## 🎯 Key Shortcuts

- **Sidebar**: Click the toggle button (◀/▶) to collapse/expand
- **Mobile**: Click the ☰ button to show/hide sidebar
- **Quick Navigation**: Use the sidebar menu to switch between sections

## 🐛 Troubleshooting

**Issue: Can't see the sidebar**
- On mobile, click the ☰ button in the top-left corner
- On desktop, the sidebar should be visible by default

**Issue: Data not saving**
- Make sure localStorage is enabled in your browser settings
- Try clearing localStorage and refreshing the page

**Issue: Images not loading in AI Generator**
- The AI generator uses Unsplash placeholder images
- Make sure you have an internet connection

## 📝 Default Data

The app comes pre-loaded with:
- **9 categories** with subcategories
- **6 sample ingredients**
- **Default oven settings** (180°C, Conventional mode)

## 🎉 Next Steps

1. Explore each section
2. Add your own ingredients
3. Customize categories
4. Configure oven settings
5. Generate cake images
6. Have fun! 🧁

---

**Need help?** Check the README.md for detailed documentation.

**Made with 🧁 and ❤️ for Felicitas Bakery**
