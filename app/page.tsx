'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import EnrollmentForm from '@/components/EnrollmentForm';
import { childcarePrograms } from '@/lib/childcarePrograms';

const highlights = [
  {
    title: 'Warm, Nurturing Classrooms',
    description: 'Our daycare spaces are designed for safety, consistency, and joyful early learning every day.',
    image: '/little_blossoms.png',
    href: '/courses',
    btnText: 'Explore Programs',
  },
  {
    title: 'Play-Based Preschool Learning',
    description: 'Preschool and Pre-K families get a balanced routine of literacy, social development, and hands-on discovery.',
    image: '/little_discoverers.png',
    href: '/programs/little-discoverers',
    btnText: 'View Preschool',
  },
  {
    title: 'Family-Focused Admissions',
    description: 'Schedule a tour, meet our team, and find the daycare or preschool fit that works for your family.',
    image: '/pre_k.png',
    href: '/schedule-tour',
    btnText: 'Schedule a Tour',
  },
];

const testimonials = [
  {
    name: 'Nicholas W.',
    role: 'NextZen Parent',
    quote: 'The teachers are caring, the environment feels safe, and our child looks forward to school every morning.',
    stars: 5,
  },
  {
    name: 'Kathleen D.',
    role: 'NextZen Parent',
    quote: 'We appreciate the communication, structure, and how thoughtfully the preschool team supports each child.',
    stars: 5,
  },
  {
    name: 'Renee C.',
    role: 'NextZen Parent',
    quote: 'NextZen helped our family feel confident about daycare from day one, and the routines have been wonderful.',
    stars: 5,
  },
];

