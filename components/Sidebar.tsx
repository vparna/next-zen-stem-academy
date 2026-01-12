'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState<{isLoggedIn: boolean; userName: string}>({
    isLoggedIn: false,
    userName: ''
  });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setAuthState({
            isLoggedIn: true,
            userName: user.firstName || 'User'
          });
        } catch (e) {
          console.error('Error parsing user data:', e);
          setAuthState({
            isLoggedIn: false,
            userName: ''
          });
        }
      } else {
        setAuthState({
          isLoggedIn: false,
          userName: ''
        });
      }
    };
    
    checkAuth();
    
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    // Use a microtask to avoid setting state during render
    Promise.resolve().then(() => {
      setIsOpen(false);
    });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isLoggedIn: false,
      userName: ''
    });
    setIsOpen(false);
    
    window.dispatchEvent(new Event('authChange'));
    
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '📖' },
    { href: '/courses', label: 'Courses', icon: '📚' },
    { href: '/careers', label: 'Careers', icon: '💼' },
    { href: '/hours', label: 'Hours', icon: '🕐' },
    { href: '/support', label: 'Support', icon: '💬' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <Link href="/" className="flex items-center">
                <Image 
                  src={`${basePath}/logo.svg`}
                  alt="Next Zen Academy Logo" 
                  width={180} 
                  height={50}
                  priority
                  style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {authState.isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <span className="text-white/90">Hi, {authState.userName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Right Side */}
            <div className="md:hidden flex items-center gap-2">
              {authState.isLoggedIn ? (
                <span className="text-white text-sm">{authState.userName}</span>
              ) : (
                <Link
                  href="/signup"
                  className="bg-white text-purple-600 px-4 py-1.5 rounded-lg text-sm font-semibold"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* User Section */}
          {authState.isLoggedIn && (
            <div className="p-6 bg-white/10 backdrop-blur-sm border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-white font-semibold">{authState.userName}</p>
                  <p className="text-white/70 text-sm">Student</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive(link.href)
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="font-medium">{link.label}</span>
                {isActive(link.href) && (
                  <span className="ml-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}

            {authState.isLoggedIn && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive('/dashboard')
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  📊
                </span>
                <span className="font-medium">Dashboard</span>
                {isActive('/dashboard') && (
                  <span className="ml-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/20 bg-white/5">
            {authState.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium"
              >
                <span className="text-xl">🚪</span>
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium"
                >
                  <span className="text-xl">🔐</span>
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-purple-600 rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
                >
                  <span className="text-xl">✨</span>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
