'use client';

import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample product data (same as shop)
const allProducts = [
  { id: 1, name: "Chocolate Truffle Cake", seller: "Sarah's Bakery", price: 450, rating: 4.8, image: "🧁", inStock: true },
  { id: 2, name: "Handmade Scrunchies Set", seller: "Craft Corner", price: 150, rating: 4.9, image: "✨", inStock: true },
  { id: 3, name: "Math Tutoring - 1 Hour", seller: "Priya Tutors", price: 300, rating: 5.0, image: "📚", inStock: true },
  { id: 4, name: "Custom Portrait Art", seller: "ArtByRaj", price: 800, rating: 4.7, image: "🎨", inStock: false },
  { id: 5, name: "Laptop Repair Service", seller: "TechFix Campus", price: 500, rating: 4.6, image: "💻", inStock: true },
  { id: 6, name: "Red Velvet Cupcakes", seller: "Sarah's Bakery", price: 250, rating: 4.9, image: "🧁", inStock: true },
  { id: 7, name: "Handwoven Tote Bag", seller: "Craft Corner", price: 400, rating: 4.8, image: "✨", inStock: true },
  { id: 8, name: "Physics Lab Help", seller: "Priya Tutors", price: 400, rating: 4.9, image: "📚", inStock: true }
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
      
      // Get full product details for wishlist items
      const products = allProducts.filter(p => savedWishlist.includes(p.id));
      setWishlistProducts(products);
    }
  }, []);

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist);
    setWishlistProducts(wishlistProducts.filter(p => p.id !== productId));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const moveToCart = (product) => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistProducts.length} items saved</p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love for later!</p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                
                <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl relative group">
                  {item.image}
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {item.seller}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">₹{item.price}</span>
                    {!item.inStock && (
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => moveToCart(item)}
                    disabled={!item.inStock}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {item.inStock ? "Add to Cart" : "Unavailable"}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {wishlistProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-600 mb-4">Check out similar products from our student sellers</p>
              <Link href="/shop">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}