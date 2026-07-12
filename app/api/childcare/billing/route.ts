import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';

// GET - List invoices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    const childId = searchParams.get('childId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = await getDatabase();
    const query: Record<string, unknown> = {};

    if (parentId) query.parentId = new ObjectId(parentId);
    if (childId) query.childId = new ObjectId(childId);
    if (status) query.status = status;

    const total = await db.collection('invoices').countDocuments(query);
    const invoices = await db.collection('invoices')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      invoices,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

// POST - Create invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parentId, childId, centerId, items, dueDate, recurringSchedule, notes } = body;

    if (!parentId || !childId || !centerId || !items || !dueDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: { total: number }) => sum + item.total, 0);
    const tax = 0; // Childcare is typically tax-exempt
    const total = subtotal + tax;

    // Generate invoice number
    const count = await db.collection('invoices').countDocuments();
    const invoiceNumber = `INV-${String(count + 1).padStart(6, '0')}`;

    const invoice = {
      invoiceNumber,
      parentId: new ObjectId(parentId),
      childId: new ObjectId(childId),
      centerId: new ObjectId(centerId),
      items,
      subtotal,
      tax,
      discounts: 0,
      total,
      status: 'sent',
      dueDate: new Date(dueDate),
      recurringSchedule,
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('invoices').insertOne(invoice);

    return NextResponse.json({
      message: 'Invoice created',
      invoiceId: result.insertedId,
      invoice: { ...invoice, _id: result.insertedId }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}

// PUT - Update invoice (mark paid, apply late fees, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceId, action, paymentMethod, paymentReference, lateFee } = body;

    if (!invoiceId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();
    const updates: Record<string, unknown> = { updatedAt: new Date() };

    switch (action) {
      case 'mark_paid':
        updates.status = 'paid';
        updates.paidDate = new Date();
        updates.paymentMethod = paymentMethod;
        updates.paymentReference = paymentReference;
        break;
      case 'apply_late_fee':
        updates.lateFee = lateFee;
        updates.lateFeeApplied = true;
        break;
      case 'cancel':
        updates.status = 'cancelled';
        break;
      case 'refund':
        updates.status = 'refunded';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const result = await db.collection('invoices').updateOne(
      { _id: new ObjectId(invoiceId) },
      { $set: updates }
    );

    return NextResponse.json({ message: 'Invoice updated', modified: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}
