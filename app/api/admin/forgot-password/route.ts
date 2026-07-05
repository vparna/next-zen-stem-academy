import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/models/User';
import { sendEmail, emailTemplates } from '@/lib/email/service';
import crypto from 'crypto';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'admin@nextzenacademy.com';

export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail } = await req.json();

    // Normalize email to lowercase
    const email = rawEmail?.toLowerCase();

    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Only allow password reset for the designated admin email
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      // Return a generic message to prevent email enumeration
      console.log('Admin forgot-password: email does not match admin email');
      return NextResponse.json({
        message: 'If this is the admin account, a password reset link has been sent.',
      });
    }

    // Find admin user by email
    const user = await findUserByEmail(ADMIN_EMAIL);

    if (!user) {
      // Return same generic message to prevent enumeration
      console.log('Admin forgot-password: admin user not found in database');
      return NextResponse.json({
        message: 'If this is the admin account, a password reset link has been sent.',
      });
    }

    // Verify the user has admin role
    if (user.role !== 'admin') {
      console.log('Admin forgot-password: user found but role is not admin:', user.role);
      return NextResponse.json({
        message: 'If this is the admin account, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expiry to 1 hour from now
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Update user with reset token
    await updateUser(user._id!, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: resetTokenExpires,
    });

    // Create reset link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${appUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(ADMIN_EMAIL)}`;

    // Send email only to admin@nextzenacademy.com
    try {
      const template = emailTemplates.passwordReset(user.firstName, resetLink);
      await sendEmail(ADMIN_EMAIL, template, user._id!, 'password-reset');

      return NextResponse.json({
        message: 'If this is the admin account, a password reset link has been sent.',
      });
    } catch (emailError: unknown) {
      console.error('Failed to send admin password reset email:', emailError);

      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      const errorResponse: { error: string; details?: string } = {
        error: process.env.NODE_ENV === 'production'
          ? 'Unable to process password reset request at this time. Please try again later or contact support.'
          : 'Failed to send password reset email. Please check email configuration or try again later.',
      };

      if (process.env.NODE_ENV !== 'production') {
        errorResponse.details = errorMessage;
      }

      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error) {
    console.error('Admin forgot password error:', error);

    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
