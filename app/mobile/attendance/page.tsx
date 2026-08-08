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
      } catch (e) {
        console.error('Failed to load attendance:', e);
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
        {/* Header - Handled by MobileLayout */}
        <div className="mb-4 px-2">
          <p className="text-gray-500 text-sm">Track check-in and check-out records.</p>
        </div>

        {/* Filter */}
        {children.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 p-5 mb-6">
            <label className="block text-[11px] font-bold text-indigo-900/60 uppercase tracking-wider mb-2 px-1">
              Filter by Child
            </label>
            <div className="relative">
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-100 text-gray-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-shadow shadow-sm font-medium"
              >
                <option value="all">All Children (Active Only)</option>
                {children.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>
        )}

        {/* Attendance List */}
        <div className="space-y-4 mb-6 relative">
          {/* Timeline Line */}
          {attendances.length > 0 && (
            <div className="absolute left-6 top-4 bottom-4 w-px bg-indigo-100 z-0 hidden md:block"></div>
          )}

          {attendances.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 p-10 text-center">
              <div className="text-5xl mb-3 opacity-50 grayscale">📋</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Records</h3>
              <p className="text-sm text-gray-500">No attendance history found.</p>
            </div>
          ) : (
            attendances.map((attendance) => (
              <div 
                key={attendance._id} 
                className="relative z-10 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-50 p-5 overflow-hidden group hover:shadow-[0_8px_24px_rgba(79,70,229,0.08)] transition-all"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  attendance.status === 'checked-in' ? 'bg-emerald-500' : 'bg-gray-300'
                }`}></div>

                <div className="flex justify-between items-start mb-4 pl-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800 mb-0.5 tracking-tight">
                      {getChildName(attendance.childId)}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                      {formatDate(attendance.checkInTime)}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    attendance.status === 'checked-in' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : 'bg-gray-50 text-gray-500 border border-gray-100'
                  }`}>
                    {attendance.status === 'checked-in' ? 'Active' : 'Completed'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pl-2 bg-gray-50/50 rounded-xl p-3 border border-gray-50">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Check In</p>
                    <p className="font-bold text-gray-700 text-sm">
                      {formatTime(attendance.checkInTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Check Out</p>
                    <p className="font-bold text-gray-700 text-sm">
                      {attendance.checkOutTime 
                        ? formatTime(attendance.checkOutTime)
                        : <span className="text-gray-300">—</span>}
                    </p>
                  </div>
                </div>

                {attendance.notes && (
                  <div className="mt-3 pl-2 pt-3 border-t border-gray-100/60">
                    <p className="text-xs text-gray-500 leading-relaxed bg-yellow-50/50 p-2 rounded-lg border border-yellow-100/50">
                      <span className="font-semibold text-yellow-800">Note:</span> {attendance.notes}
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


      </div>
    </div>
  );
}
