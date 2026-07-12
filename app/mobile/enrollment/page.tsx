'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EnrollmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentInfo: { firstName: '', lastName: '', email: '', phone: '', address: { street: '', city: '', state: 'WA', zipCode: '' } },
    childInfo: { firstName: '', lastName: '', dateOfBirth: '', gender: '', allergies: '', specialNeeds: '', primaryLanguage: 'English' },
    emergencyContacts: [{ name: '', relationship: '', phone: '', authorizedPickup: true }],
    medicalInfo: { physician: '', physicianPhone: '', hospital: '', immunizationUpToDate: true },
    programRequested: '',
    scheduleRequested: '',
    startDateRequested: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [section]: { ...(prev as any)[section], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/childcare/enrollment', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_enrollment',
          centerId: 'default',
          ...formData,
          childInfo: {
            ...formData.childInfo,
            allergies: formData.childInfo.allergies.split(',').map(a => a.trim()).filter(Boolean)
          },
          emergencyContacts: formData.emergencyContacts
        })
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">We&apos;ll review your enrollment application and get back to you within 2-3 business days.</p>
          <button onClick={() => router.push('/mobile')} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Enrollment</h1>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <div className="flex justify-between mb-2">
            {['Parent Info', 'Child Info', 'Emergency', 'Medical', 'Program'].map((label, i) => (
              <div key={i} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto ${
                  step > i + 1 ? 'bg-green-500 text-white' :
                  step === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-[10px] text-gray-500 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-md p-5">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Parent/Guardian Information</h2>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First Name *" value={formData.parentInfo.firstName}
                  onChange={(e) => updateField('parentInfo', 'firstName', e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Last Name *" value={formData.parentInfo.lastName}
                  onChange={(e) => updateField('parentInfo', 'lastName', e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <input placeholder="Email *" type="email" value={formData.parentInfo.email}
                onChange={(e) => updateField('parentInfo', 'email', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Phone *" type="tel" value={formData.parentInfo.phone}
                onChange={(e) => updateField('parentInfo', 'phone', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Street Address *"
                onChange={(e) => setFormData(prev => ({ ...prev, parentInfo: { ...prev.parentInfo, address: { ...prev.parentInfo.address, street: e.target.value } } }))}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="City"
                  onChange={(e) => setFormData(prev => ({ ...prev, parentInfo: { ...prev.parentInfo, address: { ...prev.parentInfo.address, city: e.target.value } } }))}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input placeholder="State" defaultValue="WA"
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input placeholder="ZIP"
                  onChange={(e) => setFormData(prev => ({ ...prev, parentInfo: { ...prev.parentInfo, address: { ...prev.parentInfo.address, zipCode: e.target.value } } }))}
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Child Information</h2>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First Name *" value={formData.childInfo.firstName}
                  onChange={(e) => updateField('childInfo', 'firstName', e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Last Name *" value={formData.childInfo.lastName}
                  onChange={(e) => updateField('childInfo', 'lastName', e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Date of Birth *</label>
                  <input type="date" value={formData.childInfo.dateOfBirth}
                    onChange={(e) => updateField('childInfo', 'dateOfBirth', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <select value={formData.childInfo.gender}
                  onChange={(e) => updateField('childInfo', 'gender', e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm">
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <input placeholder="Allergies (comma-separated)" value={formData.childInfo.allergies}
                onChange={(e) => updateField('childInfo', 'allergies', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <textarea placeholder="Special needs or notes"
                onChange={(e) => updateField('childInfo', 'specialNeeds', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm h-20 resize-none" />
              <select value={formData.childInfo.primaryLanguage}
                onChange={(e) => updateField('childInfo', 'primaryLanguage', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Emergency Contacts</h2>
              {formData.emergencyContacts.map((contact, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2">
                  <input placeholder="Full Name *" value={contact.name}
                    onChange={(e) => {
                      const updated = [...formData.emergencyContacts];
                      updated[i] = { ...updated[i], name: e.target.value };
                      setFormData(prev => ({ ...prev, emergencyContacts: updated }));
                    }}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="Relationship *" value={contact.relationship}
                      onChange={(e) => {
                        const updated = [...formData.emergencyContacts];
                        updated[i] = { ...updated[i], relationship: e.target.value };
                        setFormData(prev => ({ ...prev, emergencyContacts: updated }));
                      }}
                      className="border rounded-lg px-3 py-2 text-sm" />
                    <input placeholder="Phone *" value={contact.phone}
                      onChange={(e) => {
                        const updated = [...formData.emergencyContacts];
                        updated[i] = { ...updated[i], phone: e.target.value };
                        setFormData(prev => ({ ...prev, emergencyContacts: updated }));
                      }}
                      className="border rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  emergencyContacts: [...prev.emergencyContacts, { name: '', relationship: '', phone: '', authorizedPickup: true }]
                }))}
                className="text-sm text-purple-600 font-medium"
              >
                + Add Another Contact
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Medical Information</h2>
              <input placeholder="Physician Name" value={formData.medicalInfo.physician}
                onChange={(e) => updateField('medicalInfo', 'physician', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Physician Phone" value={formData.medicalInfo.physicianPhone}
                onChange={(e) => updateField('medicalInfo', 'physicianPhone', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Preferred Hospital" value={formData.medicalInfo.hospital}
                onChange={(e) => updateField('medicalInfo', 'hospital', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.medicalInfo.immunizationUpToDate}
                  onChange={(e) => updateField('medicalInfo', 'immunizationUpToDate', e.target.checked)}
                  className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">Immunizations are up to date</span>
              </label>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Program Selection</h2>
              <select value={formData.programRequested}
                onChange={(e) => setFormData(prev => ({ ...prev, programRequested: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Program *</option>
                <option value="infant">Infant Care (0-12 months)</option>
                <option value="toddler">Toddler Program (12-24 months)</option>
                <option value="preschool">Preschool (2-5 years)</option>
                <option value="pre_k">Pre-K (4-5 years)</option>
                <option value="after_school">After School (5-12 years)</option>
                <option value="stem_enrichment">STEM Enrichment</option>
              </select>
              <select value={formData.scheduleRequested}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduleRequested: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Schedule *</option>
                <option value="full_time">Full Time (Mon-Fri)</option>
                <option value="part_time_am">Part Time - Morning</option>
                <option value="part_time_pm">Part Time - Afternoon</option>
                <option value="3_day">3 Days/Week</option>
                <option value="2_day">2 Days/Week</option>
                <option value="drop_in">Drop-In</option>
              </select>
              <div>
                <label className="text-xs text-gray-500">Desired Start Date</label>
                <input type="date" value={formData.startDateRequested}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDateRequested: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-600"
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
