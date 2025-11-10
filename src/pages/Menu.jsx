import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <img className="h-8 w-8" alt="Scoop Theory logo" src="/logo.png"/>
                <h1 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">Scoop Theory</h1>
              </Link>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <Link to="/" className="text-sm font-medium hover:text-primary dark:hover:text-primary">Home</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary dark:hover:text-primary">Our Story</Link>
              <Link to="/menu" className="text-sm font-medium text-primary dark:text-primary">Menu</Link>
              <Link to="/gallery" className="text-sm font-medium hover:text-primary dark:hover:text-primary">Products</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary dark:hover:text-primary">Contact</Link>
            </nav>
            <button className="hidden min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary text-text-light text-sm font-bold shadow-soft transition-transform duration-200 hover:scale-105 md:flex">
              <span>Order Now</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card-light dark:bg-card-dark md:hidden">
              <span className="material-symbols-outlined text-text-light dark:text-text-dark">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12 lg:py-20">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl">Explore Our Menu</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base font-normal leading-relaxed text-text-light/80 dark:text-text-dark/80">
              Discover your new favorite drink, from rich matcha lattes to creamy milkshakes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Matcha & Hot Drinks Card */}
            <div className="flex flex-col rounded-xl shadow-soft dark:shadow-soft-dark bg-card-light dark:bg-card-dark overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div 
                className="h-48 w-full bg-cover bg-center" 
                style={{ backgroundImage: 'url(/images/matcha_drinks.jpg)' }}
                alt="A vibrant green matcha latte in a ceramic cup, viewed from above."
              ></div>
              <div className="flex flex-grow flex-col items-stretch justify-start p-6">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">Matcha & Hot Drinks</h3>
                <p className="mt-3 text-sm font-normal text-text-light/80 dark:text-text-dark/80">
                  Expresso Coffee, Hot Chocolate, Expresso Latte, Taro Latte, UBE Matcha, Mango Matcha, Strawberry Matcha Latte, Biscoff Matcha.
                </p>
              </div>
            </div>

            {/* Signature Milkshakes Card */}
            <div className="flex flex-col rounded-xl shadow-soft dark:shadow-soft-dark bg-card-light dark:bg-card-dark overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div 
                className="h-48 w-full bg-cover bg-center" 
                style={{ backgroundImage: 'url(/images/milkshakes.jpg)' }}
                alt="Three colorful milkshakes with whipped cream and toppings lined up."
              ></div>
              <div className="flex flex-grow flex-col items-stretch justify-start p-6">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">Signature Milkshakes</h3>
                <p className="mt-3 text-sm font-normal text-text-light/80 dark:text-text-dark/80">
                  Salted Caramel Pretzel, Midnight Cookies & Cream, Peanut Butter Brownie, Tiramisu, Banana Cream Pie, Milk & Cookies, plus a 'Make Your Own' section.
                </p>
              </div>
            </div>

            {/* Classic Tea Card */}
            <div className="flex flex-col rounded-xl shadow-soft dark:shadow-soft-dark bg-card-light dark:bg-card-dark overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div 
                className="h-48 w-full bg-cover bg-center" 
                style={{ backgroundImage: 'url(/images/milk_tea.jpg)' }}
                alt="A glass of iced milk tea with boba pearls, condensation on the glass."
              ></div>
              <div className="flex flex-grow flex-col items-stretch justify-start p-6">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">Classic Tea</h3>
                <p className="mt-3 text-sm font-normal text-text-light/80 dark:text-text-dark/80">
                  Black Milk Tea, Jasmine Milk Green Tea, Taro Milk Tea, Coconut Milk Tea, Strawberries & Cream, Brown Sugar Milk Tea, Thai Milk Tea, Brown Sugar Latte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card-light dark:bg-card-dark mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <img className="h-8 w-8" alt="Scoop Theory logo" src="/logo.png"/>
                <h1 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">Scoop Theory</h1>
              </Link>
            </div>
            <div className="text-sm text-text-light/80 dark:text-text-dark/80">
              <p>Hours: 11am - 10pm Daily</p>
              <p>123 Sweet Street, Dessertville</p>
            </div>
            <div className="flex gap-4">
              <a className="text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                </svg>
              </a>
              <a className="text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.003 1.802c-2.393 0-2.695.01-3.64.055-1.007.045-1.52.2-1.897.358-.528.225-.88.52-1.218.858-.337.338-.633.69-.858 1.218-.158.377-.313.89-.358 1.897-.045.945-.055 1.247-.055 3.64s.01 2.695.055 3.64c.045 1.007.2 1.52.358 1.897.225.528.52.88.858 1.218.338.337.69.633 1.218.858.377.158.89.313 1.897.358.945.045 1.247.055 3.64.055s2.695-.01 3.64-.055c1.007-.045 1.52-.2 1.897-.358.528-.225.88-.52 1.218-.858.337-.338.633-.69.858-1.218.158-.377.313-.89.358-1.897.045-.945.055-1.247.055-3.64s-.01-2.695-.055-3.64c-.045-1.007-.2-1.52-.358-1.897-.225-.528-.52-.88-.858-1.218-.338-.337-.69-.633-1.218-.858-.377-.158-.89-.313-1.897-.358C14.01 3.812 13.71 3.802 11.312 3.802zM12 6.865A5.135 5.135 0 1012 17.135 5.135 5.135 0 0012 6.865zm0 8.468A3.333 3.333 0 1112 10.198a3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-text-light/10 dark:border-text-dark/10 pt-6 text-center text-xs text-text-light/60 dark:text-text-dark/60">
            <p>
              © 2025
              <Link to="/" className="font-bold hover:text-primary dark:hover:text-primary transition-colors"> Scoop Theory</Link>. All rights reserved. | Designed & Developed by
              <a href="http://vikrin.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary dark:hover:text-primary transition-colors"> Vikrin</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent-pink text-text-light shadow-soft transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark dark:shadow-soft-dark">
        <span className="material-symbols-outlined text-3xl">storefront</span>
      </button>
    </div>
  );
};

export default Menu;
