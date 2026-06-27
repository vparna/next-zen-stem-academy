'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Interest {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  childName: string | null;
  childAge: number | null;
  message: string | null;
  status: string;
  source: string;
  createdAt: string;
}

interface StoredUser {
  role?: string;
}

export default function AdminInterestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [interests, setInterests] = useState<Interest[]>([]);

  const fetchInterests = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/admin/interests', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInterests(data.interests || []);
      } else if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => router.push('/admin/login'), 1500);
      } else {
        setError('Failed to load interest submissions');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching interests:', errorMessage);
      setError('An error occurred while loading interest submissions');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    let user: StoredUser | null = null;
    try {
      user = JSON.parse(userData) as StoredUser;
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/admin/login');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchInterests(token);
  }, [router, fetchInterests]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading interest submissions...</p>
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
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interest Submissions</h1>
              <p className="text-gray-600 mt-1">Total: {interests.length} submissions</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No interest submissions yet
                    </td>
                  </tr>
                ) : (
                  interests.map((interest) => (
                    <tr key={interest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{interest.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{interest.status}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{interest.email}</div>
                        <div className="text-sm text-gray-500">{interest.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{interest.course}</div>
                        <div className="text-xs text-gray-500">{interest.source}</div>
                      </td>
                      <td className="px-6 py-4">
                        {interest.childName ? (
                          <div className="text-sm text-gray-900">
                            {interest.childName}
                            {interest.childAge ? ` (${interest.childAge} yrs)` : ''}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-sm">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words" title={interest.message || ''}>
                          {interest.message || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(interest.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
