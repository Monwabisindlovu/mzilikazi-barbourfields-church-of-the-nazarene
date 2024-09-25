import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Navbar.module.css'; // Import the module CSS

const Navbar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/mission">Mission</a></li>
        <li><a href="/vision">Vision</a></li>
        <li><a href="/leadership">Leadership</a></li>
        <li><a href="/media">Media</a></li>
        <li><a href="/upcoming-events">Upcoming Events</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        <li><a href="/Collaboration">Collaboration</a></li>
      </ul>
      {isMobile && <p>This is a mobile device</p>}
      {isTablet && <p>This is a tablet device</p>}
      {isDesktop && <p>This is a desktop device</p>}
    </nav>
  );
};

export default Navbar;
