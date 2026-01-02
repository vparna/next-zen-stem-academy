// Script to create an admin user for testing
// Run with: tsx scripts/create-admin.ts

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGen';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@nextgen.com' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists with email: admin@nextgen.com');
      console.log('   You can login with: admin@nextgen.com / admin123');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await usersCollection.insertOne({
      email: 'admin@nextgen.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('   Email: admin@nextgen.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  } finally {
    await client.close();
  }
}

createAdminUser().catch(console.error);
