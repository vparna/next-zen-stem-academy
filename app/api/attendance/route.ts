import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { createAttendance, getAttendancesByChildId, getActiveAttendances } from '@/models/Attendance';
import { parseQRData } from '@/lib/qrcode';
import { ObjectId } from 'mongodb';
import { getChildById } from '@/models/Child';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// POST - Check in a student
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
    const { qrData, courseId, notes } = body;

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

    // Verify child exists
    const child = await getChildById(parsedData.id);
    if (!child) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      );
    }

    // Create attendance record
    const attendanceId = await createAttendance({
      childId: new ObjectId(parsedData.id),
      userId: child.userId,
      courseId: courseId ? new ObjectId(courseId) : undefined,
      checkInTime: new Date(),
      checkInTeacherId: new ObjectId(decoded.userId),
      status: 'checked-in',
      notes: notes || undefined,
    });

    return NextResponse.json(
      { 
        success: true, 
        attendanceId: attendanceId.toString(),
        message: 'Check-in successful'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get attendance records
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
    const active = searchParams.get('active');

    if (active === 'true') {
      const attendances = await getActiveAttendances();
      return NextResponse.json(attendances);
    }

    if (childId) {
      const attendances = await getAttendancesByChildId(childId);
      return NextResponse.json(attendances);
    }

    return NextResponse.json(
      { error: 'childId or active parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get attendance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
