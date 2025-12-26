import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Next Generation <span className="text-primary">STEM Education</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering future generations through <span className="font-semibold text-primary">Science</span>, 
              <span className="font-semibold text-secondary"> Speed</span>, and 
              <span className="font-semibold text-accent"> Strategy</span>
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Prepare to compete and collaborate with Artificial Intelligence through our innovative courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses" 
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105"
              >
                Explore Courses
              </Link>
              <Link 
                href="/about" 
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3S Concept Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The 3S Concept</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach combines three fundamental pillars to build a brighter future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Science - Robotics */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                S
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Science</h3>
              <p className="text-gray-600 mb-6">
                Master the fundamentals of robotics and engineering. Build, program, and innovate with cutting-edge technology.
              </p>
              <Link 
                href="/courses/robotics" 
                className="inline-flex items-center text-primary font-semibold hover:text-indigo-700"
              >
                Explore Robotics
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Speed - Math's */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                S
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Speed</h3>
              <p className="text-gray-600 mb-6">
                Develop rapid problem-solving skills through advanced mathematics. Think faster, solve smarter.
              </p>
              <Link 
                href="/courses/maths" 
                className="inline-flex items-center text-secondary font-semibold hover:text-green-700"
              >
                Explore Math&apos;s
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Strategy - Chess */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                S
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategy</h3>
              <p className="text-gray-600 mb-6">
                Learn strategic thinking through the ancient game of chess. Plan ahead, think critically, win decisively.
              </p>
              <Link 
                href="/courses/chess" 
                className="inline-flex items-center text-accent font-semibold hover:text-amber-600"
              >
                Explore Chess
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Next Zen STEM Academy?</h2>
            <p className="text-xl text-gray-600">Preparing today&apos;s learners for tomorrow&apos;s AI-driven world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from industry professionals and certified educators</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Ready Curriculum</h3>
                <p className="text-gray-600">Future-proof skills for the age of artificial intelligence</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Learning</h3>
                <p className="text-gray-600">Practice-based approach with real-world projects</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-gray-600">Track record of student success and achievements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students already learning with Next Zen STEM Academy
          </p>
          <Link 
            href="/courses" 
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Enroll Today
          </Link>
        </div>
      </section>
    </div>
  )
}
