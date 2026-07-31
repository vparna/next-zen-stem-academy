'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Course {
  _id: string;
  name: string;
  price: number;
  duration: string;
}

// Load Stripe outside component to avoid recreating instance
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ course, amount, onSuccess, onCancel }: { course: Course, amount: number, onSuccess: () => void, onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: 'if_required',
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      setProcessing(false);
    } else {
      // Payment succeeded
      alert('Payment successful!');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-300 rounded-lg p-6">
      <PaymentElement />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing Payment...' : `Pay $${amount}`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
      
      // 1. Create enrollment first
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

      // 2. Create payment intent
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
          enrollmentId: enrollData.enrollmentId,
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
                ) : clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm 
                      course={course} 
                      amount={course.price} 
                      onSuccess={() => router.push('/dashboard')} 
                      onCancel={() => {
                        setShowPaymentForm(false);
                        setClientSecret('');
                      }} 
                    />
                  </Elements>
                )}
              </div>

              {/* Action Buttons (Only when form is hidden) */}
              {!showPaymentForm && (
                <div className="flex flex-col sm:flex-row gap-4">
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
                </div>
              )}

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
