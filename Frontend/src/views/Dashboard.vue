<template>
  <div class="dashboard-container">
    <div class="dashboard-layout">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <!-- Logo Section at top of sidebar -->
        <div class="sidebar-header">
          <div class="logo-section">
            <img src="/assets/images/mikaelsonlogo.png" alt="Mikaelson" class="nav-logo" />
            <span class="brand-name">Mikaelson Initiative</span>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Main</div>
            <ul class="nav-list">
              <li class="nav-item active">
                <a href="#" class="nav-link">
                  <i class="fas fa-chart-line nav-icon"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-bullseye nav-icon"></i>
                  <span>Goals</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-tasks nav-icon"></i>
                  <span>Habits</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="scrollToCalendarIntegration">
                  <i class="fas fa-calendar-alt nav-icon"></i>
                  <span>Calendar</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div class="nav-section">
            <div class="nav-section-title">Social</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-users nav-icon"></i>
                  <span>Community</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-trophy nav-icon"></i>
                  <span>Leaderboard</span>
                </a>
              </li>
              <li class="nav-item">
                <router-link to="/challenges" class="nav-link">
                  <i class="fas fa-share-alt nav-icon"></i>
                  <span>Challenges</span>
                </router-link>
              </li>
            </ul>
          </div>
          
          <div class="nav-section">
            <div class="nav-section-title">Insights</div>
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-chart-bar nav-icon"></i>
                  <span>Analytics</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-history nav-icon"></i>
                  <span>History</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Top Navigation Bar -->
      <header class="top-nav">
        <div class="nav-center">
          <div class="search-container">
            <input type="text" placeholder="Search habits, goals, or activities..." class="search-input" />
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        <div class="nav-right">
          <button class="nav-btn notification-btn">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </button>
          <div class="user-menu">
            <div class="user-avatar" @click="toggleUserMenu">
              <span>{{ userInitials }}</span>
            </div>
            <div v-if="showUserMenu" class="user-dropdown">
              <div class="user-info">
                <p class="user-name">{{ authStore.currentUser?.firstName }} {{ authStore.currentUser?.lastName }}</p>
                <p class="user-email">{{ authStore.currentUser?.email }}</p>
              </div>
              <hr />
              <a href="#" class="dropdown-item">
                <i class="fas fa-user"></i>
                Profile Settings
              </a>
              <a href="#" class="dropdown-item">
                <i class="fas fa-cog"></i>
                Preferences
              </a>
              <button class="dropdown-item logout-item" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="content-area">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="welcome-content">
            <div class="welcome-text">
              <h1 class="welcome-title">Welcome back, {{ authStore.currentUser?.firstName }}! 👋</h1>
              <p class="welcome-subtitle">Ready to continue your transformation journey? Let's make today count.</p>
            </div>
            <div class="welcome-actions">
              <button class="btn btn-primary" @click="showAddHabitModal = true">
                <i class="fas fa-plus"></i>
                Add New Habit
              </button>
              <button class="btn btn-secondary">
                <i class="fas fa-chart-line"></i>
                View Progress
              </button>
              <button class="btn btn-success" @click="openCheckInModal">
                <i class="fas fa-check-circle"></i>
                Daily Check-in
              </button>
            </div>
          </div>
        </section>

        <!-- Statistics Dashboard -->
        <section class="stats-dashboard">
          <div class="stats-grid">
            <div class="stat-card primary">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-fire"></i>
                </div>
                <div class="stat-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  <span>+2</span>
                </div>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ dashboardStore.stats.streakDays }}</h3>
                <p class="stat-label">Day Streak</p>
                <div class="stat-description">Keep it going! You're on fire 🔥</div>
              </div>
            </div>

            <div class="stat-card success">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  <span>+5%</span>
                </div>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ dashboardStore.completionRate }}%</h3>
                <p class="stat-label">Completion Rate</p>
                <div class="stat-description">Excellent consistency!</div>
              </div>
            </div>

            <div class="stat-card warning">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-trend positive">
                  <i class="fas fa-arrow-up"></i>
                  <span>+120</span>
                </div>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ totalPoints }}</h3>
                <p class="stat-label">Total Points</p>
                <div class="stat-description">You're climbing the ranks!</div>
              </div>
            </div>

            <div class="stat-card info">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="fas fa-bullseye"></i>
                </div>
                <div class="stat-trend neutral">
                  <i class="fas fa-minus"></i>
                  <span>0</span>
                </div>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ dashboardStore.habits.length }}</h3>
                <p class="stat-label">Active Habits</p>
                <div class="stat-description">Building your routine</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Today's Focus -->
        <section class="todays-focus">
          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-title">Today's Focus</h2>
              <p class="section-subtitle">Complete your daily habits to maintain your streak</p>
            </div>
            <div class="section-actions">
              <button class="btn btn-ghost">
                <i class="fas fa-filter"></i>
                Filter
              </button>
              <button class="btn btn-ghost">
                <i class="fas fa-sort"></i>
                Sort
              </button>
            </div>
          </div>

          <div class="habits-container">
            <div v-if="dashboardStore.habits.length > 0" class="habits-grid">
              <div v-for="habit in dashboardStore.habits" :key="habit.id" class="habit-card">
                <div class="habit-status" :class="{ completed: isCompletedToday(habit) }">
                  <button 
                    class="habit-checkbox" 
                    :class="{ checked: isCompletedToday(habit) }"
                    @click="completeHabit(habit.id)"
                    :disabled="isCompletedToday(habit)"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
                
                <div class="habit-content">
                  <div class="habit-icon-container">
                    <i :class="getHabitIcon(habit)" class="habit-icon"></i>
                  </div>
                  
                  <div class="habit-details">
                    <h4 class="habit-name">{{ habit.name }}</h4>
                    <p class="habit-description">{{ habit.description || 'No description provided' }}</p>
                    
                    <div class="habit-meta">
                      <span class="habit-streak">
                        <i class="fas fa-fire"></i>
                        {{ habit.streak || 0 }} day streak
                      </span>
                      <span class="habit-points">
                        <i class="fas fa-star"></i>
                        +{{ (habit.streak || 0) * 10 }} points
                      </span>
                    </div>
                  </div>
                </div>

                <div class="habit-actions">
                  <button class="habit-action-btn" title="Edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="habit-action-btn" title="Statistics">
                    <i class="fas fa-chart-line"></i>
                  </button>
                  <button class="habit-action-btn" title="More options">
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="empty-icon">
                <i class="fas fa-bullseye"></i>
              </div>
              <h3 class="empty-title">No habits yet</h3>
              <p class="empty-description">Start building positive habits to transform your life. Add your first habit to get started!</p>
              <button class="btn btn-primary" @click="showAddHabitModal = true">
                <i class="fas fa-plus"></i>
                Create Your First Habit
              </button>
            </div>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="quick-actions">
          <h3 class="section-title">Quick Actions</h3>
          <div class="actions-grid">
            <div class="action-card">
              <i class="fas fa-calendar-plus"></i>
              <span>Schedule Habit</span>
            </div>
            <div class="action-card" @click="goToChallenges" role="button" tabindex="0" aria-label="Join Challenge" @keyup.enter="goToChallenges">
              <i class="fas fa-users"></i>
              <span>Join Challenge</span>
            </div>
            <div class="action-card">
              <i class="fas fa-share"></i>
              <span>Share Progress</span>
            </div>
            <div class="action-card">
              <i class="fas fa-book"></i>
              <span>Browse Resources</span>
            </div>
          </div>
        </section>

        <!-- Check-in Calendar -->
        <section class="checkin-calendar">
          <div class="calendar-header">
            <h3 class="section-title">Check-in Calendar</h3>
            <div class="calendar-nav">
              <button class="nav-btn" @click="prevMonth" aria-label="Previous month"><i class="fas fa-chevron-left"></i></button>
              <span class="month-label">{{ monthLabel }}</span>
              <button class="nav-btn" @click="nextMonth" aria-label="Next month"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div class="calendar-grid">
            <div class="weekday" v-for="d in weekdays" :key="`w-${d}`">{{ d }}</div>
            <div 
              v-for="(cell, idx) in calendarCells" 
              :key="`c-${idx}-${cell.date?.toISOString() || idx}`" 
              class="day-cell" 
              :class="{ 'other-month': !cell.inCurrentMonth, today: cell.isToday }"
            >
              <div class="day-number">{{ cell.date ? cell.date.getDate() : '' }}</div>
              <div v-if="cell.date && cell.status" class="status-dot" :class="{ green: cell.status === 'green', red: cell.status === 'red' }"></div>
            </div>
          </div>

          <div class="calendar-legend">
            <span class="legend-item"><span class="legend-dot green"></span> Check-in + all tasks</span>
            <span class="legend-item"><span class="legend-dot red"></span> Missing check-in or tasks</span>
          </div>
        </section>

        <!-- Google Calendar Integration -->
        <div id="google-calendar-section">
          <GoogleCalendarIntegration />
        </div>
      </main>
    </div>

    <!-- Add Habit Modal -->
    <div v-if="showAddHabitModal" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Create New Habit</h3>
          <button class="modal-close" @click="showAddHabitModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="addHabit" class="modal-form">
          <div class="form-group">
            <label for="habitName" class="form-label">Habit Name *</label>
            <input 
              type="text" 
              id="habitName" 
              v-model="newHabit.name" 
              class="form-input"
              placeholder="e.g., Read for 15 minutes"
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="habitDescription" class="form-label">Description</label>
            <textarea 
              id="habitDescription" 
              v-model="newHabit.description" 
              class="form-textarea"
              placeholder="Add a description to help you stay motivated..."
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showAddHabitModal = false">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Daily Check-in Modal -->
    <div v-if="showCheckInModal" class="modal-overlay checkin-modal-overlay" @click="closeCheckInOnOverlay">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Daily Check-in</h3>
          <button class="modal-close" @click="showCheckInModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="confirmCheckIn" class="modal-form">
          <div class="form-group">
            <label for="mood" class="form-label">How do you feel today?</label>
            <select id="mood" v-model="checkIn.mood" class="form-input">
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="tired">Tired</option>
              <option value="stressed">Stressed</option>
            </select>
          </div>
          <div class="form-group">
            <label for="checkinNote" class="form-label">Optional note</label>
            <textarea 
              id="checkinNote" 
              v-model="checkIn.note" 
              class="form-textarea"
              placeholder="Share a quick note..."
              rows="3"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showCheckInModal = false">Cancel</button>
            <button type="submit" class="btn btn-success">
              <i class="fas fa-check-circle"></i>
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import GoogleCalendarIntegration from "@/components/GoogleCalendarIntegration.vue";

