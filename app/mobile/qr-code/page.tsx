'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storeQRCodeOffline, getStoredQRCodeForChild, isOnline } from '@/lib/offline-qr';
import { initializeNotifications, getNotificationPreference } from '@/lib/notifications';

interface Child {
  _id: string;
  name: string;
  age: number;
  grade?: string;
}

interface QRCodeData {
  qrCode: string;
  childId: string;
  childName: string;
}

export default function QRCodePage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [qrCodeData, setQRCodeData] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize notifications
    initializeNotifications();

    // Check online status
    setIsOffline(!isOnline());

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/children', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const childrenArray = data.children || data;
          setChildren(childrenArray);
          if (childrenArray.length > 0) {
            setSelectedChild(childrenArray[0]._id);
          }
        } else {
          setError('Failed to load children');
        }
      } catch (e) {
        console.error('Failed to load children:', e);
        setError('Error loading children');
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [router]);

  const generateQRCode = async () => {
    if (!selectedChild) return;

    setGenerating(true);
    setError('');

    try {
      // Try offline first if available
      if (isOffline) {
        const stored = getStoredQRCodeForChild(selectedChild);
        if (stored) {
          setQRCodeData({
            qrCode: stored.qrCodeImage,
            childId: stored.childId,
            childName: stored.childName,
          });
          setGenerating(false);
          return;
        } else {
          setError('No offline QR code available. Please connect to the internet.');
          setGenerating(false);
          return;
        }
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`/api/qrcode?childId=${selectedChild}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQRCodeData(data);
        
        // Store for offline use
        storeQRCodeOffline(data.childId, data.childName, data.qrCode);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate QR code');
      }
    } catch (e) {
      console.error('Failed to generate QR code:', e);
      
      // Try offline fallback
      const stored = getStoredQRCodeForChild(selectedChild);
      if (stored) {
        setQRCodeData({
          qrCode: stored.qrCodeImage,
          childId: stored.childId,
          childName: stored.childName,
        });
        setError('Using offline QR code');
      } else {
        setError('Error generating QR code');
      }
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">👶</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Children Added</h2>
          <p className="text-gray-600 mb-6">Please add a child to your account first to generate QR codes.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Offline Indicator */}
        {isOffline && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <span className="text-yellow-600">⚠️</span>
            <p className="text-sm text-yellow-800">Offline Mode - Using cached data</p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student QR Code</h1>
          <p className="text-gray-600">Show this QR code for check-in/check-out</p>
        </div>

        {/* Child Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Child
          </label>
          <select
            value={selectedChild}
            onChange={(e) => {
              setSelectedChild(e.target.value);
              setQRCodeData(null);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name} {child.age && `(${child.age} years)`}
              </option>
            ))}
          </select>

          <button
            onClick={generateQRCode}
            disabled={generating || !selectedChild}
            className="w-full mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {generating ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>

        {/* QR Code Display */}
        {qrCodeData && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {qrCodeData.childName}
              </h3>
              <p className="text-sm text-gray-500">Present this QR code to teacher</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block">
              <img 
                src={qrCodeData.qrCode} 
                alt="Student QR Code" 
                className="w-64 h-64 mx-auto"
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong> Show this QR code to the teacher when checking in or out of class.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/mobile/chat')}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Messages
          </button>
        </div>
      </div>
    </div>
  );
}
