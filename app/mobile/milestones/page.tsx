'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Milestone {
  _id: string;
  category: string;
  milestone: string;
  status: string;
  dateAchieved?: string;
  observations?: string;
}

export default function MilestonesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  // Example milestone data structure
  const categories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'cognitive', label: 'Cognitive', icon: '🧠' },
    { id: 'language', label: 'Language', icon: '💬' },
    { id: 'social_emotional', label: 'Social', icon: '❤️' },
    { id: 'physical', label: 'Physical', icon: '🏃' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'self_help', label: 'Self-Help', icon: '🙋' },
  ];

  const sampleMilestones: Milestone[] = [
    { _id: '1', category: 'cognitive', milestone: 'Sorts objects by color', status: 'achieved', dateAchieved: '2026-06-15' },
    { _id: '2', category: 'language', milestone: 'Uses 2-3 word sentences', status: 'developing' },
    { _id: '3', category: 'physical', milestone: 'Climbs playground equipment', status: 'achieved', dateAchieved: '2026-05-20' },
    { _id: '4', category: 'social_emotional', milestone: 'Takes turns with peers', status: 'emerging' },
    { _id: '5', category: 'creative', milestone: 'Draws recognizable shapes', status: 'not_started' },
    { _id: '6', category: 'self_help', milestone: 'Washes hands independently', status: 'developing' },
    { _id: '7', category: 'cognitive', milestone: 'Counts to 10', status: 'developing' },
    { _id: '8', category: 'language', milestone: 'Identifies letters of name', status: 'emerging' },
  ];

  const filteredMilestones = activeCategory === 'all' 
    ? sampleMilestones 
    : sampleMilestones.filter(m => m.category === activeCategory);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      not_started: { color: 'bg-gray-100 text-gray-600', label: 'Not Started' },
      emerging: { color: 'bg-yellow-100 text-yellow-700', label: 'Emerging' },
      developing: { color: 'bg-blue-100 text-blue-700', label: 'Developing' },
      achieved: { color: 'bg-green-100 text-green-700', label: 'Achieved ✓' },
    };
    return badges[status] || badges.not_started;
  };

  const getProgressPercentage = () => {
    const achieved = sampleMilestones.filter(m => m.status === 'achieved').length;
    return Math.round((achieved / sampleMilestones.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Learning Milestones</h1>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-teal-600">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all"
              style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>🟢 {sampleMilestones.filter(m => m.status === 'achieved').length} Achieved</span>
            <span>🔵 {sampleMilestones.filter(m => m.status === 'developing').length} Developing</span>
            <span>🟡 {sampleMilestones.filter(m => m.status === 'emerging').length} Emerging</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {filteredMilestones.map((milestone) => {
            const badge = getStatusBadge(milestone.status);
            return (
              <div key={milestone._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{milestone.milestone}</p>
                    <p className="text-xs text-gray-400 capitalize mt-1">
                      {categories.find(c => c.id === milestone.category)?.icon} {milestone.category.replace('_', ' ')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
                {milestone.dateAchieved && (
                  <p className="text-xs text-green-600 mt-2">
                    Achieved on {new Date(milestone.dateAchieved).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
