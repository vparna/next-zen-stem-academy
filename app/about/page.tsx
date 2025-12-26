import Link from 'next/link'

export const metadata = {
  title: 'About Us - Next Zen STEM Academy',
  description: 'Learn about our mission to prepare future generations for AI',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Next Zen STEM Academy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering the next generation to thrive in an AI-driven world through Science, Speed, and Strategy
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At Next Zen STEM Academy, we believe that the future belongs to those who can effectively compete 
                and collaborate with Artificial Intelligence. Our mission is to equip students with the essential 
                skills needed to thrive in this rapidly evolving technological landscape.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Through our innovative curriculum focused on the three S&apos;s - Science, Speed, and Strategy - 
                we prepare students not just for academic success, but for real-world challenges and opportunities.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Vision</h3>
                    <p className="text-gray-600">To be the leading platform for preparing future generations for the AI era</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">
                    💡
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                    <p className="text-gray-600">Cutting-edge curriculum that evolves with technology</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">
                    🤝
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                    <p className="text-gray-600">Building a supportive learning environment for all students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3S Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The 3S Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach combines three fundamental pillars that form the foundation of success in the modern world
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl">
                  <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                    S₁
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Science - Robotics</h3>
                  <p className="text-gray-600 mb-4">
                    Science forms the foundation of understanding how the world works. Through robotics, students learn 
                    engineering principles, programming, and problem-solving - essential skills for creating and 
                    working with AI systems.
                  </p>
                  <p className="text-gray-600">
                    Our robotics program teaches students to think like engineers and build solutions to real-world problems.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 text-center">
                <div className="text-8xl">🤖</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-8xl">⚡</div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl">
                  <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                    S₂
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Speed - Mathematics</h3>
                  <p className="text-gray-600 mb-4">
                    In an AI-driven world, the ability to think quickly and solve problems efficiently is crucial. 
                    Our mathematics program focuses on developing rapid computational skills and mental agility.
                  </p>
                  <p className="text-gray-600">
                    Students learn to process information faster, make quick decisions, and approach problems with 
                    systematic efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl">
                  <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                    S₃
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Strategy - Chess</h3>
                  <p className="text-gray-600 mb-4">
                    Strategic thinking is the ability to plan ahead, anticipate outcomes, and make optimal decisions. 
                    Chess teaches these skills in a way that directly translates to real-world scenarios.
                  </p>
                  <p className="text-gray-600">
                    Through chess, students develop critical thinking, pattern recognition, and the ability to 
                    navigate complex decision trees - skills essential for working alongside AI.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 text-center">
                <div className="text-8xl">♟️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Readiness Matters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why AI Readiness Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world is changing rapidly, and today&apos;s students need to be prepared for tomorrow&apos;s challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI is Everywhere</h3>
              <p className="text-gray-600">
                Artificial Intelligence is transforming every industry from healthcare to education, entertainment to engineering.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Future Careers</h3>
              <p className="text-gray-600">
                Most future jobs will require working with or alongside AI systems. We prepare students for these roles.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Edge</h3>
              <p className="text-gray-600">
                Students with AI-ready skills will have a significant advantage in academics and their professional lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a new generation prepared to excel in the age of AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              View Courses
            </Link>
            <a 
              href="mailto:info@nextzen.academy" 
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
