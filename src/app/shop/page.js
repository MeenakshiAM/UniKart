'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Star, Heart, ShoppingCart, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Enhanced product data with images and categories
const sampleProducts = [
  // PRODUCTS - Cakes & Baked Goods
  { 
    id: 1, 
    name: "Chocolate Truffle Cake", 
    seller: "Sarah's Bakery", 
    price: 450, 
    rating: 4.8, 
    reviews: 24, 
    category: "products", 
    subcategory: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    description: "Rich chocolate cake with smooth truffle frosting"
  },
  { 
    id: 2, 
    name: "Red Velvet Cupcakes", 
    seller: "Sarah's Bakery", 
    price: 250, 
    rating: 4.9, 
    reviews: 38, 
    category: "products", 
    subcategory: "cakes",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
    description: "Dozen fresh red velvet cupcakes"
  },

  // PRODUCTS - Handmade Crafts
  { 
    id: 3, 
    name: "Handmade Scrunchies Set", 
    seller: "Craft Corner", 
    price: 150, 
    rating: 4.9, 
    reviews: 45, 
    category: "products", 
    subcategory: "handmade",
    image: "https://images.unsplash.com/photo-1630081757603-a46d414be089?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NydW5jaGllc3xlbnwwfHwwfHx8MA%3D%3D?w=400&h=400&fit=crop",
    description: "Set of 5 colorful handmade scrunchies"
  },
  { 
    id: 4, 
    name: "Handwoven Tote Bag", 
    seller: "Craft Corner", 
    price: 400, 
    rating: 4.8, 
    reviews: 22, 
    category: "products", 
    subcategory: "handmade",
    image: "https://northhouse.org/images/cache/assets/uploads/course_images/hand-woven-wool-tote-bag_erin-endsley_4_800px_sq-700x700.jpg?w=400&h=400&fit=crop",
    description: "Eco-friendly handwoven cotton bag"
  },

  // PRODUCTS - Candles
  { 
    id: 5, 
    name: "Scented Soy Candles Set", 
    seller: "Aroma Crafts", 
    price: 350, 
    rating: 4.7, 
    reviews: 31, 
    category: "products", 
    subcategory: "candles",
    image: "https://pacificnorthwicks.com/cdn/shop/files/Floral_Collection_by_Window.png?v=1728746685&width=1946?w=400&h=400&fit=crop",
    description: "Set of 3 handmade soy candles with natural scents"
  },
  { 
    id: 6, 
    name: "Decorative Pillar Candles", 
    seller: "Aroma Crafts", 
    price: 280, 
    rating: 4.6, 
    reviews: 19, 
    category: "products", 
    subcategory: "candles",
    image: "https://media.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000013911988-1000013911987_02-2100.jpg?w=400&h=400&fit=crop",
    description: "Beautifully crafted pillar candles for decoration"
  },

  // PRODUCTS - Soaps
  { 
    id: 7, 
    name: "Organic Handmade Soaps", 
    seller: "Natural Essence", 
    price: 200, 
    rating: 4.8, 
    reviews: 42, 
    category: "products", 
    subcategory: "soaps",
    image: "https://plus.unsplash.com/premium_photo-1684471006753-9936b2bc7cdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgwfHxPcmdhbmljJTIwSGFuZG1hZGUlMjBTb2Fwc3xlbnwwfHwwfHx8MA%3D%3D?w=400&h=400&fit=crop",
    description: "Set of 4 organic handmade soaps with natural ingredients"
  },
  { 
    id: 8, 
    name: "Herbal Bath Soap Collection", 
    seller: "Natural Essence", 
    price: 180, 
    rating: 4.7, 
    reviews: 28, 
    category: "products", 
    subcategory: "soaps",
    image: "https://images.unsplash.com/photo-1652607779025-55e89f9fcfe0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njc0fHxIZXJiYWwlMjBCYXRoJTIwU29hcHxlbnwwfHwwfHx8MA%3D%3D?w=400&h=400&fit=crop",
    description: "Luxurious herbal soaps for gentle cleansing"
  },

  // PRODUCTS - Invitation Cards
  { 
    id: 9, 
    name: "Custom Wedding Invitations", 
    seller: "Card Creations", 
    price: 500, 
    rating: 4.9, 
    reviews: 36, 
    category: "products", 
    subcategory: "invitation-cards",
    image: "https://media.craftyartapp.com/uploadedFiles/thumb_file/e66916ceaed0ca0149bbd603e40845937376c9c91749900611.jpg?w=400&h=400&fit=crop",
    description: "Elegant handcrafted wedding invitation cards (pack of 50)"
  },
  { 
    id: 10, 
    name: "Birthday Party Invites", 
    seller: "Card Creations", 
    price: 250, 
    rating: 4.7, 
    reviews: 21, 
    category: "products", 
    subcategory: "invitation-cards",
    image: "https://img.freepik.com/free-vector/hand-painted-watercolor-butterfly-birthday-invitation-template_23-2148998798.jpg?w=400&h=400&fit=crop",
    description: "Colorful custom birthday invitations (pack of 30)"
  },

  // PRODUCTS - Pencil Pouches
  { 
    id: 11, 
    name: "Fabric Pencil Pouch", 
    seller: "Stitch & Style", 
    price: 120, 
    rating: 4.6, 
    reviews: 18, 
    category: "products", 
    subcategory: "pencil-pouches",
    image: "https://cdn01.pinkoi.com/product/fjk2rKtH/0/1/640x530.jpg?w=400&h=400&fit=crop",
    description: "Handmade fabric pencil pouch with multiple compartments"
  },
  { 
    id: 12, 
    name: "Designer Pencil Case", 
    seller: "Stitch & Style", 
    price: 150, 
    rating: 4.8, 
    reviews: 25, 
    category: "products", 
    subcategory: "pencil-pouches",
    image: "https://notiq.com/cdn/shop/collections/4f1940e55aea3b7412f35f5e15c0bb84.jpg?v=1659289306&width=2048?w=400&h=400&fit=crop",
    description: "Premium quality designer pencil case"
  },

  // PRODUCTS - Bouquets
  { 
    id: 13, 
    name: "Fresh Rose Bouquet", 
    seller: "Petal Paradise", 
    price: 450, 
    rating: 4.9, 
    reviews: 52, 
    category: "products", 
    subcategory: "bouquets",
    image: "https://flowersugar.com/cdn/shop/files/Little_angel_group_1_table_400x.jpg?v=1712205357?w=400&h=400&fit=crop",
    description: "Beautiful fresh rose bouquet (12 roses)"
  },
  { 
    id: 14, 
    name: "Mixed Flower Arrangement", 
    seller: "Petal Paradise", 
    price: 350, 
    rating: 4.7, 
    reviews: 34, 
    category: "products", 
    subcategory: "bouquets",
    image: "https://www.dpsainiflorist.com/wp-content/uploads/2023/06/dp7077.jpg?w=400&h=400&fit=crop",
    description: "Vibrant mixed flower bouquet arrangement"
  },

  // PRODUCTS - Crochet
  { 
    id: 15, 
    name: "Crochet Handbag", 
    seller: "Yarn & Hook", 
    price: 380, 
    rating: 4.8, 
    reviews: 27, 
    category: "products", 
    subcategory: "crochet",
    image: "https://i.etsystatic.com/49279796/r/il/eecc91/6161756099/il_1080xN.6161756099_q6yt.jpg?w=400&h=400&fit=crop",
    description: "Handmade crochet handbag with cotton yarn"
  },
  { 
    id: 16, 
    name: "Crochet Baby Blanket", 
    seller: "Yarn & Hook", 
    price: 550, 
    rating: 4.9, 
    reviews: 41, 
    category: "products", 
    subcategory: "crochet",
    image: "https://i.ebayimg.com/images/g/lhkAAOSwYApe54dc/s-l1200.jpg?w=400&h=400&fit=crop",
    description: "Soft and cozy crochet baby blanket"
  },

  // PRODUCTS - Jewellery
  { 
    id: 17, 
    name: "Handmade Beaded Necklace", 
    seller: "Gem & Bead", 
    price: 320, 
    rating: 4.7, 
    reviews: 33, 
    category: "products", 
    subcategory: "jewellery",
    image: "https://i.etsystatic.com/34927393/r/il/8a6ca9/7216894485/il_fullxfull.7216894485_ljrt.jpg?w=400&h=400&fit=crop",
    description: "Elegant handmade beaded necklace"
  },
  { 
    id: 18, 
    name: "Silver Earrings Set", 
    seller: "Gem & Bead", 
    price: 280, 
    rating: 4.8, 
    reviews: 29, 
    category: "products", 
    subcategory: "jewellery",
    image: "https://5.imimg.com/data5/ECOM/Default/2024/10/455862610/NG/NC/RH/107380810/vqiml-512-500x500.jpg?w=400&h=400&fit=crop",
    description: "Beautiful silver earrings with stone work"
  },

  // SERVICES - Tutoring
  { 
    id: 19, 
    name: "Math Tutoring", 
    seller: "Priya Tutors", 
    price: 300, 
    rating: 5.0, 
    reviews: 32, 
    category: "services", 
    subcategory: "tutoring",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h4UXx4VLjXlkNGzfqnf-fInVKBHY2luvXA&s?w=400&h=400&fit=crop",
    description: "Expert calculus and algebra tutoring"
  },
  { 
    id: 20, 
    name: "Physics Lab Help", 
    seller: "Priya Tutors", 
    price: 400, 
    rating: 4.9, 
    reviews: 28, 
    category: "services", 
    subcategory: "tutoring",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop",
    description: "Lab report help and concept clearing"
  },

  // SERVICES - Mehendi Designing
  { 
    id: 21, 
    name: "Bridal Mehendi Design", 
    seller: "Mehendi Magic", 
    price: 800, 
    rating: 4.9, 
    reviews: 47, 
    category: "services", 
    subcategory: "mehendi",
    image: "https://i.pinimg.com/736x/72/2c/b1/722cb155f3a04585c746edc82e1c4ddf.jpg?w=400&h=400&fit=crop",
    description: "Intricate bridal mehendi designs for special occasions"
  },
  { 
    id: 22, 
    name: "Simple Mehendi Design", 
    seller: "Mehendi Magic", 
    price: 300, 
    rating: 4.8, 
    reviews: 38, 
    category: "services", 
    subcategory: "mehendi",
    image: "https://i.pinimg.com/736x/5a/d0/a3/5ad0a3c87357acd809d560cf7c60ca6f.jpg?w=400&h=400&fit=crop",
    description: "Beautiful simple mehendi for casual events"
  },

  // SERVICES - Saree Draping
  { 
    id: 23, 
    name: "Saree Draping", 
    seller: "Drape & Style", 
    price: 250, 
    rating: 4.8, 
    reviews: 35, 
    category: "services", 
    subcategory: "saree-draping",
    image: "https://images.indianweddingsaree.com/product-image/1961377/1.jpg?w=400&h=400&fit=crop",
    description: "Professional saree draping service"
  },
  // { 
  //   id: 24, 
  //   name: "Modern Saree Styling", 
  //   seller: "Drape & Style", 
  //   price: 300, 
  //   rating: 4.9, 
  //   reviews: 29, 
  //   category: "services", 
  //   subcategory: "saree-draping",
  //   image: "https://images.unsplash.com/photo-1583391733981-2f58779ad1f6?w=400&h=400&fit=crop",
  //   description: "Contemporary saree draping with modern styles"
  // },

  // SERVICES - Art & Design
  { 
    id: 25, 
    name: "Custom Portrait Art", 
    seller: "ArtByRaj", 
    price: 800, 
    rating: 4.7, 
    reviews: 18, 
    category: "services", 
    subcategory: "art-design",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    description: "Hand-drawn digital portraits"
  },

  // SERVICES - Tech Services
  { 
    id: 26, 
    name: "Laptop Repair Service", 
    seller: "TechFix Campus", 
    price: 500, 
    rating: 4.6, 
    reviews: 56, 
    category: "services", 
    subcategory: "tech",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    description: "Professional laptop diagnostics and repair"
  }
];

