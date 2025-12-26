import PaymentForm from '@/components/PaymentForm'
import Link from 'next/link'

export const metadata = {
  title: 'Robotics Course - Science - Next Zen STEM Academy',
  description: 'Master robotics and engineering through hands-on projects',
}

export default function RoboticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/courses" className="text-white hover:underline">Courses</Link>
            <span className="mx-2">/</span>
            <span>Robotics</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">Science</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Robotics Course</h1>
          <p className="text-xl max-w-3xl">
            Master the science of robotics through hands-on projects. Build, program, and innovate with cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Overview</h2>
                <p className="text-gray-600 mb-6">
                  Our Robotics course combines theoretical knowledge with practical application. Students will learn the fundamentals of 
                  robotics, programming, electronics, and mechanical design through engaging, hands-on projects.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">12</div>
                    <div className="text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">24</div>
                    <div className="text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">5+</div>
                    <div className="text-gray-600">Projects</div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Robot Design & Construction</h3>
                      <p className="text-gray-600">Learn mechanical design principles and build robots from scratch using various materials and components.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Programming & Control</h3>
                      <p className="text-gray-600">Master Arduino and Python programming to control robots and implement autonomous behaviors.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Sensor Integration</h3>
                      <p className="text-gray-600">Work with various sensors including ultrasonic, infrared, and cameras to enable robot perception.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Autonomous Systems</h3>
                      <p className="text-gray-600">Develop autonomous navigation, obstacle avoidance, and decision-making capabilities.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Competition Preparation</h3>
                      <p className="text-gray-600">Get ready for robotics competitions with advanced techniques and strategic thinking.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Basic computer skills
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Interest in science and technology
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No prior programming experience required
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar - Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PaymentForm 
                  courseName="Robotics Course"
                  price="$299"
                  courseId="robotics"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
