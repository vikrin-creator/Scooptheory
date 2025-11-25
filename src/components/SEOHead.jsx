import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Scoop Theory - Premium Ice Cream & Desserts | Best Ice Cream Shop",
  description = "Discover Scoop Theory's handcrafted premium ice cream and desserts. Made with finest ingredients, our artisanal flavors offer the perfect treat for any occasion. Order online now!",
  keywords = "scoop theory, ice cream, premium ice cream, artisanal ice cream, handcrafted desserts, frozen treats, gelato, sorbet, ice cream shop, dessert store",
  ogImage = "https://scoop-theory.com/images/og-image.jpg",
  url = "https://scoop-theory.com",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Scoop Theory",
    "description": "Premium handcrafted ice cream and desserts made with finest ingredients",
    "url": "https://scoop-theory.com",
    "logo": "https://scoop-theory.com/logo.png",
    "image": "https://scoop-theory.com/images/hero_bg.png",
    "telephone": "+1-555-SCOOP-1",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Ice Cream Lane",
      "addressLocality": "Sweet City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "servesCuisine": "Desserts, Ice Cream",
    "priceRange": "$$",
    "openingHours": [
      "Mo-Su 10:00-22:00"
    ],
    "menu": "https://scoop-theory.com/menu",
    "sameAs": [
      "https://facebook.com/scooptheory",
      "https://instagram.com/scooptheory",
      "https://twitter.com/scooptheory"
    ]
  };

  return (
    <Helmet>
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo.png" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;