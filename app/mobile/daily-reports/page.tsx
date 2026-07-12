'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DailyReport {
  _id: string;
  childId: string;
  date: string;
  meals: { mealType: string; items: string[]; amount: string; time: string }[];
  naps: { startTime: string; endTime?: string; quality: string }[];
  bathroomLogs: { time: string; type: string }[];
  activities: { activity: string; category: string; time: string }[];
  mood: string;
  teacherNotes?: string;
  photos: { url: string; caption?: string }[];
}

export default function DailyReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchReports();
  }, [selectedDate]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/childcare/daily-reports?date=${selectedDate}`, {
        headers: { 'Authorization': `****** }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moods: Record<string, string> = {
      happy: '😊', calm: '😌', fussy: '😢', tired: '😴', energetic: '⚡'
    };
    return moods[mood] || '😊';
  };

  const getMealIcon = (type: string) => {
    const icons: Record<string, string> = {
      breakfast: '🥣', am_snack: '🍎', lunch: '🍽️', pm_snack: '🍪', dinner: '🍲'
    };
    return icons[type] || '🍽️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Daily Reports</h1>
        </div>

        {/* Date Picker */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-lg font-medium text-gray-700 border rounded-lg p-2"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-3 text-gray-500">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">No reports for this date</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report._id} className="bg-white rounded-xl shadow-md p-5">
                {/* Mood */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Today&apos;s Mood</span>
                  <span className="text-3xl">{getMoodEmoji(report.mood)}</span>
                </div>

                {/* Meals */}
                {report.meals.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">🍽️ Meals</h3>
                    <div className="space-y-2">
                      {report.meals.map((meal, i) => (
                        <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
                          <span>{getMealIcon(meal.mealType)}</span>
                          <div className="flex-1">
                            <span className="text-sm font-medium capitalize">{meal.mealType.replace('_', ' ')}</span>
                            <p className="text-xs text-gray-500">{meal.items.join(', ')}</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{meal.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Naps */}
                {report.naps.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">😴 Naps</h3>
                    <div className="space-y-2">
                      {report.naps.map((nap, i) => (
                        <div key={i} className="bg-purple-50 rounded-lg p-2">
                          <span className="text-sm">
                            {new Date(nap.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {nap.endTime && ` - ${new Date(nap.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                          </span>
                          <span className="text-xs ml-2 text-purple-600 capitalize">({nap.quality})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bathroom */}
                {report.bathroomLogs.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">🚽 Bathroom</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.bathroomLogs.map((log, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {log.type.replace('_', ' ')} • {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {report.activities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">🎨 Activities</h3>
                    <div className="space-y-1">
                      {report.activities.map((activity, i) => (
                        <div key={i} className="text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                          <span>{activity.activity}</span>
                          <span className="text-xs text-gray-400 capitalize">({activity.category})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos */}
                {report.photos.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">📸 Photos ({report.photos.length})</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {report.photos.map((photo, i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img src={photo.url} alt={photo.caption || 'Activity photo'} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Teacher Notes */}
                {report.teacherNotes && (
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                    <h3 className="text-sm font-semibold text-yellow-700 mb-1">📝 Teacher Notes</h3>
                    <p className="text-sm text-gray-700">{report.teacherNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
