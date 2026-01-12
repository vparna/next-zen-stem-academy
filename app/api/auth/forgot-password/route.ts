import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/models/User';
import { sendEmail, emailTemplates } from '@/lib/email/service';
import crypto from 'crypto';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await findUserByEmail(email);
    
    // Always return success to prevent email enumeration attacks
    // This prevents attackers from determining if an email exists in the system
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link has been sent.',
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
    const resetLink = `${appUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    // Send email
    const template = emailTemplates.passwordReset(user.firstName, resetLink);
    await sendEmail(email, template, user._id, 'password-reset');
    
    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
