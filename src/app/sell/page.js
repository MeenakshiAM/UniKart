'use client';

import { useState } from "react";
import { Upload, DollarSign, Package, TrendingUp, BarChart3, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { USER_SERVICE_URL } from "../../config/serviceUrls";
import { loginUser, registerUser } from "../../api/authApi";
import { saveAuthSession } from "../../utils/authStorage";

export default function Sell() {
  const [activeTab, setActiveTab] = useState("getting-started");

  // Authentication state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('seller');

  // Authentication functions
  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') !== null;
    }
    return false;
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const data = await loginUser({ email, password });
        saveAuthSession({ token: data.token, user: data.user });
      } else {
        const registerNumber = `LBT26IT${Math.floor(Math.random() * 900 + 100)}`;
        await registerUser({
          name,
          email,
          password,
          registerNumber,
          dateOfBirth: "2003-01-01",
          department: "IT",
        });
        alert("Registration successful. Please verify your email before login.");
      }
      setShowAuthModal(false);
      setName('');
      setEmail('');
      setPassword('');
      setUserType('seller');
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      alert(error.message || "Authentication failed");
    }
  };

  const handleCreateSellerAccount = async () => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }

    // Check if user is already a seller
    const userType = localStorage.getItem('userType');
    if (userType === 'seller') {
      alert('You are already registered as a seller!');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${USER_SERVICE_URL}/api/auth/register-seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          shopName: 'My Shop', // Default shop name, can be updated later
          shopDescription: 'Welcome to my shop!',
          agreedToCommission: true
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Seller registration submitted! Please wait for admin approval.');
        // Update local storage
        localStorage.setItem('userType', 'seller');
      } else {
        alert(data.message || 'Failed to register as seller');
      }
    } catch (error) {
      console.error('Seller registration error:', error);
      alert('Network error. Please try again.');
    }
  };

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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Selling on CampusMart</h1>
            <p className="text-xl text-indigo-100 mb-8">
              Turn your passion into profit. Join hundreds of student entrepreneurs.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg" onClick={handleCreateSellerAccount}>
              Create Seller Account
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: "getting-started", label: "Getting Started" },
              { id: "list-product", label: "List a Product" },
              { id: "benefits", label: "Benefits" },
              { id: "pricing", label: "Pricing" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Getting Started Tab */}
        {activeTab === "getting-started" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Start Selling</h2>
            
            <div className="space-y-6">
              {[
                { step: 1, icon: "📝", title: "Create Your Seller Profile", description: "Sign up and complete your seller profile with your business details, contact information, and a compelling bio." },
                { step: 2, icon: "📸", title: "List Your Products", description: "Add high-quality photos, detailed descriptions, and competitive pricing for your products or services." },
                { step: 3, icon: "🚀", title: "Start Selling", description: "Once approved, your products go live. Manage orders, track sales, and engage with customers through your dashboard." },
                { step: 4, icon: "💰", title: "Get Paid", description: "Receive payments securely through our integrated payment system. Track your earnings in real-time." }
              ].map(item => (
                <div key={item.step} className="bg-white rounded-xl shadow-md p-6 flex gap-4 hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-3xl">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Step {item.step}: {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Join our community of student entrepreneurs today</p>
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors" onClick={handleCreateSellerAccount}>
                Create Seller Account
              </button>
            </div>
          </div>
        )}

        {/* List Product Tab */}
        {activeTab === "list-product" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">List Your Product</h2>
            
            <form className="bg-white rounded-xl shadow-md p-8 space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB (max 5 images)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="e.g., Chocolate Truffle Cake" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Select a category</option>
                  <option>Cakes & Baked Goods</option>
                  <option>Handmade Crafts</option>
                  <option>Tutoring Services</option>
                  <option>Art & Design</option>
                  <option>Tech Services</option>
                  <option>Fashion & Accessories</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Describe your product in detail..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="number" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="450" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="number" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="10" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                  List Product
                </button>
                <button type="button" className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                  Save as Draft
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Sell on CampusMart?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <TrendingUp className="w-8 h-8 text-indigo-600" />, title: "Zero Setup Fees", description: "Start selling for free. No upfront costs or hidden charges." },
                { icon: <BarChart3 className="w-8 h-8 text-indigo-600" />, title: "Analytics Dashboard", description: "Track sales, revenue, and customer insights in real-time." },
                { icon: "🎯", title: "Targeted Audience", description: "Reach students who are actively looking for your products." },
                { icon: "💳", title: "Secure Payments", description: "Get paid quickly and securely through integrated payment gateways." },
                { icon: "🏆", title: "Gamification", description: "Compete on leaderboards, earn badges, and unlock achievements." },
                { icon: "📱", title: "Mobile Friendly", description: "Manage your business on-the-go with our mobile-optimized platform." }
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{typeof benefit.icon === 'string' ? benefit.icon : benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-center mb-12">Start for free, pay only when you sell</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-xl shadow-md p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-indigo-600 mb-6">
                  ₹0<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span><span className="text-gray-700">List up to 10 products</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span><span className="text-gray-700">5% commission per sale</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span><span className="text-gray-700">Basic analytics</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span><span className="text-gray-700">Standard support</span></li>
                </ul>
                <button className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Start Free</button>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white relative">
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">POPULAR</div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-6">₹199<span className="text-lg font-normal opacity-90">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Unlimited product listings</span></li>
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Only 3% commission per sale</span></li>
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Advanced analytics & insights</span></li>
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Priority support</span></li>
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Featured placement</span></li>
                  <li className="flex items-start gap-2"><span className="text-yellow-300">✓</span><span>Marketing tools</span></li>
                </ul>
                <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">Go Premium</button>
              </div>

            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}