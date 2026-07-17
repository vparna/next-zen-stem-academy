'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CampInterestPage() {
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
    <div className="min-h-screen bg-[#fafaff] font-sans selection:bg-blue-100 overflow-x-hidden relative">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent -z-10"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-[80px] sm:blur-[130px] -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-[80px] sm:blur-[130px] -z-10"></div>

      {/* Header */}
      {/* <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 shadow-lg relative z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <svg width="45" height="45" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12">
                <g transform="translate(10, 10)">
                  <path d="M20 5 L30 10 L30 25 L20 30 L10 25 L10 10 Z" fill="white" stroke="#e0e7ff" strokeWidth="2"/>
                  <circle cx="20" cy="17.5" r="3" fill="#3b82f6"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" stroke="#3b82f6" strokeWidth="1.5" fill="none" transform="rotate(60 20 17.5)"/>
                  <ellipse cx="20" cy="17.5" rx="10" ry="5" stroke="#3b82f6" strokeWidth="1.5" fill="none" transform="rotate(-60 20 17.5)"/>
                </g>
              </svg>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">NextZen Academy</h1>
                <p className="text-blue-100 text-xs sm:text-sm">Where Skills Meet Success</p>
              </div>
            </div>
            <Link href="/" className="text-white hover:text-blue-100 transition p-2 hover:bg-white/10 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </header> */}

      <main className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
        {/* Giant Typography Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-700 text-xs sm:text-sm font-bold mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            STEM Camps 2026 Registration
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="block text-slate-950">Express Your</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Interest
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed mt-8">
            Join the future of learning at NextZen Academy! Secure your spot in our highly sought-after STEM camps.
          </p>
        </div>

        {/* Camp Cards Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Camps We Offer</h3>
            <div className="h-1.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {/* Motion Mania */}
            <div className="group relative bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-[0_15px_45px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                🚀
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 mb-3">Motion Mania</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Discover the mechanics of motion and kinetic energy through engaging, hands-on physics activities! Build, test, and run your own projects.
              </p>
              <div className="mt-auto px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold w-full">
                Physics & Engineering
              </div>
            </div>

            {/* Space Study Camp */}
            <div className="group relative bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-[0_15px_45px_rgba(147,51,234,0.06)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <div className="w-20 h-20 rounded-2xl bg-purple-50 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                🌌
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 mb-3">Space Study Camp</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Explore the universe, stars, and planets in our immersive and exciting space exploration camp! Unleash your inner astronaut.
              </p>
              <div className="mt-auto px-4 py-2.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold w-full">
                Astronomy & Space
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 to-purple-200/40 blur-3xl -z-10 rounded-[3rem] opacity-75"></div>
          
          <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl relative">
            {status === 'success' ? (
              <div className="text-center py-12 sm:py-16 animate-fade-in-up">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl sm:text-5xl mx-auto mb-6 sm:mb-8 shadow-inner">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">Application Received!</h3>
                <p className="text-slate-500 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto">
                  Thank you for expressing interest. Our team will contact you shortly with the next steps.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2.5 sm:mb-3 tracking-tight">Fill in Your Details</h3>
                  <p className="text-sm sm:text-base text-slate-500 font-medium">We'll get back to you with availability and registration details.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Parent Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Your Name <span className="text-blue-600">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Email Address <span className="text-blue-600">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Phone Number <span className="text-blue-600">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm text-sm sm:text-base"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Camp Interest */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Camp Interest <span className="text-blue-600">*</span></label>
                      <div className="relative">
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 font-medium shadow-sm appearance-none cursor-pointer text-sm sm:text-base"
                        >
                          <option value="" disabled className="text-slate-400">Select a camp</option>
                          <option value="Motion Mania">🚀 Motion Mania</option>
                          <option value="Space Study Camp">🌌 Space Study Camp</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Child Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Child's Name</label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm text-sm sm:text-base"
                        placeholder="Student name"
                      />
                    </div>

                    {/* Child Age */}
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Child's Age</label>
                      <input
                        type="number"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        min="3"
                        max="18"
                        className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm text-sm sm:text-base"
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1">Additional Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-slate-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder-slate-400 font-medium shadow-sm resize-none text-sm sm:text-base"
                      placeholder="Tell us more about your interest or any questions you have..."
                    />
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-xl flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium text-sm sm:text-base">{errorMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'submitting' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>Express Interest 🚀 <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span></>
                        )}
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 sm:mt-32 bg-white/60 backdrop-blur-lg rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-white shadow-xl max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-850 mb-2 tracking-tight">Why Choose NextZen Academy?</h3>
            <p className="text-sm sm:text-base text-slate-500 font-medium">We deliver excellence through our proven methodology.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100/50 flex items-center justify-center mx-auto mb-4 sm:mb-5 text-2xl sm:text-3xl">
                🎯
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2">3S Philosophy</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Skills, Science & Success built into every lesson.</p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-purple-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100/50 flex items-center justify-center mx-auto mb-4 sm:mb-5 text-2xl sm:text-3xl">
                👨‍🏫
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Expert Teachers</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Certified & Experienced professionals guiding you.</p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-indigo-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-100/50 flex items-center justify-center mx-auto mb-4 sm:mb-5 text-2xl sm:text-3xl">
                💡
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Hands-on Learning</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Practical & Interactive labs to solidify concepts.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-slate-900 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12 text-center">
          <p className="mb-2 text-slate-400 font-medium text-sm sm:text-base">© 2026 NextZen Academy. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-slate-500">Building future leaders through quality education</p>
        </div>
      </footer> */}
    </div>
  );
}
