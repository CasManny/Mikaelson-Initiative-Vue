# Google Calendar Integration Testing Guide

This guide helps you test the Google Calendar integration functionality in the Mikaelson Initiative dashboard.

## Testing Environment Setup

### Prerequisites
1. Development server running (`npm run dev`)
2. Access to the dashboard at `http://localhost:3002/`
3. Google account for testing
4. Google API credentials configured (see GOOGLE_CALENDAR_SETUP.md)

### Quick Test with Mock Credentials

For testing the UI without Google API setup:

1. **Access the Dashboard**
   - Navigate to `http://localhost:3002/`
   - Log in to access the dashboard
   - Scroll down to see the "Google Calendar Integration" section

2. **Test Connection UI**
   - The integration should show "Not Connected" status
   - Click "Connect Google Calendar" button
   - Without real credentials, you'll see an error (expected)

3. **Test Settings UI**
   - To test the connected state UI, temporarily modify the dashboard store:
   ```javascript
   // In browser console:
   // Simulate connected state
   window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps[0]._instance.appContext.app._context.provides['dashboard-store'].googleCalendar.isConnected = true
   ```

## Full Integration Testing

### With Real Google API Credentials

1. **Setup Credentials**
   - Follow GOOGLE_CALENDAR_SETUP.md to get real API credentials
   - Add them to your `.env` file
   - Restart the development server

2. **Test OAuth Flow**
   - Navigate to dashboard
   - Click "Connect Google Calendar"
   - Complete Google OAuth consent
   - Verify "Connected" status appears

3. **Test Sync Settings**
   - Toggle different sync options (check-ins, habits, reminders, milestones)
   - Verify settings are saved to localStorage
   - Configure reminder time and advance notice

4. **Test Event Creation**
   - Complete a daily check-in
   - Complete a habit
   - Check your Google Calendar for new events

5. **Test Manual Sync**
   - Click "Sync Now" button
   - Verify success message appears
   - Check browser console for API calls

6. **Test Upcoming Events**
   - Click "View Upcoming Events"
   - Verify modal shows your calendar events
   - Test modal close functionality

7. **Test Disconnection**
   - Click "Disconnect" button
   - Verify status returns to "Not Connected"
   - Confirm OAuth tokens are cleared

## Testing Scenarios

### User Journey Tests

#### First-Time User
1. Access dashboard without calendar connected
2. See benefits and connection prompt
3. Complete OAuth flow successfully
4. Configure initial settings
5. Perform first check-in with calendar sync

#### Returning User
1. Access dashboard with existing connection
2. See connected status and last sync time
3. Modify sync preferences
4. Perform check-in and verify event creation
5. View upcoming events

#### Power User
1. Test all sync options enabled
2. Create multiple habit completions
3. Achieve a milestone (simulate streak data)
4. Test manual sync functionality
5. Manage calendar settings

### Error Handling Tests

#### Network Issues
```javascript
// Simulate network failure in browser console
window.fetch = () => Promise.reject(new Error('Network error'))
```

#### Invalid Credentials
- Use incorrect CLIENT_ID or API_KEY
- Verify proper error messages appear
- Test graceful degradation

#### Calendar Permission Denied
- Deny calendar access during OAuth
- Verify proper error handling
- Test retry mechanism

### Performance Tests

#### Large Calendar
- Test with Google account that has many calendar events
- Verify upcoming events load reasonably fast
- Test filtering to Mikaelson Initiative events only

#### Multiple Sync Operations
- Perform multiple check-ins/habit completions quickly
- Verify events are created without conflicts
- Test rate limiting and queuing

## Browser Testing

### Supported Browsers
- Chrome (recommended for Google APIs)
- Firefox
- Safari
- Edge

### Mobile Testing
- Test responsive design on mobile
- Verify OAuth flow works on mobile browsers
- Test touch interactions

## Console Commands for Testing

### Simulate Dashboard Data
```javascript
// Add test habits
const store = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps[0]._instance.appContext.app._context.provides['dashboard-store']

// Add test habit
store.habits.push({
  id: 'test-habit-1',
  name: 'Test Reading',
  description: 'Read for 30 minutes',
  frequency: 'daily',
  completed: false,
  streak: 5,
  points: 10
})

// Simulate check-in
store.lastCheckIn = new Date().toISOString()
store.currentStreak = 7
```

### Test Calendar Service Directly
```javascript
// Access the calendar service
const dashboardStore = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps[0]._instance.appContext.app._context.provides['dashboard-store']
const calendarService = dashboardStore.googleCalendar.service

// Test initialization
await calendarService.initialize()

// Test event creation
await calendarService.createCheckInEvent({
  checkInDate: new Date(),
  completedHabits: ['Reading', 'Exercise'],
  streak: 7,
  pointsEarned: 50
})
```

## Expected Behaviors

### Connection Flow
1. Click "Connect Google Calendar" → OAuth popup opens
2. Grant permissions → Success message appears
3. Status changes to "Connected" → Last sync time shows
4. Settings become available → Default sync options enabled

### Event Creation
1. Complete check-in → Calendar event created within 5 seconds
2. Complete habit → Individual habit event created
3. Reach milestone → Celebration event created
4. Manual sync → All pending events synchronized

### Error Handling
1. Network error → User-friendly error message
2. Invalid credentials → Clear setup instructions
3. Permission denied → Graceful degradation with retry option
4. Rate limit exceeded → Queued for later sync

## Debugging Tips

### Enable Debug Mode
```env
VITE_DEBUG_CALENDAR=true
```

### Common Debug Commands
```javascript
// Check localStorage
console.log('Calendar settings:', localStorage.getItem('mikaelson_calendar_sync_settings'))
console.log('Reminder settings:', localStorage.getItem('mikaelson_calendar_reminder_settings'))

// Check Google API status
console.log('GAPI loaded:', !!window.gapi)
console.log('Auth instance:', window.gapi?.auth2?.getAuthInstance())

// Check environment variables
console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID)
```

### Network Tab Inspection
- Monitor `googleapis.com` API calls
- Check for proper Authorization headers
- Verify request/response formats

## Reporting Issues

When reporting calendar integration issues, include:

1. **Environment Details**
   - Browser and version
   - Operating system
   - Node.js version
   - Any relevant console errors

2. **Steps to Reproduce**
   - Exact sequence of actions
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Configuration**
   - Environment variables (hide sensitive values)
   - Sync settings configuration
   - Google account details (without credentials)

4. **Console Output**
   - Any error messages
   - Network requests (hide auth tokens)
   - Debug output if enabled

## Test Data Cleanup

After testing:

1. **Clear Browser Data**
   ```javascript
   // Clear calendar-related localStorage
   localStorage.removeItem('mikaelson_calendar_sync_settings')
   localStorage.removeItem('mikaelson_calendar_reminder_settings')
   ```

2. **Revoke OAuth Access**
   - Visit [Google Account Permissions](https://myaccount.google.com/permissions)
   - Remove "Mikaelson Initiative" app access

3. **Clean Test Calendar Events**
   - Delete test events from Google Calendar
   - Clear any test reminders

This comprehensive testing approach ensures the Google Calendar integration works reliably across different scenarios and user types.
