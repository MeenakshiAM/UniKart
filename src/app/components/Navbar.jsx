'use client';

import { ShoppingCart, Heart, Menu, X, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  // Update counts from localStorage
  useEffect(() => {
    const updateCounts = () => {
      if (typeof window !== 'undefined') {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setCartCount(cart.length);
        setWishlistCount(wishlist.length);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setShowAuthModal(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      localStorage.setItem('userName', formData.name || formData.email.split('@')[0]);
    }
    
    // Reset form
    setFormData({ email: "", password: "", name: "" });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left - Logo & Nav Links */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="font-bold text-xl tracking-tight gradient-text hover:opacity-80 transition-opacity">
                UniKart
              </Link>

              <div className="hidden md:flex space-x-6">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/shop" className="nav-link">Shop</Link>
                <Link href="/sell" className="nav-link">Sell</Link>
                <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
              </div>
            </div>

            {/* Right - Icons & Auth */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="icon-btn relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/wishlist" className="icon-btn relative">
                <Heart className="w-5 h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Account
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      My Orders
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-b-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsLogin(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden icon-btn"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/shop" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                <Link href="/sell" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Sell</Link>
                <Link href="/leaderboard" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Complete Auth Modal */}
      {showAuthModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
          onClick={() => setShowAuthModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-slideUp" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">
                {isLogin ? "Welcome Back!" : "Join UniKart"}
              </h2>
              <p className="text-gray-600">
                {isLogin ? "Sign in to continue shopping" : "Create your account to start"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="student@college.edu"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* User Type (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I want to:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="p-4 rounded-lg border-2 border-indigo-500 bg-indigo-50 text-indigo-700 transition-all"
                    >
                      <div className="text-2xl mb-1">🛍️</div>
                      <div className="font-medium text-sm">Shop</div>
                    </button>
                    <button
                      type="button"
                      className="p-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
                    >
                      <div className="text-2xl mb-1">💼</div>
                      <div className="font-medium text-sm">Sell</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}