export default {
  name: "Dashboard",
  components: {
    GoogleCalendarIntegration
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const dashboardStore = useDashboardStore();
    const showAddHabitModal = ref(false);
    const showUserMenu = ref(false);
    const showCheckInModal = ref(false);

    const newHabit = reactive({
      name: "",
      description: "",
    });

    const checkIn = reactive({
      mood: 'neutral',
      note: ''
    });

    const userInitials = computed(() => {
      const firstName = authStore.currentUser?.firstName || "";
      const lastName = authStore.currentUser?.lastName || "";
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    });

    const totalPoints = computed(() => {
      return dashboardStore.habits.reduce((total, habit) => total + (habit.streak || 0) * 10, 0);
    });

    const isCompletedToday = (habit) => {
      if (!habit.lastCompleted) return false;
      const today = new Date().toDateString();
      return new Date(habit.lastCompleted).toDateString() === today;
    };

    const completeHabit = (habitId) => {
      dashboardStore.completeHabit(habitId);
    };

    const addHabit = () => {
      if (!newHabit.name.trim()) return;
      dashboardStore.addHabit({ ...newHabit });
      newHabit.name = "";
      newHabit.description = "";
      showAddHabitModal.value = false;
    };

    const getHabitIcon = (habit) => {
      // Enhanced icon logic based on habit name
      const name = habit.name.toLowerCase();
      if (name.includes('read') || name.includes('book')) return 'fas fa-book';
      if (name.includes('exercise') || name.includes('workout') || name.includes('gym')) return 'fas fa-dumbbell';
      if (name.includes('water') || name.includes('drink')) return 'fas fa-tint';
      if (name.includes('meditat') || name.includes('mindful')) return 'fas fa-spa';
      if (name.includes('sleep') || name.includes('rest')) return 'fas fa-bed';
      if (name.includes('study') || name.includes('learn')) return 'fas fa-graduation-cap';
      if (name.includes('write') || name.includes('journal')) return 'fas fa-pen';
      if (name.includes('walk') || name.includes('run')) return 'fas fa-walking';
      return 'fas fa-star';
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    const closeModal = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        showAddHabitModal.value = false;
      }
    };

    const logout = () => {
      authStore.logout();
      router.push('/login');
    };

    const goToChallenges = () => {
      router.push('/challenges');
    };

    const openCheckInModal = () => {
      showCheckInModal.value = true;
    };

    const confirmCheckIn = async () => {
      try {
        const success = await dashboardStore.dailyCheckIn({ mood: checkIn.mood, note: checkIn.note })
        showCheckInModal.value = false;
        
        // Reset form
        checkIn.mood = 'neutral';
        checkIn.note = '';
        
        if (success) {
          const streakDays = dashboardStore.stats.streakDays;
          let message = `Checked in for today! Streak: ${streakDays} days`;
          
          // Add email notification confirmation
          if (authStore.currentUser && authStore.currentUser.email) {
            message += `\n\nA confirmation email has been sent to ${authStore.currentUser.email}`;
            
            // Check for milestone achievements
            if ([7, 30, 60, 100, 200, 365].includes(streakDays)) {
              message += `\n🎉 Congratulations on your ${streakDays}-day streak milestone! You'll receive a special celebration email.`;
            }
          }
          
          alert(message);
        } else {
          alert('You already checked in today.');
        }
      } catch (error) {
        console.error('Error during check-in:', error);
        alert('Check-in completed, but there was an issue with the email notification. Please check your email settings.');
      }
    };

    const closeCheckInOnOverlay = (event) => {
      if (event.target.classList && event.target.classList.contains('checkin-modal-overlay')) {
        showCheckInModal.value = false;
      }
    };

    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        showUserMenu.value = false;
      }
    };

    // Check-in Calendar state
    const viewYear = ref(new Date().getFullYear());
    const viewMonth = ref(new Date().getMonth()); // 0-11

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthLabel = computed(() => {
      const d = new Date(viewYear.value, viewMonth.value, 1)
      return d.toLocaleString(undefined, { month: 'long', year: 'numeric' })
    })

    const startOfMonth = (y, m) => new Date(y, m, 1)
    const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()

    const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

    const hasCheckInOn = (date) => {
      return dashboardStore.activityLog.some(l => l.type === 'checkin' && isSameDay(new Date(l.completedAt), date))
    }

    const allHabitsCompletedOn = (date) => {
      const habits = dashboardStore.habits
      if (!habits || habits.length === 0) return false
      return habits.every(h => dashboardStore.activityLog.some(l => l.type === 'completion' && l.habitId === h.id && isSameDay(new Date(l.completedAt), date)))
    }

    // NEW: did the user complete at least one habit this day?
    const anyHabitCompletedOn = (date) => {
      return dashboardStore.activityLog.some(l => l.type === 'completion' && isSameDay(new Date(l.completedAt), date))
    }

    const calendarCells = computed(() => {
      const y = viewYear.value
      const m = viewMonth.value
      const first = startOfMonth(y, m)
      const total = daysInMonth(y, m)
      const firstWeekday = first.getDay() // 0=Sun

      const cells = []
      // Leading empty cells
      for (let i = 0; i < firstWeekday; i++) cells.push({ inCurrentMonth: false, date: null })
      // Month days
      for (let d = 1; d <= total; d++) {
        const date = new Date(y, m, d)
        const inPastOrToday = date <= new Date()
        let status = null
        if (inPastOrToday) {
          const checked = hasCheckInOn(date)
          const allDone = allHabitsCompletedOn(date)
          const anyDone = checked || anyHabitCompletedOn(date)
          if (checked && allDone) status = 'green'
          else status = 'red' // mark red for partial or no activity
        }
        cells.push({
          inCurrentMonth: true,
          date,
          isToday: isSameDay(date, new Date()),
          status
        })
      }
      // Trailing to complete 6 rows x 7 cols (optional)
      const remainder = cells.length % 7
      if (remainder !== 0) {
        for (let i = 0; i < 7 - remainder; i++) cells.push({ inCurrentMonth: false, date: null })
      }
      return cells
    })

    // Add missing month navigation handlers
    const prevMonth = () => {
      if (viewMonth.value === 0) {
        viewMonth.value = 11
        viewYear.value -= 1
      } else {
        viewMonth.value -= 1
      }
    }

    const nextMonth = () => {
      if (viewMonth.value === 11) {
        viewMonth.value = 0
        viewYear.value += 1
      } else {
        viewMonth.value += 1
      }
    }

    // Scroll to Google Calendar Integration section
    const scrollToCalendarIntegration = () => {
      const calendarSection = document.getElementById('google-calendar-section')
      if (calendarSection) {
        calendarSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
        
        // Add a temporary highlight effect to the calendar section
        calendarSection.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out'
        calendarSection.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.3)'
        calendarSection.style.transform = 'scale(1.02)'
        
        setTimeout(() => {
          calendarSection.style.boxShadow = ''
          calendarSection.style.transform = 'scale(1)'
        }, 2000)
      }
    }

    onMounted(() => {
      // Preview-friendly: allow dashboard without auth
      if (authStore.isLoggedIn) {
        authStore.initAuth();
      }
      dashboardStore.initDashboard();
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      authStore,
      dashboardStore,
      showAddHabitModal,
      showUserMenu,
      showCheckInModal,
      newHabit,
      checkIn,
      userInitials,
      totalPoints,
      isCompletedToday,
      completeHabit,
      addHabit,
      getHabitIcon,
      toggleUserMenu,
      closeModal,
      logout,
      goToChallenges,
      openCheckInModal,
      confirmCheckIn,
      closeCheckInOnOverlay,
      // Calendar
      weekdays,
      monthLabel,
      calendarCells,
      prevMonth,
      nextMonth,
      scrollToCalendarIntegration,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/dashboard.css';

/* Check-in Calendar */
.checkin-calendar { margin-top: 2rem; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.calendar-nav { display: flex; align-items: center; gap: 0.75rem; }
.month-label { font-weight: 700; color: #111827; }
.nav-btn { background: #f3f4f6; border: none; padding: 0.4rem 0.6rem; border-radius: 8px; cursor: pointer; }
.nav-btn:hover { background: #e5e7eb; }

.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; }
.weekday { text-align: center; font-size: 0.8rem; color: #6b7280; font-weight: 600; padding: 4px 0; }
.day-cell { min-height: 58px; border-radius: 10px; background: #f9fafb; position: relative; padding: 6px; display: flex; align-items: flex-start; justify-content: flex-end; }
.day-cell.other-month { background: #f3f4f6; opacity: 0.6; }
.day-cell.today { outline: 2px solid #20c9c0; }
.day-number { font-size: 0.85rem; color: #111827; font-weight: 600; }
.status-dot { position: absolute; left: 6px; bottom: 6px; width: 10px; height: 10px; border-radius: 50%; }
.status-dot.green { background: #10b981; }
.status-dot.red { background: #ef4444; }

.calendar-legend { display: flex; gap: 1rem; margin-top: 0.5rem; color: #6b7280; font-size: 0.875rem; }
.legend-item { display: inline-flex; align-items: center; gap: 6px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.legend-dot.green { background: #10b981; }
.legend-dot.red { background: #ef4444; }

/* Calendar navigation button enhancement */
.nav-link:has(.fa-calendar-alt) {
  transition: all 0.2s ease-in-out;
}

.nav-link:has(.fa-calendar-alt):hover {
  background: rgba(66, 133, 244, 0.1);
  color: #4285f4;
}

.nav-link:has(.fa-calendar-alt):active {
  transform: translateY(1px);
  background: rgba(66, 133, 244, 0.2);
}

/* Google Calendar section highlighting */
#google-calendar-section {
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 12px;
}
</style>
