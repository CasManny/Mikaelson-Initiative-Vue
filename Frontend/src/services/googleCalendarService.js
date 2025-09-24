/**
 * Google Calendar Integration Service
 * Handles calendar sync, event creation, and reminder management
 */

export class GoogleCalendarService {
  constructor() {
    this.isInitialized = false;
    this.gapi = null;
    this.calendar = null;
    this.calendarId = 'primary'; // Use primary calendar by default
    
    // Configuration from environment variables or defaults
    this.CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_client_id_here'
    this.API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || 'your_api_key_here'
    this.DISCOVERY_DOC = import.meta.env.VITE_GOOGLE_DISCOVERY_DOC || 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    this.SCOPES = import.meta.env.VITE_GOOGLE_SCOPES || 'https://www.googleapis.com/auth/calendar'
    
    this.debugMode = import.meta.env.VITE_DEBUG_CALENDAR === 'true'
  }

  /**
   * Initialize Google Calendar API
   */
  async initialize() {
    try {
      // Load Google API client
      if (!window.gapi) {
        await this.loadGoogleAPI();
      }

      await new Promise((resolve) => {
        window.gapi.load('client:auth2', resolve);
      });

      // Initialize the API client
      await window.gapi.client.init({
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      this.gapi = window.gapi;
      this.calendar = this.gapi.client.calendar;
      this.isInitialized = true;
      
      console.log('Google Calendar API initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Calendar API:', error);
      throw error;
    }
  }

  /**
   * Load Google API script
   */
  async loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Sign in to Google Calendar
   */
  async signIn() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const authInstance = this.gapi.auth2.getAuthInstance();
      
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      return true;
    } catch (error) {
      console.error('Google Calendar sign-in failed:', error);
      throw error;
    }
  }

