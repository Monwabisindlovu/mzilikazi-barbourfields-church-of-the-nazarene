import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nazalog.jpg';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    ['Home', '/'],
    ['About Us', '/about-us'],
    ['Mission', '/mission'],
    ['Vision', '/vision'],
    ['Leadership', '/leadership'],
    ['Media', '/media'],
    ['Upcoming Events', '/upcoming-events'],
    ['Contact Us', '/contact-us'],
    ['Partnership', '/partnership'],
  ];

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className="logo-title">
        <img src={logo} alt="Church Logo" />
        <div className="title-text">
          <h1>Mzilikazi Church of the Nazarene</h1>
          <p className="subtitle">Holiness Unto The Lord!</p>
        </div>
      </div>

      <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
        <button
          className="dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className="dropdown-menu">
          {/* Close button inside dropdown */}
          <button className="close-btn" onClick={handleCloseMenu}>×</button>
          
          {navLinks.map(([label, href]) => (
            <li key={href}>
              <Link to={href} onClick={handleCloseMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
