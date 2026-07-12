'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Classroom {
  _id: string;
  name: string;
  ageGroup: string;
  capacity: number;
  currentCount: number;
  assignedStaff: string[];
  maxRatio: number;
}

interface BehaviorLog {
  _id: string;
  childId: string;
  type: string;
  category: string;
  description: string;
  date: string;
}

export default function ClassroomPage() {
  const router = useRouter();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [behaviorLogs, setBehaviorLogs] = useState<BehaviorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('classrooms');

  useEffect(() => {
    fetchData();
  }, [activeView]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const resource = activeView === 'classrooms' ? 'classrooms' : 'behavior';
      const response = await fetch(`/api/childcare/classroom?resource=${resource}`, {
        headers: { 'Authorization': `****** }
      });
      if (response.ok) {
        const data = await response.json();
        if (activeView === 'classrooms') {
          setClassrooms(data.data || []);
        } else {
          setBehaviorLogs(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching classroom data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatioStatus = (current: number, capacity: number) => {
    const ratio = current / capacity;
    if (ratio >= 0.9) return { color: 'text-red-600 bg-red-50', label: 'Near Full' };
    if (ratio >= 0.7) return { color: 'text-yellow-600 bg-yellow-50', label: 'Filling Up' };
    return { color: 'text-green-600 bg-green-50', label: 'Available' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Classrooms</h1>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveView('classrooms')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              activeView === 'classrooms' ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            🏫 Rooms
          </button>
          <button
            onClick={() => setActiveView('behavior')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              activeView === 'behavior' ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            📊 Behavior
          </button>
          <button
            onClick={() => setActiveView('rewards')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              activeView === 'rewards' ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            ⭐ Rewards
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600 mx-auto"></div>
          </div>
        ) : activeView === 'classrooms' ? (
          <div className="space-y-3">
            {classrooms.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-5xl mb-4">🏫</div>
                <p className="text-gray-500">No classrooms set up yet</p>
              </div>
            ) : (
              classrooms.map((room) => {
                const status = getRatioStatus(room.currentCount, room.capacity);
                return (
                  <div key={room._id} className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{room.name}</h3>
                        <p className="text-xs text-gray-500">{room.ageGroup}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    {/* Capacity Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{room.currentCount} / {room.capacity} children</span>
                        <span>Ratio: 1:{room.maxRatio}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            room.currentCount / room.capacity >= 0.9 ? 'bg-red-400' :
                            room.currentCount / room.capacity >= 0.7 ? 'bg-yellow-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${(room.currentCount / room.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-500">👩‍🏫 {room.assignedStaff.length} staff</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : activeView === 'behavior' ? (
          <div className="space-y-3">
            {behaviorLogs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-gray-500">No behavior logs yet</p>
              </div>
            ) : (
              behaviorLogs.map((log) => (
                <div key={log._id} className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${
                      log.type === 'positive' ? 'bg-green-400' : log.type === 'concern' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></span>
                    <span className="text-sm font-medium capitalize">{log.type}</span>
                    <span className="text-xs text-gray-400 ml-auto">{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700">{log.description}</p>
                  <span className="text-xs text-gray-400 capitalize mt-1 inline-block">{log.category}</span>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">⭐</div>
            <p className="text-gray-500">Rewards & achievements</p>
            <p className="text-xs text-gray-400 mt-1">Stars, stickers, and badges earned</p>
          </div>
        )}
      </div>
    </div>
  );
}
