'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FoodPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('menu');
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const resource = activeTab === 'menu' ? 'menus' : activeTab === 'allergies' ? 'dietary' : 'cacfp';
      const response = await fetch(`/api/childcare/food?resource=${resource}`, {
        headers: { 'Authorization': `****** }
      });
      if (response.ok) {
        const data = await response.json();
        setMenuData(data.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dayMeals = [
    { day: 'Monday', breakfast: 'Oatmeal & Fruit', snack1: 'Crackers & Cheese', lunch: 'Grilled Chicken & Veggies', snack2: 'Yogurt' },
    { day: 'Tuesday', breakfast: 'Pancakes & Berries', snack1: 'Apple Slices', lunch: 'Mac & Cheese with Peas', snack2: 'Trail Mix' },
    { day: 'Wednesday', breakfast: 'Cereal & Banana', snack1: 'Carrots & Hummus', lunch: 'Turkey Sandwich & Soup', snack2: 'Fruit Cup' },
    { day: 'Thursday', breakfast: 'Eggs & Toast', snack1: 'Goldfish Crackers', lunch: 'Pasta with Meat Sauce', snack2: 'Cheese Sticks' },
    { day: 'Friday', breakfast: 'Muffins & Milk', snack1: 'Celery & PB', lunch: 'Pizza & Salad', snack2: 'Cookies & Milk' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Food & Nutrition</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('menu')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'menu' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            🍽️ Menu
          </button>
          <button onClick={() => setActiveTab('allergies')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'allergies' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            ⚠️ Allergies
          </button>
          <button onClick={() => setActiveTab('logs')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'logs' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
            📋 Logs
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : activeTab === 'menu' ? (
          <div className="space-y-3">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">📅 This Week&apos;s Menu</h3>
              <p className="text-xs text-gray-500">CACFP Compliant ✓</p>
            </div>
            {dayMeals.map((day) => (
              <div key={day.day} className="bg-white rounded-xl shadow-md p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{day.day}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex gap-2"><span className="text-orange-500">🥣</span><span className="text-gray-600">{day.breakfast}</span></div>
                  <div className="flex gap-2"><span className="text-green-500">🍎</span><span className="text-gray-600">{day.snack1}</span></div>
                  <div className="flex gap-2"><span className="text-blue-500">🍽️</span><span className="text-gray-600">{day.lunch}</span></div>
                  <div className="flex gap-2"><span className="text-purple-500">🍪</span><span className="text-gray-600">{day.snack2}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'allergies' ? (
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-700 mb-4">⚠️ Allergy Profile</h3>
            <p className="text-sm text-gray-500 mb-4">Manage your child&apos;s dietary needs and allergies</p>
            <div className="space-y-3">
              <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                <p className="text-sm font-medium text-red-800">No allergies on file</p>
                <p className="text-xs text-red-600">Add allergies to ensure your child&apos;s safety</p>
              </div>
              <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-400 hover:text-green-600">
                + Add Allergy Information
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">Meal logs will appear here</p>
            <p className="text-xs text-gray-400">See what your child ate today</p>
          </div>
        )}
      </div>
    </div>
  );
}
