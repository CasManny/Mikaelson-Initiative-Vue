<template>
  <div class="product-detail-page">
    <Navbar />
    <main class="detail-content">
      <section class="detail-hero">
        <div class="inner">
          <button class="kicker">PRODUCT</button>
          <h1>{{ product.title }}</h1>
          <p class="tagline">{{ product.tagline }}</p>
        </div>
      </section>

      <section class="detail-body">
        <div class="container">
          <div class="media" v-if="product.image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="info">
            <h2>Overview</h2>
            <p>{{ product.description }}</p>

            <h3>Key features</h3>
            <ul>
              <li v-for="(f, i) in product.features" :key="i">{{ f }}</li>
            </ul>

            <div class="actions">
              <button @click="$router.back()" class="secondary">Back</button>
              <button class="primary" @click="contactProduct">Contact team</button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ProductDetail',
  components: { Navbar, Footer },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id

    // For now use a small local dataset to resolve details. In future, replace with API/store.
    const products = [
      { id: 'p1', title: 'Community Hub', tagline: 'Connect — Learn — Grow', description: 'A lightweight community platform designed to help local groups share resources, events, and support each other.', features: ['Event scheduling', 'Resource sharing', 'Localized content'], image: '/assets/images/product-hub.svg' },
      { id: 'p2', title: 'Sustainable Energy Toolkit', tagline: 'Affordable solar solutions', description: 'A set of tools and guidelines for deploying small-scale solar power systems in remote communities.', features: ['System sizing', 'Installer marketplace', 'Maintenance guides'], image: '/assets/images/product-energy.svg' },
      { id: 'p3', title: 'Skills Accelerator', tagline: 'Train. Mentor. Place.', description: 'A program and platform to upskill young professionals with practical training, mentorship, and placement support.', features: ['Hands-on projects', 'Mentor matching', 'Job placements'], image: '/assets/images/product-accelerator.svg' }
    ]

    const product = computed(() => products.find(p => p.id === id) || products[0])

    const contactProduct = () => {
      router.push('/contact')
    }

    return { product, contactProduct }
  }
}
</script>

<style scoped>
:root{--muted:#6b7280;--accent:#5ce1e6;--dark:#374151;--ink:#111827}
.detail-content{margin-top:5rem}
.detail-hero{padding:3.5rem 1rem;text-align:center;background:linear-gradient(135deg, rgba(92,225,230,0.12), #f8fafc)}
.kicker{background:transparent;border:2px solid var(--dark);color:var(--dark);padding:.45rem .9rem;border-radius:.6rem;font-weight:700}
.detail-body{padding:2rem 1rem}
.container{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start}
.media img{width:100%;height:auto;border-radius:8px;object-fit:cover}
.info h2{margin-top:0}
.actions{margin-top:1rem;display:flex;gap:0.75rem}
.primary{background:var(--accent);border:none;color:#fff;padding:.6rem 1rem;border-radius:8px;cursor:pointer}
.secondary{background:#3b82f6;color:#fff;border:none;padding:.6rem 1rem;border-radius:.75rem}

@media(max-width:900px){.container{grid-template-columns:1fr;}}
</style>
