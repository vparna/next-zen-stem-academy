import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Next Zen STEM Academy',
  description: 'Learn more about Next Zen STEM Academy and our 3S philosophy for innovative STEM education',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Next Zen STEM Academy</h1>
          <p className="text-xl text-blue-100">
            Transforming education through innovation, dedication, and our unique 3S philosophy
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At Next Zen STEM Academy, we believe that every child has the potential to excel in STEM fields. 
              Our mission is to provide world-class education that combines technical skills with creative 
              thinking and problem-solving abilities.
            </p>
            <p className="text-lg text-gray-600">
              Through our innovative 3S philosophy—Skills, Science, and Success—we create an environment 
              where students can explore, experiment, and excel in Robotics, Mathematics, and Chess.
            </p>
          </div>
        </div>
      </section>

      {/* 3S Philosophy Detail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            The 3S Philosophy
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Skills Development</h3>
                <p className="text-gray-600 mb-4">
                  We focus on building practical, hands-on skills that students can apply in real-world 
                  scenarios. From coding and robotics to advanced mathematics and strategic thinking, 
                  our curriculum is designed to prepare students for the future.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Hands-on learning experiences</li>
                  <li>Project-based curriculum</li>
                  <li>Industry-relevant skills</li>
                  <li>Peer collaboration</li>
                </ul>
              </div>
              <div className="flex-1 bg-blue-100 p-8 rounded-lg">
                <p className="text-6xl text-center">🎓</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Scientific Thinking</h3>
                <p className="text-gray-600 mb-4">
                  We nurture curiosity and scientific thinking by encouraging students to ask questions, 
                  conduct experiments, and discover solutions independently. Our approach develops critical 
                  thinking and analytical skills.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Inquiry-based learning</li>
                  <li>Experimental approach</li>
                  <li>Critical analysis</li>
                  <li>Evidence-based reasoning</li>
                </ul>
              </div>
              <div className="flex-1 bg-green-100 p-8 rounded-lg">
                <p className="text-6xl text-center">🔬</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Success Mindset</h3>
                <p className="text-gray-600 mb-4">
                  We believe that success is a journey, not a destination. Through personalized guidance, 
                  continuous feedback, and celebration of achievements, we help students build confidence 
                  and develop a growth mindset.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Personalized learning paths</li>
                  <li>Regular progress tracking</li>
                  <li>Confidence building</li>
                  <li>Goal-oriented approach</li>
                </ul>
              </div>
              <div className="flex-1 bg-yellow-100 p-8 rounded-lg">
                <p className="text-6xl text-center">✨</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Next Zen STEM Academy?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced educators who are passionate about STEM and dedicated to student success.
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
