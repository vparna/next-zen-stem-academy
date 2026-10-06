'use client';

import { useEffect, useMemo, useState } from 'react';

interface TourSlot {
  id: string;
  startAt: string;
  endAt: string;
}

const CAMPUS_TIME_ZONE = 'America/Los_Angeles';
const isValidEmail = (value: string) => {
  const trimmed = value.trim();
  const atIndex = trimmed.indexOf('@');
  const lastAtIndex = trimmed.lastIndexOf('@');
  const dotIndex = trimmed.lastIndexOf('.');

  return atIndex > 0 && atIndex === lastAtIndex && dotIndex > atIndex + 1 && dotIndex < trimmed.length - 1;
};

const formatDateHeading = (iso: string) => new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: CAMPUS_TIME_ZONE,
}).format(new Date(iso));

const formatTimeRange = (startIso: string, endIso: string) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: CAMPUS_TIME_ZONE,
  });

  return `${formatter.format(new Date(startIso))} – ${formatter.format(new Date(endIso))}`;
};

const getCampusDateString = (date: Date) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: CAMPUS_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value])
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
};

const getTomorrowCampusDate = () => {
  const todayCampus = getCampusDateString(new Date());
  const tomorrowUtc = new Date(`${todayCampus}T00:00:00Z`);
  tomorrowUtc.setUTCDate(tomorrowUtc.getUTCDate() + 1);
  return tomorrowUtc.toISOString().slice(0, 10);
};

