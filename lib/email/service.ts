import nodemailer from 'nodemailer';
import { getDatabase } from '@/lib/db/mongodb';
import { EmailNotification } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'email_notifications';

// Create email transporter
const createTransporter = () => {
  // Check if email service is configured
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    console.warn('Email service not configured. EMAIL_HOST and EMAIL_USER must be set.');
    return null;
  }
  
  if (!process.env.EMAIL_PASSWORD) {
    console.warn('EMAIL_PASSWORD not configured. Email service will not work.');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Add timeout and connection options for better error handling
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    
    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
};

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

// Email templates
export const emailTemplates = {
  enrollment: (userName: string, courseName: string): EmailTemplate => ({
    subject: `Enrollment Confirmation - ${courseName}`,
    html: `
      <h2>Welcome to ${courseName}!</h2>
      <p>Hi ${userName},</p>
      <p>Thank you for enrolling in <strong>${courseName}</strong>. We're excited to have you join us!</p>
      <p>You can access your course materials from your dashboard.</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Welcome to ${courseName}! Hi ${userName}, Thank you for enrolling in ${courseName}. We're excited to have you join us! You can access your course materials from your dashboard. Best regards, Next Zen Academy Team`,
  }),

  payment: (userName: string, courseName: string, amount: number): EmailTemplate => ({
    subject: `Payment Confirmation - ${courseName}`,
    html: `
      <h2>Payment Received</h2>
      <p>Hi ${userName},</p>
      <p>We've successfully received your payment of <strong>$${amount.toFixed(2)}</strong> for <strong>${courseName}</strong>.</p>
      <p>You can now access all course materials from your dashboard.</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Payment Received. Hi ${userName}, We've successfully received your payment of $${amount.toFixed(2)} for ${courseName}. You can now access all course materials from your dashboard. Best regards, Next Zen Academy Team`,
  }),

  courseStart: (userName: string, courseName: string, startDate: Date): EmailTemplate => ({
    subject: `Course Starting Soon - ${courseName}`,
    html: `
      <h2>Your Course is Starting!</h2>
      <p>Hi ${userName},</p>
      <p>Your course <strong>${courseName}</strong> begins on <strong>${startDate.toLocaleDateString()}</strong>.</p>
      <p>Make sure you're ready to start learning! Log in to your dashboard to access course materials.</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Your Course is Starting! Hi ${userName}, Your course ${courseName} begins on ${startDate.toLocaleDateString()}. Make sure you're ready to start learning! Log in to your dashboard to access course materials. Best regards, Next Zen Academy Team`,
  }),

  assignmentDue: (userName: string, assignmentTitle: string, dueDate: Date): EmailTemplate => ({
    subject: `Assignment Due Soon - ${assignmentTitle}`,
    html: `
      <h2>Assignment Reminder</h2>
      <p>Hi ${userName},</p>
      <p>This is a reminder that your assignment <strong>${assignmentTitle}</strong> is due on <strong>${dueDate.toLocaleDateString()}</strong>.</p>
      <p>Don't forget to submit your work on time!</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Assignment Reminder. Hi ${userName}, This is a reminder that your assignment ${assignmentTitle} is due on ${dueDate.toLocaleDateString()}. Don't forget to submit your work on time! Best regards, Next Zen Academy Team`,
  }),

  gradePosted: (userName: string, assignmentTitle: string, score: number): EmailTemplate => ({
    subject: `Grade Posted - ${assignmentTitle}`,
    html: `
      <h2>Your Grade is Available</h2>
      <p>Hi ${userName},</p>
      <p>Your instructor has graded your assignment <strong>${assignmentTitle}</strong>.</p>
      <p>Your score: <strong>${score}</strong></p>
      <p>Log in to your dashboard to view detailed feedback.</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Your Grade is Available. Hi ${userName}, Your instructor has graded your assignment ${assignmentTitle}. Your score: ${score}. Log in to your dashboard to view detailed feedback. Best regards, Next Zen Academy Team`,
  }),

  certificateIssued: (userName: string, courseName: string, certificateUrl: string): EmailTemplate => ({
    subject: `Certificate Issued - ${courseName}`,
    html: `
      <h2>Congratulations! 🎉</h2>
      <p>Hi ${userName},</p>
      <p>You've successfully completed <strong>${courseName}</strong>!</p>
      <p>Your certificate is now available. <a href="${certificateUrl}">Download Certificate</a></p>
      <p>We're proud of your achievement!</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Congratulations! Hi ${userName}, You've successfully completed ${courseName}! Your certificate is now available at: ${certificateUrl}. We're proud of your achievement! Best regards, Next Zen Academy Team`,
  }),

  liveClassReminder: (userName: string, classTitle: string, scheduledAt: Date, meetingLink: string): EmailTemplate => ({
    subject: `Live Class Reminder - ${classTitle}`,
    html: `
      <h2>Live Class Starting Soon</h2>
      <p>Hi ${userName},</p>
      <p>Your live class <strong>${classTitle}</strong> is scheduled for <strong>${scheduledAt.toLocaleString()}</strong>.</p>
      <p><a href="${meetingLink}">Join Live Class</a></p>
      <p>See you there!</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Live Class Starting Soon. Hi ${userName}, Your live class ${classTitle} is scheduled for ${scheduledAt.toLocaleString()}. Join at: ${meetingLink}. See you there! Best regards, Next Zen Academy Team`,
  }),

  courseCompletion: (userName: string, courseName: string, progress: number): EmailTemplate => ({
    subject: `Congratulations on Completing ${courseName}!`,
    html: `
      <h2>Course Completed! 🎓</h2>
      <p>Hi ${userName},</p>
      <p>Congratulations! You've completed <strong>${courseName}</strong> with ${progress}% progress.</p>
      <p>Your certificate will be issued shortly and will be available in your dashboard.</p>
      <p>Keep up the great work!</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Course Completed! Hi ${userName}, Congratulations! You've completed ${courseName} with ${progress}% progress. Your certificate will be issued shortly and will be available in your dashboard. Keep up the great work! Best regards, Next Zen Academy Team`,
  }),

  passwordReset: (userName: string, resetLink: string): EmailTemplate => ({
    subject: 'Password Reset Request - Next Zen Academy',
    html: `
      <h2>Password Reset Request</h2>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your password for your Next Zen Academy account.</p>
      <p>Click the link below to reset your password. This link will expire in 1 hour:</p>
      <p><a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>Or copy and paste this link into your browser:</p>
      <p>${resetLink}</p>
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      <p>Best regards,<br>Next Zen Academy Team</p>
    `,
    text: `Password Reset Request. Hi ${userName}, We received a request to reset your password for your Next Zen Academy account. Click the link below to reset your password. This link will expire in 1 hour: ${resetLink}. If you didn't request a password reset, please ignore this email or contact support if you have concerns. Best regards, Next Zen Academy Team`,
  }),
};

