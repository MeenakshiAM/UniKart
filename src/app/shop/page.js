'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Star, Heart, ShoppingCart, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample product data
const sampleProducts = [
  { id: 1, name: "Chocolate Truffle Cake", seller: "Sarah's Bakery", price: 450, rating: 4.8, reviews: 24, category: "cakes", image: "🧁", description: "Rich chocolate cake" },
  { id: 2, name: "Handmade Scrunchies Set", seller: "Craft Corner", price: 150, rating: 4.9, reviews: 45, category: "handmade", image: "✨", description: "Set of 5 colorful scrunchies" },
  { id: 3, name: "Math Tutoring - 1 Hour", seller: "Priya Tutors", price: 300, rating: 5.0, reviews: 32, category: "tutoring", image: "📚", description: "Expert math tutoring" },
  { id: 4, name: "Custom Portrait Art", seller: "ArtByRaj", price: 800, rating: 4.7, reviews: 18, category: "art-crafts", image: "🎨", description: "Hand-drawn portraits" },
  { id: 5, name: "Laptop Repair Service", seller: "TechFix Campus", price: 500, rating: 4.6, reviews: 56, category: "tech-services", image: "💻", description: "Professional repair" },
  { id: 6, name: "Red Velvet Cupcakes", seller: "Sarah's Bakery", price: 250, rating: 4.9, reviews: 38, category: "cakes", image: "🧁", description: "Dozen fresh cupcakes" },
  { id: 7, name: "Handwoven Tote Bag", seller: "Craft Corner", price: 400, rating: 4.8, reviews: 22, category: "handmade", image: "✨", description: "Eco-friendly bag" },
  { id: 8, name: "Physics Lab Help", seller: "Priya Tutors", price: 400, rating: 4.9, reviews: 28, category: "tutoring", image: "📚", description: "Lab report help" }
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "cakes", name: "Cakes" },
  { id: "handmade", name: "Handmade" },
  { id: "tutoring", name: "Tutoring" },
  { id: "art-crafts", name: "Art & Crafts" },
  { id: "tech-services", name: "Tech Services" }
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
    // Load wishlist from localStorage
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    }
  }, []);

  useEffect(() => {
    let filtered = sampleProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
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

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <p className="text-xl text-gray-600">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card group">
                    
                    {/* Product Image with Wishlist Heart */}
                    <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-t-lg flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform relative">
                      {product.image}
                      
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
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                      <p className="text-xs text-gray-500 mb-3">{product.description}</p>

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