const categories = [
  { id: "all", name: "All Items", type: "all" },
  { id: "products", name: "🛍️ Products", type: "main" },
  { id: "services", name: "💼 Services", type: "main" },
  
  // Product Subcategories
  { id: "cakes", name: "Cakes & Baked Goods", type: "sub", parent: "products" },
  { id: "handmade", name: "Handmade Crafts", type: "sub", parent: "products" },
  { id: "candles", name: "Candles", type: "sub", parent: "products" },
  { id: "soaps", name: "Soaps", type: "sub", parent: "products" },
  { id: "invitation-cards", name: "Invitation Cards", type: "sub", parent: "products" },
  { id: "pencil-pouches", name: "Pencil Pouches", type: "sub", parent: "products" },
  { id: "bouquets", name: "Bouquets", type: "sub", parent: "products" },
  { id: "crochet", name: "Crochet Items", type: "sub", parent: "products" },
  { id: "jewellery", name: "Jewellery", type: "sub", parent: "products" },
  
  // Service Subcategories
  { id: "tutoring", name: "Tutoring", type: "sub", parent: "services" },
  { id: "mehendi", name: "Mehendi Designing", type: "sub", parent: "services" },
  { id: "saree-draping", name: "Saree Draping", type: "sub", parent: "services" },
  { id: "art-design", name: "Art & Design", type: "sub", parent: "services" },
  { id: "tech", name: "Tech Services", type: "sub", parent: "services" }
];

