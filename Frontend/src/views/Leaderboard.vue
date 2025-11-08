<template>
  <div>
    <Navbar />

    <main class="main-content">
      <section class="leaderboard-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Live Rankings</span>
            <h2 class="section-title">Community Leaderboard</h2>
            <p class="section-subtitle">See who's leading the transformation journey this week</p>
          </div>

          <!-- Leaderboard Filters -->
          <div class="leaderboard-filters">
            <button
              v-for="filter in leaderboardFilters"
              :key="filter.id"
              :class="['filter-btn', { active: activeFilter === filter.id }]"
              @click="setActiveFilter(filter.id)">
              <i :class="filter.icon"></i>
              {{ filter.name }}
            </button>
          </div>

          <!-- Extended Leaderboard -->
          <div class="extended-leaderboard">
            <div class="leaderboard-header">
              <h3>Top Performers</h3>
              <span class="live-indicator"><i class="fas fa-circle"></i> Live Updates</span>
            </div>

            <div class="leaderboard-list">
              <div v-for="(member, index) in extendedLeaderboard" :key="member.id" class="leaderboard-item">
                <div class="rank">{{ index + 4 }}</div>
                <div class="member-profile">
                  <img :src="member.avatar" class="avatar" />
                  <div class="member-details">
                    <h5>{{ member.name }}</h5>
                    <p>{{ member.country }} • {{ member.joinedDays }} days active</p>
                  </div>
                </div>
                <div class="member-metrics">
                  <div class="metric">
                    <span class="metric-value">{{ member.points }}</span>
                    <span class="metric-label">Points</span>
                  </div>
                  <div class="metric">
                    <span class="metric-value">{{ member.streak }}</span>
                    <span class="metric-label">Streak</span>
                  </div>
                  <div class="metric">
                    <span class="metric-value">{{ member.habits }}</span>
                    <span class="metric-label">Habits</span>
                  </div>
                </div>
                <div class="member-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: (member.points / 3000) * 100 + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LeaderboardPage',
  components: { Navbar, Footer },
  setup() {
    const activeFilter = ref('overall')

    const leaderboardFilters = ref([
      { id: 'overall', name: 'Overall', icon: 'fas fa-crown' },
      { id: 'weekly', name: 'Weekly Top 10', icon: 'fas fa-calendar-week' },
      { id: 'consistent', name: 'Most Consistent', icon: 'fas fa-fire' },
      { id: 'rising', name: 'Rising Members', icon: 'fas fa-arrow-up' }
    ])

    const extendedLeaderboard = ref([
      { id: 4, name: 'David Mensah', country: 'Ghana 🇬🇭', avatar: '/api/placeholder/50/50', points: 2198, streak: 65, habits: 8, joinedDays: 156 },
      { id: 5, name: 'Fatima Hassan', country: 'Morocco 🇲🇦', avatar: '/api/placeholder/50/50', points: 2067, streak: 52, habits: 6, joinedDays: 134 },
      { id: 6, name: 'Tendai Mukoko', country: 'Zimbabwe 🇿🇼', avatar: '/api/placeholder/50/50', points: 1943, streak: 48, habits: 7, joinedDays: 112 },
      { id: 7, name: 'Aaliyah Diop', country: 'Senegal 🇸🇳', avatar: '/api/placeholder/50/50', points: 1876, streak: 43, habits: 5, joinedDays: 98 }
    ])

    const setActiveFilter = (id) => {
      activeFilter.value = id
      // Could fetch filtered data here (API call)
    }

    return { leaderboardFilters, extendedLeaderboard, activeFilter, setActiveFilter }
  }
}
</script>

<style scoped>
@import '@/assets/css/community.css';

/* Small overrides to ensure full-width layout matches Community */
.main-content { margin-top: 80px; }
.leaderboard-section { padding-top: 3rem; padding-bottom: 4rem; }

</style>
