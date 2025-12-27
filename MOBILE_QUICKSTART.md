# Mobile Attendance App - Quick Start Guide

## For Parents

### Step 1: Sign Up
1. Visit the website and click "Sign up"
2. Fill in your information
3. Select "Parent/Guardian" as your role
4. Submit the form

### Step 2: Add Your Children
1. Log in to your account
2. Go to Dashboard
3. Click "Add Child" or navigate to the children section
4. Enter child's name, age, and grade
5. Save the information

### Step 3: Generate QR Code
1. Navigate to `/mobile` or click on Mobile App in navigation
2. Select "Student QR Code"
3. Choose your child from the dropdown
4. Click "Generate QR Code"
5. Save or screenshot the QR code for daily use

### Step 4: Check-In/Check-Out
1. Open the QR code on your mobile device
2. Show the QR code to the teacher at drop-off (check-in)
3. Show the same QR code to the teacher at pick-up (check-out)

### Step 5: View Attendance History
1. Navigate to `/mobile/attendance`
2. Select a child to filter attendance records
3. View check-in and check-out times for all sessions

### Step 6: Chat with Teachers
1. Navigate to `/mobile/chat`
2. Select the course you want to discuss
3. Type and send messages to teachers
4. Messages refresh automatically every 5 seconds

## For Teachers

### Step 1: Sign Up as Teacher
1. Visit the website and click "Sign up"
2. Fill in your information
3. Select "Teacher" as your role
4. Submit the form

### Step 2: Access Scanner
1. Log in to your account
2. Navigate to `/mobile` or Mobile App
3. Select "QR Scanner"

### Step 3: Check In Students
1. Click "Start Scanner" button
2. Allow camera permissions in your browser
3. Point camera at student's QR code
4. Wait for automatic scan and confirmation
5. Repeat for each student

### Step 4: Check Out Students
1. Click the "Check Out" mode button
2. Start the scanner
3. Scan student's QR code
4. Confirm successful check-out

### Step 5: View Attendance
1. Navigate to `/mobile/attendance`
2. See all active check-ins (students currently in class)
3. View completed check-outs
4. Check attendance history

### Step 6: Chat with Parents
1. Navigate to `/mobile/chat`
2. Select the course
3. Read and respond to parent messages
4. Send updates about student progress

## Technical Requirements

### Device Requirements
- Smartphone or tablet with camera (for QR scanning)
- Modern web browser (Chrome, Safari, Firefox, Edge)
- Internet connection

### Browser Requirements
- **For Parents**: Any modern browser
- **For Teachers**: Browser with camera access permission
  - Chrome 59+ (recommended)
  - Safari 11+
  - Firefox 52+
  - Edge 79+

### Permissions Required
- **Camera Access**: Required for teachers to scan QR codes
- **Local Storage**: Required to save authentication tokens

## Common Issues & Solutions

### QR Code Won't Generate
**Problem**: QR code generation fails
**Solution**: 
- Ensure you have added at least one child to your account
- Check that you're logged in
- Refresh the page and try again

### Scanner Not Working
**Problem**: Camera doesn't activate or QR code won't scan
**Solution**:
- Grant camera permissions in browser settings
- Ensure good lighting when scanning
- Hold QR code steady and at appropriate distance
- Try refreshing the page
- Check browser compatibility

### Messages Not Sending
**Problem**: Chat messages fail to send
**Solution**:
- Check internet connection
- Verify you're enrolled in the course
- Ensure you're logged in
- Try refreshing the page

### Attendance Not Showing
**Problem**: Attendance records are missing
**Solution**:
- Ensure QR code was properly scanned
- Check that you selected the correct child filter
- Verify the date range
- Refresh the page

## Best Practices

### For Parents
1. **Generate QR code in advance**: Save or screenshot the QR code for offline access
2. **One QR per child**: Each child needs their own unique QR code
3. **Keep QR visible**: Ensure QR code is clear and not damaged
4. **Check history regularly**: Monitor your child's attendance patterns

### For Teachers
1. **Good lighting**: Ensure adequate lighting for QR scanning
2. **Steady hands**: Hold device steady while scanning
3. **Quick scans**: Position QR code directly in scanner view
4. **Confirm each scan**: Wait for confirmation before moving to next student
5. **Regular checks**: Review active attendance throughout the day

## Security Tips

1. **Don't share QR codes**: Each QR code is unique to a child
2. **Keep devices secure**: Lock your phone when not in use
3. **Verify identity**: Teachers should verify student identity along with QR
4. **Report issues**: Contact administrator if QR codes are compromised
5. **Log out**: Always log out on shared devices

## Support

For additional help:
- Read the full documentation: MOBILE_APP_README.md
- Contact support: support@nextzenstem.com
- Check main README.md for technical details

## Mobile App URLs

- Home: `/mobile`
- QR Code (Parents): `/mobile/qr-code`
- Scanner (Teachers): `/mobile/scanner`
- Attendance: `/mobile/attendance`
- Chat: `/mobile/chat`

---

**Note**: The mobile app is a progressive web app that works on both Android and iOS devices through any modern web browser. No app store download required!
