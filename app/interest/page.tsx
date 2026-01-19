'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    childName: '',
    childAge: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        childName: '',
        childAge: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(10, 10)">
                  <path d="M20 5 L30 10 L30 25 L20 30 L10 25 L10 10 Z" 
                        fill="white" 
                        stroke="#e0e7ff" 
                        strokeWidth="2"/>
                  <circle cx="20" cy="17.5" r="3" fill="#3b82f6"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" 
                           stroke="#3b82f6" 
                           strokeWidth="1.5" 
                           fill="none"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" 
                           stroke="#3b82f6" 
                           strokeWidth="1.5" 
                           fill="none"
                           transform="rotate(60 20 17.5)"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" 
                           stroke="#3b82f6" 
                           strokeWidth="1.5" 
                           fill="none"
                           transform="rotate(-60 20 17.5)"/>
                </g>
              </svg>
              <div>
                <h1 className="text-2xl font-bold">Next Zen Academy</h1>
                <p className="text-blue-100 text-sm">Where Skills Meet Success</p>
              </div>
            </div>
            <Link href="/" className="text-white hover:text-blue-100 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Banner */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6 text-center">
              <div className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-lg mb-4 animate-pulse">
                🎉 COMING SOON 🎉
              </div>
              <h2 className="text-4xl font-bold mb-3">Express Your Interest</h2>
              <p className="text-xl text-blue-100">Join the future of learning at Next Zen Academy!</p>
            </div>

            {/* Courses Offered */}
            <div className="py-8 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Courses We Offer
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Robotics */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-5xl mb-4 text-center">🤖</div>
                  <h4 className="text-xl font-bold text-blue-600 text-center mb-2">Robotics</h4>
                  <p className="text-gray-600 text-center text-sm">
                    Build, code, and innovate with cutting-edge robotics technology
                  </p>
                </div>

                {/* Chess */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-5xl mb-4 text-center">♟️</div>
                  <h4 className="text-xl font-bold text-purple-600 text-center mb-2">Chess</h4>
                  <p className="text-gray-600 text-center text-sm">
                    Master strategic thinking and problem-solving through chess
                  </p>
                </div>

                {/* Mathematics */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-5xl mb-4 text-center">🔢</div>
                  <h4 className="text-xl font-bold text-indigo-600 text-center mb-2">Mathematics</h4>
                  <p className="text-gray-600 text-center text-sm">
                    Develop logical thinking and mathematical excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interest Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-3xl font-bold text-green-600 mb-3">Thank You!</h3>
                <p className="text-gray-600 text-lg mb-6">
                  We've received your interest. Our team will contact you soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Fill in Your Details
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Parent Name */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    {/* Course Interest */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Course Interest *
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a course</option>
                        <option value="Robotics">🤖 Robotics</option>
                        <option value="Chess">♟️ Chess</option>
                        <option value="Mathematics">🔢 Mathematics</option>
                        <option value="Multiple">Multiple Courses</option>
                      </select>
                    </div>

                    {/* Child Name */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Child's Name
                      </label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your child's name"
                      />
                    </div>

                    {/* Child Age */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Child's Age
                      </label>
                      <input
                        type="number"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        min="3"
                        max="18"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your interest or any questions you have..."
                    />
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Express Interest 🚀'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Why Choose Us */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Next Zen Academy?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🎯</div>
                <h4 className="font-bold mb-1">3S Philosophy</h4>
                <p className="text-blue-100 text-sm">Skills, Science & Success</p>
              </div>
              <div>
                <div className="text-4xl mb-2">👨‍🏫</div>
                <h4 className="font-bold mb-1">Expert Teachers</h4>
                <p className="text-blue-100 text-sm">Certified & Experienced</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💡</div>
                <h4 className="font-bold mb-1">Hands-on Learning</h4>
                <p className="text-blue-100 text-sm">Practical & Interactive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2026 Next Zen Academy. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Building future leaders through quality education</p>
        </div>
      </div>
    </div>
  );
}
