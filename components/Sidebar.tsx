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
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setAuthState({ isLoggedIn: true, userName: user.firstName || 'User' });
        } catch (e) {
          console.error('Error parsing user data:', e);
          setAuthState({ isLoggedIn: false, userName: '' });
        }
      } else {
        setAuthState({ isLoggedIn: false, userName: '' });
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

  useEffect(() => {
    Promise.resolve().then(() => setIsOpen(false));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ isLoggedIn: false, userName: '' });
    setIsOpen(false);
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

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
      {/* Orange-to-teal top accent bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500" />

      {/* Top Navigation Bar */}
      <nav className="fixed top-[3px] left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:bg-orange-50 hover:text-orange-500 p-2 rounded-xl transition-all duration-200"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
              <Link href="/" className="flex items-center">
                <Image
                  src={`${basePath}/logo.svg`}
                  alt="Next Zen Academy Logo"
                  width={230}
                  height={70}
                  priority
                  style={{ height: '42px', width: 'auto' }}
                />
              </Link>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${
                    isActive(link.href)
                      ? 'text-orange-500'
                      : 'text-slate-700 hover:text-orange-500'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 transition-transform origin-left duration-200 ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              ))}
            </div>

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-3">
              {authState.isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-sm font-semibold text-slate-700 hover:text-orange-500 transition px-3 py-2 rounded-lg hover:bg-orange-50">
                    Dashboard
                  </Link>
                  <span className="text-sm text-slate-500">Hi, {authState.userName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-slate-700 border border-slate-200 px-4 py-2 rounded-full hover:border-orange-300 hover:text-orange-500 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-orange-500 transition px-3 py-2 rounded-lg hover:bg-orange-50">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md shadow-orange-200 transition"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile right */}
            <div className="md:hidden flex items-center gap-2">
              {authState.isLoggedIn ? (
                <span className="text-sm text-slate-600 font-medium">{authState.userName}</span>
              ) : (
                <Link href="/signup" className="text-xs font-semibold text-white px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Sidebar */}
      <aside
        className={`fixed top-[67px] left-0 bottom-0 w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Accent strip */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500" />

        <div className="flex flex-col h-full overflow-y-auto">
          {/* User info */}
          {authState.isLoggedIn && (
            <div className="p-5 bg-gradient-to-r from-orange-50 to-sky-50 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {authState.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{authState.userName}</p>
                  <p className="text-slate-500 text-sm">Student</p>
                </div>
              </div>
            </div>
          )}

          {/* Nav links */}
          <nav className="flex-1 p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="ml-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}
            {authState.isLoggedIn && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive('/dashboard')
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span className="text-xl">📊</span>
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            {authState.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-500 transition font-medium"
              >
                <span className="text-lg">🚪</span>Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition font-medium"
                >
                  <span className="text-lg">🔐</span>Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md shadow-orange-200 transition"
                >
                  <span className="text-lg">✨</span>Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
