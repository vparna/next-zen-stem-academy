import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - NextZen Academy',
  description: 'Intelligence Beyond Academics - Learn about our mission, vision, and core values at NextZen Academy',
};

const coreValues = [
  { icon: '🌱', title: 'Curiosity', color: 'bg-green-100 text-green-700', desc: 'We encourage children to ask questions, explore ideas, and discover the joy of learning through hands-on experiences.' },
  { icon: '⚖️', title: 'Balance', color: 'bg-blue-100 text-blue-700', desc: 'True success comes from nurturing both the mind and heart — combining learning with mindfulness, play, and well-being.' },
  { icon: '❤️', title: 'Integrity', color: 'bg-red-100 text-red-700', desc: 'We model honesty, kindness, and respect, helping children develop strong values and ethical decision-making.' },
  { icon: '💪', title: 'Resilience', color: 'bg-orange-100 text-orange-700', desc: 'We teach children to embrace challenges, learn from mistakes, and grow with confidence and perseverance.' },
  { icon: '💡', title: 'Innovation', color: 'bg-amber-100 text-amber-700', desc: 'We empower young minds to think creatively, solve problems, and use technology responsibly to shape a better future.' },
  { icon: '🤝', title: 'Community', color: 'bg-purple-100 text-purple-700', desc: 'We value strong partnerships with families, educators, and the community — growing together through trust and collaboration.' },
];

const whyUs = [
  { icon: '🎓', label: 'Expert Instructors', desc: 'Experienced educators who are passionate and dedicated to student success.' },
  { icon: '👥', label: 'Small Class Sizes', desc: 'Personalized attention and optimal learning outcomes for every student.' },
  { icon: '🏫', label: 'Modern Facilities', desc: 'State-of-the-art equipment designed to inspire creativity and innovation.' },
  { icon: '🕐', label: 'Flexible Scheduling', desc: 'Multiple timings to fit your family, with weekday and weekend options.' },
  { icon: '🏆', label: 'Proven Results', desc: 'Track record of student achievements in competitions and academic excellence.' },
  { icon: '💻', label: 'Online & Offline', desc: 'Flexible options with both in-person and virtual classes available.' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80"
            alt="Children learning in classroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-sm font-semibold mb-5 backdrop-blur-sm">
            📖 Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            About NextZen{' '}
            <span className="gradient-text">Academy</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl">
            Intelligence Beyond Academics — shaping curious, confident, and compassionate learners.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10 border border-orange-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-2xl mb-6">
                🌱
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                At NextZen Academy, our mission is to nurture curious, confident, and compassionate learners by blending modern STEAM education with mindfulness, values, and balance.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We create a safe and inspiring environment where children learn to think deeply, explore freely, and grow joyfully — preparing them for both life and the future.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-10 border border-sky-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-2xl mb-6">
                🌅
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Our vision is to future-proof the next generation by raising balanced thinkers and responsible innovators ready to thrive in a rapidly changing world.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We envision a community where children grow with clarity, creativity, resilience, and purpose — carrying both wisdom and innovation into tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mx-auto">Our Core Values</h2>
            <p className="text-slate-600 text-lg mt-6">The principles that guide everything we do.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {coreValues.map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-7 shadow-lg border border-slate-100 card-hover">
                <div className={`inline-flex w-14 h-14 rounded-2xl ${v.color} items-center justify-center text-2xl mb-5`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mx-auto">Why Choose NextZen?</h2>
            <p className="text-slate-600 text-lg mt-6">What makes our academy truly stand out.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.label} className="flex gap-4 p-6 rounded-3xl border border-slate-100 bg-white shadow-md card-hover hover:border-orange-200 hover:bg-orange-50/50 transition-colors">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Join Our Family?</h2>
          <p className="text-slate-400 mb-8 text-lg">Start your child&apos;s STEAM journey today with a free trial class.</p>
          <Link href="/signup" className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all">
            Book a Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
