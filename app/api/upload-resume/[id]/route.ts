import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/upload-resume/[id] - Download resume file
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();
    const resume = await db.collection('resumes').findOne({ _id: new ObjectId(params.id) });
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    // Convert base64 back to buffer
    const buffer = Buffer.from(resume.fileData, 'base64');
    
    // Return file with appropriate headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': resume.fileType,
        'Content-Disposition': `attachment; filename="${resume.fileName}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error retrieving resume:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve resume' },
      { status: 500 }
    );
  }
}
