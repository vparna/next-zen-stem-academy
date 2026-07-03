'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Static Data
const stats = [
  { value: '500+', label: 'Students Enrolled', icon: '🤖' },
  { value: '98%', label: 'Parent Satisfaction', icon: '⭐' },
  { value: '3', label: 'STEM Subjects', icon: '💡' },
  { value: '10+', label: 'Years Experience', icon: '🏆' },
];

const highlights = [
  {
    icon: '🤖',
    title: 'Hands-On Robotics',
    description: 'We don\'t use toys. Children build and program with actual industry-grade microcontrollers, sensors, and software tools.',
    bg: 'bg-blue-50/70 border-blue-100/50',
    accent: 'text-blue-600',
  },
  {
    icon: '🎓',
    title: 'Olympiad-Level Mentors',
    description: 'Learn from math competition champions, master chess coaches, and experienced software developers who care about individual growth.',
    bg: 'bg-orange-50/70 border-orange-100/50',
    accent: 'text-orange-600',
  },
  {
    icon: '📊',
    title: 'Measurable Success Metrics',
    description: 'Receive detailed monthly progress reports, certificate milestones, and chess/math tournament readiness evaluations.',
    bg: 'bg-emerald-50/70 border-emerald-100/50',
    accent: 'text-emerald-600',
  },
];

const courses = [
  {
    title: 'Robotics & Coding',
    description: 'Build and program autonomous robots. Students learn hardware mechanics, electronic circuits, and programming in Scratch, Python, and C++.',
    href: '/courses?category=Robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    accentColor: 'orange',
    badge: 'Ages 8–16',
    price: '$99/mo',
    bullets: [
      'Build physical mechanical assemblies',
      'Learn block-based & text programming',
      'Understand sensor & motor automation'
    ]
  },
  {
    title: 'Mathematics Mastery',
    description: 'Make mathematics practical and engaging. We focus on conceptual mastery, logic puzzles, algebra foundation, and Olympiad competition prep.',
    href: '/courses?category=Maths',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    accentColor: 'sky',
    badge: 'Ages 10–16',
    price: '$79/mo',
    bullets: [
      'Logical reasoning & puzzle-solving',
      'Advanced curriculum alignment',
      'Tournament & competition readiness'
    ]
  },
  {
    title: 'Strategic Chess',
    description: 'Develop focus, patience, and strategic foresight. Led by expert coaches, children master openings, middle-game tactics, and tournament play.',
    href: '/courses?category=Chess',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
    accentColor: 'emerald',
    badge: 'Ages 6–16',
    price: '$69/mo',
    bullets: [
      'Learn tactical patterns & openings',
      'Boost memory & calculation capacity',
      'Participate in internal matches & ratings'
    ]
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent of 2 (Ages 8 & 11)',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+M&background=f97316&color=fff&size=80',
    quote: 'My daughter went from dreading math to begging for extra logic sessions. The instructors are phenomenal — patient, encouraging, and incredibly knowledgeable.',
    stars: 5,
  },
  {
    name: 'Linda N.',
    role: 'Parent of 3 (Ages 6, 9 & 12)',
    avatar: 'https://ui-avatars.com/api/?name=Linda+N&background=8b5cf6&color=fff&size=80',
    quote: 'All three of my kids attend Next Zen. The chess program has dramatically improved their focus and academic grades at school. Worth every penny.',
    stars: 5,
  },
  {
    name: 'Swathi Ch.',
    role: 'Parent of 1 (Age 10)',
    avatar: 'https://ui-avatars.com/api/?name=Swathi+Ch&background=10b981&color=fff&size=80',
    quote: 'The robotics program is beyond what I expected. My son built his first autonomous obstacle-evading robot in week 3. He now talks about becoming an engineer!',
    stars: 5,
  },
];

