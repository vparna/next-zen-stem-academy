'use client';

import { Suspense } from 'react';
import Link from 'next/link';

function ScheduleTourContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] p-8 text-white text-center">
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Schedule a Campus Tour</h1>
            <p className="text-blue-200 text-sm">NextZen Academy — Visit Us Today</p>
          </div>

          <div className="p-8 space-y-6">
            <p className="text-gray-600 text-center">
              We&apos;d love to show you around! Schedule a personalized campus tour to explore our programs, meet our instructors, and find the perfect fit for your child.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                <span className="text-xl">🔬</span>
                <div>
                  <h3 className="font-bold text-[#1a3a7a] text-sm">Hands-on Lab Experience</h3>
                  <p className="text-xs text-gray-600">See our STEM labs and robotics equipment in action.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                <span className="text-xl">👩‍🏫</span>
                <div>
                  <h3 className="font-bold text-[#1a3a7a] text-sm">Meet Our Team</h3>
                  <p className="text-xs text-gray-600">Chat with instructors and learn about our teaching approach.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
                <span className="text-xl">📅</span>
                <div>
                  <h3 className="font-bold text-[#1a3a7a] text-sm">Flexible Scheduling</h3>
                  <p className="text-xs text-gray-600">Choose a time that works best for your family.</p>
                </div>
              </div>
            </div>

            <Link
              href="/#inquiry-form-section"
              className="w-full inline-block text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 px-8 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Schedule a Tour
            </Link>

            <p className="text-center text-xs text-gray-400">
              🏫 Free campus tour · No obligation
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/courses"
            className="text-[#1a3a7a] font-semibold hover:underline text-sm"
          >
            ← Browse Our Programs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleTourPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <ScheduleTourContent />
    </Suspense>
  );
}
