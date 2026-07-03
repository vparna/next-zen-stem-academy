'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('Bothell');
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [authState, setAuthState] = useState<{ isLoggedIn: boolean; userName: string }>({
    isLoggedIn: false,
    userName: ''
  });
  
  const campusDropdownRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const router = useRouter();
  const pathname = usePathname();

  const campuses = ['Bothell', 'Redmond', 'Bellevue', 'Seattle'];

  useEffect(() => {
    // Check authentication status
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
    
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (campusDropdownRef.current && !campusDropdownRef.current.contains(event.target as Node)) {
        setIsCampusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isLoggedIn: false,
      userName: ''
    });
    setIsMenuOpen(false);
    
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  const isActive = (path: string) => {
    if (path.startsWith('#')) return false;
    return pathname === path;
  };

  return (
    <>
      {/* Top Accent Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[5px] bg-gradient-to-r from-orange-500 via-amber-400 via-[#ffbe2e] to-sky-500 shadow-sm" />

      {/* Main Header Container (Pro Glassmorphism Style) */}
      <header className="fixed top-[5px] left-0 right-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/40 shadow-[0_8px_32px_rgba(15,23,42,0.03)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch justify-between">
          
          {/* Logo & Branding - Visible on Desktop */}
          <div className="hidden lg:flex items-center py-2 h-22">
            <Link href="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-xl border border-slate-200/40 shadow-md group-hover:shadow-lg group-hover:scale-[1.03] transition-all duration-300 h-10 lg:h-12 aspect-[16/9] bg-white ring-1 ring-slate-100/50">
                <Image 
                  src={`${basePath}/brand-logo.jpeg`}
                  alt="NextZen Academy Logo" 
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>

          {/* Two-Tier Layout (Desktop Right Navigation) */}
          <div className="hidden lg:flex-1 lg:flex lg:flex-col lg:pl-12">
            {/* TIER 1: Utilities & Auth (Top Row) */}
            <div className="h-10 flex justify-between items-center border-b border-slate-100 text-xs font-bold text-slate-500">
              
              {/* Location Pill & Selector */}
              <div className="flex items-center gap-4">
                <div className="relative" ref={campusDropdownRef}>
                  <button
                    onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500/8 to-amber-500/8 text-slate-800 px-4 py-1.5 rounded-full border border-orange-200/40 text-[11px] font-black hover:from-orange-500/15 hover:to-amber-500/15 hover:border-orange-300/60 transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span>Campus: {selectedCampus}</span>
                    <svg 
                      className={`w-3 h-3 text-slate-500 transition-transform duration-250 ${isCampusDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu (Glassmorphism card) */}
                  {isCampusDropdownOpen && (
                    <div className="absolute left-0 mt-2.5 w-48 bg-white/95 backdrop-blur-md border border-slate-150 rounded-2xl shadow-xl shadow-slate-100/50 py-2.5 z-50 animate-fade-in-up">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4 py-1.5">Select Campus</p>
                      {campuses.map((campus) => (
                        <button
                          key={campus}
                          onClick={() => {
                            setSelectedCampus(campus);
                            setIsCampusDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-all duration-150 flex items-center justify-between ${
                            selectedCampus === campus
                              ? 'bg-orange-50 text-orange-600 font-black'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span>📍</span> {campus} Campus
                          </span>
                          {selectedCampus === campus && (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Utility Pages & Authentication */}
              <div className="flex items-center space-x-6 text-[11px] font-extrabold uppercase tracking-wide">
                <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors">Home</Link>
                <Link href="/#parent-resources" className="text-slate-500 hover:text-sky-600 transition-colors">Parent Resources</Link>
                <Link href="/careers" className="text-slate-500 hover:text-sky-600 transition-colors">Careers</Link>
                <Link href="/support" className="text-slate-500 hover:text-sky-600 transition-colors">Contact Us</Link>

                <span className="text-slate-200">|</span>

                {/* Authentication Conditional Section */}
                {authState.isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50/50 to-sky-50/50 px-3 py-1 rounded-full border border-slate-200/40 shadow-sm">
                      <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm">
                        {authState.userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-700 text-[10px] font-black lowercase first-letter:uppercase">Hi, {authState.userName}</span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-slate-500 hover:text-slate-800 transition-all font-black px-2.5 py-1 hover:bg-slate-50 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-full border border-red-200 hover:border-red-500 transition-all duration-250 cursor-pointer font-black text-[10px] tracking-wider uppercase shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-5">
                    <Link
                      href="/login"
                      className="text-slate-500 hover:text-orange-500 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-slate-800 hover:text-sky-600 transition-colors font-black"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* TIER 2: Primary Navigation Core Links (Bottom Row) */}
            <div className="h-12 flex justify-between items-center">
              <nav className="flex items-center space-x-2 text-[11px] lg:text-[12px] font-black tracking-widest text-slate-700 uppercase">
                <Link
                  href="/#nextzen-way"
                  className="hover:text-orange-500 transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-orange-50/40 active:scale-95"
                >
                  The NextZen Way
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/courses"
                  className={`hover:text-orange-500 transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-orange-50/40 active:scale-95 ${
                    isActive('/courses') ? 'text-orange-500 bg-orange-50/60 font-black border border-orange-100/30' : ''
                  }`}
                >
                  Programs
                  <span className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transform transition-transform origin-center duration-300 ${
                    isActive('/courses') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
                <Link
                  href="/stem-labs"
                  className="hover:text-orange-500 transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-orange-50/40 active:scale-95"
                >
                  STEM Labs
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/summer-camps"
                  className="hover:text-orange-500 transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-orange-50/40 active:scale-95"
                >
                  Summer Camps
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/about"
                  className={`hover:text-orange-500 transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-orange-50/40 active:scale-95 ${
                    isActive('/about') ? 'text-orange-500 bg-orange-50/60 font-black border border-orange-100/30' : ''
                  }`}
                >
                  About Us
                  <span className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transform transition-transform origin-center duration-300 ${
                    isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              </nav>

              <Link
                href="/#admissions"
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-[#ffbe2e] hover:from-orange-600 hover:via-amber-600 hover:to-[#f0b024] text-white font-black px-6 py-2.5 rounded-full text-[11px] tracking-widest uppercase transition-all duration-300 shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
              >
                Admissions
              </Link>
            </div>
          </div>

          {/* Mobile Header Bar Layout */}
          <div className="flex lg:hidden flex-1 items-center justify-between h-16 w-full">
            {/* Left Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-800 hover:text-orange-500 bg-slate-50 hover:bg-orange-50/50 p-2.5 rounded-xl border border-slate-200/40 transition-all duration-200 shadow-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`absolute block h-[2.5px] w-5 bg-slate-800 rounded-full transition-all duration-350 ${isMenuOpen ? 'rotate-45 top-1.5' : 'top-0'}`} />
                <span className={`absolute block h-[2.5px] w-5 bg-slate-800 rounded-full transition-all duration-350 top-1.5 ${isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
                <span className={`absolute block h-[2.5px] w-5 bg-slate-800 rounded-full transition-all duration-350 ${isMenuOpen ? '-rotate-45 top-1.5' : 'top-3'}`} />
              </div>
            </button>

            {/* Center Logo */}
            <Link href="/" className="flex items-center justify-center">
              <div className="relative overflow-hidden rounded-lg border border-slate-200/40 shadow-sm h-8 aspect-[16/9] bg-white ring-1 ring-slate-100/50">
                <Image 
                  src={`${basePath}/brand-logo.jpeg`}
                  alt="NextZen Academy Logo" 
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </Link>

            {/* Right Mini Action */}
            <div className="flex items-center">
              {authState.isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border border-white active:scale-90 transition-transform"
                >
                  {authState.userName.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="text-[10px] font-black text-white px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/20 active:scale-95 transition-all uppercase tracking-wider"
                >
                  Join
                </Link>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-out Mobile Navigation Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-350 ease-in-out flex flex-col lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Accent Strip inside Drawer */}
        <div className="h-[4px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500" />

        <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <div className="relative overflow-hidden rounded-lg border border-slate-200/50 shadow-sm h-8 aspect-[16/9] bg-white">
                <Image 
                  src={`${basePath}/brand-logo.jpeg`}
                  alt="NextZen Academy Logo" 
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Campus Selector in Mobile Menu */}
          <div className="mt-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Campus Location</p>
            <div className="grid grid-cols-2 gap-2">
              {campuses.map((campus) => (
                <button
                  key={campus}
                  onClick={() => setSelectedCampus(campus)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedCampus === campus
                      ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-500/5'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>📍</span>
                  <span>{campus}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Profile Card (if logged in) */}
          {authState.isLoggedIn && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50/30 to-sky-50/30 border border-orange-200/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                {authState.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm leading-none mb-1">Hi, {authState.userName}</p>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-orange-500 hover:text-orange-600 text-xs font-black transition-all"
                >
                  View Dashboard →
                </Link>
              </div>
            </div>
          )}

          {/* Group 1: Primary Links */}
          <div className="mt-6">
            <h3 className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-2">Main Navigation</h3>
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span className="text-base">🏠</span> <span className="text-xs uppercase tracking-wider">Home</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive('/about')
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span className="text-base">👋</span> <span className="text-xs uppercase tracking-wider">About Us</span>
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive('/courses')
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span className="text-base">📚</span> <span className="text-xs uppercase tracking-wider">Programs</span>
              </Link>
              <Link
                href="/#nextzen-way"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-500 transition-all duration-200"
              >
                <span className="text-base">🌱</span> <span className="text-xs uppercase tracking-wider">The NextZen Way</span>
              </Link>
              <Link
                href="/stem-labs"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-500 transition-all duration-200"
              >
                <span className="text-base">🤖</span> <span className="text-xs uppercase tracking-wider">STEM Labs</span>
              </Link>
              <Link
                href="/summer-camps"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-orange-500 transition-all duration-200"
              >
                <span className="text-base">🎨</span> <span className="text-xs uppercase tracking-wider">Summer Camps</span>
              </Link>
            </nav>
          </div>

          {/* Group 2: Utility Pages */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h3 className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-2">Resources &amp; Support</h3>
            <nav className="space-y-1">
              <Link
                href="/#admissions"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-orange-500 transition-all duration-200"
              >
                <span>🎓</span> <span className="text-xs uppercase tracking-wider">Admissions</span>
              </Link>
              <Link
                href="/#parent-resources"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-orange-500 transition-all duration-200"
              >
                <span>📰</span> <span className="text-xs uppercase tracking-wider">Parent Resources</span>
              </Link>
              <Link
                href="/careers"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive('/careers') ? 'text-orange-500 font-bold bg-orange-50/20' : 'text-slate-600 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span>💼</span> <span className="text-xs uppercase tracking-wider">Careers</span>
              </Link>
              <Link
                href="/support"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive('/support') ? 'text-orange-500 font-bold bg-orange-50/20' : 'text-slate-600 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <span>📞</span> <span className="text-xs uppercase tracking-wider">Contact Us</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="mt-auto pt-6 border-t border-slate-100 bg-white/50">
            {authState.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-150 text-red-500 hover:bg-red-50 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                🚪 Log Out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-bold text-sm text-center"
                >
                  🔐 Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-900 font-bold bg-[#ffbe2e] hover:bg-[#f0b024] shadow-md shadow-yellow-100 transition-all text-sm text-center uppercase"
                >
                  ✨ Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
