import PaymentForm from '@/components/PaymentForm'
import Link from 'next/link'

export const metadata = {
  title: 'Chess Course - Strategy - Next Zen STEM Academy',
  description: 'Learn strategic thinking through the ancient game of chess',
}

export default function ChessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/courses" className="text-white hover:underline">Courses</Link>
            <span className="mx-2">/</span>
            <span>Chess</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">Strategy</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Chess Course</h1>
          <p className="text-xl max-w-3xl">
            Learn strategic thinking through the ancient game of chess. Plan ahead, think critically, win decisively.
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
                  Our Chess course goes beyond learning moves. Students will develop strategic thinking, pattern recognition, 
                  and decision-making skills that apply far beyond the chessboard. From beginner fundamentals to advanced tactics, 
                  we cover everything you need to become a strong player.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-2">8</div>
                    <div className="text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-2">16</div>
                    <div className="text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-2">50+</div>
                    <div className="text-gray-600">Puzzles</div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Opening Strategies</h3>
                      <p className="text-gray-600">Master popular openings and understand the principles behind strong opening play.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tactical Patterns</h3>
                      <p className="text-gray-600">Learn to recognize and execute tactical combinations including pins, forks, and skewers.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Middlegame Strategy</h3>
                      <p className="text-gray-600">Develop positional understanding and learn to create and exploit advantages.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Endgame Mastery</h3>
                      <p className="text-gray-600">Master essential endgames and learn how to convert winning positions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tournament Preparation</h3>
                      <p className="text-gray-600">Get ready for competitive play with time management and psychological preparation.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Live Online Sessions</h4>
                      <p className="text-sm text-gray-600">Interactive lessons with expert instructors</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Online Platform Access</h4>
                      <p className="text-sm text-gray-600">Practice on premium chess platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personal Analysis</h4>
                      <p className="text-sm text-gray-600">Get your games reviewed by coaches</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Tournament Opportunities</h4>
                      <p className="text-sm text-gray-600">Participate in organized tournaments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Knowledge of basic chess rules (we offer free beginner sessions)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Suitable for all skill levels from beginners to advanced
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Passion for learning and improvement
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar - Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PaymentForm 
                  courseName="Chess Course"
                  price="$199"
                  courseId="chess"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
