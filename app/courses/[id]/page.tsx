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
        price: 299,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link href="/courses" className="text-blue-600 hover:text-blue-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-blue-100 hover:text-white">
              ← Back to Courses
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-blue-700 px-3 py-1 rounded text-sm font-semibold">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
                {course.name}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
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
            <div className="bg-white text-gray-900 rounded-lg p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Enroll Now
              </button>
              <p className="text-sm text-gray-600 text-center mt-4">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {course.syllabus && course.syllabus.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Syllabus</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {course.syllabus.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 font-bold mr-3">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Enroll now and start your learning journey today
          </p>
          <button
            onClick={handleEnroll}
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition inline-block"
          >
            Enroll in {course.name}
          </button>
        </div>
      </section>
    </div>
  );
}
