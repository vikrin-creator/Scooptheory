import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-secondary/30 dark:bg-text-primary/5 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-text-dark font-bold">ST</div>
                <h2 className="text-text-primary dark:text-text-dark text-xl font-bold">Scoop Theory</h2>
              </Link>
            </div>
            <p className="text-text-primary/80 dark:text-text-dark/80 text-sm">Serving joy by the spoonful.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-text-primary dark:text-text-dark">Quick Links</h3>
            <Link to="/" className="text-sm text-text-primary/80 dark:text-text-dark/80 hover:text-primary">Home</Link>
            <Link to="/menu" className="text-sm text-text-primary/80 dark:text-text-dark/80 hover:text-primary">Menu</Link>
            <Link to="/contact" className="text-sm text-text-primary/80 dark:text-text-dark/80 hover:text-primary">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-text-primary dark:text-text-dark">Visit Us</h3>
            <p className="text-sm text-text-primary/80 dark:text-text-dark/80">123 Sweet Street, Flavor Town</p>
            <p className="text-sm text-text-primary/80 dark:text-text-dark/80">Mon - Sun: 11am - 10pm</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-text-primary dark:text-text-dark">Stay in the loop</h3>
            <form className="flex gap-2">
              <input 
                className="flex-grow rounded-full border border-text-primary/20 bg-background-light dark:bg-background-dark text-sm placeholder:text-text-primary/50 focus:ring-primary focus:border-primary px-4 py-2" 
                placeholder="Your email" 
                type="email"
              />
              <button className="bg-primary text-text-primary rounded-full p-2 h-fit" type="submit">
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-text-primary/10 dark:border-text-dark/10 mt-8 pt-6 text-center text-sm text-text-primary/60 dark:text-text-dark/60">
          © {new Date().getFullYear()} {' '}
          <Link to="/" className="hover:text-primary dark:hover:text-primary transition-colors font-semibold">Scoop Theory</Link>. All Rights Reserved. | 
          Designed & Developed by{' '}
          <a href="http://vikrin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-primary transition-colors font-semibold">Vikrin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
