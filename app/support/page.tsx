import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support & Troubleshooting</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions and learn about our features
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment & Enrollment</h3>
            <p className="text-gray-600">Learn about payment processing and enrollment</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Discounts & Coupons</h3>
            <p className="text-gray-600">Understand multi-student discounts and coupon codes</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Management</h3>
            <p className="text-gray-600">Manage your profile and children information</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Enrollment & Payment */}
          <section className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-blue-600 mr-3">💳</span>
              Enrollment & Payment
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Enroll in a Course</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Browse available courses from the <Link href="/courses" className="text-blue-600 hover:underline">Courses page</Link></li>
                  <li>Click on a course to view details</li>
                  <li>Click &quot;Enroll Now&quot; button (you&apos;ll be prompted to login if not already logged in)</li>
                  <li>Review the order summary on the checkout page</li>
                  <li>Enter your credit card details in the Stripe payment form</li>
                  <li>Click &quot;Pay&quot; to complete the enrollment</li>
                  <li>You&apos;ll receive a confirmation email and can access the course from your dashboard</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Processing</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Secure Payments:</strong> We use Stripe for secure payment processing. Your credit card information is never stored on our servers.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Accepted Cards:</strong> We accept all major credit and debit cards including Visa, MasterCard, American Express, and Discover.
                  </p>
                  <p className="text-gray-700">
                    <strong>Payment Issues?</strong> If your payment fails, please verify your card details and ensure you have sufficient funds. Contact your bank if issues persist.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Viewing Enrolled Courses</h3>
                <p className="text-gray-700 mb-2">
                  Once enrolled, you can view your courses from your <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>. 
                  Your enrolled courses will be displayed with:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Course name and description</li>
                  <li>Progress tracking</li>
                  <li>Access to lessons, assignments, and quizzes</li>
                  <li>Certificate upon completion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Discounts & Coupons */}
          <section className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-green-600 mr-3">🎓</span>
              Discounts & Coupons
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Student Discount</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">
                    Save money when enrolling multiple children! Our automatic multi-student discount applies at checkout:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <div>
                        <strong>2 Children:</strong> Get 10% off the total enrollment cost
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <div>
                        <strong>3+ Children:</strong> Get 15% off the total enrollment cost
                      </div>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-3 text-sm">
                    <em>Note: The discount is automatically applied when you have children registered in your account and select multiple enrollments.</em>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Coupon Codes</h3>
                <p className="text-gray-700 mb-3">
                  We offer promotional coupon codes that can provide additional savings:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Percentage Discounts:</strong> Get a percentage off your enrollment (e.g., 20% off)</li>
                  <li><strong>Fixed Amount Discounts:</strong> Get a fixed dollar amount off (e.g., $50 off)</li>
                  <li><strong>Seasonal Promotions:</strong> Watch for special offers during holidays and back-to-school season</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>How to Use a Coupon Code:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-4">
                    <li>Add a course to your cart</li>
                    <li>On the checkout page, look for the &quot;Coupon Code&quot; field</li>
                    <li>Enter your code and click &quot;Apply&quot;</li>
                    <li>The discount will be reflected in your total</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Combining Discounts</h3>
                <p className="text-gray-700">
                  <strong>Important:</strong> Multi-student discounts and coupon codes cannot typically be combined. 
                  The system will automatically apply the best available discount for you.
                </p>
              </div>
            </div>
          </section>

          {/* Account Management */}
          <section className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-purple-600 mr-3">👤</span>
              Account Management
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">My Profile</h3>
                <p className="text-gray-700 mb-3">
                  Access your profile from the <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>View and edit your personal information</li>
                  <li>Update contact details (phone, address)</li>
                  <li>View your account email (cannot be changed through profile page)</li>
                </ul>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Troubleshooting:</strong> If you&apos;re getting a 404 error when clicking &quot;My Profile&quot;, 
                    ensure you&apos;re logged in and try clearing your browser cache. If the issue persists, contact support.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">My Children</h3>
                <p className="text-gray-700 mb-3">
                  Manage your children&apos;s information from the <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Add new children to your account</li>
                  <li>View children&apos;s information (name, age, grade)</li>
                  <li>Enroll children in courses</li>
                  <li>Track each child&apos;s progress</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Adding a Child:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-4">
                    <li>Go to Dashboard → My Children</li>
                    <li>Click "+ Add Child" button</li>
                    <li>Fill in the child's name, age, and grade</li>
                    <li>Click "Add Child"</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign In & Sign Up Issues</h3>
                <p className="text-gray-700 mb-3">
                  Once you&apos;re logged in, the Sign In and Sign Up buttons are automatically hidden and replaced with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Your name displayed in the navigation bar</li>
                  <li>Dashboard link for quick access</li>
                  <li>Logout button to sign out</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-red-600 mr-3">🔧</span>
              Common Issues & Troubleshooting
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">404 Errors</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Problem:</strong> Getting "Page Not Found" errors when clicking on My Profile or My Children
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Ensure you&apos;re logged in to your account</li>
                    <li>Clear your browser cache and cookies</li>
                    <li>Try accessing the pages directly: /dashboard/profile and /dashboard/children</li>
                    <li>Log out and log back in</li>
                    <li>Try a different browser</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Not Processing</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Problem:</strong> Payment form not showing or payment not going through
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Ensure Stripe payment gateway is properly configured</li>
                    <li>Check that your card details are correct</li>
                    <li>Verify your card has sufficient funds</li>
                    <li>Try a different card or payment method</li>
                    <li>Disable ad blockers or browser extensions that might interfere</li>
                    <li>Contact your bank to ensure they're not blocking the transaction</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cannot View Enrolled Courses</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Problem:</strong> Enrolled in a course but can&apos;t see it
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Refresh your dashboard page</li>
                    <li>Check that payment was completed successfully</li>
                    <li>Look for a confirmation email</li>
                    <li>Wait a few minutes and try again (processing may take time)</li>
                    <li>Contact support with your enrollment confirmation number</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Discount Not Applied</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Problem:</strong> Multi-student discount or coupon not showing
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Verify you have added children to your account</li>
                    <li>Ensure you&apos;re selecting multiple enrollments</li>
                    <li>Check that your coupon code is valid and not expired</li>
                    <li>Verify coupon code is entered correctly (case-sensitive)</li>
                    <li>Remember: only one discount type can be applied at a time</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-6">
            Our support team is here to assist you
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-blue-700 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-lg mb-2">📧 Email Support</h3>
              <p className="text-blue-100">support@nextzenacademy.com</p>
              <p className="text-sm text-blue-200 mt-2">Response within 24 hours</p>
            </div>
            <div className="bg-blue-700 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-lg mb-2">📱 Phone Support</h3>
              <p className="text-blue-100">1-800-STEM-EDU</p>
              <p className="text-sm text-blue-200 mt-2">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
