import * as React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/discover">Discover</Link>
      <Link to="/messages">Messages</Link>
    </nav>
  );
};