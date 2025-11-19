import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text-strong dark:text-text-dark">
            Find Us & Say Hello!
          </h1>
          <p className="text-lg mt-2 text-text-light/80 dark:text-text-dark/80">
            We're excited to see you! Find our location below or send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Map & Details */}
          <div className="flex flex-col gap-8">
            {/* Map */}
            <a 
              href="https://www.google.com/maps?q=Scoop+Theory,+129+S+Livingston+Ave,+Livingston,+NJ+07039,+United+States"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-96 bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-soft hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Open Google Maps for Scoop Theory: 129 S Livingston Ave, Livingston, NJ 07039, United States"
              style={{ backgroundImage: 'url(/images/map_placeholder.jpg)' }}
            />
            
            <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl shadow-soft">
              <h2 className="text-2xl font-bold tracking-tight text-text-strong dark:text-text-dark mb-4">
                Our Scoop Shop
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-t border-text-strong/10 dark:border-text-dark/10 pt-4">
                  <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                  <div>
                    <p className="font-bold text-sm text-text-strong/70 dark:text-text-dark/70">Address</p>
                    <p className="text-base font-medium">129 S Livingston Ave, Livingston NJ  - 07039</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-t border-text-strong/10 dark:border-text-dark/10 pt-4">
                  <span className="material-symbols-outlined text-secondary mt-1">call</span>
                  <div>
                    <p className="font-bold text-sm text-text-strong/70 dark:text-text-dark/70">Phone Number</p>
                    <p className="text-base font-medium">(201) 687-1228</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-t border-text-strong/10 dark:border-text-dark/10 pt-4">
                  <span className="material-symbols-outlined text-secondary mt-1">schedule</span>
                  <div>
                    <p className="font-bold text-sm text-text-strong/70 dark:text-text-dark/70">Opening Hours</p>
                    <p className="text-base font-medium">Mon - Sun : 2PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-t border-text-strong/10 dark:border-text-dark/10 pt-4">
                  <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                  <div>
                    <p className="font-bold text-sm text-text-strong/70 dark:text-text-dark/70">Email Address</p>
                    <p className="text-base font-medium">scooptheoryinfo@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Socials */}
          <div className="bg-white dark:bg-background-dark/50 p-6 md:p-8 rounded-xl shadow-soft">
            <h2 className="text-2xl font-bold tracking-tight text-text-strong dark:text-text-dark">
              Get In Touch
            </h2>
            <p className="text-base mt-1 mb-6 text-text-light/80 dark:text-text-dark/80">
              Have a question or a special request? Drop us a line!
            </p>
            
            {/* Contact Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-1" htmlFor="name">
                  Your Name
                </label>
                <input 
                  className="w-full rounded-lg border-text-strong/20 dark:border-text-dark/20 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary transition shadow-sm p-3" 
                  id="name" 
                  name="name" 
                  placeholder="e.g. Jane Doe" 
                  type="text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1" htmlFor="email">
                  Your Email
                </label>
                <input 
                  className="w-full rounded-lg border-text-strong/20 dark:border-text-dark/20 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary transition shadow-sm p-3" 
                  id="email" 
                  name="email" 
                  placeholder="e.g. jane.doe@example.com" 
                  type="email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1" htmlFor="message">
                  Message
                </label>
                <textarea 
                  className="w-full rounded-lg border-text-strong/20 dark:border-text-dark/20 bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary transition shadow-sm p-3" 
                  id="message" 
                  name="message" 
                  placeholder="Tell us what's on your mind..." 
                  rows="5"
                />
              </div>
              
              <button 
                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-text-strong text-base font-bold shadow-soft hover:opacity-90 transition-opacity" 
                type="submit"
              >
                Send Message
              </button>
            </form>
            
            {/* Social Media Links */}
            <div className="mt-8 pt-6 border-t border-text-strong/10 dark:border-text-dark/10">
              <h3 className="text-center font-bold text-text-strong dark:text-text-dark mb-4">
                Follow The Fun
              </h3>
              <div className="flex justify-center items-center gap-6">
                <a 
                  className="text-text-strong/80 dark:text-text-dark/80 hover:text-secondary dark:hover:text-secondary transition-colors" 
                  href="#" 
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
                  </svg>
                </a>
                
                <a 
                  className="text-text-strong/80 dark:text-text-dark/80 hover:text-secondary dark:hover:text-secondary transition-colors" 
                  href="#" 
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                
                <a 
                  className="text-text-strong/80 dark:text-text-dark/80 hover:text-secondary dark:hover:text-secondary transition-colors" 
                  href="#" 
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.7v1.71a6.33 6.33 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.34-6.33V10.18a4.83 4.83 0 0 1 1.92-3.49Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating CTA Button */}
      <a 
        href="#" 
        className="fixed bottom-6 right-6 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-14 px-6 bg-secondary text-text-strong text-base font-bold shadow-soft hover:scale-105 transition-transform"
      >
        <span className="material-symbols-outlined">storefront</span>
        <span className="truncate">Visit Us</span>
      </a>
    </div>
  );
};

export default Contact;
