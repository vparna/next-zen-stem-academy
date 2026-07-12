'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AbsencePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    endDate: '',
    reason: 'illness',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      await fetch('/api/childcare/communication', {
        method: 'POST',
        headers: { 'Authorization': `****** 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'current_user',
          centerId: 'default',
          content: `Absence Request: ${formData.reason} - ${formData.date}${formData.endDate ? ` to ${formData.endDate}` : ''}\n${formData.notes}`,
          type: 'direct'
        })
      });
      setSubmitted(true);
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
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Absence Submitted</h2>
          <p className="text-gray-600 mb-6">Your absence request has been sent to the center.</p>
          <button onClick={() => router.push('/mobile')} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Submit Absence</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Absence Date *</label>
            <input type="date" value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">End Date (if multiple days)</label>
            <input type="date" value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Reason *</label>
            <select value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1">
              <option value="illness">Illness</option>
              <option value="vacation">Vacation</option>
              <option value="family">Family Matter</option>
              <option value="appointment">Doctor/Appointment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information..."
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1 h-24 resize-none" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Absence Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
