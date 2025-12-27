'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  jobId: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  department: string;
  experienceLevel: string;
  salaryRange?: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterJobType, setFilterJobType] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs?active=true');
      const data = await response.json();
      
      if (response.ok) {
        setJobs(data.jobs);
      } else {
        setError(data.error || 'Failed to load jobs');
      }
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    const matchesJobType = filterJobType === 'all' || job.jobType === filterJobType;
    return matchesDepartment && matchesJobType;
  });

  const departments = Array.from(new Set(jobs.map((job) => job.department)));
  const jobTypes = Array.from(new Set(jobs.map((job) => job.jobType)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-blue-100">
            Be part of our mission to empower young minds through innovative STEM education
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Jobs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                id="jobType"
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs available</h3>
            <p className="text-gray-600">
              {jobs.length === 0
                ? "We don't have any open positions at the moment. Check back soon!"
                : 'No jobs match your filters. Try adjusting your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                      </span>
                      <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                        {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{job.jobId}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">📍 {job.location}</p>
                  {job.salaryRange && (
                    <p className="text-gray-600">💰 {job.salaryRange}</p>
                  )}
                </div>
                <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>
                <Link
                  href={`/careers/${job._id}`}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium"
                >
                  View Details & Apply
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
