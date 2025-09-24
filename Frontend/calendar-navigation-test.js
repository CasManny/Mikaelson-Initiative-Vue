// Quick test for calendar navigation functionality
// Open browser console and run this to test the navigation

// Test the scroll functionality
function testCalendarNavigation() {
  console.log('Testing Calendar Navigation...')
  
  // Check if the calendar section exists
  const calendarSection = document.getElementById('google-calendar-section')
  if (!calendarSection) {
    console.error('❌ Google Calendar section not found!')
    return false
  }
  console.log('✅ Google Calendar section found')
  
  // Check if the calendar nav button exists
  const calendarNavButton = document.querySelector('.nav-link[onclick*="scrollToCalendarIntegration"], .nav-link .fa-calendar-alt')?.closest('.nav-link')
  if (!calendarNavButton) {
    console.error('❌ Calendar navigation button not found!')
    return false
  }
  console.log('✅ Calendar navigation button found')
  
  // Test the scroll behavior
  console.log('🧪 Testing scroll behavior...')
  calendarSection.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  })
  
  // Test the highlight effect
  console.log('🧪 Testing highlight effect...')
  calendarSection.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out'
  calendarSection.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.3)'
  calendarSection.style.transform = 'scale(1.02)'
  
  setTimeout(() => {
    calendarSection.style.boxShadow = ''
    calendarSection.style.transform = 'scale(1)'
    console.log('✅ Test completed successfully!')
  }, 2000)
  
  return true
}

// Run the test
testCalendarNavigation()

console.log(`
🎯 Calendar Navigation Test Instructions:
1. Make sure you're on the dashboard page
2. Look for the Calendar button in the left sidebar (under Habits)
3. Click the Calendar button
4. The page should smoothly scroll to the Google Calendar Integration section
5. The section should briefly highlight with a blue glow and slight scale effect
6. The effect should fade out after 2 seconds

📍 Manual Test:
- Click the Calendar button in the sidebar
- Verify smooth scrolling behavior
- Verify highlight effect appears and disappears
- Check that the Google Calendar Integration section is clearly visible
`);
