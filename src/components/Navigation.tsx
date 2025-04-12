import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span>Home</span>
        </Link>
        
        <Link 
          to="/discover" 
          className={`nav-item ${location.pathname === '/discover' ? 'active' : ''}`}
        >
          <span>Discover</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <span>Profile</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`nav-item ${location.pathname === '/messages' ? 'active' : ''}`}
        >
          <span>Messages</span>
        </Link>
      </div>
    </nav>
  );
};