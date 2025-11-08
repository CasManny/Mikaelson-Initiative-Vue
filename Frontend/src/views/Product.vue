<template>
  <div class="product-page">
    <Navbar />

    <!-- Hero Section (Vite-inspired) -->
    <section class="hero-vite" role="region" aria-label="RIO AI hero">
      <div class="hero-visuals" aria-hidden="true">
        <canvas class="particles-canvas"></canvas>
        <div class="neon-lines"></div>
      </div>

      <div class="hero-inner container">
        <div class="hero-copy">
          <div class="top-badge">🌍 Part of The Mikaelson Labs Ecosystem</div>
          <h1 class="hero-headline">
            The Intelligent Productivity Companion
            <br />
            <span class="hero-headline--strong">for Communities and Classrooms</span>
          </h1>

          <p class="hero-sub">RIO AI is a community-driven productivity platform designed to help users build habits, track challenges, and stay accountable through social engagement, leaderboards, and AI-driven nudges — all in a single, cohesive web experience.</p>

          <div class="hero-ctas">
            <router-link class="btn primary-hero" :to="{ name: 'Signup' }">Get Started</router-link>
            <router-link class="btn ghost-hero" :to="{ name: 'ProductDetail', params: { id: 'hub' } }">Learn More</router-link>
          </div>
        </div>

        <div class="hero-preview" aria-hidden="true">
          <!-- decorative SVG / placeholder for designer -->
          <img src="/assets/images/product-hub.svg" alt="RIO Hub preview" />
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Our Products</h2>
        <div class="products-grid">
          <div class="product-card" v-for="product in products" :key="product.id">
            <div class="card-header">
              <img :src="product.image" :alt="product.title" class="product-icon" />
              <h3>{{ product.title }}</h3>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <ul class="features-list">
              <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
            </ul>
            <router-link class="learn-more" :to="{ name: 'ProductDetail', params: { id: product.id } }">
              Learn More <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Choose Your Product</h4>
            <p>Select the RIO AI tool that fits your needs</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>Integrate & Customize</h4>
            <p>Seamlessly integrate with your existing workflows</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>Scale & Grow</h4>
            <p>Monitor impact and scale your initiatives</p>
          </div>
        </div>
      </div>
    </section>

    <!-- RIO Hub Intro (follows hero) -->
    <section class="rio-hub container" aria-labelledby="rio-hub-heading">
      <h2 id="rio-hub-heading">RIO Hub — Redefining Productivity in Education</h2>

      <div class="rio-copy">
        <p>
          RIO Hub is a productivity and learning tracker designed to support students and educators in the educational sector. It monitors academic progress, study habits, assignment completion, and engagement, providing actionable insights to help students optimize their learning and achieve their goals.
        </p>

        <p>
          At the same time, it evaluates educator effectiveness, highlighting which teaching methods are most impactful — enabling schools to identify and address gaps in instruction.
        </p>

        <p>
          By collecting anonymized, data-driven insights, RIO Hub helps institutions make informed decisions about curriculum design, resource allocation, and student support programs. It encourages students to take ownership of their learning while fostering accountability among educators, creating a more structured and results-driven educational environment.
        </p>

        <p class="rio-highlight">🎯 Bridging the gap between teaching and learning outcomes — empowering the next generation of achievers.</p>

        <div class="rio-ctas">
          <router-link class="btn hub-explore" :to="{ name: 'ProductDetail', params: { id: 'hub' } }">Explore RIO Hub</router-link>
          <router-link class="btn hub-waitlist" :to="{ name: 'Signup' }">Join the Waitlist</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">What Our Users Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial">
            <p>"RIO Hub transformed how we manage community projects. The AI insights are game-changing."</p>
            <cite>- Sarah Johnson, Community Manager</cite>
          </div>
          <div class="testimonial">
            <p>"The energy optimization features helped us reduce costs by 30%. Highly recommend!"</p>
            <cite>- Michael Chen, Sustainability Lead</cite>
          </div>
          <div class="testimonial">
            <p>"RIO Accelerator sped up our program delivery. It's like having an expert team on call."</p>
            <cite>- Amina Hassan, Program Director</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="container">
        <h2>Ready to Transform Your Community?</h2>
        <p>Join thousands of organizations using RIO AI to drive meaningful change</p>
        <div class="cta-buttons">
          <router-link class="btn primary" :to="{ name: 'Signup' }">Start Free Trial</router-link>
          <router-link class="btn secondary" :to="{ name: 'ContactUs' }">Contact Sales</router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Product',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      products: [
        {
          id: 'hub',
          title: 'RIO Hub',
          description: 'Centralize data, users, and integrations. Manage teams, permissions, and sync across services.',
          image: '/assets/images/product-hub.svg',
          features: ['Multi-platform integration', 'Real-time analytics', 'Team collaboration tools']
        },
        {
          id: 'energy',
          title: 'RIO Energy',
          description: 'AI-driven insights to optimize resource usage and reduce operational costs.',
          image: '/assets/images/product-energy.svg',
          features: ['Energy consumption tracking', 'Cost optimization algorithms', 'Sustainability reporting']
        },
        {
          id: 'accelerator',
          title: 'RIO Accelerator',
          description: 'Pre-built workflows and templates to accelerate program delivery and impact measurement.',
          image: '/assets/images/product-accelerator.svg',
          features: ['Ready-to-use templates', 'Automated reporting', 'Impact measurement tools']
        }
      ]
    }
  },
  mounted() {
    document.title = 'RIO AI Products - Mikaelson Initiative'
    // initialize simple particle effect for hero canvas (lightweight)
    this.$nextTick(() => {
      try {
        const canvas = document.querySelector('.particles-canvas')
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1
        function resize() {
          canvas.width = canvas.clientWidth * dpr
          canvas.height = canvas.clientHeight * dpr
        }
        resize()
        window.addEventListener('resize', resize)

        const particles = []
        for (let i = 0; i < 28; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 0.6 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: 0.2 + Math.random() * 0.6
          })
        }

        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          particles.forEach(p => {
            p.x += p.vx
            p.y += p.vy
            if (p.x < 0) p.x = canvas.width
            if (p.x > canvas.width) p.x = 0
            if (p.y < 0) p.y = canvas.height
            if (p.y > canvas.height) p.y = 0

            ctx.beginPath()
            ctx.fillStyle = `rgba(173,0,255,${p.alpha})`
            ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
            ctx.fill()
          })
          requestAnimationFrame(draw)
        }

        draw()
      } catch (e) {
        // silent fail - visuals are decorative only
        // console.warn('particle init failed', e)
      }
    })
  }
}
</script>

