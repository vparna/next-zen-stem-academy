'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const stats = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '98%', label: 'Parent Satisfaction' },
  { value: '3', label: 'STEM Subjects' },
  { value: '10+', label: 'Years Experience' },
];

const highlights = [
  {
    icon: '🤖',
    title: 'Robotics & Coding',
    description: 'Hands-on sessions where kids design, build, and program real robots with industry-grade tools.',
    bg: 'bg-blue-50',
    accent: 'text-blue-600',
  },
  {
    icon: '🧮',
    title: 'Mathematics Mastery',
    description: 'Logic puzzles, olympiad prep, and real-world problem solving that makes math fun and rewarding.',
    bg: 'bg-orange-50',
    accent: 'text-orange-600',
  },
  {
    icon: '♟️',
    title: 'Strategic Chess',
    description: 'Guided play that trains focus, patience, decision-making, and long-term strategic thinking.',
    bg: 'bg-emerald-50',
    accent: 'text-emerald-600',
  },
];

const courses = [
  {
    title: 'Robotics',
    description: 'Build and program robots while strengthening analytical and creative thinking.',
    href: '/courses?category=Robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    accent: 'from-blue-500 to-cyan-400',
    badge: 'Ages 8–16',
    price: '$99/mo',
  },
  {
    title: 'Mathematics',
    description: 'Make math practical and fun through logic games, puzzles, and smart challenges.',
    href: '/courses?category=Maths',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
    accent: 'from-purple-500 to-pink-500',
    badge: 'Ages 10–16',
    price: '$79/mo',
  },
  {
    title: 'Chess',
    description: 'Train focus, planning, and decision-making with guided strategic play.',
    href: '/courses?category=Chess',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80',
    accent: 'from-emerald-500 to-teal-400',
    badge: 'Ages 6–16',
    price: '$69/mo',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Parent of 2',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=f97316&color=fff&size=80',
    quote: 'My daughter went from dreading math to begging for extra sessions. The instructors are phenomenal — patient, encouraging, and incredibly knowledgeable.',
    stars: 5,
  },
  {
    name: 'James Patel',
    role: 'Parent of 1',
    avatar: 'https://ui-avatars.com/api/?name=James+Patel&background=0ea5e9&color=fff&size=80',
    quote: 'The robotics program is beyond what I expected. My son built his first autonomous robot in week 3. He now talks about becoming an engineer every day!',
    stars: 5,
  },
  {
    name: 'Linda Nguyen',
    role: 'Parent of 3',
    avatar: 'https://ui-avatars.com/api/?name=Linda+Nguyen&background=8b5cf6&color=fff&size=80',
    quote: 'All three of my kids attend Next Zen. The chess program has dramatically improved their focus and grades at school. Worth every penny.',
    stars: 5,
  },
];

const trustBadges = [
  { icon: '⭐', label: '4.9/5 Rating' },
  { icon: '🎓', label: '500+ Students' },
  { icon: '🏆', label: 'Award-Winning' },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!(token && userData));
    };
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  return (
    <div className="bg-slate-50">
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
            alt="Kids learning with technology"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/65 to-slate-900/30" />
        </div>
        {/* Orbs */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              🚀 Future-ready STEM learning for children
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-5">
              Spark Curiosity.{' '}
              <br />
              Build{' '}
              <span className="gradient-text">Brilliance.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl">
              A premier learning experience with Robotics, Mathematics, and Chess programs that build confidence, critical thinking, and measurable outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/courses"
                className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all"
              >
                Explore Programs
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/signup"
                  className="ui-pill-btn border-2 border-white/60 text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  Book Free Trial
                </Link>
              )}
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((b) => (
                <span key={b.label} className="stat-badge">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">{s.value}</p>
                <p className="text-slate-400 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mx-auto mb-4">Why Families Choose Us</h2>
            <p className="text-slate-600 text-lg mt-6">A premium, results-driven approach to STEM education.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div key={item.title} className={`${item.bg} rounded-3xl p-8 card-hover border border-white`}>
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${item.accent}`}>{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading">Our Flagship Courses</h2>
              <p className="text-slate-600 mt-6">Select the right track for your child and watch them shine.</p>
            </div>
            <Link href="/courses" className="text-orange-500 font-semibold hover:text-orange-700 flex items-center gap-1">
              View all courses <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.title} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-md card-hover bg-white">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={`${course.title} course`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                    {course.badge}
                  </span>
                </div>
                {/* Accent bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${course.accent}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                    <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{course.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">{course.description}</p>
                  <Link href={course.href} className="inline-flex items-center gap-2 font-semibold text-orange-500 hover:text-orange-700 group-hover:gap-3 transition-all">
                    Learn More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mx-auto mb-4">What Parents Say</h2>
            <p className="text-slate-600 text-lg mt-6">Real stories from our amazing community of families.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-3xl p-7 shadow-lg border border-slate-100 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                    unoptimized
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Enrollment Banner ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
            alt="Children studying"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
            Ready to Transform Your Child&apos;s Future?
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            Join 500+ families already on the path to STEM excellence. Enroll today and get the first week free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isLoggedIn && (
              <Link href="/signup" className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all">
                Enroll Now — It&apos;s Free
              </Link>
            )}
            <Link href="/courses" className="ui-pill-btn border-2 border-white/60 text-white hover:bg-white hover:text-slate-900 transition-all">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
