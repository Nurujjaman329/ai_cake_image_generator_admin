import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/ingredients', icon: '🥘', label: 'Ingredients' },
    { path: '/categories', icon: '📁', label: 'Categories' },
    { path: '/oven-settings', icon: '🔥', label: 'Oven Settings' },
  ];

  return (
    <>
      {/* Overlay for mobile only */}
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🧁</span>
            {isOpen && <span className="logo-text">Felicitas</span>}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => isMobile && toggleSidebar()}
            >
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">A</div>
            {isOpen && (
              <div className="user-details">
                <div className="user-name">Admin</div>
                <div className="user-role">Baker</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
