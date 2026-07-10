'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Static Data for Childcare Programs
const childcarePrograms = [
  {
    title: 'Little Blossoms',
    age: '6 weeks to 12 months',
    image: '/little_blossoms.png',
    description: 'Nurturing daycare environment focusing on sensory discovery, basic motor coordination, and secure, warm bonding.',
    bullets: [
      'Sensory play & exploration',
      'Individualized care routines',
      'Safe, hygienic play space'
    ]
  },
  {
    title: 'Tiny Explorers',
    age: '13 to 24 months',
    image: '/tiny_explorers.png',
    description: 'Guided physical movement, early language building, and initial social group interactions to build confidence.',
    bullets: [
      'Language building & story time',
      'Motor skills & physical coordination',
      'Social development through play'
    ]
  },
  {
    title: 'Curious Cubs',
    age: '2-Year-Olds',
    image: '/curious_cubs.png',
    description: 'Cognitive exploration, basic puzzle solving, and learning daily group routines to foster emotional growth.',
    bullets: [
      'Cognitive puzzles & shape sorting',
      'Social collaboration exercises',
      'Establishing daily group routines'
    ]
  },
  {
    title: 'Little Discoverers',
    age: '3 to 4-Year-Olds',
    image: '/little_discoverers.png',
    description: 'Kindergarten readiness program featuring pre-reading, creative arts, logical thinking, and social skills.',
    bullets: [
      'Pre-reading & phonics introduction',
      'Creative arts & expression sessions',
      'Social-emotional milestone training'
    ]
  }
];

// Static Data for After-School & STEM Programs
const afterschoolPrograms = [
  {
    title: 'Young Innovators',
    age: 'Grades K–5 (Ages 5–10)',
    image: '/robotics_track.png',
    description: 'After-school care program combining academic support with initial hands-on exposure to robotics, logic puzzles, and chess.',
    bullets: [
      'Homework support & school tutoring',
      'Introductory robotics & coding play',
      'Chess basics & strategy puzzles'
    ]
  },
  {
    title: 'Future Leaders',
    age: 'Grades 6–12 (Ages 11–18)',
    image: '/future_leaders.png',
    description: 'Focuses on advanced leadership coaching, competitive chess & math preparation, and professional-grade coding projects.',
    bullets: [
      'Advanced coding & programming tracks',
      'Competitive Olympiad math prep',
      'Leadership & communication workshops'
    ]
  }
];

// STEM Flags
const stemTracks = [
  {
    title: 'Robotics & Coding',
    age: 'Ages 8–16',
    price: '$99/mo',
    image: '/robotics_track.png',
    description: 'Build and program autonomous robots. Learn hardware mechanics, electronic circuits, and text-based coding in Python and C++.',
    bullets: [
      'Hands-on physical hardware builds',
      'Sensors, motors, and electronic circuits',
      'Coding in Scratch, Python, and C++'
    ]
  },
  {
    title: 'Mathematics Mastery',
    age: 'Ages 10–16',
    price: '$79/mo',
    image: '/math_kid.png',
    description: 'Conceptual mathematics covering algebra, geometry, and logical reasoning, plus AMC/Math Kangaroo competition prep.',
    bullets: [
      'Conceptual algebra & geometry bases',
      'Problem-solving & tournament readiness',
      'Olympiad & competitive math training'
    ]
  },
  {
    title: 'Strategic Chess',
    age: 'Ages 6–16',
    price: '$69/mo',
    image: '/chess_kid.png',
    description: 'Develop focus and foresight. Led by master coaches, students learn openings, mid-game tactical patterns, and tournament play.',
    bullets: [
      'Learn positional strategies & openings',
      'Memory, calculation, and focus training',
      'Regular rated matches & analysis'
    ]
  }
];

const highlights = [
  {
    title: 'Innovative STEM Curriculum',
    description: 'Our educators nurture, educate, and inspire your child through hands-on robotics, math, and chess curricula designed to build critical thinking and life-long skills.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-brand-red',
    btnText: 'About Our Curriculum',
    href: '/courses',
    image: '/robotics_kid.png',
  },
  {
    title: 'Olympiad-Level Mentors',
    description: 'Learn from mathematics competition champions, master chess coaches, and experienced software developers who are trained to focus on individual student growth.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-[#005cc4]',
    btnText: 'Meet Our Mentors',
    href: '/about',
    image: '/math_kid.png',
  },
  {
    title: 'Collaborative STEM Community',
    description: 'NextZen Academy is a vibrant space where children form lifelong friendships, build confidence, and collaborate on real-world engineering projects.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-brand-red',
    btnText: 'About NextZen',
    href: '/about',
    image: '/chess_kid.png',
  },
];

