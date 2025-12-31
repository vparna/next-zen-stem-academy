// Script to seed the database with sample courses
// Run with: node --loader ts-node/esm scripts/seed-courses.ts

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGen';

const sampleCourses = [
  {
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
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Advanced Robotics',
    category: 'Robotics',
    description: 'Build complex robots and learn advanced programming techniques.',
    fullDescription: 'Take your robotics skills to the next level with advanced concepts in automation, AI integration, and complex mechanical systems. Students will work on sophisticated projects and learn industry-standard tools.',
    price: 129,
    duration: '16 weeks',
    ageGroup: '12-16 years',
    features: [
      'Advanced programming',
      'AI and machine learning basics',
      'Complex mechanical systems',
      'Team project work',
      'Competition preparation',
      'Industry mentorship',
    ],
    syllabus: [
      'Week 1-3: Advanced Sensors',
      'Week 4-6: Complex Programming',
      'Week 7-9: AI Integration',
      'Week 10-12: Advanced Mechanics',
      'Week 13-14: Team Projects',
      'Week 15-16: Competition Prep',
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mathematics Mastery',
    category: 'Maths',
    description: 'Comprehensive mathematics program covering algebra, geometry, and problem-solving.',
    fullDescription: 'A complete mathematics course designed to build strong foundations and develop advanced problem-solving skills. Using interactive methods and real-world applications, students will master key mathematical concepts.',
    price: 79,
    duration: '10 weeks',
    ageGroup: '10-14 years',
    features: [
      'Interactive learning',
      'Real-world applications',
      'Problem-solving focus',
      'Regular assessments',
      'Personalized feedback',
      'Homework support',
    ],
    syllabus: [
      'Week 1-2: Algebra Foundations',
      'Week 3-4: Geometry Basics',
      'Week 5-6: Advanced Algebra',
      'Week 7-8: Problem Solving',
      'Week 9: Applications',
      'Week 10: Review and Assessment',
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Olympiad Mathematics',
    category: 'Maths',
    description: 'Prepare for mathematics olympiads with challenging problem sets.',
    fullDescription: 'Intensive preparation for mathematical olympiads and competitions. Students will tackle challenging problems, learn advanced techniques, and develop the strategic thinking required for competitive mathematics.',
    price: 119,
    duration: '14 weeks',
    ageGroup: '12-16 years',
    features: [
      'Olympiad-level problems',
      'Competition strategies',
      'Mock tests',
      'Individual coaching',
      'Past paper analysis',
      'Peer learning groups',
    ],
    syllabus: [
      'Week 1-2: Number Theory',
      'Week 3-4: Combinatorics',
      'Week 5-6: Geometry',
      'Week 7-8: Algebra',
      'Week 9-10: Problem Solving',
      'Week 11-12: Mock Olympiads',
      'Week 13-14: Competition Prep',
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Chess Beginner',
    category: 'Chess',
    description: 'Learn chess fundamentals, basic strategies, and opening principles.',
    fullDescription: 'Perfect for beginners, this course covers all the basics of chess. Students will learn piece movements, basic tactics, opening principles, and develop strategic thinking skills through regular practice games.',
    price: 69,
    duration: '8 weeks',
    ageGroup: '6-10 years',
    features: [
      'Learn all pieces',
      'Basic tactics',
      'Opening principles',
      'Practice games',
      'Chess puzzles',
      'Online platform access',
    ],
    syllabus: [
      'Week 1: Piece Movements',
      'Week 2: Basic Rules',
      'Week 3-4: Opening Principles',
      'Week 5-6: Tactics',
      'Week 7: Strategy Basics',
      'Week 8: Practice Tournament',
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Chess Advanced',
    category: 'Chess',
    description: 'Master advanced tactics, endgames, and competitive chess strategies.',
    fullDescription: 'For experienced players looking to reach the next level. This course covers advanced tactics, positional play, endgame mastery, and preparation for competitive tournaments.',
    price: 89,
    duration: '12 weeks',
    ageGroup: '10-16 years',
    features: [
      'Advanced tactics',
      'Endgame mastery',
      'Tournament preparation',
      'Game analysis',
      'Opening repertoire',
      'Rated tournaments',
    ],
    syllabus: [
      'Week 1-2: Advanced Tactics',
      'Week 3-4: Positional Play',
      'Week 5-6: Endgames',
      'Week 7-8: Opening Theory',
      'Week 9-10: Game Analysis',
      'Week 11-12: Tournament Play',
    ],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedCourses() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const coursesCollection = db.collection('courses');

    // Clear existing courses (optional)
    await coursesCollection.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const result = await coursesCollection.insertMany(sampleCourses);
    console.log(`Inserted ${result.insertedCount} courses`);
    console.log('Course IDs:', Object.values(result.insertedIds).map(id => id.toString()));

    console.log('\nSample courses added successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

seedCourses();
