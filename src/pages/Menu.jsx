import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const Menu = () => {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback items if API is completely empty or errors out
  const fallbackFlavors = [
    { id: 1, name: 'Pistachio', description: 'Pistachios Chunk Infused Ice Cream', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 2, name: 'Butterscotch', description: 'Classic butterscotch ice cream with rich, caramelized flavor', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 3, name: 'Vanilla Bourbon', description: 'Infused with Pure Madagascar Bourbon vanilla', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 4, name: 'BlueBerry Crisp', description: 'Layered with Homemade Blueberry Jam and Graham Cracker Crisps', badge: '', category: 'Ice Cream', active: true },
    { id: 5, name: 'Tiramisu', description: 'Coco, Coffee and Cream Cheese Infused Ice Cream Layered With Lady Fingers And Fudge', badge: '', category: 'Ice Cream', active: true },
    { id: 6, name: 'Hazelnut Rocks', description: 'Hazelnut infused Ice Cream with Chocolate crisps and crushed Hazelnuts', badge: '', category: 'Ice Cream', active: true },
    { id: 7, name: 'Ube Brownie', description: 'Ube Infused Ice Cream Layered with Homemade Brownie Pieces', badge: '', category: 'Ice Cream', active: true },
    { id: 8, name: 'Salted Caramel & Cookies', description: 'Salt Infused Ice Cream Layered with Swirls of Caramel & Vanilla Cookies', badge: '', category: 'Ice Cream', active: true },
    { id: 9, name: 'Cookies & Cream', description: 'Oreo Infused Ice Cream With Chocolate Chip Cookies, Finished With Swirls Of Fudge', badge: '', category: 'Ice Cream', active: true },
    { id: 10, name: 'Kulfi', description: 'Saffron Infused Ice Cream With Almond, Pistachio & Cardamom Powder', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 11, name: 'Mango', description: 'Fresh Mango with Chunks', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 12, name: 'Mint Chocolate Chip', description: 'Mint Infused Ice Cream layered with Dark Chocolate Chips', badge: '', category: 'Ice Cream', active: true },
    { id: 13, name: 'FALOODA', description: 'Basil seeds, Vermicelli noodles Saffron and Rose Petals Infused Ice Cream', badge: '', category: 'Ice Cream', active: true },
    { id: 14, name: 'Masala Chai', description: 'Chai Tea Infused with Cinnamon, Black Pepper, Nutmeg, Fennel and Ginger', badge: '', category: 'Ice Cream', active: true },
    { id: 15, name: 'Strawberry Lychee', description: 'Lychee Strawberry Ice Cream Infused With Lychee Pieces', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 16, name: 'Strawberry ShortCake', description: 'Home made yellow Cake Layered with Strawberry Infused Ice Cream', badge: '', category: 'Ice Cream', active: true },
    { id: 17, name: 'Chocolate Triple', description: 'Chocolate Ice Cream layered with Fudge, Homemade Chocolate Cake, Chocolate Brownie and Chocolate Chips', badge: '', category: 'Ice Cream', active: true },
    { id: 18, name: 'Coffee Toffee', description: 'Lucky charm infused ice cream layered with lucky charm cereal and marshmallow', badge: '', category: 'Ice Cream', active: true },
    { id: 19, name: 'Black Sesame', description: 'Roasted Black Sesame Infused Ice Cream', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 20, name: 'Vegan Coconut Choco', description: 'Dairy-Free Ice Cream Made with Plant-Based Milk and Infused with real Cocoa And Coconut Flakes', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 21, name: 'Peanut Butter Cup', description: 'Peanut Infused Ice Cream Layered with Peanut Butter & Homemade Chocolate Shell', badge: '', category: 'Ice Cream', active: true },
    { id: 22, name: 'Rasberry Donut', description: 'Powered Raspberry Filled Donuts Layered into Powered Sugar Vanilla Ice Cream', badge: '', category: 'Ice Cream', active: true },
    { id: 23, name: 'Fruit Blossom', description: 'Traditional Hawaiian (Passion fruite, Orange Guava)', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
    { id: 24, name: 'Gooey Caramel Cake', description: 'Cream cheese Infused Ice Cream layered with Crumbles of Gooey Butter cake and swirls of caramel', badge: '', category: 'Ice Cream', active: true },
    { id: 25, name: 'Dubai Chocolate', description: 'Black Raspberry Chip- Raspberry infused ice cream layered with dark chocolate chips. Biscoff- Vanilla ice cream infused with Biscoff', badge: '', category: 'Ice Cream', active: true },
    { id: 26, name: 'Upside Down Pineapple', description: 'Pineapple Infused Ice Cream layered with Homemade Cake and topped with Cherrys', badge: '', category: 'Ice Cream', active: true },
    
    // Top category cards fallback
    { id: 101, name: 'Signature Milkshakes', description: 'Salted Caramel Pretzels, Dubai Chocolate, Chocolate Raspberry, Nutella, Midnight Cookies and Cream, Peanut Butter.', badge: '', category: 'Drinks', active: true },
    { id: 102, name: 'Matcha & Hot Drinks', description: 'Expresso Coffee, Hot Chocolate, Expresso Latte, Taro Latte, UBE Matcha, Mango Matcha, Strawberry Matcha Latte, Biscoff Matcha.', badge: '', category: 'Drinks', active: true },
    { id: 103, name: 'Theory Refreshers', description: 'Tropican Fizz, Indigo Fizz, Sunset Dragon, Guava Fizz, Rasberry Wave, Pink Lychee Fizz, Mango Wave, Citrus Tea, Ocean Bliss, Passion Raz.', badge: '', category: 'Drinks', active: true },
    { id: 104, name: 'Bubble waffle', description: 'Hong Kong style crispy bubble waffles served with ice cream scoops', badge: '', category: 'Specialty', active: true }
  ];

  useEffect(() => {
    let active = true;
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API_BASE}/menu.php?t=${Date.now()}`);
        if (active) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setFlavors(response.data);
          } else {
            setFlavors(fallbackFlavors);
          }
        }
      } catch (error) {
        console.error("Failed to load dynamic menu, using fallback:", error);
        if (active) {
          setFlavors(fallbackFlavors);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchMenu();
    return () => { active = false; };
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

  const currentFlavors = flavors.length > 0 ? flavors : fallbackFlavors;
  
  // Drinks & Specialty items
  const nonIceCreamItems = currentFlavors.filter(item => item.active && item.category !== 'Ice Cream');
  
  // Ice cream items
  const iceCreamItems = currentFlavors.filter(item => item.active && item.category === 'Ice Cream');

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-20 flex flex-col items-center justify-center">
        <SEOHead {...seoData.menu} />
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-text-primary dark:text-text-dark font-semibold">Loading Delicious Menu...</p>
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