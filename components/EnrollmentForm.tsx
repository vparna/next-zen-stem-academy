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

  // Status, Privacy & Real-time Validation Errors
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Real-time validation helper
  const validateField = (fieldName: string, value: any) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'inquiryName':
        if (!value || !value.trim()) {
          errorMsg = 'Parent/Guardian name is required.';
        } else if (value.trim().length < 2) {
          errorMsg = 'Name must be at least 2 characters.';
        }
        break;
      case 'inquiryRelationship':
        if (!value || !value.trim()) {
          errorMsg = 'Relationship is required.';
        }
        break;
      case 'inquiryPhone': {
        const cleanPhone = (value || '').replace(/\D/g, '');
        if (!value || !value.trim()) {
          errorMsg = 'Phone number is required.';
        } else if (cleanPhone.startsWith('1')) {
          if (cleanPhone.length < 11) {
            errorMsg = 'Phone must be a valid 11-digit US number.';
          }
        } else {
          if (cleanPhone.length < 10) {
            errorMsg = 'Phone must be at least 10 digits.';
          }
        }
        break;
      }
      case 'inquiryEmail':
        if (!value || !value.trim()) {
          errorMsg = 'Email is required.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errorMsg = 'Invalid email address.';
          }
        }
        break;
      case 'childName':
        if (!value || !value.trim()) {
          errorMsg = "Child's name is required.";
        }
        break;
      case 'childDob':
        if (!value || !value.trim()) {
          errorMsg = 'Date of birth is required.';
        } else {
          const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
          if (!dobRegex.test(value)) {
            errorMsg = 'Use MM/DD/YYYY format.';
          }
        }
        break;
      case 'childAge':
        if (!value) {
          errorMsg = 'Age is required.';
        } else {
          const ageNum = parseInt(value);
          if (isNaN(ageNum) || ageNum < 0 || ageNum > 18) {
            errorMsg = 'Age must be 0 to 18.';
          }
        }
        break;
      case 'preferredStartDate':
        if (!value || !value.trim()) {
          errorMsg = 'Start date is required.';
        }
        break;
      case 'referralSource':
        if (!value) {
          errorMsg = 'Referral source is required.';
        }
        break;
      case 'referralOther':
        if (referralSource === 'Other' && (!value || !value.trim())) {
          errorMsg = 'Please specify.';
        }
        break;
      case 'wantsTour':
        if (value === null) {
          errorMsg = 'Select if you want a tour.';
        }
        break;
      case 'tourDay':
        if (wantsTour === true && (!value || !value.trim())) {
          errorMsg = 'Preferred day is required.';
        }
        break;
      case 'tourTime':
        if (wantsTour === true && (!value || !value.trim())) {
          errorMsg = 'Preferred time is required.';
        }
        break;
      case 'selectedPrograms':
        if (!value || value.length === 0) {
          errorMsg = 'Select at least one program.';
        }
        break;
      case 'preferredSchedules':
        if (!value || value.length === 0) {
          errorMsg = 'Select at least one schedule.';
        }
        break;
      case 'privacyConsent':
        if (!value) {
          errorMsg = 'Privacy consent is required.';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => {
      if (errorMsg) {
        return { ...prev, [fieldName]: errorMsg };
      } else {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      }
    });
  };

  const getValidationErrors = () => {
    const errs: Record<string, string> = {};

    if (!inquiryName.trim()) {
      errs.inquiryName = 'Parent/Guardian name is required.';
    } else if (inquiryName.trim().length < 2) {
      errs.inquiryName = 'Name must be at least 2 characters.';
    }

    if (!inquiryRelationship.trim()) errs.inquiryRelationship = 'Relationship is required.';
    
    if (!inquiryPhone.trim()) {
      errs.inquiryPhone = 'Phone number is required.';
    } else {
      const cleanPhone = inquiryPhone.replace(/\D/g, '');
      if (cleanPhone.startsWith('1')) {
        if (cleanPhone.length < 11) {
          errs.inquiryPhone = 'Phone must be a valid 11-digit US number.';
        }
      } else {
        if (cleanPhone.length < 10) {
          errs.inquiryPhone = 'Phone must be at least 10 digits.';
        }
      }
    }

    if (!inquiryEmail.trim()) {
      errs.inquiryEmail = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inquiryEmail)) {
        errs.inquiryEmail = 'Invalid email address.';
      }
    }

    if (!childName.trim()) errs.childName = "Child's name is required.";
    
    if (!childDob.trim()) {
      errs.childDob = 'Date of birth is required.';
    } else {
      const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
      if (!dobRegex.test(childDob)) {
        errs.childDob = 'Use MM/DD/YYYY format.';
      }
    }

    if (!childAge) {
      errs.childAge = 'Age is required.';
    } else {
      const ageNum = parseInt(childAge);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 18) {
        errs.childAge = 'Age must be 0 to 18.';
      }
    }

    if (selectedPrograms.length === 0) errs.selectedPrograms = 'Select at least one program.';
    if (preferredSchedules.length === 0) errs.preferredSchedules = 'Select at least one schedule.';
    if (!preferredStartDate.trim()) errs.preferredStartDate = 'Start date is required.';
    if (!referralSource) errs.referralSource = 'Referral source is required.';
    if (referralSource === 'Other' && !referralOther.trim()) errs.referralOther = 'Please specify.';
    
    if (wantsTour === null) {
      errs.wantsTour = 'Select if you want a tour.';
    } else if (wantsTour === true) {
      if (!tourDay.trim()) errs.tourDay = 'Preferred day is required.';
      if (!tourTime.trim()) errs.tourTime = 'Preferred time is required.';
    }

    if (!privacyConsent) errs.privacyConsent = 'Privacy consent is required.';

    return errs;
  };

  const calculateAge = (dobString: string): number | null => {
    const parts = dobString.split('/');
    if (parts.length !== 3) return null;
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
    if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) return null;
    
    const dobDate = new Date(year, month - 1, day);
    if (dobDate.getFullYear() !== year || dobDate.getMonth() !== month - 1 || dobDate.getDate() !== day) {
      return null;
    }
    
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : null;
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'inquiryName': setInquiryName(value); break;
      case 'inquiryRelationship': setInquiryRelationship(value); break;
      case 'inquiryPhone': {
        const filtered = value.replace(/[^0-9+\-()\s]/g, '');
        setInquiryPhone(filtered);
        validateField(fieldName, filtered);
        return;
      }
      case 'inquiryEmail': setInquiryEmail(value); break;
      case 'childName': setChildName(value); break;
      case 'childDob': {
        const cleaned = ('' + value).replace(/\D/g, '');
        const truncated = cleaned.slice(0, 8);
        let formatted = truncated;
        if (truncated.length > 4) {
          formatted = `${truncated.slice(0, 2)}/${truncated.slice(2, 4)}/${truncated.slice(4)}`;
        } else if (truncated.length > 2) {
          formatted = `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
        }
        setChildDob(formatted);
        validateField(fieldName, formatted);

        if (formatted.length === 10) {
          const calculated = calculateAge(formatted);
          if (calculated !== null) {
            setChildAge(calculated.toString());
            validateField('childAge', calculated.toString());
          }
        }
        return;
      }
      case 'childAge': {
        const cleaned = ('' + value).replace(/\D/g, '');
        setChildAge(cleaned);
        validateField(fieldName, cleaned);
        return;
      }
      case 'childSchool': setChildSchool(value); break;
      case 'preferredStartDate': setPreferredStartDate(value); break;
      case 'referralOther': setReferralOther(value); break;
      case 'tourDay': setTourDay(value); break;
      case 'tourTime': setTourTime(value); break;
      default: break;
    }
    validateField(fieldName, value);
  };

  const handleReferralSourceChange = (source: string) => {
    setReferralSource(source);
    validateField('referralSource', source);
    if (source !== 'Other') {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.referralOther;
        return next;
      });
    }
  };

  const handleWantsTourChange = (val: boolean) => {
    setWantsTour(val);
    validateField('wantsTour', val);
    if (!val) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.tourDay;
        delete next.tourTime;
        return next;
      });
    }
  };

  const handlePrivacyConsentChange = (checked: boolean) => {
    setPrivacyConsent(checked);
    validateField('privacyConsent', checked);
  };

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
        const next = !prev.includes(mappedTitle) ? [...prev, mappedTitle] : prev;
        validateField('selectedPrograms', next);
        return next;
      });

      if (onClearPreSelected) {
        onClearPreSelected();
      }
    }
  }, [preSelectedProgram, onClearPreSelected]);

  const handleProgramToggle = (program: string) => {
    setSelectedPrograms((prev) => {
      const next = prev.includes(program) ? prev.filter((p) => p !== program) : [...prev, program];
      validateField('selectedPrograms', next);
      return next;
    });
  };

  const handleScheduleToggle = (schedule: string) => {
    setPreferredSchedules((prev) => {
      const next = prev.includes(schedule) ? prev.filter((s) => s !== schedule) : [...prev, schedule];
      validateField('preferredSchedules', next);
      return next;
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = getValidationErrors();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setInquiryStatus('❌ Please correct all errors in the form before submitting.');
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
        setErrors({});
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
    <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-slate-100 shadow-xl space-y-8">
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
                value={inquiryName}
                onChange={(e) => handleFieldChange('inquiryName', e.target.value)}
                placeholder="Jane Doe"
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.inquiryName ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.inquiryName && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.inquiryName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Relationship to Child *</label>
              <input
                type="text"
                value={inquiryRelationship}
                onChange={(e) => handleFieldChange('inquiryRelationship', e.target.value)}
                placeholder="Mother, Father, Guardian, etc."
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.inquiryRelationship ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.inquiryRelationship && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.inquiryRelationship}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Phone Number *</label>
              <input
                type="tel"
                value={inquiryPhone}
                onChange={(e) => handleFieldChange('inquiryPhone', e.target.value)}
                placeholder="(123) 456-7890"
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.inquiryPhone ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.inquiryPhone && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.inquiryPhone}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Email Address *</label>
              <input
                type="email"
                value={inquiryEmail}
                onChange={(e) => handleFieldChange('inquiryEmail', e.target.value)}
                placeholder="jane.doe@example.com"
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.inquiryEmail ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.inquiryEmail && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.inquiryEmail}</p>
              )}
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
                value={childName}
                onChange={(e) => handleFieldChange('childName', e.target.value)}
                placeholder="Alex Doe"
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.childName ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.childName && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.childName}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Date of Birth *</label>
                <input
                  type="text"
                  value={childDob}
                  onChange={(e) => handleFieldChange('childDob', e.target.value)}
                  placeholder="MM/DD/YYYY"
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                    errors.childDob ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                  }`}
                />
                {errors.childDob && (
                  <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.childDob}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Age *</label>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={childAge}
                  onChange={(e) => handleFieldChange('childAge', e.target.value)}
                  placeholder="5"
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                    errors.childAge ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                  }`}
                />
                {errors.childAge && (
                  <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.childAge}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Current School (if applicable)</label>
            <input
              type="text"
              value={childSchool}
              onChange={(e) => handleFieldChange('childSchool', e.target.value)}
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
                      : errors.selectedPrograms 
                        ? 'bg-red-50/5 border-red-300 text-slate-700' 
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
          {errors.selectedPrograms && (
            <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.selectedPrograms}</p>
          )}
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
                          : errors.preferredSchedules
                            ? 'bg-red-50/5 border-red-300 text-slate-700'
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
              {errors.preferredSchedules && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.preferredSchedules}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Start Date *</label>
              <input
                type="text"
                value={preferredStartDate}
                onChange={(e) => handleFieldChange('preferredStartDate', e.target.value)}
                placeholder="e.g. September 2026, ASAP"
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.preferredStartDate ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.preferredStartDate && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.preferredStartDate}</p>
              )}
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
                      : errors.referralSource
                        ? 'bg-red-50/5 border-red-300 text-slate-700'
                        : 'bg-[#FAF8F5] border-slate-200 text-slate-700 font-semibold hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="referralSource"
                    checked={isChecked}
                    onChange={() => handleReferralSourceChange(source)}
                    className="text-[#FFB900] focus:ring-[#FFB900] h-4 w-4 cursor-pointer"
                  />
                  <span className="text-xs">{source}</span>
                </label>
              );
            })}
          </div>
          {errors.referralSource && (
            <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.referralSource}</p>
          )}

          {referralSource === 'Other' && (
            <div className="space-y-2 pt-2 animate-fade-in">
              <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Please specify *</label>
              <input
                type="text"
                value={referralOther}
                onChange={(e) => handleFieldChange('referralOther', e.target.value)}
                placeholder="Referral detail..."
                className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                  errors.referralOther ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                }`}
              />
              {errors.referralOther && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.referralOther}</p>
              )}
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
                  onChange={() => handleWantsTourChange(true)}
                  className="text-[#00A4EF] focus:ring-[#00A4EF] h-4 w-4 cursor-pointer"
                />
                <span>Yes, schedule a tour</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                <input
                  type="radio"
                  name="wantsTour"
                  checked={wantsTour === false}
                  onChange={() => handleWantsTourChange(false)}
                  className="text-[#00A4EF] focus:ring-[#00A4EF] h-4 w-4 cursor-pointer"
                />
                <span>No tour wanted</span>
              </label>
            </div>
            {errors.wantsTour && (
              <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.wantsTour}</p>
            )}

            {wantsTour === true && (
              <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Day *</label>
                  <input
                    type="text"
                    value={tourDay}
                    onChange={(e) => handleFieldChange('tourDay', e.target.value)}
                    placeholder="e.g. Tuesday or Thursday"
                    className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                      errors.tourDay ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                    }`}
                  />
                  {errors.tourDay && (
                    <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.tourDay}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Preferred Time *</label>
                  <input
                    type="text"
                    value={tourTime}
                    onChange={(e) => handleFieldChange('tourTime', e.target.value)}
                    placeholder="e.g. 10:00 AM or Morning"
                    className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] transition-all duration-200 ${
                      errors.tourTime ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-[#00A4EF]'
                    }`}
                  />
                  {errors.tourTime && (
                    <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.tourTime}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacyConsent"
              checked={privacyConsent}
              onChange={(e) => handlePrivacyConsentChange(e.target.checked)}
              className="mt-1 border-slate-200 focus:ring-[#00A4EF] h-4 w-4 text-[#00A4EF] rounded cursor-pointer"
            />
            <label htmlFor="privacyConsent" className="text-xs font-semibold text-[#1f2e57]/70 cursor-pointer">
              I consent to receive communication updates from NextZen Academy regarding enrollment schedules and agree to the storage of my submitted details in accordance with the Privacy Policy. *
            </label>
          </div>
          {errors.privacyConsent && (
            <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.privacyConsent}</p>
          )}
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
