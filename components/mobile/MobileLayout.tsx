'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BottomNav from './BottomNav';

export default function MobileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string>('User');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Basic auth check for mobile routes
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('user');

    if (!token && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    } else {
      if (userDataStr) {
        try {
          const user = JSON.parse(userDataStr);
          if (user.firstName) {
            setUserName(user.firstName);
          }
        } catch (e) {
          console.error('Failed to parse user data', e);
        }
      }
      setIsReady(true);
    }
  }, [pathname, router]);

  // Derive title from pathname
  const getPageTitle = () => {
    if (pathname === '/mobile') return 'Dashboard';
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between pt-safe">
        <div className="flex items-center gap-3">
          {pathname !== '/mobile' && (
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
            >
              ←
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
