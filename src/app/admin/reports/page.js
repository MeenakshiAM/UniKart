'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Flag,
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Package
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { REPORT_SERVICE_URL } from '../../../config/serviceUrls';

const AdminReports = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter]);

  const checkAdminAccess = () => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    if (!token || userType !== 'ADMIN') {
      router.push('/');
      return;
    }

    setIsAdmin(true);
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${REPORT_SERVICE_URL}/api/reports/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.productName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  };

  const handleReportAction = async (reportId, action) => {
    try {
      const token = localStorage.getItem('authToken');
      let endpoint = '';

      switch (action) {
        case 'under-review':
          endpoint = `${REPORT_SERVICE_URL}/api/reports/admin/${reportId}/under-review`;
          break;
        case 'resolve':
          endpoint = `${REPORT_SERVICE_URL}/api/reports/admin/${reportId}/resolve`;
          break;
        case 'reject':
          endpoint = `${REPORT_SERVICE_URL}/api/reports/admin/${reportId}/reject`;
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminNote: 'Action taken by admin' })
      });

      if (response.ok) {
        fetchReports(); // Refresh the list
        setShowActionMenu(null);
        alert(`Report ${action.replace('-', ' ')}d successfully`);
      }
    } catch (error) {
      console.error(`Error ${action}ing report:`, error);
      alert(`Failed to ${action} report`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>;
      case 'under-review':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Under Review</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Resolved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Unknown</span>;
    }
  };

  const getReasonBadge = (reason) => {
    const colors = {
      'inappropriate-content': 'bg-red-100 text-red-800',
      'spam': 'bg-orange-100 text-orange-800',
      'fraud': 'bg-purple-100 text-purple-800',
      'harassment': 'bg-pink-100 text-pink-800',
      'other': 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[reason] || colors.other}`}>
        {reason.replace('-', ' ').toUpperCase()}
      </span>
    );
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
            <h1 className="text-3xl font-bold text-gray-900">Report Management</h1>
            <p className="text-gray-600 mt-2">Review and handle user reports</p>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports by reason, reporter, or product..."
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
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <Flag className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {report.productName || 'Product Report'}
                          </div>
                          <div className="text-sm text-gray-500">ID: {report._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReasonBadge(report.reason)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.reportedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === report._id ? null : report._id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {showActionMenu === report._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setSelectedReport(report);
                                  setShowReportModal(true);
                                  setShowActionMenu(null);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </button>
                              {report.status === 'pending' && (
                                <button
                                  onClick={() => handleReportAction(report._id, 'under-review')}
                                  className="flex items-center px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 w-full text-left"
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Mark Under Review
                                </button>
                              )}
                              {(report.status === 'pending' || report.status === 'under-review') && (
                                <button
                                  onClick={() => handleReportAction(report._id, 'resolve')}
                                  className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full text-left"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Resolve Report
                                </button>
                              )}
                              {report.status !== 'resolved' && (
                                <button
                                  onClick={() => handleReportAction(report._id, 'reject')}
                                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject Report
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <Flag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Flag className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedReport.productName || 'Product Report'}
                      </h3>
                      <p className="text-gray-600">Report ID: {selectedReport._id}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedReport.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    {getReasonBadge(selectedReport.reason)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reported By</label>
                    <p className="text-sm text-gray-600">{selectedReport.reportedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Reported</label>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedReport.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product ID</label>
                    <p className="text-sm text-gray-600">{selectedReport.productId}</p>
                  </div>
                </div>

                {selectedReport.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{selectedReport.description}</p>
                    </div>
                  </div>
                )}

                {selectedReport.adminNote && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Note</label>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-700">{selectedReport.adminNote}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminReports;