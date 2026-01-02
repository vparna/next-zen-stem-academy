import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { findUserById } from '@/models/User';

export function withAdminAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }
      
      const token = authHeader.substring(7);
      const payload = verifyToken(token);
      
      if (!payload) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        );
      }
      
      // Check if user has admin role
      const user = await findUserById(payload.userId);
      
      if (!user || user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        );
      }
      
      // Add user info to request
      // Note: We use 'as any' here as NextRequest doesn't support custom properties.
      // This is a common pattern in Next.js middleware for passing authenticated user data.
      (req as any).user = { ...payload, role: user.role };
      
      return handler(req);
    } catch (error) {
      console.error('Admin auth error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
