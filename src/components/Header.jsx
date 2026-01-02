import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto rounded-full" src="/logo.png" alt="Scoop Theory" />
              <span className="ml-2 text-xl font-bold text-text-dark dark:text-text-light">Scoop Theory</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-text-dark dark:text-text-light hover:text-primary px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/about" className="text-text-dark dark:text-text-light hover:text-primary px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/menu" className="text-text-dark dark:text-text-light hover:text-primary px-3 py-2 text-sm font-medium">Menu</Link>
            <Link to="/gallery" className="text-text-dark dark:text-text-light hover:text-primary px-3 py-2 text-sm font-medium">Gallery</Link>
            <Link to="/contact" className="text-text-dark dark:text-text-light hover:text-primary px-3 py-2 text-sm font-medium">Contact</Link>
            <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90">
              Order Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-dark dark:text-text-light hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-background-dark shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800">About</Link>
            <Link to="/menu" className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800">Menu</Link>
            <Link to="/gallery" className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800">Gallery</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800">Contact</Link>
            <div className="px-3 py-2">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90">
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
