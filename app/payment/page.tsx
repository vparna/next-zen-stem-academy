'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';

function PaymentContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '100';
  const program = searchParams.get('program') || 'robotics';
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1a3a7a] mb-3">Payment Successful!</h1>
          <p className="text-gray-600 mb-2">
            Your ${amount} deposit for the <span className="font-semibold capitalize">{program}</span> program has been received.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation email has been sent. Your seat is now reserved!
          </p>
          <Link
            href="/robotics-enrollment"
            className="inline-block bg-[#1a3a7a] text-white font-bold px-8 py-3 rounded-full hover:bg-[#15306a] transition-colors"
          >
            Back to Program Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a3a7a] to-[#2563eb] p-8 text-white text-center">
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-blue-200 text-sm">NextZen Academy — Robotics Program</p>
          </div>

          {/* Amount */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Program</span>
              <span className="font-bold text-[#1a3a7a] capitalize">{program} Training</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Deposit Amount</span>
              <span className="text-3xl font-black text-[#1a3a7a]">${amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Remaining Balance</span>
              <span className="text-gray-500">$250 (due before Aug 17, 2026)</span>
            </div>
          </div>

          {/* Mock Payment Form */}
          <div className="p-8 space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-[#1a3a7a]">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-bold text-[#1a3a7a]">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-bold text-[#1a3a7a]">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-bold text-[#1a3a7a]">Name on Card</label>
              <input
                type="text"
                placeholder="Full name as shown on card"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 px-8 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${amount} Deposit`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              🔒 Payments are secure and encrypted. This is a demo payment page.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/robotics-enrollment"
            className="text-[#1a3a7a] font-semibold hover:underline text-sm"
          >
            ← Back to Enrollment Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading payment...</p>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
