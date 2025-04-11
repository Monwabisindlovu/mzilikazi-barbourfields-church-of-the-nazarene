import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './Navbar.module.css'; // Still linked in case you have custom styles

const Navbar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });

  const fontSizeClass = isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base';

  return (
    <nav className={`navbar flex justify-center items-center py-3 bg-gray-800 ${fontSizeClass}`}>
      <ul className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-white font-medium">
        <li><a href="/">Home</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/mission">Mission</a></li>
        <li><a href="/vision">Vision</a></li>
        <li><a href="/leadership">Leadership</a></li>
        <li><a href="/media">Media</a></li>
        <li><a href="/upcoming-events">Upcoming Events</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        <li><a href="/partnership">Partnership</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

