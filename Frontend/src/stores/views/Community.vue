<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section v-if="!isAuthenticated" class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Transform Your Life Through
              <span class="gradient-text">Community & Growth</span>
            </h1>
            <p class="hero-description">
              Connect with like-minded individuals across Africa, track your
              progress, and achieve your goals together. Experience the power of
              accountability and shared success.
            </p>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number"
                    >{{ formatNumber(liveStats.activeMembers) }}+</span
                  >
                  <span class="stat-label">Active Members</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-fire"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number"
                    >{{ formatNumber(liveStats.totalStreaks) }}+</span
                  >
                  <span class="stat-label">Daily Streaks</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-globe-africa"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number"
                    >{{ liveStats.countriesReached }}+</span
                  >
                  <span class="stat-label">Countries</span>
                </div>
              </div>
            </div>
            <div class="hero-buttons">
              <router-link to="/signup" class="mikaelson-button community-btn">
                <span class="button-text">Start Your Journey</span>
                <span class="button-icon">
                  <i class="fas fa-arrow-right"></i>
                </span>
              </router-link>
              <router-link to="/login" class="mikaelson-button labs-btn">
                <span class="button-text">Sign In</span>
                <span class="button-icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="/assets/images/IMG_3412 2.jpg" alt="Community Hero" />
          </div>
        </div>
      </section>

      <!-- Features Overview -->
      <section class="features-overview">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Why Choose Us</span>
            <h2 class="section-title">Everything You Need to Succeed</h2>
            <p class="section-subtitle">
              Powerful tools and supportive community to accelerate your
              personal growth
            </p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>Progress Tracking</h3>
              <p>
                Monitor your daily habits and see real-time progress with
                detailed analytics and insights.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Community Support</h3>
              <p>
                Connect with accountability partners and join group challenges
                to stay motivated.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <h3>Achievements</h3>
              <p>
                Earn badges, climb leaderboards, and celebrate milestones with
                recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Leaderboard -->
      <section id="leaderboard" class="leaderboard-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Live Rankings</span>
            <h2 class="section-title">Community Leaderboard</h2>
            <p class="section-subtitle">
              See who's leading the transformation journey this week
            </p>
          </div>

          <!-- Leaderboard Filters -->
          <div class="leaderboard-filters">
            <button
              v-for="filter in leaderboardFilters"
              :key="filter.id"
              :class="['filter-btn', { active: activeFilter === filter.id }]"
              @click="setActiveFilter(filter.id)"
            >
              <i :class="filter.icon"></i>
              {{ filter.name }}
            </button>
          </div>

          <!-- Extended Leaderboard -->
          <div class="extended-leaderboard">
            <div class="leaderboard-header">
              <h3>Top Performers</h3>
              <span class="live-indicator">
                <i class="fas fa-circle"></i>
                Live Updates
              </span>
            </div>
            <div class="leaderboard-list">
              <div
                v-for="(member, index) in extendedLeaderboard"
                :key="member.id"
                class="leaderboard-item"
              >
                <div class="rank">{{ index + 4 }}</div>
                <div class="member-profile">
                  <img :src="member.avatar" class="avatar" />
                  <div class="member-details">
                    <h5>{{ member.name }}</h5>
                    <p>
                      {{ member.country }} • {{ member.joinedDays }} days active
                    </p>
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
                    <div
                      class="progress-fill"
                      :style="{ width: (member.points / 3000) * 100 + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Community Impact Features -->
      <section class="impact-features">
        <div class="container">
          <h2 class="section-title">Community Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-target"></i>
              </div>
              <h3>Progress Tracking</h3>
              <p>
                Monitor your daily habits and see real-time progress. Track
                streaks, milestones, and celebrate achievements with the
                community.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <h3>Leaderboards</h3>
              <p>
                Compete in a friendly environment with community leaderboards.
                Earn points, climb ranks, and motivate others through your
                consistency.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Accountability Partners</h3>
              <p>
                Connect with like-minded individuals who share your goals.
                Support each other and stay motivated on your growth journey.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>Analytics Dashboard</h3>
              <p>
                Get detailed insights into your habits and progress patterns.
                Understand your performance and optimize for better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      <!-- Monthly Challenge Section -->
      <section class="monthly-challenge-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Monthly Challenge</span>
            <h2 class="section-title">{{ currentChallenge.title }}</h2>
            <p class="section-subtitle">
              {{ currentChallenge.description }}
            </p>
          </div>

          <div class="challenge-content">
            <!-- Challenge Overview Card -->
            <div class="challenge-overview">
              <div class="challenge-banner">
                <div class="challenge-icon">
                  <i :class="currentChallenge.icon"></i>
                </div>
                <div class="challenge-details">
                  <h3>{{ currentChallenge.name }}</h3>
                  <p class="challenge-theme">{{ currentChallenge.theme }}</p>
                  <div class="challenge-dates">
                    <span class="date-range">
                      {{ formatDate(currentChallenge.startDate) }} - {{ formatDate(currentChallenge.endDate) }}
                    </span>
                    <span class="days-left">
                      <i class="fas fa-clock"></i>
                      {{ currentChallenge.daysLeft }} days left
                    </span>
                  </div>
                </div>
                <div class="challenge-progress-ring">
                  <svg class="progress-ring" width="80" height="80">
                    <circle
                      class="progress-ring-background"
                      stroke="#e9ecef"
                      stroke-width="6"
                      fill="transparent"
                      r="34"
                      cx="40"
                      cy="40"
                    />
                    <circle
                      class="progress-ring-progress"
                      stroke="#28a745"
                      stroke-width="6"
                      fill="transparent"
                      r="34"
                      cx="40"
                      cy="40"
                      :stroke-dasharray="213.628"
                      :stroke-dashoffset="213.628 - (213.628 * currentChallenge.progressPercentage) / 100"
                    />
                  </svg>
                  <div class="progress-text">
                    <span class="percentage">{{ currentChallenge.progressPercentage }}%</span>
                    <span class="label">Complete</span>
                  </div>
                </div>
              </div>

              <div class="challenge-stats">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-number">{{ formatNumber(currentChallenge.participants) }}</span>
                    <span class="stat-label">Participants</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-number">{{ currentChallenge.totalRewards }}</span>
                    <span class="stat-label">Total Rewards</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-fire"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-number">{{ currentChallenge.completionRate }}%</span>
                    <span class="stat-label">Success Rate</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-number">{{ formatNumber(currentChallenge.pointsAwarded) }}</span>
                    <span class="stat-label">Points Earned</span>
                  </div>
                </div>
              </div>
            </div>

            

            <!-- Top Performers -->
            <div class="challenge-leaderboard">
              <h4>Challenge Leaders</h4>
              <div class="challenge-podium">
                <div
                  v-for="(leader, index) in currentChallenge.topPerformers.slice(0, 3)"
                  :key="leader.id"
                  :class="['podium-member', `position-${index + 1}`]"
                >
                  <div class="position-badge">{{ index + 1 }}</div>
                  <img :src="leader.avatar" class="leader-avatar" />
                  <h5>{{ leader.name }}</h5>
                  <p>{{ leader.country }}</p>
                  <div class="leader-score">
                    <span class="score">{{ leader.challengePoints }}</span>
                    <span class="label">points</span>
                  </div>
                  <div class="leader-achievement">
                    <i :class="leader.badge.icon"></i>
                    <span>{{ leader.badge.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Transformations -->
      <section class="transformations-section">
        <div class="container">
          <h2 class="section-title">Recent Transformations</h2>
          <div class="transformations-feed">
            <div
              v-for="transformation in recentTransformations"
              :key="transformation.id"
              class="transformation-item"
            >
              <div class="transformation-avatar">
                <img :src="transformation.avatar" />
                <div class="achievement-badge">
                  <i :class="transformation.achievementIcon"></i>
                </div>
              </div>
              <div class="transformation-content">
                <div class="transformation-header">
                  <h4>{{ transformation.userName }}</h4>
                  <span class="country-flag">{{
                    transformation.countryFlag
                  }}</span>
                  <span class="transformation-time">{{
                    transformation.timeAgo
                  }}</span>
                </div>
                <p class="transformation-action">{{ transformation.action }}</p>
                <div class="transformation-metrics">
                  <span class="metric">
                    <i class="fas fa-fire"></i>
                    {{ transformation.streak }} day streak
                  </span>
                  <span class="metric">
                    <i class="fas fa-star"></i>
                    {{ transformation.points }} points earned
                  </span>
                </div>
                <div class="transformation-tags">
                  <span
                    v-for="tag in transformation.tags"
                    :key="tag"
                    class="tag"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <div class="celebration-reactions">
                <button class="reaction-btn">
                  <i class="fas fa-fire"></i>
                  {{ transformation.reactions.fire }}
                </button>
                <button class="reaction-btn">
                  <i class="fas fa-heart"></i>
                  {{ transformation.reactions.heart }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Chapters -->
      <section class="community-chapters">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Our Global Network</span>
            <h2 class="section-title">Community Chapters</h2>
            <p class="section-subtitle">
              Connecting minds and hearts across institutions and continents
            </p>
          </div>

          <!-- Total Members Stats -->
          <div class="total-members-banner">
            <div class="banner-content">
              <div class="members-stat">
                <div class="stat-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number">{{ formatNumber(totalCommunityMembers) }}</span>
                  <span class="stat-label">Total Community Members Worldwide</span>
                </div>
              </div>
              <div class="global-reach">
                <div class="reach-icon">
                  <i class="fas fa-globe-africa"></i>
                </div>
                <span class="reach-text">United in Growth, Connected by Purpose</span>
              </div>
            </div>
            <div class="banner-decoration">
              <div class="floating-element element-1">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="floating-element element-2">
                <i class="fas fa-rocket"></i>
              </div>
              <div class="floating-element element-3">
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>

          <!-- Chapter Categories -->
          <div class="chapter-categories">
            <h3 class="categories-title">Explore Our Chapters by Region</h3>
            <div class="categories-grid small">
              <button
                v-for="group in regionList"
                :key="group.key"
                class="category-card small"
                :aria-pressed="selectedRegionKey === group.key"
                type="button"
                @click="selectRegion(group.key)"
              >
                <div class="category-header">
                  <h4>{{ group.name }}</h4>
                </div>
                <p class="category-count">{{ group.chapterCount }} {{ group.chapterCount === 1 ? 'Chapter' : 'Chapters' }}</p>
                <div class="category-stats">
                  <span>{{ formatNumber(group.members) }} Members</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Region Results -->
          <div v-if="selectedRegionGroup && selectedRegionGroup.chapters && selectedRegionGroup.chapters.length" ref="resultsRef">
            <h3 class="region-title">{{ selectedRegionGroup.name }} Communities</h3>
            <ul class="community-list">
              <li v-for="chapter in selectedRegionGroup.chapters.slice().sort((a,b)=>a.name.localeCompare(b.name))" :key="chapter.id">
                <router-link
                  class="community-link"
                  :to="{ name: 'ChapterDetail', params: { id: chapter.id }, state: { chapter } }"
                >
                  <span class="flag">{{ chapter.flag }}</span>
                  <span class="name">{{ chapter.name }}</span>
                  <span class="meta">• {{ chapter.location }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Community Growth Stats -->
          <div class="community-growth-stats">
            <div class="growth-header">
              <h3>Community Growth</h3>
              <p>Our chapters are growing stronger every day</p>
            </div>
            <div class="growth-metrics">
              <div class="growth-metric">
                <div class="metric-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="metric-content">
                  <span class="metric-number">+{{ Math.floor(totalCommunityMembers * 0.08) }}</span>
                  <span class="metric-label">New Members This Month</span>
                </div>
              </div>
              <div class="growth-metric">
                <div class="metric-icon">
                  <i class="fas fa-globe"></i>
                </div>
                <div class="metric-content">
                  <span class="metric-number">{{ communityChapters.length }}</span>
                  <span class="metric-label">Active Chapters</span>
                </div>
              </div>
              <div class="growth-metric">
                <div class="metric-icon">
                  <i class="fas fa-fire"></i>
                </div>
                <div class="metric-content">
                  <span class="metric-number">{{ Math.round(communityChapters.reduce((sum, chapter) => sum + chapter.totalPoints, 0) / 1000) }}K+</span>
                  <span class="metric-label">Collective Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="community-cta">
        <div class="container">
          <div class="cta-content">
            <div class="cta-icon">
              <i class="fas fa-crown"></i>
            </div>
            <h2>Ready to Join Our Community?</h2>
            <p>
              Start tracking your habits, connect with others, and transform
              your daily routine into lasting positive change. Join thousands of
              members already on their journey.
            </p>
            <div class="cta-buttons">
              <a href="/signup" class="cta-button primary large"
                >Start Your Journey</a
              >
              <a href="/about" class="cta-button secondary large">Learn More</a>
            </div>
            <div class="cta-testimonial">
              <p>
                "This platform has completely changed how I approach my daily
                habits. The community support is incredible."
              </p>
              <cite>— Sarah M., Community Member</cite>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import "@/assets/css/community.css";

import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

export default {
  name: "CommunityView",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    // Auth store
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);

    // Reactive data
    const activeFilter = ref("overall");
    const liveStats = ref({
      activeMembers: 3247,
      totalStreaks: 18653,
      countriesReached: 52,
    });

    // Daily motivational quote that refreshes
    const dailyQuote = ref({
      text: "Excellence is not a destination, it is a continuous journey that never ends.",
      author: "African Proverb",
    });

    // Leaderboard filters
    const leaderboardFilters = ref([
      { id: "overall", name: "Overall", icon: "fas fa-crown" },
      { id: "weekly", name: "Weekly Top 10", icon: "fas fa-calendar-week" },
      { id: "consistent", name: "Most Consistent", icon: "fas fa-fire" },
      { id: "rising", name: "Rising Members", icon: "fas fa-arrow-up" },
    ]);

    // Top 3 members for podium
    const topMembers = ref([
      {
        id: 1,
        name: "Kwame Asante",
        country: "Ghana 🇬🇭",
        avatar: "/api/placeholder/80/80",
        points: 2847,
        streak: 127,
        badges: ["Consistency King", "Habit Master"],
      },
      {
        id: 2,
        name: "Amara Okafor",
        country: "Nigeria 🇳🇬",
        avatar: "/api/placeholder/80/80",
        points: 2654,
        streak: 89,
        badges: ["Rising Star"],
      },
      {
        id: 3,
        name: "Zara Kimani",
        country: "Kenya 🇰🇪",
        avatar: "/api/placeholder/80/80",
        points: 2341,
        streak: 76,
        badges: ["Transformer"],
      },
    ]);

    // Extended leaderboard (positions 4-10)
    const extendedLeaderboard = ref([
      {
        id: 4,
        name: "David Mensah",
        country: "Ghana 🇬🇭",
        avatar: "/api/placeholder/50/50",
        points: 2198,
        streak: 65,
        habits: 8,
        joinedDays: 156,
        badges: ["Disciplined", "Focused"],
      },
      {
        id: 5,
        name: "Fatima Hassan",
        country: "Morocco 🇲🇦",
        avatar: "/api/placeholder/50/50",
        points: 2067,
        streak: 52,
        habits: 6,
        joinedDays: 134,
        badges: ["Persistent"],
      },
      {
        id: 6,
        name: "Tendai Mukoko",
        country: "Zimbabwe 🇿🇼",
        avatar: "/api/placeholder/50/50",
        points: 1943,
        streak: 48,
        habits: 7,
        joinedDays: 112,
        badges: ["Steady Climber"],
      },
      {
        id: 7,
        name: "Aaliyah Diop",
        country: "Senegal 🇸🇳",
        avatar: "/api/placeholder/50/50",
        points: 1876,
        streak: 43,
        habits: 5,
        joinedDays: 98,
        badges: ["Committed"],
      },
    ]);

    

    // Current monthly challenge data
    const currentChallenge = ref({
      title: "Transform Your August",
      description: "Push your limits this month with our comprehensive wellness challenge designed to elevate your mind, body, and spirit.",
      name: "30-Day Wellness Revolution",
      theme: "Mind, Body & Spirit Transformation",
      icon: "fas fa-fire",
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-08-31'),
      daysLeft: 28,
      progressPercentage: 9, // Based on days passed
      participants: 4287,
      totalRewards: "50K+",
      completionRate: 73,
      pointsAwarded: 125000,
      goals: [
        {
          id: 1,
          title: "Daily Movement",
          description: "Complete 30 minutes of physical activity every day",
          icon: "fas fa-running",
          progress: 85,
          completed: false,
          reward: 500
        },
        {
          id: 2,
          title: "Mindful Mornings",
          description: "Start each day with 10 minutes of meditation or reflection",
          icon: "fas fa-om",
          progress: 92,
          completed: false,
          reward: 400
        },
        {
          id: 3,
          title: "Hydration Hero",
          description: "Drink at least 8 glasses of water daily",
          icon: "fas fa-tint",
          progress: 100,
          completed: true,
          reward: 300
        },
        {
          id: 4,
          title: "Learning Streak",
          description: "Read or learn something new for 20 minutes daily",
          icon: "fas fa-book",
          progress: 67,
          completed: false,
          reward: 450
        },
        {
          id: 5,
          title: "Digital Detox",
          description: "Practice 1 hour of screen-free time before bed",
          icon: "fas fa-mobile-alt",
          progress: 41,
          completed: false,
          reward: 350
        }
      ],
      topPerformers: [
        {
          id: 1,
          name: "Amina Hassan",
          country: "Morocco 🇲🇦",
          avatar: "/api/placeholder/80/80",
          challengePoints: 1250,
          badge: {
            name: "Wellness Warrior",
            icon: "fas fa-crown"
          }
        },
        {
          id: 2,
          name: "Joseph Ochieng",
          country: "Kenya 🇰🇪",
          avatar: "/api/placeholder/80/80",
          challengePoints: 1180,
          badge: {
            name: "Transformation Leader",
            icon: "fas fa-medal"
          }
        },
        {
          id: 3,
          name: "Zara Kone",
          country: "Ivory Coast 🇨🇮",
          avatar: "/api/placeholder/80/80",
          challengePoints: 1145,
          badge: {
            name: "Consistency Champion",
            icon: "fas fa-star"
          }
        }
      ]
    });

    // Recent transformations feed
    const recentTransformations = ref([
      {
        id: 1,
        userName: "Amara Okafor",
        avatar: "/api/placeholder/50/50",
        countryFlag: "🇳🇬",
        action:
          "Completed 90-day morning exercise streak! Transformed discipline into strength.",
        timeAgo: "2 hours ago",
        streak: 90,
        points: 450,
        tags: ["Fitness", "Discipline", "Milestone"],
        achievementIcon: "fas fa-medal",
        reactions: { fire: 24, heart: 18 },
      },
      {
        id: 2,
        userName: "Kwame Asante",
        avatar: "/api/placeholder/50/50",
        countryFlag: "🇬🇭",
        action:
          "Hit the #1 spot on the leaderboard for the third consecutive week!",
        timeAgo: "4 hours ago",
        streak: 127,
        points: 385,
        tags: ["Leadership", "Consistency", "Excellence"],
        achievementIcon: "fas fa-crown",
        reactions: { fire: 31, heart: 22 },
      },
      {
        id: 3,
        userName: "Zara Kimani",
        avatar: "/api/placeholder/50/50",
        countryFlag: "🇰🇪",
        action:
          "Completed 30-day reading challenge and inspired 12 others to join!",
        timeAgo: "6 hours ago",
        streak: 76,
        points: 298,
        tags: ["Reading", "Leadership", "Growth"],
        achievementIcon: "fas fa-book",
        reactions: { fire: 19, heart: 15 },
      },
      {
        id: 4,
        userName: "David Mensah",
        avatar: "/api/placeholder/50/50",
        countryFlag: "🇬🇭",
        action: "Maintained perfect habit completion for 14 consecutive days!",
        timeAgo: "8 hours ago",
        streak: 65,
        points: 210,
        tags: ["Habits", "Perfectionist", "Focused"],
        achievementIcon: "fas fa-target",
        reactions: { fire: 16, heart: 12 },
      },
    ]);

    // Community Chapters data
    const communityChapters = ref([
      {
        id: 1,
        name: "EKSU Chapter",
        location: "Ekiti State University, Nigeria",
        flag: "🇳🇬",
        memberCount: 247,
        description: "Driving academic excellence and personal development at EKSU",
        totalPoints: 45680,
        topMembers: [
          { name: "Adebayo Oluwaseun", avatar: "/api/placeholder/40/40", points: 1250 },
          { name: "Funmi Adeyemi", avatar: "/api/placeholder/40/40", points: 1180 },
          { name: "Tunde Akinola", avatar: "/api/placeholder/40/40", points: 1120 }
        ]
      },
      {
        id: 2,
        name: "Bouesti Chapter",
        location: "Bowen University, Nigeria",
        flag: "🇳🇬",
        memberCount: 189,
        description: "Excellence in character and academic achievement",
        totalPoints: 38920,
        topMembers: [
          { name: "Grace Okafor", avatar: "/api/placeholder/40/40", points: 1320 },
          { name: "Daniel Adebisi", avatar: "/api/placeholder/40/40", points: 1290 },
          { name: "Sarah Adekunle", avatar: "/api/placeholder/40/40", points: 1150 }
        ]
      },
      {
        id: 3,
        name: "Unilorin Chapter",
        location: "University of Ilorin, Nigeria",
        flag: "🇳🇬",
        memberCount: 312,
        description: "Better by far - transforming lives through discipline",
        totalPoints: 52340,
        topMembers: [
          { name: "Ibrahim Yakubu", avatar: "/api/placeholder/40/40", points: 1440 },
          { name: "Aisha Mohammed", avatar: "/api/placeholder/40/40", points: 1380 },
          { name: "Kemi Adeoye", avatar: "/api/placeholder/40/40", points: 1220 }
        ]
      },
      {
        id: 4,
        name: "OAU Chapter",
        location: "Obafemi Awolowo University, Nigeria",
        flag: "🇳🇬",
        memberCount: 198,
        description: "Great Ife - nurturing excellence and innovation",
        totalPoints: 41870,
        topMembers: [
          { name: "Biodun Ojo", avatar: "/api/placeholder/40/40", points: 1350 },
          { name: "Yetunde Afolabi", avatar: "/api/placeholder/40/40", points: 1280 },
          { name: "Segun Adebayo", avatar: "/api/placeholder/40/40", points: 1190 }
        ]
      },
      {
        id: 5,
        name: "UI Chapter",
        location: "University of Ibadan, Nigeria",
        flag: "🇳🇬",
        memberCount: 234,
        description: "First and the best - leading transformation in Africa",
        totalPoints: 47560,
        topMembers: [
          { name: "Folake Adebola", avatar: "/api/placeholder/40/40", points: 1420 },
          { name: "Emeka Okonkwo", avatar: "/api/placeholder/40/40", points: 1340 },
          { name: "Temilola Balogun", avatar: "/api/placeholder/40/40", points: 1260 }
        ]
      },
      {
        id: 6,
        name: "UNILAG Chapter",
        location: "University of Lagos, Nigeria",
        flag: "🇳🇬",
        memberCount: 278,
        description: "Lagos excellence - pioneering innovation and leadership",
        totalPoints: 49320,
        topMembers: [
          { name: "Chioma Nwachukwu", avatar: "/api/placeholder/40/40", points: 1380 },
          { name: "Bolaji Adebayo", avatar: "/api/placeholder/40/40", points: 1320 },
          { name: "Khadijah Salami", avatar: "/api/placeholder/40/40", points: 1280 }
        ]
      },
      {
        id: 12,
        name: "Kenya Chapter",
        location: "University of Nairobi, Kenya",
        flag: "🇰🇪",
        memberCount: 167,
        description: "East African excellence - Harambee spirit in action",
        totalPoints: 35480,
        topMembers: [
          { name: "Zara Kimani", avatar: "/api/placeholder/40/40", points: 1460 },
          { name: "Joseph Ochieng", avatar: "/api/placeholder/40/40", points: 1390 },
          { name: "Grace Wanjiku", avatar: "/api/placeholder/40/40", points: 1340 }
        ]
      },
      {
        id: 7,
        name: "UNIBEN Chapter",
        location: "University of Benin, Nigeria",
        flag: "🇳🇬",
        memberCount: 167,
        description: "Excellence in learning and character development",
        totalPoints: 35890,
        topMembers: [
          { name: "Osaze Omoregie", avatar: "/api/placeholder/40/40", points: 1240 },
          { name: "Jennifer Uwadia", avatar: "/api/placeholder/40/40", points: 1190 },
          { name: "Peter Ehigiator", avatar: "/api/placeholder/40/40", points: 1140 }
        ]
      },
      {
        id: 8,
        name: "ABU Chapter",
        location: "Ahmadu Bello University, Nigeria",
        flag: "🇳🇬",
        memberCount: 203,
        description: "Northern pride - building leaders for tomorrow",
        totalPoints: 42150,
        topMembers: [
          { name: "Musa Abdullahi", avatar: "/api/placeholder/40/40", points: 1310 },
          { name: "Hauwa Garba", avatar: "/api/placeholder/40/40", points: 1270 },
          { name: "Yusuf Aliyu", avatar: "/api/placeholder/40/40", points: 1220 }
        ]
      },
      {
        id: 9,
        name: "UNN Chapter",
        location: "University of Nigeria, Nsukka",
        flag: "🇳🇬",
        memberCount: 145,
        description: "Pioneering research and academic excellence",
        totalPoints: 31670,
        topMembers: [
          { name: "Chigozie Okwu", avatar: "/api/placeholder/40/40", points: 1200 },
          { name: "Adanna Okafor", avatar: "/api/placeholder/40/40", points: 1150 },
          { name: "Emeka Aniagolu", avatar: "/api/placeholder/40/40", points: 1120 }
        ]
      },
      {
        id: 10,
        name: "UNICAL Chapter",
        location: "University of Calabar, Nigeria",
        flag: "🇳🇬",
        memberCount: 123,
        description: "Excellence by the bay - nurturing future leaders",
        totalPoints: 28540,
        topMembers: [
          { name: "Bassey Edem", avatar: "/api/placeholder/40/40", points: 1180 },
          { name: "Comfort Etim", avatar: "/api/placeholder/40/40", points: 1130 },
          { name: "Daniel Okon", avatar: "/api/placeholder/40/40", points: 1080 }
        ]
      },
      {
        id: 11,
        name: "Ghana Chapter",
        location: "University of Ghana, Legon",
        flag: "🇬🇭",
        memberCount: 189,
        description: "Gold Coast excellence - building Ghana's future",
        totalPoints: 38920,
        topMembers: [
          { name: "Kwame Asante", avatar: "/api/placeholder/40/40", points: 1510 },
          { name: "Akosua Darko", avatar: "/api/placeholder/40/40", points: 1420 },
          { name: "Kofi Mensah", avatar: "/api/placeholder/40/40", points: 1380 }
        ]
      },
      {
        memberCount: 167,
        description: "East African excellence - Harambee spirit in action",
        totalPoints: 35480,
        topMembers: [
          { name: "Zara Kimani", avatar: "/api/placeholder/40/40", points: 1460 },
          { name: "Joseph Ochieng", avatar: "/api/placeholder/40/40", points: 1390 },
          { name: "Grace Wanjiku", avatar: "/api/placeholder/40/40", points: 1340 }
        ]
      },
      {
        id: 13,
        name: "South Africa Chapter",
        location: "University of Cape Town, South Africa",
        flag: "🇿🇦",
        memberCount: 145,
        description: "Rainbow nation excellence - Ubuntu in education",
        totalPoints: 32150,
        topMembers: [
          { name: "Thabo Mthembu", avatar: "/api/placeholder/40/40", points: 1380 },
          { name: "Naledi Kgomo", avatar: "/api/placeholder/40/40", points: 1320 },
          { name: "Sipho Ndlovu", avatar: "/api/placeholder/40/40", points: 1280 }
        ]
      },
      {
        id: 14,
        name: "Egypt Chapter",
        location: "Cairo University, Egypt",
        flag: "🇪🇬",
        memberCount: 178,
        description: "Ancient wisdom meets modern excellence",
        totalPoints: 37260,
        topMembers: [
          { name: "Omar Hassan", avatar: "/api/placeholder/40/40", points: 1400 },
          { name: "Fatima Al-Rashid", avatar: "/api/placeholder/40/40", points: 1360 },
          { name: "Ahmed Mahmoud", avatar: "/api/placeholder/40/40", points: 1310 }
        ]
      },
      {
        id: 15,
        name: "Morocco Chapter",
        location: "Mohammed V University, Morocco",
        flag: "🇲🇦",
        memberCount: 134,
        description: "Gateway to excellence - bridging Africa and Europe",
        totalPoints: 29870,
        topMembers: [
          { name: "Amina Hassan", avatar: "/api/placeholder/40/40", points: 1340 },
          { name: "Youssef Benali", avatar: "/api/placeholder/40/40", points: 1290 },
          { name: "Laila Ouchrif", avatar: "/api/placeholder/40/40", points: 1240 }
        ]
      },
      {
        id: 16,
        name: "Ethiopia Chapter",
        location: "Addis Ababa University, Ethiopia",
        flag: "🇪🇹",
        memberCount: 112,
        description: "Highland excellence - never colonized, always progressing",
        totalPoints: 26340,
        topMembers: [
          { name: "Dawit Tekle", avatar: "/api/placeholder/40/40", points: 1250 },
          { name: "Hanna Molla", avatar: "/api/placeholder/40/40", points: 1210 },
          { name: "Samuel Girma", avatar: "/api/placeholder/40/40", points: 1180 }
        ]
      },
      {
        id: 17,
        name: "International Chapter",
        location: "Global Community",
        flag: "🌍",
        memberCount: 298,
        description: "Connecting minds across continents - diaspora excellence",
        totalPoints: 54760,
        topMembers: [
          { name: "Adaora Okonkwo", avatar: "/api/placeholder/40/40", points: 1620 },
          { name: "Kwame Nkrumah Jr.", avatar: "/api/placeholder/40/40", points: 1580 },
          { name: "Amelia Sankara", avatar: "/api/placeholder/40/40", points: 1540 }
        ]
      }
    ]);

    // Calculate total community members
    const totalCommunityMembers = computed(() => {
      return communityChapters.value.reduce((total, chapter) => total + chapter.memberCount, 0);
    });

    // Group chapters by requested regions
    const getRegionKeyForChapter = (chapter) => {
      const name = (chapter.location || '').toLowerCase();
      const flag = chapter.flag || '';
      // Simple heuristics based on location text or known flags
      if (name.includes('nigeria') || name.includes('ghana') || name.includes('kenya') || name.includes('ethiopia') || name.includes('south africa') || flag === '🇳🇬' || flag === '🇬🇭' || flag === '🇰🇪' || flag === '🇪🇹' || flag === '🇿🇦') {
        return 'africa_sub';
      }
      if (name.includes('united states') || name.includes('canada') || name.includes('usa') || name.includes('u.s.') || name.includes('north america')) {
        return 'na';
      }
      if (name.includes('brazil') || name.includes('argentina') || name.includes('south america')) {
        return 'sa';
      }
      if (name.includes('egypt') || name.includes('morocco') || name.includes('tunisia') || name.includes('mena') || name.includes('middle east') || name.includes('europe')) {
        return 'emea';
      }
      if (name.includes('asia') || name.includes('india') || name.includes('china') || name.includes('oceania') || name.includes('australia') || name.includes('new zealand')) {
        return 'apac';
      }
      // Fallback by diaspora/global
      return 'emea';
    };

    const regionConfigs = [
      { key: 'na', name: 'North America' },
      { key: 'sa', name: 'South America' },
      { key: 'emea', name: 'Europe, Middle East & North Africa' },
      { key: 'africa_sub', name: 'Africa (Sub-Saharan)' },
      { key: 'apac', name: 'Asia, Oceania' }
    ];

    const regionList = computed(() => {
      const buckets = new Map(regionConfigs.map(rc => [rc.key, { ...rc, chapters: [], members: 0, chapterCount: 0 }]));
      for (const ch of communityChapters.value) {
        const key = getRegionKeyForChapter(ch);
        const bucket = buckets.get(key);
        if (!bucket) continue;
        bucket.chapters.push(ch);
        bucket.members += ch.memberCount;
        bucket.chapterCount += 1;
      }
      return regionConfigs.map(rc => buckets.get(rc.key));
    });

    // Letter filter state per region
    // Selected region filter
    const selectedRegionKey = ref(null);
    const resultsRef = ref(null);
    const selectedRegionGroup = computed(() => {
      return regionList.value.find(g => g.key === selectedRegionKey.value);
    });
    const selectRegion = (key) => {
      selectedRegionKey.value = key;
      requestAnimationFrame(() => {
        if (resultsRef.value) {
          resultsRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    };

    // Methods
    const setActiveFilter = (filterId) => {
      activeFilter.value = filterId;
      // Here you would typically fetch filtered data from an API
    };

    // Get chapter card class based on flag
    const getChapterCardClass = (flag) => {
      if (flag === '🇳🇬') return 'nigerian-chapter';
      if (flag === '🌍') return 'global-chapter';
      return 'african-chapter';
    };

    // Simulate live updates
    const updateLiveStats = () => {
      setInterval(() => {
        liveStats.value.activeMembers += Math.floor(Math.random() * 3);
        liveStats.value.totalStreaks += Math.floor(Math.random() * 10);
      }, 30000); // Update every 30 seconds
    };

    // Format numbers with commas
    const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format date for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    };

    onMounted(() => {
      updateLiveStats();
      // Initialize any other real-time features
      // Default to the first region that has chapters so users immediately see results
      const firstWithChapters = regionList.value.find(g => g && g.chapterCount > 0);
      selectedRegionKey.value = firstWithChapters ? firstWithChapters.key : (regionConfigs[0]?.key || null);
    });

    return {
      isAuthenticated,
      activeFilter,
      liveStats,
      dailyQuote,
      formatNumber,
      formatDate,
      leaderboardFilters,
      topMembers,
      extendedLeaderboard,
      currentChallenge,
      recentTransformations,
      communityChapters,
      totalCommunityMembers,
      regionList,
      selectedRegionKey,
      selectedRegionGroup,
      selectRegion,
      resultsRef,
      setActiveFilter,
    };
  },
};
</script>

<style scoped>
/* Global Styles */
html, body {
  width: 100%;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  margin: 0;
  padding: 0;
}

/* Ensure Vue app container doesn't constrain width */
#app {
  width: 100%;
  overflow-x: hidden;
}

/* Ensure body and html don't constrain full-width sections */
html {
  scroll-behavior: smooth;
}

.main-content {
  width: 100%;
  margin: 0 auto;
  margin-top: 80px; /* Add proper top margin for desktop */
  overflow-x: visible; /* Allow full-width sections to overflow */
  background: #ffffff;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  width: 100vw; /* Full viewport width */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  padding: 4rem 2rem;
  min-height: 70vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.hero-content {
  position: relative;
  width: 100%;
  z-index: 2;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

.hero-text {
  color: #111;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  padding-right: 2rem;
  animation: slideInLeft 0.8s ease-out;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  color: #111;
  margin-bottom: 1rem;
  text-align: left;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.gradient-text {
  color: #2563eb;
  background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

.hero-description {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
  color: #555;
  margin: 0.5rem 0 1.5rem 0;
  max-width: 480px;
  text-align: left;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
  max-width: 100%;
  width: 100%;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.stat-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.stat-card:nth-child(1) {
  animation-delay: 0.7s;
}

.stat-card:nth-child(2) {
  animation-delay: 0.8s;
}

.stat-card:nth-child(3) {
  animation-delay: 0.9s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  border-color: #2563eb;
}

.stat-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  text-align: left;
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #111;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.2rem;
  font-weight: 500;
}

.hero-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 0 1.5rem 0;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 1s both;
}

/* Homepage Button Styling */
.mikaelson-button {
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  border-radius: 35px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mikaelson-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.button-text {
  padding: 0 0.25rem;
}

.button-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 0.5rem;
  display: flex;
  background: black;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

.community-btn {
  background: linear-gradient(135deg, #20c9c0 0%, #17a2b8 100%);
  color: white;
  border: none;
}

.community-btn:hover {
  background: linear-gradient(135deg, #17a2b8 0%, #20c9c0 100%);
}

.community-btn .button-icon {
  background: rgba(0, 0, 0, 0.2);
}

.labs-btn {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
}

.labs-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
}

.labs-btn .button-icon {
  background: rgba(0, 0, 0, 0.2);
}

.hero-trust {
  margin-top: 1rem;
  opacity: 0.9;
  text-align: left;
  animation: fadeInUp 0.8s ease-out 1.2s both;
}

.trust-text {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  color: #666;
  text-align: left;
  font-weight: 500;
}

.trust-logos {
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.trust-company {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

/* Hero Image */
.hero-image {
  width: 50%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: slideInRight 0.8s ease-out;
}

.hero-image::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(135deg, #2563eb20, #20c9c020);
  border-radius: 20px;
  z-index: -1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  opacity: 0.95;
  object-fit: cover;
  transition: all 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* Section Styles */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
  animation: fadeInUp 0.8s ease-out;
}

.section-badge {
  display: block;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 35px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  position: relative;
  overflow: hidden;
  width: fit-content;
  transition: all 0.3s ease;
}

.section-badge:hover::before {
  left: 100%;
}

.section-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.section-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 auto 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  display: block;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.7;
  font-weight: 400;
  max-width: 520px;
  margin: 0 auto;
  display: block;
}

/* Features Overview */
.features-overview {
  padding: 5rem 0;
  background: #ffffff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin: 0 auto 1.5rem;
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* Leaderboard Section */
.leaderboard-section {
  padding: 5rem 0;
  background: #f8fafc;
  animation: fadeIn 0.8s ease-out;
}

.leaderboard-filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: transparent;
}

/* Extended Leaderboard */
.extended-leaderboard {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.leaderboard-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #20c9c0;
  font-size: 0.9rem;
  font-weight: 500;
}

.live-indicator i {
  animation: pulse 2s infinite;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.leaderboard-item:hover {
  background: #f1f5f9;
  transform: translateX(3px);
}

.rank {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  min-width: 40px;
}

.member-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.member-profile .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.member-details h5 {
  margin: 0;
  font-weight: 600;
  color: #111;
}

.member-details p {
  margin: 0.25rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

.member-metrics {
  display: flex;
  gap: 2rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
}

.metric-label {
  font-size: 0.8rem;
  color: #666;
}

.member-progress {
  width: 100px;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s ease;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  50% {
    background: linear-gradient(135deg, #20c9c0 0%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

/* Responsive Design */
/* Desktop-specific enhancements */
@media (min-width: 1200px) {
  .hero-section {
    padding: 6rem 2rem;
    min-height: 75vh;
  }
  
  .hero-content {
    max-width: 1600px;
    gap: 5rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .hero-description {
    font-size: 1.3rem;
  }
}

/* Tablet styles */
@media (max-width: 1024px) and (min-width: 769px) {
  .hero-section {
    padding: 4rem 2rem;
    min-height: 65vh;
  }
  
  .hero-content {
    max-width: 900px;
    gap: 3rem;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .main-content {
    margin-top: 60px; /* Smaller top margin for mobile */
  }
  
  .hero-section {
    width: 100%;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
    padding: 3rem 1rem;
    min-height: 50vh;
  }
  
  .hero-content {
    flex-direction: column;
    gap: 2rem;
    max-width: 100%;
  }

  .hero-text,
  .hero-image {
    width: 100%;
  }

  .hero-text {
    align-items: center;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
    text-align: center;
  }

  .hero-description {
    text-align: center;
    max-width: 600px;
  }

  .hero-buttons {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .mikaelson-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 3rem;
  }

  .feature-card {
    padding: 2.5rem 2rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .member-metrics {
    gap: 1rem;
  }

  .leaderboard-item {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .member-progress {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-overview {
    padding: 4rem 0;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}

/* Community CTA Section */
.community-cta {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.community-cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 30% 40%,
      rgba(37, 99, 235, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(32, 201, 192, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.cta-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 2rem;
}

.cta-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
  animation: float 3s ease-in-out infinite;
}

.cta-content h2 {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.cta-content p {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
}

.cta-button.primary:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  transform: translateY(-3px);
   box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
}

.cta-button.secondary {
  background: white;
  color: #2563eb;
  border-color: #2563eb;
}

.cta-button.secondary:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
}

.cta-testimonial {
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  position: relative;
}

.cta-testimonial::before {
  content: '"';
  font-size: 4rem;
  color: #2563eb;
  position: absolute;
  top: -10px;
  left: 20px;
  font-family: serif;
  opacity: 0.3;
}

.cta-testimonial p {
  font-size: 1.1rem;
  font-style: italic;
  color: #374151;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.cta-testimonial cite {
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 600;
  font-style: normal;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive CTA */
@media (max-width: 768px) {
  .community-cta {
    padding: 4rem 0;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .cta-content h2 {
    font-size: 1.75rem;
  }

  .cta-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}

/* Community Chapters Styles */
.community-chapters {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.community-chapters::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(32, 201, 192, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.total-members-banner {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 24px;
  padding: 3rem 2rem;
  margin-bottom: 4rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
}

.total-members-banner::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.total-members-banner::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float 4s ease-in-out infinite reverse;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.members-stat {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.members-stat .stat-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.members-stat .stat-content {
  display: flex;
  flex-direction: column;
}

.members-stat .stat-number {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.members-stat .stat-label {
  font-size: 1.1rem;
  opacity: 0.95;
  margin-top: 0.5rem;
  font-weight: 500;
}

.global-reach {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.reach-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
}

.reach-text {
  font-size: 1.3rem;
  font-weight: 600;
  font-style: italic;
  opacity: 0.95;
  max-width: 250px;
  line-height: 1.3;
}

.banner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.element-1 {
  top: 20%;
  left: 20%;
  animation: float 3s ease-in-out infinite;
}

.element-2 {
  top: 60%;
  right: 15%;
  animation: float 4s ease-in-out infinite reverse;
}

.element-3 {
  bottom: 25%;
  left: 60%;
  animation: float 5s ease-in-out infinite;
}

/* Chapter Categories */
.chapter-categories {
  margin-bottom: 4rem;
}

.categories-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.categories-grid.small {
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.category-card.small {
  padding: 0.75rem;
  text-align: left;
  border-radius: 12px;
}

.category-card.small h4 {
  font-size: 0.95rem;
  margin: 0 0 0.25rem 0;
}

.category-card.small .category-count {
  font-size: 0.8rem;
  margin: 0 0 0.25rem 0;
}

.category-card.small .category-stats {
  font-size: 0.8rem;
}

.community-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.5rem 1rem;
}

.community-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
}

.community-list .flag { font-size: 1rem; }
.community-list .name { font-weight: 700; }
.community-list .meta { color: #64748b; font-size: 0.85rem; }

.category-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(37, 99, 235, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover::before {
  opacity: 1;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}

.category-card.nigerian:hover {
  border-color: #10b981;
}

.category-card.african:hover {
  border-color: #f59e0b;
}

.category-card.international:hover {
  border-color: #8b5cf6;
}

.category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-flag {
  font-size: 3rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.category-header h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.category-count {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

.category-stats {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2563eb;
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.region-title {
  margin: 2rem 0 0.75rem;
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
}

.letter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.letter-btn {
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}

.letter-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #1d4ed8;
}

.chapter-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.chapter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  background: #f8fafc;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  cursor: pointer;
}

.chapter-chip .flag {
  font-size: 1rem;
}

.chapter-chip .name {
  font-weight: 700;
  font-size: 0.9rem;
}

.chapter-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid transparent;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.chapter-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(32, 201, 192, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.chapter-card:hover::before {
  opacity: 1;
}

.chapter-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chapter-flag {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.chapter-details h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  background: linear-gradient(135deg, #1e293b 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chapter-location {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.5rem 0 0 0;
  font-weight: 500;
}

.chapter-stats {
  text-align: right;
}

.member-count {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.member-count .count {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
}

.member-count .label {
  font-size: 0.8rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
  display: block;
}

.chapter-description {
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.chapter-description p {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.chapter-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.chapter-metrics .metric {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.chapter-metrics .metric:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chapter-metrics .metric-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  flex-shrink: 0;
}

.chapter-metrics .metric-info {
  display: flex;
  flex-direction: column;
}

.chapter-metrics .metric-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.chapter-metrics .metric-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
  font-weight: 600;
}

.chapter-top-members {
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.chapter-top-members h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-members-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.top-member {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.top-member:hover {
  background: #f3f4f6;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.rank-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.rank-badge.rank-1 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.rank-badge.rank-2 {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.4);
}

.rank-badge.rank-3 {
  background: linear-gradient(135deg, #cd7c2f 0%, #92400e 100%);
  box-shadow: 0 4px 12px rgba(205, 124, 47, 0.4);
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #e2e8f0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.member-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1f2937;
}

.member-points {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 600;
}

.member-medal {
  flex-shrink: 0;
}

.member-medal .fa-medal {
  font-size: 1.2rem;
}

.member-medal .medal-1 {
  color: #fbbf24;
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
}

.member-medal .medal-2 {
  color: #94a3b8;
  filter: drop-shadow(0 2px 4px rgba(148, 163, 184, 0.3));
}

.member-medal .medal-3 {
  color: #cd7c2f;
  filter: drop-shadow(0 2px 4px rgba(205, 124, 47, 0.3));
}

.chapter-actions {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.view-chapter-btn,
.join-chapter-btn {
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.view-chapter-btn {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}

.view-chapter-btn:hover {
  background: #e2e8f0;
  color: #334155;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.join-chapter-btn {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border-color: #2563eb;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.join-chapter-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.member-rank .rank-2 {
  color: #9ca3af;
}

.member-rank .rank-3 {
  color: #cd7c2f;
}

.chapter-actions {
  display: flex;
  gap: 0.75rem;
}

.view-chapter-btn,
.join-chapter-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.view-chapter-btn {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.view-chapter-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.join-chapter-btn {
  background: #2563eb;
  color: white;
  border: 1px solid #2563eb;
}

.join-chapter-btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.community-growth-stats {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 2px solid #f1f5f9;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.community-growth-stats:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.growth-header {
  text-align: center;
  margin-bottom: 3rem;
}

.growth-header h3 {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #1e293b 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.growth-header p {
  color: #64748b;
  margin: 0;
  font-size: 1.1rem;
}

.growth-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.growth-metric {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.growth-metric:hover {
  background: #f1f5f9;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.growth-metric .metric-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
}

.growth-metric .metric-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.growth-metric .metric-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1e293b;
  line-height: 1;
}

.growth-metric .metric-label {
  font-size: 1rem;
  color: #64748b;
  margin-top: 0.5rem;
  font-weight: 600;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design for Community Chapters */
@media (max-width: 1024px) {
  .chapters-grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
}

@media (max-width: 768px) {
  .community-chapters {
    padding: 4rem 0;
  }

  .total-members-banner {
    padding: 2rem 1.5rem;
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .global-reach {
    align-items: center;
  }

  .members-stat .stat-number {
    font-size: 2.5rem;
  }

  .reach-text {
    font-size: 1.1rem;
    max-width: 300px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chapter-metrics {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .growth-metrics {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chapter-actions {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .total-members-banner {
    padding: 1.5rem 1rem;
  }

  .members-stat {
    gap: 1rem;
  }

  .members-stat .stat-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .members-stat .stat-number {
    font-size: 2rem;
  }

  .chapter-card {
    padding: 1.5rem;
  }

  .chapter-flag {
    font-size: 2rem;
  }

  .chapter-details h3 {
    font-size: 1.2rem;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
