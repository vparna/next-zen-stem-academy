'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authState, setAuthState] = useState<{isLoggedIn: boolean; userName: string}>({
    isLoggedIn: false,
    userName: ''
  });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const router = useRouter();

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
    
    // Check authentication status on mount
    checkAuth();
    
    // Listen for custom auth change events and storage changes from other tabs
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isLoggedIn: false,
      userName: ''
    });
    setIsMenuOpen(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src={`${basePath}/logo.svg`}
                alt="NextGen Stem Academy Logo" 
                width={200} 
                height={60}
                priority
                style={{ height: '48px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition">
              Courses
            </Link>
            <Link href="/careers" className="text-gray-700 hover:text-blue-600 transition">
              Careers
            </Link>
            <Link href="/hours" className="text-gray-700 hover:text-blue-600 transition">
              Hours
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-blue-600 transition">
              Support
            </Link>
            {authState.isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Hi, {authState.userName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
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
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/careers"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/hours"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Hours
              </Link>
              <Link
                href="/support"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              {authState.isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-gray-700">
                    Hi, {authState.userName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
