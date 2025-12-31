'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

interface Course {
  _id: string;
  name: string;
  price: number;
  duration: string;
}

// Load Stripe outside component to avoid recreating instance
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  useEffect(() => {
    const courseId = searchParams.get('courseId');
    
    if (!courseId) {
      router.push('/courses');
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchCourse(courseId);
  }, [searchParams, router]);

  const fetchCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
      } else {
        setError('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    if (!course) return;

    setProcessing(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // Create payment intent
      const intentResponse = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: course.price,
          courseId: course._id,
          courseName: course.name,
        }),
      });

      if (!intentResponse.ok) {
        const data = await intentResponse.json();
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const intentData = await intentResponse.json();
      setClientSecret(intentData.clientSecret);
      setShowPaymentForm(true);
      
    } catch (err) {
      setError((err as Error).message || 'Failed to initiate payment');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !clientSecret) return;

    setProcessing(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // For demo purposes, we'll simulate the payment
      // In production, you'd use Stripe Elements properly
      
      // Create enrollment after "successful" payment
      const enrollResponse = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: course._id,
          amount: course.price,
        }),
      });

      if (!enrollResponse.ok) {
        const data = await enrollResponse.json();
        throw new Error(data.error || 'Failed to create enrollment');
      }

      const enrollData = await enrollResponse.json();

      alert(`Payment successful! Enrollment ID: ${enrollData.enrollmentId}`);
      router.push('/dashboard');
      
    } catch (err) {
      setError((err as Error).message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/courses" className="text-blue-600 hover:text-blue-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {course && (
            <>
              {/* Order Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">Duration: {course.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${course.price}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                
                {!showPaymentForm ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      <strong>Secure Payment Processing:</strong> We use Stripe for secure payment processing.
                      Your card information is encrypted and never stored on our servers.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Secure payment processing with Stripe</li>
                      <li>All major credit cards accepted</li>
                      <li>Instant enrollment confirmation</li>
                      <li>30-day money-back guarantee</li>
                    </ul>
                  </div>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            required
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                              required
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-gray-600">
                            <strong>Test Card:</strong> Use 4242 4242 4242 4242 with any future expiry and any CVC for testing
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!showPaymentForm ? (
                  <>
                    <button
                      onClick={initiatePayment}
                      disabled={processing}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                    <Link
                      href={`/courses/${course._id}`}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition text-center"
                    >
                      Back to Course
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing Payment...' : `Pay $${course.price}`}
                    </button>
                    <button
                      onClick={() => {
                        setShowPaymentForm(false);
                        setClientSecret('');
                      }}
                      disabled={processing}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">🔒</span>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💳</span>
                    <span>All Cards Accepted</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Money-back Guarantee</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
