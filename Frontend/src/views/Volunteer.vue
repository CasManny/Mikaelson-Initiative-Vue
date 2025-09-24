<template>
  <div class="volunteer-page">
    <Navbar />
    <main class="main-content" style="padding-top: 80px; margin-top: 0;">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <h1 class="hero-title">Join Our Mission</h1>
            <p class="hero-subtitle">
              Be part of Africa's transformation. Connect with like-minded changemakers, 
              contribute your skills, and help build a brighter future for our continent.
            </p>
            <button class="hero-cta" @click="scrollToForm">
              Start Your Journey
              <svg class="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ stats.volunteers }}+</span>
              <span class="stat-label">Active Volunteers</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.countries }}+</span>
              <span class="stat-label">Countries</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.projects }}+</span>
              <span class="stat-label">Projects</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Volunteer Section -->
      <section class="why-volunteer">
        <div class="container">
          <h2 class="section-title">Why Volunteer With Us?</h2>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🌍</div>
              <h3>Global Impact</h3>
              <p>Contribute to projects that reach across Africa and create lasting change in communities.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🚀</div>
              <h3>Skill Development</h3>
              <p>Gain valuable experience, learn new technologies, and grow your professional network.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🤝</div>
              <h3>Community</h3>
              <p>Join a vibrant community of innovators, entrepreneurs, and changemakers.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">💡</div>
              <h3>Innovation</h3>
              <p>Work on cutting-edge projects using the latest technologies and methodologies.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Application Form Section -->
      <section class="application-form" ref="formSection">
        <div class="container">
          <div class="form-header">
            <h2>Apply to Volunteer</h2>
            <p>Tell us about yourself and how you'd like to contribute</p>
          </div>

          <div class="form-cta" style="text-align: center; margin-top: 2rem;">
            <a 
              href="https://forms.gle/UYgZGfb4sthtP19z6" 
              target="_blank" 
              rel="noopener" 
              class="submit-button"
            >
              Apply now
            </a>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="container">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-list">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="faq-item"
              :class="{ open: faq.open }"
            >
              <button 
                @click="toggleFaq(index)" 
                class="faq-question"
                :aria-expanded="faq.open"
              >
                {{ faq.question }}
                <svg class="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div v-if="faq.open" class="faq-answer">
                {{ faq.answer }}
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
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Volunteer',
  components: { Navbar, Footer },
  setup() {
    const form = reactive({
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      availabilityHours: '',
      startDate: '',
      skills: '',
      message: '',
      referral: '',
      roles: []
    })

    const submitting = ref(false)
    const submitted = ref(false)
    const statusMessage = ref('Ready to apply')
    
    const stats = reactive({
      volunteers: 180,
      countries: 12,
      projects: 42
    })

    const roleOptions = [
      { 
        value: 'engineering', 
        label: 'Engineering', 
        description: 'Software development, technical architecture' 
      },
      { 
        value: 'design', 
        label: 'Design', 
        description: 'UI/UX, graphics, user experience' 
      },
      { 
        value: 'marketing', 
        label: 'Marketing', 
        description: 'Digital marketing, content creation' 
      },
      { 
        value: 'community', 
        label: 'Community', 
        description: 'Community management, events' 
      },
      { 
        value: 'research', 
        label: 'Research', 
        description: 'Data analysis, market research' 
      },
      { 
        value: 'mentorship', 
        label: 'Mentorship', 
        description: 'Guide and support other volunteers' 
      },
      { 
        value: 'partnerships', 
        label: 'Partnerships', 
        description: 'Business development, collaborations' 
      },
      { 
        value: 'operations', 
        label: 'Operations', 
        description: 'Project management, logistics' 
      }
    ]

    const errors = reactive({})

    const validateField = (field) => {
      switch (field) {
        case 'name':
          errors.name = form.name.trim().length < 2 ? 'Name must be at least 2 characters' : ''
          break
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          errors.email = !emailRegex.test(form.email) ? 'Please enter a valid email address' : ''
          break
        case 'phone':
          errors.phone = form.phone && form.phone.length < 10 ? 'Please enter a valid phone number' : ''
          break
        case 'linkedin':
          errors.linkedin = form.linkedin && !form.linkedin.includes('linkedin.com') ? 'Please enter a valid LinkedIn URL' : ''
          break
        case 'github':
          errors.github = form.github && !form.github.includes('github.com') ? 'Please enter a valid GitHub URL' : ''
          break
        case 'availabilityHours':
          errors.availabilityHours = !form.availabilityHours || form.availabilityHours < 1 ? 'Please enter hours per week' : ''
          break
        case 'skills':
          errors.skills = form.skills.trim().length < 20 ? 'Please provide more details about your skills (minimum 20 characters)' : ''
          break
        case 'message':
          errors.message = form.message.trim().length < 30 ? 'Please tell us more about your motivation (minimum 30 characters)' : ''
          break
        case 'roles':
          errors.roles = form.roles.length === 0 ? 'Please select at least one area of interest' : ''
          break
        default:
          break
      }
    }

    const validateAll = () => {
      const requiredFields = ['name', 'email', 'availabilityHours', 'skills', 'message', 'roles']
      const optionalFields = ['phone', 'linkedin', 'github']
      
      // Validate required fields
      requiredFields.forEach(validateField)
      
      // Validate optional fields only if they have values
      optionalFields.forEach(field => {
        if (form[field]) {
          validateField(field)
        } else {
          errors[field] = ''
        }
      })
    }

    const isFormValid = computed(() => {
      validateAll()
      return Object.values(errors).every(error => !error) && 
             form.name.trim().length >= 2 &&
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
             form.availabilityHours >= 1 &&
             form.skills.trim().length >= 20 &&
             form.message.trim().length >= 30 &&
             form.roles.length > 0
    })

    const formSection = ref(null)
    const confettiCanvas = ref(null)

    const scrollToForm = () => {
      formSection.value?.scrollIntoView({ behavior: 'smooth' })
    }

    const fireConfetti = () => {
      const canvas = confettiCanvas.value
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        size: Math.random() * 6 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      }))

      let frame = 0
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.rotation += particle.rotationSpeed
          
          if (particle.y > canvas.height) {
            particle.y = -10
            particle.x = Math.random() * canvas.width
          }
          
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate((particle.rotation * Math.PI) / 180)
          ctx.fillStyle = particle.color
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
          ctx.restore()
        })
        
        if (frame < 300) {
          requestAnimationFrame(animate)
          frame++
        }
      }
      
      animate()
    }

    const onSubmit = async () => {
      validateAll()
      
      if (!isFormValid.value) {
        statusMessage.value = 'Please complete all required fields'
        return
      }

      submitting.value = true
      statusMessage.value = 'Submitting your application...'

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Analytics event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('volunteer_application_submitted', {
            detail: { ...form }
          }))
        }

        submitted.value = true
        statusMessage.value = 'Application submitted successfully!'
        
        await nextTick()
        fireConfetti()
      } catch (error) {
        statusMessage.value = 'Something went wrong. Please try again.'
        console.error('Submission error:', error)
      } finally {
        submitting.value = false
      }
    }

    const resetForm = () => {
      Object.keys(form).forEach(key => {
        form[key] = Array.isArray(form[key]) ? [] : ''
      })
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
      submitted.value = false
      submitting.value = false
      statusMessage.value = 'Ready to apply'
    }

    const faqs = ref([
      {
        question: 'How much time do I need to commit?',
        answer: 'Most volunteer roles require 3-10 hours per week, depending on your availability and the project needs. We work with your schedule.',
        open: false
      },
      {
        question: 'Is this opportunity remote?',
        answer: 'Yes! Most of our volunteer opportunities are remote-friendly. Some projects may have optional in-person events or meetups.',
        open: false
      },
      {
        question: 'Do I need specific qualifications?',
        answer: 'We welcome volunteers from all backgrounds! What matters most is your passion, commitment, and willingness to learn.',
        open: false
      },
      {
        question: 'Will I receive any certification?',
        answer: 'Yes, we provide volunteer certificates and recognition letters that you can use for your professional portfolio.',
        open: false
      },
      {
        question: 'Can I volunteer while working full-time?',
        answer: 'Absolutely! Many of our volunteers balance this with their full-time jobs. We offer flexible scheduling and various commitment levels.',
        open: false
      }
    ])

    const toggleFaq = (index) => {
      faqs.value[index].open = !faqs.value[index].open
    }

    onMounted(() => {
      statusMessage.value = 'Ready to apply'
    })

    return {
      form,
      submitting,
      submitted,
      statusMessage,
      stats,
      roleOptions,
      errors,
      validateField,
      isFormValid,
      formSection,
      confettiCanvas,
      scrollToForm,
      onSubmit,
      resetForm,
      faqs,
      toggleFaq
    }
  }
}
</script>

