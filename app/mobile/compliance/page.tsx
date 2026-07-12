'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompliancePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('checklists');
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetchLogs();
  }, [activeTab]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/childcare/compliance?type=${activeTab}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checklistItems = {
    room_checklist: [
      'Floors clean and dry', 'Toys sanitized', 'Diaper area stocked',
      'Hand washing supplies available', 'Temperature checked (68-72°F)',
      'Emergency exits clear', 'First aid kit accessible', 'Cribs properly set up',
      'Electrical outlets covered', 'Cleaning supplies locked'
    ],
    fire_drill: [
      'All children accounted for', 'Assembly point reached', 'Time recorded',
      'Staff roles followed', 'Issues documented'
    ],
    safe_sleep: [
      'Baby placed on back', 'Crib clear of loose items', 'Temperature appropriate',
      'Checked every 15 minutes', 'Position documented'
    ]
  };

  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const handleCheckItem = (item: string) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const tabs = [
    { id: 'checklists', label: 'Checklists', icon: '✅' },
    { id: 'fire_drill', label: 'Drills', icon: '🔥' },
    { id: 'visitor', label: 'Visitors', icon: '👤' },
    { id: 'ratio', label: 'Ratios', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Compliance (DCYF)</h1>
        </div>

        {/* Compliance Status */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Compliance Status</h3>
              <p className="text-sm text-green-600">All requirements met</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'checklists' ? (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">Daily Room Checklist</h3>
            <div className="space-y-2">
              {checklistItems.room_checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist[item] || false}
                    onChange={() => handleCheckItem(item)}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600"
                  />
                  <span className={`text-sm ${checklist[item] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">
              Submit Checklist
            </button>
          </div>
        ) : activeTab === 'fire_drill' ? (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">🔥 Fire Drill Log</h3>
            <div className="space-y-3">
              <select className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>Fire Drill</option>
                <option>Earthquake Drill</option>
                <option>Lockdown Drill</option>
                <option>Evacuation Drill</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Date</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Duration (sec)</label>
                  <input type="number" placeholder="120" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Children Present</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Staff Present</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">All children accounted for</span>
              </label>
              <textarea placeholder="Notes or issues..."
                className="w-full border rounded-lg px-3 py-2 text-sm h-20 resize-none" />
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">
                Log Drill
              </button>
            </div>
          </div>
        ) : activeTab === 'visitor' ? (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">👤 Visitor Log</h3>
            <div className="space-y-3">
              <input placeholder="Visitor Name *" className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Purpose of Visit *" className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Organization" className="w-full border rounded-lg px-3 py-2 text-sm" />
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm text-gray-700">Photo ID verified</span>
              </label>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">
                Check In Visitor
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">📊 Ratio Compliance</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Infants (0-12mo)</span>
                  <span className="text-xs text-green-600 font-medium">✓ Compliant</span>
                </div>
                <p className="text-xs text-gray-500">Required: 1:4 • Current: 1:3</p>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Toddlers (12-30mo)</span>
                  <span className="text-xs text-green-600 font-medium">✓ Compliant</span>
                </div>
                <p className="text-xs text-gray-500">Required: 1:7 • Current: 1:5</p>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Preschool (30mo-5yr)</span>
                  <span className="text-xs text-green-600 font-medium">✓ Compliant</span>
                </div>
                <p className="text-xs text-gray-500">Required: 1:10 • Current: 1:8</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