const faqs = [
  {
    question: 'What age groups do you serve?',
    answer: 'We offer daycare and preschool programs from infant care through Pre-K, with age-appropriate classrooms for each stage.',
  },
  {
    question: 'Can we tour the campus before enrolling?',
    answer: 'Yes. Families can choose from the available 30-minute tour slots on our campus tour form and receive an email confirmation right away.',
  },
  {
    question: 'What should we expect during a tour?',
    answer: 'You will meet our team, see the classrooms, learn about schedules and tuition, and ask questions about the right program for your child.',
  },
  {
    question: 'Do you offer full-day and half-day options?',
    answer: 'Program availability varies by classroom, and we review the best schedule options with each family during the admissions process.',
  },
];

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!(token && userData));
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);

    import('@capacitor/core')
      .then(({ Capacitor }) => {
        if (Capacitor.isNativePlatform()) {
          router.replace('/mobile');
        }
      })
      .catch((error) => console.error('Failed to load Capacitor:', error));

    return () => window.removeEventListener('authChange', checkAuth);
  }, [router]);

  const programs = useMemo(
    () => childcarePrograms.filter((program) => program.slug !== 'summer-camps'),
    []
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1f2e57] overflow-x-hidden font-sans">
      <section className="bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] text-white py-4 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm md:text-base font-bold flex flex-col sm:block">
            <span>Now scheduling daycare and preschool campus tours</span>
            <Link href="/schedule-tour" className="text-orange-300 hover:text-orange-200 font-bold text-base transition-colors mt-1 sm:mt-0 sm:ml-1 inline-block">
              Schedule yours today!
            </Link>
          </p>
        </div>
      </section>

      <section className="relative w-full min-h-[640px] lg:min-h-[760px] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero_img.png" alt="Children learning at NextZen Academy" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060f1e]/92 via-[#060f1e]/70 to-[#060f1e]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 lg:py-48">
          <div className="absolute top-3 sm:top-4 left-6 sm:left-10 lg:left-16 right-6">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[35px] opacity-60 uppercase font-bold italic tracking-normal text-white drop-shadow-md select-none line-clamp-1 sm:line-clamp-none">
              Premium Early Learning &amp; Preschool Academy
            </span>
          </div>

          <div className="max-w-2xl mt-6 lg:mt-8">
            <h1 className="font-serif font-black tracking-tight leading-[1.15] mb-8 flex flex-col items-center sm:items-start gap-3 relative text-center sm:text-left">
              <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FFD700] to-[#FFB900] drop-shadow-md">
                Nurturing Care
              </span>
              <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#7FBA00] via-[#A3E635] to-[#FFB900] italic drop-shadow-md">
                Thoughtful Preschool Learning
              </span>
              <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#00A4EF] via-[#00E5FF] to-[#3B82F6] drop-shadow-md text-center sm:text-left w-full sm:w-auto">
                For Every Early Childhood Stage
              </span>
              <div className="w-24 h-1 bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#00A4EF] rounded-full mt-4 mx-auto sm:mx-0" />
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 justify-center sm:justify-start w-full px-4 sm:px-0">
              <button
                onClick={() => scrollToSection('childcare-programs')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white font-black uppercase text-sm sm:text-base tracking-wider px-10 py-5 rounded-full transition-all duration-300 shadow-lg shadow-[#F25022]/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Explore Programs
              </button>
              <button
                onClick={() => scrollToSection('inquiry-form-section')}
                className="w-full sm:w-auto bg-[#00A4EF]/20 border border-[#00A4EF]/40 hover:bg-[#00A4EF]/30 hover:border-[#00A4EF]/60 text-white font-black uppercase text-sm sm:text-base tracking-wider px-10 py-5 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Schedule a Tour
              </button>
            </div>

            <div className="mx-auto sm:mr-auto sm:ml-0 w-full max-w-[420px] bg-white/95 backdrop-blur-sm text-[#1f2e57] rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/20 select-none">
              <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
                <h2 className="font-sans font-black text-sm sm:text-base text-[#1f2e57] tracking-tight">
                  NextZen Academy of Bothell
                </h2>
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3.5 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shadow-md border border-slate-100">
                    <Image src="/building-img.png" alt="NextZen Academy of Bothell Campus Building" fill className="object-cover" />
                  </div>
                  <button
                    onClick={() => scrollToSection('inquiry-form-section')}
                    className="bg-[#FFB900] text-[#1f2e57] font-black uppercase text-[8px] tracking-widest px-4 py-1.5 rounded-full mt-1.5 shadow-sm border border-[#FFB900]/20 text-center w-full leading-tight cursor-pointer hover:bg-[#e6a800] transition-all duration-200 active:scale-95"
                  >
                    Tour Openings
                  </button>
                </div>

                <div className="flex flex-col gap-3 w-full flex-grow">
                  <button
                    onClick={() => scrollToSection('inquiry-form-section')}
                    className="w-full bg-gradient-to-r from-[#F25022] to-[#FFB900] text-white font-black uppercase text-[8px] sm:text-[10px] tracking-wider py-1.5 sm:py-2 rounded-full transition-all duration-200 shadow-md shadow-[#F25022]/20 hover:shadow-xl hover:shadow-[#F25022]/40 hover:scale-105 active:scale-95 cursor-pointer text-center whitespace-nowrap"
                  >
                    Request Information
                  </button>
                  <button
                    onClick={() => scrollToSection('inquiry-form-section')}
                    className="w-full bg-gradient-to-r from-[#00A4EF] to-[#3B82F6] text-white font-black uppercase text-[8px] sm:text-[10px] tracking-wider py-1.5 sm:py-2 rounded-full transition-all duration-200 shadow-md shadow-[#00A4EF]/20 hover:shadow-xl hover:shadow-[#00A4EF]/40 hover:scale-105 active:scale-95 cursor-pointer text-center whitespace-nowrap"
                  >
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 60L80 52C160 44 320 28 480 22C640 16 800 28 960 34C1120 40 1280 40 1360 40L1440 40V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white" id="nextzen-way">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-[#F25022] uppercase">The NextZen Way</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2e57] tracking-tight">
            Daycare and Preschool Built Around Families
          </h2>
          <p className="text-[#1f2e57]/75 text-base md:text-lg font-semibold leading-relaxed">
            We combine nurturing care, purposeful routines, and strong family communication to help children feel secure, curious, and ready to grow.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f5f1ec]" id="childcare-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right max-w-6xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black tracking-widest text-[#F25022] uppercase">Childcare &amp; Preschool</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2e57] tracking-tight">
              Programs for Every Early Learner
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.slug} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-60">
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: program.color }}>
                    {program.age}
                  </span>
                </div>
                <div className="p-8 space-y-4 flex flex-col flex-1">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: program.color }}>{program.tagline}</p>
                    <h3 className="font-serif text-2xl font-bold text-[#1f2e57] mt-2">{program.title}</h3>
                    <p className="text-sm text-[#1f2e57]/70 font-semibold leading-relaxed mt-3">{program.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm font-bold text-[#1f2e57]/80 pt-2 border-t border-slate-100">
                    {program.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span style={{ color: program.color }}>✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 mt-auto flex flex-col sm:flex-row gap-3">
                    <Link href={`/programs/${program.slug}`} className="w-full text-center py-3 px-6 rounded-full font-black text-xs uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90" style={{ backgroundColor: program.color }}>
                      Learn More
                    </Link>
                    <button onClick={() => scrollToSection('inquiry-form-section')} className="w-full text-center py-3 px-6 rounded-full font-black text-xs uppercase tracking-widest border border-slate-200 text-[#1f2e57] hover:bg-slate-50 transition-all duration-300 cursor-pointer">
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="why-nextzen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight">
                Why Families Love NextZen Academy
              </h3>
              <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto rounded-[3rem] overflow-hidden border-8 border-brand-light shadow-xl">
                <Image src="/hero_img.png" alt="Children smiling at NextZen Academy" fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-slate-100 shadow-md">
                  <p className="text-xs font-black text-[#F25022] uppercase tracking-wider mb-1">Our Core Commitment</p>
                  <p className="text-sm font-bold text-primary">Safe care, strong routines, and an engaging preschool foundation for every child.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[2.5rem] p-8 border border-slate-100 hover:border-slate-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center shadow-lg bg-white">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-grow space-y-3 text-left">
                    <h4 className="font-serif text-lg md:text-xl font-bold text-[#1f2e57]">{item.title}</h4>
                    <p className="text-sm text-[#1f2e57]/70 font-semibold leading-relaxed">{item.description}</p>
                    <Link href={item.href} className="inline-flex items-center gap-1.5 text-xs font-black text-[#00A4EF] hover:underline uppercase tracking-wider pt-1">
                      {item.btnText} <span className="font-sans font-bold">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f5f1ec]" id="inquiry-form-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <EnrollmentForm />

          <div className="text-center space-y-3 pt-4">
            <p className="text-xs font-bold text-[#1f2e57]/70">Want to review policies before your visit?</p>
            <a href="/NextZen Academy Parent Handbook.pdf" download className="inline-flex items-center gap-2 border border-[#1f2e57]/20 hover:border-[#1f2e57] text-[#1f2e57] font-black uppercase text-[10px] tracking-wider px-6 py-3 rounded-full transition-all active:scale-95 bg-white shadow-sm">
              📥 Download Parent Handbook (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1f2e57] via-[#0a1628] to-[#1f2e57] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-black tracking-widest text-[#FFB900] uppercase">Parent Community</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-12">Stories From Our Families</h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-white/10 relative shadow-2xl">
            <span className="absolute left-8 top-6 text-7xl font-serif text-[#FFB900]/20 select-none pointer-events-none">“</span>
            <div className="min-h-[140px] flex flex-col justify-center">
              <p className="text-base md:text-lg italic font-medium leading-relaxed mb-6">&ldquo;{testimonials[currentTestimonialIndex].quote}&rdquo;</p>
            </div>
            <div className="flex justify-center gap-1 text-[#FFB900] mb-6">
              {Array.from({ length: testimonials[currentTestimonialIndex].stars }).map((_, index) => (
                <span key={index} className="text-xl">★</span>
              ))}
            </div>
            <div className="border-t border-white/15 pt-6 inline-block">
              <p className="font-black text-sm text-white">{testimonials[currentTestimonialIndex].name}</p>
              <p className="text-xs font-bold text-white/50 mt-1">{testimonials[currentTestimonialIndex].role}</p>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8">
              <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer text-white" aria-label="Previous testimonial">◀</button>
              <span className="text-xs font-black tracking-wider text-white/75">{currentTestimonialIndex + 1} / {testimonials.length}</span>
              <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer text-white" aria-label="Next testimonial">▶</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="parent-resources">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black tracking-widest text-[#00A4EF] uppercase">Frequently Asked Questions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1f2e57] tracking-tight">Have Questions? We Have Answers</h2>
            <p className="text-[#1f2e57]/70 text-sm md:text-base font-semibold">Everything you need to know before scheduling a daycare or preschool tour.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              const faqColor = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'][index % 4];
              return (
                <div key={faq.question} className="rounded-2xl border-l-4 border border-slate-200 transition-all duration-200 overflow-hidden bg-white" style={{ borderLeftColor: faqColor }}>
                  <button onClick={() => setActiveFaqIndex(isOpen ? null : index)} className="w-full text-left px-6 py-5 font-black text-[#1f2e57] flex items-center justify-between gap-4 cursor-pointer text-sm md:text-base">
                    <span>{faq.question}</span>
                    <span className={`text-xs transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'text-slate-400'}`} style={isOpen ? { color: faqColor } : undefined}>▼</span>
                  </button>
                  <div className={`${isOpen ? 'max-h-[240px] border-t border-slate-100' : 'max-h-0 overflow-hidden'} transition-all duration-300 ease-in-out`}>
                    <div className="px-6 py-5 text-sm md:text-base text-[#1f2e57]/75 leading-relaxed font-semibold bg-[#FAF8F5]/30">{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-8 bg-white" id="admissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#F25022]/10 via-[#FFB900]/10 to-[#00A4EF]/10 border border-[#F25022]/20 p-8 md:p-16 lg:p-20 shadow-xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between">
            <div className="absolute top-0 right-0 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-[#F25022]/10 via-[#FFB900]/10 to-[#7FBA00]/10 blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl relative z-10 text-center lg:text-left">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight">
                Ready to Visit NextZen Academy?
              </h2>
              <p className="text-[#0f172a]/80 text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
                Tour the campus, meet our team, and explore the right daycare or preschool classroom for your child.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10 flex-shrink-0">
              {!isLoggedIn ? (
                <Link href="/#inquiry-form-section" className="w-full sm:w-auto block px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-95">
                  Schedule a Tour
                </Link>
              ) : (
                <Link href="/dashboard" className="w-full sm:w-auto block px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 text-white transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-95">
                  View Student Dashboard
                </Link>
              )}
              <Link href="/courses" className="w-full sm:w-auto block text-center text-slate-700 hover:text-[#F25022] bg-white border border-slate-200 hover:border-[#F25022] hover:shadow-md hover:-translate-y-0.5 shadow-sm active:scale-95 transition-all duration-300 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full">
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
