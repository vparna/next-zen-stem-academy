'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { childcarePrograms } from '@/lib/childcarePrograms';
import EnrollmentForm from '@/components/EnrollmentForm';


// Static Data for After-School & STEAM Programs
const afterschoolPrograms = [
  {
    title: 'Young Innovators',
    age: 'Grades K–5 (Ages 5–10)',
    image: '/robotics_track.png',
    color: '#F25022',
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
    color: '#00A4EF',
    description: 'Focuses on advanced leadership coaching, competitive chess & math preparation, and professional-grade coding projects.',
    bullets: [
      'Advanced coding & programming tracks',
      'Competitive Olympiad math prep',
      'Leadership & communication workshops'
    ]
  }
];

// STEAM Flags
const stemTracks = [
  {
    title: 'Robotics & Coding',
    age: 'Ages 8–16',
    price: '$99/mo',
    image: '/robotics_track.png',
    color: '#F25022',
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
    color: '#7FBA00',
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
    color: '#00A4EF',
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
    title: 'Innovative STEAM Curriculum',
    description: 'Our educators nurture, educate, and inspire your child through hands-on robotics, math, and chess curricula designed to build critical thinking and life-long skills.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-[#F25022]',
    btnText: 'About Our Curriculum',
    href: '/courses',
    image: '/robotics_kid.png',
  },
  {
    title: 'Olympiad-Level Mentors',
    description: 'Learn from mathematics competition champions, master chess coaches, and experienced software developers who are trained to focus on individual student growth.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-[#00A4EF]',
    btnText: 'Meet Our Mentors',
    href: '/about',
    image: '/math_kid.png',
  },
  {
    title: 'Collaborative STEAM Community',
    description: 'NextZen Academy is a vibrant space where children form lifelong friendships, build confidence, and collaborate on real-world engineering projects.',
    bg: 'bg-white border-slate-100 shadow-sm',
    accent: 'text-[#7FBA00]',
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
    answer: 'We offer full-day childcare for infants from 6 weeks up to preschool age (4 years old), and after-school/STEAM enrichment for school-age children up to 18 years old (K-12).',
  },
  {
    question: 'Is your main focus childcare or STEAM education?',
    answer: 'Our primary focus is high-quality, secure Childcare and Daycare. On top of this nurturing foundation, we offer an integrated after-school package featuring our signature STEAM, Chess, Coding, and Mathematics tracks.',
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
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Interactive states
  const [zipCode, setZipCode] = useState('');
  const [locatorResult, setLocatorResult] = useState<string | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeChildcareIndex, setActiveChildcareIndex] = useState(0);

  // Inquiry form states
  const [preSelectedProgram, setPreSelectedProgram] = useState<string | undefined>(undefined);

  const handleProgramInquiryClick = (title: string) => {
    setPreSelectedProgram(title);
    scrollToSection('inquiry-form-section');
  };

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
    setLocatorResult('Searching for nearest NextZen STEAM & Childcare Lab...');
    setTimeout(() => {
      setLocatorResult(
        `✓ NextZen Academy Silicon Valley Lab (1.2 miles away) - NOW ENROLLING for Childcare & STEAM!`
      );
    }, 600);
  };

  const handleUseMyLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    setZipCode('94043');
    setLocatorResult('Searching based on your location...');
    setTimeout(() => {
      setLocatorResult(
        `✓ NextZen Academy Mountain View Lab (0.8 miles away) - NOW ENROLLING for Childcare & STEAM!`
      );
    }, 600);
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
            alt="Children collaborating on science and STEAM activities at NextZen Academy"
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
            <span className="inline-flex items-center gap-2 bg-[#F25022]/20 border border-[#F25022]/40 px-4 py-2 rounded-full text-xs font-black text-[#FFB900] uppercase tracking-widest mb-8">
              🚀 Premium Childcare &amp; STEAM Academy
            </span>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-8 flex flex-col gap-2 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F25022] via-[#FF7043] to-[#FFB900] drop-shadow-md select-none">
                Ancient Wisdom
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7FBA00] via-[#A3E635] to-[#FFB900] italic drop-shadow-md select-none">
                Modern Learning
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A4EF] via-[#00E5FF] to-[#3B82F6] drop-shadow-md select-none">
                Future Leaders
              </span>
              {/* Bottom decorative accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#00A4EF] rounded-full mt-4" />
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => scrollToSection('childcare-programs')}
                className="bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#F25022]/30 hover:shadow-xl hover:shadow-[#F25022]/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Preschool &amp; Daycare
              </button>
              <button
                onClick={() => scrollToSection('afterschool-programs')}
                className="bg-[#00A4EF]/20 border border-[#00A4EF]/40 hover:bg-[#00A4EF]/30 hover:border-[#00A4EF]/60 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                After-School &amp; STEAM
              </button>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              {[
                { value: '6', label: 'Age Programs', icon: '🎓', color: '#F25022' },
                { value: '15+', label: 'STEAM Courses', icon: '🔬', color: '#7FBA00' },
                { value: '98%', label: 'Parent Satisfaction', icon: '⭐', color: '#FFB900' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-2xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</div>
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

      {/* ── SECTION 1: CHILDCARE & EARLY EDUCATION (Kiddie Academy style) ── */}
      <section className="py-20 bg-[#f5f1ec]" id="childcare-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-right max-w-6xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-black tracking-widest text-[#F25022] uppercase">
              Childcare &amp; Daycare
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2e57] tracking-tight">
              Learning for Every Age
            </h2>
          </div>

          {/* ── Main Interactive Block ── */}
          <div className="rounded-2xl shadow-2xl">

            {/* Top: Tab List LEFT + Photo RIGHT */}
            <div className="flex flex-col lg:flex-row">

              {/* LEFT: Vertical Tab List */}
              <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 bg-[#f5f1ec] flex flex-col rounded-l-2xl overflow-hidden">
                {childcarePrograms.map((program, idx) => {
                  const isActive = activeChildcareIndex === idx;
                  return (
                    <button
                      key={program.title}
                      onMouseEnter={() => setActiveChildcareIndex(idx)}
                      onClick={() => router.push(`/programs/${program.slug}`)}
                      className={`w-full text-left px-8 py-8 border-b border-slate-300/40 last:border-b-0 transition-colors duration-200 cursor-pointer flex flex-col gap-1 ${!isActive ? 'hover:bg-[#ede8e2]' : ''
                        }`}
                      style={isActive ? { backgroundColor: program.color } : {}}
                    >
                      <span
                        className="font-black text-xl leading-tight"
                        style={isActive ? { color: '#fff' } : { color: '#1f2e57' }}
                      >
                        {program.title}
                      </span>
                      <span
                        className="text-sm font-medium leading-tight mt-0.5"
                        style={isActive ? { color: 'rgba(255,255,255,0.80)' } : { color: '#6b7280' }}
                      >
                        {program.age}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT: Full-Height Photo — extends beyond the tab list height */}
              <div className="relative flex-1 min-h-[420px] lg:min-h-0 lg:-my-10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={childcarePrograms[activeChildcareIndex].image}
                  alt={childcarePrograms[activeChildcareIndex].title}
                  fill
                  className="object-cover object-center transition-all duration-500"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: AFTER-SCHOOL & STEAM ENRICHMENT ── */}
      <section className="py-20 bg-brand-light" id="afterschool-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black tracking-widest text-[#00A4EF] uppercase">
              K-12 Student Support
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              After-School & STEAM Enrichment
            </h2>
            <p className="text-primary/70 text-base md:text-lg font-semibold">
              Supporting older age groups with homework prep, leadership development, and specialized, high-tier STEAM learning tracks.
            </p>
          </div>

          {/* Group Classes Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {afterschoolPrograms.map((program) => (
              <div
                key={program.title}
                className="group rounded-[2.5rem] overflow-hidden border-t-4 border border-slate-100 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row shadow-sm"
                style={{ borderTopColor: program.color }}
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
                    <span
                      className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full"
                      style={{ color: program.color, backgroundColor: `${program.color}18` }}
                    >
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
                          <span className="flex-shrink-0 mt-0.5" style={{ color: program.color }}>✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleProgramInquiryClick(program.title)}
                    className="w-full md:w-auto py-3 px-8 rounded-full font-black text-xs text-center uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: program.color }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* STEAM Tracks Subsection */}
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
                      <span
                        className="absolute top-4 left-4 text-[10px] font-black px-3.5 py-1.5 rounded-full text-white shadow"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.age}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif text-lg font-bold text-primary">{track.title}</h4>
                      </div>
                      <p className="text-xs text-primary/70 leading-relaxed font-semibold">{track.description}</p>
                      <ul className="space-y-1.5 pt-2">
                        {track.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[11px] font-bold text-primary/80">
                            <span className="font-sans font-bold" style={{ color: track.color }}>•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleProgramInquiryClick(track.title)}
                      className="w-full py-3 px-8 rounded-full font-black text-xs text-center uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                      style={{ backgroundColor: track.color }}
                    >
                      Inquire for STEAM Track
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
                  <p className="text-xs font-black text-[#F25022] uppercase tracking-wider mb-1">Our Core Commitment</p>
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
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#00A4EF] hover:underline uppercase tracking-wider pt-1"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <EnrollmentForm
            preSelectedProgram={preSelectedProgram}
            onClearPreSelected={() => setPreSelectedProgram(undefined)}
          />

          {/* Mock Parent Handbook Download Button */}
          <div className="text-center space-y-3 pt-4">
            <p className="text-xs font-bold text-[#1f2e57]/70">
              Want to read our policies on tuition, schedules, and late fees?
            </p>
            <a
              href="/NextZen Academy Parent Handbook.pdf"
              download
              className="inline-flex items-center gap-2 border border-[#1f2e57]/20 hover:border-[#1f2e57] text-[#1f2e57] font-black uppercase text-[10px] tracking-wider px-6 py-3 rounded-full transition-all active:scale-95 bg-white shadow-sm"
            >
              📥 Download Parent Handbook (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION (Kiddie Academy Testimonial Block) ── */}
      <section className="py-20 bg-gradient-to-br from-[#1f2e57] via-[#0a1628] to-[#1f2e57] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <span className="text-xs font-black tracking-widest text-[#FFB900] uppercase">
            Parent Community
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-12">
            Stories From Our Families
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-white/10 relative shadow-2xl">
            {/* Quote Icon */}
            <span className="absolute left-8 top-6 text-7xl font-serif text-[#FFB900]/20 select-none pointer-events-none">
              “
            </span>

            {/* Testimonial Content */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <p className="text-base md:text-lg italic font-medium leading-relaxed mb-6">
                &ldquo;{testimonials[currentTestimonialIndex].quote}&rdquo;
              </p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 text-[#FFB900] mb-6">
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
              className="text-xs font-black text-[#FFB900] hover:text-[#ffc933] hover:underline uppercase tracking-wider"
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
            <span className="text-xs font-black tracking-widest text-[#00A4EF] uppercase">
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
            {(() => {
              const faqColors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900', '#F25022'];
              return faqs.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                const faqColor = faqColors[idx % faqColors.length];
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border-l-4 border border-slate-200 transition-all duration-200 overflow-hidden bg-white ${isOpen ? 'shadow-md' : 'hover:shadow-sm'}`}
                    style={isOpen ? { borderLeftColor: faqColor } : { borderLeftColor: faqColor }}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left px-6 py-5 font-black text-[#1f2e57] flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base"
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`text-xs transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : 'text-slate-400'}`}
                        style={isOpen ? { color: faqColor } : {}}
                      >
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
              })
            })()}
          </div>

        </div>
      </section>

      {/* ── ENROLLMENT CTA BANNER (Bright Horizons style) ── */}
      <section className="pb-24 pt-8 bg-white" id="admissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#F25022]/10 via-[#FFB900]/10 to-[#00A4EF]/10 border border-[#F25022]/20 p-8 md:p-16 lg:p-20 shadow-xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-[#F25022]/10 via-[#FFB900]/10 to-[#7FBA00]/10 filter blur-3xl pointer-events-none" />

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
                  className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white transition-all duration-300 shadow-md shadow-[#F25022]/15 hover:shadow-lg hover:shadow-[#F25022]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Enroll Now — It&apos;s Free
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white transition-all duration-300 shadow-md shadow-[#F25022]/15 hover:shadow-lg hover:shadow-[#F25022]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  View Student Dashboard
                </Link>
              )}
              <Link
                href="/courses"
                className="text-slate-700 hover:text-[#F25022] bg-white border border-slate-200 hover:border-[#F25022] hover:shadow-md hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full"
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
