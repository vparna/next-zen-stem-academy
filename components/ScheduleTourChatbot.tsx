'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const hiddenPathPrefixes = ['/admin', '/dashboard', '/login', '/signup', '/forgot-password', '/reset-password', '/mobile'];

export default function ScheduleTourChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredSchedule: '',
  });

  const shouldHide = useMemo(
    () => hiddenPathPrefixes.some((prefix) => pathname?.startsWith(prefix)),
    [pathname]
  );

  if (shouldHide) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course: 'Campus Tour',
          message: `Preferred tour schedule: ${formData.preferredSchedule}`,
          source: 'website-chatbot',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredSchedule: '',
      });
    } catch (error) {
      console.error('Error scheduling tour:', error);
      setStatus('error');
      setErrorMessage('Unable to submit right now. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3">
      {!isOpen && (
        <>
          <div className="max-w-xs rounded-2xl border border-[#00A4EF]/15 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl">
            Hi 👋 Want to schedule a campus tour?
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setStatus('idle');
              setErrorMessage('');
            }}
            className="rounded-full bg-gradient-to-r from-[#00A4EF] to-[#1f2e57] px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition hover:scale-105"
          >
            Schedule Tour
          </button>
        </>
      )}

      {isOpen && (
        <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#1f2e57] to-[#00A4EF] px-5 py-4 text-white">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/75">NextZen Bot</p>
              <h2 className="text-lg font-bold">Schedule a Tour</h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full bg-white/15 p-2 transition hover:bg-white/25"
              aria-label="Close schedule tour chatbot"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.22 4.22a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L11.06 10l4.72 4.72a.75.75 0 0 1-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 px-5 py-5">
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              Please share your name, phone number, email address, and preferred tour schedule.
            </div>

            {status === 'success' ? (
              <div className="space-y-4 rounded-2xl bg-emerald-50 px-4 py-5 text-sm text-emerald-700">
                <p className="font-bold">Thanks! Your tour request has been sent.</p>
                <p>Our team will contact you soon to confirm the visit.</p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setIsOpen(false);
                  }}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#00A4EF]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone number"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#00A4EF]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#00A4EF]"
                />
                <textarea
                  name="preferredSchedule"
                  value={formData.preferredSchedule}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Preferred day and time for the tour"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#00A4EF]"
                />

                {status === 'error' && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-full bg-gradient-to-r from-[#F25022] to-[#FFB900] px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Tour Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
