'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BusRoute {
  _id: string;
  name: string;
  stops: { name: string; time: string; order: number }[];
  driver?: { name: string; phone: string };
  status: string;
}

export default function TransportationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tracking');
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);

  const getTabClassName = (tabName: string) => {
    const baseClass = 'flex-1 py-2 rounded-lg text-sm font-medium';
    const activeClass = 'bg-amber-600 text-white';
    const inactiveClass = 'bg-white text-gray-600 shadow-sm';
    return activeTab === tabName ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
  };

  const getStatusBadgeClassName = (status: string) => {
    const baseClass = 'ml-auto text-xs px-2 py-1 rounded-full font-medium';
    const activeClass = 'bg-green-100 text-green-700';
    const inactiveClass = 'bg-gray-100 text-gray-500';
    return status === 'active' ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/childcare/transportation?resource=routes', {
        headers: { 'Authorization': `******` },
      });
      if (response.ok) {
        const data = await response.json();
        setRoutes(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={() => setActiveTab('tracking')}
           className={getTabClassName('tracking')}
          >
            📍 Live Track
          </button>
          <button
            onClick={() => setActiveTab('routes')}
           className={getTabClassName('routes')}
          >
            🗺️ Routes
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
           className={getTabClassName('schedule')}
          >
            🕐 Schedule
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto"></div>
          </div>
        ) : activeTab === 'tracking' ? (
          <div className="space-y-4">
            {routes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-5xl mb-4">🚌</div>
                <p className="text-gray-500 font-medium">No bus routes assigned</p>
                <p className="text-xs text-gray-400 mt-1">Contact the center to set up transportation</p>
              </div>
            ) : (
              routes.map((route) => (
                <div key={route._id} className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🚌</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{route.name}</h3>
                      <p className="text-xs text-gray-500">{route.driver?.name || 'Driver TBD'}</p>
                    </div>
                     <span className={getStatusBadgeClassName(route.status)}>
                       {route.status === 'active' ? 'On Route' : route.status || 'Scheduled'}
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

                  {route.stops && route.stops.length > 0 && (
                    <div className="space-y-2">
                      {route.stops.map((stop, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Stop {stop.order}: {stop.name}</span>
                          <span className="text-gray-700">{stop.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

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
            {routes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No routes assigned yet</p>
            ) : (
              <div className="space-y-3">
                {routes.map((route) => (
                  <div key={route._id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{route.name}</p>
                        <p className="text-xs text-gray-500">
                          {route.stops?.length || 0} stops • {route.driver?.name || 'Driver TBD'}
                        </p>
                      </div>
                      <span className="text-xl">🚌</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
