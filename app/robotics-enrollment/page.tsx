'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoboticsEnrollmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    emergencyContact: '',
    priorExperience: '',
    earlyBird: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    else if (isNaN(Number(formData.age)) || Number(formData.age) < 5 || Number(formData.age) > 16)
      newErrors.age = 'Age must be between 5 and 16';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail))
      newErrors.parentEmail = 'Please enter a valid email';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/payment?amount=100&program=robotics');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-20 w-24 h-24 border-4 border-orange-300 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-white rounded-full animate-pulse" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Limited Seats Available
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Robotics Program Enrollment
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Empower your child with hands-on robotics training and prepare them for FIRST LEGO League competitions!
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="max-w-6xl mx-auto px-4 py-16" id="overview">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a7a] mb-3">Program Overview</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A week-long intensive robotics training designed to inspire young innovators and build real-world STEM skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Date */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📅
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Training Dates</h3>
            <p className="text-gray-600">August 17, 2026 – August 24, 2026</p>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🕘
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Daily Schedule</h3>
            <p className="text-gray-600">9:00 AM to 3:00 PM PST</p>
          </div>

          {/* Venue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📍
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Venue</h3>
            <p className="text-gray-600">NextZen Academy</p>
          </div>

          {/* Kits */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🤖
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Robotics Kits Provided</h3>
            <p className="text-gray-600">All students receive robotics kits — no need to purchase separately</p>
          </div>

          {/* Instructors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Expert Instructors</h3>
            <p className="text-gray-600">Taught by experienced coaches who have participated in FIRST LEGO League (FLL) competitions</p>
          </div>

          {/* FLL Prep */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">FLL Competition Prep</h3>
            <p className="text-gray-600">Prepares students for FIRST LEGO League (FLL) — Ages 5–16</p>
          </div>
        </div>

        {/* Pricing & Demo */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1a3a7a] to-[#2563eb] text-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-2xl font-bold mb-2">Total Program Cost</h3>
            <p className="text-5xl font-black mb-2">$400</p>
            <p className="text-blue-200 text-sm mb-2">Reserve your seat with just a $100 deposit</p>
            <div className="bg-white/10 rounded-xl p-3 mt-3">
              <p className="text-orange-300 font-bold text-sm">🎉 Early-Bird Discount: $50 off!</p>
              <p className="text-blue-200 text-xs">Register before August 10, 2026 and pay only $350</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-2xl font-bold mb-2">Free Demo Class</h3>
            <p className="text-lg font-semibold mb-2">August 15, 2026 — 3:00 PM to 6:00 PM</p>
            <p className="text-orange-100 text-sm">Experience our teaching style before enrolling — completely free!</p>
            <a
              href="#enrollment-form"
              className="inline-block mt-4 bg-white text-orange-600 font-bold px-6 py-3 rounded-full hover:bg-orange-50 transition-colors duration-200"
            >
              Join Free Demo Class
            </a>
          </div>
        </div>

        {/* FTC Camp Offering */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a7a] mb-3">FTC Camp — Advanced Robotics</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              For students in 6th grade and above. Runs during the same week as the Robotics Camp, each serving different age groups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏗️
              </div>
              <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">FTC Camp</h3>
              <p className="text-gray-600">FIRST Tech Challenge preparation for 6th grade and above</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🕘
              </div>
              <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Daily Schedule</h3>
              <p className="text-gray-600">9:00 AM to 12:00 PM (3 hours)</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="font-bold text-[#1a3a7a] text-lg mb-1">Same Week</h3>
              <p className="text-gray-600">August 17, 2026 – August 24, 2026</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <p className="text-[#1a3a7a] font-semibold text-sm">
              ℹ️ Both Robotics Camp and FTC Camp run during the same week (Aug 17–24), each designed for different age groups.
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="max-w-4xl mx-auto px-4 py-16" id="enrollment-form">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a7a] mb-3">Enroll Your Child Today</h2>
          <p className="text-gray-600 text-lg">
            Fill out the form below to register. After submission, you will be redirected to pay the $100 deposit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-6 border border-blue-50"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div className="space-y-1">
              <label htmlFor="studentName" className="block text-sm font-bold text-[#1a3a7a]">
                Student Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.studentName ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="Enter student's full name"
              />
              {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label htmlFor="age" className="block text-sm font-bold text-[#1a3a7a]">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="5"
                max="16"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="5–16"
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Parent Name */}
            <div className="space-y-1">
              <label htmlFor="parentName" className="block text-sm font-bold text-[#1a3a7a]">
                Parent/Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.parentName ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="Parent or guardian's full name"
              />
              {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
            </div>

            {/* Parent Email */}
            <div className="space-y-1">
              <label htmlFor="parentEmail" className="block text-sm font-bold text-[#1a3a7a]">
                Parent Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.parentEmail ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="email@example.com"
              />
              {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
            </div>

            {/* Parent Phone */}
            <div className="space-y-1">
              <label htmlFor="parentPhone" className="block text-sm font-bold text-[#1a3a7a]">
                Parent Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.parentPhone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="(555) 123-4567"
              />
              {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-1">
              <label htmlFor="emergencyContact" className="block text-sm font-bold text-[#1a3a7a]">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.emergencyContact ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
                placeholder="Name and phone number"
              />
              {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
            </div>
          </div>

          {/* Address - full width */}
          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-bold text-[#1a3a7a]">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200`}
              placeholder="Street address, City, State, ZIP"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Prior Experience - optional */}
          <div className="space-y-1">
            <label htmlFor="priorExperience" className="block text-sm font-bold text-[#1a3a7a]">
              Any Prior Robotics Experience <span className="text-gray-400 text-xs font-normal">(Optional)</span>
            </label>
            <textarea
              id="priorExperience"
              name="priorExperience"
              value={formData.priorExperience}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none"
              placeholder="Describe any previous robotics classes, kits used, or competitions attended..."
            />
          </div>

          {/* Early-Bird Discount Option */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="earlyBird"
                checked={formData.earlyBird}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
              />
              <div>
                <span className="font-bold text-[#1a3a7a]">🎉 Apply Early-Bird Discount ($50 off)</span>
                <p className="text-gray-600 text-sm mt-0.5">
                  Register before August 10, 2026 to receive $50 off the total program cost. Pay only $350 instead of $400!
                </p>
              </div>
            </label>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-[#1a3a7a] font-semibold text-sm">
              ℹ️ Your seat will be reserved once the $100 deposit is completed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 px-8 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Reserve Your Seat – Pay $100 Deposit'}
          </button>
        </form>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Give your child the skills of tomorrow. Seats are limited — enroll today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#enrollment-form"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Reserve Your Seat – Pay $100 Deposit
            </a>
            <a
              href="#enrollment-form"
              className="inline-block bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Free Demo Class – Aug 15
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
