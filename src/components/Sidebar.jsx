import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/ingredients', icon: '🥘', label: 'Ingredients' },
    { path: '/categories', icon: '📁', label: 'Categories' },
    { path: '/oven-settings', icon: '🔥', label: 'Oven Settings' },
  ];

  const userName = user ? user.name : 'Admin';
  const userRole = user ? user.role : 'Baker';
  const userEmail = user ? user.email : '';

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
            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            {isOpen && (
              <div className="user-details">
                <div className="user-name">{userName}</div>
                <div className="user-role" title={userEmail}>{userRole}</div>
              </div>
            )}
          </div>
          {isOpen && (
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              🚪 Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
