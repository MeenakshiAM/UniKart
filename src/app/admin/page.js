'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Package,
  Flag,
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  USER_SERVICE_URL,
  PRODUCT_SERVICE_URL,
  REPORT_SERVICE_URL,
} from '../../config/serviceUrls';

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingReports: 0,
    totalOrders: 0,
    activeUsers: 0,
    suspendedUsers: 0
  });

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  const checkAdminAccess = () => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    if (!token || userType !== 'ADMIN') {
      router.push('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Fetch user stats
      const userResponse = await fetch(`${USER_SERVICE_URL}/api/auth/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userPayload = await userResponse.json();
      const users = userPayload.users || [];
      const activeUsers = users.filter((u) => !u.isSuspended && !u.isBanned).length;
      const suspendedUsers = users.filter((u) => !!u.isSuspended).length;

      // Fetch product stats
      const productResponse = await fetch(`${PRODUCT_SERVICE_URL}/api/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const productPayload = await productResponse.json();

      // Fetch report stats
      const reportResponse = await fetch(`${REPORT_SERVICE_URL}/api/reports/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reportPayload = await reportResponse.json();
      const reportStats = reportPayload.stats || {};

      setStats({
        totalUsers: users.length || 0,
        activeUsers: activeUsers || 0,
        suspendedUsers: suspendedUsers || 0,
        totalProducts: productPayload.total || 0,
        pendingReports: reportStats.pending || 0,
        totalOrders: 0 // Will be implemented when order service is available
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const adminCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Suspended Users',
      value: stats.suspendedUsers,
      icon: Ban,
      color: 'bg-red-500',
      change: '-2%',
      changeType: 'negative'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      icon: Flag,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'neutral'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: BarChart3,
      color: 'bg-indigo-500',
      change: '+20%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View, suspend, or ban users',
      icon: Users,
      action: () => router.push('/admin/users'),
      color: 'bg-blue-500'
    },
    {
      title: 'Review Products',
      description: 'Approve or reject product listings',
      icon: Package,
      action: () => router.push('/admin/products'),
      color: 'bg-purple-500'
    },
    {
      title: 'Handle Reports',
      description: 'Review and resolve user reports',
      icon: Flag,
      action: () => router.push('/admin/reports'),
      color: 'bg-orange-500'
    },
    {
      title: 'Content Moderation',
      description: 'Monitor and moderate content',
      icon: Shield,
      action: () => router.push('/admin/moderation'),
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, products, and platform content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      card.changeType === 'positive' ? 'text-green-500' :
                      card.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      card.changeType === 'positive' ? 'text-green-600' :
                      card.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all text-left group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">john.doe@college.edu joined 2 minutes ago</p>
              </div>
              <span className="text-xs text-gray-400">2m ago</span>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Flag className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New report submitted</p>
                <p className="text-xs text-gray-500">Product reported for inappropriate content</p>
              </div>
              <span className="text-xs text-gray-400">15m ago</span>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Product approved</p>
                <p className="text-xs text-gray-500">Handmade jewelry set approved for listing</p>
              </div>
              <span className="text-xs text-gray-400">1h ago</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;