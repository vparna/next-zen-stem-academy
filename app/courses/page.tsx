'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Course {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  ageGroup: string;
  image?: string;
}

const categoryConfig: Record<string, { color: string; bg: string; icon: string; headerGrad: string; imgUrl: string }> = {
  Robotics: {
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    icon: '🤖',
    headerGrad: 'from-blue-500 to-cyan-400',
    imgUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
  },
  Maths: {
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    icon: '🧮',
    headerGrad: 'from-purple-500 to-pink-500',
    imgUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
  },
  Chess: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    icon: '♟️',
    headerGrad: 'from-emerald-500 to-teal-400',
    imgUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80',
  },
};

const defaultConfig = { color: 'text-slate-700', bg: 'bg-slate-50', icon: '📚', headerGrad: 'from-slate-500 to-slate-400', imgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80' };

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<'all' | 'preschool' | 'afterschool'>('all');

  const getSampleCourses = useCallback((): Course[] => {
    const all = [
      { _id: '1', name: 'Robotics Fundamentals', category: 'Robotics', description: 'Learn the basics of robotics, including sensors, motors, and programming.', price: 99, duration: '12 weeks', ageGroup: '8-12 years' },
      { _id: '2', name: 'Advanced Robotics', category: 'Robotics', description: 'Build complex robots and learn advanced programming techniques.', price: 129, duration: '16 weeks', ageGroup: '12-16 years' },
      { _id: '3', name: 'Mathematics Mastery', category: 'Maths', description: 'Comprehensive mathematics program covering algebra, geometry, and problem-solving.', price: 79, duration: '10 weeks', ageGroup: '10-14 years' },
      { _id: '4', name: 'Chess Beginner', category: 'Chess', description: 'Learn chess fundamentals, basic strategies, and opening principles.', price: 69, duration: '8 weeks', ageGroup: '6-10 years' },
      { _id: '5', name: 'Chess Advanced', category: 'Chess', description: 'Master advanced tactics, endgames, and competitive chess strategies.', price: 89, duration: '12 weeks', ageGroup: '10-16 years' },
      { _id: '6', name: 'Olympiad Mathematics', category: 'Maths', description: 'Prepare for mathematics olympiads with challenging problem sets.', price: 119, duration: '14 weeks', ageGroup: '12-16 years' },
      { _id: '7', name: 'Preschool STEAM Explorers', category: 'Robotics', description: 'Introduce young minds to hands-on building, shape logic, and basic patterns.', price: 59, duration: '8 weeks', ageGroup: '4-6 years' },
      { _id: '8', name: 'Early Logic & Chess Kids', category: 'Chess', description: 'Fun storytelling and interactive games to introduce the rules and moves of chess.', price: 49, duration: '8 weeks', ageGroup: '4-6 years' }
    ];
    if (selectedCategory === 'all') return all;
    return all.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const fetchCourses = useCallback(async () => {
    try {
      const url = selectedCategory === 'all'
        ? '/api/courses'
        : `/api/courses?category=${selectedCategory}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        setCourses(getSampleCourses());
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(getSampleCourses());
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, getSampleCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const categories = [
    { value: 'all', label: 'All Courses', icon: '📚' },
    { value: 'Robotics', label: 'Robotics', icon: '🤖' },
    { value: 'Maths', label: 'Mathematics', icon: '🧮' },
    { value: 'Chess', label: 'Chess', icon: '♟️' },
  ];

  const matchesSegment = (course: Course) => {
    if (selectedSegment === 'all') return true;
    const isPreschool = course.ageGroup.includes('4-6') || course.name.toLowerCase().includes('preschool');
    if (selectedSegment === 'preschool') return isPreschool;
    if (selectedSegment === 'afterschool') return !isPreschool;
    return true;
  };

  const displayedCourses = courses.filter(matchesSegment);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[44vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80"
            alt="STEAM education"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-sm">
            📚 All Programs
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Our <span className="gradient-text">STEAM Programs</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
            Comprehensive curricula designed to ignite curiosity and build lasting skills across preschool and after-school ages.
          </p>
        </div>
      </section>

      {/* ── Category & Segment Filter ── */}
      <section className="py-6 bg-white border-b border-slate-150 sticky top-[69px] lg:top-[93px] z-30 shadow-sm">
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Segment Filter (Preschool vs Afterschool) - Sliding Pill design */}
          <div className="bg-slate-100 p-1 rounded-2xl flex w-full max-w-xl mx-auto border border-slate-200/50">
            {[
              { value: 'all', label: 'All Ages' },
              { value: 'preschool', label: 'Preschool (4-6)' },
              { value: 'afterschool', label: 'After-School (6-16)' }
            ].map((seg) => (
              <button
                key={seg.value}
                onClick={() => setSelectedSegment(seg.value as any)}
                className={`flex-1 py-2.5 rounded-xl text-center text-xs font-black transition-all duration-300 cursor-pointer ${
                  selectedSegment === seg.value
                    ? 'bg-white text-slate-900 shadow-sm font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>

          {/* Discipline Filters - Swipeable horizontal list on mobile */}
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 justify-start md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-orange-300 hover:text-orange-500'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
              <p className="mt-4 text-slate-500 font-medium">Loading programs...</p>
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-250/40 rounded-3xl p-8">
              <p className="text-xl text-slate-400 font-semibold">No programs found matching the selected filters.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedSegment('all'); }} 
                className="mt-4 px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCourses.map((course) => {
                const cfg = categoryConfig[course.category] || defaultConfig;
                return (
                  <div key={course._id} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-md card-hover bg-white flex flex-col justify-between">
                    <div>
                      {/* Image header */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={cfg.imgUrl}
                          alt={course.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold ${cfg.color} ${cfg.bg} px-3 py-1 rounded-full`}>
                          {cfg.icon} {course.category}
                        </span>
                        <span className="absolute bottom-3 right-3 text-white text-sm font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                          ${course.price}<span className="text-xs font-normal">/mo</span>
                        </span>
                      </div>
                      {/* Gradient accent bar */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.headerGrad}`} />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{course.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">{course.description}</p>
                        <div className="flex gap-3 mb-5">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                            ⏱️ {course.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                            👥 {course.ageGroup}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <Link
                        href={`/courses/${course._id}`}
                        className="ui-pill-btn w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Enroll?</h2>
          <p className="text-slate-400 mb-8 text-lg">Sign up now and start your learning journey with NextZen Academy.</p>
          <Link
            href="/signup"
            className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
          >
            Create a Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
