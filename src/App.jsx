import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard/Dashboard';
import IngredientList from './views/Ingredients/IngredientList';
import IngredientForm from './views/Ingredients/IngredientForm';
import Categories from './views/Categories/Categories';
import OvenSettings from './views/OvenSettings/OvenSettings';
import './styles/global.css';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ingredients" element={<IngredientList />} />
            <Route path="/ingredients/add" element={<IngredientForm />} />
            <Route path="/ingredients/edit/:id" element={<IngredientForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/oven-settings" element={<OvenSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
