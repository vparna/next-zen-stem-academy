
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// POST /api/upload-resume - Upload resume file
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type (PDF, DOC, DOCX)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed' },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    
    // Store file metadata in database
    const db = await getDatabase();
    const result = await db.collection('resumes').insertOne({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileData: base64,
      uploadedAt: new Date(),
    });
    
    // Return file ID that can be used to retrieve the file
    return NextResponse.json({
      message: 'Resume uploaded successfully',
      fileId: result.insertedId.toString(),
      fileName: file.name,
      url: `/api/upload-resume/${result.insertedId.toString()}`,
    });
  } catch (error: any) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
}