<style scoped>
/* Global */
.volunteer-page {
  min-height: 100vh;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.hero {
  width: 100vw; /* Full viewport width */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: #f8fafc;
  padding: 4rem 0;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 4rem;
}

.hero-container {
  max-width: 1400px; /* Increased max-width for better desktop layout */
  margin: 0 auto;
  padding: 6rem 3rem; /* Increased padding for desktop */
  background: rgba(92, 225, 230, 0.4);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 5rem; /* Increased gap for better spacing */
  align-items: center;
  min-height: 600px; /* Increased height for desktop */
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.hero-content {
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #374151;
  margin: 0 0 2.5rem 0;
  line-height: 1.6;
}

.hero-cta {
  background: #5ce1e6 !important;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(92, 225, 230, 0.35);
}

.hero-cta:hover {
  background: #31cfd7 !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(92, 225, 230, 0.45);
}

.cta-icon {
  width: 20px;
  height: 20px;
}

.hero-stats {
  display: grid;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb, #14b8a6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

/* Why Volunteer Section */
.why-volunteer {
  padding: 6rem 0;
  background: #f9fafb;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin: 0 0 3rem 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.benefit-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.benefit-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.benefit-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Application Form */
.application-form {
  padding: 6rem 0;
  background: white;
}

.form-header {
  text-align: center;
  margin-bottom: 4rem;
}

.form-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.form-header p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.form-cta {
  max-width: 900px;
  margin: 0 auto;
}

.submit-button {
  background: linear-gradient(135deg, #2563eb, #14b8a6);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
  text-decoration: none;
  color: white;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-button.loading {
  pointer-events: none;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.button-icon {
  width: 20px;
  height: 20px;
}

.loading-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.form-status {
  margin-top: 1rem;
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Success State */
.success-state {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.success-content {
  background: white;
  padding: 4rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.success-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.success-content p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button {
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.primary-button {
  background: #2563eb;
  color: white;
}

.primary-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.secondary-button {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.secondary-button:hover {
  background: #e5e7eb;
}

.confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
}

/* FAQ Section */
.faq-section {
  padding: 6rem 0;
  background: #f9fafb;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-item.open {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f9fafb;
}

.faq-icon {
  width: 20px;
  height: 20px;
  color: #6b7280;
  transition: transform 0.3s ease;
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #6b7280;
  line-height: 1.6;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Desktop-specific enhancements */
@media (min-width: 1200px) {
  .hero {
    padding: 6rem 0;
  }
  
  .hero-container {
    max-width: 1600px;
    padding: 8rem 4rem;
    gap: 6rem;
    min-height: 650px;
  }
  
  .hero-title {
    font-size: 4rem;
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
  }
}

/* Tablet styles */
@media (max-width: 1024px) and (min-width: 769px) {
  .hero-container {
    max-width: 900px;
    padding: 4rem 2rem;
    gap: 3rem;
    min-height: 500px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
}

/* Responsive Design - Mobile styles only */
@media (max-width: 768px) {
  .hero {
    width: 100%;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
    padding: 3rem 0;
  }
  
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding: 4rem 1.5rem;
    min-height: auto;
    max-width: 100%;
    margin: 0 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .volunteer-form {
    padding: 2rem 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
  
  .success-content {
    padding: 3rem 2rem;
  }
  
  .success-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .volunteer-form {
    padding: 1.5rem 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .volunteer-page {
    background: #111827;
  }
  
  .hero {
    background: #111827;
  }
  
  .hero-container {
    background: rgba(20, 184, 166, 0.3); /* keep dark mode tint consistent */
    box-shadow: 0 2px 20px rgba(0,0,0,0.4);
  }
  
  .hero-title,
  .section-title,
  .form-section-title,
  .field-label {
    color: #f9fafb;
  }
  
  .hero-subtitle {
    color: #d1d5db;
  }
  
  .why-volunteer,
  .faq-section {
    background: #1f2937;
  }
  
  .benefit-card,
  .volunteer-form,
  .success-content,
  .faq-item {
    background: #374151;
    border-color: #4b5563;
  }
  
  .field-input,
  .field-textarea {
    background: #4b5563;
    border-color: #6b7280;
    color: #f9fafb;
  }
  
  .field-input::placeholder,
  .field-textarea::placeholder {
    color: #9ca3af;
  }
  
  .interest-card {
    background: #4b5563;
    border-color: #6b7280;
  }
  
  .interest-card:hover,
  .interest-card.selected {
    background: #1e3a8a;
    border-color: #2563eb;
  }
}
</style>
