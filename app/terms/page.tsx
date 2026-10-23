import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | NextZen Academy',
  description:
    'Read the official Terms of Service and Conditions of Enrollment for NextZen Academy, covering childcare, preschool, STEM courses, campus safety, payments, and account security.',
  alternates: {
    canonical: 'https://www.nextzenacademy.com/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | NextZen Academy',
    description:
      'Official agreement governing the use of NextZen Academy programs, websites, mobile applications, and campus facilities.',
    url: 'https://www.nextzenacademy.com/terms',
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'April 15, 2026';
  const effectiveDate = 'January 1, 2026';

  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'services', title: '2. Educational & Childcare Services' },
    { id: 'accounts-auth', title: '3. User Accounts & Google Sign-In' },
    { id: 'tours-inquiries', title: '4. Campus Tours & Inquiries' },
    { id: 'tuition-billing', title: '5. Tuition, Fees & Payment Processing' },
    { id: 'cancellation-refunds', title: '6. Cancellations, Withdrawals & Refunds' },
    { id: 'campus-safety-qr', title: '7. Campus Safety, QR Codes & Attendance' },
    { id: 'medical-emergencies', title: '8. Medical Emergency Authorization & Illness Policy' },
    { id: 'acceptable-use', title: '9. Code of Conduct & Acceptable Use' },
    { id: 'intellectual-property', title: '10. Intellectual Property Rights' },
    { id: 'disclaimers-liability', title: '11. Disclaimers & Limitation of Liability' },
    { id: 'termination', title: '12. Suspension & Termination' },
    { id: 'governing-law', title: '13. Governing Law & Dispute Resolution' },
    { id: 'contact', title: '14. Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-[#1f2e57] via-[#162244] to-[#0d162d] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F25022_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/20 text-[#F25022] text-xs font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
            📜 Official Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            NextZen Academy <span className="text-[#FFB900]">Terms &amp; Conditions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Please read these Terms carefully before enrolling your child, booking a campus tour, or using our website and mobile applications. These Terms govern your relationship with NextZen Academy.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 border-t border-slate-700/60 pt-4">
            <div>
              <span className="text-slate-200 font-semibold">Effective Date:</span> {effectiveDate}
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div>
              <span className="text-slate-200 font-semibold">Last Revised:</span> {lastUpdated}
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div>
              <span className="text-slate-200 font-semibold">Jurisdiction:</span> State of Washington, USA
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Highlights Strip ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F25022] flex items-center justify-center font-bold text-lg flex-shrink-0">
              🤝
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Binding Contract</h4>
              <p className="text-xs text-slate-500 mt-0.5">Agreement between parents/guardians and NextZen Academy.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#00A4EF] flex items-center justify-center font-bold text-lg flex-shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Campus Safety</h4>
              <p className="text-xs text-slate-500 mt-0.5">Verified QR check-ins and authorized pickup protocols.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-[#7FBA00] flex items-center justify-center font-bold text-lg flex-shrink-0">
              💳
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Transparent Billing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Secure Stripe processing with clear refund timelines.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              🏫
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">3S Philosophy</h4>
              <p className="text-xs text-slate-500 mt-0.5">Safety, Stimulation, and Socialization in every classroom.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body with Sidebar Table of Contents ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky Table of Contents on Desktop */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <span>📑</span> Sections
              </h3>
              <nav className="space-y-1.5 text-xs text-slate-600">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 px-2 rounded-md hover:bg-slate-100 hover:text-[#F25022] transition-colors"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                Questions about these terms? <br />
                <a href="mailto:info@nextzenacademy.com" className="text-[#00A4EF] font-semibold hover:underline">
                  info@nextzenacademy.com
                </a>
              </div>
            </div>
          </aside>

          {/* Terms Content */}
          <main className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="agreement" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">1.</span> Agreement to Terms
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  These Terms &amp; Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Parent,&quot; &quot;Guardian,&quot; &quot;Student,&quot; &quot;User,&quot; or &quot;you&quot;) and <strong>NextZen Academy</strong> (operating as NextZen Academy of Bothell and NextZen STEM Academy, &quot;NextZen,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                </p>
                <p>
                  By creating an account, authenticating via Google Sign-In, booking a campus tour, or registering for our daycare, preschool, or STEM enrichment academy, you acknowledge that you have read, understood, and agree to be bound by these Terms and our companion{' '}
                  <Link href="/privacy" className="text-[#00A4EF] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p>
                  If you do not agree to all terms and conditions outlined herein, you must not access our website, applications, or enroll in our educational programs.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="services" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">2.</span> Educational &amp; Childcare Services
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  NextZen Academy provides comprehensive early childhood care, kindergarten readiness, and K-12 STEM enrichment programs grounded in our <strong>3S Philosophy: Safety, Stimulation, and Socialization</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Childcare &amp; Early Learning</p>
                    <p className="text-slate-600 mt-1">Infant Daycare (6 weeks – 12 months), Toddler Care (1 – 2.5 years), Preschool (2.5 – 4 years), and Pre-K &amp; Kindergarten Readiness (4 – 6 years).</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">STEM Enrichment Academies</p>
                    <p className="text-slate-600 mt-1">Hands-on Robotics (VEX, LEGO Spike), Mathematics, Chess masteries, coding labs, and immersive seasonal STEM summer camps.</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  NextZen Academy reserves the right to modify classroom schedules, teacher assignments, and curriculum syllabi to meet evolving student needs and public health guidelines.
                </p>
              </div>
            </section>

            {/* Section 3 - Accounts & Google Auth */}
            <section id="accounts-auth" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 scroll-mt-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-3">
                <span>🔐</span> Account Governance &amp; Social Sign-In
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">3.</span> User Accounts &amp; Google Sign-In
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">A. Account Eligibility</h3>
                  <p>
                    You must be at least 18 years old or the legal parent/guardian of an enrolled student to create an account. Minors may not register independently.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">B. Credential Confidentiality</h3>
                  <p>
                    You are solely responsible for maintaining the confidentiality of your account credentials, passwords, and QR codes. You agree to immediately notify NextZen Academy of any unauthorized access or security breach at <a href="mailto:info@nextzenacademy.com" className="text-[#00A4EF] font-bold hover:underline">info@nextzenacademy.com</a>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">C. Google Sign-In &amp; Third-Party Authentication</h3>
                  <p>
                    When registering or authenticating via <strong>Google Sign-In</strong> or other OAuth providers:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm pl-2">
                    <li>You authorize NextZen Academy to access your basic verified profile information (name, email address, profile picture) to authenticate and manage your account.</li>
                    <li>NextZen Academy adheres strictly to the Google API Services User Data Policy, ensuring your Google user data is protected and never sold or shared with advertisers.</li>
                    <li>You remain responsible for maintaining the security of your Google account credentials and two-factor authentication settings.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="tours-inquiries" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">4.</span> Campus Tours &amp; Inquiries
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  We invite prospective families to tour our campus at 21304 State Route 9 SE, Woodinville, WA 98072.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                  <li><strong>Free of Charge:</strong> Scheduling and attending a personalized campus tour is completely free with no financial obligation.</li>
                  <li><strong>Slot Availability:</strong> Tour slots are reserved on a first-come, first-served basis. If you need to reschedule or cancel your tour, we kindly ask for at least 24 hours advance notice.</li>
                  <li><strong>Campus Visitor Guidelines:</strong> All adult visitors must check in at the reception desk, present government-issued photo identification, and be accompanied by a NextZen staff member at all times while children are in session.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="tuition-billing" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">5.</span> Tuition, Fees &amp; Payment Processing (Stripe)
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  Tuition rates, registration deposits, and course fees are published on our website and provided in your enrollment agreement packet.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm pl-2">
                  <li>
                    <strong>Secure Payment Processing:</strong> Payments are processed via Stripe. By providing payment information, you represent that you are authorized to use the designated payment card or account.
                  </li>
                  <li>
                    <strong>Billing Cycles:</strong> Full-time daycare and preschool tuition is billed monthly in advance on the first of each month. STEM courses and summer camps require upfront tuition or deposit upon enrollment.
                  </li>
                  <li>
                    <strong>Discounts &amp; Promotional Codes:</strong> Multi-student sibling discounts and approved promotional codes must be applied at the time of initial checkout and cannot be applied retroactively.
                  </li>
                  <li>
                    <strong>Late Fees:</strong> Tuition payments received more than 5 days past the due date may incur a late administrative fee of $35. Repeated default may result in suspension of attendance.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="cancellation-refunds" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">6.</span> Cancellations, Withdrawals &amp; Refunds
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">A. Daycare &amp; Preschool Programs</h3>
                  <p className="text-sm text-slate-600">
                    A written <strong>30-day notice of withdrawal</strong> submitted to campus administration is required for all preschool and infant care programs. Tuition is prorated to the end of the 30-day notice period. Registration fees are non-refundable.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">B. STEM Academy Courses &amp; Summer Camps</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm pl-2">
                    <li><strong>Full Refund:</strong> Cancellations made at least 14 days prior to the first course session or camp start date receive a 100% refund (less a $25 administrative processing fee).</li>
                    <li><strong>50% Credit:</strong> Cancellations made between 7 and 13 days prior to the start date are eligible for a 50% tuition credit applicable to future courses.</li>
                    <li><strong>No Refunds:</strong> Withdrawals requested fewer than 7 days prior to or after the program start date are non-refundable due to reserved staff and kit provisioning.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 - Campus Safety & QR Codes */}
            <section id="campus-safety-qr" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 scroll-mt-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-3">
                <span>🛡️</span> 3S Safety Protocols
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-emerald-600">7.</span> Campus Safety, QR Codes &amp; Attendance
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  The physical safety and security of every child is non-negotiable. We implement rigorous check-in and check-out verification:
                </p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm">
                  <h3 className="font-bold text-slate-900">QR Code Attendance Protocol:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1.5 pl-2">
                    <li>Every parent and enrolled child is assigned a cryptographically unique QR code within the NextZen parent portal.</li>
                    <li>Parents/guardians must scan their QR code at the reception kiosk upon morning drop-off and afternoon dismissal.</li>
                    <li>Our mobile camera scanner processes QR codes strictly on-device without recording or streaming external video.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Authorized Pick-Up Only:</h3>
                  <p className="text-sm text-slate-600">
                    Children will <strong>never</strong> be released to any individual who is not explicitly designated in writing as an authorized pickup person on the child&apos;s enrollment file. Staff will check government photo ID for any individual picking up a child.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Late Pickup Policy:</h3>
                  <p className="text-sm text-slate-600">
                    All programs close promptly at 5:00 PM PST. A late pickup fee of $1.50 per minute is assessed for pickups after closing time to cover mandatory overtime staffing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 - Medical Emergencies */}
            <section id="medical-emergencies" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">8.</span> Medical Emergency Authorization &amp; Illness Policy
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Emergency Medical Treatment Authorization:</h3>
                  <p className="text-sm text-slate-600">
                    In the event of a severe medical emergency involving your child, NextZen Academy staff are authorized to administer basic first aid/CPR and to summon professional emergency medical services (911). Staff will immediately contact the parents/guardians and emergency contacts listed on file. Any associated ambulance or hospital costs are the responsibility of the parent/guardian.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Child Illness &amp; Communicable Disease Policy:</h3>
                  <p className="text-sm text-slate-600">
                    In accordance with Washington State Department of Health and DCYF licensing standards, children exhibiting fever (100.4°F or higher), vomiting, contagious rash, or active communicable symptoms may not attend campus. Children must be symptom-free for at least 24 hours without fever-reducing medication before returning to campus.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="acceptable-use" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">9.</span> Code of Conduct &amp; Acceptable Use
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  NextZen Academy maintains an inclusive, safe, and respectful environment for students, educators, and families.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                  <li><strong>Respectful Interaction:</strong> Harassment, bullying, verbal abuse, discriminatory speech, or aggressive behavior toward staff, fellow parents, or students is strictly prohibited.</li>
                  <li><strong>Equipment Care:</strong> Students must exercise reasonable care when using academy robotics kits, computers, 3D printers, and lab hardware. Willful damage may result in replacement costs charged to the parent.</li>
                  <li><strong>Digital Security:</strong> Users may not attempt to reverse engineer, disrupt, or introduce malicious code into our website, API, or learning portal.</li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section id="intellectual-property" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">10.</span> Intellectual Property Rights
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  All curriculum materials, lesson plans, robotics challenges, code examples, worksheets, videos, logos, and website software are the exclusive intellectual property of NextZen Academy or our licensors.
                </p>
                <p className="text-sm text-slate-600">
                  Enrolled students and families are granted a limited, personal, non-commercial license to access learning materials solely for their individual educational development. Commercial reproduction, public sharing, or reselling of NextZen course materials is strictly prohibited without prior written consent.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="disclaimers-liability" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">11.</span> Disclaimers &amp; Limitation of Liability
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  While NextZen Academy is committed to educational excellence and student safety, our services, website, and digital systems are provided on an &quot;as is&quot; and &quot;as available&quot; basis.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                  <p>
                    <strong>Limitation of Liability:</strong> To the maximum extent permitted by applicable law, NextZen Academy, its directors, educators, employees, and affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages arising out of your participation in academy programs or your use of digital portals.
                  </p>
                  <p>
                    Our total aggregate liability for any claims arising under these Terms shall not exceed the total tuition fees actually paid by you to NextZen Academy during the twelve (12) months preceding the incident.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section id="termination" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">12.</span> Suspension &amp; Termination
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  NextZen Academy reserves the right to suspend or terminate student enrollment or portal access for:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm pl-2">
                  <li>Repeated non-payment of tuition or fees.</li>
                  <li>Severe or persistent violation of the campus code of conduct by a student or parent.</li>
                  <li>Actions compromising the physical safety or emotional well-being of other children or staff.</li>
                </ul>
              </div>
            </section>

            {/* Section 13 */}
            <section id="governing-law" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">13.</span> Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  These Terms and any disputes arising out of or relating to your enrollment or use of NextZen Academy services shall be governed by and construed in accordance with the laws of the <strong>State of Washington, United States</strong>, without giving effect to conflicts of law principles.
                </p>
                <p className="text-sm text-slate-600">
                  Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the state or federal courts located in King County or Snohomish County, Washington.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section id="contact" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#F25022]">14.</span> Contact Information
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  For questions regarding these Terms &amp; Conditions, enrollment policies, or campus operations, please contact us:
                </p>
                <div className="bg-gradient-to-r from-slate-900 to-[#1f2e57] text-white p-6 rounded-2xl">
                  <h4 className="font-bold text-lg text-white mb-2">NextZen Academy of Bothell</h4>
                  <p className="text-slate-300 text-sm">21304 State Route 9 SE</p>
                  <p className="text-slate-300 text-sm">Woodinville, WA 98072, USA</p>
                  <p className="text-slate-300 text-sm mt-2">
                    Email:{' '}
                    <a href="mailto:info@nextzenacademy.com" className="text-[#00A4EF] font-bold hover:underline">
                      info@nextzenacademy.com
                    </a>
                  </p>
                  <p className="text-slate-300 text-sm">
                    Phone: <span className="text-white font-medium">+1 (425) 325-0431</span>
                  </p>
                  <p className="text-slate-400 text-xs mt-3">
                    Campus Operating Hours: Monday – Friday, 7:00 AM – 5:00 PM PST
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-100 rounded-2xl text-xs sm:text-sm text-slate-600">
              <div>
                Read our{' '}
                <Link href="/privacy" className="text-[#00A4EF] font-bold hover:underline">
                  Privacy Policy
                </Link>{' '}
                for full data governance details.
              </div>
              <div>
                Questions? Visit our{' '}
                <Link href="/support" className="text-[#00A4EF] font-bold hover:underline">
                  Support Center
                </Link>
                .
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
