import React from 'react';
import './Navbar.css';
import { NavbarProps } from '../../interfaces/NavbarProps';

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="navbar">
      <button className="hamburger-menu" aria-label="Open menu">
        ☰
      </button>
      <div className="search-container">
        {children}
      </div>
    </nav>
  );
};

export default Navbar;