const testimonials = [
  {
    name: 'Nicholas W.',
    role: 'NextZen Parent',
    quote: 'I love the detailed monthly reports and the multiple pictures from the labs each day. I love how much more socialized and knowledgeable my son has become in only a very short time.',
    stars: 5,
  },
  {
    name: 'Kathleen D.',
    role: 'NextZen Parent',
    quote: 'All of the teachers are kind, communicative, and want what is best for our children. We also love the structured curriculum, variety of activities, and projects!',
    stars: 5,
  },
  {
    name: 'Renee C.',
    role: 'NextZen Parent',
    quote: 'I feel like my child is genuinely cared for and has a good routine with a rich variety of activities. The robotics program has given them incredible confidence.',
    stars: 5,
  },
];

const faqs = [
  {
    question: 'What age groups are eligible for NextZen programs?',
    answer: 'We offer full-day childcare for infants from 6 weeks up to preschool age (4 years old), and after-school/STEM enrichment for school-age children up to 18 years old (K-12).',
  },
  {
    question: 'Is your main focus childcare or STEM education?',
    answer: 'Our primary focus is high-quality, secure Childcare and Daycare. On top of this nurturing foundation, we offer an integrated after-school package featuring our signature STEM, Chess, Coding, and Mathematics tracks.',
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

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Interactive states
  const [zipCode, setZipCode] = useState('');
  const [locatorResult, setLocatorResult] = useState<string | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeChildcareIndex, setActiveChildcareIndex] = useState(0);

  // Inquiry form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProgram, setInquiryProgram] = useState('Little Blossoms');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);

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

  const handleLocatorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) {
      setLocatorResult('Please enter a city, state, or zip code.');
      return;
    }
    setLocatorResult('Searching for nearest NextZen STEM & Childcare Lab...');
    setTimeout(() => {
      setLocatorResult(
        `✓ NextZen Academy Silicon Valley Lab (1.2 miles away) - NOW ENROLLING for Childcare & STEM!`
      );
    }, 600);
  };

  const handleUseMyLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    setZipCode('94043');
    setLocatorResult('Searching based on your location...');
    setTimeout(() => {
      setLocatorResult(
        `✓ NextZen Academy Mountain View Lab (0.8 miles away) - NOW ENROLLING for Childcare & STEM!`
      );
    }, 600);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryPhone || !inquiryMessage) {
      setInquiryStatus('❌ Please fill in all required fields.');
      return;
    }
    if (!privacyConsent) {
      setInquiryStatus('❌ You must agree to the privacy policy to submit.');
      return;
    }
    setInquiryStatus('Sending inquiry...');
    setTimeout(() => {
      setInquiryStatus(
        '✓ Thank you! Your inquiry has been received. Our enrollment coordinator will reach out to you shortly.'
      );
      // Reset form
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
      setPrivacyConsent(false);
    }, 800);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1f2e57] overflow-x-hidden font-sans">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[640px] lg:min-h-[760px] flex items-center justify-start overflow-hidden">

        {/* Full-bleed hero image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_img.png"
            alt="Children collaborating on science and STEM activities at NextZen Academy"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark navy gradient — left solid, fading right to reveal photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060f1e]/92 via-[#060f1e]/70 to-[#060f1e]/10" />
          {/* Subtle vertical vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="max-w-2xl">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 px-4 py-2 rounded-full text-xs font-black text-orange-300 uppercase tracking-widest mb-8">
              🚀 Premium Childcare &amp; STEM Academy
            </span>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Ancient Wisdom.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 italic">
                Modern Learning.
              </span>{' '}
              Future Leaders
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium mb-10 max-w-xl">
              NextZen Academy provides a premium, secure childcare environment paired with cutting-edge after-school STEM enrichment — nurturing every child from infancy through high school.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => scrollToSection('childcare-programs')}
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-[#ffbe2e] hover:from-orange-600 hover:via-amber-600 hover:to-[#f0b024] text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Preschool &amp; Daycare
              </button>
              <button
                onClick={() => scrollToSection('afterschool-programs')}
                className="bg-white/10 border border-white/25 hover:bg-white/18 hover:border-white/40 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                After-School &amp; STEM
              </button>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              {[
                { value: '6', label: 'Age Programs', icon: '🎓' },
                { value: '15+', label: 'STEM Courses', icon: '🔬' },
                { value: '98%', label: 'Parent Satisfaction', icon: '⭐' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-2xl font-black text-white leading-none">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom wave into next section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 60L80 52C160 44 320 28 480 22C640 16 800 28 960 34C1120 40 1280 40 1360 40L1440 40V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 1: CHILDCARE & EARLY EDUCATION (Kiddie Academy Split Tab style) ── */}
      <section className="py-20 bg-white" id="childcare-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black tracking-widest text-orange-600 uppercase">
              Childcare & Daycare
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
              Learning for Every Age
            </h2>
            <p className="text-[#0f172a]/70 text-base md:text-lg font-semibold">
              Premium early education programs. Hover or click on a program to explore its custom curriculum and classroom details.
            </p>
          </div>

          {/* Interactive Split Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Column: Interactive Program Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {childcarePrograms.map((program, idx) => {
                const isActive = activeChildcareIndex === idx;
                return (
                  <button
                    key={program.title}
                    onMouseEnter={() => setActiveChildcareIndex(idx)}
                    onClick={() => setActiveChildcareIndex(idx)}
                    className={`text-left p-6 rounded-2xl border-l-4 transition-all duration-200 cursor-pointer flex justify-between items-center ${isActive
                      ? 'border-orange-500 bg-[#f8fafc] shadow-md text-[#0f172a]'
                      : 'border-transparent hover:bg-slate-50 text-[#0f172a]/70'
                      }`}
                  >
                    <div>
                      <h4 className="font-serif text-lg font-bold">
                        {program.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 mt-1">
                        {program.age}
                      </p>
                    </div>
                    <span className={`text-lg transition-transform duration-200 ${isActive ? 'translate-x-1.5 text-orange-500' : 'text-slate-300'}`}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Program Display Card */}
            <div className="lg:col-span-7 bg-[#f8fafc]/50 rounded-[3rem] border border-slate-200/60 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center shadow-lg relative min-h-[480px]">
              {/* Image Frame */}
              <div className="w-full md:w-1/2 relative aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden border border-white shadow-inner flex-shrink-0">
                <Image
                  src={childcarePrograms[activeChildcareIndex].image}
                  alt={childcarePrograms[activeChildcareIndex].title}
                  fill
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/20 via-transparent to-transparent" />
              </div>

              {/* Program Detail Text */}
              <div className="flex-grow flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-500/10 px-3 py-1.5 rounded-full inline-block">
                    {childcarePrograms[activeChildcareIndex].age}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0f172a] leading-tight">
                    {childcarePrograms[activeChildcareIndex].title}
                  </h3>
                  <p className="text-sm text-[#0f172a]/70 leading-relaxed font-semibold">
                    {childcarePrograms[activeChildcareIndex].description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Focus & Milestones:</p>
                    <ul className="space-y-2">
                      {childcarePrograms[activeChildcareIndex].bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs font-bold text-[#0f172a]/80">
                          <span className="text-orange-500 flex-shrink-0 mt-0.5">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setInquiryProgram(childcarePrograms[activeChildcareIndex].title);
                      scrollToSection('inquiry-form-section');
                    }}
                    className="w-full md:w-auto py-3 px-8 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-orange-500 via-amber-500 to-[#ffbe2e] hover:from-orange-600 hover:via-amber-600 hover:to-[#f0b024] text-white transition-all duration-300 shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                  >
                    Inquire for {childcarePrograms[activeChildcareIndex].title}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: AFTER-SCHOOL & STEM ENRICHMENT ── */}
      <section className="py-20 bg-brand-light" id="afterschool-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black tracking-widest text-brand-teal uppercase">
              K-12 Student Support
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              After-School & STEM Enrichment
            </h2>
            <p className="text-primary/70 text-base md:text-lg font-semibold">
              Supporting older age groups with homework prep, leadership development, and specialized, high-tier STEM learning tracks.
            </p>
          </div>

          {/* Group Classes Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {afterschoolPrograms.map((program) => (
              <div
                key={program.title}
                className="group rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row shadow-sm"
              >
                {/* Image */}
                <div className="relative h-56 md:h-auto md:w-2/5 flex-shrink-0 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-full">
                      {program.age}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-primary">
                      {program.title}
                    </h3>
                    <p className="text-xs text-primary/70 leading-relaxed font-semibold">
                      {program.description}
                    </p>
                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {program.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs font-bold text-primary/80">
                          <span className="text-brand-teal flex-shrink-0 mt-0.5">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setInquiryProgram(program.title);
                      scrollToSection('inquiry-form-section');
                    }}
                    className="w-full md:w-auto py-3 px-8 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white transition-all duration-300 shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* STEM Tracks Subsection */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl font-bold text-center text-primary">
              Our Signature After-School Tracks
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {stemTracks.map((track) => (
                <div
                  key={track.title}
                  className="bg-white/70 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-4 left-4 text-[10px] font-black px-3.5 py-1.5 rounded-full bg-brand-orange text-white shadow">
                        {track.age}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif text-lg font-bold text-primary">{track.title}</h4>
                        <span className="text-xs font-black text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">
                          {track.price}
                        </span>
                      </div>
                      <p className="text-xs text-primary/70 leading-relaxed font-semibold">{track.description}</p>
                      <ul className="space-y-1.5 pt-2">
                        {track.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[11px] font-bold text-primary/80">
                            <span className="text-brand-teal font-sans font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setInquiryProgram(`${track.title} (Enrichment)`);
                        scrollToSection('inquiry-form-section');
                      }}
                      className="w-full py-3 px-8 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white transition-all duration-300 shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                    >
                      Inquire for STEM Track
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY PARENTS LOVE NEXTZEN (Kiddie Academy Outcomes style) ── */}
      <section className="py-20 bg-white" id="why-nextzen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left visual card */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight">
                Why Families Love NextZen Academy
              </h3>
              <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto rounded-[3rem] overflow-hidden border-8 border-brand-light shadow-xl">
                <Image
                  src="/hero_img.png"
                  alt="Children smiling in a lab"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10" />
                {/* Floating graphic overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 shadow-md">
                  <p className="text-xs font-black text-brand-orange uppercase tracking-wider mb-1">Our Core Commitment</p>
                  <p className="text-sm font-bold text-primary">To spark lifelong learning, build analytical thinkers, and offer a safe, happy childcare community.</p>
                </div>
              </div>
            </div>

            {/* Right detailed outcome cards */}
            <div className="lg:col-span-7 space-y-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-[2.5rem] p-8 border border-slate-100 hover:border-slate-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center shadow-lg ${item.bg}`}
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-3 text-left">
                    <h4 className="font-serif text-lg md:text-xl font-bold text-[#1f2e57]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#1f2e57]/70 font-semibold leading-relaxed">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#005cc4] hover:underline uppercase tracking-wider pt-1"
                    >
                      {item.btnText} <span className="font-sans font-bold">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── INQUIRY & CONTACT FORM SECTION ── */}
      <section className="py-20 bg-[#f5f1ec]" id="inquiry-form-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl space-y-8">

            <div className="text-center space-y-3">
              <span className="text-xs font-black tracking-widest text-[#A93439] uppercase">
                Enrollment & Feedback
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1f2e57]">
                Connect With Our Team
              </h3>
              <p className="text-xs md:text-sm text-[#1f2e57]/70 font-semibold max-w-md mx-auto">
                Interested in our programs or want to share feedback? Submit details below to receive program guides and connect with us.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#005cc4] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#005cc4] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#005cc4] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Program of Interest *</label>
                  <select
                    value={inquiryProgram}
                    onChange={(e) => setInquiryProgram(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#005cc4] rounded-xl px-4 py-3.5 text-sm focus:outline-none font-semibold"
                  >
                    <option value="Little Blossoms">Little Blossoms - 6w to 12m</option>
                    <option value="Tiny Explorers">Tiny Explorers - 13m to 24m</option>
                    <option value="Curious Cubs">Curious Cubs - 2 Years</option>
                    <option value="Little Discoverers">Little Discoverers - 3 to 4 Years</option>
                    <option value="Young Innovators">Young Innovators - K to 5th Grade</option>
                    <option value="Future Leaders">Future Leaders - 6th to 12th Grade</option>
                    <option value="Robotics & Coding">Robotics & Coding</option>
                    <option value="Mathematics Mastery">Mathematics Mastery</option>
                    <option value="Strategic Chess">Strategic Chess</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Message or Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Tell us about your child or share feedback about our programs..."
                  className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#005cc4] rounded-xl p-4 text-sm focus:outline-none font-semibold"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 border-slate-200 focus:ring-[#005cc4] h-4 w-4 text-[#005cc4] rounded cursor-pointer"
                />
                <label htmlFor="privacyConsent" className="text-xs font-semibold text-[#1f2e57]/70 cursor-pointer">
                  I consent to receive communication updates from NextZen Academy regarding enrollment schedules and agree to the storage of my submitted feedback in accordance with the Privacy Policy. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full font-black text-xs text-center uppercase tracking-wider text-white bg-[#A93439] hover:bg-[#A93439]/90 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Submit Inquiry
              </button>

              {inquiryStatus && (
                <p className={`text-xs font-bold text-center mt-4 p-3 rounded-xl border ${inquiryStatus.startsWith('✓') ? 'text-[#005cc4] bg-[#005cc4]/10 border-[#005cc4]/20' : 'text-[#A93439] bg-[#A93439]/10 border-[#A93439]/20'
                  }`}>
                  {inquiryStatus}
                </p>
              )}
            </form>

            {/* Mock Parent Handbook Download Button */}
            <div className="border-t border-slate-100 pt-8 text-center space-y-3">
              <p className="text-xs font-bold text-[#1f2e57]/70">
                Want to read our policies on tuition, schedules, and late fees?
              </p>
              <a
                href="/NextZen_Parent_Handbook.pdf"
                download
                className="inline-flex items-center gap-2 border border-[#1f2e57]/20 hover:border-[#1f2e57] text-[#1f2e57] font-black uppercase text-[10px] tracking-wider px-6 py-3 rounded-full transition-all active:scale-95"
              >
                📥 Download Parent Handbook (PDF)
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION (Kiddie Academy Testimonial Block) ── */}
      <section className="py-20 bg-[#1f2e57] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <span className="text-xs font-black tracking-widest text-[#f2c638] uppercase">
            Parent Community
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            Stories From Our Families
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-white/10 relative shadow-2xl">
            {/* Quote Icon */}
            <span className="absolute left-8 top-6 text-7xl font-serif text-[#f2c638]/20 select-none pointer-events-none">
              “
            </span>

            {/* Testimonial Content */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <p className="text-base md:text-lg italic font-medium leading-relaxed mb-6">
                &ldquo;{testimonials[currentTestimonialIndex].quote}&rdquo;
              </p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 text-[#f2c638] mb-6">
              {Array.from({ length: testimonials[currentTestimonialIndex].stars }).map((_, i) => (
                <span key={i} className="text-xl">★</span>
              ))}
            </div>

            {/* Parent Info */}
            <div className="border-t border-white/15 pt-6 inline-block">
              <p className="font-black text-sm text-white">
                {testimonials[currentTestimonialIndex].name}
              </p>
              <p className="text-xs font-bold text-white/50 mt-1">
                {testimonials[currentTestimonialIndex].role}
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer text-white"
                aria-label="Previous testimonial"
              >
                ◀
              </button>
              <span className="text-xs font-black tracking-wider text-white/75">
                {currentTestimonialIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer text-white"
                aria-label="Next testimonial"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="text-xs font-black text-[#f2c638] hover:text-[#f5d15e] hover:underline uppercase tracking-wider"
            >
              Read More Testimonials
            </Link>
          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION (Goddard School style) ── */}
      <section className="py-20 bg-white" id="parent-resources">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black tracking-widest text-[#005cc4] uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1f2e57] tracking-tight">
              Have Questions? We Have Answers
            </h2>
            <p className="text-[#1f2e57]/70 text-sm md:text-base font-semibold">
              Providing clear explanations to help parents make the right educational choices.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${isOpen
                    ? 'border-[#A93439] shadow-md'
                    : 'border-slate-200 hover:border-[#1f2e57]'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 font-black text-[#1f2e57] flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xs transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#A93439]' : 'text-slate-400'}`}>
                      ▼
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0 overflow-hidden'
                      }`}
                  >
                    <div className="px-6 py-5 text-sm md:text-base text-[#1f2e57]/75 leading-relaxed font-semibold bg-[#FAF8F5]/30">
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
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-sky-500/10 border border-orange-500/20 p-8 md:p-16 lg:p-20 shadow-xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 filter blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-2xl relative z-10 text-center lg:text-left">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight">
                Ready to Transform Your Child&apos;s Future?
              </h2>
              <p className="text-[#0f172a]/80 text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
                Join 500+ families already on the path to academic & analytical excellence. Enroll in our weekly cohorts or schedule a 100% free discovery trial today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10 flex-shrink-0">
              {!isLoggedIn ? (
                <Link
                  href="/signup"
                  className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-orange-500 via-amber-500 to-[#ffbe2e] hover:from-orange-600 hover:via-amber-600 hover:to-[#f0b024] text-white transition-all duration-300 shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Enroll Now — It&apos;s Free
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-orange-500 via-amber-500 to-[#ffbe2e] hover:from-orange-600 hover:via-amber-600 hover:to-[#f0b024] text-white transition-all duration-300 shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  View Student Dashboard
                </Link>
              )}
              <Link
                href="/courses"
                className="text-slate-700 hover:text-orange-500 bg-white border border-slate-200 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full"
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
