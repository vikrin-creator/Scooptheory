import React from 'react';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Classic Vanilla Bean',
      image: '/images/vanilla_bean.jpg',
      alt: 'A scoop of creamy vanilla bean ice cream'
    },
    {
      id: 2,
      name: 'Uji Matcha Latte',
      image: '/images/uji_matcha.jpg',
      alt: 'A glass of iced Uji Matcha Latte with a straw'
    },
    {
      id: 3,
      name: 'Strawberry Bliss Shake',
      image: '/images/strawberry_shake.jpg',
      alt: 'A tall glass of strawberry milkshake with whipped cream'
    },
    {
      id: 4,
      name: 'Chocolate Fudge Brownie',
      image: '/images/chocolate_fudge.jpg',
      alt: 'A rich chocolate fudge brownie ice cream scoop'
    },
    {
      id: 5,
      name: 'Taro Milk Tea',
      image: '/images/taro_milk_tea.jpg',
      alt: 'A glass of iced taro milk tea with boba pearls'
    },
    {
      id: 6,
      name: 'Mint Chip Delight',
      image: '/images/mint_chip.jpg',
      alt: 'Mint chocolate chip ice cream in a cone'
    },
    {
      id: 7,
      name: 'Pistachio Dream',
      image: '/images/pistachio.jpg',
      alt: 'A colorful scoop of pistachio ice cream'
    },
    {
      id: 8,
      name: 'Classic Boba Milk Tea',
      image: '/images/boba_milk_tea.jpg',
      alt: 'Classic milk tea with tapioca pearls'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead {...seoData.products} />
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-text-primary dark:text-text-light text-4xl md:text-6xl font-black leading-tight tracking-tighter">
          Taste the Bliss
        </h1>
        <h2 className="mt-4 text-text-primary/80 dark:text-text-light/80 text-lg md:text-xl font-normal max-w-2xl mx-auto">
          Discover our delightful range of handcrafted ice creams, specialty matcha, milk teas, and signature milkshakes.
        </h2>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-10">
        <div className="my-8">
          <h2 className="text-text-primary dark:text-text-light text-2xl md:text-3xl font-bold tracking-tight text-center">
            Our Signature Creations
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-cover bg-center flex flex-col justify-end p-4 rounded-xl aspect-[3/4] shadow-soft hover:shadow-soft-lift transition-all duration-300 transform hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(74, 44, 42, 0.6) 0%, rgba(74, 44, 42, 0) 50%), url(${product.image})`
              }}
              aria-label={product.alt}
            >
              <p className="text-white text-base font-bold leading-tight">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
