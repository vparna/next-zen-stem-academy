'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Camp Tracks Data
const campTracks = [
  {
    id: 'robotics',
    title: 'Robotics & AI Pioneer Camp',
    ageGroup: 'Ages 8–14',
    icon: '🤖',
    badge: 'Hardware & Code',
    accentColor: 'orange',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    description: 'A hands-on engineering experience. Campers build physical, autonomous robots using real microcontrollers, sensors, and geared assemblies, programming them in C++ and Python to complete complex obstacle challenges.',
    outcomes: [
      'Understand electrical circuitry & sensor inputs',
      'Code autonomous decision-making algorithms',
      'Design mechanical systems for power & efficiency',
      'Take-home custom microcontroller hardware kit'
    ]
  },
  {
    id: 'math',
    title: 'Mathematics Olympiad & Logic Quest',
    ageGroup: 'Ages 9–15',
    icon: '🧮',
    badge: 'Competitive Logic',
    accentColor: 'sky',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    description: 'Transform how your child views mathematics. Through logic riddles, cryptography, spatial reasoning games, and Olympiad competition prep, we build true conceptual mathematical structure and a deep love for logic.',
    outcomes: [
      'Master advanced mental math & logical reasoning',
      'Practice AMC 8 & Math Kangaroo tournament problems',
      'Solve collaborative team cryptology challenges',
      'Build confidence for academic math acceleration'
    ]
  },
  {
    id: 'chess',
    title: 'Strategic Chess Champions Camp',
    ageGroup: 'Ages 6–16',
    icon: '♟️',
    badge: 'Mind Tactics',
    accentColor: 'emerald',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
    description: 'Led by master coaches, this intensive chess camp sharpens tactical calculation, opening repertoire, positional play, and endgame theory. Campers test their skills in daily rated USCF-style club matches.',
    outcomes: [
      'Learn tactical patterns (forks, pins, skewered attacks)',
      'Construct a personalized opening and defensive playbook',
      'Receive official feedback through digital game analyses',
      'Trophies & certificates awarded in the Friday Tournament'
    ]
  },
  {
    id: 'maker',
    title: 'STEAM Maker & Creative Coding',
    ageGroup: 'Ages 7–12',
    icon: '🎮',
    badge: 'Game Design & Arts',
    accentColor: 'purple',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    description: 'The ultimate camp for creators. Campers merge physical arts and electronic inputs to design their own arcade-style video games, programming interactive elements with Scratch and Javascript.',
    outcomes: [
      'Build interactive hardware controllers',
      'Understand game loops, coordinate systems, and physics',
      'Create and animate custom digital character assets',
      'Publish a playable game portfolio to share with family'
    ]
  }
];

