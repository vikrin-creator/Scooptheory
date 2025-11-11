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
                <img src="/logo.png" alt="Scoop Theory" className="h-8 w-8 rounded-full object-cover" />
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
              <div className="w-full">
                {/* Hero Section */}
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
                    <h1 className="text-text-dark dark:text-text-light text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-md mb-4">
                      Scoop Theory
                    </h1>
                    <h2 className="text-text-dark dark:text-text-light text-lg md:text-xl font-normal leading-normal drop-shadow-sm">
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

                {/* New Section - Image Left, Content Right */}
                <section className="py-20 bg-background-light dark:bg-background-dark">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                      {/* Image on the Left */}
                      <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                          <img 
                            src="public/images/taro_milk_tea.jpg" 
                            alt="Crafting premium ice cream" 
                            className="w-full h-auto object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* Content on the Right */}
                      <div className="lg:w-1/2 lg:pl-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-6">
                          Our Craftsmanship
                        </h2>
                        <p className="text-lg text-text-dark/80 dark:text-text-light/80 mb-6 leading-relaxed">
                          We blend traditional techniques with innovative approaches to create ice creams that are both familiar and exciting. Each batch is carefully crafted to ensure the perfect balance of flavors and textures.
                        </p>
                        <p className="text-lg text-text-dark/80 dark:text-text-light/80 mb-6 leading-relaxed">
                          Our artisans source the finest ingredients from local farms and suppliers, ensuring that every scoop delivers an exceptional experience that celebrates the richness of natural flavors.
                        </p>
                        <div className="mt-8">
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">Handcrafted in small batches</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">Seasonal ingredients sourced locally</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">Over 50 unique flavors crafted annually</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-10">
                          <Link 
                            to="/about"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-text-dark bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                          >
                            Learn More About Our Process
                            <span className="ml-2 material-symbols-outlined">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Alternate Section - Image Right, Content Left */}
                <section className="py-20 bg-secondary/10 dark:bg-background-dark">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                      {/* Image on the Right */}
                      <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                          <img 
                            src="public/images/chocolate_fudge.jpg" 
                            alt="Sustainable ice cream production" 
                            className="w-full h-auto object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent"></div>
                        </div>
                      </div>
                      
                      {/* Content on the Left */}
                      <div className="lg:w-1/2 lg:pr-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-6">
                          Sustainable Practices
                        </h2>
                        <p className="text-lg text-text-dark/80 dark:text-text-light/80 mb-6 leading-relaxed">
                          We believe in responsible business practices that benefit both our customers and the environment. Our commitment to sustainability is reflected in every aspect of our operations.
                        </p>
                        <p className="text-lg text-text-dark/80 dark:text-text-light/80 mb-6 leading-relaxed">
                          From eco-friendly packaging to energy-efficient equipment, we continuously seek ways to minimize our environmental impact while maintaining the highest quality standards.
                        </p>
                        <div className="mt-8">
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">100% biodegradable packaging materials</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">Solar-powered production facility</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-text-dark/80 dark:text-text-light/80">Zero waste initiative in production</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-10">
                          <Link 
                            to="/about"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-text-dark bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                          >
                            Our Sustainability Commitment
                            <span className="ml-2 material-symbols-outlined">arrow_forward</span>
                          </Link>
                        </div>
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
                        We craft exceptional ice cream experiences with premium ingredients and innovative flavors that delight the senses
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
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">Premium Ingredients</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            We source only the finest ingredients to ensure every scoop delivers exceptional taste and quality.
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
                      
                      {/* Fresh Daily Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift transform hover:-translate-y-2 border border-secondary/20 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">Fresh Daily</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            Our ice creams are made fresh daily to ensure you get the best texture and flavor in every bite.
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
                      
                      {/* Creative Flavors Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift transform hover:-translate-y-2 border border-secondary/20 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4 text-center">Creative Flavors</h3>
                          <p className="text-text-dark/70 dark:text-text-light/70 text-center leading-relaxed mb-6">
                            From classic favorites to innovative creations, our menu offers something for every palate.
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
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">50+</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Unique Flavors</div>
                        </div>
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">100%</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Natural Ingredients</div>
                        </div>
                        <div className="group">
                          <div className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-2 group-hover:text-primary transition-colors">12</div>
                          <div className="text-text-dark/80 dark:text-text-light/80">Years Experience</div>
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
        
        {/* FAB (Floating Action Button) */}
        <button className="fixed bottom-6 right-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-text-primary shadow-lg transition-transform hover:scale-105">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </Router>
  );
}

export default App;