'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CAMPUS_TIME_ZONE = 'America/Los_Angeles';

interface TourSlot {
  id: string;
  startAt: string;
  endAt: string;
  status: 'available' | 'booked';
  createdAt: string;
  bookedAt: string | null;
  bookedBy: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    childAges: string;
  } | null;
}

const formatDay = (iso: string) => new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: CAMPUS_TIME_ZONE,
}).format(new Date(iso));

const formatTimeRange = (startIso: string, endIso: string) => {
  const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: CAMPUS_TIME_ZONE });
  return `${formatter.format(new Date(startIso))} – ${formatter.format(new Date(endIso))}`;
};

export default function AdminTourSlotsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [slots, setSlots] = useState<TourSlot[]>([]);

  const fetchSlots = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/admin/tour-slots', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tour slots');
      }
      setSlots(data.slots || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tour slots';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchSlots(token);
  }, [fetchSlots, router]);

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, TourSlot[]>>((groups, slot) => {
      const key = formatDay(slot.startAt);
      groups[key] = groups[key] || [];
      groups[key].push(slot);
      return groups;
    }, {});
  }, [slots]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    setSaving(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch('/api/admin/tour-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ date, time }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tour slot');
      }
      setStatus('Tour slot created.');
      setDate('');
      setTime('09:00');
      await fetchSlots(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tour slot');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setError('');
    setStatus('');

    try {
      const response = await fetch(`/api/admin/tour-slots?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete slot');
      }
      setStatus('Tour slot removed.');
      await fetchSlots(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete slot');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">Loading tour slots...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campus Tour Calendar</h1>
            <p className="text-gray-600 mt-1">Manage the 30-minute slots shown on the public tour scheduler.</p>
          </div>
          <Link href="/admin/dashboard" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-center">
            ← Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleCreate} className="bg-white rounded-lg shadow p-6 grid md:grid-cols-[1fr_220px_auto] gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required className="w-full rounded-md border border-gray-300 px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
            <input type="time" step="1800" value={time} onChange={(event) => setTime(event.target.value)} required className="w-full rounded-md border border-gray-300 px-4 py-3" />
          </div>
          <button type="submit" disabled={saving} className="rounded-md bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? 'Saving...' : 'Add 30-min Slot'}
          </button>
        </form>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">{error}</div>}
        {status && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3">{status}</div>}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tour Slots</h2>
            <p className="text-sm text-gray-500">{slots.length} total slots</p>
          </div>

          {Object.keys(groupedSlots).length === 0 ? (
            <p className="text-gray-500">No tour slots created yet.</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedSlots).map(([day, daySlots]) => (
                <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-900">{day}</div>
                  <div className="divide-y divide-gray-100">
                    {daySlots.map((slot) => (
                      <div key={slot.id} className="px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold text-gray-900">{formatTimeRange(slot.startAt, slot.endAt)}</span>
                            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${slot.status === 'booked' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                              {slot.status}
                            </span>
                          </div>
                          {slot.bookedBy ? (
                            <div className="mt-2 text-sm text-gray-600 space-y-1">
                              <p><span className="font-semibold text-gray-800">Parent:</span> {slot.bookedBy.parentName}</p>
                              <p><span className="font-semibold text-gray-800">Email:</span> {slot.bookedBy.parentEmail}</p>
                              <p><span className="font-semibold text-gray-800">Phone:</span> {slot.bookedBy.parentPhone}</p>
                              <p><span className="font-semibold text-gray-800">Kid age(s):</span> {slot.bookedBy.childAges}</p>
                            </div>
                          ) : (
                            <p className="mt-2 text-sm text-gray-500">Available on the public scheduler.</p>
                          )}
                        </div>
                        {slot.status === 'available' && (
                          <button onClick={() => handleDelete(slot.id)} className="self-start rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                            Remove Slot
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
