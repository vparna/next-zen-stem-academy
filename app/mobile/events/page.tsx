'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CalendarEvent {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  type: string;
  rsvpRequired: boolean;
  rsvps?: { parentId: string; response: string }[];
}

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/childcare/events?month=${currentMonth}`, {
        headers: { 'Authorization': `****** }
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      holiday: '🎉', field_trip: '🚌', parent_conference: '👥',
      celebration: '🎂', fundraiser: '💝', meeting: '📋', other: '📌'
    };
    return icons[type] || '📌';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      holiday: 'border-l-red-400', field_trip: 'border-l-blue-400',
      parent_conference: 'border-l-purple-400', celebration: 'border-l-pink-400',
      fundraiser: 'border-l-green-400', meeting: 'border-l-yellow-400'
    };
    return colors[type] || 'border-l-gray-400';
  };

  const navigateMonth = (direction: number) => {
    const [year, month] = currentMonth.split('-').map(Number);
    const date = new Date(year, month - 1 + direction, 1);
    setCurrentMonth(date.toISOString().slice(0, 7));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Events & Calendar</h1>
        </div>

        {/* Month Navigation */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6 flex items-center justify-between">
          <button onClick={() => navigateMonth(-1)} className="text-xl text-gray-600 hover:text-gray-800">‹</button>
          <span className="text-lg font-semibold text-gray-700">
            {new Date(currentMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => navigateMonth(1)} className="text-xl text-gray-600 hover:text-gray-800">›</button>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-gray-500">No events this month</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event._id} className={`bg-white rounded-xl shadow-md p-4 border-l-4 ${getTypeColor(event.type)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeIcon(event.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      {event.time && ` • 🕐 ${event.time}`}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-500">📍 {event.location}</p>
                    )}
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    )}
                    {event.rsvpRequired && (
                      <div className="mt-3 flex gap-2">
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200">
                          ✓ Going
                        </button>
                        <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-200">
                          ? Maybe
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200">
                          ✗ Can&apos;t go
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
