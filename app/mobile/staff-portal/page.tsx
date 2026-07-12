'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StaffPortalPage() {
  const router = useRouter();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClockInOut = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const action = clockedIn ? 'clock_out' : 'clock_in';
      
      const response = await fetch('/api/childcare/staff', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action,
          staffId: 'current_user', // Will be resolved from token
          centerId: 'current_center',
          clockInMethod: 'manual'
        })
      });

      if (response.ok) {
        if (!clockedIn) {
          setClockedIn(true);
          setClockInTime(new Date());
        } else {
          setClockedIn(false);
          setClockInTime(null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getElapsedTime = () => {
    if (!clockInTime) return '00:00:00';
    const now = new Date();
    const diff = now.getTime() - clockInTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const quickActions = [
    { icon: '📋', label: 'Take Attendance', path: '/mobile/scanner' },
    { icon: '📝', label: 'Daily Report', path: '/mobile/daily-reports' },
    { icon: '📸', label: 'Upload Photo', path: '#' },
    { icon: '🚨', label: 'Incident Report', path: '#' },
    { icon: '💊', label: 'Log Medication', path: '#' },
    { icon: '🍽️', label: 'Log Meal', path: '#' },
    { icon: '😴', label: 'Log Nap', path: '#' },
    { icon: '📊', label: 'Behavior Log', path: '#' },
    { icon: '⭐', label: 'Award Reward', path: '#' },
    { icon: '💬', label: 'Message Parent', path: '/mobile/chat' },
    { icon: '🏫', label: 'Classroom View', path: '/mobile/classroom' },
    { icon: '📅', label: 'My Schedule', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Staff Portal</h1>
        </div>

        {/* Clock In/Out Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              clockedIn ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <span className="text-3xl">{clockedIn ? '✅' : '⏰'}</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              {clockedIn ? 'Currently Working' : 'Not Clocked In'}
            </p>
            {clockedIn && (
              <p className="text-2xl font-mono font-bold text-gray-800 mb-4">{getElapsedTime()}</p>
            )}
            <button
              onClick={handleClockInOut}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition-all ${
                clockedIn 
                  ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' 
                  : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              } ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Processing...' : clockedIn ? '🔴 Clock Out' : '🟢 Clock In'}
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => action.path !== '#' && router.push(action.path)}
              className="bg-white rounded-xl shadow-md p-3 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl block mb-1">{action.icon}</span>
              <span className="text-xs text-gray-600 font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-3">📊 Today&apos;s Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-xs text-blue-500">Children Present</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-xs text-green-500">Reports Filed</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-xs text-purple-500">Messages</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-orange-500">Incidents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
