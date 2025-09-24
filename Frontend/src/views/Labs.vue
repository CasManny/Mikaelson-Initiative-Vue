<template>
  <div class="labs-page">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-panel">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">INNOVATION LABS</div>
            <h1 class="hero-title">Building Tomorrow's Solutions Today</h1>
            <p class="hero-description">
              Our Innovation Labs are where breakthrough ideas meet cutting-edge technology. 
              We develop practical solutions for real-world challenges facing African communities.
            </p>
            <div class="hero-actions">
              <button class="btn-primary" @click="scrollToSection('projects')">
                Explore Projects
                <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="btn-secondary" @click="scrollToSection('collaboration')">
                Join Our Lab
                <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img src="/assets/images/hero-img.jpg" alt="Innovation Lab" />
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What We Do</h2>
          <p class="section-subtitle">
            Our labs focus on creating technology solutions that directly address 
            the unique challenges and opportunities within African communities.
          </p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" @mouseenter="animateIcon($event)" @mouseleave="resetIcon($event)">
            <div class="service-icon">🔬</div>
            <h3 class="service-title">Research & Development</h3>
            <p class="service-description">
              Conducting deep research into local challenges and developing 
              innovative technological solutions tailored to community needs.
            </p>
            <div class="service-overlay">
              <button class="service-btn">Learn More</button>
            </div>
          </div>
          
          <div class="service-card" @mouseenter="animateIcon($event)" @mouseleave="resetIcon($event)">
            <div class="service-icon">💡</div>
            <h3 class="service-title">Prototype Development</h3>
            <p class="service-description">
              Building and testing proof-of-concept solutions before scaling 
              them for broader community implementation.
            </p>
            <div class="service-overlay">
              <button class="service-btn">Learn More</button>
            </div>
          </div>
          
          <div class="service-card" @mouseenter="animateIcon($event)" @mouseleave="resetIcon($event)">
            <div class="service-icon">🤖</div>
            <h3 class="service-title">AI & Machine Learning</h3>
            <p class="service-description">
              Leveraging artificial intelligence to solve complex problems 
              in education, healthcare, and economic development.
            </p>
            <div class="service-overlay">
              <button class="service-btn">Learn More</button>
            </div>
          </div>
          
          <div class="service-card" @mouseenter="animateIcon($event)" @mouseleave="resetIcon($event)">
            <div class="service-icon">📱</div>
            <h3 class="service-title">Digital Products</h3>
            <p class="service-description">
              Creating mobile and web applications that improve access 
              to essential services and opportunities.
            </p>
            <div class="service-overlay">
              <button class="service-btn">Learn More</button>
            </div>
          </div>
          
          <div class="service-card" @mouseenter="animateIcon($event)" @mouseleave="resetIcon($event)">
            <div class="service-icon">🌐</div>
            <h3 class="service-title">Open Source</h3>
            <p class="service-description">
              Contributing to and creating open-source projects that empower developers and benefit the global community.
            </p>
            <div class="service-overlay">
              <button class="service-btn">Explore Contributions</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">
            Discover our current initiatives and their impact on communities across Africa.
          </p>
        </div>
        <div class="project-filter">
          <button 
            v-for="filter in projectFilters" 
            :key="filter"
            @click="activeFilter = filter"
            :class="['filter-btn', { active: activeFilter === filter }]"
          >
            {{ filter }}
          </button>
        </div>
        <div class="projects-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            @click="openProjectModal(project)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div :class="['project-status', project.status.toLowerCase().replace(' ', '-')]">
                {{ project.status }}
              </div>
              <div class="project-overlay">
                <button class="view-details-btn" @click.stop="openProjectModal(project)">View Details</button>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" @click.stop>{{ project.title }}</a>
                <span v-else>{{ project.title }}</span>
              </h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Innovation Process Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Innovation Process</h2>
          <p class="section-subtitle">
            From idea to implementation, we follow a structured approach 
            to ensure our solutions create meaningful impact.
          </p>
        </div>
        
        <div class="process-timeline">
          <div class="process-step">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3 class="step-title">Research & Discovery</h3>
              <p class="step-description">
                We engage with communities to understand their unique challenges 
                and identify opportunities for technological intervention.
              </p>
            </div>
          </div>
          
          <div class="process-step">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3 class="step-title">Design & Prototype</h3>
              <p class="step-description">
                Our team designs user-centered solutions and builds functional 
                prototypes for testing and validation.
              </p>
            </div>
          </div>
          
          <div class="process-step">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3 class="step-title">Test & Iterate</h3>
              <p class="step-description">
                We conduct extensive testing with real users, gathering feedback 
                and refining our solutions for optimal performance.
              </p>
            </div>
          </div>
          
          <div class="process-step">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3 class="step-title">Deploy & Scale</h3>
              <p class="step-description">
                Successful solutions are deployed across communities and scaled 
                to maximize their positive impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Meet Our Innovation Team</h2>
          <p class="section-subtitle">
            The brilliant minds behind our groundbreaking solutions.
          </p>
        </div>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img src="/assets/images/20240726_164330.jpeg" alt="Dr. Kwame Asante" />
            </div>
            <div class="member-info">
              <h3 class="member-name">Dr. Kwame Asante</h3>
              <p class="member-role">Lead Innovation Engineer</p>
              <p class="member-description">
                Specializes in AI/ML solutions for healthcare and education sectors.
              </p>
            </div>
          </div>
          
          <div class="team-member">
            <div class="member-image">
              <img src="/assets/images/20240726_164330.jpeg" alt="Amara Okafor" />
            </div>
            <div class="member-info">
              <h3 class="member-name">Amara Okafor</h3>
              <p class="member-role">Product Strategy Lead</p>
              <p class="member-description">
                Drives product development and user experience across all lab initiatives.
              </p>
            </div>
          </div>
          
          <div class="team-member">
            <div class="member-image">
              <img src="/assets/images/20240726_164330.jpeg" alt="Fatima Al-Rashid" />
            </div>
            <div class="member-info">
              <h3 class="member-name">Fatima Al-Rashid</h3>
              <p class="member-role">Mobile Development Lead</p>
              <p class="member-description">
                Expert in creating mobile solutions that work in low-connectivity environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collaboration Section -->
    <section id="collaboration" class="collaboration-section">
      <div class="container">
        <div class="collaboration-content">
          <div class="collaboration-text">
            <h2 class="collaboration-title">Join Our Innovation Journey</h2>
            <p class="collaboration-description">
              Whether you're a developer, researcher, or community leader, 
              there's a place for you in our innovation ecosystem.
            </p>
            <div class="collaboration-benefits">
              <div class="benefit" v-for="benefit in benefits" :key="benefit.id">
                <span class="benefit-icon">{{ benefit.icon }}</span>
                <span class="benefit-text">{{ benefit.text }}</span>
              </div>
            </div>
          </div>
          <div class="collaboration-actions">
            <button class="btn-primary large" @click="openModal('join')">
              Join Our Lab
              <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            <button class="btn-outline large" @click="openModal('submit')">
              Submit a Project Idea
            </button>
            <button class="btn-outline large" @click="openModal('partner')">
              Partner with Us
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Component -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-header">
          <h3>{{ modalContent.title }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ modalContent.description }}</p>
          <form class="modal-form">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea placeholder="Tell us about yourself or your idea" rows="4" required></textarea>
            <button type="submit" class="btn-primary">Submit Application</button>
          </form>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Labs',
  components: { Navbar, Footer },
  setup() {
    const activeFilter = ref('all')
    const showModal = ref(false)
    const currentModal = ref('')

    const projects = ref([
      { id: 1, title: 'OpenTutor AI', category: 'education', description: 'Connecting students with mentors across Nigeria', image: '/assets/images/project1.jpg', status: 'active', tags: ['Vue','Node','MongoDB'] },
      { id: 2, title: 'HealthTech Initiative', category: 'healthcare', description: 'Telemedicine platform for rural communities', image: '/assets/images/project2.jpg', status: 'completed', tags: ['React','Python','PostgreSQL'] },
      { id: 3, title: 'Smart Agriculture', category: 'agriculture', description: 'IoT solutions for modern farming', image: '/assets/images/project3.jpg', status: 'development', tags: ['IoT','ML','Sensors'] },
      { id: 4, title: 'PropertyInsight', category: 'real-estate', description: 'Data-driven platform optimizing property valuation and urban planning.', image: '/assets/images/project4.jpg', status: 'active', tags: ['Analytics','GIS','Vue'] },
      { id: 5, title: 'RentalHub NG', category: 'real-estate', description: 'Platform simplifying rental property discovery, verification and tenant landlord management across Nigerian cities.', image: '/assets/images/Rental hub.jpeg', status: 'development', tags: ['Vue','Express','GIS'], link: 'https://rentalhub.ng' }
    ])

    const projectFilters = computed(() => ['all', ...new Set(projects.value.map(p => p.category))])

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') return projects.value
      return projects.value.filter(p => p.category === activeFilter.value)
    })

    const benefits = ref([
      { id: 1, icon: '🚀', text: 'Work on cutting-edge projects' },
      { id: 2, icon: '🌍', text: 'Create meaningful community impact' },
      { id: 3, icon: '🤝', text: 'Collaborate with top talent' }
    ])

    const modalContent = computed(() => {
      const content = {
        join: {
          title: 'Join Our Innovation Lab',
          description: 'Become part of our team of innovators and help build solutions that matter.'
        },
        submit: {
          title: 'Submit Your Project Idea',
          description: 'Have an innovative idea? Share it with us and let us bring it to life together.'
        },
        partner: {
          title: 'Partner with Mikaelson Initiative',
          description: 'Let us collaborate to create meaningful impact in our communities.'
        }
      }
      return content[currentModal.value] || content.join
    })

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const animateIcon = (event) => {
      const icon = event.currentTarget.querySelector('.service-icon')
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)'
      }
    }

    const resetIcon = (event) => {
      const icon = event.currentTarget.querySelector('.service-icon')
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)'
      }
    }

    const setFilter = (filter) => {
      activeFilter.value = filter
    }

    const openProjectModal = (project) => {
      console.log('Opening project modal for:', project.title)
    }

    const openModal = (modalType) => {
      currentModal.value = modalType
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      currentModal.value = ''
    }

    onMounted(() => {
      // Add any initialization logic here
    })

    return { activeFilter, showModal, currentModal, projects, projectFilters, filteredProjects, benefits, modalContent, scrollToSection, animateIcon, resetIcon, setFilter, openProjectModal, openModal, closeModal }
  }
}
</script>

