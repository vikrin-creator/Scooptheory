import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import About from './pages/About';
import Menu from './pages/Menu';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { seoData } from './data/seoData';

// ScrollToTop component to handle automatic scrolling on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
      <div className="relative min-h-screen w-full flex flex-col font-display bg-background-light dark:bg-background-dark">
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 flex w-full justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-2 max-w-6xl w-full">
            <div className="flex items-center gap-2 -ml-2">
              <Link to="/" className="flex items-center gap-2 text-text-primary dark:text-text-dark">
                <img src="/logo.png" alt="Scoop Theory" className="h-16 object-cover" />
              </Link>
            </div>
            
            <nav className="hidden md:flex flex-1 justify-center gap-8">
              <Link to="/" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-text-primary dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors">Our Story</Link>
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
                  className="text-text-primary dark:text-text-dark text-base font-medium py-2 px-4 hover:bg-primary/10 rounded-lg"
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
              <div className="w-full">
                <SEOHead {...seoData.home} />
                {/* Hero Section */}
                <div className="relative h-[70vh] md:h-screen w-full flex items-center overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      className="h-full w-full object-cover" 
                      alt="A delightful scene of pastel-colored ice cream scoops with various toppings" 
                      src="/images/hero_bg.png"
                    />
                    <div className="absolute inset-0 bg-background-light/30 dark:bg-background-dark/50"></div>
                  </div>
                  
                  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-20">
                    <div className="flex items-center">
                      <div className="max-w-lg text-left ml-4 sm:ml-8 md:ml-0">
                        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl mb-6" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                          IT'S SCOOP<br className="md:hidden" /> TIME
                        </h1>
                        <p className="text-white text-lg md:text-xl leading-relaxed drop-shadow-xl mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                          Handcrafted, irresistibly creamy, and full of flavors. Grab a scoop and taste the magic in every bite. Scoop in and let the good vibe begin.
                        </p>
                        <Link 
                          to="/menu"
                          className="inline-flex items-center px-8 py-4 bg-primary text-text-primary text-base font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity"
                        >
                          Explore Our Flavors
                          <span className="ml-2 material-symbols-outlined">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Section - Image Left, Content Right */}
                <section className="py-20 bg-background-light dark:bg-background-dark">
                  <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                      {/* Image on the Left */}
                      <div className="lg:w-1/3 w-full">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
                          <img 
                            src="/images/taro_milk_tea.jpg" 
                            alt="Crafting premium ice cream" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* Content on the Right */}
                      <div className="lg:w-2/3 lg:pl-12 flex flex-col justify-start pt-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-6">
                          Our Craftsmanship
                        </h2>
                        <p className="text-lg text-text-dark/80 dark:text-text-light/80 mb-6 leading-relaxed">
                          We blend traditional techniques with innovative approaches to create ice creams that are both familiar and exciting. Each batch is carefully crafted to ensure the perfect balance of flavors and textures.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Why Choose Scoop Theory - Enhanced Section */}
                <section className="py-20 bg-gradient-to-br from-background-light to-secondary/20 dark:from-background-dark dark:to-background-dark">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-6 animate-fade-in">
                        Why Choose Scoop Theory?
                      </h2>
                      <p className="text-xl text-text-dark/80 dark:text-text-light/80 max-w-3xl mx-auto animate-fade-in">
                       We create rich, tasty ice cream with unique flavors in every scoop
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Premium Ingredients Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift transform hover:-translate-y-2 border border-secondary/20 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">Small-Batch Craftsmanship</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            Each flavor is handcrafted in limited batches for unmatched freshness and taste.
                          </p>
                          <div className="flex justify-center">
                            <span className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                              Learn more
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Impossible-to-Forget Flavors */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift transform hover:-translate-y-2 border border-secondary/20 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none">
                              {/* Top scoop - pink/coral */}
                              <circle cx="12" cy="5" r="3.5" fill="#FF8A95" stroke="#FF6B6B" strokeWidth="0.5"/>
                              {/* Middle scoop - lighter pink */}
                              <circle cx="12" cy="8.5" r="3" fill="#FFB3BA" stroke="#FF9AA2" strokeWidth="0.5"/>
                              {/* Waffle cone - tan/brown */}
                              <path d="M9 12 L12 21 L15 12 Z" fill="#D2B48C" stroke="#8B4513" strokeWidth="0.5"/>
                              {/* Cone waffle pattern - more visible */}
                              <path d="M9.5 13 L14.5 13 M10 15 L14 15 M10.5 17 L13.5 17 M11 19 L13 19" stroke="#8B4513" strokeWidth="0.6" opacity="0.8"/>
                              <path d="M10 12.5 L10 20.5 M11 12.5 L11 20.5 M12 12.5 L12 20.5 M13 12.5 L13 20.5 M14 12.5 L14 20.5" stroke="#8B4513" strokeWidth="0.6" opacity="0.8"/>
                              {/* Stronger highlights on scoops */}
                              <ellipse cx="10.5" cy="4.5" rx="1" ry="0.8" fill="#FFF" opacity="0.5"/>
                              <ellipse cx="10.5" cy="8" rx="0.8" ry="0.6" fill="#FFF" opacity="0.5"/>
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">Impossible-to-Forget Flavors</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            Unique flavor profiles you won’t find anywhere else—designed to surprise and delight. 
                          </p>
                          <div className="flex justify-center">
                            <span className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                              Learn more
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* A Flavor for Every Mood */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift transform hover:-translate-y-2 border border-secondary/20 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none">
                              {/* Large main star - center-right */}
                              <path d="M16 4 L17.5 9.5 L23 9.5 L18.5 13.5 L20 19 L16 16.5 L12 19 L13.5 13.5 L9 9.5 L14.5 9.5 Z" fill="#FFD700"/>
                              {/* Small star - top left */}
                              <path d="M5 4 L5.3 5.8 L7.1 5.8 L5.7 6.9 L6 8.7 L5 7.8 L4 8.7 L4.3 6.9 L2.9 5.8 L4.7 5.8 Z" fill="#FFD700"/>
                              {/* Medium star - bottom left (bigger than top left) */}
                              <path d="M6 15 L6.6 17.4 L9 17.4 L7.2 19 L7.8 21.4 L6 20.2 L4.2 21.4 L4.8 19 L3 17.4 L5.4 17.4 Z" fill="#FFD700"/>
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">A Flavor for Every Mood</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            Enjoy flavors that are both nostalgic and freshly imagined.
                          </p>
                          <div className="flex justify-center">
                            <span className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                              Learn more
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="mt-20 bg-primary/10 dark:bg-secondary/20 rounded-3xl p-8 md:p-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">30+</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Unique Flavors</div>
                        </div>
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">100%</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Natural Ingredients</div>
                        </div>
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">5K+</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Happy Customers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
        
        
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;