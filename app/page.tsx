'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const highlights = [
    { title: 'Live Expert Mentors', description: 'Small-group sessions with dedicated instructors.', icon: '👩‍🏫' },
    { title: 'Project-Based Learning', description: 'Build, test, and present real outcomes every week.', icon: '🛠️' },
    { title: 'Progress You Can Track', description: 'Parents get clear milestones and visible growth.', icon: '📈' },
  ];

  const courses = [
    {
      title: 'Robotics',
      description: 'Build and program robots while strengthening analytical and creative thinking.',
      href: '/courses?category=Robotics',
      image: '/kids-robotics.svg',
      accent: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Mathematics',
      description: 'Make math practical and fun through logic games, puzzles, and smart challenges.',
      href: '/courses?category=Maths',
      image: '/kids-math.svg',
      accent: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Chess',
      description: 'Train focus, planning, and decision-making with guided strategic play.',
      href: '/courses?category=Chess',
      image: '/kids-chess.svg',
      accent: 'from-emerald-500 to-teal-400',
    },
  ];

  const quickHighlights = ['Hands-on Labs', 'Weekly Challenges', 'Parent Reports', 'Flexible Schedules'];

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!(token && userData));
    };
    
    // Check authentication status on mount
    checkAuth();
    
    // Listen for custom auth change events
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="absolute inset-0 opacity-35">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-5 backdrop-blur-sm">
                Future-ready STEM learning for children
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                Learn. Build. Shine at Next Zen Academy.
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                A lively learning journey with Robotics, Math, and Chess programs designed to build confidence and measurable outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/courses" className="ui-pill-btn bg-white text-blue-700 hover:bg-blue-50">
                  Explore Programs
                </Link>
                {!isLoggedIn && (
                  <Link href="/signup" className="ui-pill-btn bg-blue-900/40 text-white border border-white/50 hover:bg-blue-900/65">
                    Book a Free Trial
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="glass-card p-4 md:p-6">
                <Image
                  src="/kids-stem-hero.svg"
                  alt="Kids learning robotics, chess, and math"
                  className="w-full h-auto"
                  width={900}
                  height={520}
                  priority
                />
              </div>
              <div className="hidden sm:flex absolute -bottom-5 -left-4 md:-left-10 bg-white text-slate-900 rounded-2xl shadow-xl px-5 py-3 items-center gap-3">
                <span className="text-2xl" role="img" aria-label="highly rated">
                  ⭐
                </span>
                <div>
                  <p className="text-sm font-semibold">Rated by happy families</p>
                  <p className="text-xs text-slate-500">Interactive classes with visible progress</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickHighlights.map((item) => (
              <div
                key={item}
                className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl py-3 px-4 text-center text-sm md:text-base font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Why families choose us</h2>
            <p className="text-slate-600 text-lg">A vibrant approach inspired by modern learning platforms.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-7 shadow-lg shadow-blue-100/50 border border-slate-100 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our flagship courses</h2>
              <p className="text-slate-600 mt-2">Select the right track for your child and scale confidently.</p>
            </div>
            <Link href="/courses" className="text-blue-700 font-semibold hover:text-blue-900">View all courses →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {courses.map((course) => (
              <div key={course.title} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all bg-white">
                <div className={`h-2 w-full bg-gradient-to-r ${course.accent}`} />
                <div className="p-6">
                  <div className="bg-slate-50 rounded-2xl p-4 mb-5">
                    <Image
                      src={course.image}
                      alt={`${course.title} course`}
                      className="w-full h-44 object-contain"
                      width={420}
                      height={280}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 mb-5">{course.description}</p>
                  <Link href={course.href} className="inline-flex items-center gap-2 font-semibold text-blue-700 group-hover:text-blue-900">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Ready to make learning exciting?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Join a high-energy learning environment that keeps children curious, active, and motivated.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/careers" className="ui-pill-btn bg-slate-900 text-white hover:bg-black">View Careers</Link>
              {!isLoggedIn && (
                <Link href="/signup" className="ui-pill-btn bg-blue-600 text-white hover:bg-blue-700">Start Today</Link>
              )}
              <Link href="/support" className="ui-pill-btn bg-white text-slate-900 border border-slate-300 hover:bg-slate-100">Contact Support</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
