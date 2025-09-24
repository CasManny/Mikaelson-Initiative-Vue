import { defineStore } from 'pinia'
import EmailService from '../services/emailService.js'
import GoogleCalendarService from '../services/googleCalendarService.js'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    habits: [],
    activityLog: [],
    stats: {
      totalHabits: 0,
      completedToday: 0,
      streakDays: 0,
      weeklyProgress: 0,
      lastCheckIn: null // ISO string of last daily check-in
    },
    leaderboard: [],
    // Google Calendar integration
    googleCalendar: {
      isConnected: false,
      isInitialized: false,
      syncEnabled: false,
      lastSync: null,
      service: null
    }
  }),

  getters: {
    todayHabits: (state) => {
      const today = new Date().toDateString()
      return state.habits.filter(habit => 
        new Date(habit.lastCompleted || 0).toDateString() === today
      )
    },
    
    completionRate: (state) => {
      if (state.habits.length === 0) return 0
      return Math.round((state.stats.completedToday / state.habits.length) * 100)
    }
  },

  actions: {
    // Initialize dashboard data
    initDashboard() {
      const habits = localStorage.getItem('mikaelson_habits')
      const stats = localStorage.getItem('mikaelson_stats')
      const activityLog = localStorage.getItem('mikaelson_activity_log')
      const calendarSettings = localStorage.getItem('mikaelson_calendar_settings')
      
      if (habits) this.habits = JSON.parse(habits)
      if (stats) this.stats = JSON.parse(stats)
      if (activityLog) this.activityLog = JSON.parse(activityLog)
      if (calendarSettings) {
        this.googleCalendar = { ...this.googleCalendar, ...JSON.parse(calendarSettings) }
      }

      // Initialize Google Calendar service if enabled
      if (this.googleCalendar.syncEnabled) {
        this.initGoogleCalendar()
      }
    },

    // Initialize Google Calendar integration
    async initGoogleCalendar() {
      try {
        if (!this.googleCalendar.service) {
          this.googleCalendar.service = new GoogleCalendarService()
        }
        
        await this.googleCalendar.service.initialize()
        this.googleCalendar.isInitialized = true
        this.saveCalendarSettings()
        
        console.log('Google Calendar integration initialized')
        return true
      } catch (error) {
        console.error('Failed to initialize Google Calendar:', error)
        this.googleCalendar.isInitialized = false
        return false
      }
    },

    // Connect to Google Calendar
    async connectGoogleCalendar() {
      try {
        if (!this.googleCalendar.isInitialized) {
          await this.initGoogleCalendar()
        }

        await this.googleCalendar.service.signIn()
        this.googleCalendar.isConnected = true
        this.googleCalendar.syncEnabled = true
        this.saveCalendarSettings()

        // Create initial reminders
        await this.googleCalendar.service.createCheckInReminders()
        
        console.log('Connected to Google Calendar successfully')
        return true
      } catch (error) {
        console.error('Failed to connect to Google Calendar:', error)
        throw error
      }
    },

    // Disconnect from Google Calendar
    async disconnectGoogleCalendar() {
      try {
        if (this.googleCalendar.service) {
          await this.googleCalendar.service.signOut()
        }
        
        this.googleCalendar.isConnected = false
        this.googleCalendar.syncEnabled = false
        this.saveCalendarSettings()
        
        console.log('Disconnected from Google Calendar')
        return true
      } catch (error) {
        console.error('Failed to disconnect from Google Calendar:', error)
        throw error
      }
    },

    // Sync current data with Google Calendar
    async syncWithGoogleCalendar() {
      try {
        if (!this.googleCalendar.isConnected || !this.googleCalendar.service) {
          throw new Error('Google Calendar not connected')
        }

        // Get completed habits today
        const today = new Date().toDateString()
        const completedHabits = this.habits.filter(habit => 
          habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === today
        )

        const syncData = {
          lastCheckIn: this.stats.lastCheckIn,
          streakDays: this.stats.streakDays,
          completedHabits: completedHabits,
          mood: this.getLastCheckInMood(),
          note: this.getLastCheckInNote()
        }

        const results = await this.googleCalendar.service.syncWithDashboard(syncData)
        this.googleCalendar.lastSync = new Date().toISOString()
        this.saveCalendarSettings()

        console.log('Google Calendar sync completed:', results)
        return results
      } catch (error) {
        console.error('Failed to sync with Google Calendar:', error)
        throw error
      }
    },

    // Add new habit
    addHabit(habit) {
      const newHabit = {
        id: Date.now(),
        ...habit,
        createdAt: new Date().toISOString(),
        lastCompleted: null,
        streak: 0
      }
      this.habits.push(newHabit)
      this.saveHabits()
    },

    // Update habit
    updateHabit(habitId, updates) {
      const index = this.habits.findIndex(h => h.id === habitId)
      if (index !== -1) {
        this.habits[index] = { ...this.habits[index], ...updates }
        this.saveHabits()
      }
    },

    // Complete habit
    async completeHabit(habitId) {
      const habit = this.habits.find(h => h.id === habitId)
      if (habit) {
        const today = new Date().toISOString()
        habit.lastCompleted = today
        habit.streak = (habit.streak || 0) + 1
        
        // Add to activity log
        this.activityLog.unshift({
          id: Date.now(),
          habitId,
          habitName: habit.name,
          completedAt: today,
          type: 'completion'
        })
        
        this.saveData()
        this.updateStats()

        // Sync with Google Calendar if connected
        if (this.googleCalendar.isConnected && this.googleCalendar.syncEnabled) {
          try {
            await this.googleCalendar.service.createHabitEvent(habit)
            console.log('Habit completion synced to Google Calendar')
          } catch (error) {
            console.error('Failed to sync habit to Google Calendar:', error)
          }
        }
      }
    },

    // Daily check-in (once per day) with email notification
    async dailyCheckIn(details) {
      const now = new Date()
      const todayStr = now.toDateString()
      const last = this.stats.lastCheckIn ? new Date(this.stats.lastCheckIn) : null
      const lastStr = last ? last.toDateString() : null

      // Already checked in today
      if (lastStr === todayStr) {
        return false
      }

      // Determine if yesterday
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()

      // Update streak
      if (lastStr === yesterdayStr) {
        this.stats.streakDays = (this.stats.streakDays || 0) + 1
      } else {
        this.stats.streakDays = 1
      }

      // Record check-in
      this.stats.lastCheckIn = now.toISOString()
      this.activityLog.unshift({
        id: Date.now(),
        type: 'checkin',
        completedAt: this.stats.lastCheckIn,
        note: details?.note || 'Daily check-in',
        mood: details?.mood || 'neutral'
      })

      this.saveData()

      // Send email notification
      try {
        const authStore = (await import('./auth.js')).useAuthStore()
        const currentUser = authStore.currentUser
        
        if (currentUser && currentUser.email) {
          const checkInData = {
            mood: details?.mood || 'neutral',
            note: details?.note || 'Daily check-in completed',
            streakDays: this.stats.streakDays
          }
          
          await EmailService.sendCheckInNotification(currentUser, checkInData)
          
          // Send streak milestone email if applicable
          if ([7, 30, 60, 100, 200, 365].includes(this.stats.streakDays)) {
            await EmailService.sendStreakMilestone(currentUser, this.stats.streakDays)
          }
          
          console.log('Daily check-in email notification sent successfully')
        }
      } catch (error) {
        console.error('Failed to send check-in email notification:', error)
        // Don't fail the check-in if email fails
      }

      // Sync with Google Calendar if connected
      if (this.googleCalendar.isConnected && this.googleCalendar.syncEnabled) {
        try {
          const checkInData = {
            mood: details?.mood || 'neutral',
            note: details?.note || 'Daily check-in completed',
            streakDays: this.stats.streakDays
          }

          await this.googleCalendar.service.createCheckInEvent(checkInData)
          
          // Create milestone event if applicable
          if ([7, 30, 60, 100, 200, 365].includes(this.stats.streakDays)) {
            const authStore = (await import('./auth.js')).useAuthStore()
            await this.googleCalendar.service.createMilestoneEvent({
              streakDays: this.stats.streakDays,
              userName: authStore.currentUser?.firstName || 'User'
            })
          }

          console.log('Check-in synced to Google Calendar successfully')
        } catch (error) {
          console.error('Failed to sync check-in to Google Calendar:', error)
          // Don't fail the check-in if calendar sync fails
        }
      }

      return true
    },

    // Save data to localStorage
    saveHabits() {
      localStorage.setItem('mikaelson_habits', JSON.stringify(this.habits))
    },

    saveData() {
      this.saveHabits()
      localStorage.setItem('mikaelson_activity_log', JSON.stringify(this.activityLog))
      localStorage.setItem('mikaelson_stats', JSON.stringify(this.stats))
    },

    saveCalendarSettings() {
      const settings = {
        isConnected: this.googleCalendar.isConnected,
        syncEnabled: this.googleCalendar.syncEnabled,
        lastSync: this.googleCalendar.lastSync
      }
      localStorage.setItem('mikaelson_calendar_settings', JSON.stringify(settings))
    },

    // Helper methods for Google Calendar integration
    getLastCheckInMood() {
      const lastCheckIn = this.activityLog.find(log => log.type === 'checkin')
      return lastCheckIn?.mood || 'neutral'
    },

    getLastCheckInNote() {
      const lastCheckIn = this.activityLog.find(log => log.type === 'checkin')
      return lastCheckIn?.note || 'Daily check-in'
    },

    // Update statistics
    updateStats() {
      const today = new Date().toDateString()
      const completedToday = this.habits.filter(habit => 
        habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === today
      ).length

      this.stats = {
        ...this.stats,
        totalHabits: this.habits.length,
        completedToday
      }
      
      this.saveData()
    }
  }
})
