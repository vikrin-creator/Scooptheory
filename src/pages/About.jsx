import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20">
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

      {/* Philosophy Section */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="w-full h-80 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="/images/ice_cream_cone.jpg" 
              alt="Ice cream cone"
              className="w-full h-full object-cover"
              fallbackText="Ice cream cone coming soon!"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-text-primary dark:text-text-dark text-3xl font-bold tracking-tight">Our Philosophy</h2>
            <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed">
              It all started with a simple idea: to create a space where joy is served by the spoonful. At Scoop Theory, we're obsessed with quality. We believe the best treats come from the best ingredients. That's why we partner with local dairy farms, source authentic matcha from Uji, and brew the most fragrant teas for our signature milkshakes and boba. Our creative process is fueled by a love for unique flavor combinations and a commitment to making every visit a memorable one.
            </p>
          </div>
        </div>
      </section>

      {/* Vibe Section */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex flex-col gap-4 md:order-2">
            <h2 className="text-text-primary dark:text-text-dark text-3xl font-bold tracking-tight">The Vibe</h2>
            <p className="text-text-primary/80 dark:text-text-dark/80 text-base leading-relaxed">
              Step into our world of pastel dreams and creamy delights. We designed Scoop Theory to be more than just an ice cream shop—it's a destination. A cozy, fun, and picture-perfect spot where friends gather, families make memories, and everyone feels welcome. With soft lighting, comfy seating, and just the right amount of whimsy, our cafe is your perfect escape for a sweet treat and a great time.
            </p>
          </div>
          <div className="w-full h-80 md:h-[500px] rounded-xl overflow-hidden shadow-lg md:order-1">
            <ImageWithFallback 
              src={`${window.location.origin}/images/cafe_interior.jpg`} 
              alt="Cafe interior"
              className="w-full h-full object-cover"
              fallbackText="Our cozy cafe interior"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
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
              src="/images/gallery_boba.jpg" 
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
