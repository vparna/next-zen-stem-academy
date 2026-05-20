'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const deptColor: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-700',
  Education: 'bg-green-100 text-green-700',
  Marketing: 'bg-purple-100 text-purple-700',
  Operations: 'bg-orange-100 text-orange-700',
  default: 'bg-slate-100 text-slate-700',
};

const typeColor: Record<string, string> = {
  'full-time': 'bg-emerald-100 text-emerald-700',
  'part-time': 'bg-sky-100 text-sky-700',
  contract: 'bg-amber-100 text-amber-700',
  internship: 'bg-pink-100 text-pink-700',
  default: 'bg-slate-100 text-slate-700',
};

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
    } catch {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
          <p className="mt-4 text-slate-500 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <section className="relative min-h-[44vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-sm font-semibold mb-5 backdrop-blur-sm">
            💼 Careers
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl">
            Be part of our mission to empower young minds through innovative STEM education.
          </p>
        </div>
      </section>

      {/* ── Perks strip ── */}
      <div className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['🏥 Health Benefits', '📚 Learning Budget', '⏰ Flexible Hours', '🌍 Remote Options'].map((p) => (
              <p key={p} className="text-slate-300 font-medium text-sm">{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Jobs Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Filter Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
              <select
                id="department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 text-sm"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
              <select
                id="jobType"
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 text-sm"
              >
                <option value="all">All Types</option>
                {jobTypes.map((type) => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No open positions right now</h3>
            <p className="text-slate-500">
              {jobs.length === 0
                ? "We don't have any open positions at the moment. Check back soon!"
                : 'No jobs match your filters. Try adjusting your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 card-hover">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${deptColor[job.department] || deptColor.default}`}>
                        {job.department}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColor[job.jobType] || typeColor.default}`}>
                        {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                        {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                      <span>📍 {job.location}</span>
                      {job.salaryRange && <span>💰 {job.salaryRange}</span>}
                      <span className="text-xs text-slate-400">{job.jobId}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={`/careers/${job._id}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-md hover:shadow-orange-200 transition"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Join Team Banner ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
            alt="Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Don&apos;t See the Right Role?</h2>
          <p className="text-slate-300 mb-8 text-lg">We&apos;re always looking for passionate educators and STEM enthusiasts. Send us your resume!</p>
          <a
            href="mailto:careers@nextzenacademy.com"
            className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
