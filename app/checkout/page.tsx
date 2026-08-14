'use client';

import { Suspense } from 'react';
import Link from 'next/link';

function ScheduleTourContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            🏫
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a7a] mb-4">Schedule a Campus Tour</h1>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Visit our campus and see our programs in action! Schedule a personalized tour to explore our STEM labs, meet our instructors, and discover the right program for your child.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
            <div className="bg-blue-50 rounded-xl p-5">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="font-bold text-[#1a3a7a] mb-1">Explore Labs</h3>
              <p className="text-sm text-gray-600">See our state-of-the-art STEM labs and learning spaces.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5">
              <div className="text-2xl mb-2">👩‍🏫</div>
              <h3 className="font-bold text-[#1a3a7a] mb-1">Meet Instructors</h3>
              <p className="text-sm text-gray-600">Connect with our experienced educators and staff.</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-5">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-bold text-[#1a3a7a] mb-1">Get Info</h3>
              <p className="text-sm text-gray-600">Learn about programs, schedules, and how to get started.</p>
            </div>
          </div>

          <Link
            href="/#inquiry-form-section"
            className="inline-block px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 shadow-md transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Schedule a Tour Now
          </Link>
          <p className="text-sm text-gray-500 mt-4">Free · No obligation · Personalized experience</p>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link href="/courses" className="text-[#1a3a7a] font-semibold hover:underline text-sm">
              ← Browse Our Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleTourPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ScheduleTourContent />
    </Suspense>
  );
}
