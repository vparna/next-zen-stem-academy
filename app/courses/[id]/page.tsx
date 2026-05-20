'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  _id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  duration: string;
  ageGroup: string;
  features: string[];
  syllabus?: string[];
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const sidebarStickyOffsetClass = 'top-24';
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      fetchCourse();
    }
  }, [resolvedParams]);

  const fetchCourse = async () => {
    if (!resolvedParams) return;
    
    try {
      const response = await fetch(`/api/courses/${resolvedParams.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
      } else {
        // Show sample course if not found
        setCourse(getSampleCourse(resolvedParams.id));
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourse(getSampleCourse(resolvedParams.id));
    } finally {
      setLoading(false);
    }
  };

  const getSampleCourse = (id: string): Course => {
    const sampleCourses: Record<string, Course> = {
      '1': {
        _id: '1',
        name: 'Robotics Fundamentals',
        category: 'Robotics',
        description: 'Learn the basics of robotics, including sensors, motors, and programming.',
        fullDescription: 'This comprehensive robotics course introduces students to the exciting world of robotics. Students will learn about sensors, motors, actuators, and programming. Through hands-on projects, they will build and program their own robots, developing problem-solving and critical thinking skills.',
        price: 99,
        duration: '12 weeks',
        ageGroup: '8-12 years',
        features: [
          'Hands-on robot building',
          'Basic programming concepts',
          'Sensor integration',
          'Motor control',
          'Project-based learning',
          'Certificate upon completion',
        ],
        syllabus: [
          'Week 1-2: Introduction to Robotics',
          'Week 3-4: Sensors and Data Collection',
          'Week 5-6: Motors and Movement',
          'Week 7-8: Basic Programming',
          'Week 9-10: Robot Design',
          'Week 11-12: Final Project',
        ],
      },
    };

    return sampleCourses[id] || {
      _id: id,
      name: 'Course Not Found',
      category: 'Other',
      description: 'This course is currently unavailable.',
      fullDescription: 'This course is currently unavailable. Please check back later.',
      price: 0,
      duration: 'N/A',
      ageGroup: 'N/A',
      features: [],
    };
  };

  const handleEnroll = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Go to checkout
    router.push(`/checkout?courseId=${course?._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
          <p className="mt-4 text-slate-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Course Not Found</h2>
          <Link href="/courses" className="text-orange-500 hover:text-orange-600 font-semibold">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-slate-300 hover:text-white font-medium">
              ← Back to Courses
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-orange-500/20 border border-orange-400/30 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4">
                {course.name}
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  <span>{course.ageGroup}</span>
                </div>
              </div>
            </div>
            <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="text-center mb-6">
                <div className="text-4xl font-extrabold text-orange-500 mb-2">
                  ${course.price}
                </div>
                <p className="text-slate-600">per month</p>
              </div>
              <button
                onClick={handleEnroll}
                className="ui-pill-btn w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all"
              >
                Enroll Now
              </button>
              <p className="text-sm text-slate-600 text-center mt-4">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                <h2 className="section-heading mb-8">About This Course</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {course.syllabus && course.syllabus.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h2 className="section-heading mb-8">Course Syllabus</h2>
                  <div className="bg-blue-50 rounded-3xl p-6">
                    <ul className="space-y-3">
                      {course.syllabus.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 font-bold mr-3">✓</span>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className={`bg-white rounded-3xl p-6 sticky ${sidebarStickyOffsetClass} shadow-lg border border-slate-100`}>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">What You&apos;ll Learn</h3>
                <ul className="space-y-3">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-slate-300">
            Enroll now and start your learning journey today
          </p>
          <button
            onClick={handleEnroll}
            className="ui-pill-btn bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all inline-block"
          >
            Enroll in {course.name}
          </button>
        </div>
      </section>
    </div>
  );
}