const faqs = [
  {
    question: 'What age groups are eligible for NextZen programs?',
    answer: 'Our core programs are designed for children aged 6 to 16. We divide students into age-appropriate and skill-level-based cohorts (e.g., Chess: 6-16, Robotics: 8-16, Mathematics: 10-16) to ensure optimal learning outcomes and peer collaboration.',
  },
  {
    question: 'Can we try a class before enrolling in a paid plan?',
    answer: 'Yes! We offer a 100% free, 60-minute trial session in Robotics, Mathematics, or Chess. This allows you and your child to tour our labs, meet the mentors, and experience our hands-on curriculum first-hand.',
  },
  {
    question: 'What is the student-to-teacher ratio in each cohort?',
    answer: 'We maintain small group sizes to ensure highly personalized attention. Our student-to-instructor ratio is capped at 6:1 for Robotics & Coding labs, and 8:1 for Mathematics and Chess classes.',
  },
  {
    question: 'How do you handle make-up classes if my child misses a session?',
    answer: 'If your child has a school event or is sick, you can easily schedule a make-up class through our online student/parent dashboard. We offer makeup credits valid for up to 30 days in parallel weekly cohorts.',
  },
];

const philosophyData = {
  stem: {
    title: 'Inquiry-Led STEM Learning',
    description: 'We believe active discovery is far more powerful than passive listening. Children learn by constructing physical hardware, writing code, and testing hypotheses in real-world scenarios.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    bulletTitle: 'Key Focus Areas:',
    bullets: [
      'Real-world problem-solving methodologies',
      'Electronic circuits, microcontrollers, and sensory inputs',
      'Translating math theories into robotics code logic'
    ]
  },
  skills: {
    title: 'Essential Life-Skill Development',
    description: 'Technical knowledge is only half the equation. Our programs are designed to nurture executive functioning skills that serve children throughout their academic and personal lives.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
    bulletTitle: 'Cognitive Growth:',
    bullets: [
      'Patience and strategic foresight via structured chess play',
      'Analytical reasoning and logical structure under pressure',
      'Collaborative communication and team division of labor'
    ]
  },
  success: {
    title: 'Measurable Academic & Life Success',
    description: 'We align our tracks to tangible outcomes. Whether prep for competitive math olympiads, official chess rating improvements, or high-school coding readiness, we track and reward every milestone.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    bulletTitle: 'Our Milestones:',
    bullets: [
      'Prep for AMC 8 / Math Kangaroo competitions',
      'Certificate of mastery and build portfolio for school applications',
      'Confidence to tackle complex, multi-step scientific projects'
    ]
  }
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<'stem' | 'skills' | 'success'>('stem');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F5] text-slate-800 overflow-x-hidden font-sans">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-gradient-to-b from-[#FFFDFB] via-[#FAF6F0] to-[#FAF8F5] pt-12 pb-24 md:py-24 lg:py-32 overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-orange-100/30 filter blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-sky-100/40 filter blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/60 px-4 py-1.5 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider shadow-sm animate-fade-in-up">
                🚀 Future-Ready STEM Education
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Spark Curiosity. <br />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                  Build Brilliance.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                NextZen Academy offers a premium learning experience through Robotics, Mathematics, and Chess programs that empower children to design, analyze, and build with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/courses"
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.03] transition-all cursor-pointer"
                >
                  Explore Programs
                </Link>
                {!isLoggedIn && (
                  <Link
                    href="/signup"
                    className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-slate-800 bg-white border-2 border-slate-200 hover:border-slate-800 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
                  >
                    Book Free Trial
                  </Link>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Our Standards of Excellence</p>
                <div className="flex flex-wrap gap-4">
                  {['⭐ 4.9/5 Parent Rating', '🎓 500+ Active Students', '🏆 Award-Winning Pedagogy'].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Organic Frame Image Container */}
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3.5rem] rounded-tr-[9rem] rounded-bl-[9rem] overflow-hidden border-8 border-white shadow-2xl relative">
                <Image
                  src={`${basePath}/hero_img.png`}
                  alt="Children collaborating on educational project"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Element 1: Robotics */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 border border-orange-100/80 flex items-center gap-3 animate-bounce-slow">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">Robotics Lab</p>
                  <p className="text-[10px] font-bold text-orange-500">100% Hands-on Coding</p>
                </div>
              </div>

              {/* Floating Element 2: Chess */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 border border-sky-100/80 flex items-center gap-3 animate-bounce-delayed">
                <span className="text-2xl">♟️</span>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">Chess Mastery</p>
                  <p className="text-[10px] font-bold text-sky-500">Logic & Concentration</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Custom SVG Wave bottom transition border */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] md:h-[50px] fill-current text-white">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── STATS BANNER (Floating Overlap) ── */}
      <section className="relative z-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 md:-mt-20 bg-white rounded-[2.5rem] border border-slate-200/50 shadow-xl shadow-slate-100/80 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {stats.map((s, idx) => (
                <div key={s.label} className={`flex flex-col items-center justify-center ${idx >= 2 ? 'pt-6 md:pt-0' : ''}`}>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <p className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{s.value}</p>
                  <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLAGSHIP PROGRAMS (Goddard & Bright Horizons style) ── */}
      <section className="py-20 md:py-28 bg-white" id="stem-labs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              Curriculum Core
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Flagship Learning Tracks
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Expert-designed curricula structured around child cognitive growth milestones. Pick a discipline and watch your child shine.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              // Accent color mapping
              const isRobotics = course.accentColor === 'orange';
              const isMath = course.accentColor === 'sky';
              
              const borderAccentClass = isRobotics 
                ? 'group-hover:border-orange-200' 
                : isMath 
                  ? 'group-hover:border-sky-200' 
                  : 'group-hover:border-emerald-200';

              const badgeColorClass = isRobotics 
                ? 'bg-orange-500 text-white' 
                : isMath 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-emerald-500 text-white';

              const textAccentClass = isRobotics 
                ? 'text-orange-600 bg-orange-50' 
                : isMath 
                  ? 'text-sky-600 bg-sky-50' 
                  : 'text-emerald-600 bg-emerald-50';

              return (
                <div 
                  key={course.title} 
                  className={`group rounded-[2.5rem] overflow-hidden border border-slate-100/80 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col ${borderAccentClass}`}
                >
                  {/* Card Image */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    
                    {/* Age Badge */}
                    <span className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1.5 rounded-full shadow ${badgeColorClass}`}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl md:text-2xl font-black text-slate-900">
                          {course.title}
                        </h3>
                        <span className={`text-xs font-black px-3.5 py-1 rounded-full ${textAccentClass}`}>
                          {course.price}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Scannable Curricula Bullets */}
                      <ul className="space-y-2 pt-2">
                        {course.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                            <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link 
                      href={course.href} 
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-500 hover:text-orange-600 transition-colors group/link pt-4"
                    >
                      Explore Track Details 
                      <span className="transform group-hover/link:translate-x-1.5 transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── THE NEXTZEN WAY (3S Philosophy with Tabs) ── */}
      <section className="py-20 md:py-28 bg-[#F6F8FB] relative" id="nextzen-way">
        {/* Small SVG curve for section transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-white rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              The NextZen Learning Formula
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              We focus on building cognitive structures that empower long-term achievement rather than short-term memorization.
            </p>
          </div>

          {/* Interactive Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Tab Buttons Column */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { key: 'stem', label: 'STEM', tag: 'Hands-on discovery', icon: '🧪', color: 'orange' },
                { key: 'skills', label: 'Skills', tag: 'Executive functioning', icon: '🧠', color: 'sky' },
                { key: 'success', label: 'Success', tag: 'Outcomes & Milestones', icon: '🏆', color: 'emerald' },
              ].map((tab) => {
                const isActive = activePhilosophyTab === tab.key;
                
                let activeStyle = '';
                if (isActive) {
                  if (tab.color === 'orange') activeStyle = 'bg-white border-orange-500/80 shadow-md shadow-orange-500/5';
                  else if (tab.color === 'sky') activeStyle = 'bg-white border-sky-500/80 shadow-md shadow-sky-500/5';
                  else activeStyle = 'bg-white border-emerald-500/80 shadow-md shadow-emerald-500/5';
                } else {
                  activeStyle = 'bg-transparent border-transparent hover:bg-white/40 hover:border-slate-200';
                }

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActivePhilosophyTab(tab.key as 'stem' | 'skills' | 'success')}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-5 cursor-pointer ${activeStyle}`}
                  >
                    <span className="text-3xl p-3 rounded-xl bg-[#FAF8F5] border border-slate-100 shadow-sm flex-shrink-0">
                      {tab.icon}
                    </span>
                    <div>
                      <h3 className={`text-lg font-black ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {tab.label}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {tab.tag}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Dynamic Display Column */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-200/50 shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 shadow flex-shrink-0">
                <Image
                  src={philosophyData[activePhilosophyTab].image}
                  alt={philosophyData[activePhilosophyTab].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  {philosophyData[activePhilosophyTab].title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {philosophyData[activePhilosophyTab].description}
                </p>
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {philosophyData[activePhilosophyTab].bulletTitle}
                  </p>
                  <ul className="space-y-2">
                    {philosophyData[activePhilosophyTab].bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <span className="text-sky-500 mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US (Highlights Cards) ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              The Academy Standards
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Why Families Choose NextZen
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              We set high educational standards for children, focusing on actual conceptual development and high-quality coaching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div 
                key={item.title} 
                className={`rounded-[2rem] p-8 border hover:shadow-xl transition-all duration-300 ${item.bg}`}
              >
                <span className="inline-flex items-center justify-center text-4xl p-4 bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
                  {item.icon}
                </span>
                <h3 className={`text-lg md:text-xl font-black mb-3 ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS (Bright Horizons Bubble Card style) ── */}
      <section className="py-20 md:py-28 bg-[#FAF6F0] relative">
        {/* Curved Wave transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-white rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              Parent Community
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Stories from our Families
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Hear directly from parents about the conceptual changes and mental development they noticed in their children.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div 
                key={t.name} 
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg relative hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Quotation Mark */}
                <span className="absolute right-6 top-4 text-7xl font-serif text-amber-500/10 pointer-events-none select-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-150">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm leading-tight">{t.name}</p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION (Goddard School style) ── */}
      <section className="py-20 md:py-28 bg-white" id="parent-resources">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Have Questions? We Have Answers
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Providing clear explanations to help parents make the right educational choices.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div 
                  key={faq.question} 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isOpen 
                      ? 'border-orange-500/80 shadow-md shadow-orange-500/5' 
                      : 'border-slate-200 hover:border-slate-800'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 font-extrabold text-slate-900 flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xl transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'}`}>
                      ▼
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 py-5 text-sm md:text-base text-slate-500 leading-relaxed font-medium bg-[#FAF8F5]/30">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── ENROLLMENT CTA BANNER (Bright Horizons style) ── */}
      <section className="pb-24 pt-8 bg-white" id="admissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/20 to-sky-500/10 border border-orange-200/50 p-8 md:p-16 lg:p-20 shadow-xl shadow-orange-500/5 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-orange-400/10 to-amber-400/10 filter blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-2xl relative z-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Ready to Transform Your Child&apos;s Future?
              </h2>
              <p className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                Join 500+ families already on the path to analytical excellence. Enroll in our weekly cohorts or schedule a 100% free discovery trial today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10 flex-shrink-0">
              {!isLoggedIn ? (
                <Link 
                  href="/signup" 
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer whitespace-nowrap"
                >
                  Enroll Now — It&apos;s Free
                </Link>
              ) : (
                <Link 
                  href="/dashboard" 
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer whitespace-nowrap"
                >
                  View Student Dashboard
                </Link>
              )}
              <Link 
                href="/courses" 
                className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-slate-800 bg-white border border-slate-200 hover:border-slate-800 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
