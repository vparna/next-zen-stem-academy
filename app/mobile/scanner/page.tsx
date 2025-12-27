'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Html5QrcodeScanner } from 'html5-qrcode';

type ScanMode = 'checkin' | 'checkout';

export default function ScannerPage() {
  const [scanMode, setScanMode] = useState<ScanMode>('checkin');
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is a teacher
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scanner]);

  const startScanning = () => {
    setScanning(true);
    setMessage('');
    setError('');

    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanError);
    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().then(() => {
        setScanning(false);
        setScanner(null);
      }).catch(console.error);
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    console.log('QR Code scanned:', decodedText);
    
    // Stop scanner
    if (scanner) {
      await scanner.clear();
      setScanning(false);
      setScanner(null);
    }

    // Process the scanned QR code
    await processQRCode(decodedText);
  };

  const onScanError = (errorMessage: string) => {
    // Ignore scanning errors (they happen frequently while scanning)
    console.debug('Scan error:', errorMessage);
  };

  const processQRCode = async (qrData: string) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = scanMode === 'checkin' 
        ? '/api/attendance'
        : '/api/attendance/checkout';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ qrData }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || `${scanMode === 'checkin' ? 'Check-in' : 'Check-out'} successful!`);
        setError('');
      } else {
        setError(data.error || `Failed to ${scanMode === 'checkin' ? 'check in' : 'check out'}`);
        setMessage('');
      }
    } catch (e) {
      console.error('Failed to process QR code:', e);
      setError('Error processing QR code');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance Scanner</h1>
          <p className="text-gray-600">Scan student QR codes for attendance</p>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setScanMode('checkin');
                if (scanning) {
                  stopScanning();
                }
              }}
              className={`px-6 py-4 rounded-lg font-medium transition-colors ${
                scanMode === 'checkin'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✓ Check In
            </button>
            <button
              onClick={() => {
                setScanMode('checkout');
                if (scanning) {
                  stopScanning();
                }
              }}
              className={`px-6 py-4 rounded-lg font-medium transition-colors ${
                scanMode === 'checkout'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✗ Check Out
            </button>
          </div>
        </div>

        {/* Scanner Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {!scanning ? (
            <button
              onClick={startScanning}
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
            >
              📷 Start Scanner
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="w-full bg-red-600 text-white px-6 py-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
            >
              ⏹ Stop Scanner
            </button>
          )}
        </div>

        {/* Scanner Container */}
        {scanning && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div id="qr-reader" className="w-full"></div>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium text-center">✓ {message}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium text-center">✗ {error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            <li>Select check-in or check-out mode</li>
            <li>Click &quot;Start Scanner&quot; to activate camera</li>
            <li>Point camera at student&apos;s QR code</li>
            <li>Wait for automatic scan and confirmation</li>
            <li>Repeat for next student</li>
          </ol>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/mobile/attendance')}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            View Attendance
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
