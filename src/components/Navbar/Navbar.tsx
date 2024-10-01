import React from 'react';
import './Navbar.css';
import { NavbarProps } from '../../interfaces/props/NavbarProps';

const Navbar: React.FC<NavbarProps> = ({ children, toggleMenu }) => {
    return (
        <nav className="navbar">
            <button className="hamburger-menu" aria-label="Open menu" onClick={toggleMenu}>
                ☰
            </button>
            <div className="search-container">
                {children}
            </div>
        </nav>
    );
};

export default Navbar;