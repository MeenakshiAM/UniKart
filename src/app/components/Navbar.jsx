'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { getCartCount, getWishlistCount } from '../utils/storage';

const Navbar = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth Modal States
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [department, setDepartment] = useState('');

  // Department options
  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics and Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Business Administration',
    'Commerce',
    'Economics',
    'English',
    'Other'
  ];

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());

      const token = localStorage.getItem('authToken');
      const storedName = localStorage.getItem('userName');
      if (token) {
        setIsAuthenticated(true);
        setUserName(storedName || 'User');
      } else {
        setIsAuthenticated(false);
        setUserName('');
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
    };
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
        
        setIsAuthenticated(true);
        setUserName(displayName);
        setShowAuthModal(false);
        
        // Reset form
        setEmail('');
        setPassword('');
      } else {
        alert('Please enter email and password');
      }
    } else {
      // Signup Logic - with additional fields
      if (name && email && password && registerNumber && dateOfBirth && department) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store all user data
        const userData = {
          name,
          email,
          registerNumber,
          dateOfBirth,
          department,
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userName', name);
        localStorage.setItem('userType', 'buyer');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setIsAuthenticated(true);
        setUserName(name);
        setShowAuthModal(false);
        
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setRegisterNumber('');
        setDateOfBirth('');
        setDepartment('');
        
        alert('Account created successfully!');
      } else {
        alert('Please fill all fields');
      }
    }
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
                      <button 
                        onClick={() => router.push('/seller')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Seller Dashboard
                      </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative my-8">
            {/* Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {isLogin ? 'Welcome Back!' : 'Join UniKart'}
            </h2>

            {/* Toggle Login/Signup */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  isLogin
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  !isLogin
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
<form onSubmit={handleAuthSubmit} className="space-y-4">
  
  {/* SIGNUP ONLY FIELDS */}
  {!isLogin && (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          style={{ color: '#111827' }}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Register Number *
        </label>
        <input
          type="text"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          style={{ color: '#111827' }}
          placeholder="e.g., 2021CS001"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth *
        </label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          style={{ color: '#111827' }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Branch/Department *
        </label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          style={{ color: '#111827' }}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </>
  )}

  {/* EMAIL - FOR BOTH LOGIN AND SIGNUP */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email *
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
      style={{ color: '#111827' }}
      placeholder="you@example.com"
      required
    />
  </div>

  {/* PASSWORD - FOR BOTH LOGIN AND SIGNUP */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password *
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
      style={{ color: '#111827' }}
      placeholder="••••••••"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors mt-6"
  >
    {isLogin ? 'Login' : 'Sign Up'}
  </button>
</form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
