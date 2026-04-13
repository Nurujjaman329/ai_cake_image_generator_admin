import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Auth/Login';
import Dashboard from './views/Dashboard/Dashboard';
import IngredientList from './views/Ingredients/IngredientList';
import IngredientForm from './views/Ingredients/IngredientForm';
import Categories from './views/Categories/Categories';
import OvenSettings from './views/OvenSettings/OvenSettings';
import Profile from './views/Profile/Profile';
import './styles/global.css';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public route - Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes - require authentication */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
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
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
