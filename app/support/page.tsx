import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  { icon: '💳', title: 'Payment & Enrollment', desc: 'Learn about payment processing and how to enroll in courses.' },
  { icon: '🎓', title: 'Discounts & Coupons', desc: 'Understand multi-student discounts and promotional coupon codes.' },
  { icon: '👤', title: 'Account Management', desc: 'Manage your profile and your children\'s information.' },
  { icon: '🔧', title: 'Troubleshooting', desc: 'Solutions to common technical issues and errors.' },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&q=80"
            alt="Support desk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-sm font-semibold mb-5 backdrop-blur-sm">
            💬 Support Center
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            How Can We <span className="gradient-text">Help?</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl">
            Find answers to common questions and get the help you need to make the most of Next Zen Academy.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── Quick Links ── */}
        <div className="grid md:grid-cols-4 gap-5 mb-14">
          {quickLinks.map((q) => (
            <div key={q.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center card-hover">
              <div className="text-4xl mb-3">{q.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{q.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Main Content ── */}
        <div className="space-y-6">
          {/* Enrollment & Payment */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 w-full" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">💳</span>
                Enrollment &amp; Payment
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">How to Enroll in a Course</h3>
                  <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm ml-2">
                    <li>Browse available courses from the <Link href="/courses" className="text-orange-500 hover:underline font-medium">Courses page</Link></li>
                    <li>Click on a course to view details and click &quot;Enroll Now&quot;</li>
                    <li>Review the order summary on the checkout page</li>
                    <li>Enter your credit card details in the Stripe payment form</li>
                    <li>Click &quot;Pay&quot; to complete enrollment and receive a confirmation email</li>
                  </ol>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm text-slate-700 mb-2"><strong>🔒 Secure Payments:</strong> We use Stripe for secure payment processing. Your card information is never stored on our servers.</p>
                  <p className="text-sm text-slate-700"><strong>💳 Accepted:</strong> Visa, MasterCard, American Express, and Discover.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Discounts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 w-full" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">🎓</span>
                Discounts &amp; Coupons
              </h2>
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Multi-Student Discount</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span><span><strong>2 Children:</strong> 10% off the total</span></li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span><span><strong>3+ Children:</strong> 15% off the total</span></li>
                  </ul>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Coupon Codes:</strong> Enter your promo code on the checkout page. Percentage discounts, fixed amounts, and seasonal promotions are available.
                  <em className="block mt-1 text-slate-400">Note: Only one discount type can be applied at a time.</em>
                </p>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 w-full" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">👤</span>
                Account Management
              </h2>
              <div className="space-y-4 text-sm text-slate-600">
                <p><strong className="text-slate-800">My Profile:</strong> Access your <Link href="/dashboard" className="text-orange-500 hover:underline font-medium">Dashboard</Link> to update personal information and contact details.</p>
                <p><strong className="text-slate-800">My Children:</strong> Add children, view their information, enroll them in courses, and track each child's progress from your Dashboard.</p>
                <p><strong className="text-slate-800">Sign In / Sign Up:</strong> Once logged in, the Sign In and Sign Up buttons are automatically replaced with your name, Dashboard link, and Logout button.</p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-400 h-1.5 w-full" />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl">🔧</span>
                Common Issues &amp; Troubleshooting
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { color: 'red', title: '404 Errors', problem: 'Getting "Page Not Found" on profile or children pages.', solutions: ['Ensure you\'re logged in', 'Clear browser cache and cookies', 'Log out and log back in', 'Try a different browser'] },
                  { color: 'yellow', title: 'Payment Not Processing', problem: 'Payment form not showing or payment failing.', solutions: ['Verify card details are correct', 'Check card has sufficient funds', 'Disable ad blockers or extensions', 'Contact your bank if issues persist'] },
                  { color: 'blue', title: 'Cannot View Enrolled Courses', problem: 'Enrolled but can\'t see course on dashboard.', solutions: ['Refresh the dashboard page', 'Check payment was completed', 'Look for confirmation email', 'Wait a few minutes and retry'] },
                  { color: 'green', title: 'Discount Not Applied', problem: 'Multi-student discount or coupon not showing.', solutions: ['Verify children are added to account', 'Select multiple enrollments', 'Check coupon code is valid', 'Verify code is entered correctly (case-sensitive)'] },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{item.problem}</p>
                    <ul className="space-y-1">
                      {item.solutions.map((s) => (
                        <li key={s} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-orange-400 mt-0.5">→</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact Support ── */}
        <div className="mt-12 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-center text-white">
            <h2 className="text-3xl font-extrabold mb-3">Still Need Help?</h2>
            <p className="text-slate-400 mb-8 text-lg">Our support team is here to assist you.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left min-w-52">
                <h3 className="font-bold text-lg mb-2">📧 Email Support</h3>
                <p className="text-slate-300 text-sm">support@nextzenacademy.com</p>
                <p className="text-slate-500 text-xs mt-1">Response within 24 hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left min-w-52">
                <h3 className="font-bold text-lg mb-2">📞 Phone Support</h3>
                <p className="text-slate-300 text-sm">(425) 374-1463</p>
                <p className="text-slate-500 text-xs mt-1">Mon–Fri, 9am–6pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
