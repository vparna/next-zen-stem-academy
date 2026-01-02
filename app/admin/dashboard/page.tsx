'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  totalStudents: number;
  totalEnrollments: number;
  activeEnrollments: number;
  totalRevenue: number;
  totalAttendance: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/reports', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.summary);
      } else if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError('Failed to load dashboard statistics');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('An error occurred while loading the dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage students, payments, and reports</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-4xl mr-4">👥</div>
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-4xl mr-4">📚</div>
                <div>
                  <p className="text-gray-600 text-sm">Active Enrollments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeEnrollments}</p>
                  <p className="text-xs text-gray-500">of {stats.totalEnrollments} total</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-4xl mr-4">💰</div>
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${(stats.totalRevenue / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-4xl mr-4">✅</div>
                <div>
                  <p className="text-gray-600 text-sm">Total Attendance</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalAttendance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/dashboard/students"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">👨‍🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
            <p className="text-gray-600">View all registered students</p>
          </Link>

          <Link
            href="/admin/dashboard/payments"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">💳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payments</h3>
            <p className="text-gray-600">View payment history</p>
          </Link>

          <Link
            href="/admin/dashboard/attendance"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendance</h3>
            <p className="text-gray-600">View attendance reports</p>
          </Link>

          <Link
            href="/admin/dashboard/reports"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">Generate detailed reports</p>
          </Link>
        </div>

        {/* Existing Admin Links */}
        <div className="mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Admin Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/admin/jobs"
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-2">💼</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Jobs</h3>
                <p className="text-gray-600 text-sm">Create and manage job postings</p>
              </Link>

              <Link
                href="/admin/applications"
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Review Applications</h3>
                <p className="text-gray-600 text-sm">View and manage job applications</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
