// Navbar.jsx or Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css'; // Import the module CSS

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
