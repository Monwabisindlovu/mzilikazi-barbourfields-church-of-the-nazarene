import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 px-2 py-2 overflow-x-auto">
      <ul className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-medium">
        <li><a href="/" className="whitespace-nowrap px-1">Home</a></li>
        <li><a href="/about-us" className="whitespace-nowrap px-1">About Us</a></li>
        <li><a href="/mission" className="whitespace-nowrap px-1">Mission</a></li>
        <li><a href="/vision" className="whitespace-nowrap px-1">Vision</a></li>
        <li><a href="/leadership" className="whitespace-nowrap px-1">Leadership</a></li>
        <li><a href="/media" className="whitespace-nowrap px-1">Media</a></li>
        <li><a href="/upcoming-events" className="whitespace-nowrap px-1">Upcoming Events</a></li>
        <li><a href="/contact-us" className="whitespace-nowrap px-1">Contact Us</a></li>
        <li><a href="/partnership" className="whitespace-nowrap px-1">Partnership</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;


