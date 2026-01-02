'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ReportSummary {
  totalStudents: number;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  totalRevenue: number;
  totalAttendance: number;
  completedAttendance: number;
}

interface EnrollmentsByCourse {
  [courseName: string]: number;
}

export default function ReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [enrollmentsByCourse, setEnrollmentsByCourse] = useState<EnrollmentsByCourse>({});
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

    fetchReports();
  }, [router]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/reports', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
        setEnrollmentsByCourse(data.enrollmentsByCourse || {});
      } else if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError('Failed to load reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('An error occurred while loading reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Generating reports...</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Detailed Reports</h1>
              <p className="text-gray-600 mt-1">Comprehensive analytics and insights</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Overall Summary */}
        {summary && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Statistics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Students</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Students:</span>
                      <span className="font-semibold">{summary.totalStudents}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Enrollments</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-semibold">{summary.totalEnrollments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active:</span>
                      <span className="font-semibold text-green-600">{summary.activeEnrollments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-blue-600">{summary.completedEnrollments}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue & Attendance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue:</span>
                      <span className="font-semibold text-green-600">
                        ${(summary.totalRevenue / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Attendance:</span>
                      <span className="font-semibold">{summary.totalAttendance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold">{summary.completedAttendance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollments by Course */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrollments by Course</h2>
              {Object.keys(enrollmentsByCourse).length === 0 ? (
                <p className="text-gray-500">No enrollment data available</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(enrollmentsByCourse)
                    .sort((a, b) => b[1] - a[1])
                    .map(([courseName, count]) => (
                      <div key={courseName} className="flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{courseName}</span>
                            <span className="text-sm font-semibold text-gray-900">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(count / Math.max(...Object.values(enrollmentsByCourse))) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Metrics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Enrollment Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.totalStudents > 0 
                      ? ((summary.totalEnrollments / summary.totalStudents) * 100).toFixed(1)
                      : '0'}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Enrollments per student</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.totalEnrollments > 0
                      ? ((summary.completedEnrollments / summary.totalEnrollments) * 100).toFixed(1)
                      : '0'}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Completed enrollments</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Avg Revenue per Student</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary.totalStudents > 0
                      ? (summary.totalRevenue / 100 / summary.totalStudents).toFixed(2)
                      : '0.00'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Total revenue / students</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Attendance Completion</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.totalAttendance > 0
                      ? ((summary.completedAttendance / summary.totalAttendance) * 100).toFixed(1)
                      : '0'}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Completed check-ins</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
