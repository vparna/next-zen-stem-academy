import Link from 'next/link';
import EnrollmentForm from '@/components/EnrollmentForm';

export default function ScheduleTourPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE6] py-16 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
        <section className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-[#F25022]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#F25022]">
            Campus Tours
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1f2e57] leading-tight">
            Schedule a Daycare or Preschool Campus Tour
          </h1>
          <p className="text-base md:text-lg text-[#1f2e57]/75 font-medium leading-relaxed max-w-2xl">
            Meet our team, tour the classrooms, and choose the best daycare or preschool program for your family.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ['🏫', 'See the campus', 'Walk through our daycare and preschool classrooms.'],
              ['👩‍🏫', 'Meet the team', 'Connect with the educators who will support your child.'],
              ['📅', 'Pick a time', 'Choose from admin-managed 30-minute tour openings.'],
            ].map(([icon, title, copy]) => (
              <div key={title} className="rounded-[2rem] bg-white p-5 border border-slate-100 shadow-sm">
                <div className="text-2xl mb-3">{icon}</div>
                <h2 className="text-lg font-black text-[#1f2e57] mb-2">{title}</h2>
                <p className="text-sm text-[#1f2e57]/70 font-semibold leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#1f2e57] mb-3">What happens next?</h2>
            <ul className="space-y-2 text-sm font-semibold text-[#1f2e57]/75">
              <li>• Choose your preferred available tour slot.</li>
              <li>• Receive an automatic confirmation email.</li>
              <li>• Our admissions team receives the same tour details to prepare for your arrival.</li>
            </ul>
            <Link href="/courses" className="inline-flex mt-5 text-sm font-black uppercase tracking-wider text-[#00A4EF] hover:underline">
              Explore daycare & preschool programs →
            </Link>
          </div>
        </section>

        <EnrollmentForm />
      </div>
    </main>
  );
}
