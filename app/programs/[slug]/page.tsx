import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { childcarePrograms, getProgramBySlug } from '@/lib/childcarePrograms';

// Generate static params for all programs
export async function generateStaticParams() {
  return childcarePrograms.map((p) => ({ slug: p.slug }));
}

// Generate page metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: `${program.title} | NextZen Academy`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  // Find adjacent programs for prev/next navigation
  const currentIdx = childcarePrograms.findIndex((p) => p.slug === slug);
  const prevProgram = currentIdx > 0 ? childcarePrograms[currentIdx - 1] : null;
  const nextProgram = currentIdx < childcarePrograms.length - 1 ? childcarePrograms[currentIdx + 1] : null;

  return (
    <main className="min-h-screen bg-[#f5f1ec]">

      {/* ── Hero Banner ── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {/* Background image */}
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f2e57]/90 via-[#1f2e57]/60 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 font-semibold mb-5 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#childcare-programs" className="hover:text-white transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-white/90">{program.title}</span>
          </nav>

          {/* Age badge */}
          <span
            className="inline-block text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 w-fit"
            style={{ backgroundColor: program.color, color: '#fff' }}
          >
            {program.age}
          </span>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            {program.title}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl">
            {program.tagline}
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ─ Left: Details ─ */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#1f2e57] mb-4">About This Program</h2>
              <p className="text-[#1f2e57]/75 text-base leading-relaxed font-medium">
                {program.description}
              </p>

              <ul className="mt-6 space-y-3">
                {program.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-[#1f2e57]">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-black"
                      style={{ backgroundColor: program.color }}
                    >
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#1f2e57] mb-6">Curriculum Overview</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {program.curriculum.map((item) => (
                  <div
                    key={item.area}
                    className="rounded-xl p-5 border-l-4"
                    style={{ borderLeftColor: program.color, backgroundColor: `${program.color}08` }}
                  >
                    <h3
                      className="font-black text-sm uppercase tracking-wide mb-2"
                      style={{ color: program.color }}
                    >
                      {item.area}
                    </h3>
                    <p className="text-[#1f2e57]/75 text-sm leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─ Right: Sidebar ─ */}
          <div className="space-y-6">

            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl p-7 shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#1f2e57]">Program Info</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${program.color}15` }}
                  >
                    🎂
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age Group</p>
                    <p className="text-sm font-bold text-[#1f2e57] mt-0.5">{program.age}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${program.color}15` }}
                  >
                    🕐
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</p>
                    <p className="text-sm font-bold text-[#1f2e57] mt-0.5">{program.schedule}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${program.color}15` }}
                  >
                    👩‍🏫
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Caregiver Ratio</p>
                    <p className="text-sm font-bold text-[#1f2e57] mt-0.5">{program.ratio}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/#inquiry-form-section"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-black text-sm uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 shadow-md"
                  style={{ backgroundColor: program.color }}
                >
                  Inquire About This Program
                  <span className="text-base leading-none">→</span>
                </Link>

                <Link
                  href="/#childcare-programs"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-black text-sm uppercase tracking-widest text-[#1f2e57] transition-all duration-200 hover:bg-slate-50 mt-3 border border-slate-200"
                >
                  ← All Programs
                </Link>
              </div>
            </div>

            {/* Other Programs */}
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#1f2e57] mb-4">Other Programs</h3>
              <div className="space-y-2">
                {childcarePrograms
                  .filter((p) => p.slug !== slug)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <span
                        className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <div>
                        <p className="text-sm font-black text-[#1f2e57] group-hover:underline">{p.title}</p>
                        <p className="text-xs text-slate-400 font-medium">{p.age}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          {prevProgram ? (
            <Link
              href={`/programs/${prevProgram.slug}`}
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-all group"
            >
              <span className="text-xl text-slate-400 group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Previous</p>
                <p className="font-black text-[#1f2e57] text-sm mt-0.5">{prevProgram.title}</p>
                <p className="text-xs text-slate-400">{prevProgram.age}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProgram ? (
            <Link
              href={`/programs/${nextProgram.slug}`}
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-all group text-right justify-end ml-auto w-full"
            >
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Next</p>
                <p className="font-black text-[#1f2e57] text-sm mt-0.5">{nextProgram.title}</p>
                <p className="text-xs text-slate-400">{nextProgram.age}</p>
              </div>
              <span className="text-xl text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </main>
  );
}
