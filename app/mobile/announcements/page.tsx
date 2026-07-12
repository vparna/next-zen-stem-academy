'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  sentAt?: string;
  createdAt: string;
}

export default function AnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/childcare/communication?type=broadcast', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data.messages || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    const icons: Record<string, string> = {
      urgent: '🚨', high: '❗', normal: '📢', low: 'ℹ️'
    };
    return icons[priority] || '📢';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      emergency: 'bg-red-50 border-red-200',
      event: 'bg-blue-50 border-blue-200',
      reminder: 'bg-yellow-50 border-yellow-200',
      newsletter: 'bg-green-50 border-green-200',
      general: 'bg-gray-50 border-gray-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">📢</div>
            <p className="text-gray-500">No announcements</p>
            <p className="text-xs text-gray-400">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement._id} className={`rounded-xl p-4 border ${getTypeColor(announcement.type)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getPriorityIcon(announcement.priority)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
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
