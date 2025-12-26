import Link from 'next/link'

export const metadata = {
  title: 'Courses - Next Zen STEM Academy',
  description: 'Explore our Robotics, Math, and Chess courses',
}

const courses = [
  {
    id: 'robotics',
    title: 'Robotics',
    subtitle: 'Science',
    description: 'Master robotics and engineering through hands-on projects. Learn programming, electronics, and mechanical design.',
    color: 'indigo',
    icon: '🤖',
    price: '$299',
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    features: [
      'Build and program robots',
      'Learn Arduino and Python',
      'Sensor integration',
      'Autonomous systems',
      'Competition preparation'
    ]
  },
  {
    id: 'maths',
    title: "Math's",
    subtitle: 'Speed',
    description: 'Develop rapid problem-solving skills with advanced mathematics. Master mental math, algebra, and computational thinking.',
    color: 'green',
    icon: '⚡',
    price: '$249',
    duration: '10 weeks',
    level: 'All Levels',
    features: [
      'Speed mathematics techniques',
      'Problem-solving strategies',
      'Competition math',
      'Logical reasoning',
      'Real-world applications'
    ]
  },
  {
    id: 'chess',
    title: 'Chess',
    subtitle: 'Strategy',
    description: 'Learn strategic thinking through chess. Develop critical thinking, pattern recognition, and decision-making skills.',
    color: 'amber',
    icon: '♟️',
    price: '$199',
    duration: '8 weeks',
    level: 'Beginner to Expert',
    features: [
      'Opening strategies',
      'Tactical patterns',
      'Endgame mastery',
      'Tournament play',
      'Online platform access'
    ]
  }
]

const colorClasses: Record<string, { from: string; to: string; text: string; hover: string; button: string }> = {
  indigo: {
    from: 'from-indigo-50',
    to: 'to-white',
    text: 'text-primary',
    hover: 'hover:border-primary',
    button: 'bg-primary hover:bg-indigo-700'
  },
  green: {
    from: 'from-green-50',
    to: 'to-white',
    text: 'text-secondary',
    hover: 'hover:border-secondary',
    button: 'bg-secondary hover:bg-green-700'
  },
  amber: {
    from: 'from-amber-50',
    to: 'to-white',
    text: 'text-accent',
    hover: 'hover:border-accent',
    button: 'bg-accent hover:bg-amber-600'
  }
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Choose from our comprehensive programs designed to develop Science, Speed, and Strategy skills
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const colors = colorClasses[course.color]
              return (
                <div 
                  key={course.id}
                  className={`bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl shadow-lg border-2 border-transparent ${colors.hover} transition-all transform hover:-translate-y-2`}
                >
                  <div className="p-8">
                    <div className="text-5xl mb-4">{course.icon}</div>
                    <div className={`text-sm font-semibold ${colors.text} mb-2`}>
                      {course.subtitle}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{course.price}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.level}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What You&apos;ll Learn:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <svg className={`w-4 h-4 mr-2 mt-0.5 ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href={`/courses/${course.id}`}
                        className={`block text-center ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition`}
                      >
                        Enroll Now
                      </Link>
                      <Link
                        href={`/courses/${course.id}`}
                        className="block text-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bundle Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Complete 3S Bundle</h2>
            <p className="text-xl mb-6 opacity-90">
              Get all three courses and save 20%
            </p>
            <div className="text-5xl font-bold mb-6">
              <span className="line-through opacity-60 text-3xl">$747</span> $599
            </div>
            <Link
              href="/courses/robotics"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Get Bundle Offer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
