'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, TrendingUp, Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SellerDashboard() {
  const router = useRouter();
  const [sellerName, setSellerName] = useState('');
  const [sellerProducts, setSellerProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      const userName = localStorage.getItem('userName');
      
      if (!authToken) {
        alert('Please login to access Seller Dashboard');
        router.push('/');
        return;
      }
      
      setSellerName(userName || 'Seller');
      loadSellerData();
    }
  }, []);

  const loadSellerData = () => {
    // Load seller's products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    const userName = localStorage.getItem('userName');
    
    // Filter products by this seller
    const myProducts = allProducts.filter(p => p.seller === userName);
    setSellerProducts(myProducts);

    // Load orders for seller's products
    const allOrders = JSON.parse(localStorage.getItem('sellerOrders') || '[]');
    const myOrders = allOrders.filter(order => 
      myProducts.some(product => product.id === order.productId)
    );
    setOrders(myOrders);

    // Calculate stats
    const totalRevenue = myOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = myOrders.filter(o => o.status === 'pending').length;

    setStats({
      totalProducts: myProducts.length,
      totalOrders: myOrders.length,
      totalRevenue: totalRevenue,
      pendingOrders: pendingOrders
    });
  };

  const deleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const allProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
      const updatedProducts = allProducts.filter(p => p.id !== productId);
      localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));
      loadSellerData();
      alert('Product deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Seller Dashboard</h1>
          <p className="text-white/90 text-lg">Welcome back, {sellerName}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalProducts}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Products</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.totalOrders}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Orders</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Revenue</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Pending Orders</h3>
          </div>
        </div>

        {/* My Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">My Products</h2>
            <button
              onClick={() => router.push('/seller/add-product')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>

          {sellerProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Start selling by adding your first product</p>
              <button
                onClick={() => router.push('/seller/add-product')}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Add Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
                    {product.image || '📦'}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/seller/edit-product/${product.id}`)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Recent Orders</h2>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Your orders will appear here</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.productName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.customerName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => router.push(`/seller/orders/${order.id}`)}
                            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}