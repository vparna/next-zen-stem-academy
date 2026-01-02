import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// POST - Upload file (simplified base64 storage for demo)
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fileName, fileData, fileType } = body;

    if (!fileName || !fileData || !fileType) {
      return NextResponse.json(
        { error: 'fileName, fileData, and fileType are required' },
        { status: 400 }
      );
    }

    // In production, you would upload to S3, CloudFlare, or similar
    // For now, we'll return the base64 data URL
    const fileSize = Math.round((fileData.length * 3) / 4);

    // Validate file size (max 5MB)
    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Generate a pseudo URL (in production, this would be a real URL)
    const fileUrl = `data:${fileType};base64,${fileData}`;
    const timestamp = Date.now();
    const pseudoUrl = `/uploads/${decoded.userId}/${timestamp}_${fileName}`;

    return NextResponse.json({
      success: true,
      fileUrl: pseudoUrl, // In production, this would be the actual storage URL
      fileName,
      fileType,
      fileSize,
      // For demo purposes, also return the data URL for immediate use
      dataUrl: fileUrl,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
