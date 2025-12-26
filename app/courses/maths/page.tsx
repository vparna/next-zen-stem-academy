import PaymentForm from '@/components/PaymentForm'
import Link from 'next/link'

export const metadata = {
  title: "Math's Course - Speed - Next Zen STEM Academy",
  description: 'Develop rapid problem-solving skills through advanced mathematics',
}

export default function MathsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/courses" className="text-white hover:underline">Courses</Link>
            <span className="mx-2">/</span>
            <span>Math&apos;s</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">Speed</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Math&apos;s Course</h1>
          <p className="text-xl max-w-3xl">
            Develop rapid problem-solving skills through advanced mathematics. Think faster, solve smarter.
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
                  Our Math&apos;s course is designed to enhance computational speed and accuracy. Students will master techniques for rapid 
                  mental calculations, advanced problem-solving strategies, and develop a deep understanding of mathematical concepts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-2">10</div>
                    <div className="text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-2">20</div>
                    <div className="text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-2">100+</div>
                    <div className="text-gray-600">Exercises</div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Speed Mathematics</h3>
                      <p className="text-gray-600">Master Vedic math techniques and shortcuts for lightning-fast mental calculations.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Problem-Solving Strategies</h3>
                      <p className="text-gray-600">Learn systematic approaches to tackle complex mathematical problems efficiently.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Competition Mathematics</h3>
                      <p className="text-gray-600">Prepare for Math Olympiads and competitions with advanced topics and techniques.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Logical Reasoning</h3>
                      <p className="text-gray-600">Develop critical thinking and logical reasoning skills applicable beyond mathematics.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-World Applications</h3>
                      <p className="text-gray-600">Understand how mathematics applies to real-world scenarios and emerging technologies.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Covered */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Topics Covered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Arithmetic</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Mental calculation techniques</li>
                      <li>• Number theory</li>
                      <li>• Percentages & ratios</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Algebra</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Equations & inequalities</li>
                      <li>• Polynomials</li>
                      <li>• Functions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Geometry</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Shapes & patterns</li>
                      <li>• Spatial reasoning</li>
                      <li>• Coordinate geometry</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Logic</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Puzzles & brain teasers</li>
                      <li>• Combinatorics</li>
                      <li>• Probability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Basic arithmetic knowledge
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Suitable for all levels
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Enthusiasm for learning mathematics
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar - Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PaymentForm 
                  courseName="Math's Course"
                  price="$249"
                  courseId="maths"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
