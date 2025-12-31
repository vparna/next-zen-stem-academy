// Script to initialize MongoDB database with schema validation and indexes
// Run with: npm run init-db
// This script will:
// 1. Create all required collections
// 2. Set up schema validation
// 3. Create indexes for optimized queries
// 4. Seed initial data (courses and jobs)

import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGen';
const DB_NAME = 'NextGen';

// Extract database name from URI if specified
function getDatabaseName(uri: string): string {
  const match = uri.match(/\/([^/?]+)(\?|$)/);
  return match ? match[1] : DB_NAME;
}

// Collection schemas and configurations
const collections = [
  {
    name: 'users',
    indexes: [
      { key: { email: 1 }, options: { unique: true } },
      { key: { createdAt: -1 }, options: {} },
    ],
  },
  {
    name: 'courses',
    indexes: [
      { key: { category: 1 }, options: {} },
      { key: { active: 1 }, options: {} },
      { key: { createdAt: -1 }, options: {} },
    ],
  },
  {
    name: 'enrollments',
    indexes: [
      { key: { userId: 1 }, options: {} },
      { key: { courseId: 1 }, options: {} },
      { key: { userId: 1, courseId: 1 }, options: {} },
      { key: { enrollmentDate: -1 }, options: {} },
    ],
  },
  {
    name: 'children',
    indexes: [
      { key: { parentId: 1 }, options: {} },
      { key: { createdAt: -1 }, options: {} },
    ],
  },
  {
    name: 'certificates',
    indexes: [
      { key: { userId: 1 }, options: {} },
      { key: { enrollmentId: 1 }, options: { unique: true } },
      { key: { certificateNumber: 1 }, options: { unique: true } },
      { key: { issueDate: -1 }, options: {} },
    ],
  },
  {
    name: 'lessons',
    indexes: [
      { key: { courseId: 1 }, options: {} },
      { key: { order: 1 }, options: {} },
    ],
  },
  {
    name: 'quizzes',
    indexes: [
      { key: { courseId: 1 }, options: {} },
      { key: { lessonId: 1 }, options: {} },
      { key: { active: 1 }, options: {} },
    ],
  },
  {
    name: 'assignments',
    indexes: [
      { key: { courseId: 1 }, options: {} },
      { key: { lessonId: 1 }, options: {} },
      { key: { dueDate: 1 }, options: {} },
      { key: { active: 1 }, options: {} },
    ],
  },
  {
    name: 'assignment_submissions',
    indexes: [
      { key: { assignmentId: 1 }, options: {} },
      { key: { userId: 1 }, options: {} },
      { key: { assignmentId: 1, userId: 1 }, options: { unique: true } },
      { key: { submittedAt: -1 }, options: {} },
    ],
  },
  {
    name: 'attendances',
    indexes: [
      { key: { childId: 1 }, options: {} },
      { key: { checkInTime: -1 }, options: {} },
      { key: { status: 1 }, options: {} },
    ],
  },
  {
    name: 'progress',
    indexes: [
      { key: { userId: 1 }, options: {} },
      { key: { courseId: 1 }, options: {} },
      { key: { userId: 1, courseId: 1 }, options: {} },
      { key: { lessonId: 1 }, options: {} },
    ],
  },
  {
    name: 'live_classes',
    indexes: [
      { key: { courseId: 1 }, options: {} },
      { key: { scheduledTime: 1 }, options: {} },
      { key: { status: 1 }, options: {} },
    ],
  },
  {
    name: 'messages',
    indexes: [
      { key: { senderId: 1 }, options: {} },
      { key: { recipientId: 1 }, options: {} },
      { key: { sentAt: -1 }, options: {} },
      { key: { isRead: 1 }, options: {} },
    ],
  },
  {
    name: 'jobs',
    indexes: [
      { key: { jobId: 1 }, options: { unique: true } },
      { key: { department: 1 }, options: {} },
      { key: { jobType: 1 }, options: {} },
      { key: { active: 1 }, options: {} },
      { key: { createdAt: -1 }, options: {} },
    ],
  },
  {
    name: 'job_applications',
    indexes: [
      { key: { jobId: 1 }, options: {} },
      { key: { email: 1 }, options: {} },
      { key: { status: 1 }, options: {} },
      { key: { submittedAt: -1 }, options: {} },
    ],
  },
  {
    name: 'coupons',
    indexes: [
      { key: { code: 1 }, options: { unique: true } },
      { key: { active: 1 }, options: {} },
      { key: { expiryDate: 1 }, options: {} },
    ],
  },
];

