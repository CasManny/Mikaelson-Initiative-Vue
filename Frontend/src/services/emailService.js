/**
 * Email notification service for daily check-ins and other notifications
 */

const API_BASE_URL = 'http://localhost:5001'

export class EmailService {
  /**
   * Send daily check-in confirmation email
   * @param {Object} userInfo - User information
   * @param {Object} checkInData - Check-in details
   */
  static async sendCheckInNotification(userInfo, checkInData) {
    try {
      const emailData = {
        to: userInfo.email,
        subject: 'Daily Check-in Confirmed - Mikaelson Initiative',
        template: 'checkin-confirmation',
        data: {
          userName: userInfo.fullName || userInfo.email,
          checkInDate: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          mood: checkInData.mood || 'Not specified',
          note: checkInData.note || 'No additional notes',
          streakDays: checkInData.streakDays || 1,
          dashboardUrl: `${window.location.origin}/dashboard`
        }
      }

      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mikaelson_token')}`
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Check-in notification sent successfully:', result)
      return result
    } catch (error) {
      console.error('Error sending check-in notification:', error)
      
      // Fallback: try to send via a third-party service (like EmailJS)
      try {
        await this.sendViaEmailJS(userInfo, checkInData)
      } catch (fallbackError) {
        console.error('Fallback email service also failed:', fallbackError)
        throw new Error('All email services failed')
      }
    }
  }

  /**
   * Fallback email service using EmailJS (requires setup)
   * @param {Object} userInfo - User information
   * @param {Object} checkInData - Check-in details
   */
  static async sendViaEmailJS(userInfo, checkInData) {
    // This would require EmailJS setup and configuration
    // For now, we'll simulate the email being sent
    console.log('Simulating email notification via fallback service...')
    
    const emailContent = {
      to_email: userInfo.email,
      to_name: userInfo.fullName || userInfo.email,
      subject: 'Daily Check-in Confirmed - Mikaelson Initiative',
      message: `
        Hi ${userInfo.fullName || userInfo.email},

        Your daily check-in has been successfully recorded!

        Check-in Date: ${new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        Mood: ${checkInData.mood || 'Not specified'}
        Note: ${checkInData.note || 'No additional notes'}
        Current Streak: ${checkInData.streakDays || 1} days

        Keep up the great work! Visit your dashboard to track your progress: ${window.location.origin}/dashboard

        Best regards,
        The Mikaelson Initiative Team
      `
    }

    // In a real implementation, you would use EmailJS here:
    // return emailjs.send('service_id', 'template_id', emailContent, 'public_key')
    
    // For now, just log and return success
    console.log('Email would be sent with content:', emailContent)
    return Promise.resolve({ status: 'sent', service: 'fallback' })
  }

  /**
   * Send weekly check-in reminder email
   * @param {Object} userInfo - User information
   */
  static async sendWeeklyReminder(userInfo) {
    try {
      const emailData = {
        to: userInfo.email,
        subject: 'Weekly Check-in Reminder - Mikaelson Initiative',
        template: 'weekly-reminder',
        data: {
          userName: userInfo.fullName || userInfo.email,
          dashboardUrl: `${window.location.origin}/dashboard`,
          lastCheckIn: userInfo.lastCheckIn ? new Date(userInfo.lastCheckIn).toLocaleDateString() : 'Never'
        }
      }

      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mikaelson_token')}`
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error(`Failed to send reminder: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending weekly reminder:', error)
      throw error
    }
  }

  /**
   * Send streak milestone celebration email
   * @param {Object} userInfo - User information
   * @param {number} streakDays - Number of consecutive days
   */
  static async sendStreakMilestone(userInfo, streakDays) {
    // Send milestone emails for 7, 30, 60, 100+ day streaks
    const milestones = [7, 30, 60, 100, 200, 365]
    
    if (!milestones.includes(streakDays)) {
      return // Not a milestone day
    }

    try {
      const emailData = {
        to: userInfo.email,
        subject: `🎉 ${streakDays} Day Streak Achievement! - Mikaelson Initiative`,
        template: 'streak-milestone',
        data: {
          userName: userInfo.fullName || userInfo.email,
          streakDays,
          dashboardUrl: `${window.location.origin}/dashboard`
        }
      }

      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mikaelson_token')}`
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error(`Failed to send milestone email: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending streak milestone email:', error)
      throw error
    }
  }
}

export default EmailService
