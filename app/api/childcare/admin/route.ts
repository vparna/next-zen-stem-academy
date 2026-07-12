import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - Admin dashboard data, audit logs, inventory, expenses, analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const centerId = searchParams.get('centerId');
    const resource = searchParams.get('resource') || 'dashboard'; // dashboard, audit, inventory, expenses, centers
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();

    if (resource === 'dashboard' && centerId) {
      // Get aggregated dashboard data
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [
        totalChildren,
        checkedInToday,
        totalStaff,
        clockedInStaff,
        pendingInvoices,
        totalRevenue,
        classrooms,
        recentIncidents
      ] = await Promise.all([
        db.collection('enrollment_forms').countDocuments({ centerId: new ObjectId(centerId), status: 'enrolled' }),
        db.collection('attendance_records').countDocuments({
          classroomId: { $exists: true },
          status: 'checked_in',
          checkInTime: { $gte: today }
        }),
        db.collection('staff_profiles').countDocuments({ centerId: new ObjectId(centerId), status: 'active' }),
        db.collection('staff_timecards').countDocuments({ centerId: new ObjectId(centerId), status: 'clocked_in' }),
        db.collection('invoices').countDocuments({ centerId: new ObjectId(centerId), status: { $in: ['sent', 'overdue'] } }),
        db.collection('invoices').aggregate([
          { $match: { centerId: new ObjectId(centerId), status: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total' } } }
        ]).toArray(),
        db.collection('classrooms').find({ centerId: new ObjectId(centerId), active: true }).toArray(),
        db.collection('incident_reports').find({ centerId: new ObjectId(centerId) }).sort({ createdAt: -1 }).limit(5).toArray()
      ]);

      return NextResponse.json({
        dashboard: {
          totalChildren,
          checkedInToday,
          totalStaff,
          clockedInStaff,
          pendingInvoices,
          totalRevenue: totalRevenue[0]?.total || 0,
          classrooms: classrooms.length,
          classroomDetails: classrooms,
          recentIncidents
        }
      });
    }

    const query: Record<string, unknown> = {};
    if (centerId) query.centerId = new ObjectId(centerId);

    const collections: Record<string, string> = {
      audit: 'audit_logs',
      inventory: 'inventory_items',
      expenses: 'expense_records',
      centers: 'centers'
    };

    const collection = collections[resource] || 'audit_logs';
    const total = await db.collection(collection).countDocuments(query);
    const results = await db.collection(collection)
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      data: results,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

// POST - Create center, inventory item, expense, audit log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    const db = await getDatabase();

    switch (action) {
      case 'create_center': {
        const { name, address, phone, email, licenseNumber, licenseExpiry, capacity, operatingHours, programs, ownerId } = body;
        if (!name || !address || !phone || !email || !ownerId) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const center = {
          name,
          address,
          phone,
          email,
          licenseNumber,
          licenseExpiry: licenseExpiry ? new Date(licenseExpiry) : undefined,
          capacity: capacity || 0,
          operatingHours: operatingHours || [],
          programs: programs || [],
          ownerId: new ObjectId(ownerId),
          active: true,
          settings: {
            latePickupFeePerMinute: 1,
            latePickupGracePeriod: 15,
            attendanceReminders: true,
            autoInvoicing: false,
            invoicingDay: 1,
            allowParentMessaging: true,
            requirePhotoVerification: false,
            geofenceEnabled: false,
            kioskMode: false
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('centers').insertOne(center);
        return NextResponse.json({ message: 'Center created', centerId: result.insertedId }, { status: 201 });
      }

      case 'add_inventory': {
        const { centerId, name: itemName, category, currentQuantity, reorderLevel, unit, cost, supplier } = body;
        if (!centerId || !itemName || !category) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const item = {
          centerId: new ObjectId(centerId),
          name: itemName,
          category,
          currentQuantity: currentQuantity || 0,
          reorderLevel: reorderLevel || 10,
          unit: unit || 'units',
          cost,
          supplier,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await db.collection('inventory_items').insertOne(item);
        return NextResponse.json({ message: 'Inventory item added', itemId: result.insertedId }, { status: 201 });
      }

      case 'add_expense': {
        const { centerId: expCenterId, category: expCategory, description, amount, date: expDate, vendor, receiptUrl, createdBy } = body;
        if (!expCenterId || !expCategory || !description || !amount || !createdBy) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const expense = {
          centerId: new ObjectId(expCenterId),
          category: expCategory,
          description,
          amount,
          date: new Date(expDate || Date.now()),
          vendor,
          receiptUrl,
          status: 'pending',
          createdBy: new ObjectId(createdBy),
          createdAt: new Date()
        };

        const result = await db.collection('expense_records').insertOne(expense);
        return NextResponse.json({ message: 'Expense recorded', expenseId: result.insertedId }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in admin operation:', error);
    return NextResponse.json({ error: 'Failed to process admin operation' }, { status: 500 });
  }
}
