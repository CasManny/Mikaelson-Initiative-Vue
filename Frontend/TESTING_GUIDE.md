# Testing Guide: Email Notification System

## 🧪 Testing the Daily Check-in Email Notifications

### Prerequisites
1. **Development Server Running**: ✅ (I can see Vite is running)
2. **Backend Server**: Make sure the Node.js server is running on port 5000
3. **User Account**: You need to be logged in to test

### Quick Start Testing

#### 1. Start the Backend Server (if not running)
```bash
cd /Users/mikaelson/Documents/Mikaelson-Initiative-/server
npm install
node server.js
```

#### 2. Open the Application
```bash
# The frontend is already running, open in browser:
# http://localhost:3000
```

#### 3. Test the Email System

##### Step 1: Login/Register
1. Navigate to `/login` or `/signup`
2. Create an account or login with existing credentials
3. Make sure you use a real email address for testing

##### Step 2: Go to Dashboard
1. Navigate to `/dashboard`
2. You should see the "Daily Check-in" button

##### Step 3: Perform Daily Check-in
1. Click "Daily Check-in" button
2. Fill out the modal:
   - Select a mood (Great, Good, Neutral, Tired, Stressed)
   - Add an optional note
3. Click "Check In"

##### Step 4: Check for Email Confirmation
1. **In Browser**: You should see an alert with email confirmation
2. **In Server Console**: Check for email logs (see console output)
3. **In Browser Console**: Check for any JavaScript errors

### 🔍 What to Look For

#### In Browser Alert
You should see something like:
```
Checked in for today! Streak: 1 days

A confirmation email has been sent to your@email.com
```

#### In Server Console
Look for logs like:
```
=== EMAIL NOTIFICATION ===
To: your@email.com
Subject: Daily Check-in Confirmed - Mikaelson Initiative
Template: checkin-confirmation
Content: [Full email content]
========================
```

#### In Browser DevTools Console
1. Press F12 → Console tab
2. Look for:
   - "Daily check-in email notification sent successfully"
   - Any error messages related to email sending

### 🎯 Test Scenarios

#### Scenario 1: First-Time Check-in
```bash
# Expected Result:
- Streak: 1 day
- Email confirmation
- No milestone email
```

#### Scenario 2: Streak Milestone (Day 7)
```bash
# To simulate: Manually adjust streak in localStorage or database
# Expected Result:
- Regular check-in email
- Additional milestone celebration email for 7 days
- Special message in browser alert
```

#### Scenario 3: Duplicate Check-in (Same Day)
```bash
# Try checking in twice on the same day
# Expected Result:
- "You already checked in today" message
- No email sent
```

#### Scenario 4: Network Error Simulation
```bash
# Stop the backend server temporarily
# Expected Result:
- Check-in still completes locally
- Error message about email notification failure
```

### 🛠️ Manual Testing Steps

#### Test 1: Basic Functionality
1. ✅ Open Dashboard
2. ✅ Click "Daily Check-in"
3. ✅ Fill form and submit
4. ✅ Verify success message includes email confirmation
5. ✅ Check server console for email logs

#### Test 2: Email Content Verification
1. ✅ Check server logs for email content
2. ✅ Verify all placeholders are filled:
   - User name
   - Check-in date
   - Mood
   - Note
   - Streak days
   - Dashboard URL

#### Test 3: Streak Milestone Testing
```javascript
// In browser console, manually set streak to test milestone:
const dashboardStore = useDashboardStore()
dashboardStore.stats.streakDays = 6
// Then do check-in to trigger 7-day milestone
```

#### Test 4: Error Handling
1. ✅ Stop backend server
2. ✅ Try check-in
3. ✅ Verify graceful error handling

### 🔬 Advanced Testing

#### Test with Browser Network Tab
1. Open DevTools → Network tab
2. Perform check-in
3. Look for POST request to `/send-email`
4. Check response status and content

#### Test Email Service Integration
```bash
# Add to server/.env for real email testing:
EMAIL_SERVICE=console  # Current mode
# Or configure real service:
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_key_here
```

### 📊 Automated Testing Script

Create a test script to quickly verify functionality:

```javascript
// Save as test-checkin.js in project root
async function testCheckIn() {
  console.log('🧪 Testing Email Notification System...');
  
  // Test 1: Basic check-in
  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('mikaelson_token')}`
      },
      body: JSON.stringify({
        to: 'test@example.com',
        subject: 'Test Email',
        template: 'checkin-confirmation',
        data: {
          userName: 'Test User',
          checkInDate: new Date().toLocaleDateString(),
          mood: 'Great',
          note: 'Test note',
          streakDays: 1,
          dashboardUrl: window.location.origin + '/dashboard'
        }
      })
    });
    
    const result = await response.json();
    console.log('✅ Email API Test:', result);
  } catch (error) {
    console.error('❌ Email API Test Failed:', error);
  }
}

// Run in browser console
testCheckIn();
```

### 🐛 Troubleshooting

#### Issue: "Email notification failed"
**Solutions:**
1. Check if backend server is running on port 5000
2. Verify JWT token is valid
3. Check browser console for network errors

#### Issue: "User not receiving emails" (in production)
**Solutions:**
1. Check email service configuration
2. Verify API keys in environment variables
3. Check spam folder
4. Verify email address format

#### Issue: "Server console shows email but alert doesn't mention it"
**Solutions:**
1. Check Dashboard.vue for proper async/await handling
2. Verify auth store has current user email
3. Check browser console for JavaScript errors

### 📈 Success Metrics

#### What indicates successful testing:
- ✅ Server console shows email logs
- ✅ Browser alert confirms email sent
- ✅ No JavaScript errors in console
- ✅ Streak milestones trigger special messages
- ✅ Duplicate check-ins are handled correctly
- ✅ Network errors are handled gracefully

### 🔄 Continuous Testing

#### Daily Testing Routine:
1. Check server logs for any email errors
2. Verify user feedback on email receipts
3. Monitor email delivery rates (in production)
4. Test milestone emails by simulating streaks

#### Weekly Testing:
1. Test all email templates
2. Verify email service integration
3. Check for any performance issues
4. Update test data for different scenarios

---

## 📝 Test Results Template

```
Date: ___________
Tester: _________

✅ Basic Check-in: PASS/FAIL
✅ Email Confirmation: PASS/FAIL  
✅ Server Logging: PASS/FAIL
✅ Milestone Detection: PASS/FAIL
✅ Error Handling: PASS/FAIL
✅ Duplicate Prevention: PASS/FAIL

Notes: 
_________________________________
_________________________________

Next Steps:
_________________________________
```

Start with the basic testing steps above, and let me know what you observe!
