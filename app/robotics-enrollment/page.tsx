'use client';

import { useState } from 'react';

const campDetails = {
  robotics: {
    title: 'Robotics Camp',
    ageRange: 'Ages 5–14',
    dates: 'August 17, 2026 – August 24, 2026',
    schedule: '9:00 AM – 4:00 PM PST',
    fee: '$400',
    earlyBird: '$50 off until August 10, 2026',
    description: 'A hands-on robotics training camp for ages 5–14. Learn to build, program, and compete with robots in a fun and supportive environment.',
    kitInfo: 'All students receive robotics kits during the training — no need to purchase separately.',
  },
  ftc: {
    title: 'FTC Camp',
    ageRange: '6th grade and above',
    dates: 'August 17, 2026 – August 25, 2026',
    schedule: '9:00 AM – 3:00 PM PST',
    fee: '$350',
    earlyBird: '$25 off until August 10, 2026',
    description: 'FIRST Tech Challenge preparation camp for students in 6th grade and above. Build advanced robots, learn engineering design, and prepare for FTC competition season.',
    kitInfo: null,
  },
};

export default function RoboticsEnrollmentPage() {
  const [formData, setFormData] = useState({
    campType: 'robotics' as 'robotics' | 'ftc',
    studentName: '',
    age: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    emergencyContact: '',
    priorExperience: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/robotics-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit enrollment');
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Failed to submit enrollment. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const selected = campDetails[formData.campType];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center border border-blue-100">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-serif text-2xl font-bold text-[#1a3a7a] mb-3">Enrollment Confirmed!</h2>
          <p className="text-gray-600 text-lg">
            Thank you for enrolling! You will receive a confirmation email with camp details shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-20 w-24 h-24 border-4 border-orange-300 rounded-full animate-pulse" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Robotics &amp; FTC Camp Enrollment
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Programs led by national/international FTC Team FTC23270 – Sounder Bots.
          </p>
          <p className="text-sm text-blue-200 mt-2">
            📍 NextZen Academy, 21304 State Route 9 SE, Woodinville, WA 98072
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-12" id="enrollment-form">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-6 border border-blue-50">

          {/* Camp Selection */}
          <h2 className="font-serif text-2xl font-bold text-[#1a3a7a]">Camp Enrollment</h2>

          <div className="space-y-1">
            <label htmlFor="campType" className="block text-sm font-bold text-[#1a3a7a]">
              Select Camp <span className="text-red-500">*</span>
            </label>
            <select
              id="campType"
              name="campType"
              value={formData.campType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
            >
              <option value="robotics">Robotics Camp</option>
              <option value="ftc">FTC Camp</option>
            </select>
          </div>

          {/* Dynamic camp details */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-2 transition-all duration-300">
            <h3 className="font-bold text-[#1a3a7a] text-lg">{selected.title}</h3>
            <p className="text-xs font-semibold text-orange-600 uppercase">{selected.ageRange}</p>
            <p className="text-gray-700 text-sm">{selected.description}</p>
            {selected.kitInfo && (
              <p className="text-gray-700 text-sm italic">{selected.kitInfo}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              <div className="text-center bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Dates</p>
                <p className="text-sm font-bold text-[#1a3a7a]">{selected.dates}</p>
              </div>
              <div className="text-center bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Schedule</p>
                <p className="text-sm font-bold text-[#1a3a7a]">{selected.schedule}</p>
              </div>
              <div className="text-center bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Fee</p>
                <p className="text-sm font-bold text-[#1a3a7a]">{selected.fee}</p>
              </div>
              <div className="text-center bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Early Bird</p>
                <p className="text-sm font-bold text-green-600">{selected.earlyBird}</p>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <h2 className="font-serif text-xl font-bold text-[#1a3a7a] pt-4">Student &amp; Parent Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label htmlFor="studentName" className="block text-sm font-bold text-[#1a3a7a]">Student Full Name <span className="text-red-500">*</span></label>
              <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.studentName ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="Student's full name" />
              {errors.studentName && <p className="text-red-500 text-xs">{errors.studentName}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="age" className="block text-sm font-bold text-[#1a3a7a]">Age <span className="text-red-500">*</span></label>
              <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="Age or grade level" />
              {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="parentName" className="block text-sm font-bold text-[#1a3a7a]">Parent/Guardian Name <span className="text-red-500">*</span></label>
              <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.parentName ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="Parent or guardian's name" />
              {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="parentEmail" className="block text-sm font-bold text-[#1a3a7a]">Parent Email <span className="text-red-500">*</span></label>
              <input type="email" id="parentEmail" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.parentEmail ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="email@example.com" />
              {errors.parentEmail && <p className="text-red-500 text-xs">{errors.parentEmail}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="parentPhone" className="block text-sm font-bold text-[#1a3a7a]">Parent Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" id="parentPhone" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.parentPhone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="(555) 123-4567" />
              {errors.parentPhone && <p className="text-red-500 text-xs">{errors.parentPhone}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="emergencyContact" className="block text-sm font-bold text-[#1a3a7a]">Emergency Contact <span className="text-red-500">*</span></label>
              <input type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.emergencyContact ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="Name and phone number" />
              {errors.emergencyContact && <p className="text-red-500 text-xs">{errors.emergencyContact}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-bold text-[#1a3a7a]">Address <span className="text-red-500">*</span></label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`} placeholder="Street, City, State, ZIP" />
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="priorExperience" className="block text-sm font-bold text-[#1a3a7a]">Prior Robotics Experience <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
            <textarea id="priorExperience" name="priorExperience" value={formData.priorExperience} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none" placeholder="Describe any previous robotics experience..." />
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-700 font-semibold text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Reserve the Spot'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
