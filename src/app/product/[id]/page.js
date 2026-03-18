'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Flag, X, Calendar, Clock, MapPin, Navigation } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// SAME PRODUCT DATA AS BEFORE - keeping all 26 products
const allProducts = [
  // (Copy all your product data here - I'll include first few as example)
  { 
    id: 1, 
    name: "Chocolate Truffle Cake", 
    seller: "Sarah's Bakery", 
    price: 450, 
    rating: 4.8, 
    totalReviews: 24, 
    category: "products", 
    subcategory: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    shortDescription: "Rich chocolate cake with smooth truffle frosting",
    fullDescription: "Our signature Chocolate Truffle Cake is a chocolate lover's dream. Made with premium Belgian chocolate, combined with fresh cream and butter to create layers of moist chocolate sponge. The truffle frosting is made from scratch using a secret family recipe. Available in multiple sizes (500g, 1kg, 2kg). Can be customized with personalized messages. Order 24 hours in advance for best results.",
    specifications: [
      { label: "Weight", value: "1 kg" },
      { label: "Type", value: "Eggless/With Egg" },
      { label: "Serves", value: "8-10 people" },
      { label: "Shelf Life", value: "2 days refrigerated" }
    ],
    features: [
      "Freshly baked to order",
      "Premium Belgian chocolate",
      "Customizable message on cake",
      "Both egg and eggless options available",
      "Free delivery on campus"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Priya M.", 
        rating: 5, 
        date: "2024-03-10", 
        title: "Absolutely Delicious!",
        comment: "Ordered this for my birthday and everyone absolutely loved it! The cake was incredibly moist and the chocolate flavor was perfect - not too sweet, not too bitter. The presentation was beautiful too. Highly recommend Sarah's Bakery!",
        helpful: 12,
        verified: true
      },
      { 
        id: 2, 
        userName: "Rahul K.", 
        rating: 5, 
        date: "2024-03-05", 
        title: "Best cake ever!",
        comment: "Ordered for my sister's birthday. Everyone loved it! Great presentation and taste. The truffle frosting is to die for. Will definitely order again.",
        helpful: 8,
        verified: true
      },
      { 
        id: 3, 
        userName: "Ananya S.", 
        rating: 4, 
        date: "2024-02-28", 
        title: "Very good but delivery delayed",
        comment: "The cake itself was delicious and fresh. However, delivery was delayed by 30 minutes which was a bit stressful for the party. Otherwise, great quality!",
        helpful: 5,
        verified: true
      }
    ]
  },
  
  { 
    id: 2, 
    name: "Red Velvet Cupcakes", 
    seller: "Sarah's Bakery", 
    price: 250, 
    rating: 4.9, 
    totalReviews: 38, 
    category: "products", 
    subcategory: "cakes",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
    shortDescription: "Dozen fresh red velvet cupcakes with cream cheese frosting",
    fullDescription: "Our Red Velvet Cupcakes are the perfect blend of chocolatey goodness with a hint of vanilla. Each cupcake is topped with our signature cream cheese frosting and a decorative touch. Sold by the dozen (12 pieces). Perfect for parties, celebrations, or just treating yourself! Each cupcake is individually wrapped for freshness.",
    specifications: [
      { label: "Quantity", value: "12 pieces" },
      { label: "Type", value: "Eggless/With Egg" },
      { label: "Weight", value: "600g total" },
      { label: "Shelf Life", value: "3 days refrigerated" }
    ],
    features: [
      "Dozen cupcakes (12 pieces)",
      "Rich cream cheese frosting",
      "Fresh daily",
      "Beautiful presentation",
      "Individually wrapped"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Meera J.", 
        rating: 5, 
        date: "2024-03-12", 
        title: "Perfect for parties!",
        comment: "Ordered these for our office party and they were a huge hit! Everyone asked where I got them from. The cream cheese frosting is amazing - not too sweet, just perfect. Will order again!",
        helpful: 18,
        verified: true
      },
      { 
        id: 2, 
        userName: "Karan D.", 
        rating: 5, 
        date: "2024-03-08", 
        title: "The frosting is to die for!",
        comment: "These cupcakes are absolutely delicious. The red velvet is moist and fluffy, and the cream cheese frosting is heavenly. Bought for my girlfriend's birthday and she loved them!",
        helpful: 10,
        verified: true
      }
    ]
  },

  { 
    id: 3, 
    name: "Handmade Scrunchies Set", 
    seller: "Craft Corner", 
    price: 150, 
    rating: 4.9, 
    totalReviews: 45, 
    category: "products", 
    subcategory: "handmade",
    image: "https://images.unsplash.com/photo-1630081757603-a46d414be089?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NydW5jaGllc3xlbnwwfHwwfHx8MA%3D%3D",
    shortDescription: "Set of 5 colorful handmade scrunchies made from premium fabric",
    fullDescription: "Add a pop of color to your hair with our handmade scrunchie set! Each set includes 5 unique designs made from soft, premium fabric that's gentle on your hair and prevents breakage. Perfect for all hair types and occasions - from casual college days to formal events. These scrunchies are carefully handcrafted with attention to detail and quality. Available in multiple color combinations.",
    specifications: [
      { label: "Quantity", value: "5 pieces" },
      { label: "Material", value: "Premium soft fabric" },
      { label: "Size", value: "Standard (fits all)" },
      { label: "Care", value: "Hand wash recommended" }
    ],
    features: [
      "Set of 5 unique designs",
      "Premium soft fabric - gentle on hair",
      "Prevents hair breakage",
      "Suitable for all hair types",
      "Multiple color options available",
      "Handmade with care"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Divya L.", 
        rating: 5, 
        date: "2024-03-14", 
        title: "Love the colors!",
        comment: "These scrunchies are beautiful and very well made. The fabric is soft and doesn't pull my hair at all. I have thick curly hair and these hold up perfectly. Love all the color options!",
        helpful: 22,
        verified: true
      },
      { 
        id: 2, 
        userName: "Pooja M.", 
        rating: 5, 
        date: "2024-03-09", 
        title: "Bought 3 sets already!",
        comment: "I'm obsessed with these scrunchies! The quality is amazing and they last forever. I've already bought 3 sets and gifted some to friends. Great value for money!",
        helpful: 16,
        verified: true
      }
    ]
  },

  { 
    id: 4, 
    name: "Handwoven Tote Bag", 
    seller: "Craft Corner", 
    price: 400, 
    rating: 4.8, 
    totalReviews: 22, 
    category: "products", 
    subcategory: "handmade",
    image: "https://northhouse.org/images/cache/assets/uploads/course_images/hand-woven-wool-tote-bag_erin-endsley_4_800px_sq-700x700.jpg",
    shortDescription: "Eco-friendly handwoven cotton tote bag",
    fullDescription: "Carry your essentials in style with our handwoven tote bag! Made from 100% natural cotton, this eco-friendly bag is perfect for shopping, college, or beach trips. Features sturdy handles and a spacious interior that can hold books, laptop, groceries, and more. Each bag is handwoven by skilled artisans, making every piece unique. Durable, washable, and sustainable!",
    specifications: [
      { label: "Material", value: "100% Cotton" },
      { label: "Dimensions", value: "16\" x 14\" x 4\"" },
      { label: "Handle Drop", value: "10 inches" },
      { label: "Weight Capacity", value: "Up to 10 kg" }
    ],
    features: [
      "100% natural cotton - eco-friendly",
      "Handwoven by skilled artisans",
      "Sturdy reinforced handles",
      "Spacious interior - fits laptop",
      "Machine washable",
      "Each piece is unique"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Aisha K.", 
        rating: 5, 
        date: "2024-03-11", 
        title: "Beautiful and sturdy!",
        comment: "This bag is gorgeous and very well made. I use it daily for college and it holds all my books and laptop easily. The handles are comfortable and it's held up great after a month of daily use.",
        helpful: 14,
        verified: true
      }
    ]
  },

  { 
    id: 5, 
    name: "Scented Soy Candles Set", 
    seller: "Aroma Crafts", 
    price: 350, 
    rating: 4.7, 
    totalReviews: 31, 
    category: "products", 
    subcategory: "candles",
    image: "https://pacificnorthwicks.com/cdn/shop/files/Floral_Collection_by_Window.png?v=1728746685&width=1946",
    shortDescription: "Set of 3 handmade soy candles - Lavender, Vanilla, Rose",
    fullDescription: "Transform your space with our premium handmade soy candles. Each set includes three beautifully crafted candles in calming scents: Lavender for relaxation, Vanilla for warmth, and Rose for romance. Made from 100% natural soy wax with cotton wicks for a clean, long-lasting burn of 25+ hours per candle. No harmful chemicals, no black smoke. Comes in elegant glass jars that can be reused. Perfect for creating a cozy ambiance or as a thoughtful gift.",
    specifications: [
      { label: "Quantity", value: "3 candles" },
      { label: "Burn Time", value: "25+ hours each" },
      { label: "Wax Type", value: "100% Soy Wax" },
      { label: "Wick", value: "Cotton" },
      { label: "Scents", value: "Lavender, Vanilla, Rose" }
    ],
    features: [
      "100% natural soy wax - eco-friendly",
      "Cotton wicks for clean burning",
      "Burns for 25+ hours per candle",
      "No harmful chemicals or toxins",
      "Reusable glass jars",
      "Beautiful packaging - gift-ready"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Neha K.", 
        rating: 5, 
        date: "2024-03-13", 
        title: "Amazing scents!",
        comment: "The lavender scent is absolutely amazing and very relaxing. Burns evenly and lasts long. The jars are beautiful too. I use these every evening while studying. Highly recommend!",
        helpful: 19,
        verified: true
      }
    ]
  },

  { 
    id: 6, 
    name: "Decorative Pillar Candles", 
    seller: "Aroma Crafts", 
    price: 280, 
    rating: 4.6, 
    totalReviews: 19, 
    category: "products", 
    subcategory: "candles",
    image: "https://media.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000013911988-1000013911987_02-2100.jpg",
    shortDescription: "Beautifully crafted pillar candles for decoration",
    fullDescription: "Add elegance to your space with our decorative pillar candles. Perfect for dinner tables, festivals, or home decor. These pillar candles are handcrafted with premium wax and come in beautiful colors. Smokeless and long-burning. Ideal for Diwali, Christmas, weddings, or any special occasion. Set includes 3 pillar candles of varying heights for a stunning display.",
    specifications: [
      { label: "Quantity", value: "3 pillars" },
      { label: "Heights", value: "4\", 6\", 8\"" },
      { label: "Diameter", value: "2 inches" },
      { label: "Material", value: "Premium Wax" },
      { label: "Burn Time", value: "15-20 hours each" }
    ],
    features: [
      "Set of 3 different heights",
      "Beautiful colors available",
      "Smokeless burning",
      "Premium quality wax",
      "Perfect for festivals & events"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Deepa M.", 
        rating: 5, 
        date: "2024-03-07", 
        title: "Beautiful decoration!",
        comment: "Used these for Diwali decorations and they looked stunning! Burns evenly and no smoke. Very happy with the quality.",
        helpful: 11,
        verified: true
      }
    ]
  },

  { 
    id: 7, 
    name: "Organic Handmade Soaps", 
    seller: "Natural Essence", 
    price: 200, 
    rating: 4.8, 
    totalReviews: 42, 
    category: "products", 
    subcategory: "soaps",
    image: "https://plus.unsplash.com/premium_photo-1684471006753-9936b2bc7cdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgwfHxPcmdhbmljJTIwSGFuZG1hZGUlMjBTb2Fwc3xlbnwwfHwwfHx8MA%3D%3D",
    shortDescription: "Set of 4 organic handmade soaps with natural ingredients",
    fullDescription: "Treat your skin with our organic handmade soaps! Each set includes 4 different variants: Lavender (calming), Neem (antibacterial), Turmeric (brightening), and Coconut (moisturizing). Made with 100% natural ingredients, essential oils, and zero chemicals. Cold-processed to retain all the natural benefits. Suitable for all skin types, including sensitive skin. Each soap weighs 100g and lasts 3-4 weeks with daily use.",
    specifications: [
      { label: "Quantity", value: "4 soaps (100g each)" },
      { label: "Variants", value: "Lavender, Neem, Turmeric, Coconut" },
      { label: "Ingredients", value: "100% Natural" },
      { label: "Process", value: "Cold-pressed" },
      { label: "Skin Type", value: "All skin types" }
    ],
    features: [
      "100% natural & organic ingredients",
      "No chemicals, parabens, or sulfates",
      "Cold-processed method",
      "Essential oils for aromatherapy",
      "Suitable for sensitive skin",
      "Eco-friendly packaging"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Sakshi L.", 
        rating: 5, 
        date: "2024-03-15", 
        title: "Best soaps ever!",
        comment: "My skin has never felt better! The neem soap cleared my acne and the turmeric one brightened my complexion. Love that they're all natural. Will repurchase for sure!",
        helpful: 28,
        verified: true
      }
    ]
  },

  { 
    id: 8, 
    name: "Herbal Bath Soap Collection", 
    seller: "Natural Essence", 
    price: 180, 
    rating: 4.7, 
    totalReviews: 28, 
    category: "products", 
    subcategory: "soaps",
    image: "https://images.unsplash.com/photo-1652607779025-55e89f9fcfe0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njc0fHxIZXJiYWwlMjBCYXRoJTIwU29hcHxlbnwwfHwwfHx8MA%3D%3D",
    shortDescription: "Luxurious herbal soaps for gentle cleansing",
    fullDescription: "Experience the luxury of herbal bathing with our special collection of artisanal soaps. This set features Rose (anti-aging), Sandalwood (glowing skin), Aloe Vera (healing), and Mint (refreshing). Each soap is enriched with herbal extracts and essential oils. Free from harmful chemicals. Gentle on skin, tough on dirt. Perfect for daily use or as a premium gift set.",
    specifications: [
      { label: "Quantity", value: "4 soaps (90g each)" },
      { label: "Variants", value: "Rose, Sandalwood, Aloe, Mint" },
      { label: "Type", value: "Herbal & Natural" },
      { label: "pH Level", value: "Balanced (5.5)" }
    ],
    features: [
      "Herbal extracts & essential oils",
      "Chemical-free formula",
      "Gentle daily cleansing",
      "Anti-aging properties",
      "Beautiful natural colors"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Nisha M.", 
        rating: 5, 
        date: "2024-03-08", 
        title: "Love the rose soap!",
        comment: "The rose soap is my favorite - smells divine and makes my skin glow. All variants are great quality. Packaging is beautiful too!",
        helpful: 15,
        verified: true
      }
    ]
  },

  { 
    id: 9, 
    name: "Custom Wedding Invitations", 
    seller: "Card Creations", 
    price: 500, 
    rating: 4.9, 
    totalReviews: 36, 
    category: "products", 
    subcategory: "invitation-cards",
    image: "https://media.craftyartapp.com/uploadedFiles/thumb_file/e66916ceaed0ca0149bbd603e40845937376c9c91749900611.jpg",
    shortDescription: "Elegant handcrafted wedding invitation cards (pack of 50)",
    fullDescription: "Make your wedding memorable with our elegant custom invitation cards. Each card is handcrafted with premium quality paper, beautiful embellishments, and intricate designs. Pack includes 50 cards with matching envelopes. Fully customizable - add your names, wedding date, venue details, and personal message. Multiple design themes available: Traditional, Modern, Royal, Floral. Printing included. Order 2 weeks in advance for customization.",
    specifications: [
      { label: "Quantity", value: "50 cards + envelopes" },
      { label: "Size", value: "6\" x 8\"" },
      { label: "Paper", value: "Premium cardstock 300gsm" },
      { label: "Customization", value: "Fully customizable" },
      { label: "Delivery", value: "2 weeks" }
    ],
    features: [
      "Handcrafted with premium materials",
      "Fully customizable text & design",
      "Multiple theme options",
      "Includes matching envelopes",
      "Professional printing quality",
      "Beautiful embellishments"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Anjali W.", 
        rating: 5, 
        date: "2024-02-20", 
        title: "Absolutely stunning!",
        comment: "The invitations turned out even more beautiful than expected! The quality is excellent and everyone complimented how elegant they looked. The customization was perfect. Highly recommend for weddings!",
        helpful: 25,
        verified: true
      }
    ]
  },

  { 
    id: 10, 
    name: "Birthday Party Invites", 
    seller: "Card Creations", 
    price: 250, 
    rating: 4.7, 
    totalReviews: 21, 
    category: "products", 
    subcategory: "invitation-cards",
    image: "https://img.freepik.com/free-vector/hand-painted-watercolor-butterfly-birthday-invitation-template_23-2148998798.jpg",
    shortDescription: "Colorful custom birthday invitations (pack of 30)",
    fullDescription: "Celebrate birthdays in style with our vibrant invitation cards! Perfect for kids' parties, milestone birthdays, or surprise celebrations. Pack of 30 cards with envelopes. Available in multiple fun themes: Superhero, Princess, Unicorn, Space, Jungle, and more. Fully customizable with name, age, date, time, venue. High-quality cardstock with glossy finish. Ready in 1 week.",
    specifications: [
      { label: "Quantity", value: "30 cards + envelopes" },
      { label: "Size", value: "5\" x 7\"" },
      { label: "Themes", value: "10+ options" },
      { label: "Customization", value: "Name, age, details" },
      { label: "Delivery", value: "7 days" }
    ],
    features: [
      "Vibrant colorful designs",
      "Multiple fun themes",
      "Customizable details",
      "High-quality glossy finish",
      "Includes envelopes",
      "Quick 1-week delivery"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Simran P.", 
        rating: 5, 
        date: "2024-03-05", 
        title: "Kids loved them!",
        comment: "Ordered unicorn theme for my daughter's 5th birthday and the kids were so excited to receive these colorful invites! Great quality and beautiful designs!",
        helpful: 12,
        verified: true
      }
    ]
  },

  { 
    id: 11, 
    name: "Fabric Pencil Pouch", 
    seller: "Stitch & Style", 
    price: 120, 
    rating: 4.6, 
    totalReviews: 18, 
    category: "products", 
    subcategory: "pencil-pouches",
    image: "https://cdn01.pinkoi.com/product/fjk2rKtH/0/1/640x530.jpg",
    shortDescription: "Handmade fabric pencil pouch with multiple compartments",
    fullDescription: "Organize your stationery with our stylish fabric pencil pouch! Handmade from durable cotton fabric with a sturdy zipper. Features multiple compartments to keep pens, pencils, erasers, and small items organized. Perfect for students, artists, and professionals. Available in various colorful patterns. Compact size fits easily in any bag. Machine washable for easy maintenance.",
    specifications: [
      { label: "Material", value: "Cotton fabric" },
      { label: "Size", value: "8\" x 3\" x 2\"" },
      { label: "Compartments", value: "3 sections" },
      { label: "Closure", value: "Quality zipper" },
      { label: "Care", value: "Machine washable" }
    ],
    features: [
      "Handmade from durable fabric",
      "Multiple compartments for organization",
      "Sturdy quality zipper",
      "Compact & portable",
      "Colorful patterns available",
      "Easy to clean"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Ishita S.", 
        rating: 5, 
        date: "2024-03-09", 
        title: "Perfect size!",
        comment: "This pouch is exactly what I needed! Fits all my pens and the compartments keep everything organized. Love the floral pattern!",
        helpful: 10,
        verified: true
      }
    ]
  },

  { 
    id: 12, 
    name: "Designer Pencil Case", 
    seller: "Stitch & Style", 
    price: 150, 
    rating: 4.8, 
    totalReviews: 25, 
    category: "products", 
    subcategory: "pencil-pouches",
    image: "https://notiq.com/cdn/shop/collections/4f1940e55aea3b7412f35f5e15c0bb84.jpg?v=1659289306&width=2048",
    shortDescription: "Premium quality designer pencil case",
    fullDescription: "Elevate your stationery game with our premium designer pencil case! Features a unique artistic design printed on high-quality canvas material. Spacious interior holds 20+ pens, pencils, markers, and other accessories. Double zipper for easy access. Reinforced corners for durability. Perfect for students, artists, and office use. Makes a great gift too!",
    specifications: [
      { label: "Material", value: "Canvas (premium)" },
      { label: "Capacity", value: "20+ items" },
      { label: "Closure", value: "Double zipper" },
      { label: "Size", value: "9\" x 4\" x 2.5\"" },
      { label: "Design", value: "Artistic print" }
    ],
    features: [
      "Premium canvas material",
      "Unique designer prints",
      "Large capacity (20+ items)",
      "Double zipper design",
      "Reinforced durable corners",
      "Gift-worthy packaging"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Anushka M.", 
        rating: 5, 
        date: "2024-03-11", 
        title: "Absolutely love it!",
        comment: "This is the best pencil case I've ever owned! The design is beautiful and it's so spacious. Fits all my markers and pens. Totally worth it!",
        helpful: 16,
        verified: true
      }
    ]
  },

  { 
    id: 13, 
    name: "Fresh Rose Bouquet", 
    seller: "Petal Paradise", 
    price: 450, 
    rating: 4.9, 
    totalReviews: 52, 
    category: "products", 
    subcategory: "bouquets",
    image: "https://flowersugar.com/cdn/shop/files/Little_angel_group_1_table_400x.jpg?v=1712205357",
    shortDescription: "Beautiful fresh rose bouquet (12 roses)",
    fullDescription: "Express your love with our stunning fresh rose bouquet! Carefully arranged with 12 premium long-stem roses, wrapped in beautiful paper with satin ribbon. Roses are handpicked for freshness and quality. Available in Red (love), Pink (admiration), Yellow (friendship), White (purity), and Mixed colors. Includes complimentary message card. Perfect for birthdays, anniversaries, apologies, or just because! Same-day delivery available on campus. Lasts 5-7 days with proper care.",
    specifications: [
      { label: "Roses", value: "12 long-stem premium roses" },
      { label: "Colors", value: "Red, Pink, Yellow, White, Mixed" },
      { label: "Arrangement", value: "Professional wrapping" },
      { label: "Extras", value: "Message card included" },
      { label: "Freshness", value: "Lasts 5-7 days" }
    ],
    features: [
      "12 premium fresh roses",
      "Beautiful professional wrapping",
      "Multiple color options",
      "Free message card",
      "Same-day delivery available",
      "Handpicked for quality"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Aryan S.", 
        rating: 5, 
        date: "2024-03-14", 
        title: "Perfect gift!",
        comment: "Ordered red roses for my girlfriend's birthday and she was over the moon! The roses were fresh, beautifully arranged, and lasted over a week. Delivery was right on time. Highly recommend!",
        helpful: 32,
        verified: true
      }
    ]
  },

  { 
    id: 14, 
    name: "Mixed Flower Arrangement", 
    seller: "Petal Paradise", 
    price: 350, 
    rating: 4.7, 
    totalReviews: 34, 
    category: "products", 
    subcategory: "bouquets",
    image: "https://www.dpsainiflorist.com/wp-content/uploads/2023/06/dp7077.jpg",
    shortDescription: "Vibrant mixed flower bouquet arrangement",
    fullDescription: "Brighten someone's day with our cheerful mixed flower bouquet! A vibrant combination of roses, lilies, carnations, and seasonal blooms in a rainbow of colors. Each bouquet is uniquely arranged by our expert florists. Perfect for congratulations, get well soon, celebrations, or to simply make someone smile! Wrapped beautifully with decorative paper and ribbons. Message card included. Fresh flowers guaranteed!",
    specifications: [
      { label: "Flowers", value: "Roses, Lilies, Carnations, Seasonal" },
      { label: "Arrangement", value: "Hand-arranged by florist" },
      { label: "Size", value: "Medium (10-12 stems)" },
      { label: "Occasions", value: "All celebrations" },
      { label: "Freshness", value: "4-6 days" }
    ],
    features: [
      "Variety of colorful blooms",
      "Hand-arranged by florist",
      "Perfect for any occasion",
      "Beautiful decorative wrapping",
      "Free message card",
      "Fresh & vibrant"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Pooja L.", 
        rating: 5, 
        date: "2024-03-12", 
        title: "Absolutely beautiful!",
        comment: "The colors were stunning! Every flower was fresh and the arrangement looked professionally done. My mom loved it! Great value for money.",
        helpful: 21,
        verified: true
      }
    ]
  },

  { 
    id: 15, 
    name: "Crochet Handbag", 
    seller: "Yarn & Hook", 
    price: 380, 
    rating: 4.8, 
    totalReviews: 27, 
    category: "products", 
    subcategory: "crochet",
    image: "https://i.etsystatic.com/49279796/r/il/eecc91/6161756099/il_1080xN.6161756099_q6yt.jpg",
    shortDescription: "Handmade crochet handbag with cotton yarn",
    fullDescription: "Carry your essentials in this charming handmade crochet handbag! Each bag is meticulously crocheted by hand using premium cotton yarn. Features a secure magnetic button closure, comfortable handles, and a spacious interior with one zippered pocket. Perfect for casual outings, shopping, or beach trips. Available in multiple colors. Lightweight yet sturdy. Each piece is unique and takes 2 days to create!",
    specifications: [
      { label: "Material", value: "100% Cotton yarn" },
      { label: "Size", value: "12\" x 10\" x 3\"" },
      { label: "Closure", value: "Magnetic button" },
      { label: "Pockets", value: "1 zippered inside" },
      { label: "Handle Drop", value: "8 inches" }
    ],
    features: [
      "100% handmade crochet",
      "Premium cotton yarn",
      "Magnetic button closure",
      "Interior zippered pocket",
      "Multiple color options",
      "Unique piece - no two identical"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Tanvi P.", 
        rating: 5, 
        date: "2024-03-08", 
        title: "Gorgeous bag!",
        comment: "I'm in love with this crochet bag! It's beautifully made and very sturdy. Gets so many compliments when I carry it. The craftsmanship is excellent!",
        helpful: 17,
        verified: true
      }
    ]
  },

  { 
    id: 16, 
    name: "Crochet Baby Blanket", 
    seller: "Yarn & Hook", 
    price: 550, 
    rating: 4.9, 
    totalReviews: 41, 
    category: "products", 
    subcategory: "crochet",
    image: "https://i.ebayimg.com/images/g/lhkAAOSwYApe54dc/s-l1200.jpg",
    shortDescription: "Soft and cozy crochet baby blanket",
    fullDescription: "Wrap your little one in warmth and love with our handmade crochet baby blanket! Each blanket is carefully crocheted with ultra-soft baby-friendly yarn that's gentle on delicate skin. Features a beautiful granny square pattern in pastel colors. Perfect size for strollers, cribs, or snuggling. Machine washable for easy care. Makes a thoughtful and heartfelt gift for baby showers, newborns, or christenings. Takes 5 days to handcraft!",
    specifications: [
      { label: "Size", value: "30\" x 30\"" },
      { label: "Material", value: "Baby-soft acrylic yarn" },
      { label: "Pattern", value: "Granny square" },
      { label: "Colors", value: "Pastel pink, blue, yellow" },
      { label: "Care", value: "Machine washable" }
    ],
    features: [
      "100% handmade with love",
      "Ultra-soft baby-friendly yarn",
      "Gentle on delicate skin",
      "Beautiful granny square pattern",
      "Machine washable - easy care",
      "Perfect gift for newborns"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Sneha M.", 
        rating: 5, 
        date: "2024-03-06", 
        title: "Perfect baby shower gift!",
        comment: "Gifted this to my friend for her baby shower and she absolutely loved it! The blanket is incredibly soft and the colors are beautiful. The crochet work is flawless. Highly recommend!",
        helpful: 26,
        verified: true
      }
    ]
  },

  { 
    id: 17, 
    name: "Handmade Beaded Necklace", 
    seller: "Gem & Bead", 
    price: 320, 
    rating: 4.7, 
    totalReviews: 33, 
    category: "products", 
    subcategory: "jewellery",
    image: "https://i.etsystatic.com/34927393/r/il/8a6ca9/7216894485/il_fullxfull.7216894485_ljrt.jpg",
    shortDescription: "Elegant handmade beaded necklace",
    fullDescription: "Make a statement with this stunning handmade beaded necklace! Each bead is carefully selected and strung to create a beautiful, unique piece. Features high-quality glass beads in vibrant colors arranged in an eye-catching pattern. Adjustable length (16-18 inches) with a secure lobster clasp. Perfect for parties, festivals, college events, or adding a pop of color to your everyday outfits. Each necklace is one-of-a-kind! Comes in a beautiful gift box.",
    specifications: [
      { label: "Length", value: "16-18\" adjustable" },
      { label: "Material", value: "Glass beads, metal findings" },
      { label: "Clasp", value: "Lobster clasp" },
      { label: "Colors", value: "Multiple vibrant options" },
      { label: "Care", value: "Wipe clean, avoid water" }
    ],
    features: [
      "Handcrafted unique design",
      "High-quality glass beads",
      "Adjustable length",
      "Secure lobster clasp",
      "Vibrant color combinations",
      "Gift box packaging included"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Kavya M.", 
        rating: 5, 
        date: "2024-03-11", 
        title: "Gorgeous necklace!",
        comment: "This necklace is absolutely beautiful! The beadwork is intricate and the colors are vibrant. I get compliments every time I wear it. Love supporting handmade jewelry!",
        helpful: 19,
        verified: true
      }
    ]
  },

  { 
    id: 18, 
    name: "Silver Earrings Set", 
    seller: "Gem & Bead", 
    price: 280, 
    rating: 4.8, 
    totalReviews: 29, 
    category: "products", 
    subcategory: "jewellery",
    image: "https://5.imimg.com/data5/ECOM/Default/2024/10/455862610/NG/NC/RH/107380810/vqiml-512-500x500.jpg",
    shortDescription: "Beautiful silver earrings with stone work",
    fullDescription: "Elevate your style with these elegant silver earrings! Handcrafted with sterling silver-plated metal and adorned with colorful semi-precious stones. Features intricate detailing and a beautiful jhumka (bell) design. Lightweight and comfortable for all-day wear. Hypoallergenic and suitable for sensitive ears. Perfect for traditional wear, festivals, weddings, or special occasions. Comes in a beautiful velvet pouch.",
    specifications: [
      { label: "Material", value: "Silver-plated metal" },
      { label: "Stones", value: "Semi-precious" },
      { label: "Style", value: "Jhumka design" },
      { label: "Weight", value: "Lightweight (8g per earring)" },
      { label: "Care", value: "Store in pouch, avoid moisture" }
    ],
    features: [
      "Sterling silver-plated",
      "Colorful stone embellishments",
      "Lightweight & comfortable",
      "Hypoallergenic for sensitive ears",
      "Traditional jhumka design",
      "Velvet pouch included"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Diya P.", 
        rating: 5, 
        date: "2024-03-13", 
        title: "Stunning earrings!",
        comment: "These earrings are absolutely stunning! The stonework is beautiful and they're surprisingly lightweight. Wore them to a wedding and got so many compliments. Love them!",
        helpful: 22,
        verified: true
      }
    ]
  },

  { 
    id: 19, 
    name: "Math Tutoring", 
    seller: "Priya Tutors", 
    price: 300, 
    rating: 5.0, 
    totalReviews: 32, 
    category: "services", 
    subcategory: "tutoring",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h4UXx4VLjXlkNGzfqnf-fInVKBHY2luvXA&s",
    shortDescription: "Expert calculus and algebra tutoring - one-on-one session",
    fullDescription: "Struggling with math? Get personalized one-on-one tutoring from an experienced tutor with 5 years of teaching experience. Specializing in Calculus, Algebra, Trigonometry, Statistics, and exam preparation for JEE, NEET, Board Exams. Each session is tailored to your learning style and pace. Includes practice problems, doubt clearing, and study materials. Flexible scheduling - weekdays and weekends available. Sessions available both online (Zoom/Google Meet) and in-person on campus. Book a free 15-minute trial session!",
    specifications: [
      { label: "Duration", value: "1 hour per session" },
      { label: "Subjects", value: "Calculus, Algebra, Trigonometry, Stats" },
      { label: "Mode", value: "Online or In-person" },
      { label: "Level", value: "High School to College" },
      { label: "Materials", value: "Practice sheets included" }
    ],
    features: [
      "One-on-one personalized attention",
      "Flexible scheduling (weekdays & weekends)",
      "Practice materials and worksheets included",
      "Exam preparation (JEE/NEET/Boards)",
      "Online or in-person options",
      "Free 15-min trial session"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Rohan V.", 
        rating: 5, 
        date: "2024-03-14", 
        title: "Best tutor ever!",
        comment: "Priya explains concepts so clearly! My grades improved from C to A in just 2 months. She's patient, knowledgeable, and makes math actually interesting. Highly recommend!",
        helpful: 28,
        verified: true
      },
      { 
        id: 2, 
        userName: "Aarav M.", 
        rating: 5, 
        date: "2024-03-10", 
        title: "Excellent teaching!",
        comment: "Very patient and explains everything step by step. My calculus scores went up significantly. Worth every rupee! Book her sessions early, she gets booked fast.",
        helpful: 24,
        verified: true
      }
    ]
  },

  { 
    id: 20, 
    name: "Physics Lab Help", 
    seller: "Priya Tutors", 
    price: 400, 
    rating: 4.9, 
    totalReviews: 28, 
    category: "services", 
    subcategory: "tutoring",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop",
    shortDescription: "Lab report help and concept clearing",
    fullDescription: "Get expert help with your physics lab reports and experimental concepts! Assistance with lab experiments, data analysis, report writing, error calculations, and graph plotting. Covers all topics: Mechanics, Electricity & Magnetism, Optics, Modern Physics. Perfect for students struggling with practical exams or lab reports. One-on-one sessions to understand experimental procedures and theory. Includes review of your lab reports with suggestions. Available online or in-person. Book 1 day in advance.",
    specifications: [
      { label: "Duration", value: "1 hour per session" },
      { label: "Topics", value: "All physics lab experiments" },
      { label: "Help With", value: "Reports, Data Analysis, Concepts" },
      { label: "Mode", value: "Online or In-person" },
      { label: "Advance Booking", value: "1 day" }
    ],
    features: [
      "Lab report writing assistance",
      "Data analysis and error calculation",
      "Graph plotting guidance",
      "Concept clearing for experiments",
      "Report review with feedback",
      "Practical exam preparation"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Karthik S.", 
        rating: 5, 
        date: "2024-03-08", 
        title: "Saved my lab grade!",
        comment: "My lab reports were a mess until I found Priya. She helped me understand how to properly analyze data and write reports. Got full marks in my practical exam!",
        helpful: 21,
        verified: true
      }
    ]
  },

  { 
    id: 21, 
    name: "Bridal Mehendi Design", 
    seller: "Mehendi Magic", 
    price: 800, 
    rating: 4.9, 
    totalReviews: 47, 
    category: "services", 
    subcategory: "mehendi",
    image: "https://i.pinimg.com/736x/72/2c/b1/722cb155f3a04585c746edc82e1c4ddf.jpg",
    shortDescription: "Intricate bridal mehendi designs for special occasions",
    fullDescription: "Make your wedding day extra special with our intricate bridal mehendi designs! Professional artist with 8 years of experience specializing in traditional and contemporary patterns that cover full hands and feet. Using 100% natural, chemical-free henna that gives rich, dark color lasting up to 2 weeks. Designs include personalized elements like bride & groom names, wedding dates, and meaningful symbols. Service includes mehendi application for hands and feet (both sides). Takes 3-4 hours. Book at least 1 week in advance for weddings. Trial design session available at extra cost.",
    specifications: [
      { label: "Coverage", value: "Full hands & feet (both sides)" },
      { label: "Duration", value: "3-4 hours" },
      { label: "Henna", value: "100% Natural, chemical-free" },
      { label: "Color Duration", value: "Up to 2 weeks" },
      { label: "Booking", value: "1 week advance for bridal" }
    ],
    features: [
      "Professional artist - 8 years experience",
      "100% natural chemical-free henna",
      "Dark, long-lasting color (2 weeks)",
      "Personalized design elements",
      "Traditional & contemporary patterns",
      "Trial session available"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Anjali W.", 
        rating: 5, 
        date: "2024-02-28", 
        title: "Absolutely stunning!",
        comment: "The mehendi for my wedding was GORGEOUS! The design was intricate, the color was so dark it lasted 2 weeks, and everyone at my wedding was amazed. Worth every penny! Highly recommend for brides!",
        helpful: 35,
        verified: true
      },
      { 
        id: 2, 
        userName: "Priyanka R.", 
        rating: 5, 
        date: "2024-02-15", 
        title: "Beautiful intricate work!",
        comment: "The artist is so talented! She incorporated our names and wedding date beautifully into the design. The henna color was perfect - dark brown. Everyone complimented my mehendi!",
        helpful: 29,
        verified: true
      }
    ]
  },

  { 
    id: 22, 
    name: "Simple Mehendi Design", 
    seller: "Mehendi Magic", 
    price: 300, 
    rating: 4.8, 
    totalReviews: 38, 
    category: "services", 
    subcategory: "mehendi",
    image: "https://i.pinimg.com/736x/5a/d0/a3/5ad0a3c87357acd809d560cf7c60ca6f.jpg",
    shortDescription: "Beautiful simple mehendi for casual events",
    fullDescription: "Get beautiful, elegant mehendi designs for casual occasions, festivals, parties, or college events! Our simple designs are perfect for those who want pretty mehendi without full bridal coverage. Covers palms and backs of hands (or feet if preferred). Using natural henna for dark color. Designs include floral patterns, mandalas, Arabic style, or contemporary minimalist patterns. Takes 1-1.5 hours. Same-day booking available. Perfect for Diwali, Eid, Karwa Chauth, birthdays, or just for fun!",
    specifications: [
      { label: "Coverage", value: "Palms & backs of hands" },
      { label: "Duration", value: "1-1.5 hours" },
      { label: "Henna", value: "Natural henna" },
      { label: "Styles", value: "Floral, Arabic, Contemporary" },
      { label: "Booking", value: "Same-day available" }
    ],
    features: [
      "Beautiful simple designs",
      "Perfect for casual occasions",
      "Natural henna for dark color",
      "Multiple design styles available",
      "Quick service (1-1.5 hours)",
      "Same-day booking available"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Riya M.", 
        rating: 5, 
        date: "2024-03-12", 
        title: "Perfect for Diwali!",
        comment: "Got simple mehendi done for Diwali and it turned out beautiful! The floral design was elegant and the color was nice and dark. Great for festive occasions!",
        helpful: 23,
        verified: true
      }
    ]
  },

  { 
    id: 23, 
    name: "Saree Draping", 
    seller: "Drape & Style", 
    price: 250, 
    rating: 4.8, 
    totalReviews: 35, 
    category: "services", 
    subcategory: "saree-draping",
    image: "https://images.indianweddingsaree.com/product-image/1961377/1.jpg",
    shortDescription: "Professional traditional saree draping service",
    fullDescription: "Look stunning in your saree with our professional draping service! Expert in various traditional draping styles including Nivi, Bengali, Gujarati, Maharashtrian, and South Indian styles. Our stylist will come to your location (hostel/home on campus) and help you achieve the perfect drape that stays in place all day. Service includes proper pleating, pinning, and styling tips. Perfect for weddings, festivals, college functions, or any special occasion. Takes 20-30 minutes. Advance booking recommended, especially for events. Same-day booking available subject to availability.",
    specifications: [
      { label: "Service", value: "At your location (on campus)" },
      { label: "Duration", value: "20-30 minutes" },
      { label: "Styles", value: "Nivi, Bengali, Gujarati, Maharashtrian, South Indian" },
      { label: "Includes", value: "Pleating, pinning, styling tips" },
      { label: "Booking", value: "Advance recommended" }
    ],
    features: [
      "Multiple traditional draping styles",
      "Service at your location",
      "Perfect pleating and pinning",
      "Stays in place all day",
      "Styling tips included",
      "Quick service (20-30 mins)"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Lakshmi N.", 
        rating: 5, 
        date: "2024-03-13", 
        title: "Perfect draping!",
        comment: "She draped my saree perfectly for my friend's wedding! The Nivi style stayed in place the whole day without any issues. Very professional and quick. Highly recommend!",
        helpful: 26,
        verified: true
      },
      { 
        id: 2, 
        userName: "Radha M.", 
        rating: 5, 
        date: "2024-03-06", 
        title: "Expert stylist!",
        comment: "Knows so many different draping styles! She taught me the Bengali style and it looked amazing. Very patient and professional. Will book again for sure!",
        helpful: 21,
        verified: true
      }
    ]
  },

  { 
    id: 25, 
    name: "Custom Portrait Art", 
    seller: "ArtByRaj", 
    price: 800, 
    rating: 4.7, 
    totalReviews: 18, 
    category: "services", 
    subcategory: "art-design",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    shortDescription: "Hand-drawn digital portraits",
    fullDescription: "Get a beautiful custom portrait created just for you! Professional digital artist with experience in realistic portraits, cartoon style, anime style, and watercolor effects. Perfect for gifts, social media display pictures, or wall art. Process: Send your photo → Choose style (realistic/cartoon/anime/watercolor) → Receive 2-3 concept sketches → Final high-resolution digital artwork. Delivered as high-quality digital file (suitable for printing up to A3 size). Includes 2 rounds of revisions. Delivery in 5-7 days. Perfect for birthdays, anniversaries, or just because!",
    specifications: [
      { label: "Styles", value: "Realistic, Cartoon, Anime, Watercolor" },
      { label: "Delivery", value: "5-7 days" },
      { label: "Format", value: "High-res digital file" },
      { label: "Print Size", value: "Up to A3" },
      { label: "Revisions", value: "2 rounds included" }
    ],
    features: [
      "Professional digital artist",
      "Multiple art styles available",
      "High-resolution digital file",
      "Suitable for printing",
      "2 revision rounds included",
      "Perfect gift option"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Siddharth M.", 
        rating: 5, 
        date: "2024-03-04", 
        title: "Amazing gift!",
        comment: "Got a cartoon-style portrait made for my girlfriend's birthday and she absolutely loved it! The artist captured her likeness perfectly and added cute details. Highly recommend!",
        helpful: 16,
        verified: true
      }
    ]
  },

  { 
    id: 26, 
    name: "Laptop Repair Service", 
    seller: "TechFix Campus", 
    price: 500, 
    rating: 4.6, 
    totalReviews: 56, 
    category: "services", 
    subcategory: "tech",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    shortDescription: "Professional laptop diagnostics and repair",
    fullDescription: "Expert laptop repair and maintenance service right on campus! We fix all brands: HP, Dell, Lenovo, Asus, Acer, Apple MacBook. Services include: Hardware diagnostics, software troubleshooting, virus removal, OS installation, screen replacement, keyboard replacement, RAM/SSD upgrades, battery replacement, and general maintenance. Free diagnosis - pay only if you proceed with repair. Most repairs completed same-day or within 24 hours. Pick-up and drop service available on campus. All repairs come with 1-month warranty. Student-friendly pricing!",
    specifications: [
      { label: "Brands", value: "All brands (HP, Dell, Lenovo, Asus, Apple, etc.)" },
      { label: "Services", value: "Hardware & Software repairs" },
      { label: "Diagnosis", value: "Free" },
      { label: "Turnaround", value: "Same-day to 24 hours" },
      { label: "Warranty", value: "1 month on repairs" }
    ],
    features: [
      "All laptop brands serviced",
      "Free diagnosis",
      "Same-day repairs (most cases)",
      "Pick-up & drop on campus",
      "Student-friendly pricing",
      "1-month warranty on repairs"
    ],
    reviews: [
      { 
        id: 1, 
        userName: "Aditya K.", 
        rating: 5, 
        date: "2024-03-14", 
        title: "Quick and affordable!",
        comment: "My laptop screen was broken and they fixed it the same day! Very affordable compared to service centers. Laptop works perfectly now. Highly recommend!",
        helpful: 32,
        verified: true
      },
      { 
        id: 2, 
        userName: "Nidhi S.", 
        rating: 5, 
        date: "2024-03-08", 
        title: "Saved my laptop!",
        comment: "My laptop had a virus and was super slow. They cleaned it up, installed fresh Windows, and it runs like new! Great service and very knowledgeable.",
        helpful: 27,
        verified: true
      }
    ]
  }
];

