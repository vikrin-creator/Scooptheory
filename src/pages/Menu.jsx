import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

// In dev: Vite proxy forwards /api/* to Hostinger backend (bypasses CORS)
// In production: relative /api path works since both are on the same domain
const API_BASE = '/api';

const Menu = () => {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchMenu = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const url = `${API_BASE}/menu.php?t=${Date.now()}`;
      console.log('[Menu] Fetching from:', url);
      const response = await axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        timeout: 15000,
      });
      console.log('[Menu] API response received:', response.data?.length, 'items');
      console.log('MENU SOURCE', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log('[Menu] ✅ Using LIVE database data');
        setFlavors(response.data);
      } else {
        console.warn('[Menu] ⚠️ API returned empty array');
        setFlavors([]);
      }
    } catch (error) {
      console.error('[Menu] ❌ API fetch failed:', error.message);
      console.error('[Menu] Attempted URL:', `${API_BASE}/menu.php`);
      setFetchError(error.message);
      setFlavors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const getCategoryImage = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('milkshake')) {
      return '/images/milkshakes.jpg';
    } else if (lowerName.includes('matcha') || lowerName.includes('hot')) {
      return '/images/matcha_drinks.jpg';
    } else if (lowerName.includes('refresher') || lowerName.includes('tea') || lowerName.includes('fizz')) {
      return '/images/milk_tea.jpg';
    }
    return '/images/BubbleWaffle.png';
  };

  // Drinks & Specialty items (only active)
  const nonIceCreamItems = flavors.filter(item => item.active && item.category !== 'Ice Cream');
  
  // Ice cream items (only active)
  const iceCreamItems = flavors.filter(item => item.active && item.category === 'Ice Cream');

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-20 flex flex-col items-center justify-center">
        <SEOHead {...seoData.menu} />
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-text-primary dark:text-text-dark font-semibold">Loading Delicious Menu...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-20 flex flex-col items-center justify-center">
        <SEOHead {...seoData.menu} />
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark mb-2">Unable to Load Menu</h2>
        <p className="text-text-primary/60 dark:text-text-dark/60 mb-6 text-center max-w-md">
          Could not connect to the server. Please check your connection and try again.
        </p>
        <button
          onClick={fetchMenu}
          className="px-6 py-3 bg-primary text-text-dark font-bold rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...seoData.menu} />
      {/* Main Content */}
      <main className="flex-grow">
        {/* Dynamic Menu Categories (Drinks & Specialty) */}
        {nonIceCreamItems.length > 0 && (
          <div className="container mx-auto px-6 py-12 lg:py-20">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl">Explore Our Menu</h2>
              <p className="mt-4 max-w-2xl mx-auto text-base font-normal leading-relaxed text-text-light/80 dark:text-text-dark/80">
                Discover your new ice cream flavors, favorite drinks to creamy milkshakes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {nonIceCreamItems.map((item) => (
                <div key={item.id} className="flex flex-col rounded-xl shadow-soft dark:shadow-soft-dark bg-card-light dark:bg-card-dark overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <div 
                    className="h-48 w-full bg-cover bg-center" 
                    style={{ backgroundImage: `url(${getCategoryImage(item.name)})` }}
                    alt={item.name}
                  ></div>
                  <div className="flex flex-grow flex-col items-stretch justify-start p-6">
                    <a href="https://www.clover.com/online-ordering/scooptheory" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-dark">{item.name}</h3>
                    </a>
                    {item.description && (
                      <p className="mt-3 text-sm font-normal text-text-primary/80 dark:text-text-dark/80">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Ice Cream Menu */}
        <section className="py-20 bg-secondary/10 dark:bg-background-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-4">
                Our Ice Cream Flavors
              </h2>
              <p className="text-xl text-text-dark/80 dark:text-text-light/80 max-w-2xl mx-auto">
                Handcrafted premium ice cream, with bold, unforgettable flavors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {iceCreamItems.map((item) => (
                <div key={item.id} className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">{item.name}</h3>
                    {item.description && (
                      <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <div className="mt-2">
                      <span className="inline-block px-4 py-2 bg-primary text-text-dark font-semibold text-sm rounded-full shadow-md border-2 border-primary/50 hover:bg-primary/80 transition-colors">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                Ready to Indulge Your Taste Buds?
              </h2>
              <p className="text-xl text-text-dark/90 mb-10 max-w-2xl mx-auto">
                Visit our store today and enjoy our handcrafted ice cream, milk shakes and refreshing beverages, all made with passion 
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-text-dark text-primary font-bold rounded-full shadow-lg hover:bg-text-dark/90 transition-all duration-300 transform hover:scale-105"
                >
                  Find Our Locations
                </Link>
                <Link 
                  to="/gallery" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-text-dark/20 text-text-dark font-bold rounded-full shadow-lg hover:bg-text-dark/30 transition-all duration-300"
                >
                  View Full Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Menu;