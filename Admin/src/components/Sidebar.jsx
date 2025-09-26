import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle, onLogout }) => {
  const location = useLocation();

const menuItems = [
  { path: '/', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { path: '/bible', icon: 'ri-book-line', label: 'Bible Verses' },
  { path: '/quiz', icon: 'ri-questionnaire-line', label: 'Quiz' },
  { path: '/members', icon: 'ri-team-line', label: 'Members' },
  { path: '/leaders', icon: 'ri-user-star-line', label: 'Leaders' },
  { path: '/news', icon: 'ri-newspaper-line', label: 'News' },
  { path: '/media', icon: 'ri-image-line', label: 'Media' },
  { path: '/events', icon: 'ri-calendar-event-line', label: 'Events' },
  { path: '/finance', icon: 'ri-money-dollar-box-line', label: 'Finance' },
  { path: '/reports', icon: 'ri-bar-chart-line', label: 'Reports' }
];

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="ri-church-line"></i>
          {isOpen && <span>USCF Admin</span>}
        </div>
        <button className="toggle-btn" onClick={onToggle}>
          <i className={`ri-${isOpen ? 'arrow-left-s-line' : 'arrow-right-s-line'}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path)}`}
              >
                <i className={item.icon}></i>
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <i className="ri-logout-box-r-line"></i>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;