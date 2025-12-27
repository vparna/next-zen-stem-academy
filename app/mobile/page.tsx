'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function MobilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch full user profile
    fetchUserProfile(token);
  }, [router]);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isTeacher = user?.role === 'teacher';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            NextGen STEM Academy
          </h1>
          <p className="text-gray-600">Mobile Attendance & Chat</p>
          {user && (
            <div className="mt-4 bg-white rounded-lg p-3 shadow-md">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-indigo-600 font-medium uppercase mt-1">
                {user.role || 'parent'}
              </p>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          {/* QR Code / Scanner Card */}
          {isTeacher ? (
            <button
              onClick={() => router.push('/mobile/scanner')}
              className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">📷</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    QR Scanner
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Scan student QR codes for check-in/check-out
                  </p>
                </div>
                <div className="text-2xl text-indigo-600">→</div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => router.push('/mobile/qr-code')}
              className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎫</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    Student QR Code
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Display QR code for check-in and check-out
                  </p>
                </div>
                <div className="text-2xl text-indigo-600">→</div>
              </div>
            </button>
          )}

          {/* Attendance Card */}
          <button
            onClick={() => router.push('/mobile/attendance')}
            className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">📋</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Attendance History
                </h2>
                <p className="text-gray-600 text-sm">
                  View check-in and check-out records
                </p>
              </div>
              <div className="text-2xl text-indigo-600">→</div>
            </div>
          </button>

          {/* Chat Card */}
          <button
            onClick={() => router.push('/mobile/chat')}
            className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">💬</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Messages
                </h2>
                <p className="text-gray-600 text-sm">
                  Chat with {isTeacher ? 'students and parents' : 'teachers'} about your courses
                </p>
              </div>
              <div className="text-2xl text-indigo-600">→</div>
            </div>
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📖 How it Works
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {isTeacher ? (
              <li>• Use the QR Scanner to check students in/out</li>
              <li>• View attendance history for all students</li>
              <li>• Chat with parents about course progress</li>
            ) : (
              <li>• Generate QR codes for your children</li>
              <li>• Show QR code to teacher for check-in/out</li>
              <li>• View attendance history for each child</li>
              <li>• Chat with teachers about courses</li>
            )}
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/courses')}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Courses
          </button>
        </div>
      </div>
    </div>
  );
}
