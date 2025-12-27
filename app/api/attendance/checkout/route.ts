import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { checkOut } from '@/models/Attendance';
import { parseQRData } from '@/lib/qrcode';
import { ObjectId } from 'mongodb';
import { getAttendancesByChildId } from '@/models/Attendance';

// POST - Check out a student
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
    const { qrData } = body;

    if (!qrData) {
      return NextResponse.json(
        { error: 'QR data is required' },
        { status: 400 }
      );
    }

    // Parse QR code data
    const parsedData = parseQRData(qrData);
    if (!parsedData || parsedData.type !== 'CHILD') {
      return NextResponse.json(
        { error: 'Invalid QR code' },
        { status: 400 }
      );
    }

    // Find active attendance for this child
    const attendances = await getAttendancesByChildId(parsedData.id);
    const activeAttendance = attendances.find(att => att.status === 'checked-in');

    if (!activeAttendance || !activeAttendance._id) {
      return NextResponse.json(
        { error: 'No active check-in found for this child' },
        { status: 404 }
      );
    }

    // Check out
    const success = await checkOut(
      activeAttendance._id,
      new Date(),
      new ObjectId(decoded.userId)
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to check out' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Check-out successful'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Check-out error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
