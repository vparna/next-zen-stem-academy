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
    fetchUserProfile(token);
  }, [router]);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('/api/profile', {
        headers: { 'Authorization': `****** },
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
  const isAdmin = user?.role === 'admin';
  const isParent = !isTeacher && !isAdmin;

  const parentFeatures = [
    { icon: '🎫', label: 'QR Check-In', desc: 'Display QR code for check-in/out', path: '/mobile/qr-code' },
    { icon: '📋', label: 'Attendance', desc: 'View check-in and check-out records', path: '/mobile/attendance' },
    { icon: '📊', label: 'Daily Reports', desc: 'View meals, naps, activities & photos', path: '/mobile/daily-reports' },
    { icon: '💬', label: 'Messages', desc: 'Chat with teachers', path: '/mobile/chat' },
    { icon: '💰', label: 'Billing & Payments', desc: 'Pay tuition, view invoices', path: '/mobile/billing' },
    { icon: '📅', label: 'Events & Calendar', desc: 'View upcoming events & RSVP', path: '/mobile/events' },
    { icon: '📢', label: 'Announcements', desc: 'Center-wide announcements', path: '/mobile/announcements' },
    { icon: '🏥', label: 'Health & Safety', desc: 'Health records & medications', path: '/mobile/health' },
    { icon: '🍽️', label: 'Food & Nutrition', desc: 'Menus, allergies & meal logs', path: '/mobile/food' },
    { icon: '🎓', label: 'Milestones', desc: 'Learning progress & achievements', path: '/mobile/milestones' },
    { icon: '🚌', label: 'Transportation', desc: 'Bus tracking & notifications', path: '/mobile/transportation' },
    { icon: '📝', label: 'Submit Absence', desc: 'Notify center of absence', path: '/mobile/absence' },
    { icon: '📄', label: 'Enrollment', desc: 'Apply for programs', path: '/mobile/enrollment' },
    { icon: '🏫', label: 'Classrooms', desc: 'View classroom info & ratios', path: '/mobile/classroom' },
  ];

  const teacherFeatures = [
    { icon: '📷', label: 'QR Scanner', desc: 'Scan student QR codes for check-in/out', path: '/mobile/scanner' },
    { icon: '📋', label: 'Attendance', desc: 'Take & view attendance', path: '/mobile/attendance' },
    { icon: '⏰', label: 'Staff Portal', desc: 'Clock in/out & quick actions', path: '/mobile/staff-portal' },
    { icon: '📊', label: 'Daily Reports', desc: 'Log meals, naps, activities', path: '/mobile/daily-reports' },
    { icon: '💬', label: 'Messages', desc: 'Chat with parents', path: '/mobile/chat' },
    { icon: '🏫', label: 'Classrooms', desc: 'Manage roster & ratios', path: '/mobile/classroom' },
    { icon: '🏥', label: 'Health & Safety', desc: 'Health checks & medication logs', path: '/mobile/health' },
    { icon: '🍽️', label: 'Food & Nutrition', desc: 'Log meals & CACFP', path: '/mobile/food' },
    { icon: '🎓', label: 'Milestones', desc: 'Track learning progress', path: '/mobile/milestones' },
    { icon: '📢', label: 'Announcements', desc: 'Send announcements', path: '/mobile/announcements' },
    { icon: '📅', label: 'Events', desc: 'View & manage events', path: '/mobile/events' },
    { icon: '✅', label: 'Compliance', desc: 'DCYF checklists & logs', path: '/mobile/compliance' },
    { icon: '🚨', label: 'Incident Reports', desc: 'File incident reports', path: '/mobile/health' },
    { icon: '🚌', label: 'Transportation', desc: 'Bus routes & tracking', path: '/mobile/transportation' },
  ];

  const adminFeatures = [
    { icon: '📊', label: 'Dashboard', desc: 'Center overview & analytics', path: '/admin/dashboard' },
    { icon: '📷', label: 'QR Scanner', desc: 'Scan student QR codes', path: '/mobile/scanner' },
    { icon: '📋', label: 'Attendance', desc: 'All attendance records', path: '/mobile/attendance' },
    { icon: '⏰', label: 'Staff Portal', desc: 'Staff management & timecards', path: '/mobile/staff-portal' },
    { icon: '💰', label: 'Billing', desc: 'Invoicing & payments', path: '/mobile/billing' },
    { icon: '👶', label: 'Enrollment', desc: 'Applications & waitlist', path: '/mobile/enrollment' },
    { icon: '🏫', label: 'Classrooms', desc: 'Room management & ratios', path: '/mobile/classroom' },
    { icon: '✅', label: 'Compliance', desc: 'DCYF compliance & licensing', path: '/mobile/compliance' },
    { icon: '🏥', label: 'Health & Safety', desc: 'Health records & incidents', path: '/mobile/health' },
    { icon: '🍽️', label: 'Food & Nutrition', desc: 'Menu planning & CACFP', path: '/mobile/food' },
    { icon: '🚌', label: 'Transportation', desc: 'Routes & GPS tracking', path: '/mobile/transportation' },
    { icon: '📅', label: 'Events', desc: 'Calendar & events', path: '/mobile/events' },
    { icon: '📢', label: 'Announcements', desc: 'Send announcements', path: '/mobile/announcements' },
    { icon: '💬', label: 'Messages', desc: 'Communication center', path: '/mobile/chat' },
  ];

  const features = isAdmin ? adminFeatures : isTeacher ? teacherFeatures : parentFeatures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-6 pb-20">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">NextZen Academy</h1>
          <p className="text-gray-500 text-sm">Childcare Management Platform</p>
          {user && (
            <div className="mt-4 bg-white rounded-xl p-4 shadow-md">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <span className={`inline-block mt-1 text-xs font-semibold uppercase px-3 py-1 rounded-full ${
                isAdmin ? 'bg-red-100 text-red-700' :
                isTeacher ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {user.role || 'parent'}
              </span>
            </div>
          )}
        </div>

        {/* Quick Action for Teachers */}
        {isTeacher && (
          <div className="mb-6">
            <button
              onClick={() => router.push('/mobile/staff-portal')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-5 text-left text-white hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">⏰</div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-0.5">Staff Portal</h2>
                  <p className="text-indigo-100 text-sm">Clock in, take attendance & more</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </button>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => router.push(feature.path)}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{feature.label}</h3>
              <p className="text-xs text-gray-500 leading-tight">{feature.desc}</p>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-white text-gray-700 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow font-medium text-sm"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => router.push('/courses')}
            className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm"
          >
            📚 Courses
          </button>
        </div>
      </div>
    </div>
  );
}
