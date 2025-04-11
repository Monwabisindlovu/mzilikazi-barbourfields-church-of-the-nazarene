import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 px-2 py-2">
      <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-medium">
        <li><a href="/" className="whitespace-nowrap">Home</a></li>
        <li><a href="/about-us" className="whitespace-nowrap">About Us</a></li>
        <li><a href="/mission" className="whitespace-nowrap">Mission</a></li>
        <li><a href="/vision" className="whitespace-nowrap">Vision</a></li>
        <li><a href="/leadership" className="whitespace-nowrap">Leadership</a></li>
        <li><a href="/media" className="whitespace-nowrap">Media</a></li>
        <li><a href="/upcoming-events" className="whitespace-nowrap">Upcoming Events</a></li>
        <li><a href="/contact-us" className="whitespace-nowrap">Contact Us</a></li>
        <li><a href="/partnership" className="whitespace-nowrap">Partnership</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;


