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
            onClick={() => router.push('/mobile')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Home
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

        {/* Header - Handled by MobileLayout, we just need a subtext */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">Show this QR code for check-in/check-out</p>
        </div>

        {/* Child Selection */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 p-5 mb-6">
          <label className="block text-xs font-bold text-indigo-900/60 uppercase tracking-wider mb-2 px-1">
            Select Child
          </label>
          <div className="relative">
            <select
              value={selectedChild}
              onChange={(e) => {
                setSelectedChild(e.target.value);
                setQRCodeData(null);
              }}
              className="w-full appearance-none bg-white border border-gray-200/60 text-gray-800 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all shadow-sm font-medium"
            >
              {children.map((child) => (
                <option key={child._id} value={child._id}>
                  {child.name} {child.age && `(${child.age} years)`}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
              ▼
            </div>
          </div>

          <button
            onClick={generateQRCode}
            disabled={generating || !selectedChild}
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm tracking-wide"
          >
            {generating ? 'GENERATING...' : 'GENERATE QR CODE'}
          </button>
        </div>

        {/* QR Code Display */}
        {qrCodeData && (
          <div className="relative overflow-hidden bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
            
            <div className="relative z-10 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">
                {qrCodeData.childName}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Student ID</p>
            </div>
            
            <div className="relative z-10 bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] inline-block">
              <img 
                src={qrCodeData.qrCode} 
                alt="Student QR Code" 
                className="w-56 h-56 mx-auto mix-blend-multiply"
              />
            </div>

            <div className="relative z-10 mt-6 pt-6 border-t border-gray-100">
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                Present this code to the scanner device at the center entrance.
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


      </div>
    </div>
  );
}