  /**
   * Sign out from Google Calendar
   */
  async signOut() {
    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      return true;
    } catch (error) {
      console.error('Google Calendar sign-out failed:', error);
      throw error;
    }
  }

  /**
   * Check if user is signed in
   */
  isSignedIn() {
    if (!this.isInitialized || !this.gapi) return false;
    const authInstance = this.gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get();
  }

  /**
   * Create a check-in event in Google Calendar
   */
  async createCheckInEvent(checkInData) {
    try {
      if (!this.isSignedIn()) {
        await this.signIn();
      }

      const event = {
        summary: '✅ Daily Check-in Completed - Mikaelson Initiative',
        description: this.formatCheckInDescription(checkInData),
        start: {
          dateTime: new Date().toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes duration
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        colorId: '10', // Green color for completed tasks
        source: {
          title: 'Mikaelson Initiative',
          url: window.location.origin + '/dashboard'
        }
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event
      });

      console.log('Check-in event created:', response.result);
      return response.result;
    } catch (error) {
      console.error('Failed to create check-in event:', error);
      throw error;
    }
  }

  /**
   * Create reminder events for upcoming check-ins
   */
  async createCheckInReminders(preferences = {}) {
    try {
      if (!this.isSignedIn()) {
        await this.signIn();
      }

      const defaultPrefs = {
        reminderTime: '09:00', // 9 AM
        daysAhead: 7, // Create reminders for next 7 days
        reminderMinutes: [15, 60] // Remind 15 minutes and 1 hour before
      };

      const prefs = { ...defaultPrefs, ...preferences };
      const events = [];

      // Create reminder events for the next week
      for (let i = 1; i <= prefs.daysAhead; i++) {
        const reminderDate = new Date();
        reminderDate.setDate(reminderDate.getDate() + i);
        
        // Set reminder time
        const [hours, minutes] = prefs.reminderTime.split(':');
        reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const event = {
          summary: '🔔 Daily Check-in Reminder - Mikaelson Initiative',
          description: this.formatReminderDescription(),
          start: {
            dateTime: reminderDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          end: {
            dateTime: new Date(reminderDate.getTime() + 30 * 60 * 1000).toISOString(), // 30 minutes
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          colorId: '5', // Yellow color for reminders
          reminders: {
            useDefault: false,
            overrides: prefs.reminderMinutes.map(minutes => ({
              method: 'popup',
              minutes: minutes
            }))
          },
          source: {
            title: 'Mikaelson Initiative',
            url: window.location.origin + '/dashboard'
          }
        };

        const response = await this.calendar.events.insert({
          calendarId: this.calendarId,
          resource: event
        });

        events.push(response.result);
      }

      console.log(`Created ${events.length} check-in reminder events`);
      return events;
    } catch (error) {
      console.error('Failed to create check-in reminders:', error);
      throw error;
    }
  }

  /**
   * Create habit completion events
   */
  async createHabitEvent(habitData) {
    try {
      if (!this.isSignedIn()) {
        await this.signIn();
      }

      const event = {
        summary: `✅ ${habitData.name} - Completed`,
        description: this.formatHabitDescription(habitData),
        start: {
          dateTime: new Date().toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        colorId: '11', // Red color for habits
        source: {
          title: 'Mikaelson Initiative - Habits',
          url: window.location.origin + '/dashboard'
        }
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event
      });

      console.log('Habit completion event created:', response.result);
      return response.result;
    } catch (error) {
      console.error('Failed to create habit event:', error);
      throw error;
    }
  }

  /**
   * Create milestone celebration events
   */
  async createMilestoneEvent(milestoneData) {
    try {
      if (!this.isSignedIn()) {
        await this.signIn();
      }

      const event = {
        summary: `🎉 ${milestoneData.streakDays} Day Streak Milestone!`,
        description: this.formatMilestoneDescription(milestoneData),
        start: {
          dateTime: new Date().toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour celebration
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        colorId: '9', // Blue color for celebrations
        source: {
          title: 'Mikaelson Initiative - Milestones',
          url: window.location.origin + '/dashboard'
        }
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event
      });

      console.log('Milestone event created:', response.result);
      return response.result;
    } catch (error) {
      console.error('Failed to create milestone event:', error);
      throw error;
    }
  }

  /**
   * Get upcoming events from calendar
   */
  async getUpcomingEvents(daysAhead = 7) {
    try {
      if (!this.isSignedIn()) {
        await this.signIn();
      }

      const timeMin = new Date().toISOString();
      const timeMax = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString();

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: timeMin,
        timeMax: timeMax,
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        q: 'Mikaelson Initiative' // Filter for our events
      });

      return response.result.items || [];
    } catch (error) {
      console.error('Failed to get upcoming events:', error);
      throw error;
    }
  }

  /**
   * Format check-in description
   */
  formatCheckInDescription(checkInData) {
    return `
Daily Check-in completed successfully!

Details:
• Mood: ${checkInData.mood || 'Not specified'}
• Note: ${checkInData.note || 'No additional notes'}
• Streak: ${checkInData.streakDays || 1} days
• Date: ${new Date().toLocaleDateString()}

Keep up the great work! 💪

View your progress: ${window.location.origin}/dashboard
    `.trim();
  }

  /**
   * Format reminder description
   */
  formatReminderDescription() {
    return `
Time for your daily check-in! 🔔

Don't forget to:
• Reflect on your mood and progress
• Update your habits
• Keep your streak going

Click here to check in: ${window.location.origin}/dashboard
    `.trim();
  }

  /**
   * Format habit description
   */
  formatHabitDescription(habitData) {
    return `
Habit completed: ${habitData.name}

Description: ${habitData.description || 'No description'}
Streak: ${habitData.streak || 0} days
Points earned: +${(habitData.streak || 0) * 10}

Great job staying consistent! 🎯

View your dashboard: ${window.location.origin}/dashboard
    `.trim();
  }

  /**
   * Format milestone description
   */
  formatMilestoneDescription(milestoneData) {
    return `
🎉 Congratulations on reaching ${milestoneData.streakDays} days!

This is a significant achievement that shows your dedication to personal growth and consistency.

Milestone Details:
• Days completed: ${milestoneData.streakDays}
• Achievement date: ${new Date().toLocaleDateString()}
• User: ${milestoneData.userName || 'Amazing user'}

Keep pushing forward - you're doing incredible! 🚀

View your progress: ${window.location.origin}/dashboard
    `.trim();
  }

  /**
   * Sync dashboard data with Google Calendar
   */
  async syncWithDashboard(dashboardData) {
    try {
      const results = {
        checkIn: null,
        habits: [],
        reminders: [],
        errors: []
      };

      // Create check-in event if completed today
      if (dashboardData.lastCheckIn) {
        const lastCheckIn = new Date(dashboardData.lastCheckIn);
        const today = new Date();
        
        if (lastCheckIn.toDateString() === today.toDateString()) {
          try {
            results.checkIn = await this.createCheckInEvent({
              mood: dashboardData.mood || 'neutral',
              note: dashboardData.note || 'Daily check-in',
              streakDays: dashboardData.streakDays || 1
            });
          } catch (error) {
            results.errors.push(`Check-in sync failed: ${error.message}`);
          }
        }
      }

      // Create habit completion events
      if (dashboardData.completedHabits) {
        for (const habit of dashboardData.completedHabits) {
          try {
            const habitEvent = await this.createHabitEvent(habit);
            results.habits.push(habitEvent);
          } catch (error) {
            results.errors.push(`Habit sync failed for ${habit.name}: ${error.message}`);
          }
        }
      }

      // Create upcoming reminders
      try {
        results.reminders = await this.createCheckInReminders();
      } catch (error) {
        results.errors.push(`Reminder creation failed: ${error.message}`);
      }

      return results;
    } catch (error) {
      console.error('Dashboard sync failed:', error);
      throw error;
    }
  }
}

export default GoogleCalendarService;
