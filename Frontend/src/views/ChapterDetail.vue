<template>
  <div>
    <Navbar />
    <main class="main-content chapter-detail">
      <div class="container">
        <header class="chapter-header">
          <h1 class="chapter-title">{{ chapter?.name || 'Chapter' }}</h1>
          <div class="chapter-meta">
            <span class="flag">{{ chapter?.flag }}</span>
            <span class="location">{{ chapter?.location }}</span>
            <span class="members">{{ formatNumber(chapter?.memberCount || 0) }} members</span>
          </div>
          <button class="join-btn">Join Us</button>
        </header>

        <section class="about-section">
          <h2>About Us</h2>
          <p>{{ chapter?.description || 'No description available.' }}</p>
        </section>

        <section class="events-section">
          <h2>Upcoming Events</h2>
          <ul class="event-list" v-if="upcomingEvents.length">
            <li v-for="event in upcomingEvents" :key="event.id">
              <span class="when">{{ formatDate(event.date) }}</span>
              <span class="name">{{ event.name }}</span>
            </li>
          </ul>
          <p v-else>No upcoming events.</p>

          <h2>Past Events</h2>
          <ul class="event-list" v-if="pastEvents.length">
            <li v-for="event in pastEvents" :key="event.id">
              <span class="when">{{ formatDate(event.date) }}</span>
              <span class="name">{{ event.name }}</span>
            </li>
          </ul>
          <p v-else>No past events yet.</p>
        </section>

        <section class="organizers-section">
          <h2>Organizers</h2>
          <ul class="people-list" v-if="organizers.length">
            <li v-for="person in organizers" :key="person.id">
              <span class="avatar">👤</span>
              <span class="name">{{ person.name }}</span>
              <span class="role">• {{ person.role }}</span>
            </li>
          </ul>
          <p v-else>No organizers listed.</p>
        </section>

        <section class="partners-section">
          <h2>Partners</h2>
          <ul class="people-list" v-if="partners.length">
            <li v-for="org in partners" :key="org.id">
              <span class="avatar">🤝</span>
              <span class="name">{{ org.name }}</span>
            </li>
          </ul>
          <p v-else>No partners listed.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ChapterDetail',
  components: { Navbar, Footer },
  props: { id: { type: String, required: true } },
  data() {
    return {
      chapter: null,
      upcomingEvents: [],
      pastEvents: [],
      organizers: [],
      partners: []
    }
  },
  created() {
    this.loadChapter()
  },
  methods: {
    loadChapter() {
      // In a real app, fetch by this.id. For now, try to read from history state
      const stateChapter = history.state && history.state.chapter
      if (stateChapter) {
        this.chapter = stateChapter
      } else {
        // Fallback placeholder
        this.chapter = { id: this.id, name: 'Chapter', flag: '🌍', location: '—', memberCount: 0, description: '' }
      }
      // Seed placeholder lists
      this.upcomingEvents = [
        { id: 'u1', name: 'Monthly Meetup', date: new Date(Date.now() + 7*86400000) }
      ]
      this.pastEvents = [
        { id: 'p1', name: 'Kickoff Session', date: new Date(Date.now() - 14*86400000) }
      ]
      this.organizers = [
        { id: 'o1', name: 'Community Lead', role: 'Lead' },
        { id: 'o2', name: 'Programs Manager', role: 'Programs' }
      ]
      this.partners = [
        { id: 'pt1', name: 'Local Partner A' },
        { id: 'pt2', name: 'Sponsor B' }
      ]
    },
    formatNumber(num) {
      return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatDate(d) {
      const date = new Date(d)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }
}
</script>

<style scoped>
.chapter-detail { padding: 2rem 0 4rem; }
.chapter-header { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
.chapter-title { font-size: 2rem; font-weight: 800; color: #111827; margin: 0; }
.chapter-meta { display: flex; gap: 0.75rem; color: #64748b; font-weight: 600; }
.join-btn { align-self: flex-start; padding: 0.5rem 1rem; border-radius: 8px; background: #2563eb; color: #fff; border: 1px solid #1d4ed8; cursor: pointer; }
.about-section, .events-section, .organizers-section, .partners-section { margin: 1.5rem 0; }
.event-list, .people-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
.event-list li, .people-list li { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; display: flex; gap: 0.5rem; align-items: center; }
.event-list .when { color: #64748b; }
.people-list .avatar { width: 28px; display: inline-flex; align-items: center; justify-content: center; }
</style>


