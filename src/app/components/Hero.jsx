'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Sparkles, Heart } from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'products', name: 'Products', icon: '📦' },
    { id: 'services', name: 'Services', icon: '💼' },
    { id: 'cakes', name: 'Cakes', icon: '🎂' },
    { id: 'jewellery', name: 'Jewellery', icon: '💍' },
    { id: 'tutoring', name: 'Tutoring', icon: '📚' },
    { id: 'mehendi', name: 'Mehendi', icon: '🎨' }
  ];

  // Featured products to display
  const featuredProducts = [
    {
      id: 1,
      name: "Chocolate Truffle Cake",
      seller: "Sarah's Bakery",
      price: 450,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      category: "products"
    },
    {
      id: 3,
      name: "Handmade Scrunchies Set",
      seller: "Craft Corner",
      price: 150,
      image: "https://images.unsplash.com/photo-1630081757603-a46d414be089?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NydW5jaGllc3xlbnwwfHwwfHx8MA%3D%3D",
      category: "products"
    },
    {
      id: 19,
      name: "Math Tutoring",
      seller: "Priya Tutors",
      price: 300,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h4UXx4VLjXlkNGzfqnf-fInVKBHY2luvXA&s",
      category: "services"
    },
    {
      id: 25,
      name: "Custom Portrait Art",
      seller: "ArtByRaj",
      price: 800,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
      category: "services"
    }
  ];

const addToCart = (product, e) => {
  e.stopPropagation();
  
  // Check if user is logged in
  if (typeof window !== 'undefined') {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      alert('Please login to add items to cart!');
      return;
    }
    
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

  const navigateToProduct = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold">
              UniKart
            </h1>
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl mb-2 font-light">Your Campus Marketplace</p>
          <p className="text-lg opacity-90">Discover products & services from talented student entrepreneurs</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search for cakes, tutoring, crafts, and more..."
               className="w-full px-6 py-4 pr-14 rounded-full bg-white text-gray-900 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 placeholder-gray-500"
               style={{ backgroundColor: 'white', color: '#111827' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => router.push(`/shop${category.id !== 'all' ? `?category=${category.id}` : ''}`)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-105 font-medium flex items-center gap-2 border border-white/30"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products & Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigateToProduct(product.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Added to wishlist!');
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">by {product.seller}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                    <div className="text-yellow-400">★</div>
                  </div>

                  {/* Add to Cart Button */}
                  {product.category === 'products' ? (
                    <button
                      onClick={(e) => addToCart(product, e)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(product.id);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      📅 Book Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/shop')}
            className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-2"
          >
            View All Products
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;