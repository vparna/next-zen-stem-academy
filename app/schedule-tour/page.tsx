import type { Metadata } from 'next';
import Link from 'next/link';
import LeadConnectorBooking from '@/components/LeadConnectorBooking';

export const metadata: Metadata = {
  title: 'Book a Tour | Schedule a Campus Visit at NextZen Academy',
  description:
    'Schedule a tour of NextZen Academy daycare and preschool campus in Woodinville / Bothell, WA. Meet our educators and explore classrooms.',
};

export default function ScheduleTourPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE6] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Campus Information */}
          <section className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center rounded-full bg-[#F25022]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#F25022]">
              Campus Tours
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f2e57] leading-tight">
              Schedule a Daycare or Preschool Campus Tour
            </h1>
            <p className="text-base md:text-lg text-[#1f2e57]/75 font-medium leading-relaxed">
              Meet our team, tour the classrooms, and choose the best daycare or preschool program for your family.
            </p>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                ['🏫', 'See the campus', 'Walk through our daycare and preschool classrooms.'],
                ['👩‍🏫', 'Meet the team', 'Connect with the educators who will support your child.'],
                ['📅', 'Pick a time', 'Select a convenient time opening on the calendar.'],
              ].map(([icon, title, copy]) => (
                <div key={title} className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{icon}</div>
                  <div>
                    <h2 className="text-base font-black text-[#1f2e57] mb-1">{title}</h2>
                    <p className="text-xs sm:text-sm text-[#1f2e57]/70 font-semibold leading-relaxed">{copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-black text-[#1f2e57]">What happens next?</h2>
              <ul className="space-y-2 text-sm font-semibold text-[#1f2e57]/75">
                <li>• Choose your preferred available date and time.</li>
                <li>• Receive an automatic confirmation email and calendar invite.</li>
                <li>• Our admissions team will be ready to welcome your family!</li>
              </ul>
              <div className="pt-2">
                <Link href="/courses" className="inline-flex text-xs font-black uppercase tracking-wider text-[#00A4EF] hover:underline">
                  Explore daycare &amp; preschool programs →
                </Link>
              </div>
            </div>
          </section>

          {/* Right Column: LeadConnector Booking Widget */}
          <section className="lg:col-span-7">
            <LeadConnectorBooking minHeight="720px" />
          </section>
        </div>
      </div>
    </main>
  );
}
