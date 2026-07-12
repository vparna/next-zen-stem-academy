'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HealthRecord {
  _id: string;
  type: string;
  date: string;
  temperature?: number;
  symptoms?: string[];
  action?: string;
  notes?: string;
  medicationName?: string;
  dosage?: string;
}

export default function HealthPage() {
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('health_checks');

  useEffect(() => {
    fetchRecords();
  }, [activeTab]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/childcare/health?resource=${activeTab}`, {
        headers: { 'Authorization': `****** }
      });
      if (response.ok) {
        const data = await response.json();
        setRecords(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching health records:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'health_checks', label: 'Health Checks', icon: '🏥' },
    { id: 'illness', label: 'Illness Log', icon: '🤒' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'immunizations', label: 'Immunizations', icon: '💉' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Health & Safety</h1>
        </div>

        {/* Emergency Info Card */}
        <div className="bg-red-100 rounded-xl p-4 mb-6 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🚨</span>
            <span className="font-semibold text-red-800">Emergency Contacts</span>
          </div>
          <p className="text-sm text-red-700">Tap to view or update emergency contacts and authorized pickup persons</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Allergy Warning */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-4 border border-yellow-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-yellow-800 text-sm">Allergy Alerts</p>
              <p className="text-xs text-yellow-700">View and manage allergy information</p>
            </div>
          </div>
        </div>

        {/* Records List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600 mx-auto"></div>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-gray-500">No records found</p>
            <p className="text-xs text-gray-400 mt-1">All clear!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <div key={record._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                  {record.temperature && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      record.temperature > 100.4 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {record.temperature}°F
                    </span>
                  )}
                </div>
                {record.symptoms && record.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {record.symptoms.map((symptom, i) => (
                      <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                        {symptom}
                      </span>
                    ))}
                  </div>
                )}
                {record.medicationName && (
                  <p className="text-sm font-medium text-gray-700">💊 {record.medicationName} - {record.dosage}</p>
                )}
                {record.action && (
                  <p className="text-sm text-gray-600 capitalize">Action: {record.action.replace('_', ' ')}</p>
                )}
                {record.notes && (
                  <p className="text-xs text-gray-500 mt-1">{record.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
