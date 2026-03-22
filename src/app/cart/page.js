'use client';

import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, AlertCircle, Loader2, CreditCard, Shield, Truck } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// RAZORPAY SCRIPT LOADER
// ─────────────────────────────────────────────────────────────────────────────
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) return resolve(true);
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT STATUS MODAL
// ─────────────────────────────────────────────────────────────────────────────
function PaymentModal({ status, message, onClose }) {
  if (!status) return null;

  const isSuccess = status === 'success';
  const isLoading = status === 'loading';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        {isLoading && (
          <>
            <Loader2 className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing</h3>
            <p className="text-gray-500">{message || 'Please wait...'}</p>
          </>
        )}
        {isSuccess && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Success! 🎉</h3>
            <p className="text-gray-500 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              Continue Shopping
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-500 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CART COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentModal, setPaymentModal] = useState({ status: null, message: '' });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:4001/api';

  // Get auth token and userId
  const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  };

  const getUserId = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FETCH CART FROM BACKEND
  // ─────────────────────────────────────────────────────────────────────────────
  const fetchCart = async () => {
    const token = getAuthToken();
    const userId = getUserId();

    if (!token || !userId) {
      // User not logged in - use localStorage
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(localCart.map(item => ({ ...item, quantity: item.quantity || 1 })));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success && data.data.items) {
        setCartItems(data.data.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to localStorage
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(localCart);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // UPDATE QUANTITY (BACKEND + LOCALSTORAGE)
  // ─────────────────────────────────────────────────────────────────────────────
  const updateQuantity = async (index, delta) => {
    const token = getAuthToken();
    const userId = getUserId();
    const item = cartItems[index];
    const newQuantity = Math.max(1, (item.quantity || 1) + delta);

    // Update UI immediately
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);

    if (!token || !userId) {
      // Update localStorage only
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
      return;
    }

    try {
      // Update backend
      await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          productId: item.productId || item.id,
          quantity: newQuantity,
          priceAtTime: item.price
        })
      });

      // Also update localStorage for navbar badge
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // REMOVE ITEM (BACKEND + LOCALSTORAGE)
  // ─────────────────────────────────────────────────────────────────────────────
  const removeItem = async (index) => {
    const token = getAuthToken();
    const userId = getUserId();
    const item = cartItems[index];

    // Update UI immediately
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);

    if (!token || !userId) {
      // Update localStorage only
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
      return;
    }

    try {
      // Remove from backend
      await fetch(`${API_URL}/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          productId: item.productId || item.id
        })
      });

      // Also update localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CLEAR CART (BACKEND + LOCALSTORAGE)
  // ─────────────────────────────────────────────────────────────────────────────
  const clearCart = async () => {
    const token = getAuthToken();
    const userId = getUserId();

    // Update UI immediately
    setCartItems([]);

    if (!token || !userId) {
      // Clear localStorage only
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      return;
    }

    try {
      // Clear backend cart
      await fetch(`${API_URL}/cart/clear/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Also clear localStorage
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATE TOTALS
  // ─────────────────────────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.priceAtTime || item.price;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
  
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // ─────────────────────────────────────────────────────────────────────────────
  // RAZORPAY PAYMENT INTEGRATION
  // ─────────────────────────────────────────────────────────────────────────────
  const confirmPayment = async (paymentResponse) => {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpaySignature: paymentResponse.razorpay_signature
      })
    });

    const data = await response.json();

    if (data.success) {
      await clearCart();
      setPaymentModal({ 
        status: 'success', 
        message: 'Your order has been placed successfully!' 
      });
    } else {
      throw new Error(data.message || 'Payment verification failed');
    }
  };

  const initiatePayment = async () => {
    if (cartItems.length === 0) return;

    const token = getAuthToken();
    if (!token) {
      alert('Please sign in to continue with payment');
      return;
    }

    try {
      setIsCheckingOut(true);
      setPaymentModal({ status: 'loading', message: 'Creating your order...' });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay. Check your internet connection.');
      }

      const response = await fetch(`${API_URL}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: 'order_' + Date.now(),
          amount: Math.round(total),
          currency: 'INR'
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      setPaymentModal({ status: null, message: '' });

      const options = {
        key: data.data.key,
        amount: data.data.amount,
        currency: data.data.currency,
        order_id: data.data.razorpayOrderId,
        name: 'UniKart',
        description: `Purchase of ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`,

        handler: async (paymentResponse) => {
          setPaymentModal({ status: 'loading', message: 'Verifying your payment...' });
          try {
            await confirmPayment(paymentResponse);
          } catch (err) {
            setPaymentModal({ status: 'error', message: err.message });
          }
        },

        prefill: {
          name: localStorage.getItem('userName') || 'Customer',
          email: 'customer@college.edu',
          contact: '9999999999'
        },

        modal: {
          ondismiss: () => {
            setIsCheckingOut(false);
            setPaymentModal({ status: null, message: '' });
          }
        },

        theme: {
          color: '#4F46E5'
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (failResponse) => {
        setPaymentModal({
          status: 'error',
          message: failResponse.error.description || 'Payment failed. Please try again.'
        });
      });

      rzp.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setPaymentModal({ status: 'error', message: error.message });
    } finally {
      setIsCheckingOut(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <PaymentModal
        status={paymentModal.status}
        message={paymentModal.message}
        onClose={() => setPaymentModal({ status: null, message: '' })}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex gap-4 hover:shadow-md transition-shadow">
                  
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || 'Product'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {item.seller}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-indigo-600">
                      ₹{((item.priceAtTime || item.price) * (item.quantity || 1)).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ₹{item.priceAtTime || item.price} each
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{Math.round(total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={initiatePayment}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors mb-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{Math.round(total).toLocaleString()}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <Link href="/shop">
                  <button className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                    Continue Shopping
                  </button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Razorpay checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-500" />
                    <span>Free campus delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Support student businesses</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}