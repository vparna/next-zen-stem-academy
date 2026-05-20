'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('authChange'));
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <div>
          <h2 className="mt-2 text-center section-heading w-full">
            Sign in to your account
          </h2>
          <p className="mt-4 text-center text-sm text-slate-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-orange-500 hover:text-orange-600">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link href="/forgot-password" className="text-sm font-medium text-orange-500 hover:text-orange-600">
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="ui-pill-btn group relative w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
