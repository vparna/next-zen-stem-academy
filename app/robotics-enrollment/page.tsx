'use client';

import { useState } from 'react';

const campDetails = {
  robotics: {
    title: 'Robotics Camp',
    ageRange: 'Ages 7+',
    dates: 'August 17 – August 24, 2026',
    schedule: '9:00 AM – 3:00 PM PST',
    fee: '$400',
    earlyBird: 'Save $50 when you register on or before August 10, 2026',
    description: 'A hands-on robotics training camp for ages 7+. Learn to build, program, and compete with robots in a fun and supportive environment.',
    kitInfo: 'All students receive robotics kits during the training — no need to purchase separately.',
  },
  ftc: {
    title: 'FTC Camp',
    ageRange: 'Ages 12+',
    dates: 'August 17 – August 24, 2026',
    schedule: '9:00 AM – 12:00 PM PST',
    fee: '$350',
    earlyBird: 'Save $50 when you register on or before August 10, 2026',
    description: 'FIRST Tech Challenge preparation camp for students ages 12+. Build advanced robots, learn engineering design, and prepare for FTC competition season.',
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
    priorExperience: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
    if (!agreed) newErrors.agreed = 'You must agree to continue';
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
      <div className="min-h-screen bg-[#F4EFE6] py-16 px-4 font-sans flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white rounded-[24px] p-10 text-center shadow-sm">
          <div className="text-6xl mb-6 text-[#1f2e57]">✅</div>
          <h2 className="text-[32px] font-extrabold text-[#1f2e57] mb-4 font-sans tracking-tight">Enrollment Confirmed!</h2>
          <p className="text-[16px] text-gray-700 leading-relaxed font-medium">
            Thank you for enrolling! You will receive a confirmation email with camp details shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] font-sans">
      {/* Header Section matching the image */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[36px] md:text-[30px] font-extrabold text-[#1f2e57] mb-4 tracking-tight leading-tight">
            Enroll in our Summer Exclusive Robotics Camps
          </h1>
          <p className="text-[16px] text-[#1f2e57] max-w-3xl mx-auto font-medium leading-relaxed">
            Learn from elite coaches with a proven track record of success in prestigious international competitions (Sounder Bots)
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-12">
          
          {/* Left Column: Form Fields */}
          <div className="md:col-span-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
              
              {/* Select Camp */}
              <div className="md:col-span-2">
                <label htmlFor="campType" className="block text-[15px] font-bold text-[#1f2e57] mb-2">
                  Select Program
                </label>
                <div className="relative mb-6">
                  <select
                    id="campType"
                    name="campType"
                    value={formData.campType}
                    onChange={handleChange}
                    className="w-full px-6 py-3.5 bg-white rounded-full border border-gray-200 focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] text-gray-700 shadow-sm appearance-none"
                  >
                    <option value="robotics">Robotics Camp (Ages 7+)</option>
                    <option value="ftc">FTC Camp (Ages 12+)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-[#1f2e57]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                {/* Camp Information */}
                <div className="bg-[#f8f9fa] rounded-[20px] p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-[#1f2e57] font-extrabold text-[18px] mb-4 border-b border-gray-200 pb-3">Camp Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#1f2e57] text-[15px] flex items-center gap-2">
                        <span>📅</span> Camp Dates
                      </h4>
                      <p className="text-[15px] text-gray-700 font-medium ml-7 mt-0.5">
                        August 17 – August 24, 2026
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#1f2e57] text-[15px] flex items-center gap-2">
                        <span>🕘</span> Camp Schedule
                      </h4>
                      <div className="text-[15px] text-gray-700 font-medium ml-7 mt-0.5">
                        {formData.campType === 'robotics' ? (
                          <>
                            <p className="font-bold text-[#1f2e57]">Robotics Camp (Ages 7+)</p>
                            <p>9:00 AM – 3:00 PM PST</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-[#1f2e57]">FTC Camp (Ages 12+)</p>
                            <p>9:00 AM – 12:00 PM PST</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#1f2e57] text-[15px] flex items-center gap-2">
                        <span>🏫</span> Campus Tour
                      </h4>
                      <p className="text-[15px] text-gray-700 font-medium ml-7 mt-0.5">
                        Schedule a tour to learn more about camp details and pricing
                      </p>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 mt-2">
                      <h4 className="font-bold text-emerald-800 text-[15px] flex items-center gap-2">
                        <span>🎉</span> Visit Us!
                      </h4>
                      <p className="text-[14px] text-emerald-700 font-medium ml-7 mt-0.5">
                        Schedule a campus tour to see our robotics labs in action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Name */}
              <div>
                <label htmlFor="studentName" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Student Full Name</label>
                <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} className={`w-full px-6 py-3.5 rounded-full border ${errors.studentName ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] shadow-sm`} placeholder="First and Last Name" />
                {errors.studentName && <p className="text-red-500 text-[13px] mt-1.5 font-medium px-2">{errors.studentName}</p>}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Child's Age</label>
                <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className={`w-full px-6 py-3.5 rounded-full border ${errors.age ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] shadow-sm`} placeholder="Age of Child" />
                {errors.age && <p className="text-red-500 text-[13px] mt-1.5 font-medium px-2">{errors.age}</p>}
              </div>

              {/* Parent Name */}
              <div>
                <label htmlFor="parentName" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Parent or Guardian Name</label>
                <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} className={`w-full px-6 py-3.5 rounded-full border ${errors.parentName ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] shadow-sm`} placeholder="Full Name" />
                {errors.parentName && <p className="text-red-500 text-[13px] mt-1.5 font-medium px-2">{errors.parentName}</p>}
              </div>

              {/* Parent Phone */}
              <div>
                <label htmlFor="parentPhone" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Phone Number</label>
                <input type="tel" id="parentPhone" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className={`w-full px-6 py-3.5 rounded-full border ${errors.parentPhone ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] shadow-sm`} placeholder="Phone Number" />
                {errors.parentPhone && <p className="text-red-500 text-[13px] mt-1.5 font-medium px-2">{errors.parentPhone}</p>}
              </div>

              {/* Parent Email */}
              <div className="md:col-span-2">
                <label htmlFor="parentEmail" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Email Address</label>
                <input type="email" id="parentEmail" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className={`w-full px-6 py-3.5 rounded-full border ${errors.parentEmail ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none text-[15px] shadow-sm`} placeholder="Email Address" />
                {errors.parentEmail && <p className="text-red-500 text-[13px] mt-1.5 font-medium px-2">{errors.parentEmail}</p>}
              </div>
              
              {/* Prior Experience */}
              <div className="md:col-span-2">
                <label htmlFor="priorExperience" className="block text-[15px] font-bold text-[#1f2e57] mb-2">Prior Robotics Experience <span className="font-normal text-gray-500 text-[14px]">(Optional)</span></label>
                <textarea id="priorExperience" name="priorExperience" value={formData.priorExperience} onChange={handleChange} rows={3} className="w-full px-6 py-4 rounded-[20px] border border-gray-200 bg-white focus:border-[#f2c638] focus:ring-1 focus:ring-[#f2c638] outline-none resize-none text-[15px] shadow-sm" placeholder="Briefly describe any past experience..." />
              </div>
            </div>

            {/* Checkbox and Submit */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mt-8">
              <div className="flex-1 flex items-start gap-3">
                <div className="relative flex items-center justify-center mt-1">
                  <input type="checkbox" id="agreed" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors(prev => { const n = {...prev}; delete n.agreed; return n; }) }} className="peer appearance-none w-6 h-6 border-2 border-[#f2c638] rounded-sm bg-transparent checked:bg-[#f2c638] cursor-pointer transition-colors" />
                  <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <label htmlFor="agreed" className="text-[13px] text-[#1f2e57] font-medium leading-snug cursor-pointer block">
                    It's OK to send me text messages regarding this inquiry. Standard text message rates apply and frequency varies. Reply HELP for help, or STOP to opt out. View <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.
                  </label>
                  {errors.agreed && <p className="text-red-500 text-[12px] mt-1 font-semibold">{errors.agreed}</p>}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#f2c638] hover:bg-[#e3b82c] text-[#1f2e57] text-[15px] font-extrabold uppercase py-3.5 px-10 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed tracking-wide shadow-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule a Tour'}
                </button>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center mt-4">
                <p className="text-red-700 font-bold text-[14px]">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Right Column: Contact Info & Action Buttons */}
          <div className="md:col-span-4 mt-8 md:mt-0 md:pl-6 text-center">
            <h2 className="text-[26px] font-extrabold text-[#1f2e57] mb-2 tracking-tight">Contact Us</h2>
            <p className="text-[17px] text-[#1f2e57] font-medium mb-8">NextZen Academy of Woodinville</p>
            
            <div className="space-y-4">
              <a href="tel:4258004240" className="block bg-[#f2c638] text-[#1f2e57] text-[18px] font-extrabold py-4 px-6 rounded-full shadow-sm w-full hover:bg-[#e3b82c] transition-colors">
                425-800-4240
              </a>
              <a href="https://maps.google.com/?q=21304+State+Route+9+SE,+Woodinville,+WA+98072" target="_blank" rel="noopener noreferrer" className="block bg-[#f2c638] text-[#1f2e57] text-[16px] font-extrabold uppercase py-4 px-6 rounded-full shadow-sm w-full hover:bg-[#e3b82c] transition-colors">
                GET DIRECTIONS
              </a>
            </div>

            <div className="mt-8 text-left bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
              <h3 className="text-[#1f2e57] font-extrabold text-[18px] mb-3">Phone Numbers</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                <span className="font-bold text-gray-500 w-16 inline-block">Office:</span> <a href="tel:4258004240" className="hover:text-blue-600 transition-colors">425-800-4240</a><br />
                <span className="font-bold text-gray-500 w-16 inline-block">Mobile:</span> <a href="tel:4253250431" className="hover:text-blue-600 transition-colors">425-325-0431</a><br />
                <span className="font-bold text-gray-500 w-16 inline-block">Fax:</span> 425-800-4350
              </p>

              <h3 className="text-[#1f2e57] font-extrabold text-[18px] mt-5 mb-3">Location</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                21304 State Route 9 SE<br />
                Woodinville, WA 98072
              </p>
              
              <h3 className="text-[#1f2e57] font-extrabold text-[18px] mt-5 mb-3">Camp Info</h3>
              <div className="text-[15px] text-gray-700 leading-relaxed font-medium space-y-1">
                <p><span className="font-bold text-gray-500">Dates:</span> {selected.dates}</p>
                <p><span className="font-bold text-gray-500">Schedule:</span> {selected.schedule}</p>
                <p><span className="font-bold text-gray-500">Fee:</span> {selected.fee}</p>
              </div>
              
              {selected.earlyBird && (
                <div className="mt-4 inline-block bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md text-[14px] font-bold">
                  {selected.earlyBird}
                </div>
              )}
            </div>
          </div>
          
        </form>
      </section>
    </div>
  );
}
