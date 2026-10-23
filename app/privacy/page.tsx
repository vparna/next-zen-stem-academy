import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NextZen Academy',
  description:
    'Learn how NextZen Academy collects, uses, protects, and handles your personal data, Google user information, children\'s data under COPPA, and your data deletion rights.',
  alternates: {
    canonical: 'https://www.nextzenacademy.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | NextZen Academy',
    description:
      'Our commitment to privacy, data protection, Google OAuth compliance, COPPA compliance, and secure handling of parent and student records.',
    url: 'https://www.nextzenacademy.com/privacy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 15, 2026';
  const effectiveDate = 'January 1, 2026';

  const sections = [
    { id: 'introduction', title: '1. Introduction & Overview' },
    { id: 'information-we-collect', title: '2. Information We Collect' },
    { id: 'google-oauth', title: '3. Google User Data & OAuth Policy' },
    { id: 'coppa', title: '4. Children\'s Privacy (COPPA & FERPA)' },
    { id: 'how-we-use-info', title: '5. How We Use Your Information' },
    { id: 'sharing-disclosure', title: '6. Data Sharing & Third Parties' },
    { id: 'payments', title: '7. Payment Security (Stripe)' },
    { id: 'data-retention-deletion', title: '8. Data Retention & Deletion Process' },
    { id: 'security', title: '9. Data Security & Storage' },
    { id: 'mobile-app', title: '10. Mobile Application Permissions' },
    { id: 'your-rights', title: '11. Your Privacy Rights & Choices' },
    { id: 'contact', title: '12. Contact & Data Protection Officer' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-[#1f2e57] via-[#162244] to-[#0d162d] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00A4EF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#00A4EF] text-xs font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
            🔒 Trust, Safety &amp; Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            NextZen Academy <span className="text-[#00A4EF]">Privacy Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Your privacy and your children&apos;s digital safety are our highest priorities. This comprehensive policy details our strict standards for collecting, using, securing, and deleting your data across our daycare, preschool, STEM academy, web platform, and mobile applications.
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
              <span className="text-slate-200 font-semibold">Compliance:</span> COPPA, FERPA, Google OAuth Limited Use &amp; WA Privacy
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Highlights Strip ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Zero Data Selling</h4>
              <p className="text-xs text-slate-500 mt-0.5">We never sell, rent, or trade your personal or child data.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              🔐
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Google Limited Use</h4>
              <p className="text-xs text-slate-500 mt-0.5">Strict adherence to Google API Services User Data Policy.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              👶
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">COPPA Certified</h4>
              <p className="text-xs text-slate-500 mt-0.5">Parental control and verified consent for student records.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              🗑️
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Deletion on Demand</h4>
              <p className="text-xs text-slate-500 mt-0.5">Prompt 30-day account and student data deletion workflow.</p>
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
                <span>📑</span> Table of Contents
              </h3>
              <nav className="space-y-1.5 text-xs text-slate-600">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 px-2 rounded-md hover:bg-slate-100 hover:text-[#00A4EF] transition-colors"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                Need legal help? <br />
                <a href="mailto:info@nextzenacademy.com" className="text-[#00A4EF] font-semibold hover:underline">
                  info@nextzenacademy.com
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="introduction" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">1.</span> Introduction &amp; Overview
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  NextZen Academy (operating as <strong>NextZen Academy of Bothell</strong> and <strong>NextZen STEM Academy</strong>, herein referred to as &quot;NextZen,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and personal data of our students, parents, guardians, teachers, and website visitors.
                </p>
                <p>
                  This Privacy Policy applies to our website (<a href="https://www.nextzenacademy.com" className="text-[#00A4EF] hover:underline">https://www.nextzenacademy.com</a>), our mobile applications on Google Play Store and Apple App Store, our tour scheduling systems, our customer portal, and our physical campus located at:
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-slate-800 text-sm">
                  <p className="font-semibold text-slate-900">NextZen Academy Campus</p>
                  <p>21304 State Route 9 SE, Woodinville, WA 98072</p>
                  <p>Phone: +1 (425) 325-0431 | Email: info@nextzenacademy.com</p>
                </div>
                <p>
                  By accessing our website, creating an account, scheduling a campus tour, or enrolling in our infant daycare, preschool, or STEM enrichment courses, you acknowledge and agree to the practices described in this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">2.</span> Information We Collect
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  We collect information necessary to deliver quality early childhood care, kindergarten readiness, and STEM enrichment education, maintain physical safety on campus, and securely manage your user account.
                </p>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">A. Parent &amp; Guardian Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                    <li>Contact details (Full name, email address, phone number, physical mailing address).</li>
                    <li>Account credentials (salted and cryptographically hashed passwords, authentication tokens).</li>
                    <li>Relationship to enrolled children and authorized pickup designations with emergency contact information.</li>
                    <li>Tour preferences, scheduled tour dates, and notes submitted via our tour booking forms.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">B. Student &amp; Child Information (Provided Solely by Parents)</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                    <li>Child&apos;s full name, age, birth date, and grade level.</li>
                    <li>Enrolled program details (e.g. Infant Care, Toddler Care, Preschool, Pre-K, Robotics, Mathematics, Chess).</li>
                    <li>Medical and dietary notifications (e.g., severe allergies or emergency healthcare considerations required for classroom safety).</li>
                    <li>Daily campus attendance timestamps, QR-code check-in/check-out logs, and learning milestone progress.</li>
                  </ul>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                    <strong>Notice:</strong> We do not collect student information directly from children. All student profiles and health disclosures are submitted strictly by the child&apos;s legal parent or guardian.
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">C. Technical &amp; Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                    <li>Browser type, device model, operating system, and IP address.</li>
                    <li>Access timestamps, visited pages, and referral sources (analyzed in aggregate via privacy-friendly Google Analytics).</li>
                    <li>Authentication cookies and web session tokens used to maintain secure login sessions.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 - Google OAuth Policy */}
            <section id="google-oauth" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 scroll-mt-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-3">
                <span>🌐</span> Verified OAuth 2.0 Integration
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">3.</span> Google User Data &amp; OAuth 2.0 Policy
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  NextZen Academy provides optional Google Sign-In (&quot;Sign in with Google&quot;) to give parents and educators a secure, seamless authentication experience without having to remember separate credentials.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Google Scopes We Request:</h3>
                  <p className="text-xs text-slate-600">
                    We request only the minimum required basic identity scopes:
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-2">
                    <li><code>openid</code>: To verify your identity securely via the OpenID Connect standard.</li>
                    <li><code>https://www.googleapis.com/auth/userinfo.email</code>: To associate your account with your verified Google email address.</li>
                    <li><code>https://www.googleapis.com/auth/userinfo.profile</code>: To retrieve your full name and display avatar for your NextZen profile.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">How We Use Google User Data:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm pl-2">
                    <li>Authenticating your identity and creating or linking your NextZen parent/teacher account.</li>
                    <li>Sending transactional emails (enrollment receipts, tour confirmations, passwordless recovery).</li>
                    <li>Personalizing your user dashboard with your preferred display name.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">Strict Google User Data Protection Standards:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm pl-2">
                    <li><strong>No Sale of Google Data:</strong> We never sell, rent, or monetize Google user data under any circumstance.</li>
                    <li><strong>No Advertising or Surveillance:</strong> We do not use Google user data for advertising, retargeting, interest-based tracking, or credit-scoring.</li>
                    <li><strong>No AI Model Training:</strong> Google user data is never used to train generalized artificial intelligence (AI) or machine learning (ML) models.</li>
                    <li><strong>No Unauthorized Transfers:</strong> We do not share Google user data with external third parties except secure infrastructure providers (e.g., our encrypted database) necessary to operate the service.</li>
                  </ul>
                </div>

                {/* Google Limited Use Required Disclosure */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-sm text-blue-950 font-medium">
                  <p className="font-bold text-blue-900 mb-1">Google API Services User Data Policy Compliance:</p>
                  <p>
                    NextZen Academy&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-bold underline hover:text-blue-900"
                    >
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 - COPPA */}
            <section id="coppa" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">4.</span> Children&apos;s Privacy (COPPA &amp; FERPA Compliance)
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  As an academy providing infant care, preschool education, and STEM courses to minors, we strictly adhere to the <strong>Children&apos;s Online Privacy Protection Act (COPPA)</strong> and applicable student privacy regulations.
                </p>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">Key Children&apos;s Privacy Safeguards:</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                    <li><strong>Parental Consent:</strong> Children under 13 cannot register for an account. All student records are created and managed exclusively by their authenticated parent or guardian.</li>
                    <li><strong>Limited Data Collection:</strong> We collect only student information directly required for instructional activities, campus safety, and emergency care.</li>
                    <li><strong>No Public Profiles:</strong> Student data, attendance logs, and project files are private and visible only to authorized parents, assigned educators, and campus administrators.</li>
                    <li><strong>Parental Inspection &amp; Deletion Rights:</strong> Parents have the right at any time to review the personal information collected about their child, refuse further data collection, and request immediate deletion of child records.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="how-we-use-info" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">5.</span> How We Use Your Information
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>We use collected data strictly for the following educational and operational purposes:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                  <li>Delivering preschool, infant care, and STEM curriculum programs.</li>
                  <li>Processing campus tour reservations, parent consultations, and classroom visits.</li>
                  <li>Maintaining campus security through QR-code attendance check-in and check-out logs.</li>
                  <li>Issuing enrollment confirmations, invoices, receipts, and course completion certificates.</li>
                  <li>Sending critical notifications, such as weather closures, health alerts, or emergency notifications.</li>
                  <li>Complying with Washington State Department of Children, Youth, and Families (DCYF) licensing requirements.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="sharing-disclosure" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">6.</span> Data Sharing &amp; Third Parties
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  We do not sell, rent, lease, or monetize your personal or student data to advertisers or third parties. We disclose data solely to trusted infrastructure partners who are bound by strict data processing agreements:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Database Hosting</p>
                    <p className="text-slate-600 mt-0.5">MongoDB Atlas (Encrypted data at rest and in transit via TLS 1.3 with SOC 2 compliance).</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Payment Gateway</p>
                    <p className="text-slate-600 mt-0.5">Stripe Inc. (PCI-DSS Level 1 certified tokenized payment processing).</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Authentication Services</p>
                    <p className="text-slate-600 mt-0.5">Google Cloud OAuth 2.0 (Identity verification protocols).</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Communications &amp; Booking</p>
                    <p className="text-slate-600 mt-0.5">LeadConnector &amp; Nodemailer (Transactional email notifications and tour confirmations).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="payments" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">7.</span> Payment Security (Stripe)
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  All online payments for courses, camp enrollments, and tuition are processed through <strong>Stripe</strong>. 
                </p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-sm">
                  <p className="font-bold mb-1">PCI-DSS Level 1 Protection:</p>
                  <p>
                    NextZen Academy servers never store, receive, or process your credit card numbers, CVV security codes, or banking PINs. Payment information is sent directly from your browser to Stripe via encrypted tokenization.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 - Data Retention and Deletion Process */}
            <section id="data-retention-deletion" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 scroll-mt-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-3">
                <span>🗑️</span> Account Deletion &amp; Data Rights
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-emerald-600">8.</span> Data Retention &amp; User Deletion Process
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  We retain personal data only as long as necessary to fulfill the educational purposes for which it was collected or to comply with statutory legal and licensing obligations.
                </p>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">How to Request Account &amp; Data Deletion:</h3>
                  <p className="text-sm text-slate-600">
                    In compliance with Google Play Store, Apple App Store, and Google OAuth guidelines, users can request full deletion of their account and associated records at any time:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 pl-2">
                    <li>
                      <strong>Email Request:</strong> Send an email from your registered account email to{' '}
                      <a href="mailto:info@nextzenacademy.com?subject=Data%20Deletion%20Request" className="text-[#00A4EF] font-bold hover:underline">
                        info@nextzenacademy.com
                      </a>{' '}
                      with the subject line: <code>Data Deletion Request</code>.
                    </li>
                    <li>
                      <strong>Specify Scope:</strong> State whether you want to delete a specific child profile or your entire family account.
                    </li>
                    <li>
                      <strong>Verification &amp; Deletion:</strong> We will verify your identity within 48 hours and permanently delete your account credentials, child records, and personal profile from our active database within <strong>30 days</strong>.
                    </li>
                  </ol>
                </div>

                <div className="text-xs text-slate-500">
                  <em>Note:</em> Where required by Washington State childcare licensing laws or federal tax rules, certain financial transaction records or licensing attendance archives may be preserved in secure cold storage for the statutory retention period.
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="security" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">9.</span> Data Security &amp; Storage
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>We deploy defense-in-depth technical, physical, and administrative safeguards to protect your personal information:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                  <li><strong>Encryption in Transit:</strong> 256-bit TLS/SSL encryption for all web and mobile communications.</li>
                  <li><strong>Password Protection:</strong> Passwords are protected using salted bcrypt hash algorithms; plain-text passwords are never stored.</li>
                  <li><strong>Role-Based Access:</strong> Access to student records is strictly limited to authorized faculty, administrators, and the child&apos;s verified parents.</li>
                  <li><strong>Physical Campus Security:</strong> Encrypted QR-code scanners verify authorized pick-up persons before a student is dismissed.</li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section id="mobile-app" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">10.</span> Mobile Application Permissions
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>When using our iOS or Android mobile applications built with Capacitor, we may request the following device permissions:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm pl-2">
                  <li>
                    <strong>Camera Permission:</strong> Used exclusively to scan physical student or parent QR codes at the academy front desk for secure campus check-in. The camera feed is processed in real time on-device and is never recorded, saved, or uploaded to our servers.
                  </li>
                  <li>
                    <strong>Push Notifications (Optional):</strong> Used to notify you of emergency campus closures, child check-in confirmation, and tour reminders. You can disable notifications at any time in device settings.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section id="your-rights" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">11.</span> Your Privacy Rights &amp; Choices
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>Depending on your jurisdiction and under Washington State privacy standards, you have the right to:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1.5 text-sm pl-2">
                  <li>Access and obtain a portable copy of personal and child records held by NextZen Academy.</li>
                  <li>Request corrections to inaccurate personal or emergency contact information.</li>
                  <li>Opt-out of non-transactional marketing announcements at any time.</li>
                  <li>Revoke third-party OAuth permissions (e.g., disconnecting Google Sign-In via your Google Account Security settings).</li>
                </ul>
              </div>
            </section>

            {/* Section 12 */}
            <section id="contact" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="text-[#00A4EF]">12.</span> Contact &amp; Data Protection Officer
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  If you have questions, feedback, or data deletion requests regarding this Privacy Policy or our compliance with Google API policies, please contact our team:
                </p>
                <div className="bg-gradient-to-r from-slate-900 to-[#1f2e57] text-white p-6 rounded-2xl">
                  <h4 className="font-bold text-lg text-white mb-2">NextZen Academy Privacy Office</h4>
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
                Looking for our terms? Read our{' '}
                <Link href="/terms" className="text-[#00A4EF] font-bold hover:underline">
                  Terms &amp; Conditions
                </Link>
                .
              </div>
              <div>
                Need support? Visit our{' '}
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
