import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Existing Menu Categories */}
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
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-dark">Matcha & Hot Drinks</h3>
                <p className="mt-3 text-sm font-normal text-text-primary/80 dark:text-text-dark/80">
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
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-dark">Signature Milkshakes</h3>
                <p className="mt-3 text-sm font-normal text-text-primary/80 dark:text-text-dark/80">
                  Salted Caramel Pretzels, Dubai Chocolate, Chocolate Raspberry, Nutella, Midnight Cookies and Cream, Peanut Butter.
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
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-dark">Classic Tea</h3>
                <p className="mt-3 text-sm font-normal text-text-primary/80 dark:text-text-dark/80">
                  Black Milk Tea, Jasmine Milk Green Tea, Taro Milk Tea, Coconut Milk Tea, Strawberries & Cream, Brown Sugar Milk Tea, Thai Milk Tea, Brown Sugar Latte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ice Cream Menu */}
        <section className="py-20 bg-secondary/10 dark:bg-background-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-4">
                Our Ice Cream Flavors
              </h2>
              <p className="text-xl text-text-dark/80 dark:text-text-light/80 max-w-2xl mx-auto">
                Handcrafted premium ice cream, made fresh daily with the finest ingredients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pistachio */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Pistachio</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Pistachios Chunk Infused Ice Cream
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg and Gluten Free
                </span>
              </div>

              {/* Butterscotch */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Butterscotch</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Classic butterscotch ice cream with rich, caramelized flavor
                </p>
              </div>

              {/* Vanilla Bourbon */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Vanilla Bourbon</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Infused with Pure Madagascar Bourbon vanilla
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg and Gluten Free
                </span>
              </div>
              {/*BlueBerry Crisp*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">BlueBerry Crisp</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Layered with Homemade Blueberry Jam and Graham Cracker Crips
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>


              {/* Tiramisu */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Tiramisu</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Coco, Coffee and Cream Cheese Infused Ice Cream Layered With Lady Fingers And Fudge
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>

              {/* Hazelnut Rocks */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Hazelnut Rocks</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Hazelnut infused Ice Cream with Chocolate crips and crushed Hazelnuts
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>

              {/* Ube Brownie */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Ube Brownie</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Ube Infused Ice Cream Layered with Homemade Brownie Pieces
                </p>
              </div>

              {/* Salted Caramel & Cookies */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Salted Caramel & Cookies</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Salt Infused Ice Cream Layered with Swirls of Caramel & Vanilla Cookies
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg and Gluten Free
                </span>
              </div>

              {/* Cookies & Cream */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Cookies & Cream</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Oreo Infused Ice Cream With Oreos And Chocolate Chip Cookies, Finished With Swirls Of Fudge
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>

              {/* Kulfi */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Kulfi</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Saffron Infused Ice Cream With Almond, Pistachio & Cardamom Powder
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>
              {/*Mango Mango */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Mango Mango</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Fresh Mango with Fresh Mango Chunks
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg & Gluten Free
                </span>
              </div>
              {/*BlueBerry Crisp*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">BlueBerry Crisp</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Layered with Homemade Blueberry Jam and Graham Cracker Crips
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>
               {/*Mint Chocolate Chip*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Mint Chocolate Chip</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Mint Infused Ice Cream layered with Dark Chocolate Chips
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>
              {/*Flaooda*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">FLOODA</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Basil seeds, Vermicelli noodles Saffron and Rose Petals Infused Ice Cream
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>

              {/*Masala chai*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Masala Chai</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Chai Tea Infused with Cinnamon, Black Pepper,Nutmeg,Fennel and Ginger
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>
              {/*Straberry lychee*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Straberry Lychee</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Lychee Strawberry Ice Cream Infused With Lychee Pieces
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg and Gluten Free
                </span>
              </div>

              {/*Straberry ShortCake*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Straberry ShortCake</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Home made yello Cake Layered with Straberry Infused Ice Cream
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                
                </span>
              </div>

              {/*Chocolate Triple*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Chocolate Triple</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Chocolate Ice Cream layered with Fudge, Homemade Chocolate Cake, Chocolate Brownie and Chocolate Chips 
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                 
                </span>
              </div>
              {/*Coffee Toffee*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Coffee Toffee</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Coffee Infused Ice Cream, sweetened With CondensedMilk and Layered With Biscoff Cookies 
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg Free
                </span>
              </div>

               {/*IT's Your Birthday*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Coffee Toffee</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Vanilla Cake Batter Mis Infused Ice cream with layers of Homemade Yellow Cake and Rainbow Sprinkles 
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  
                </span>
              </div>

               {/*Lucky Charm*/}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Coffee Toffee</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                 Lucky charm infused  ice cream layered with lucky charm cereal and marshmallow
                </p>
                <span className="inline-block px-3 py-1 bg-secondary/30 text-text-dark dark:text-text-light text-sm rounded-full">
                  Egg free
                </span>
              </div>


              {/* Upside Down Pineapple */}
              <div className="bg-background-light dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">Upside Down Pineapple</h3>
                <p className="text-text-dark/70 dark:text-text-light/70 mb-4 leading-relaxed">
                  Pineapple Infused Ice Cream layered with Homemade Cake and topped with Cherrys
                </p>
              </div>
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
                Visit our store today and experience our handcrafted beverages made with premium ingredients and passion.
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