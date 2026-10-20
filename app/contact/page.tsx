import type { Metadata } from 'next';
import Link from 'next/link';
import LeadConnectorContactForm from '@/components/LeadConnectorContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | NextZen Academy Bothell & Woodinville',
  description:
    'Contact NextZen Academy daycare and preschool. Send us a message, give us a call at (425) 325-0431, or visit our Woodinville/Bothell campus.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ── Page Header / Hero ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F25022]/10 border border-[#F25022]/20 text-[#F25022] text-xs font-black uppercase tracking-widest">
            📬 Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1f2e57] tracking-tight">
            Contact <span className="text-[#F25022]">NextZen</span> Academy
          </h1>
          <p className="text-base sm:text-lg text-[#1f2e57]/75 font-medium leading-relaxed">
            Have questions about our infant daycare, toddler care, or preschool programs?
            Send us a message or speak directly with our admissions team.
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Details & Campus Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1f2e57]">
                We&apos;re Here to Help
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you&apos;re exploring childcare options for your infant, toddler, or preschooler, our friendly team is ready to assist you.
              </p>

              <div className="space-y-4 pt-2">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-orange-50/50 hover:border-orange-100">
                  <div className="w-10 h-10 rounded-xl bg-[#F25022]/10 text-[#F25022] flex items-center justify-center text-xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Phone Support</h3>
                    <a
                      href="tel:+14253250431"
                      className="text-base font-bold text-[#1f2e57] hover:text-[#F25022] transition-colors"
                    >
                      +1 (425) 325-0431
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Mon–Fri, 7:00 AM – 5:00 PM PST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-blue-50/50 hover:border-blue-100">
                  <div className="w-10 h-10 rounded-xl bg-[#00A4EF]/10 text-[#00A4EF] flex items-center justify-center text-xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Email Us</h3>
                    <a
                      href="mailto:info@nextzenacademy.com"
                      className="text-base font-bold text-[#1f2e57] hover:text-[#00A4EF] transition-colors break-all"
                    >
                      info@nextzenacademy.com
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Response within 24 hours</p>
                  </div>
                </div>

                {/* Campus Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-emerald-50/50 hover:border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Campus Location</h3>
                    <p className="text-sm font-bold text-[#1f2e57] leading-snug">
                      21304 State Route 9 SE<br />
                      Woodinville, WA 98072
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Convenient to Bothell &amp; Woodinville families</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                    🕒
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Operating Hours</h3>
                    <p className="text-sm font-bold text-[#1f2e57]">Monday – Friday: 7:00 AM – 5:00 PM</p>
                    <p className="text-xs text-slate-400 mt-0.5">Closed weekends and major federal holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tour Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1f2e57] to-[#0a1628] p-6 sm:p-8 text-white shadow-xl space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFB900]">
                Looking to Visit?
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                Book an In-Person Campus Tour
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Want to see the classrooms, meet the teachers, and experience the learning environment firsthand?
              </p>
              <Link
                href="/schedule-tour"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#F25022] to-[#FFB900] text-white hover:opacity-95 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Schedule Tour Openings →
              </Link>
            </div>
          </div>

          {/* Right Column: Simple CRM Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F25022]">
                  Send a Message
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f2e57] mt-1">
                  Connect With Admissions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Fill in your details below and a member of our admissions team will contact you promptly.
                </p>
              </div>

              <LeadConnectorContactForm minHeight="720px" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
