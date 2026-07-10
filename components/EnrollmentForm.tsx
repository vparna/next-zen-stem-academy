'use client';

import { useState, useEffect } from 'react';

interface EnrollmentFormProps {
  preSelectedProgram?: string;
  onClearPreSelected?: () => void;
}

export default function EnrollmentForm({
  preSelectedProgram,
  onClearPreSelected,
}: EnrollmentFormProps) {
  // Parent/Guardian Information
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryRelationship, setInquiryRelationship] = useState('');

  // Child Information
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childSchool, setChildSchool] = useState('');

  // Programs & Schedules
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [preferredSchedules, setPreferredSchedules] = useState<string[]>([]);
  const [preferredStartDate, setPreferredStartDate] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [referralOther, setReferralOther] = useState('');

  // Additional Notes
  const [childInfo, setChildInfo] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [wantsTour, setWantsTour] = useState<boolean | null>(null);
  const [tourDay, setTourDay] = useState('');
  const [tourTime, setTourTime] = useState('');

  // Status & Privacy
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);

  // Watch for pre-selected program triggers
  useEffect(() => {
    if (preSelectedProgram) {
      let mappedTitle = preSelectedProgram;
      if (preSelectedProgram.toLowerCase().includes('coding') || preSelectedProgram.toLowerCase().includes('ai')) mappedTitle = 'Coding & AI';
      else if (preSelectedProgram.toLowerCase().includes('mathematics') || preSelectedProgram.toLowerCase().includes('math')) mappedTitle = 'Math Academy';
      else if (preSelectedProgram.toLowerCase().includes('chess')) mappedTitle = 'Chess';
      else if (preSelectedProgram.toLowerCase().includes('robotics')) mappedTitle = 'Robotics';
      else if (preSelectedProgram.toLowerCase().includes('summer')) mappedTitle = 'Summer Camp';
      else if (preSelectedProgram.toLowerCase().includes('preschool') || preSelectedProgram.toLowerCase().includes('daycare')) mappedTitle = 'Preschool';
      else if (preSelectedProgram.toLowerCase().includes('afterschool') || preSelectedProgram.toLowerCase().includes('after-school')) mappedTitle = 'After School';

      setSelectedPrograms((prev) => {
        if (!prev.includes(mappedTitle)) {
          return [...prev, mappedTitle];
        }
        return prev;
      });

      if (onClearPreSelected) {
        onClearPreSelected();
      }
    }
  }, [preSelectedProgram, onClearPreSelected]);

  const handleProgramToggle = (program: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(program) ? prev.filter((p) => p !== program) : [...prev, program]
    );
  };

  const handleScheduleToggle = (schedule: string) => {
    setPreferredSchedules((prev) =>
      prev.includes(schedule) ? prev.filter((s) => s !== schedule) : [...prev, schedule]
    );
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryPhone) {
      setInquiryStatus('❌ Please fill in all required parent contact fields.');
      return;
    }
    if (!privacyConsent) {
      setInquiryStatus('❌ You must agree to the privacy policy to submit.');
      return;
    }
    setInquiryStatus('Submitting enrollment inquiry...');

    // Compile structured message
    const formattedMessage = `
[Parent/Guardian Info]
- Relationship to Child: ${inquiryRelationship || '—'}

[Child Info]
- DOB: ${childDob || '—'}
- Current School: ${childSchool || '—'}

[Preferred Schedule]
- Options: ${preferredSchedules.join(', ') || '—'}
- Start Date: ${preferredStartDate || '—'}

[Referral Source]
- Source: ${referralSource === 'Other' ? `Other: ${referralOther}` : (referralSource || '—')}

[Additional Information]
- Tell Us About Your Child: ${childInfo || '—'}
- Questions/Comments: ${inquiryMessage || '—'}

[Campus Tour Requested]
- Status: ${wantsTour === true ? `Yes (Preferred Day: ${tourDay || '—'}, Time: ${tourTime || '—'})` : wantsTour === false ? 'No' : '—'}
`.trim();

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          phone: inquiryPhone,
          course: selectedPrograms.join(', ') || 'General Enrollment',
          childName: childName || null,
          childAge: childAge ? parseInt(childAge) : null,
          message: formattedMessage,
        }),
      });

      if (response.ok) {
        setInquiryStatus('✓ Thank you! Your inquiry has been received. Our enrollment coordinator will reach out to you shortly.');
        // Reset form
        setInquiryName('');
        setInquiryEmail('');
        setInquiryPhone('');
        setInquiryRelationship('');
        setChildName('');
        setChildDob('');
        setChildAge('');
        setChildSchool('');
        setSelectedPrograms([]);
        setPreferredSchedules([]);
        setPreferredStartDate('');
        setReferralSource('');
        setReferralOther('');
        setChildInfo('');
        setInquiryMessage('');
        setWantsTour(null);
        setTourDay('');
        setTourTime('');
        setPrivacyConsent(false);
      } else {
        const errorData = await response.json();
        setInquiryStatus(`❌ Error: ${errorData.error || 'Failed to submit inquiry.'}`);
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setInquiryStatus('❌ Network error. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-black tracking-widest text-[#F25022] uppercase">
          Enrolling Now
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1f2e57]">
          Program Inquiry &amp; Enrollment
        </h3>
        <p className="text-xs md:text-sm text-[#1f2e57]/70 font-semibold max-w-md mx-auto">
          Interested in our programs? Submit details below to receive program guides and connect with our enrollment team.
        </p>
      </div>

      <form onSubmit={handleInquirySubmit} className="space-y-8">
        
        {/* SECTION 1: Parent / Guardian Information */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Parent / Guardian Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Parent/Guardian Name *</label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Relationship to Child *</label>
              <input
                type="text"
                required
                value={inquiryRelationship}
                onChange={(e) => setInquiryRelationship(e.target.value)}
                placeholder="Mother, Father, Guardian, etc."
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Phone Number *</label>
              <input
                type="tel"
                required
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="(123) 456-7890"
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Email Address *</label>
              <input
                type="email"
                required
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="jane.doe@example.com"
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Child Information */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Child Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Child's Name *</label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Alex Doe"
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Date of Birth *</label>
                <input
                  type="text"
                  required
                  value={childDob}
                  onChange={(e) => setChildDob(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Age *</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="18"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="5"
                  className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Current School (if applicable)</label>
            <input
              type="text"
              value={childSchool}
              onChange={(e) => setChildSchool(e.target.value)}
              placeholder="Enter school name"
              className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
            />
          </div>
        </div>

        {/* SECTION 3: Programs of Interest */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Programs of Interest (Select all that apply)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Infant', 'Toddler', 'Preschool', 'Pre-K', 'Before School', 'After School',
              'STEM Academy', 'Robotics', 'Coding & AI', 'Math Academy', 'Chess', 'Summer Camp'
            ].map((prog) => {
              const isChecked = selectedPrograms.includes(prog);
              return (
                <label
                  key={prog}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isChecked 
                      ? 'bg-[#00A4EF]/5 border-[#00A4EF] text-[#00A4EF] font-black' 
                      : 'bg-[#FAF8F5] border-slate-200 text-slate-700 font-semibold hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProgramToggle(prog)}
                    className="rounded text-[#00A4EF] focus:ring-[#00A4EF] h-4 w-4 cursor-pointer"
                  />
                  <span className="text-xs">{prog}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Preferred Schedule */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Preferred Schedule &amp; Start Date
          </h4>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Schedule Type *</label>
              <div className="grid grid-cols-2 gap-3">
                {['Full-Time', 'Part-Time', 'After School', 'Weekend'].map((sched) => {
                  const isChecked = preferredSchedules.includes(sched);
                  return (
                    <label
                      key={sched}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#7FBA00]/5 border-[#7FBA00] text-[#7FBA00] font-black' 
                          : 'bg-[#FAF8F5] border-slate-200 text-slate-700 font-semibold hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleScheduleToggle(sched)}
                        className="rounded text-[#7FBA00] focus:ring-[#7FBA00] h-4 w-4 cursor-pointer"
                      />
                      <span className="text-xs">{sched}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Start Date *</label>
              <input
                type="text"
                required
                value={preferredStartDate}
                onChange={(e) => setPreferredStartDate(e.target.value)}
                placeholder="e.g. September 2026, ASAP"
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: How Did You Hear About Us? */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            How did you hear about us?
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Google', 'Facebook', 'Instagram', 'Friend/Family', 'Community Event', 'Drive By', 'Other'].map((source) => {
              const isChecked = referralSource === source;
              return (
                <label
                  key={source}
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked 
                      ? 'bg-[#FFB900]/5 border-[#FFB900] text-[#FFB900] font-black' 
                      : 'bg-[#FAF8F5] border-slate-200 text-slate-700 font-semibold hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="referralSource"
                    checked={isChecked}
                    onChange={() => setReferralSource(source)}
                    className="text-[#FFB900] focus:ring-[#FFB900] h-4 w-4 cursor-pointer"
                  />
                  <span className="text-xs">{source}</span>
                </label>
              );
            })}
          </div>
          {referralSource === 'Other' && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Please specify *</label>
              <input
                type="text"
                required
                value={referralOther}
                onChange={(e) => setReferralOther(e.target.value)}
                placeholder="Referral detail..."
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
          )}
        </div>

        {/* SECTION 6: Tell Us About Your Child & Comments */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Additional Information
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Tell Us About Your Child</label>
              <textarea
                rows={3}
                value={childInfo}
                onChange={(e) => setChildInfo(e.target.value)}
                placeholder="Share interests, strengths, routines, or specific needs..."
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl p-4 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Questions / Comments</label>
              <textarea
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Any general inquiries or specific questions for the admissions coordinator..."
                className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl p-4 text-sm focus:outline-none font-semibold text-[#1f2e57]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 7: Campus Tour Booking */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase text-[#F25022] tracking-wider border-b border-slate-100 pb-2">
            Campus Tour Preference
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                <input
                  type="radio"
                  name="wantsTour"
                  checked={wantsTour === true}
                  onChange={() => setWantsTour(true)}
                  className="text-[#00A4EF] focus:ring-[#00A4EF] h-4 w-4 cursor-pointer"
                />
                <span>Yes, schedule a tour</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                <input
                  type="radio"
                  name="wantsTour"
                  checked={wantsTour === false}
                  onChange={() => setWantsTour(false)}
                  className="text-[#00A4EF] focus:ring-[#00A4EF] h-4 w-4 cursor-pointer"
                />
                <span>No tour wanted</span>
              </label>
            </div>

            {wantsTour === true && (
              <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Day *</label>
                  <input
                    type="text"
                    required
                    value={tourDay}
                    onChange={(e) => setTourDay(e.target.value)}
                    placeholder="e.g. Tuesday or Thursday"
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Time *</label>
                  <input
                    type="text"
                    required
                    value={tourTime}
                    onChange={(e) => setTourTime(e.target.value)}
                    placeholder="e.g. 10:00 AM or Morning"
                    className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-[#00A4EF] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacyConsent"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-1 border-slate-200 focus:ring-[#00A4EF] h-4 w-4 text-[#00A4EF] rounded cursor-pointer"
          />
          <label htmlFor="privacyConsent" className="text-xs font-semibold text-[#1f2e57]/70 cursor-pointer">
            I consent to receive communication updates from NextZen Academy regarding enrollment schedules and agree to the storage of my submitted details in accordance with the Privacy Policy. *
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full font-black text-xs text-center uppercase tracking-wider text-white bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          Submit Enrollment Inquiry
        </button>

        {inquiryStatus && (
          <p className={`text-xs font-bold text-center mt-4 p-3 rounded-xl border ${inquiryStatus.startsWith('✓') ? 'text-[#00A4EF] bg-[#00A4EF]/10 border-[#00A4EF]/20' : 'text-[#F25022] bg-[#F25022]/10 border-[#F25022]/20'
            }`}>
            {inquiryStatus}
          </p>
        )}
      </form>
    </div>
  );
}
