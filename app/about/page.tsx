import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - NextZen STEM Academy',
  description: 'Intelligence Beyond Academics - Learn about our mission, vision, and core values at NextZen STEM Academy',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About NextZen STEM Academy</h1>
          <p className="text-xl text-blue-100">
            Intelligence Beyond Academics
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🌱 Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At NextZen STEM Academy, our mission is to nurture curious, confident, and compassionate learners by blending modern STEM education with mindfulness, values, and balance.
            </p>
            <p className="text-lg text-gray-600">
              We create a safe and inspiring environment where children learn to think deeply, explore freely, and grow joyfully—preparing them for both life and the future.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🌅 Vision</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our vision is to future-proof the next generation by raising balanced thinkers and responsible innovators who are ready to thrive in a rapidly changing world.
            </p>
            <p className="text-lg text-gray-600">
              We envision a community where children grow with clarity, creativity, resilience, and purpose, carrying both wisdom and innovation into tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ❤️ Core Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">1️⃣ Curiosity</h3>
              <p className="text-gray-600">
                We encourage children to ask questions, explore ideas, and discover the joy of learning through hands-on experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">2️⃣ Balance</h3>
              <p className="text-gray-600">
                We believe true success comes from nurturing both the mind and the heart—combining learning with mindfulness, play, and well-being.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">3️⃣ Integrity</h3>
              <p className="text-gray-600">
                We model honesty, kindness, and respect, helping children develop strong values and ethical decision-making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">4️⃣ Resilience</h3>
              <p className="text-gray-600">
                We teach children to embrace challenges, learn from mistakes, and grow with confidence and perseverance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">5️⃣ Innovation</h3>
              <p className="text-gray-600">
                We empower young minds to think creatively, solve problems, and use technology responsibly to shape a better future.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">6️⃣ Community</h3>
              <p className="text-gray-600">
                We value strong partnerships with families, educators, and the community—growing together through trust and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose NextZen STEM Academy?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced educators who are passionate about education and dedicated to student success.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Small Class Sizes</h3>
              <p className="text-gray-600">
                Our small class sizes ensure personalized attention and optimal learning outcomes for every student.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art equipment and learning spaces designed to inspire creativity and innovation.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Multiple batch timings to fit your family's schedule, with both weekday and weekend options.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Proven Results</h3>
              <p className="text-gray-600">
                Track record of student achievements in competitions and academic excellence.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Online & Offline</h3>
              <p className="text-gray-600">
                Flexible learning options with both in-person and online classes available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
