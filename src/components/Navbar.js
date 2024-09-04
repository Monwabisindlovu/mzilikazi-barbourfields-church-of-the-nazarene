import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Assuming you have CSS for Navbar

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/mission">Mission</Link></li>
        <li><Link to="/vision">Vision</Link></li>
        <li><Link to="/leadership">Leadership</Link></li>
        <li><Link to="/media">Media</Link></li>
        <li><Link to="/upcoming-events">Upcoming Events</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><a href="/donations">Donations</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
