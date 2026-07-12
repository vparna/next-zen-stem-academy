'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransportationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tracking');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Transportation</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'tracking' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            📍 Live Track
          </button>
          <button onClick={() => setActiveTab('routes')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'routes' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            🗺️ Routes
          </button>
          <button onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'schedule' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            🕐 Schedule
          </button>
        </div>

        {activeTab === 'tracking' ? (
          <div className="space-y-4">
            {/* Live Status Card */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚌</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Bus Route A</h3>
                  <p className="text-xs text-gray-500">Morning Pickup</p>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  On Route
                </span>
              </div>

              {/* GPS Placeholder */}
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <span className="text-4xl">🗺️</span>
                  <p className="text-sm text-gray-500 mt-2">GPS Tracking Map</p>
                  <p className="text-xs text-gray-400">Real-time location updates</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ETA to your stop:</span>
                  <span className="font-semibold text-amber-600">~8 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next stop:</span>
                  <span className="text-gray-700">Oak Street</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Driver:</span>
                  <span className="text-gray-700">Mr. Johnson</span>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-gray-700 mb-3">🔔 Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bus approaching</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Child picked up</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Child dropped off</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Route delays</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </label>
              </div>
            </div>
          </div>
        ) : activeTab === 'routes' ? (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">🗺️ Assigned Routes</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Route A - Morning</p>
                    <p className="text-xs text-gray-500">Pickup: 7:30 AM • Stop #3</p>
                  </div>
                  <span className="text-xl">🚌</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Route A - Afternoon</p>
                    <p className="text-xs text-gray-500">Dropoff: 3:45 PM • Stop #3</p>
                  </div>
                  <span className="text-xl">🚌</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">🕐 Bus Schedule</h3>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  <div className="text-xs text-gray-500 text-right">
                    <p>AM: 7:30 - 8:15</p>
                    <p>PM: 3:30 - 4:15</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
