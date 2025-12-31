'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateJobPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    jobId: '',
    title: '',
    description: '',
    location: 'Woodinville, Washington State',
    jobType: 'full-time',
    department: '',
    experienceLevel: 'entry',
    salaryRange: '',
    active: true,
  });
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleArrayInputChange = (index: number, value: string, type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      const newRequirements = [...requirements];
      newRequirements[index] = value;
      setRequirements(newRequirements);
    } else {
      const newResponsibilities = [...responsibilities];
      newResponsibilities[index] = value;
      setResponsibilities(newResponsibilities);
    }
  };

  const addArrayItem = (type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      setRequirements([...requirements, '']);
    } else {
      setResponsibilities([...responsibilities, '']);
    }
  };

  const removeArrayItem = (index: number, type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      const newRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(newRequirements.length > 0 ? newRequirements : ['']);
    } else {
      const newResponsibilities = responsibilities.filter((_, i) => i !== index);
      setResponsibilities(newResponsibilities.length > 0 ? newResponsibilities : ['']);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requirements: requirements.filter(r => r.trim() !== ''),
          responsibilities: responsibilities.filter(r => r.trim() !== ''),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/jobs');
      } else {
        setError(data.error || 'Failed to create job');
      }
    } catch (err) {
      setError('Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/jobs" className="text-blue-600 hover:text-blue-800">
            ← Back to Jobs
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Job</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                  Job ID *
                </label>
                <input
                  type="text"
                  id="jobId"
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., JOB-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Robotics Instructor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Describe the job position in detail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Education, Operations"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Woodinville, Washington State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>

              <div>
                <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range (Optional)
                </label>
                <input
                  type="text"
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                  placeholder="e.g., $50,000 - $70,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, 'requirements')}
                    placeholder="Enter a requirement..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'requirements')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add Requirement
              </button>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsibilities
              </label>
              {responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, 'responsibilities')}
                    placeholder="Enter a responsibility..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'responsibilities')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('responsibilities')}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add Responsibility
              </button>
            </div>

            {/* Active Status */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Set job as active (visible to candidates)
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating...' : 'Create Job'}
              </button>
              <Link
                href="/admin/jobs"
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
