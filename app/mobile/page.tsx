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
        headers: { 'Authorization': `Bearer ${token}` },
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
    <div className="min-h-screen bg-[url('/hero_bg.png')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-slate-50/80 backdrop-blur-xl p-4">
        <div className="max-w-md mx-auto pt-2 pb-6">
          {/* Header Card */}
          {user && (
            <div className="mb-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 text-white">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <p className="text-indigo-100 text-sm font-medium tracking-wide opacity-90">Welcome back,</p>
                <h2 className="text-2xl font-bold mt-1 tracking-tight drop-shadow-sm">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="mt-3 inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {user.role || 'Parent'}
                  </span>
                </div>
              </div>
            </div>
          )}

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
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => router.push(feature.path)}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{feature.icon}</div>
              <h3 className="text-[13px] font-bold text-gray-800 mb-1 leading-tight">{feature.label}</h3>
              <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{feature.desc}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
    </div>
  );
}
