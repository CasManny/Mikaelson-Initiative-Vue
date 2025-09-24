<template>
  <div class="google-calendar-integration">
    <div class="integration-header">
      <h3 class="integration-title">
        <i class="fab fa-google"></i>
        Google Calendar Integration
      </h3>
      <div class="integration-status" :class="{ connected: isConnected }">
        <span class="status-indicator"></span>
        {{ isConnected ? 'Connected' : 'Not Connected' }}
      </div>
    </div>

    <div class="integration-content">
      <div v-if="!isConnected" class="connection-section">
        <p class="description">
          Connect your Google Calendar to automatically log your check-ins, habit completions, 
          and receive reminder notifications for upcoming tasks.
        </p>
        
        <div class="benefits-list">
          <h4>Benefits of connecting:</h4>
          <ul>
            <li>📅 Automatic check-in events in your calendar</li>
            <li>🔔 Smart reminders for daily check-ins</li>
            <li>✅ Habit completion tracking</li>
            <li>🎉 Milestone celebration events</li>
            <li>📊 Visual progress in your calendar</li>
          </ul>
        </div>

        <div class="connection-actions">
          <button 
            class="btn btn-primary google-connect-btn"
            @click="connectCalendar"
            :disabled="isConnecting"
          >
            <i class="fab fa-google"></i>
            {{ isConnecting ? 'Connecting...' : 'Connect Google Calendar' }}
          </button>
        </div>
      </div>

      <div v-else class="connected-section">
        <div class="connection-info">
          <p class="success-message">
            <i class="fas fa-check-circle"></i>
            Successfully connected to Google Calendar!
          </p>
          <p class="last-sync" v-if="lastSync">
            Last synced: {{ formatLastSync }}
          </p>
        </div>

        <div class="sync-options">
          <h4>Sync Settings</h4>
          <div class="option-group">
            <label class="option-item">
              <input 
                type="checkbox" 
                v-model="syncSettings.checkIns"
                @change="updateSyncSettings"
              >
              <span class="option-label">Sync daily check-ins</span>
              <span class="option-description">Create calendar events for completed check-ins</span>
            </label>
            
            <label class="option-item">
              <input 
                type="checkbox" 
                v-model="syncSettings.habits"
                @change="updateSyncSettings"
              >
              <span class="option-label">Sync habit completions</span>
              <span class="option-description">Log individual habit completions to calendar</span>
            </label>
            
            <label class="option-item">
              <input 
                type="checkbox" 
                v-model="syncSettings.reminders"
                @change="updateSyncSettings"
              >
              <span class="option-label">Create reminder events</span>
              <span class="option-description">Set up daily check-in reminders</span>
            </label>
            
            <label class="option-item">
              <input 
                type="checkbox" 
                v-model="syncSettings.milestones"
                @change="updateSyncSettings"
              >
              <span class="option-label">Sync milestone achievements</span>
              <span class="option-description">Celebrate streak milestones in calendar</span>
            </label>
          </div>

          <div class="reminder-settings" v-if="syncSettings.reminders">
            <h5>Reminder Preferences</h5>
            <div class="reminder-time">
              <label for="reminderTime">Daily reminder time:</label>
              <input 
                type="time" 
                id="reminderTime"
                v-model="reminderSettings.time"
                @change="updateReminderSettings"
              >
            </div>
            
            <div class="reminder-advance">
              <label for="reminderAdvance">Remind me:</label>
              <select 
                id="reminderAdvance"
                v-model="reminderSettings.advance"
                @change="updateReminderSettings"
              >
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="120">2 hours before</option>
              </select>
            </div>
          </div>
        </div>

        <div class="sync-actions">
          <button 
            class="btn btn-secondary"
            @click="manualSync"
            :disabled="isSyncing"
          >
            <i class="fas fa-sync-alt"></i>
            {{ isSyncing ? 'Syncing...' : 'Sync Now' }}
          </button>
          
          <button 
            class="btn btn-outline"
            @click="viewUpcomingEvents"
          >
            <i class="fas fa-calendar-alt"></i>
            View Upcoming Events
          </button>
          
          <button 
            class="btn btn-danger"
            @click="disconnectCalendar"
          >
            <i class="fas fa-unlink"></i>
            Disconnect
          </button>
        </div>
      </div>
    </div>

    <!-- Upcoming Events Modal -->
    <div v-if="showEventsModal" class="modal-overlay" @click="closeEventsModal">
      <div class="modal-container events-modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            <i class="fas fa-calendar-alt"></i>
            Upcoming Events
          </h3>
          <button class="modal-close" @click="closeEventsModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-content">
          <div v-if="upcomingEvents.length > 0" class="events-list">
            <div 
              v-for="event in upcomingEvents" 
              :key="event.id"
              class="event-item"
            >
              <div class="event-time">
                {{ formatEventTime(event.start.dateTime) }}
              </div>
              <div class="event-details">
                <h4 class="event-title">{{ event.summary }}</h4>
                <p class="event-description">{{ event.description?.substring(0, 100) }}...</p>
              </div>
            </div>
          </div>
          
          <div v-else class="empty-events">
            <i class="fas fa-calendar-times"></i>
            <p>No upcoming Mikaelson Initiative events found</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="statusMessage" class="status-message" :class="statusMessage.type">
      <i :class="statusMessage.icon"></i>
      {{ statusMessage.text }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

export default {
  name: 'GoogleCalendarIntegration',
  setup() {
    const dashboardStore = useDashboardStore()
    
    // Reactive state
    const isConnecting = ref(false)
    const isSyncing = ref(false)
    const showEventsModal = ref(false)
    const upcomingEvents = ref([])
    const statusMessage = ref(null)
    
    // Sync settings
    const syncSettings = ref({
      checkIns: true,
      habits: true,
      reminders: true,
      milestones: true
    })
    
    // Reminder settings
    const reminderSettings = ref({
      time: '09:00',
      advance: 15
    })

    // Computed properties
    const isConnected = computed(() => dashboardStore.googleCalendar.isConnected)
    const lastSync = computed(() => dashboardStore.googleCalendar.lastSync)
    
    const formatLastSync = computed(() => {
      if (!lastSync.value) return 'Never'
      return new Date(lastSync.value).toLocaleString()
    })

    // Methods
    const connectCalendar = async () => {
      isConnecting.value = true
      
      try {
        await dashboardStore.connectGoogleCalendar()
        showStatusMessage('success', 'fas fa-check-circle', 'Connected to Google Calendar successfully!')
        
        // Create initial reminders
        if (syncSettings.value.reminders) {
          await createInitialReminders()
        }
      } catch (error) {
        console.error('Failed to connect calendar:', error)
        showStatusMessage('error', 'fas fa-exclamation-circle', 'Failed to connect to Google Calendar. Please try again.')
      } finally {
        isConnecting.value = false
      }
    }

    const disconnectCalendar = async () => {
      try {
        await dashboardStore.disconnectGoogleCalendar()
        showStatusMessage('info', 'fas fa-info-circle', 'Disconnected from Google Calendar')
      } catch (error) {
        console.error('Failed to disconnect calendar:', error)
        showStatusMessage('error', 'fas fa-exclamation-circle', 'Failed to disconnect. Please try again.')
      }
    }

    const manualSync = async () => {
      isSyncing.value = true
      
      try {
        await dashboardStore.syncWithGoogleCalendar()
        showStatusMessage('success', 'fas fa-check-circle', 'Calendar synced successfully!')
      } catch (error) {
        console.error('Failed to sync calendar:', error)
        showStatusMessage('error', 'fas fa-exclamation-circle', 'Sync failed. Please check your connection.')
      } finally {
        isSyncing.value = false
      }
    }

    const viewUpcomingEvents = async () => {
      try {
        if (dashboardStore.googleCalendar.service) {
          upcomingEvents.value = await dashboardStore.googleCalendar.service.getUpcomingEvents()
          showEventsModal.value = true
        }
      } catch (error) {
        console.error('Failed to load upcoming events:', error)
        showStatusMessage('error', 'fas fa-exclamation-circle', 'Failed to load upcoming events')
      }
    }

    const closeEventsModal = () => {
      showEventsModal.value = false
    }

    const updateSyncSettings = () => {
      // Save sync settings to localStorage
      localStorage.setItem('mikaelson_calendar_sync_settings', JSON.stringify(syncSettings.value))
    }

    const updateReminderSettings = () => {
      // Save reminder settings to localStorage
      localStorage.setItem('mikaelson_calendar_reminder_settings', JSON.stringify(reminderSettings.value))
    }

    const createInitialReminders = async () => {
      try {
        if (dashboardStore.googleCalendar.service) {
          await dashboardStore.googleCalendar.service.createCheckInReminders({
            reminderTime: reminderSettings.value.time,
            reminderMinutes: [reminderSettings.value.advance]
          })
        }
      } catch (error) {
        console.error('Failed to create initial reminders:', error)
      }
    }

    const formatEventTime = (dateTime) => {
      return new Date(dateTime).toLocaleString()
    }

    const showStatusMessage = (type, icon, text) => {
      statusMessage.value = { type, icon, text }
      setTimeout(() => {
        statusMessage.value = null
      }, 5000)
    }

    // Load saved settings on mount
    onMounted(() => {
      const savedSyncSettings = localStorage.getItem('mikaelson_calendar_sync_settings')
      const savedReminderSettings = localStorage.getItem('mikaelson_calendar_reminder_settings')
      
      if (savedSyncSettings) {
        syncSettings.value = { ...syncSettings.value, ...JSON.parse(savedSyncSettings) }
      }
      
      if (savedReminderSettings) {
        reminderSettings.value = { ...reminderSettings.value, ...JSON.parse(savedReminderSettings) }
      }
    })

    return {
      // State
      isConnecting,
      isSyncing,
      showEventsModal,
      upcomingEvents,
      statusMessage,
      syncSettings,
      reminderSettings,
      
      // Computed
      isConnected,
      lastSync,
      formatLastSync,
      
      // Methods
      connectCalendar,
      disconnectCalendar,
      manualSync,
      viewUpcomingEvents,
      closeEventsModal,
      updateSyncSettings,
      updateReminderSettings,
      formatEventTime
    }
  }
}
</script>

<style scoped>
.google-calendar-integration {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.integration-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.integration-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.integration-title .fab {
  color: #4285f4;
}

.integration-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.integration-status.connected .status-indicator {
  background: #10b981;
}

.description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.benefits-list h4 {
  color: #374151;
  margin: 0 0 12px 0;
  font-size: 1rem;
}

.benefits-list ul {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.benefits-list li {
  padding: 8px 0;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
}

.google-connect-btn {
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.google-connect-btn:hover:not(:disabled) {
  background: #3367d6;
}

.google-connect-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-bottom: 8px;
}

.last-sync {
  color: #6b7280;
  font-size: 0.875rem;
}

.sync-options {
  margin: 24px 0;
}

.sync-options h4,
.sync-options h5 {
  color: #374151;
  margin: 0 0 16px 0;
  font-size: 1rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.option-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.option-label {
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
}

.option-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 24px;
}

.reminder-settings {
  margin-top: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.reminder-time,
.reminder-advance {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
}

.reminder-time input,
.reminder-advance select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
}

.sync-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-outline {
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.events-modal .modal-content {
  max-height: 400px;
  overflow-y: auto;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.event-time {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  min-width: 120px;
}

.event-details h4 {
  margin: 0 0 4px 0;
  color: #374151;
  font-size: 1rem;
}

.event-details p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.empty-events {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.empty-events i {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.status-message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  z-index: 1000;
  min-width: 300px;
}

.status-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.status-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.status-message.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
}

.modal-content {
  padding: 24px;
}
</style>