export default function EnrollmentForm() {
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [childAges, setChildAges] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [slots, setSlots] = useState<TourSlot[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const tomorrowCampusDate = useMemo(() => getTomorrowCampusDate(), []);

  const fetchSlots = async (date?: string) => {
    setLoadingSlots(true);
    try {
      const query = date ? `?date=${encodeURIComponent(date)}` : '';
      const response = await fetch(`/api/tour-slots${query}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load tour slots');
      }
      setSlots(data.slots || []);
      setSelectedSlotId((current) => (data.slots || []).some((slot: TourSlot) => slot.id === current) ? current : '');
    } catch (error) {
      console.error('Error loading tour slots:', error);
      setStatus('❌ We could not load tour availability right now. Please try again shortly.');
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, TourSlot[]>>((groups, slot) => {
      const key = formatDateHeading(slot.startAt);
      groups[key] = groups[key] || [];
      groups[key].push(slot);
      return groups;
    }, {});
  }, [slots]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!parentName.trim()) nextErrors.parentName = 'Parent name is required.';
    if (!parentPhone.trim()) nextErrors.parentPhone = 'Phone number is required.';
    if (!parentEmail.trim()) nextErrors.parentEmail = 'Email is required.';
    else if (!isValidEmail(parentEmail)) nextErrors.parentEmail = 'Enter a valid email address.';
    if (!childAges.trim()) nextErrors.childAges = 'Please enter your child age or ages.';
    if (!selectedSlotId) nextErrors.selectedSlotId = 'Please choose an available 30-minute tour slot.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setChildAges('');
    setSelectedSlotId('');
    setErrors({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) {
      setStatus('❌ Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tour-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlotId,
          parentName,
          parentPhone,
          parentEmail,
          childAges,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule the tour');
      }

      setStatus(data.emailWarning || '✓ Tour scheduled successfully. A confirmation email has been sent to you and our admissions team.');
      resetForm();
      await fetchSlots();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to schedule the tour';
      setStatus(`❌ ${message}`);
      if (message.toLowerCase().includes('no longer available')) {
        await fetchSlots();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-slate-100 shadow-xl space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-black tracking-widest text-[#F25022] uppercase">
          Schedule a Tour
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1f2e57]">
          Schedule a Tour – Meet Our Team
        </h2>
        <p className="text-xs md:text-sm text-[#1f2e57]/70 font-semibold max-w-2xl mx-auto">
          Choose an available 30-minute tour slot and our team will confirm your visit by email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Parent Name *</label>
            <input
              type="text"
              value={parentName}
              onChange={(event) => setParentName(event.target.value)}
              placeholder="Jane Doe"
              className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] ${errors.parentName ? 'border-red-400' : 'border-slate-200 focus:border-[#00A4EF]'}`}
            />
            {errors.parentName && <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.parentName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Phone Number *</label>
            <input
              type="tel"
              value={parentPhone}
              onChange={(event) => setParentPhone(event.target.value)}
              placeholder="(425) 555-0123"
              className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] ${errors.parentPhone ? 'border-red-400' : 'border-slate-200 focus:border-[#00A4EF]'}`}
            />
            {errors.parentPhone && <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.parentPhone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Email *</label>
            <input
              type="email"
              value={parentEmail}
              onChange={(event) => setParentEmail(event.target.value)}
              placeholder="jane@example.com"
              className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] ${errors.parentEmail ? 'border-red-400' : 'border-slate-200 focus:border-[#00A4EF]'}`}
            />
            {errors.parentEmail && <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.parentEmail}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-[#1f2e57]/70 block">Kid Age(s) *</label>
            <input
              type="text"
              value={childAges}
              onChange={(event) => setChildAges(event.target.value)}
              placeholder="2, 4"
              className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#1f2e57] ${errors.childAges ? 'border-red-400' : 'border-slate-200 focus:border-[#00A4EF]'}`}
            />
            <p className="text-[11px] text-[#1f2e57]/55 font-semibold">Enter one or more ages as plain text, separated by commas.</p>
            {errors.childAges && <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.childAges}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black uppercase text-[#F25022] tracking-wider">
              Available 30-Minute Tour Slots
            </h3>
            <button
              type="button"
              onClick={() => fetchSlots(selectedDate || undefined)}
              className="text-[11px] font-black uppercase tracking-wider text-[#00A4EF] hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#1f2e57]/70 block mb-1">Change Date</label>
              <input
                type="date"
                min={tomorrowCampusDate}
                value={selectedDate}
                onChange={async (event) => {
                  const nextDate = event.target.value;
                  setSelectedDate(nextDate);
                  await fetchSlots(nextDate || undefined);
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1f2e57] focus:outline-none focus:border-[#00A4EF]"
              />
            </div>
            <button
              type="button"
              onClick={async () => {
                setSelectedDate('');
                await fetchSlots();
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-wider text-[#1f2e57] hover:border-[#00A4EF]"
            >
              Show Nearest 5
            </button>
          </div>

          {loadingSlots ? (
            <div className="rounded-2xl border border-slate-100 bg-[#FAF8F5] px-5 py-8 text-center text-sm font-semibold text-[#1f2e57]/70">
              Loading tour availability...
            </div>
          ) : Object.keys(groupedSlots).length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-[#FAF8F5] px-5 py-8 text-center text-sm font-semibold text-[#1f2e57]/70">
              {selectedDate ? 'No slots available for the selected date. Please pick another date.' : 'No tour slots are currently available. Please check back soon.'}
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(groupedSlots).map(([day, daySlots]) => (
                <div key={day} className="rounded-2xl border border-slate-100 p-5 bg-[#FAF8F5]">
                  <p className="text-sm font-black text-[#1f2e57] mb-3">{day}</p>
                  <div className="flex flex-wrap gap-3">
                    {daySlots.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => {
                            setSelectedSlotId(slot.id);
                            setErrors((current) => {
                              const next = { ...current };
                              delete next.selectedSlotId;
                              return next;
                            });
                          }}
                          className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${isSelected ? 'border-[#F25022] bg-[#F25022] text-white shadow-md' : 'border-slate-200 bg-white text-[#1f2e57] hover:border-[#00A4EF]'}`}
                        >
                          {formatTimeRange(slot.startAt, slot.endAt)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.selectedSlotId && <p className="text-red-500 text-[10px] font-black uppercase mt-1 pl-1">{errors.selectedSlotId}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loadingSlots}
          className="w-full py-4 rounded-full font-black text-xs text-center uppercase tracking-wider text-white bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-90 shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Tour'}
        </button>

        {status && (
          <p className={`text-xs font-bold text-center mt-4 p-3 rounded-xl border ${status.startsWith('✓') ? 'text-[#00A4EF] bg-[#00A4EF]/10 border-[#00A4EF]/20' : 'text-[#F25022] bg-[#F25022]/10 border-[#F25022]/20'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
