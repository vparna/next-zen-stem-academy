import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <footer className="bg-slate-900 text-white">
      {/* Wave top divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 text-slate-100 fill-current">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-44">
                <Image
                  src={`${basePath}/brand-logo2.png`}
                  alt="NextZen Academy Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Empowering young minds through innovative education with our unique 3S philosophy — STEM, Skills, and Success.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5a1 1 0 11-1-1 1 1 0 011 1zM21 7.3A14 14 0 0012 4a14 14 0 00-9 3.3v9.4A14 14 0 0012 20a14 14 0 009-3.3z' },
                { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/courses', label: 'Courses' },
                { href: '/careers', label: 'Careers' },
                { href: '/hours', label: 'Class Hours' },
                { href: '/support', label: 'Support' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-400">✉</span>
                <span>info@nextzenacademy.com</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-400">📞</span>
                <span>(425) 374-1463</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-400">📍</span>
                <span>21304 State Route 9 SE,<br />Woodinville WA 98072</span>
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Our Programs</p>
              <div className="flex gap-2 flex-wrap">
                {['🤖 Robotics', '🧮 Mathematics', '♟️ Chess'].map((p) => (
                  <span key={p} className="text-xs bg-white/10 text-slate-300 rounded-full px-3 py-1">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} NextZen Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/support" className="hover:text-orange-400 transition">Privacy Policy</Link>
            <Link href="/support" className="hover:text-orange-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
