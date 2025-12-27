import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { generateQRCode, generateQRData } from '@/lib/qrcode';
import { getChildById } from '@/models/Child';

// GET - Generate QR code for a child
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const childId = searchParams.get('childId');

    if (!childId) {
      return NextResponse.json(
        { error: 'childId is required' },
        { status: 400 }
      );
    }

    // Verify child exists and belongs to user
    const child = await getChildById(childId);
    if (!child) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      );
    }

    if (child.userId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: 'Unauthorized access to this child' },
        { status: 403 }
      );
    }

    // Generate QR code data and image
    const qrData = generateQRData('child', childId);
    const qrCodeImage = await generateQRCode(qrData);

    return NextResponse.json({
      qrCode: qrCodeImage,
      childId,
      childName: child.name,
    });
  } catch (error) {
    console.error('QR code generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
