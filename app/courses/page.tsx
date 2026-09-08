import Image from 'next/image';
import Link from 'next/link';
import { childcarePrograms } from '@/lib/childcarePrograms';

const programs = childcarePrograms.filter((program) => program.slug !== 'summer-camps');

export default function CoursesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative min-h-[44vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero_img.png" alt="NextZen daycare and preschool programs" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-sm">
            🏫 Daycare & Preschool
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Explore Our Early Learning Programs
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-medium">
            From infant care through Pre-K, our programs are built to help children feel safe, supported, and ready to grow.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.slug} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={program.image} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: program.color }}>
                    {program.age}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: program.color }}>{program.tagline}</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{program.title}</h2>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">{program.description}</p>
                  <div className="mt-6 space-y-2">
                    {program.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                        <span style={{ color: program.color }}>•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href={`/programs/${program.slug}`} className="ui-pill-btn w-full text-white shadow-md" style={{ backgroundColor: program.color }}>
                      View Details
                    </Link>
                    <Link href="/#inquiry-form-section" className="ui-pill-btn w-full bg-white border border-slate-200 text-slate-700 hover:border-orange-300">
                      Schedule Tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
