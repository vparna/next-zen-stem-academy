// Script to create an admin user for testing
// Run with: tsx scripts/create-admin.ts

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NextGen';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@nextzenacademy.com' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists with email: admin@nextzenacademy.com');
      console.log('   You can login with this account.');
      console.log('\n💡 To set or reset the password, call the POST /api/admin/invite endpoint');
      console.log('   with body: { "secret": "<ADMIN_INVITE_SECRET>" }');
      console.log('   or use the forgot password flow at /forgot-password.');
      return;
    }
    
    // Create admin user with a random unusable password
    // The admin will set their password via the setup email
    const randomPassword = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    
    await usersCollection.insertOne({
      email: 'admin@nextzenacademy.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('   Email: admin@nextzenacademy.com');
    console.log('\n📧 To set the admin password, call POST /api/admin/invite');
    console.log('   with body: { "secret": "<ADMIN_INVITE_SECRET>" }');
    console.log('   This will send a password setup email to admin@nextzenacademy.com.');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  } finally {
    await client.close();
  }
}

createAdminUser().catch(console.error);
