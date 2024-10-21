import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './Navbar.module.css'; // Ensure the CSS file is correctly linked

const Navbar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
  // Removed the unused `isDesktop`

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
      <ul>
        <li><a href="/">Home</a></li>
        <li
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <a href="/about-us">About Us</a>
          {dropdownOpen && (
            <ul className="dropdown-content">
              <li><a href="/mission">Mission</a></li>
              <li><a href="/vision">Vision</a></li>
            </ul>
          )}
        </li>
        <li><a href="/leadership">Leadership</a></li>
        <li><a href="/media">Media</a></li>
        <li><a href="/upcoming-events">Upcoming Events</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        <li><a href="partnership">Partnership</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
