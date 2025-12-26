'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  ageGroup: string;
  image?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory]);

  const fetchCourses = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? '/api/courses'
        : `/api/courses?category=${selectedCategory}`;
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        // If no courses in database, show sample data
        setCourses(getSampleCourses());
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Show sample data on error
      setCourses(getSampleCourses());
    } finally {
      setLoading(false);
    }
  };

  const getSampleCourses = (): Course[] => {
    const sampleCourses = [
      {
        _id: '1',
        name: 'Robotics Fundamentals',
        category: 'Robotics',
        description: 'Learn the basics of robotics, including sensors, motors, and programming.',
        price: 299,
        duration: '12 weeks',
        ageGroup: '8-12 years',
      },
      {
        _id: '2',
        name: 'Advanced Robotics',
        category: 'Robotics',
        description: 'Build complex robots and learn advanced programming techniques.',
        price: 399,
        duration: '16 weeks',
        ageGroup: '12-16 years',
      },
      {
        _id: '3',
        name: 'Mathematics Mastery',
        category: 'Maths',
        description: 'Comprehensive mathematics program covering algebra, geometry, and problem-solving.',
        price: 249,
        duration: '10 weeks',
        ageGroup: '10-14 years',
      },
      {
        _id: '4',
        name: 'Chess Beginner',
        category: 'Chess',
        description: 'Learn chess fundamentals, basic strategies, and opening principles.',
        price: 199,
        duration: '8 weeks',
        ageGroup: '6-10 years',
      },
      {
        _id: '5',
        name: 'Chess Advanced',
        category: 'Chess',
        description: 'Master advanced tactics, endgames, and competitive chess strategies.',
        price: 249,
        duration: '12 weeks',
        ageGroup: '10-16 years',
      },
      {
        _id: '6',
        name: 'Olympiad Mathematics',
        category: 'Maths',
        description: 'Prepare for mathematics olympiads with challenging problem sets.',
        price: 349,
        duration: '14 weeks',
        ageGroup: '12-16 years',
      },
    ];

    if (selectedCategory === 'all') {
      return sampleCourses;
    }
    return sampleCourses.filter(course => course.category === selectedCategory);
  };

  const categories = [
    { value: 'all', label: 'All Courses', icon: '📚' },
    { value: 'Robotics', label: 'Robotics', icon: '🤖' },
    { value: 'Maths', label: 'Mathematics', icon: '🔢' },
    { value: 'Chess', label: 'Chess', icon: '♟️' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-blue-100">
            Explore our comprehensive range of STEM courses designed for young learners
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-md font-semibold transition flex items-center gap-2 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No courses found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${course.price}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">⏱️</span>
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">👥</span>
                        <span>Age Group: {course.ageGroup}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/courses/${course._id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enroll?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sign up now and start your learning journey with Next Gen STEM Academy
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition inline-block"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}
