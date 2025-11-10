import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Menu from './pages/Menu';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="relative min-h-screen w-full flex flex-col font-display bg-background-light dark:bg-background-dark">
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 flex w-full justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 max-w-6xl w-full">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 text-text-primary dark:text-text-dark">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-text-dark font-bold">ST</div>
                <h2 className="text-text-primary dark:text-text-dark text-xl font-bold leading-tight tracking-tight">Scoop Theory</h2>
              </Link>
            </div>
            
            <nav className="hidden md:flex flex-1 justify-center gap-8">
              <Link to="/" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-primary dark:text-primary text-sm font-bold leading-normal">Our Story</Link>
              <Link to="/menu" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Menu</Link>
              <Link to="/gallery" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Products</Link>
              <Link to="/contact" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Contact</Link>
            </nav>
            
            <div className="hidden md:flex justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-text-primary text-sm font-bold leading-normal tracking-wide shadow-sm hover:opacity-90 transition-opacity">
                <span className="truncate">Order Now</span>
              </button>
            </div>
            
            <div className="md:hidden">
              <button 
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined text-text-primary dark:text-text-dark">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark shadow-lg md:hidden">
              <div className="flex flex-col p-4 space-y-4">
                <Link 
                  to="/" 
                  className="text-text-primary dark:text-text-dark text-base font-medium py-2 px-4 hover:bg-primary/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-primary dark:text-primary text-base font-bold py-2 px-4 bg-primary/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link 
                  to="/menu" 
                  className="text-text-primary dark:text-text-dark text-base font-medium py-2 px-4 hover:bg-primary/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link 
                  to="/gallery" 
                  className="text-text-primary dark:text-text-dark text-base font-medium py-2 px-4 hover:bg-primary/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/contact" 
                  className="text-text-primary dark:text-text-dark text-base font-medium py-2 px-4 hover:bg-primary/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <button className="w-full mt-2 flex items-center justify-center h-10 px-6 bg-primary text-text-primary text-sm font-bold rounded-full shadow-sm hover:opacity-90 transition-opacity">
                  Order Now
                </button>
              </div>
            </div>
          )}
        </header>
        
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={
              <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    className="h-full w-full object-cover" 
                    alt="A delightful scene of pastel-colored ice cream scoops with various toppings" 
                    src="/images/hero_bg.jpg"
                  />
                  <div className="absolute inset-0 bg-background-light/30 dark:bg-background-dark/50"></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                  <h1 className="text-text-dark dark:text-text-light text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-md">
                    Scoop Theory
                  </h1>
                  <h2 className="text-text-dark dark:text-text-light mt-2 text-lg md:text-xl font-normal leading-normal drop-shadow-sm">
                    Where Every Scoop Tells a Story.
                  </h2>
                  <Link 
                    to="/gallery"
                    className="mt-8 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-text-dark text-base font-bold shadow-soft transition-transform hover:scale-105"
                  >
                    <span className="truncate">Explore Our Flavors</span>
                  </Link>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
        
        {/* FAB (Floating Action Button) */}
        <button className="fixed bottom-6 right-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-text-primary shadow-lg transition-transform hover:scale-105">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </Router>
  );
}

export default App;