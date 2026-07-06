import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, updateUser } from '@/models/User';
import { hashPassword } from '@/lib/auth/jwt';
import { sendEmail, emailTemplates } from '@/lib/email/service';
import crypto from 'crypto';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'admin@nextzenacademy.com';

export async function POST(_req: NextRequest) {
  try {
    // Require an invite secret to prevent unauthorized access.
    // Set ADMIN_INVITE_SECRET in your environment variables.
    const { secret } = await _req.json().catch(() => ({ secret: undefined }));
    const inviteSecret = process.env.ADMIN_INVITE_SECRET;

    if (!inviteSecret) {
      return NextResponse.json(
        { error: 'ADMIN_INVITE_SECRET environment variable is not configured.' },
        { status: 500 }
      );
    }

    if (!secret || secret !== inviteSecret) {
      return NextResponse.json(
        { error: 'Invalid or missing invite secret.' },
        { status: 403 }
      );
    }

    // Check if admin user exists, create if not
    let user = await findUserByEmail(ADMIN_EMAIL);

    if (!user) {
      // Create admin user with a random unusable password
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await hashPassword(randomPassword);

      await createUser({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      });

      user = await findUserByEmail(ADMIN_EMAIL);

      if (!user) {
        return NextResponse.json(
          { error: 'Failed to create admin user' },
          { status: 500 }
        );
      }
    }

    // Verify the user has admin role
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'User exists but is not an admin' },
        { status: 400 }
      );
    }

    // Generate a password setup token (reuses the reset password flow)
    const setupToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(setupToken).digest('hex');

    // Set token expiry to 1 hour from now
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Update user with setup token
    await updateUser(user._id!, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: tokenExpires,
    });

    // Create setup link (uses the existing reset-password page)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const setupLink = `${appUrl}/reset-password?token=${setupToken}&email=${encodeURIComponent(ADMIN_EMAIL)}`;

    // Send admin setup email
    try {
      const template = emailTemplates.adminSetup(user.firstName, setupLink);
      await sendEmail(ADMIN_EMAIL, template, user._id, 'admin-setup');

      return NextResponse.json({
        message: `Admin setup email sent successfully to ${ADMIN_EMAIL}. The admin can use the link in the email to set their password.`,
      });
    } catch (emailError: unknown) {
      console.error('Failed to send admin setup email:', emailError);

      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      const errorResponse: { error: string; details?: string } = {
        error: process.env.NODE_ENV === 'production'
          ? 'Unable to send admin setup email at this time. Please try again later.'
          : 'Failed to send admin setup email. Please check email configuration.',
      };

      if (process.env.NODE_ENV !== 'production') {
        errorResponse.details = errorMessage;
      }

      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error) {
    console.error('Admin invite error:', error);

    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