// Report Reasons
const REPORT_REASONS = [
  { id: "counterfeit", label: "Counterfeit or Fake Product", description: "This product is not authentic" },
  { id: "misleading", label: "Misleading Information", description: "Product description or images are misleading" },
  { id: "illegal", label: "Illegal or Regulated Goods", description: "Sale of prohibited items" },
  { id: "scam", label: "Scam or Fraud", description: "Suspicious seller or pricing" },
  { id: "inappropriate", label: "Inappropriate Content", description: "Contains offensive material" },
  { id: "copyright", label: "Copyright Infringement", description: "Unauthorized use of copyrighted material" },
  { id: "safety", label: "Health & Safety Concerns", description: "Product may be unsafe" },
  { id: "other", label: "Other", description: "Something else" }
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);
  
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  
  // Booking state for services
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [locationType, setLocationType] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [otherLocationName, setOtherLocationName] = useState("");
  const [otherLocationCoords, setOtherLocationCoords] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Authentication state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('buyer');

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);

    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    }
  }, [productId]);

  const toggleWishlist = () => {
    if (!product) return;
    
    const newWishlist = wishlist.includes(product.id) 
      ? wishlist.filter(id => id !== product.id)
      : [...wishlist, product.id];
    
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Authentication functions
  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') !== null;
    }
    return false;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login Logic
      if (email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const displayName = email.split('@')[0];
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userName', displayName);
        localStorage.setItem('userType', 'buyer');
        
        setShowAuthModal(false);
        
        // Reset form
        setEmail('');
        setPassword('');
      } else {
        alert('Please enter email and password');
      }
    } else {
      // Signup Logic
      if (name && email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userName', name);
        localStorage.setItem('userType', userType);
        
        setShowAuthModal(false);
        
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setUserType('buyer');
      } else {
        alert('Please fill all fields');
      }
    }
  };

  const addToCart = () => {
    if (!product) return;
    
    // Check authentication
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        alert(`${product.name} quantity increased to ${cart[existingItemIndex].quantity}!`);
      } else {
        cart.push({ ...product, quantity: 1 });
        alert(`${product.name} added to cart!`);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Check if service requires booking (in-person services)
  const requiresBooking = (product) => {
    if (!product || product.category !== 'services') return false;
    
    const bookingServices = ['mehendi', 'saree draping', 'laptop repair'];
    return bookingServices.some(service => 
      product.subcategory?.toLowerCase().includes(service) || 
      product.name?.toLowerCase().includes(service)
    );
  };

  const handleBookingSubmit = () => {
    // Check authentication first
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }

    if (!bookingDate || !bookingTime || !locationType) {
      alert("Please fill in all required booking details");
      return;
    }

    if (locationType === 'house' && !houseAddress) {
      alert("Please provide your house address");
      return;
    }

    if (locationType === 'other' && (!otherLocationName || !otherLocationCoords)) {
      alert("Please provide location name and coordinates");
      return;
    }

    // In a real app, this would send booking to backend
    const bookingData = {
      productId: product.id,
      productName: product.name,
      seller: product.seller,
      date: bookingDate,
      time: bookingTime,
      locationType,
      ...(locationType === 'house' && { address: houseAddress }),
      ...(locationType === 'other' && { 
        locationName: otherLocationName, 
        coordinates: otherLocationCoords 
      }),
      price: product.price,
      timestamp: new Date().toISOString()
    };

    console.log("Booking submitted:", bookingData);
    alert(`Booking confirmed for ${product.name} on ${bookingDate} at ${bookingTime}!`);
    
    // Reset form
    setBookingDate("");
    setBookingTime("");
    setLocationType("");
    setHouseAddress("");
    setOtherLocationName("");
    setOtherLocationCoords("");
    setShowBookingForm(false);
  };

  const handleReportSubmit = () => {
    // Check authentication first
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedReason) {
      alert("Please select a reason for reporting");
      return;
    }

    // In a real app, this would send the report to your backend
    const reportData = {
      productId: product.id,
      productName: product.name,
      seller: product.seller,
      reason: selectedReason,
      details: additionalDetails,
      timestamp: new Date().toISOString(),
      reportedBy: "user" // In real app, would be actual user ID
    };

    // Save to localStorage (in real app, send to backend)
    const existingReports = JSON.parse(localStorage.getItem('productReports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('productReports', JSON.stringify(existingReports));

    setReportSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
      setSelectedReason("");
      setAdditionalDetails("");
    }, 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <button onClick={() => router.push('/shop')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h3>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="buyer"
                          checked={userType === 'buyer'}
                          onChange={(e) => setUserType(e.target.value)}
                          className="mr-2"
                        />
                        Buy products
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="seller"
                          checked={userType === 'seller'}
                          onChange={(e) => setUserType(e.target.value)}
                          className="mr-2"
                        />
                        Sell products
                      </label>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button & Report Button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>

          {/* Report Button */}
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
          >
            <Flag className="w-4 h-4" />
            <span className="text-sm font-medium">Report Product</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left - Image */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            
            {/* Category Badge */}
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              product.category === 'services' 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {product.category === 'services' ? '💼 Service' : '🛍️ Product'}
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Seller Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="font-semibold text-gray-900">{product.seller}</p>
                <p className="text-sm text-gray-600">Verified Seller</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.totalReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">₹{product.price}</div>
              <p className="text-gray-600">{product.category === 'services' ? 'Per session' : 'Inclusive of all taxes'}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            {requiresBooking(product) ? (
              <div className="mb-8">
                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    Book a Slot
                  </button>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Your Service</h3>
                    
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date *
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Time *
                      </label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      >
                        <option value="">Choose a time slot</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                      </select>
                    </div>

                    {/* Location Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Location *
                      </label>
                      <select
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      >
                        <option value="">Select location type</option>
                        <option value="campus">Campus</option>
                        <option value="hostel">Hostel</option>
                        <option value="house">House (provide address)</option>
                        <option value="other">Other (provide name & location)</option>
                      </select>
                    </div>

                    {/* House Address */}
                    {locationType === 'house' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          House Address *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={houseAddress}
                            onChange={(e) => setHouseAddress(e.target.value)}
                            placeholder="Enter your complete address"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-indigo-600 hover:text-indigo-700"
                            title="Get current location"
                          >
                            <Navigation className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Include building, street, area, city, and pincode
                        </p>
                      </div>
                    )}

                    {/* Other Location */}
                    {locationType === 'other' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location Name *
                          </label>
                          <input
                            type="text"
                            value={otherLocationName}
                            onChange={(e) => setOtherLocationName(e.target.value)}
                            placeholder="e.g., Mall, Park, Restaurant"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Live Location Coordinates *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={otherLocationCoords}
                              onChange={(e) => setOtherLocationCoords(e.target.value)}
                              placeholder="e.g., 28.6139,77.2090"
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3 text-indigo-600 hover:text-indigo-700"
                              title="Get current location"
                            >
                              <Navigation className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Format: latitude,longitude (e.g., 28.6139,77.2090)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Booking Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleBookingSubmit}
                        className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4 mb-8">
                <button
                  onClick={addToCart}
                  className="flex-1 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-4 rounded-lg border-2 transition-all ${
                    wishlist.includes(product.id)
                      ? 'border-pink-500 bg-pink-50 text-pink-500'
                      : 'border-gray-300 hover:border-pink-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {requiresBooking(product) ? (
                <>
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Home Service</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Verified Professional</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Flexible Timing</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Campus Delivery</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Easy Returns</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          
          {/* Rating Summary */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-2">{product.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-6 h-6 ${star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {product.totalReviews} reviews</p>
              </div>
              
              <div className="space-y-2">
                {[5,4,3,2,1].map(rating => {
                  const percentage = rating === 5 ? 75 : rating === 4 ? 20 : 5;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{rating} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {product.reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center font-semibold text-indigo-600">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(star => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <button className="hover:text-gray-700">👍 Helpful ({review.helpful})</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!reportSubmitted ? (
              <>
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flag className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">Report Product</h3>
                  </div>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Help us understand what's wrong with <span className="font-semibold">{product.name}</span> by {product.seller}. Your report will be reviewed by our team.
                  </p>

                  {/* Reason Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Why are you reporting this product? *
                    </label>
                    <div className="space-y-2">
                      {REPORT_REASONS.map((reason) => (
                        <label
                          key={reason.id}
                          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedReason === reason.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={reason.id}
                            checked={selectedReason === reason.id}
                            onChange={(e) => setSelectedReason(e.target.value)}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{reason.label}</div>
                            <div className="text-sm text-gray-600">{reason.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Please provide any additional information that might help us review this report..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      rows="4"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> All reports are kept confidential. Our team will review this report and take appropriate action if the product violates our policies.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReportSubmit}
                      disabled={!selectedReason}
                      className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors ${
                        selectedReason
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit Report
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Success Message */
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for helping us maintain a safe marketplace. Our team will review your report shortly.
                </p>
                <div className="text-sm text-gray-500">
                  This window will close automatically...
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}