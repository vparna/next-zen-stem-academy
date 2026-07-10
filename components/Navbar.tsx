'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('Woodinville');
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [authState, setAuthState] = useState<{ isLoggedIn: boolean; userName: string }>({
    isLoggedIn: false,
    userName: ''
  });
  
  const campusDropdownRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const router = useRouter();
  const pathname = usePathname();

  const campuses = ['Woodinville', 'Redmond', 'Bellevue', 'Seattle'];

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
      <div className="fixed top-0 left-0 right-0 z-50 h-[5px] bg-gradient-to-r from-[#F25022] via-[#FFB900] via-[#7FBA00] to-[#00A4EF] shadow-sm" />

      {/* Main Header Container (Pro Glassmorphism Style) */}
      <header className="fixed top-[5px] left-0 right-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/40 shadow-[0_8px_32px_rgba(15,23,42,0.03)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch justify-between">
          
          {/* Logo & Branding - Visible on Desktop */}
          <div className="hidden lg:flex items-center py-2 h-22">
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 lg:h-14 w-40 lg:w-48 transition-all duration-300 group-hover:scale-[1.02]">
                <Image 
                  src={`${basePath}/brand-logo5.png`}
                  alt="NextZen Academy Logo" 
                  fill
                  priority
                  className="object-contain object-left"
                />
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
                    className="flex items-center gap-2 bg-gradient-to-r from-[#F25022]/8 to-[#FFB900]/8 text-slate-800 px-4 py-1.5 rounded-full border border-[#F25022]/20 text-[11px] font-black hover:from-[#F25022]/15 hover:to-[#FFB900]/15 hover:border-[#F25022]/40 transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F25022] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F25022]"></span>
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
                            if (campus === 'Woodinville') {
                              setSelectedCampus(campus);
                              setIsCampusDropdownOpen(false);
                              router.push('/');
                            } else {
                              setIsCampusDropdownOpen(false);
                              router.push('/campuses/future-expansion');
                            }
                          }}
                          className={`w-full text-left px-4 py-2 flex flex-col justify-center transition-all duration-150 ${
                            selectedCampus === campus
                              ? 'bg-[#F25022]/5 text-[#F25022] font-black'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 text-xs font-semibold">
                            <span>📍</span> {campus} Campus
                          </span>
                          {campus !== 'Woodinville' && (
                            <span className="text-[9px] text-slate-400 font-medium pl-5">(Future Expansion)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Utility Pages & Authentication */}
              <div className="flex items-center space-x-6 text-[11px] font-extrabold uppercase tracking-wide">
                <Link href="/" className="text-slate-500 hover:text-[#00A4EF] transition-colors">Home</Link>
                <Link href="/#parent-resources" className="text-slate-500 hover:text-[#00A4EF] transition-colors">Parent Resources</Link>
                <Link href="/careers" className="text-slate-500 hover:text-[#00A4EF] transition-colors">Careers</Link>
                <Link href="/support" className="text-slate-500 hover:text-[#00A4EF] transition-colors">Contact Us</Link>

                <span className="text-slate-200">|</span>

                {/* Authentication Conditional Section */}
                {authState.isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-[#F25022]/5 to-[#00A4EF]/5 px-3 py-1 rounded-full border border-slate-200/40 shadow-sm">
                      <div className="w-4 h-4 bg-gradient-to-br from-[#F25022] to-[#FFB900] rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm">
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
                      className="text-slate-500 hover:text-[#F25022] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-slate-800 hover:text-[#00A4EF] transition-colors font-black"
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
                  className="hover:text-[#F25022] transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-[#F25022]/5 active:scale-95"
                >
                  The NextZen Way
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/courses"
                  className={`hover:text-[#F25022] transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-[#F25022]/5 active:scale-95 ${
                    isActive('/courses') ? 'text-[#F25022] bg-[#F25022]/5 font-black border border-[#F25022]/20' : ''
                  }`}
                >
                  Programs
                  <span className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] transform transition-transform origin-center duration-300 ${
                    isActive('/courses') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
                <Link
                  href="/stem-labs"
                  className="hover:text-[#F25022] transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-[#F25022]/5 active:scale-95"
                >
                  STEAM Labs
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/summer-camps"
                  className="hover:text-[#F25022] transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-[#F25022]/5 active:scale-95"
                >
                  Summer Camps
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
                <Link
                  href="/about"
                  className={`hover:text-[#F25022] transition-all relative group px-3.5 py-2.5 rounded-xl hover:bg-[#F25022]/5 active:scale-95 ${
                    isActive('/about') ? 'text-[#F25022] bg-[#F25022]/5 font-black border border-[#F25022]/20' : ''
                  }`}
                >
                  Our Story
                  <span className={`absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] transform transition-transform origin-center duration-300 ${
                    isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              </nav>

              <Link
                href="/#inquiry-form-section"
                className="bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white font-black px-6 py-2.5 rounded-full text-[11px] tracking-widest uppercase transition-all duration-300 shadow-md shadow-[#F25022]/10 hover:shadow-lg hover:shadow-[#F25022]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
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
              className="text-slate-800 hover:text-[#F25022] bg-slate-50 hover:bg-[#F25022]/5 p-2.5 rounded-xl border border-slate-200/40 transition-all duration-200 shadow-sm cursor-pointer"
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
              <div className="relative h-12 w-44">
                <Image 
                  src={`${basePath}/brand-logo4.png`}
                  alt="NextZen Academy Logo" 
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </Link>

            {/* Right Mini Action */}
            <div className="flex items-center">
              {authState.isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="w-8 h-8 bg-gradient-to-br from-[#F25022] to-[#FFB900] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border border-white active:scale-90 transition-transform"
                >
                  {authState.userName.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="text-[10px] font-black text-white px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] shadow-md shadow-[#F25022]/20 active:scale-95 transition-all uppercase tracking-wider"
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
        <div className="h-[4px] w-full bg-gradient-to-r from-[#F25022] via-[#FFB900] via-[#7FBA00] to-[#00A4EF]" />

        <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <div className="relative h-12 w-44">
                <Image 
                  src={`${basePath}/brand-logo4.png`}
                  alt="NextZen Academy Logo" 
                  fill
                  className="object-contain object-left"
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
                  onClick={() => {
                    if (campus === 'Woodinville') {
                      setSelectedCampus(campus);
                      setIsMenuOpen(false);
                      router.push('/');
                    } else {
                      setIsMenuOpen(false);
                      router.push('/campuses/future-expansion');
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    selectedCampus === campus
                      ? 'bg-[#F25022]/5 border-[#F25022]/25 text-[#F25022] shadow-sm'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{campus}</span>
                  </span>
                  {campus !== 'Woodinville' && (
                    <span className="text-[8px] text-slate-400 font-medium">(Expansion)</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User Profile Card (if logged in) */}
          {authState.isLoggedIn && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#F25022]/5 to-[#00A4EF]/5 border border-[#F25022]/10 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F25022] to-[#FFB900] rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                {authState.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm leading-none mb-1">Hi, {authState.userName}</p>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#F25022] hover:text-[#F25022]/80 text-xs font-black transition-all"
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
                    ? 'bg-gradient-to-r from-[#F25022] to-[#FFB900] text-white shadow-md shadow-[#F25022]/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#F25022]'
                }`}
              >
                <span className="text-base">🏠</span> <span className="text-xs uppercase tracking-wider">Home</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive('/about')
                    ? 'bg-gradient-to-r from-[#F25022] to-[#FFB900] text-white shadow-md shadow-[#F25022]/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#F25022]'
                }`}
              >
                <span className="text-base">👋</span> <span className="text-xs uppercase tracking-wider">Our Story</span>
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive('/courses')
                    ? 'bg-gradient-to-r from-[#F25022] to-[#FFB900] text-white shadow-md shadow-[#F25022]/20'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#F25022]'
                }`}
              >
                <span className="text-base">📚</span> <span className="text-xs uppercase tracking-wider">Programs</span>
              </Link>
              <Link
                href="/#nextzen-way"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-[#F25022] transition-all duration-200"
              >
                <span className="text-base">🌱</span> <span className="text-xs uppercase tracking-wider">The NextZen Way</span>
              </Link>
              <Link
                href="/stem-labs"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-[#F25022] transition-all duration-200"
              >
                <span className="text-base">🤖</span> <span className="text-xs uppercase tracking-wider">STEAM Labs</span>
              </Link>
              <Link
                href="/summer-camps"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-[#F25022] transition-all duration-200"
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
                href="/#inquiry-form-section"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#F25022] transition-all duration-200"
              >
                <span>🎓</span> <span className="text-xs uppercase tracking-wider">Admissions</span>
              </Link>
              <Link
                href="/#parent-resources"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#F25022] transition-all duration-200"
              >
                <span>📰</span> <span className="text-xs uppercase tracking-wider">Parent Resources</span>
              </Link>
              <Link
                href="/careers"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive('/careers') ? 'text-[#F25022] font-bold bg-[#F25022]/5' : 'text-slate-600 hover:bg-slate-50 hover:text-[#F25022]'
                }`}
              >
                <span>💼</span> <span className="text-xs uppercase tracking-wider">Careers</span>
              </Link>
              <Link
                href="/support"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive('/support') ? 'text-[#F25022] font-bold bg-[#F25022]/5' : 'text-slate-600 hover:bg-slate-50 hover:text-[#F25022]'
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-900 font-bold bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 shadow-md shadow-[#F25022]/20 transition-all text-sm text-center uppercase text-white"
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