<style scoped>
.product-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  height: 80vh;
  background: linear-gradient(135deg, var(--accent) 0%, var(--dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.cta-btn {
  display: inline-block;
  background: var(--accent);
  color: var(--ink);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.cta-btn:hover {
  transform: translateY(-2px);
}

/* Products Section */
.products-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--ink);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #e5e7eb;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.card-header h3 {
  font-size: 1.5rem;
  color: var(--ink);
  margin: 0;
}

.product-description {
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.features-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: var(--muted);
}

.features-list li:before {
  content: "✓";
  color: var(--accent);
  font-weight: bold;
  margin-right: 0.5rem;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.2s;
}

.learn-more:hover {
  gap: 0.75rem;
}

/* How It Works */
.how-it-works {
  padding: 5rem 0;
  background: white;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.step {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 1rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--accent);
  color: var(--ink);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--ink);
}

.step p {
  color: var(--muted);
  line-height: 1.6;
}

/* Testimonials */
.testimonials {
  padding: 5rem 0;
  background: #f8fafc;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--accent);
}

.testimonial p {
  font-style: italic;
  margin-bottom: 1rem;
  color: var(--muted);
  line-height: 1.6;
}

.testimonial cite {
  font-weight: 600;
  color: var(--ink);
}

/* Final CTA */
.final-cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--dark) 0%, var(--ink) 100%);
  color: white;
  text-align: center;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.final-cta p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn.primary {
  background: var(--accent);
  color: var(--ink);
}

.btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .final-cta h2 {
    font-size: 2rem;
  }
}
</style>