// Schedule / Weeks Data
const weeksData = [
  {
    week: 'Week 1',
    dates: 'June 15 – June 19',
    camps: [
      { track: 'Robotics & AI', title: 'Autonomous Vehicles & Smart Sensors', ages: 'Ages 8–11', status: 'Only 2 spots left!', statusColor: 'text-red-500 bg-red-50' },
      { track: 'STEAM Maker', title: 'Minecraft Modding & Game Logic', ages: 'Ages 7–10', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' }
    ]
  },
  {
    week: 'Week 2',
    dates: 'June 22 – June 26',
    camps: [
      { track: 'Math & Logic', title: 'Olympiad Math: Logic Puzzles & Kangaroo Prep', ages: 'Ages 9–12', status: 'Selling Fast', statusColor: 'text-amber-500 bg-amber-50' },
      { track: 'Strategic Chess', title: 'Tactical Openings & Master Endgames', ages: 'Ages 6–12', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' }
    ]
  },
  {
    week: 'Week 3',
    dates: 'June 29 – July 3',
    camps: [
      { track: 'Robotics & AI', title: 'Bionic Prosthetics & Mechanical Arms', ages: 'Ages 11–14', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' },
      { track: 'STEAM Maker', title: 'Robotics Game Design in Scratch & Python', ages: 'Ages 8–12', status: 'Only 3 spots left!', statusColor: 'text-red-500 bg-red-50' }
    ]
  },
  {
    week: 'Week 4',
    dates: 'July 6 – July 10',
    camps: [
      { track: 'Math & Logic', title: 'Algebra Foundations & Cryptography Secrets', ages: 'Ages 11–15', status: 'Selling Fast', statusColor: 'text-amber-500 bg-amber-50' },
      { track: 'Strategic Chess', title: 'Tournament Prep & Game Analysis Camp', ages: 'Ages 8–16', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' }
    ]
  },
  {
    week: 'Week 5',
    dates: 'July 13 – July 17',
    camps: [
      { track: 'Robotics & AI', title: 'Smart City Automation & IoT Devices', ages: 'Ages 8–12', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' },
      { track: 'STEAM Maker', title: 'Scratch Arcade & Platformer Design', ages: 'Ages 7–10', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' }
    ]
  },
  {
    week: 'Week 6',
    dates: 'July 20 – July 24',
    camps: [
      { track: 'Math & Logic', title: 'Olympiad Math: Advanced Problem Solving', ages: 'Ages 12–15', status: 'Only 1 spot left!', statusColor: 'text-red-500 bg-red-50' },
      { track: 'Strategic Chess', title: 'Chess Strategy Lab & Blitz Tournaments', ages: 'Ages 6–14', status: 'Selling Fast', statusColor: 'text-amber-500 bg-amber-50' }
    ]
  },
  {
    week: 'Week 7',
    dates: 'July 27 – July 31',
    camps: [
      { track: 'Robotics & AI', title: 'AI Robotics & Computer Vision Basics', ages: 'Ages 10–14', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' },
      { track: 'STEAM Maker', title: 'Mobile App Development with Blocks & JS', ages: 'Ages 9–13', status: 'Open', statusColor: 'text-emerald-500 bg-emerald-50' }
    ]
  },
  {
    week: 'Week 8',
    dates: 'August 3 – August 7',
    camps: [
      { track: 'Math & Logic', title: 'Strategic Logic Games & Chess Fusion Camp', ages: 'Ages 8–14', status: 'Selling Fast', statusColor: 'text-amber-500 bg-amber-50' },
      { track: 'Robotics & AI', title: 'BattleBots & Mechanical Gear Systems', ages: 'Ages 8–14', status: 'Only 2 spots left!', statusColor: 'text-red-500 bg-red-50' }
    ]
  }
];

// FAQs Data
const faqs = [
  {
    question: 'What are the camp hours and schedule?',
    answer: 'Our Half-Day camps run from 9:00 AM to 12:00 PM (Morning Session) or 1:00 PM to 4:00 PM (Afternoon Session). Full-Day camps run from 9:00 AM to 4:00 PM, which includes a supervised lunch break and interactive outdoor games from 12:00 PM to 1:00 PM.'
  },
  {
    question: 'Is extended care available?',
    answer: 'Yes! We offer early drop-off starting at 8:00 AM (+$25/week) and late pick-up until 5:30 PM (+$35/week), or both combined for $50/week. Campers will have access to board games, logic puzzles, and quiet reading during extended care hours.'
  },
  {
    question: 'What is the student-to-mentor ratio?',
    answer: 'To ensure a safe, high-quality learning environment, we maintain a strict student-to-mentor ratio of 6:1 for Robotics and Creative Coding camps, and 8:1 for Math and Chess camps. Each cohort is led by an experienced STEAM educator assisted by trained teaching aids.'
  },
  {
    question: 'Do we need to pack lunch or snacks?',
    answer: 'Parents should pack two nut-free snacks and a refillable water bottle daily. For Full-Day campers, please also pack a lunch, or you can opt into our catered Hot Lunch program (+$75/week) when registering.'
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer: 'We offer full refunds (minus a $25 admin fee) for cancellations made at least 30 days before your camp session starts. For cancellations between 14-30 days, we provide a 100% camp credit valid for any program or subsequent summer camp. Cancellations under 14 days are non-refundable.'
  }
];

export default function SummerCampsPage() {
  // Active states
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Estimator State
  const [estimatorWeeks, setEstimatorWeeks] = useState(1);
  const [estimatorType, setEstimatorType] = useState<'half' | 'full'>('full');
  const [estimatorLunch, setEstimatorLunch] = useState(false);
  const [estimatorCare, setEstimatorCare] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Summer Camps',
    childName: '',
    childAge: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate pricing based on options
  useEffect(() => {
    const baseRate = estimatorType === 'full' ? 599 : 349;
    let pricePerWeek = baseRate;

    if (estimatorLunch && estimatorType === 'full') pricePerWeek += 75;
    if (estimatorCare) pricePerWeek += 50;

    let total = pricePerWeek * estimatorWeeks;

    // Apply multi-week discounts
    let discount = 0;
    if (estimatorWeeks >= 4) {
      discount = total * 0.15; // 15% discount for 4+ weeks
    } else if (estimatorWeeks >= 2) {
      discount = total * 0.10; // 10% discount for 2-3 weeks
    }

    setDiscountAmount(Math.round(discount));
    setEstimatedPrice(Math.round(total - discount));
  }, [estimatorWeeks, estimatorType, estimatorLunch, estimatorCare]);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: `[SUMMER CAMPS INTEREST] Selected Week/Camp details: ${formData.message || 'None provided'}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: 'Summer Camps',
        childName: '',
        childAge: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F5] text-slate-800 overflow-x-hidden font-sans">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-gradient-to-b from-[#FFFDFB] via-[#FAF6F0] to-[#FAF8F5] pt-12 pb-20 md:py-24 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-orange-100/30 filter blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-sky-100/40 filter blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
              <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/60 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-orange-600 uppercase tracking-wider shadow-sm animate-fade-in-up">
                ☀️ Enrolling for Summer 2026
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                NextZen STEAM <br />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                  Summer Camps
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                Ignite curiosity and build technical excellence. Our premium weekly summer programs combine intensive hands-on STEAM education in Robotics, Coding, Chess, and Mathematics with collaborative outdoor play.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {['📍 Bothell & Redmond', '👥 6:1 Student Ratio', '📅 Weekly June–Aug'].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#camp-inquiry"
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer"
                >
                  Reserve Your Spot
                </a>
                <a
                  href="#schedule-planner"
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-slate-800 bg-white border-2 border-slate-200 hover:border-slate-800 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
                >
                  Browse Weekly Themes
                </a>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] rounded-[3rem] rounded-tr-[7rem] rounded-bl-[7rem] lg:rounded-tr-[9rem] lg:rounded-bl-[9rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                  alt="Summer camp learning robotics"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              {/* Float Widget */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-3 sm:p-4 border border-orange-100/80 flex items-center gap-2 sm:gap-3 animate-bounce-slow">
                <span className="text-xl sm:text-2xl">🏕️</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-extrabold text-slate-800 leading-tight">Ages 6–16</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-orange-500">Weekly Full & Half Day</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-3 sm:p-4 border border-sky-100/80 flex items-center gap-2 sm:gap-3 animate-bounce-delayed">
                <span className="text-xl sm:text-2xl">⚡</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-extrabold text-slate-800 leading-tight">Early Registration</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-sky-500">Save 10% on Multi-Weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS STATS ── */}
      <section className="bg-white py-12 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { title: '6:1 Ratio', label: 'Max Student-To-Teacher', icon: '👥' },
              { title: 'Portfolio Projects', label: 'Take Home What You Build', icon: '🛠️' },
              { title: 'Outdoor Games', label: 'Balanced Active Play', icon: '🌳' },
              { title: 'Weekly Friday Events', label: 'Tournaments & Showcase', icon: '🏆' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <p className="text-2xl font-black text-slate-900">{stat.title}</p>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMP OFFERING TRACKS ── */}
      <section className="py-20 bg-white" id="camp-tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              Camp Programs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Select Your Child&apos;s Adventure
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Explore our core STEAM disciplines. Each camp track features specialized gear, progressive curricula, and a supportive mentorship model.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {campTracks.map((track) => {
              const isRobotics = track.accentColor === 'orange';
              const isMath = track.accentColor === 'sky';
              const isChess = track.accentColor === 'emerald';

              const borderHoverColor = isRobotics
                ? 'hover:border-orange-200'
                : isMath
                  ? 'hover:border-sky-200'
                  : isChess
                    ? 'hover:border-emerald-200'
                    : 'hover:border-purple-200';

              const badgeColor = isRobotics
                ? 'bg-orange-500 text-white'
                : isMath
                  ? 'bg-sky-500 text-white'
                  : isChess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-purple-500 text-white';

              const lightTextBg = isRobotics
                ? 'text-orange-600 bg-orange-50'
                : isMath
                  ? 'text-sky-600 bg-sky-50'
                  : isChess
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-purple-600 bg-purple-50';

              return (
                <div
                  key={track.id}
                  className={`group rounded-[2.5rem] overflow-hidden border border-slate-100/80 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${borderHoverColor}`}
                >
                  {/* Photo Left/Top */}
                  <div className="relative w-full md:w-2/5 min-h-[220px] md:min-h-auto">
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 md:from-slate-900/40 via-transparent to-transparent" />
                    <span className={`absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-full shadow ${badgeColor}`}>
                      {track.ageGroup}
                    </span>
                  </div>

                  {/* Content Right */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{track.icon}</span>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${lightTextBg}`}>
                          {track.badge}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {track.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Camp Outcomes:</p>
                      <ul className="grid grid-cols-1 gap-1.5">
                        {track.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] font-bold text-slate-600">
                            <span className="text-emerald-500">✓</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WEEKLY PLANNER ── */}
      <section className="py-20 bg-slate-50 relative" id="schedule-planner">
        {/* Wave border transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-white rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Camp Calendar
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Interactive Summer Schedule
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Select a week to explore the specific themes, age groups, and real-time availability of camps running during that period.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Week Selection Side List */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2.5">
              {weeksData.map((w, idx) => {
                const isSelected = selectedWeekIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedWeekIndex(idx)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${isSelected
                        ? 'bg-white border-orange-500/80 shadow-md shadow-orange-500/5'
                        : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-900">{w.week}</span>
                      <span className="text-[9px] font-extrabold text-orange-500 tracking-wide">{w.dates.split(' – ')[0]}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 leading-none">
                      {w.dates}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Week Detail Panel */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200/50 shadow-xl p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    📅 {weeksData[selectedWeekIndex].week} Camp Details
                  </h3>
                  <p className="text-xs font-extrabold text-slate-400 mt-1">
                    Dates: {weeksData[selectedWeekIndex].dates}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2">
                  <span className="text-[10px] bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg font-bold text-slate-600">
                    📍 Redmond Campus
                  </span>
                  <span className="text-[10px] bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg font-bold text-slate-600">
                    📍 Bothell Campus
                  </span>
                </div>
              </div>

              {/* Offered Camps List */}
              <div className="space-y-6">
                {weeksData[selectedWeekIndex].camps.map((camp, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 bg-[#FAF8F5]/30 hover:bg-[#FAF8F5]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-orange-600 bg-orange-50 border border-orange-200/40 px-2.5 py-0.5 rounded">
                          {camp.track}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-400">
                          {camp.ages}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">
                        {camp.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${camp.statusColor}`}>
                        {camp.status}
                      </span>
                      <a
                        href="#camp-inquiry"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            message: `Hi, I am interested in ${camp.title} (${camp.track}, ${camp.ages}) during ${weeksData[selectedWeekIndex].week} (${weeksData[selectedWeekIndex].dates}).`
                          }));
                        }}
                        className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        Inquire
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                <p>💡 Camps are available in Half-Day (AM/PM) and Full-Day options.</p>
                <Link href="/hours" className="text-orange-500 hover:text-orange-600 font-extrabold flex items-center gap-1">
                  View Extended Care Hours & Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ESTIMATOR SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: General Pricing Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
                Flexible Enrollment
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Pricing Plans &amp; Bundling Discounts
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Choose the camp intensity that works for your schedule. Extend your hours or add hot lunches. Build the ultimate camp experience.
              </p>

              {/* Pricing Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Half-Day Summer Camp</h4>
                    <p className="text-xs text-slate-400 font-bold">9:00 AM – 12:00 PM OR 1:00 PM – 4:00 PM</p>
                  </div>
                  <span className="text-xl font-black text-orange-500">$349<span className="text-xs font-normal text-slate-400">/wk</span></span>
                </div>
                <div className="p-5 rounded-2xl border border-orange-100 bg-orange-50/20 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      Full-Day Summer Camp
                      <span className="text-[9px] bg-orange-500 text-white font-extrabold uppercase px-1.5 py-0.5 rounded">Popular</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-bold">9:00 AM – 4:00 PM (Supervised Lunch included)</p>
                  </div>
                  <span className="text-xl font-black text-orange-500">$599<span className="text-xs font-normal text-slate-400">/wk</span></span>
                </div>
              </div>

              {/* Bundle Disounter info */}
              <div className="p-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 text-xs font-semibold text-emerald-800 space-y-1">
                <p className="font-extrabold">🎁 Multi-Week Loyalty Discounts:</p>
                <p>• Save 10% total when booking 2 or 3 weeks</p>
                <p>• Save 15% total when booking 4 or more weeks</p>
              </div>
            </div>

            {/* Right: Pricing Calculator */}
            <div className="lg:col-span-7 bg-[#F6F8FB] rounded-[2.5rem] border border-slate-200/50 shadow-xl p-8 md:p-10">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                🧮 Camp Cost Estimator
              </h3>

              <div className="space-y-6">
                {/* 1. Camp Type */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">1. Select Camp Format</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setEstimatorType('half');
                        setEstimatorLunch(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all font-bold text-xs text-center cursor-pointer ${estimatorType === 'half'
                          ? 'bg-white border-orange-500 text-orange-600 shadow-sm'
                          : 'bg-white/50 border-slate-100 text-slate-600'
                        }`}
                    >
                      Half-Day ($349/wk)
                    </button>
                    <button
                      onClick={() => setEstimatorType('full')}
                      className={`p-4 rounded-xl border-2 transition-all font-bold text-xs text-center cursor-pointer ${estimatorType === 'full'
                          ? 'bg-white border-orange-500 text-orange-600 shadow-sm'
                          : 'bg-white/50 border-slate-100 text-slate-600'
                        }`}
                    >
                      Full-Day ($599/wk)
                    </button>
                  </div>
                </div>

                {/* 2. Number of Weeks */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">2. Number of Weeks ({estimatorWeeks})</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={estimatorWeeks}
                    onChange={(e) => setEstimatorWeeks(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 px-1">
                    <span>1 Week</span>
                    <span>2 Wks (10% off)</span>
                    <span>4 Wks (15% off)</span>
                    <span>8 Weeks</span>
                  </div>
                </div>

                {/* 3. Add-Ons */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">3. Add-Ons &amp; Extended Care</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setEstimatorCare(!estimatorCare)}
                      className={`p-3.5 rounded-xl border transition-all text-xs font-bold text-left cursor-pointer flex items-center justify-between ${estimatorCare
                          ? 'bg-white border-sky-400 text-sky-600 shadow-sm'
                          : 'bg-white/50 border-slate-150 text-slate-500 hover:bg-white'
                        }`}
                    >
                      <span>🕒 Extended Care (8AM-5:30PM)</span>
                      <span>+$50/wk</span>
                    </button>

                    <button
                      disabled={estimatorType === 'half'}
                      onClick={() => setEstimatorLunch(!estimatorLunch)}
                      className={`p-3.5 rounded-xl border transition-all text-xs font-bold text-left cursor-pointer flex items-center justify-between ${estimatorType === 'half'
                          ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                          : estimatorLunch
                            ? 'bg-white border-sky-400 text-sky-600 shadow-sm'
                            : 'bg-white/50 border-slate-150 text-slate-500 hover:bg-white'
                        }`}
                    >
                      <span>🍎 Catered Hot Lunch</span>
                      <span>+$75/wk</span>
                    </button>
                  </div>
                </div>

                {/* Estimation Results Panel */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Tuition</span>
                    {discountAmount > 0 && (
                      <p className="text-xs font-extrabold text-emerald-400 leading-none mt-1">
                        Includes ${discountAmount} Multi-Week Discount!
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black">${estimatedPrice}</p>
                    <p className="text-[10px] text-slate-400 font-bold">For {estimatorWeeks} week(s) of camp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEDICATED INQUIRY FORM ── */}
      <section className="py-20 bg-[#FAF6F0] relative" id="camp-inquiry">
        {/* Wave curve transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-white rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/40">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8 px-6 text-center">
              <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                Limited Camp Spots Available
              </span>
              <h2 className="text-3xl font-black mt-3">Reserve Your Spot / Request Info</h2>
              <p className="text-sm text-orange-50 mt-1 max-w-xl mx-auto">
                Select your preferred camp track and dates. A NextZen academic counselor will follow up within 24 hours to secure your registration.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-16 px-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-black text-emerald-600 mb-2">Interest Submitted Successfully!</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  Thank you for expressing interest in NextZen Summer Camps! Our team will contact you shortly to review camp options and finalize your child&apos;s enrollment.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Select Camp Track */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Preferred Camp Track *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    >
                      <option value="Summer Camps">All / Multiple Tracks</option>
                      <option value="Summer Camp: Robotics">🤖 Robotics &amp; AI Pioneer Camp</option>
                      <option value="Summer Camp: Math">🧮 Mathematics Olympiad Camp</option>
                      <option value="Summer Camp: Chess">♟️ Chess Champions Camp</option>
                      <option value="Summer Camp: Maker">🎮 STEAM Maker &amp; Game Design</option>
                    </select>
                  </div>

                  {/* Child Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Child&apos;s Name
                    </label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Your child's first & last name"
                    />
                  </div>

                  {/* Child Age */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Child&apos;s Age
                    </label>
                    <input
                      type="number"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      min="5"
                      max="18"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Child's age"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                    Weeks of Interest / Specific Requests
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    placeholder="E.g., We are interested in Week 1 Robotics (Full Day) and Week 3 Chess (Half Day)..."
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-bold">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-12 py-4 rounded-full text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    {status === 'submitting' ? 'Sending Request...' : 'Send Inquiry Request 🚀'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="py-20 bg-white" id="camp-faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Camp Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Summer Camp FAQs
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Providing clear explanations to help parents organize their child&apos;s summer schedule.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${isOpen
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
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0'
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
    </div>
  );
}
