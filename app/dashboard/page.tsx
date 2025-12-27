'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Link
            href="/courses"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Courses</h3>
            <p className="text-gray-600">Explore our range of STEM courses</p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-600">Manage your account settings</p>
          </Link>

          <Link
            href="/dashboard/children"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Children</h3>
            <p className="text-gray-600">Manage children profiles</p>
          </Link>
        </div>

        {/* Admin Actions */}
        {user.role === 'admin' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Tools</h2>
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
        )}

        {/* Enrolled Courses Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Enrolled Courses</h2>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">You haven't enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
