<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Welcome Section -->
      <section class="welcome-section">
        <div class="container">
          <div class="welcome-header">
            <div class="welcome-text">
              <h1 class="welcome-title">
                Welcome back,
                <span>{{ authStore.currentUser?.firstName || "Member" }}</span
                >!
              </h1>
              <p class="welcome-subtitle">
                Ready to build better habits and achieve your goals today?
              </p>
            </div>
            <div class="welcome-stats">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-fire"></i>
                </div>
                <div class="stat-info">
                  <h3>{{ dashboardStore.stats.streakDays }}</h3>
                  <p>Day Streak</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-info">
                  <h3>{{ totalPoints }}</h3>
                  <p>Total Points</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-info">
                  <h3>{{ dashboardStore.completionRate }}%</h3>
                  <p>Completion Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions-section">
        <div class="container">
          <h2 class="section-title">Quick Actions</h2>
          <div class="action-grid">
            <div class="action-card">
              <div class="action-icon">
                <i class="fas fa-plus"></i>
              </div>
              <h3>Add New Habit</h3>
              <p>Start tracking a new habit today</p>
              <button class="action-button" @click="showAddHabitModal = true">
                Create Habit
              </button>
            </div>
            <div class="action-card">
              <div class="action-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Log Today's Progress</h3>
              <p>Mark your habits as complete</p>
              <button class="action-button" @click="scrollToHabits">
                Log Progress
              </button>
            </div>
            <div class="action-card">
              <div class="action-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Find Accountability Partner</h3>
              <p>Connect with someone who shares your goals</p>
              <button class="action-button">Find Partner</button>
            </div>
            <div class="action-card">
              <div class="action-icon">
                <i class="fas fa-calendar"></i>
              </div>
              <h3>Join Challenge</h3>
              <p>Participate in community challenges</p>
              <button class="action-button">View Challenges</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Today's Habits -->
      <section class="habits-section" ref="habitsSection">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Today's Habits</h2>
            <button class="add-habit-btn" @click="showAddHabitModal = true">
              <i class="fas fa-plus"></i>
              Add Habit
            </button>
          </div>

          <div class="habits-grid">
            <!-- Habit Cards -->
            <div
              v-for="habit in dashboardStore.habits"
              :key="habit.id"
              class="habit-card"
            >
              <div class="habit-header">
                <div class="habit-info">
                  <h3>{{ habit.name }}</h3>
                  <p>{{ habit.description }}</p>
                </div>
                <div :class="['habit-status', getHabitStatus(habit)]">
                  <i :class="getHabitStatusIcon(habit)"></i>
                </div>
              </div>
              <div class="habit-progress">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: getHabitProgress(habit) + '%' }"
                  ></div>
                </div>
                <span class="progress-text"
                  >{{ habit.streak || 0 }} day streak</span
                >
              </div>
              <div class="habit-actions">
                <button
                  v-if="!isCompletedToday(habit)"
                  class="habit-btn complete"
                  @click="completeHabit(habit.id)"
                >
                  <i class="fas fa-check"></i>
                  Complete
                </button>
                <button v-else class="habit-btn completed" disabled>
                  <i class="fas fa-check"></i>
                  Completed
                </button>
                <button v-if="!isCompletedToday(habit)" class="habit-btn skip">
                  <i class="fas fa-times"></i>
                  Skip
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="dashboardStore.habits.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="fas fa-plus-circle"></i>
              </div>
              <h3>No habits yet</h3>
              <p>Start building better habits by adding your first one!</p>
              <button
                class="cta-button primary"
                @click="showAddHabitModal = true"
              >
                Add Your First Habit
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Leaderboard -->
      <section class="leaderboard-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Community Leaderboard</h2>
            <router-link :to="{ name: 'Community', hash: '#leaderboard' }" class="view-all-link">
              View Full Leaderboard
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>

          <div class="leaderboard-preview">
            <div class="leaderboard-list">
              <div class="leaderboard-item current-user">
                <div class="rank">You</div>
                <div class="user-info">
                  <div class="user-avatar">
                    <span>{{ userInitials }}</span>
                  </div>
                  <div class="user-details">
                    <h4>{{ authStore.currentUser?.name || "Your Name" }}</h4>
                    <p>
                      Rank #<span>{{ userRank }}</span>
                    </p>
                  </div>
                </div>
                <div class="points">{{ totalPoints }} pts</div>
              </div>

              <div
                v-for="(user, index) in topUsers"
                :key="user.id"
                class="leaderboard-item"
              >
                <div class="rank">{{ index + 1 }}</div>
                <div class="user-info">
                  <div class="user-avatar">{{ user.initials }}</div>
                  <div class="user-details">
                    <h4>{{ user.name }}</h4>
                    <p>{{ user.location }}</p>
                  </div>
                </div>
                <div class="points">{{ user.points }} pts</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Add Habit Modal -->
    <div v-if="showAddHabitModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Habit</h3>
          <button class="close-btn" @click="showAddHabitModal = false">
            &times;
          </button>
        </div>
        <form @submit.prevent="addHabit">
          <div class="form-group">
            <label for="habitName">Habit Name</label>
            <input
              type="text"
              id="habitName"
              v-model="newHabit.name"
              required
              placeholder="e.g., Morning Exercise"
            />
          </div>
          <div class="form-group">
            <label for="habitDescription">Description</label>
            <input
              type="text"
              id="habitDescription"
              v-model="newHabit.description"
              placeholder="e.g., 30 minutes of physical activity"
            />
          </div>
          <div class="form-group">
            <label for="habitFrequency">Frequency</label>
            <select id="habitFrequency" v-model="newHabit.frequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="weekdays">Weekdays Only</option>
            </select>
          </div>
          <div class="modal-actions">
            <button
              type="button"
              class="modal-button secondary"
              @click="showAddHabitModal = false"
            >
              Cancel
            </button>
            <button type="submit" class="modal-button primary">
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const dashboardStore = useDashboardStore();

    const showAddHabitModal = ref(false);
    const habitsSection = ref(null);

    const newHabit = reactive({
      name: "",
      description: "",
      frequency: "daily",
    });

    const topUsers = ref([
      {
        id: 1,
        name: "Amara Okafor",
        initials: "AO",
        location: "Lagos, Nigeria",
        points: 1250,
      },
      {
        id: 2,
        name: "Kwame Asante",
        initials: "KA",
        location: "Accra, Ghana",
        points: 1180,
      },
      {
        id: 3,
        name: "Zara Kimani",
        initials: "ZK",
        location: "Nairobi, Kenya",
        points: 1095,
      },
    ]);

    const userInitials = computed(() => {
      if (!authStore.currentUser) return "U";
      const name =
        authStore.currentUser.name || authStore.currentUser.email || "User";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    });

    const totalPoints = computed(() => {
      return dashboardStore.habits.reduce(
        (total, habit) => total + (habit.streak || 0) * 10,
        0
      );
    });

    const userRank = computed(() => {
      return Math.floor(Math.random() * 50) + 10; // Random rank for demo
    });

    const getHabitStatus = (habit) => {
      return isCompletedToday(habit) ? "completed" : "pending";
    };

    const getHabitStatusIcon = (habit) => {
      return isCompletedToday(habit) ? "fas fa-check" : "fas fa-clock";
    };

    const getHabitProgress = (habit) => {
      const streak = habit.streak || 0;
      return Math.min((streak / 30) * 100, 100); // Progress based on 30-day goal
    };

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

      dashboardStore.addHabit({
        name: newHabit.name,
        description: newHabit.description,
        frequency: newHabit.frequency,
      });

      // Reset form
      newHabit.name = "";
      newHabit.description = "";
      newHabit.frequency = "daily";
      showAddHabitModal.value = false;
    };

    const scrollToHabits = () => {
      if (habitsSection.value) {
        habitsSection.value.scrollIntoView({ behavior: "smooth" });
      }
    };

    onMounted(() => {
      // Check authentication
      if (!authStore.isLoggedIn) {
        router.push("/login");
        return;
      }

      // Initialize stores
      authStore.initAuth();
      dashboardStore.initDashboard();
    });

    return {
      authStore,
      dashboardStore,
      showAddHabitModal,
      habitsSection,
      newHabit,
      topUsers,
      userInitials,
      totalPoints,
      userRank,
      getHabitStatus,
      getHabitStatusIcon,
      getHabitProgress,
      isCompletedToday,
      completeHabit,
      addHabit,
      scrollToHabits,
    };
  },
};
</script>

<style scoped>
/* Component-specific styles if needed */
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}
</style>
