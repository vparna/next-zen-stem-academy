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

interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

interface Enrollment {
  _id: string;
  courseId: string;
  status: string;
  paymentStatus: string;
  enrolledAt: string;
  course?: Course;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);

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
    
    // Fetch user enrollments
    fetchEnrollments();
  }, [router]);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/enrollments/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.enrollments || []);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

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
          
          {enrollmentsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">You haven&apos;t enrolled in any courses yet.</p>
              <Link
                href="/courses"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  {enrollment.course && (
                    <>
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {enrollment.course.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {enrollment.course.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {enrollment.course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>⏱️ {enrollment.course.duration}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          enrollment.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>
                      <Link
                        href={`/courses/${enrollment.course._id}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        View Course
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