// Sample courses data
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

// Sample jobs data
const sampleJobs = [
  {
    jobId: 'JOB-001',
    title: 'Robotics Instructor',
    description: 'We are seeking a passionate Robotics Instructor to teach students aged 8-16 the fundamentals of robotics, programming, and engineering.',
    requirements: [
      'Bachelor\'s degree in Engineering, Computer Science, Education, or related field',
      '2+ years of experience teaching or working with children',
      'Strong knowledge of robotics platforms (LEGO Mindstorms, VEX, Arduino)',
      'Experience with programming languages (Python, C++, or block-based)',
      'Excellent communication and classroom management skills',
      'Passion for STEM education and working with youth'
    ],
    responsibilities: [
      'Develop and deliver engaging robotics curriculum for various age groups',
      'Lead hands-on robotics projects and competitions',
      'Assess student progress and provide constructive feedback',
      'Maintain and manage robotics equipment and materials',
      'Collaborate with other instructors to enhance program quality',
      'Communicate with parents about student progress'
    ],
    location: 'New York, NY',
    jobType: 'full-time',
    department: 'Education',
    experienceLevel: 'mid',
    salaryRange: '$45,000 - $65,000',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    jobId: 'JOB-002',
    title: 'Mathematics Teacher',
    description: 'Join our team as a Mathematics Teacher to help students develop strong mathematical foundations and problem-solving skills.',
    requirements: [
      'Bachelor\'s degree in Mathematics, Education, or related field',
      'Teaching certification preferred',
      '1-3 years of teaching experience',
      'Strong knowledge of K-12 mathematics curriculum',
      'Ability to explain complex concepts in simple terms',
      'Patient and encouraging teaching style'
    ],
    responsibilities: [
      'Design and deliver comprehensive mathematics curriculum',
      'Adapt teaching methods to meet diverse learning styles',
      'Track student progress and provide regular assessments',
      'Prepare students for math competitions and standardized tests',
      'Create supplementary materials and practice problems',
      'Maintain positive relationships with students and families'
    ],
    location: 'Remote',
    jobType: 'part-time',
    department: 'Education',
    experienceLevel: 'entry',
    salaryRange: '$30 - $50 per hour',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    jobId: 'JOB-003',
    title: 'Chess Coach',
    description: 'We are looking for an experienced Chess Coach to teach strategic thinking and chess fundamentals to students.',
    requirements: [
      'USCF rating of 1800+ or equivalent',
      'Previous coaching or teaching experience',
      'Strong understanding of chess tactics, strategy, and endgames',
      'Experience working with children and young adults',
      'Excellent communication and motivational skills',
      'Ability to teach both in-person and online'
    ],
    responsibilities: [
      'Teach chess principles and strategies to students of all levels',
      'Organize and conduct practice sessions and simulated games',
      'Prepare students for local and national chess tournaments',
      'Analyze games and provide constructive feedback',
      'Maintain records of student progress and achievements',
      'Create a positive and encouraging learning environment'
    ],
    location: 'San Francisco, CA',
    jobType: 'part-time',
    department: 'Education',
    experienceLevel: 'mid',
    salaryRange: '$35 - $60 per hour',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    jobId: 'JOB-004',
    title: 'Program Coordinator',
    description: 'We need a detail-oriented Program Coordinator to oversee daily operations, manage schedules, and ensure smooth program delivery.',
    requirements: [
      'Bachelor\'s degree in Business Administration, Education, or related field',
      '2+ years of program coordination or administrative experience',
      'Strong organizational and multitasking abilities',
      'Excellent written and verbal communication skills',
      'Proficiency in MS Office and Google Workspace',
      'Experience in education or after-school programs preferred'
    ],
    responsibilities: [
      'Coordinate class schedules and instructor assignments',
      'Manage student enrollment and registration processes',
      'Handle parent communications and inquiries',
      'Maintain accurate records and databases',
      'Coordinate logistics for events and competitions',
      'Support marketing and outreach efforts',
      'Assist with budget tracking and resource allocation'
    ],
    location: 'New York, NY',
    jobType: 'full-time',
    department: 'Operations',
    experienceLevel: 'mid',
    salaryRange: '$40,000 - $55,000',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    jobId: 'JOB-005',
    title: 'Marketing Intern',
    description: 'Join our marketing team as an intern to gain hands-on experience in digital marketing, content creation, and social media management.',
    requirements: [
      'Currently pursuing or recently completed degree in Marketing, Communications, or related field',
      'Strong writing and communication skills',
      'Familiarity with social media platforms',
      'Basic knowledge of digital marketing concepts',
      'Creative mindset and attention to detail',
      'Ability to work 15-20 hours per week'
    ],
    responsibilities: [
      'Create engaging social media content',
      'Assist with email marketing campaigns',
      'Help manage the company blog and website content',
      'Support event promotion and coordination',
      'Conduct market research and competitor analysis',
      'Track and report on marketing metrics'
    ],
    location: 'Remote',
    jobType: 'internship',
    department: 'Marketing',
    experienceLevel: 'entry',
    salaryRange: '$15 - $20 per hour',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

async function createCollectionIfNotExists(db: Db, collectionName: string) {
  const existingCollections = await db.listCollections({ name: collectionName }).toArray();
  
  if (existingCollections.length === 0) {
    await db.createCollection(collectionName);
    console.log(`  ✓ Created collection: ${collectionName}`);
    return true;
  } else {
    console.log(`  - Collection already exists: ${collectionName}`);
    return false;
  }
}

async function createIndexes(db: Db, collectionName: string, indexes: any[]) {
  const collection = db.collection(collectionName);
  
  for (const index of indexes) {
    try {
      await collection.createIndex(index.key, index.options);
      const indexKeys = Object.keys(index.key).join(', ');
      console.log(`  ✓ Created index on ${collectionName}: ${indexKeys}`);
    } catch (error: any) {
      if (error.code === 85) {
        // Index already exists
        console.log(`  - Index already exists on ${collectionName}: ${Object.keys(index.key).join(', ')}`);
      } else {
        console.error(`  ✗ Error creating index on ${collectionName}:`, error.message);
      }
    }
  }
}

async function seedCollection(db: Db, collectionName: string, data: any[]) {
  const collection = db.collection(collectionName);
  const existingCount = await collection.countDocuments();
  
  if (existingCount === 0) {
    await collection.insertMany(data);
    console.log(`  ✓ Seeded ${data.length} documents into ${collectionName}`);
    return true;
  } else {
    console.log(`  - Collection ${collectionName} already has ${existingCount} documents, skipping seed`);
    return false;
  }
}

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    const dbName = getDatabaseName(MONGODB_URI);
    const db = client.db(dbName);
    
    console.log(`📊 Database: ${dbName}\n`);
    console.log('=' .repeat(60));

    // Step 1: Create collections
    console.log('\n📦 STEP 1: Creating Collections');
    console.log('-'.repeat(60));
    for (const collection of collections) {
      await createCollectionIfNotExists(db, collection.name);
    }

    // Step 2: Create indexes
    console.log('\n🔍 STEP 2: Creating Indexes');
    console.log('-'.repeat(60));
    for (const collection of collections) {
      if (collection.indexes && collection.indexes.length > 0) {
        console.log(`\n  Creating indexes for ${collection.name}:`);
        await createIndexes(db, collection.name, collection.indexes);
      }
    }

    // Step 3: Seed initial data
    console.log('\n🌱 STEP 3: Seeding Initial Data');
    console.log('-'.repeat(60));
    
    console.log('\n  Seeding courses:');
    await seedCollection(db, 'courses', sampleCourses);
    
    console.log('\n  Seeding jobs:');
    await seedCollection(db, 'jobs', sampleJobs);

    // Step 4: List all collections
    console.log('\n📋 STEP 4: Database Summary');
    console.log('-'.repeat(60));
    const allCollections = await db.listCollections().toArray();
    console.log(`\n  Total collections: ${allCollections.length}`);
    
    for (const coll of allCollections) {
      const count = await db.collection(coll.name).countDocuments();
      console.log(`  - ${coll.name}: ${count} documents`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Database initialization completed successfully!');
    console.log('\n📊 Your MongoDB cluster "NextGen" now has:');
    console.log(`   - ${allCollections.length} collections created`);
    console.log(`   - ${sampleCourses.length} sample courses`);
    console.log(`   - ${sampleJobs.length} sample jobs`);
    console.log('   - Indexes for optimized queries');
    console.log('\n🚀 You can now start using the application!');
    
  } catch (error) {
    console.error('\n❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the initialization
initializeDatabase();
