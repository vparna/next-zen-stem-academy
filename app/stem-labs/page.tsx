'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// STEAM Pillars Data
const steamPillars = [
  { letter: 'S', name: 'Science', icon: '🔬', desc: 'Inquiry-led exploration of the physical world. Students learn physics mechanics, thermodynamics, and optics through practical lab experiments.', color: 'text-rose-500 bg-rose-50 border-rose-100' },
  { letter: 'T', name: 'Technology', icon: '💻', desc: 'From block coding to C++ and Python. Campers write scripts, understand logical structures, and work with neural network AI models.', color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { letter: 'E', name: 'Engineering', icon: '⚙️', desc: 'Translating concepts into physical models. Building gearboxes, programming sensors, and assembling autonomous robotic systems.', color: 'text-orange-500 bg-orange-50 border-orange-100' },
  { letter: 'A', name: 'Arts', icon: '🎨', desc: 'Encouraging design thinking and creative representation. Students design video game assets, UI interfaces, and visual graphics.', color: 'text-purple-500 bg-purple-50 border-purple-100' },
  { letter: 'M', name: 'Mathematics', icon: '📐', desc: 'Solving advanced problems with structural clarity. Strengthening algebra, spatial geometry, and competitive Olympiad logic.', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' }
];

// Labs Data for Interactive Tour
const labsTour = [
  {
    id: 'robotics',
    name: 'Robotics & Hardware Lab',
    tagline: 'Where Code Meets Copper & Gears',
    icon: '🤖',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    description: 'Our primary engineering hub. Outfitted with high-spec soldering workstations, 3D printers, and test tracks, this lab allows kids to build robots from raw microcontrollers to final assemblies.',
    tools: ['Arduino & ESP32 Microcontrollers', 'Ultrasonic, IR, & Gyroscope Sensors', 'High-Torque DC & Servo Motors', 'Dual-Extrusion 3D Printers'],
    activity: 'Building an autonomous obstacle-avoidance car from scratch and writing its PID control algorithm in Python.'
  },
  {
    id: 'chess',
    name: 'Chess Strategy Room',
    tagline: 'Quiet Focus & Calculated Execution',
    icon: '♟️',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
    description: 'A noise-controlled strategy center equipped with official USCF weighted tournament board sets, chess clocks, and high-definition analysis screens to study grandmaster game history.',
    tools: ['Weighted DGT Tournament Sets', 'Digital Chess Clocks', 'HD Tactical Analysis Board Screens', 'LiChess Classroom Integration'],
    activity: 'Position analysis of classic World Championship endgames, followed by Blitz tournament matches.'
  },
  {
    id: 'math',
    name: 'Mathematics Arena',
    tagline: 'Problem Solving Without Limits',
    icon: '🧮',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    description: 'A vibrant collaborative space for logical exploration. Ditch the worksheets — our math arena uses vertical writing boards, geometry modules, and puzzles to make numbers physical.',
    tools: ['Vertical dry-erase glass boards', '3D Geometric building structures', 'Olympiad Kangaroo logic resources', 'Interactive algebraic balance models'],
    activity: 'Cracking cryptographic code riddles using algebra, primes, and modular arithmetic.'
  },
  {
    id: 'maker',
    name: 'STEAM Creative Studio',
    tagline: 'Publishing Interactive Digital Art',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    description: 'This studio is dedicated to digital design, UI coding, and physical computing. Here, children wire custom input buttons into game systems, coding game boards and mechanics.',
    tools: ['Mac Mini Design Workstations', 'Makey Makey Controller Kits', 'Scratch & Javascript Editors', 'Wacom Drawing Tablets'],
    activity: 'Wiring physical fruit controllers using conductive wires and coding an interactive fruit piano.'
  }
];

// Age Segments / Cohorts
const labCohorts = [
  {
    name: 'STEAM Preschool Explorers',
    ages: 'Ages 4–6',
    schedule: 'Mondays & Wednesdays (3:30 PM – 4:30 PM) OR Saturdays (9:30 AM – 10:30 AM)',
    focus: 'Sensory building, basic chess piece movement, pattern recognition, visual coding foundations.',
    colorBg: 'bg-orange-50 border-orange-100',
    badgeColor: 'bg-orange-500 text-white'
  },
  {
    name: 'Elementary STEAM Makers',
    ages: 'Ages 7–10',
    schedule: 'Tuesdays & Thursdays (4:00 PM – 5:30 PM) OR Saturdays (11:00 AM – 12:30 PM)',
    focus: 'Arduino sensor programming, arithmetic logic, tactical chess openings, 2D game architecture.',
    colorBg: 'bg-sky-50 border-sky-100',
    badgeColor: 'bg-sky-500 text-white'
  },
  {
    name: 'Advanced STEAM Innovators',
    ages: 'Ages 11–16',
    schedule: 'Mondays & Wednesdays (5:00 PM – 6:30 PM) OR Sundays (10:00 AM – 11:30 AM)',
    focus: 'Text-based Python/C++, competitive math Olympiads, positional chess strategies, neural network basics.',
    colorBg: 'bg-emerald-50 border-emerald-100',
    badgeColor: 'bg-emerald-500 text-white'
  }
];

// Safety and facility FAQs
const safetyFaqs = [
  {
    question: 'How do you ensure safety in the Robotics & Maker Labs?',
    answer: 'Safety is our absolute priority. Our Robotics and Maker labs are equipped with protective gear (safety goggles, ESD wrist straps). High-temp tools like hot glue guns or soldering irons are only operated under direct, 1-on-1 supervision of a mentor. First-aid stations are located in every lab, and our instructors are first-aid/CPR certified.'
  },
  {
    question: 'Can we schedule a makeup session if a student misses a lab class?',
    answer: 'Yes! We issue up to two makeup session credits per term. You can schedule makeup classes through the Parent Dashboard in any parallel weekday or weekend cohort within 30 days of the missed class.'
  },
  {
    question: 'What qualifications do the Lab Mentors hold?',
    answer: 'Our lab mentors are experienced computer scientists, mechanical engineers, math Olympiad competitors, and USCF-rated chess instructors. Every employee undergoes rigorous federal background checks and comprehensive safety training before joining our classrooms.'
  },
  {
    question: 'Are lab materials and equipment kits included in the tuition?',
    answer: 'Yes, all standard lab materials, software licenses, 3D printing filaments, and chess supplies are 100% included in the monthly tuition. Certain specialized advanced robotics tracks offer an optional hardware upgrade kit that students can purchase to take their physical robots home at the end of the semester.'
  }
];

export default function StemLabsPage() {
  const [activeTabId, setActiveTabId] = useState('robotics');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'STEAM Labs Trial',
    childName: '',
    childAge: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Find active lab data
  const activeLab = labsTour.find(l => l.id === activeTabId) || labsTour[0];

  // Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form Submission
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
          message: `[STEAM LABS TRIAL REQUEST] Selected Lab Category: ${formData.course}. Notes: ${formData.message || 'None'}`
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
        course: 'STEAM Labs Trial',
        childName: '',
        childAge: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit booking. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F5] text-slate-800 overflow-x-hidden font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* ── HERO SECTION ── */}
      <section className="relative bg-gradient-to-b from-[#FFFDFB] via-[#FAF6F0] to-[#FAF8F5] pt-12 pb-16 md:py-24 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-sky-100/30 filter blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-orange-100/30 filter blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
              <span className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/60 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-sky-600 uppercase tracking-wider shadow-sm animate-fade-in-up">
                💡 Inquiry-Led Learning Environments
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                NextZen Premium <br />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                  STEAM Labs
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                Step inside our state-of-the-art physical labs designed to foster collaborative engineering, posistional logic, and algorithmic creativity. We build intelligence beyond school standards.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#book-trial"
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md shadow-sky-500/20 hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer"
                >
                  Book 60-Min Free Trial
                </a>
                <a
                  href="#virtual-tour"
                  className="px-8 py-4 rounded-full font-extrabold text-sm text-center text-slate-800 bg-white border-2 border-slate-200 hover:border-slate-800 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
                >
                  Explore Our Labs
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] rounded-[3rem] rounded-tr-[7rem] rounded-bl-[7rem] lg:rounded-tr-[9rem] lg:rounded-bl-[9rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                  alt="High tech STEAM lab class"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-3 sm:p-4 border border-sky-100/80 flex items-center gap-2 sm:gap-3 animate-bounce-slow">
                <span className="text-xl sm:text-2xl">⚡</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-extrabold text-slate-800 leading-tight">In-Person Labs</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-sky-500">Industry-Grade Gear</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-3 sm:p-4 border border-orange-100/80 flex items-center gap-2 sm:gap-3 animate-bounce-delayed">
                <span className="text-xl sm:text-2xl">🏆</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-extrabold text-slate-800 leading-tight">Olympiad Mentors</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-orange-500">Personalized Guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEAM 5-PILLAR FRAMEWORK ── */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              The Five Pillars of STEAM
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base">
              We implement Science, Technology, Engineering, Arts, and Mathematics in unison, helping children build practical solutions to complex problems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {steamPillars.map((pillar) => (
              <div
                key={pillar.letter}
                className={`rounded-[2rem] p-5 md:p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center text-center last:col-span-2 md:last:col-span-1 ${pillar.color}`}
              >
                <span className="text-2xl md:text-3xl font-black mb-1 md:mb-2 select-none">{pillar.letter}</span>
                <span className="text-xl md:text-2xl mb-3 md:mb-4">{pillar.icon}</span>
                <h3 className="text-slate-900 text-sm md:text-base font-black mb-1.5 md:mb-2">{pillar.name}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE VIRTUAL LAB TOUR ── */}
      <section className="py-20 bg-white" id="virtual-tour">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              Virtual Lab Tour
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Explore Our Physical Spaces
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Our labs are fitted with standard industry gear, not toys. Toggle below to review what equipment and activities take place in each space.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Tab Selectors */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {labsTour.map((lab) => {
                const isSelected = activeTabId === lab.id;
                return (
                  <button
                    key={lab.id}
                    onClick={() => setActiveTabId(lab.id)}
                    className={`text-left p-4 lg:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 lg:gap-4 flex-shrink-0 ${isSelected
                        ? 'bg-[#FAF8F5] border-orange-500/80 shadow-md shadow-orange-500/5'
                        : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200'
                      }`}
                  >
                    <span className="text-2xl lg:text-3xl bg-white border border-slate-100 shadow-sm p-1.5 lg:p-2 rounded-xl">
                      {lab.icon}
                    </span>
                    <div>
                      <h4 className="text-xs lg:text-sm font-black text-slate-900 leading-tight whitespace-nowrap">{lab.name}</h4>
                      <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 mt-0.5">{lab.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Lab Details */}
            <div className="lg:col-span-8 bg-[#FAF8F5]/80 border border-slate-200/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              {/* Lab Photo */}
              <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden border border-slate-150 shadow flex-shrink-0">
                <Image
                  src={activeLab.image}
                  alt={activeLab.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Lab Description */}
              <div className="space-y-5 flex-grow">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {activeLab.name}
                  </h3>
                  <p className="text-xs font-bold text-orange-500 italic">
                    &ldquo;{activeLab.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {activeLab.description}
                </p>

                {/* Equipment / Tools List */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lab Equipment &amp; Resources:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {activeLab.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                        <span className="text-sky-500">•</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Activity */}
                <div className="p-4 rounded-xl border border-dashed border-sky-200 bg-sky-50/50 text-[11px] font-bold text-sky-800 space-y-1">
                  <p className="uppercase tracking-widest text-[9px] font-black text-sky-500">Sample Lab Experiment:</p>
                  <p className="leading-relaxed">{activeLab.activity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COHORTS & TIME SLOTS ── */}
      <section className="py-20 bg-slate-50 relative">
        {/* Curved Wave transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-white rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Schedule &amp; Cohorts
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Class Cohorts &amp; Hours
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Students are grouped strictly by age and skill levels. Pick a timing that matches your child&apos;s routine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {labCohorts.map((cohort, idx) => (
              <div
                key={idx}
                className={`rounded-[2rem] border p-8 flex flex-col justify-between space-y-6 bg-white hover:shadow-xl transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${cohort.badgeColor}`}>
                      {cohort.ages}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {cohort.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {cohort.focus}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Timings:</p>
                  <p className="text-xs font-bold text-slate-700 leading-normal">
                    🕒 {cohort.schedule}
                  </p>
                  <a
                    href="#book-trial"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        course: cohort.name,
                        message: `Hi, I am interested in scheduling a trial session for the ${cohort.name} (${cohort.ages}) cohort.`
                      }));
                    }}
                    className="inline-block w-full text-center py-2.5 rounded-xl border border-slate-200 hover:border-slate-800 text-xs font-black transition-all text-slate-750"
                  >
                    Select Cohort
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEDICATED INQUIRY FORM ── */}
      <section className="py-20 bg-[#FAF6F0] relative" id="book-trial">
        {/* Wave curve transition */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[24px] md:h-[40px] fill-current text-slate-50 rotate-180">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/40">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-8 px-6 text-center">
              <span className="bg-white/20 backdrop-blur-md text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                100% Free 60-Minute Trial Session
              </span>
              <h2 className="text-3xl font-black mt-3">Book a STEAM Lab Trial Class</h2>
              <p className="text-sm text-sky-50 mt-1 max-w-xl mx-auto">
                Select your preferred age group and lab. Meet our mentors, explore our facilities, and build an introductory engineering project with your child.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-16 px-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-black text-emerald-600 mb-2">Trial Booked Successfully!</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  Thank you for booking a trial class at NextZen STEAM Labs! An academic coordinator will contact you in the next 24 hours to confirm your scheduled slot.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all"
                >
                  Book Another Trial
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Cohort Interest */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                      Target Age Cohort *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                    >
                      <option value="STEAM Labs Trial">All Labs / Undecided</option>
                      <option value="STEAM Preschool Explorers">Preschool Explorers (Ages 4-6)</option>
                      <option value="Elementary STEAM Makers">Elementary STEAM Makers (Ages 7-10)</option>
                      <option value="Advanced STEAM Innovators">Advanced STEAM Innovators (Ages 11-16)</option>
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                      placeholder="Your child's name"
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
                      min="4"
                      max="18"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                      placeholder="Child's age"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                    Additional Requests / Specific Interests
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                    placeholder="Tell us if your child has prior experience in chess, coding, or robotics..."
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
                    className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-black px-12 py-4 rounded-full text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-sky-500/10 cursor-pointer"
                  >
                    {status === 'submitting' ? 'Booking Trial...' : 'Book My Trial Spot 🚀'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="py-20 bg-white" id="safety-faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Lab Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Safety &amp; Lab FAQs
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Providing clear explanations to help parents feel confident about our safety and operational standards.
            </p>
          </div>

          <div className="space-y-4">
            {safetyFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${isOpen
                      ? 'border-sky-500/80 shadow-md shadow-sky-500/5'
                      : 'border-slate-200 hover:border-slate-800'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 font-extrabold text-slate-900 flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xl transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-sky-500' : 'text-slate-400'}`}>
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
