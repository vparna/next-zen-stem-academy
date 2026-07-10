import Link from 'next/link';
import Image from 'next/image';

// Custom parameters for Suspense/dynamic loading since searchParams are used
export const metadata = {
  title: 'Future Campus Expansion | NextZen Academy',
  description: 'NextZen Academy is expanding! Pre-register for our upcoming STEAM and Early Learning campus locations in Redmond, Bellevue, and Seattle.',
};

export default function FutureExpansionPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  return (
    <main className="min-h-screen bg-[#f5f1ec] flex flex-col justify-between">
      {/* ── Content Container ── */}
      <section className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center items-center text-center">
        
        {/* Animated Map Icon / Blob */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00A4EF]/10 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-2 bg-[#00A4EF]/20 rounded-full animate-pulse" />
          <div className="relative w-16 h-16 bg-[#00A4EF] rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
            📍
          </div>
        </div>

        {/* Eyebrow */}
        <span className="text-xs font-black uppercase tracking-widest text-[#F25022] bg-[#F25022]/10 px-4 py-1.5 rounded-full mb-4">
          Future Campus Expansion
        </span>

        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f2e57] tracking-tight leading-tight mb-4">
          NextZen Academy is Coming Soon!
        </h1>

        {/* Description */}
        <p className="text-[#1f2e57]/70 text-base md:text-lg max-w-xl font-medium leading-relaxed mb-10">
          We are currently preparing our state-of-the-art STEAM Labs &amp; Childcare spaces for our upcoming locations. Pre-register today to lock in early bird rates and receive campus progress updates.
        </p>

        {/* Expansion Highlights / Cards */}
        <div className="grid sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          {[
            { city: 'Redmond', timeframe: 'Winter 2027', color: '#F25022' },
            { city: 'Bellevue', timeframe: 'Spring 2027', color: '#7FBA00' },
            { city: 'Seattle', timeframe: 'Fall 2027', color: '#00A4EF' },
          ].map((loc) => (
            <div
              key={loc.city}
              className="bg-white rounded-2xl p-6 border-t-4 shadow-sm hover:shadow-md transition-all text-center"
              style={{ borderTopColor: loc.color }}
            >
              <h3 className="font-serif text-lg font-bold text-[#1f2e57]">{loc.city}</h3>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Target Launch</p>
              <p className="text-sm font-black mt-0.5" style={{ color: loc.color }}>{loc.timeframe}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#inquiry-form-section"
            className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest text-white bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Pre-Register Now
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-full font-black text-xs text-center uppercase tracking-widest text-[#1f2e57] bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            Explore Woodinville Campus (Active)
          </Link>
        </div>

      </section>
    </main>
  );
}
