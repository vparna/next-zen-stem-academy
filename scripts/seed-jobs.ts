// Script to seed sample jobs for testing the careers page
// Run with: npm run seed-jobs (or tsx scripts/seed-jobs.ts)

import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGen';

const sampleJobs = [
  {
    jobId: 'JOB-001',
    title: 'Robotics Instructor',
    description: 'We are seeking a passionate Robotics Instructor to teach students aged 8-16 the fundamentals of robotics, programming, and engineering. You will design engaging lesson plans, guide hands-on projects, and inspire young minds to explore STEM fields.',
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
  },
  {
    jobId: 'JOB-002',
    title: 'Mathematics Teacher',
    description: 'Join our team as a Mathematics Teacher to help students develop strong mathematical foundations and problem-solving skills. You will create interactive lessons that make math engaging and accessible for students of all levels.',
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
  },
  {
    jobId: 'JOB-003',
    title: 'Chess Coach',
    description: 'We are looking for an experienced Chess Coach to teach strategic thinking and chess fundamentals to students. You will guide students from beginner to advanced levels, prepare them for tournaments, and foster a love for the game.',
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
  },
  {
    jobId: 'JOB-004',
    title: 'Program Coordinator',
    description: 'We need a detail-oriented Program Coordinator to oversee daily operations, manage schedules, and ensure smooth program delivery. You will be the backbone of our operations, coordinating between instructors, students, and families.',
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
  },
  {
    jobId: 'JOB-005',
    title: 'Marketing Intern',
    description: 'Join our marketing team as an intern to gain hands-on experience in digital marketing, content creation, and social media management for an education technology organization. This is a great opportunity for students or recent graduates.',
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
  }
];

async function seedJobs() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db();
    const jobsCollection = db.collection('jobs');
    
    // Clear existing jobs (optional - comment out if you want to keep existing data)
    console.log('Clearing existing jobs...');
    await jobsCollection.deleteMany({});
    
    // Insert sample jobs
    console.log('Inserting sample jobs...');
    const now = new Date();
    const jobsToInsert = sampleJobs.map(job => ({
      ...job,
      createdAt: now,
      updatedAt: now,
    }));
    
    const result = await jobsCollection.insertMany(jobsToInsert);
    console.log(`Successfully inserted ${result.insertedCount} jobs!`);
    
    // Display inserted jobs
    console.log('\nInserted Jobs:');
    sampleJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.jobId}: ${job.title} (${job.department} - ${job.jobType})`);
    });
    
    console.log('\n✅ Seeding completed successfully!');
    console.log('You can now view the jobs at: http://localhost:3000/careers');
    
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

// Run the seeding function
seedJobs();
