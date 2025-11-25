import React, { useState, memo } from 'react';

const Reviews = () => {
  const [expandedReview, setExpandedReview] = useState(null);

  const reviews = [
    {
      name: "Indrayani T",
      subtitle: "Local Guide · 137 reviews · 876 photos",
      time: "4 months ago",
      rating: 5,
      text: "Thank you for bringing the ice cream in bubble waffle style to Livingston! I enjoyed my first visit and I'm hoping to bring in more fans to the store. The plethora of flavours, different cone styles, beautiful ambience, and super friendly staff : makes it a must try spot for all year around! I tried the Ube Cookie Dough in bubble waffle, and loved it!"
    },
    {
      name: "Find Relief Therapy - Amanda Fleissner, OTR",
      subtitle: "",
      time: "2 weeks ago",
      rating: 5,
      text: "We had an awesome experience at Scoop Theory on a chilly November night. Ice cream is not just for summer, and especially homemade ice cream with amazing flavors. There were so many unique flavors to try. The Coffee Toffee was the most intense coffee flavor I have ever had in an ice cream. The Masala Chai flavor was the stuff of dreams. We loved it and will definitely be back!"
    },
    {
      name: "Sarath Patibandla",
      subtitle: "",
      time: "4 months ago",
      rating: 5,
      text: "If you're a dessert lover, Urban Scoop is an absolute must-visit! I tried their signature Hong Kong-style bubble waffle loaded with three vibrant scoops of ice cream, and it was hands down one of the best desserts I've ever had. Each scoop had its own unique flavor, rich and creamy with just the right amount of sweetness. The bubble waffle was warm, crisp on the outside, and fluffy inside — the perfect contrast to the cold ice cream. And the drizzle of chocolate sauce on top? Pure magic. 😋"
    },
    {
      name: "D Pat",
      subtitle: "",
      time: "5 months ago",
      rating: 5,
      text: "A Scoop Above the Rest 🍨✨ If you're looking for ice cream that goes beyond the basic vanilla and chocolate, this is the place to visit. This ice cream shop is a hidden gem with a sleek, modern space and a menu full of handcrafted, small-batch flavors that are anything but ordinary. From lucky charms to masala chai, every scoop is bold, creative, and made with top-quality ingredients."
    },
    {
      name: "Jeffrey Nadeau",
      subtitle: "",
      time: "3 months ago",
      rating: 5,
      text: "Loved the shop and owner. Was so kind and nice. Explained to us how he made the ice cream and they were ALL delicious. Very distinct flavors! Got the Black Sesame and Strawberry with Lychee ice cream. Definitely come here for a treat!"
    },
    {
      name: "Sujay Viswanath",
      subtitle: "",
      time: "6 months ago",
      rating: 5,
      text: "Urban scoop catered ice cream for an Indian event in Livingston and their flavors were unique and tasted awesome. We ordered strawberry-lychee, pistachios and Vanilla and everyone loved it and came back for seconds!! Wishing all the best for their team in Livingston!"
    },
    {
      name: "Arati Kaza",
      subtitle: "",
      time: "New",
      rating: 5,
      text: "Great place, friendly customer service. I loved the ube flavored icecream. Their scoops are bigger than others and the add ons were a hit with the kids. Would definitely recommend"
    },
    {
      name: "Michael Scott",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Happened to find here by chance looking for ice cream with my family after an afternoon out in the area. Owner was super friendly when we arrived, offered samples of a bunch of flavors too! Very unique in house made flavors. Vegan and gluten free options too! Highly recommend coming in for a nice treat. We had a mango, a mint chip, a vanilla bourbon, and a chocolate forest. All were delicious! Next time going to definitely get a bubble waffle!"
    },
    {
      name: "Sing Sing",
      subtitle: "",
      time: "3 months ago",
      rating: 5,
      text: "Lots of exotic flavors. Vegan ice cream available. The bubble waffle cone has perfect texture."
    },
    {
      name: "Susan Larney",
      subtitle: "",
      time: "4 months ago",
      rating: 5,
      text: "Wide variety of unique flavors of ice cream. I couldn't decide between several flavors and was offered samples until I decided. I picked salted caramel which was rich, delicious and creamy. The gentleman behind the counter was very friendly and accommodating. He commented that 2-3 flavors are swapped out each month (but are also kept in the back freezer, so if it's your favorite flavor you can still get a cup/cone without having to wait until the next month). Great service and delicious ice cream!! Will definitely return!!"
    },
    {
      name: "Archana Gollamudi",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Guys - If you like ice cream, this is a place you muuust go to!! Loved the new innovative flavors and every ice-cream we tried was so creamy and delish! We ended up getting black-sesame (my son's new fav), strawberry-lychee, pistachio and a mix fruit flavor (i forget the name). Need to get back there to have some of the other flavors!"
    },
    {
      name: "Kim Kushel",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Urban Scoop has the most delicious and unique ice cream! We've been many times and it never disappoints!! The owners are incredibly kind (and patient) - this store is such a welcome addition to our community! We've tried the chocolate fudge cookie, passion fruit, ubae cookie dough, peanut butter and birthday cake special. All were so flavorful and delicious! We can't wait to go back!"
    },
    {
      name: "Marci Selsberg",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Yes, we're picky about ice cream. It's always too icy, not creamy enough. This ice cream is fantastic. It's homemade and tastes like it. The flavors are so interesting and there are plenty of gluten-free and egg-free options. The staff is so friendly. We will definitely be back. Try the Chocolate Forest Flavor!"
    },
    {
      name: "Krystle & Marcus Cohen Harvey",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "My wife and I went with our daughter. The owner was very friendly and great. He allowed our 3 year old to taste ice creams before she made a decision. She landed on chocolate. My wife and I got vanilla. The ice cream is amazing! Like the vanilla is not a basic vanilla, it has flavor. Stop by, sit down and have some ice cream or a a beverage. You won't regret it."
    },
    {
      name: "Noah Santos",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Just came to this place today & its a great experience! Relatively new place. Friendly staff and the ice cream selection is to die for - extremely delicious. Had a hard time deciding what to get! Please check them out!"
    },
    {
      name: "Laura Valdez",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Finally, an ice cream shop that dares to be different — and nails it! I tried the strawberry lychee & mango ice creams and was blown away. Every flavor is handcrafted and thoughtfully balanced. You can really taste the freshness. The staff was super friendly and genuinely passionate about the ice cream. This place is a must-visit for dessert lovers!"
    },
    {
      name: "Stephanie Mandy",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "First time here and I think we just found our new favorite ice cream spot! So many handcrafted unique flavors to choose from, it's so hard to decide! Very chill atmosphere and I loved not feeling rushed! 10/10"
    },
    {
      name: "I V",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Hidden gem. Very unique flavours. Clearly mentions EGG FREE options. Very kind and polite staff. Place is always clean. Definitely worth trying. Definitely coming back with friends and family."
    },
    {
      name: "Zona Batacchi",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Such unique and delicious flavors! Strawberry lychee, guava cheesecake and black sesame are some of my favorites! Highly recommended!"
    },
    {
      name: "Brian Whang",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Family went there 2x this past weekend, and simply love it. Had the black sesame, and just brought back memories of Korean black sesame porridge and mochi. Do It for Gram (Strawberry shortcake ice cream with bubble waffles was delicious. Love the alternative to the normal ice cream places."
    },
    {
      name: "Christine K",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "I came here with my family and the employees were very friendly and accommodated us a few minutes before they closed. They also let us try as many flavors as we wanted. Their menu is also very easy and clear to read and understand and the prices are very reasonable. Overall, the vibe, ice cream and staff were exceptional."
    },
    {
      name: "Rob Parker",
      subtitle: "",
      time: "Recently",
      rating: 5,
      text: "Owner and staff are very warm and accommodating when we can't decide. I personally love the chocolate forest. All (or almost all) the flavors have something mixed in if that's your thing. Also offer some different flavors like matcha and chai e.g. Overall, the ice cream is more creamy like Gelato. They are super nice to allow our kids to get two flavors even in the one scoop size. Thanks and look forward to more visits."
    }
    
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 fill-current text-yellow-400"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  const ReviewCard = memo(({ review, index }) => {
    const isExpanded = expandedReview === index;
    const shouldTruncate = review.text.length > 150;
    const displayText = isExpanded || !shouldTruncate 
      ? review.text 
      : `${review.text.slice(0, 150)}...`;

    return (
      <div className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-200">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 text-sm leading-tight">{review.name}</h3>
          {review.subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{review.subtitle}</p>
          )}
        </div>
        <StarRating rating={review.rating} />
        <p className="text-xs text-gray-500 mt-1.5 mb-2">{review.time}</p>
        <p className="text-gray-700 leading-snug text-sm">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setExpandedReview(isExpanded ? null : index)}
            className="text-pink-500 hover:text-pink-600 font-semibold text-sm mt-2 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    );
  });

  return (
    <section className="py-12 bg-[#F5EEDC] dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-text-dark dark:text-text-light">
          What Our Customers Say
        </h2>
      </div>

      {/* Animated flowing reviews - Full width */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-8 animate-scroll-left py-4" style={{ willChange: 'transform' }}>
          {reviews.concat(reviews).map((review, index) => (
            <ReviewCard key={`review-${index}`} review={review} index={index} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Call to action */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps?q=Scoop+Theory,+129+S+Livingston+Ave,+Livingston,+NJ+07039,+United+States"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E5A1A6] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d89097] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Leave Your Review on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
