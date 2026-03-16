'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import SignIn from './SignIn';

const Navbar = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
      setWishlistCount(wishlist.length);

      const token = localStorage.getItem('authToken');
      const name = localStorage.getItem('userName');
      if (token) {
        setIsAuthenticated(true);
        setUserName(name || 'User');
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserName('');
    setShowAccountMenu(false);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Sell', path: '/sell' },
    { name: 'Leaderboard', path: '/leaderboard' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Logo + Nav Links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                UniKart
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Cart, Wishlist, Auth */}
            <div className="flex items-center gap-4">
              
              {/* Cart Icon */}
              <button
                onClick={() => router.push('/cart')}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => router.push('/wishlist')}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className="w-6 h-6 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-indigo-600" />
                    <span className="hidden sm:block text-sm font-medium text-indigo-600">{userName}</span>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                        Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                        My Orders
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <SignIn
          onClose={() => setShowAuthModal(false)}
          onSuccess={(name) => {
            setIsAuthenticated(true);
            setUserName(name);
            setShowAuthModal(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;