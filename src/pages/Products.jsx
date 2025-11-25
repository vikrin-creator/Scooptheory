import React from 'react';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

const Products = () => {
  return (
    <div className="min-h-screen bg-[#F5EEDC] dark:bg-background-dark">
      <SEOHead {...seoData.products} />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-text-dark dark:text-text-light text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Party Rentals
            </h1>
            <p className="text-text-dark/80 dark:text-text-light/80 text-lg md:text-2xl font-normal max-w-3xl mx-auto leading-relaxed">
              What could be sweeter than celebrating a birthday at an ice cream parlor?
            </p>
          </div>

          {/* Main Content Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-background-dark/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Party Image */}
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img 
                  src="/images/party.png" 
                  alt="Birthday party celebration at Scoop Theory" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark dark:text-text-light mb-6">
                    Host Your Celebration With Us!
                  </h2>
                  <p className="text-lg md:text-xl text-text-dark/80 dark:text-text-light/80 leading-relaxed mb-6">
                    At Scoop Theory, we'd love to host your celebration! We can accommodate up to{' '}
                    <span className="font-bold text-[#E5A1A6]">70 guests</span> per party.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {/* Email Card */}
                  <a
                    href="mailto:info@scoop-theory.com"
                    className="bg-[#E5B8BC] dark:bg-primary/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="mb-4">
                      <span className="material-symbols-outlined text-5xl text-[#D89097] group-hover:scale-110 transition-transform">
                        mail
                      </span>
                    </div>
                    <h3 className="font-bold text-[#4A2E2C] dark:text-text-light text-lg mb-2">
                      Email Us
                    </h3>
                    <p className="text-[#4A2E2C]/80 dark:text-text-light/70 text-sm">
                      info@scoop-theory.com
                    </p>
                  </a>

                  {/* Phone Card */}
                  <a
                    href="tel:+12016871228"
                    className="bg-[#B4DBBB] dark:bg-secondary/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="mb-4">
                      <span className="material-symbols-outlined text-5xl text-[#4A2E2C] group-hover:scale-110 transition-transform">
                        call
                      </span>
                    </div>
                    <h3 className="font-bold text-[#4A2E2C] dark:text-text-light text-lg mb-2">
                      Call Us
                    </h3>
                    <p className="text-[#4A2E2C]/80 dark:text-text-light/70 text-sm">
                      (201) 687-1228
                    </p>
                  </a>
                </div>

                {/* Additional Info */}
                <div className="mt-10 text-center">
                  <p className="text-text-dark/70 dark:text-text-light/70 text-base">
                    To book your party, please reach out to us via email or phone. We'll work with you to create a sweet and memorable celebration!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-background-dark/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-4xl text-[#E5A1A6]">
                    groups
                  </span>
                </div>
                <h3 className="font-bold text-text-dark dark:text-text-light mb-2">
                  Up to 70 Guests
                </h3>
                <p className="text-text-dark/70 dark:text-text-light/70 text-sm">
                  Perfect space for birthdays and celebrations
                </p>
              </div>

              <div className="bg-white dark:bg-background-dark/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-4xl text-[#E5A1A6]">
                    cake
                  </span>
                </div>
                <h3 className="font-bold text-text-dark dark:text-text-light mb-2">
                  Sweet Treats
                </h3>
                <p className="text-text-dark/70 dark:text-text-light/70 text-sm">
                  Delicious handcrafted ice cream flavors
                </p>
              </div>

              <div className="bg-white dark:bg-background-dark/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="mb-4">
                  <span className="material-symbols-outlined text-4xl text-[#E5A1A6]">
                    celebration
                  </span>
                </div>
                <h3 className="font-bold text-text-dark dark:text-text-light mb-2">
                  Memorable Experience
                </h3>
                <p className="text-text-dark/70 dark:text-text-light/70 text-sm">
                  Create lasting memories with loved ones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
