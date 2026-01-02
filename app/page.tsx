'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!(token && userData));
    };
    
    // Check authentication status on mount
    checkAuth();
    
    // Listen for custom auth change events
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to NextGen Stem Academy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering young minds through innovative STEM education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition text-center"
              >
                Explore Courses
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/signup"
                  className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-900 transition border-2 border-white text-center"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3S Philosophy Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our 3S Philosophy
            </h2>
            <p className="text-xl text-gray-600">
              A holistic approach to STEM education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills</h3>
              <p className="text-gray-600">
                Develop practical skills in robotics, mathematics, and strategic thinking through hands-on learning experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Science</h3>
              <p className="text-gray-600">
                Explore scientific concepts and principles through experimentation and discovery-based learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Success</h3>
              <p className="text-gray-600">
                Build confidence and achieve success through personalized guidance and measurable progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Courses
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our range of specialized programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Robotics</h3>
              <p className="text-gray-600 mb-4">
                Learn to build and program robots while developing problem-solving skills.
              </p>
              <Link
                href="/courses?category=Robotics"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Learn More →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🔢</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Mathematics</h3>
              <p className="text-gray-600 mb-4">
                Master mathematical concepts through interactive and engaging methods.
              </p>
              <Link
                href="/courses?category=Maths"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Learn More →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-5xl mb-4">♟️</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Chess</h3>
              <p className="text-gray-600 mb-4">
                Develop strategic thinking and decision-making skills through chess.
              </p>
              <Link
                href="/courses?category=Chess"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">💼</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Are you passionate about STEM education? We're looking for talented individuals to help us empower the next generation of innovators.
            </p>
            <Link
              href="/careers"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your STEM Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students already learning with NextGen Stem Academy
          </p>
          {!isLoggedIn && (
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition inline-block"
            >
              Enroll Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