// Send email function
export async function sendEmail(
  to: string,
  template: EmailTemplate,
  userId?: ObjectId,
  emailType?: EmailNotification['type']
): Promise<boolean> {
  const db = await getDatabase();
  
  // Log email to database
  const emailNotification: Omit<EmailNotification, '_id'> = {
    userId: userId || new ObjectId(),
    email: to,
    type: emailType || 'enrollment',
    subject: template.subject,
    content: template.html,
    status: 'pending',
    createdAt: new Date(),
  };

  const result = await db.collection<EmailNotification>(COLLECTION_NAME).insertOne(emailNotification);
  const emailId = result.insertedId;

  const transporter = createTransporter();
  
  // If transporter is not configured, throw an error
  if (!transporter) {
    const errorMsg = process.env.NODE_ENV === 'production'
      ? 'Email service unavailable'
      : 'Email service not configured. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD environment variables.';
    console.error(errorMsg);
    await db.collection<EmailNotification>(COLLECTION_NAME).updateOne(
      { _id: emailId },
      { $set: { status: 'failed', error: errorMsg } }
    );
    throw new Error(errorMsg);
  }

  try {
    // For text version, use the provided text or a simple message
    // Note: We don't strip HTML here as templates are controlled and safe
    const textVersion = template.text || 'Please view this email in an HTML-capable email client.';
    
    const mailOptions = {
      from: `"Next Zen Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
      text: textVersion,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', { messageId: info.messageId, to, subject: template.subject });
    
    // Update email status to sent
    await db.collection<EmailNotification>(COLLECTION_NAME).updateOne(
      { _id: emailId },
      { $set: { status: 'sent', sentAt: new Date() } }
    );
    
    return true;
  } catch (error: any) {
    console.error('Error sending email:', {
      error: error.message,
      code: error.code,
      command: error.command,
      to,
      subject: template.subject
    });
    
    // Update email status to failed
    await db.collection<EmailNotification>(COLLECTION_NAME).updateOne(
      { _id: emailId },
      { $set: { status: 'failed', error: error.message } }
    );
    
    // Throw the error so the caller knows the email failed
    const userFacingError = process.env.NODE_ENV === 'production'
      ? 'Failed to send email'
      : `Failed to send email: ${error.message}`;
    throw new Error(userFacingError);
  }
}

// Helper function to send notification emails
export async function sendNotificationEmail(
  userId: ObjectId,
  email: string,
  type: EmailNotification['type'],
  templateData: any
): Promise<boolean> {
  let template: EmailTemplate;

  switch (type) {
    case 'enrollment':
      template = emailTemplates.enrollment(templateData.userName, templateData.courseName);
      break;
    case 'payment':
      template = emailTemplates.payment(templateData.userName, templateData.courseName, templateData.amount);
      break;
    case 'course-start':
      template = emailTemplates.courseStart(templateData.userName, templateData.courseName, templateData.startDate);
      break;
    case 'assignment-due':
      template = emailTemplates.assignmentDue(templateData.userName, templateData.assignmentTitle, templateData.dueDate);
      break;
    case 'grade-posted':
      template = emailTemplates.gradePosted(templateData.userName, templateData.assignmentTitle, templateData.score);
      break;
    case 'certificate-issued':
      template = emailTemplates.certificateIssued(templateData.userName, templateData.courseName, templateData.certificateUrl);
      break;
    case 'live-class-reminder':
      template = emailTemplates.liveClassReminder(templateData.userName, templateData.classTitle, templateData.scheduledAt, templateData.meetingLink);
      break;
    case 'course-completion':
      template = emailTemplates.courseCompletion(templateData.userName, templateData.courseName, templateData.progress);
      break;
    case 'password-reset':
      template = emailTemplates.passwordReset(templateData.userName, templateData.resetLink);
      break;
    default:
      return false;
  }

  return await sendEmail(email, template, userId, type);
}
