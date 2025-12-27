'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Attendance {
  _id: string;
  childId: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'checked-in' | 'completed';
  notes?: string;
}

interface Child {
  _id: string;
  name: string;
}

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch children first
        const childrenResponse = await fetch('/api/children', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (childrenResponse.ok) {
          const childrenData = await childrenResponse.json();
          setChildren(childrenData);
        }

        // Fetch attendance
        let url = '/api/attendance';
        if (selectedChild !== 'all') {
          url += `?childId=${selectedChild}`;
        } else {
          url += '?active=true';
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAttendances(data);
        } else {
          setError('Failed to load attendance');
        }
      } catch {
        setError('Error loading attendance');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedChild, router]);
  const getChildName = (childId: string) => {
    const child = children.find(c => c._id === childId);
    return child ? child.name : 'Unknown';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance History</h1>
          <p className="text-gray-600">View check-in and check-out records</p>
        </div>

        {/* Filter */}
        {children.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Child
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Children (Active Only)</option>
              {children.map((child) => (
                <option key={child._id} value={child._id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Attendance List */}
        <div className="space-y-4 mb-6">
          {attendances.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Attendance Records</h3>
              <p className="text-gray-600">No attendance records found for the selected filter.</p>
            </div>
          ) : (
            attendances.map((attendance) => (
              <div 
                key={attendance._id} 
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-indigo-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {getChildName(attendance.childId)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(attendance.checkInTime)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    attendance.status === 'checked-in' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {attendance.status === 'checked-in' ? '✓ Checked In' : '✓ Completed'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Check In</p>
                    <p className="font-medium text-gray-800">
                      {formatTime(attendance.checkInTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Check Out</p>
                    <p className="font-medium text-gray-800">
                      {attendance.checkOutTime 
                        ? formatTime(attendance.checkOutTime)
                        : '—'}
                    </p>
                  </div>
                </div>

                {attendance.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {attendance.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/mobile/qr-code')}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