export default function Shop() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search');
  
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    let filtered = sampleProducts;

    // Filter by main category (products/services)
    if (selectedCategory === "products") {
      filtered = filtered.filter(p => p.category === "products");
    } else if (selectedCategory === "services") {
      filtered = filtered.filter(p => p.category === "services");
    } else if (selectedCategory !== "all") {
      // Filter by subcategory
      filtered = filtered.filter(p => p.subcategory === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId) 
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const addToCart = (product) => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const getCategoryName = () => {
    if (selectedCategory === "all") return "All Items";
    if (selectedCategory === "products") return "All Products";
    if (selectedCategory === "services") return "All Services";
    return categories.find(c => c.id === selectedCategory)?.name || "Products";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getCategoryName()}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Categories</h3>
              </div>

              <div className="space-y-2">
                {/* All Items */}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All Items
                </button>

                {/* Main Categories */}
                {categories.filter(c => c.type === "main").map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-semibold ${
                      selectedCategory === category.id
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}

                {/* Product Subcategories */}
                <div className="pl-4 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-2">Product Types</p>
                  {categories.filter(c => c.parent === "products").map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        selectedCategory === category.id
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Service Subcategories */}
                <div className="pl-4 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-2">Service Types</p>
                  {categories.filter(c => c.parent === "services").map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        selectedCategory === category.id
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <p className="text-xl text-gray-600">No items found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card group">
                    
                    {/* Product Image with Wishlist Heart */}
                    <div className="aspect-square bg-gray-100 rounded-t-lg relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=' + encodeURIComponent(product.name);
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        product.category === 'services' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {product.category === 'services' ? '💼 Service' : '🛍️ Product'}
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                          wishlist.includes(product.id)
                            ? 'bg-pink-500 text-white shadow-lg scale-110'
                            : 'bg-white text-gray-400 hover:text-pink-500 hover:scale-110 shadow-md'
                        }`}
                        title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart 
                          className={`w-5 h-5 transition-all ${wishlist.includes(product.id) ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                        
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                          title="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}