<style scoped>
/* Base */
.labs-page { min-height:100vh; background:#ffffff; }
.container { max-width:1200px; margin:0 auto; padding:0 2rem; }

/* Hero */
.hero-section { background:#ffffff; padding:7rem 0 0; margin-top:0; }
.hero-panel { width:100%; max-width:1200px; margin:0 auto; background:rgba(92,225,230,0.5); padding:5rem 2rem; border-radius:24px; display:flex; align-items:center; position:relative; overflow:hidden; }
.hero-container { display:flex; width:100%; gap:2.5rem; align-items:stretch; justify-content:space-between; }
.hero-content { color:#111; flex:1 1 0; max-width:620px; display:flex; flex-direction:column; }
.hero-badge { background:#1f2937; color:#fff; padding:.55rem 1rem; border-radius:2rem; font-size:.7rem; font-weight:600; letter-spacing:.08em; margin:0 0 1.2rem; display:inline-block; }
.hero-title { font-size:2.2rem; font-weight:700; line-height:1.2; margin:0 0 1.1rem; color:#111; }
.hero-description { font-size:1.05rem; line-height:1.55; color:#222; margin:0 0 2rem; }
.hero-actions { display:flex; gap:1rem; flex-wrap:wrap; }
.hero-image { flex:1 1 0; display:flex; align-items:center; justify-content:center; }
.hero-image img { width:100%; max-width:560px; border-radius:1.2rem; box-shadow:0 2px 16px rgba(0,0,0,.07); object-fit:cover; aspect-ratio:16/9; }

/* Buttons */
.btn-primary,.btn-secondary,.btn-outline { font:inherit; font-weight:700; letter-spacing:.5px; cursor:pointer; display:inline-flex; align-items:center; gap:.55rem; border-radius:2.5rem; transition:all .3s ease; }
.btn-primary { background:#1f2937; color:#fff; border:none; height:56px; padding:0 2rem; box-shadow:0 4px 20px rgba(0,0,0,.10); }
.btn-primary:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,.15); }
.btn-secondary { background:#fff; color:#1f2937; border:2px solid #1f2937; height:56px; padding:0 2rem; }
.btn-secondary:hover { background:#1f2937; color:#fff; }
.btn-outline { background:#fff; color:#1f2937; border:2px solid #1f2937; height:56px; padding:0 2rem; font-size:.85rem; }
.btn-outline:hover { background:#1f2937; color:#fff; }
.btn-primary.large,.btn-outline.large { height:60px; font-size:1rem; }
.btn-arrow { transition:transform .3s ease; }
.btn-primary:hover .btn-arrow,.btn-secondary:hover .btn-arrow,.btn-outline:hover .btn-arrow { transform:translateX(4px); }

/* Section headers */
.section-header { text-align:center; margin-bottom:3.5rem; }
.section-title { font-size:2.3rem; font-weight:800; color:#111; margin:0 0 1rem; letter-spacing:-0.02em; }
.section-subtitle { font-size:1.05rem; color:#222; max-width:620px; margin:0 auto; line-height:1.55; }

/* Services */
.services-section { background:#ffffff; padding:4.5rem 0 5rem; }
.services-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:2rem; }
.service-card { background:#f8fafc; border:1px solid #e2e8f0; padding:2rem; border-radius:1rem; text-align:center; position:relative; overflow:hidden; transition:all .3s ease; }
.service-card:hover { box-shadow:0 6px 20px rgba(0,0,0,.08); transform:translateY(-4px); }
.service-icon { font-size:3rem; margin-bottom:1.5rem; transition:transform .3s ease; }
.service-title { font-size:1.4rem; font-weight:600; color:#111; margin:0 0 1rem; }
.service-description { color:#222; line-height:1.55; font-size:.95rem; }
.service-overlay { position:absolute; left:0; right:0; bottom:0; background:rgba(17,24,39,.93); padding:1rem 1rem 1.2rem; transform:translateY(100%); transition:transform .35s cubic-bezier(.4,0,.2,1); display:flex; justify-content:center; }
.service-card:hover .service-overlay { transform:translateY(0); }
.service-btn { background:#ffffff; color:#1f2937; border:none; padding:.55rem 1.15rem; border-radius:2rem; font-weight:600; cursor:pointer; font-size:.7rem; letter-spacing:.5px; }
.service-btn:hover { background:#1f2937; color:#fff; }

/* Projects */
.projects-section { background:linear-gradient(135deg,#f8fafc 0%, #e2e8f0 100%); padding:5rem 0; }
.project-filter { display:flex; flex-wrap:wrap; gap:.75rem; justify-content:center; margin:0 0 2.5rem; }
.filter-btn { background:#fff; border:1px solid #d1d5db; color:#374151; padding:.55rem 1.2rem; border-radius:2rem; font-size:.65rem; font-weight:700; letter-spacing:.6px; cursor:pointer; transition:all .25s ease; text-transform:uppercase; }
.filter-btn.active,.filter-btn:hover { background:#1f2937; border-color:#1f2937; color:#fff; }
.projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:2.5rem; }
.project-card { background:#fff; border:1px solid #e5e7eb; border-radius:1rem; overflow:hidden; position:relative; box-shadow:0 4px 20px rgba(0,0,0,.08); transition:box-shadow .35s, transform .35s; }
.project-card:hover { box-shadow:0 10px 32px rgba(0,0,0,.12); transform:translateY(-6px); }
.project-image { position:relative; height:200px; overflow:hidden; }
.project-image img { width:100%; height:100%; object-fit:cover; }
.project-status { position:absolute; top:1rem; right:1rem; padding:.4rem .9rem; font-size:.58rem; font-weight:700; letter-spacing:.7px; text-transform:uppercase; border-radius:1.2rem; }
.project-status.active { background:#d1fae5; color:#065f46; }
.project-status.completed { background:#e0f2fe; color:#075985; }
.project-status.development { background:#fef3c7; color:#92400e; }
.project-overlay { position:absolute; inset:0; background:rgba(17,24,39,0.55); opacity:0; display:flex; align-items:center; justify-content:center; transition:opacity .3s ease; }
.project-card:hover .project-overlay { opacity:1; }
.view-details-btn { background:#fff; color:#1f2937; border:none; padding:.65rem 1.3rem; border-radius:2rem; font-weight:600; font-size:.7rem; letter-spacing:.5px; cursor:pointer; }
.view-details-btn:hover { background:#1f2937; color:#fff; }
.project-content { padding:1.7rem 1.7rem 1.6rem; }
.project-title { font-size:1.3rem; font-weight:600; color:#111; margin:0 0 .55rem; }
.project-title a { color:inherit; text-decoration:none; }
.project-title a:hover { text-decoration:underline; }
.project-description { color:#222; line-height:1.5; font-size:.9rem; margin:0 0 1rem; }
.project-tags { display:flex; flex-wrap:wrap; gap:.45rem; }
.tag { background:#edf2f7; color:#475569; padding:.28rem .7rem; border-radius:1rem; font-size:.6rem; font-weight:600; letter-spacing:.5px; }

/* Process */
.process-section { background:#ffffff; padding:5rem 0; }
.process-timeline { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:3rem; }
.process-step { text-align:center; display:flex; flex-direction:column; align-items:center; }
.step-number { width:4rem; height:4rem; background:#1f2937; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.25rem; font-weight:700; margin-bottom:1.1rem; }
.step-title { font-size:1.1rem; font-weight:600; color:#111; margin:0 0 .55rem; }
.step-description { color:#222; line-height:1.5; font-size:.85rem; }

/* Team */
.team-section { background:#ffffff; padding:5rem 0; }
.team-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:2.5rem; }
.team-member { background:#f8fafc; border:1px solid #e2e8f0; padding:2rem; border-radius:1rem; text-align:center; transition:all .3s ease; }
.team-member:hover { transform:translateY(-5px); box-shadow:0 10px 28px rgba(0,0,0,.08); }
.member-image { width:120px; height:120px; border-radius:50%; overflow:hidden; margin:0 auto 1.2rem; border:4px solid #1f2937; }
.member-image img { width:100%; height:100%; object-fit:cover; }
.member-name { font-size:1.1rem; font-weight:600; color:#111; margin:0 0 .35rem; }
.member-role { font-size:.7rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:#1f2937; margin:0 0 .75rem; }
.member-description { font-size:.8rem; color:#334155; line-height:1.45; }

/* Collaboration */
.collaboration-section { background:linear-gradient(135deg,#f8fafc 0%, #e2e8f0 100%); color:#111; padding:5rem 0; }
.collaboration-content { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
.collaboration-title { font-size:2.2rem; font-weight:700; margin:0 0 1.2rem; letter-spacing:-0.02em; }
.collaboration-description { font-size:1rem; line-height:1.55; color:#222; margin:0 0 1.6rem; }
.collaboration-benefits { display:flex; flex-direction:column; gap:.8rem; }
.benefit { display:flex; align-items:center; gap:.8rem; background:rgba(255,255,255,.7); padding:.8rem 1rem; border-radius:14px; }
.benefit-icon { font-size:1.2rem; }
.benefit-text { font-weight:600; font-size:.85rem; color:#1f2937; }
.collaboration-actions { display:flex; flex-direction:column; gap:.9rem; }

/* Modal */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:1000; backdrop-filter:blur(4px); }
.modal-content { background:#fff; border:1px solid #e2e8f0; border-radius:20px; padding:2rem 2rem 2.1rem; max-width:480px; width:92%; position:relative; animation:fadeIn .35s ease; }
@keyframes fadeIn { from { opacity:0; transform:translateY(12px);} to { opacity:1; transform:translateY(0);} }
.modal-close { position:absolute; top:.6rem; right:.9rem; background:none; border:none; font-size:2rem; line-height:1; cursor:pointer; color:#1f2937; }
.modal-header h3 { margin:0 0 1rem; font-size:1.25rem; font-weight:700; color:#111; }
.modal-body p { margin:0 0 1.3rem; color:#334155; font-size:.85rem; line-height:1.55; }
.modal-form { display:flex; flex-direction:column; gap:.75rem; }
.modal-form input,.modal-form textarea { width:100%; padding:.85rem 1rem; border:2px solid #e2e8f0; border-radius:14px; font:inherit; font-size:.85rem; background:#fff; }
.modal-form input:focus,.modal-form textarea:focus { outline:none; border-color:#1f2937; }
.modal-form button { margin-top:.3rem; }

/* Responsive */
@media (max-width:980px){ .collaboration-content { grid-template-columns:1fr; } }
@media (max-width:900px){ .hero-container { flex-direction:column; } .hero-panel { padding:4.2rem 1.5rem; } .hero-title { font-size:2rem; } .hero-description { font-size:1rem; } }
@media (max-width:768px){
  .hero-title { font-size:1.8rem; }
  .hero-description { font-size:1rem; }
  .services-grid { grid-template-columns:1fr; }
  .collaboration-content { grid-template-columns:1fr; }
}
@media (max-width:620px){ .section-title { font-size:2rem; } .hero-title { font-size:1.85rem; } .projects-grid { grid-template-columns:1fr; } }
@media (max-width:520px){ .hero-actions { flex-direction:column; } .btn-primary,.btn-secondary,.btn-outline { width:100%; } .project-filter { justify-content:flex-start; } }
</style>
