import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path based on your folder structure

const Header = () => {
  return (
    <header className="px-6 bg-white">
      {/* Logo Image */}
      <div className="header-logo">
        <img src={logo} alt="ILUX Logo" className="h-24" /> {/* Adjust height as needed */}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black text-center">
        <span>System Down True Cost </span>
        <span className="text-pink-600">Calculator</span>
      </h1>
    </header>
  );
};

export default Header;
