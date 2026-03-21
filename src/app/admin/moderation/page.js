'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Clock,
  TrendingUp
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MODERATION_SERVICE_URL } from '../../../config/serviceUrls';

const AdminModeration = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moderationLogs, setModerationLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    fetchModerationLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [moderationLogs, searchTerm, statusFilter]);

  const checkAdminAccess = () => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    if (!token || userType !== 'ADMIN') {
      router.push('/');
      return;
    }

    setIsAdmin(true);
  };

  const fetchModerationLogs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${MODERATION_SERVICE_URL}/api/moderation/logs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setModerationLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Error fetching moderation logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = moderationLogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.inputText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.decision?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.decision === statusFilter);
    }

    setFilteredLogs(filtered);
  };

  const testModeration = async () => {
    if (!testText.trim()) {
      alert('Please enter text to test');
      return;
    }

    setTesting(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${MODERATION_SERVICE_URL}/api/moderation/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: testText })
      });

      if (response.ok) {
        const result = await response.json();
        setTestResult(result);
      } else {
        alert('Failed to analyze text');
      }
    } catch (error) {
      console.error('Error testing moderation:', error);
      alert('Error testing moderation');
    } finally {
      setTesting(false);
    }
  };

  const getDecisionBadge = (decision) => {
    switch (decision) {
      case 'APPROVED':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Approved</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Unknown</span>;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
            <p className="text-gray-600 mt-2">Monitor and moderate platform content</p>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Moderation Test Tool */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Test Moderation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to test moderation
              </label>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Enter text to analyze for toxicity..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={4}
              />
            </div>
            <button
              onClick={testModeration}
              disabled={testing || !testText.trim()}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {testing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Test Content
                </>
              )}
            </button>

            {testResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Analysis Result</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Toxicity Score</p>
                    <p className="text-lg font-bold text-gray-900">
                      {(testResult.toxicityScore * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Decision</p>
                    {getDecisionBadge(testResult.decision)}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Reason</p>
                  <p className="text-sm text-gray-900">{testResult.reason}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search moderation logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Decisions</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Moderation Logs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toxicity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 line-clamp-2">{log.inputText}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              log.toxicityScore > 0.7 ? 'bg-red-500' :
                              log.toxicityScore > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${log.toxicityScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {(log.toxicityScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getDecisionBadge(log.decision)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setShowLogModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No moderation logs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Log Details Modal */}
      {showLogModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Moderation Log Details</h2>
                <button
                  onClick={() => setShowLogModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Analyzed Text</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{selectedLog.inputText}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Toxicity Score</label>
                    <p className="text-lg font-bold text-gray-900">
                      {(selectedLog.toxicityScore * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Decision</label>
                    <div className="mt-1">{getDecisionBadge(selectedLog.decision)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <p className="text-sm text-gray-600">{selectedLog.reason}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedLog.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Allowed</label>
                  <div className="flex items-center mt-1">
                    {selectedLog.isAllowed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className={`text-sm font-medium ${
                      selectedLog.isAllowed ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedLog.isAllowed ? 'Content Allowed' : 'Content Blocked'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminModeration;