import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

// Utility function to check if image exists
const useImageExists = (url) => {
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setExists(true);
      setLoading(false);
    };
    img.onerror = () => {
      setExists(false);
      setLoading(false);
    };
    img.src = url;
  }, [url]);

  return { exists, loading };
};

// Image component with fallback
const ImageWithFallback = ({ src, alt, className, fallbackText }) => {
  const { exists, loading } = useImageExists(src);
  
  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className={`${className} bg-secondary/20 flex items-center justify-center text-center p-4`}>
        <span className="text-text-primary/60">{fallbackText || 'Image not found'}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

const About = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...seoData.about} />
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 px-8 sm:px-12 lg:px-16">
        <div className="relative flex min-h-[480px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center shadow-lg" 
             style={{
               backgroundImage: 'linear-gradient(rgba(74, 46, 42, 0.3) 0%, rgba(74, 46, 42, 0.5) 100%), url("/images/about_hero_bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
             }}>
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              The Story Behind Every Scoop
            </h1>
            <p className="text-white text-base font-normal leading-relaxed sm:text-lg">
              Discover the passion, creativity, and community that goes into every unique flavor we churn, every drink we pour, and every smile we share.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-12 md:py-20 px-8 sm:px-12 lg:px-16 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-text-primary dark:text-text-dark text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our Journey
            </h2>
            <p className="text-[#F7A4A4] text-lg font-semibold">
              From a simple question to a cherished family tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed">
                Our journey began in 2024 during a family drive when our son posed a simple yet profound question: <span className="font-semibold">"Can we open an ice cream place?"</span> That innocent inquiry sparked a dream that would soon blossom into a beloved family enterprise.
              </p>
              <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed">
                Today, Scoop Theory stands as a testament to family dedication, where each artisan scoop is crafted with meticulous care. We continuously push the boundaries of flavor innovation while cherishing the connections we forge with our valued guests.
              </p>
              <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed">
                Beyond being a business, Scoop Theory represents our family's heartfelt invitation to share joy. We are committed to sourcing premium ingredients, offering generous portions, and creating memorable flavors that evoke happiness and cherished memories with every delightful bite.

                <span className="font-bold"> I am very thankful to my friend Tim who helped me in this journey.</span>
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-[#F7A4A4] text-4xl md:text-5xl font-bold mb-2">2025</div>
                  <div className="text-text-primary/70 dark:text-text-dark/70 text-sm">Doors opened</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-[#F7A4A4] text-4xl md:text-5xl font-bold mb-2">10k+</div>
                  <div className="text-text-primary/70 dark:text-text-dark/70 text-sm">Families served</div>
                </div>
              </div>

              {/* Quote Box */}
              <div className="bg-secondary/10 dark:bg-gray-800/50 rounded-xl p-6 border-l-4 border-primary">
                <p className="text-text-primary/90 dark:text-text-dark/90 italic text-base mb-2">
                  "Can we open an ice cream place?"
                </p>
                <p className="text-text-primary/60 dark:text-text-dark/60 text-sm">
                  — The question that ignited our family's sweetest adventure.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="/images/OurJourney.jpg" 
                alt="Family enjoying ice cream together"
                className="w-full h-full object-cover"
                fallbackText="Our family story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 px-8 sm:px-12 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-text-primary dark:text-text-dark text-3xl font-bold tracking-tight">A Glimpse Into Our World</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="/images/gallery_matcha.jpg" 
              alt="Matcha drink"
              className="w-full h-full object-cover"
              fallbackText="Matcha special"
            />
          </div>
          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="/images/gallery_friends.jpg" 
              alt="Friends enjoying ice cream"
              className="w-full h-full object-cover"
              fallbackText="Friends & ice cream"
            />
          </div>
          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="/images/gallery_boba.png" 
              alt="Bubble tea"
              className="w-full h-full object-cover"
              fallbackText="Bubble tea special"
            />
          </div>
          <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="/images/gallery_neon_sign.jpg" 
              alt="Neon sign"
              className="w-full h-full object-cover"
              fallbackText="Our signature neon"
            />
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-12 md:py-20 px-4">
        <div className="bg-secondary/40 dark:bg-text-primary/10 rounded-xl p-8 md:p-12 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <h2 className="text-text-primary dark:text-text-dark text-3xl font-bold tracking-tight">A Note From Our Founder</h2>
          <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed max-w-3xl">
            "Scoop Theory is a dream come true. It's a blend of my love for travel, flavor, and creating happy moments. Thank you for being a part of our story. We can't wait to share a scoop (or two) with you!"
          </p>
          <Link to="/menu" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-text-primary text-base font-bold leading-normal tracking-wide shadow-sm hover:opacity-90 transition-opacity mt-4">
            <span className="truncate">Explore Our Menu</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
