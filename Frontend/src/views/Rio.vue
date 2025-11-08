<template>
  <div class="rio-page">
    <Navbar />
    <main class="rio-content">
      <section class="rio-hero" style="padding: 4rem 1rem; text-align: center; background: linear-gradient(135deg,#eff6ff 0%, #f8fafc 100%);">
        <div style="max-width:900px; margin:0 auto;">
          <h1 style="font-size:2.5rem; font-weight:800; color:#111827; margin-bottom:1rem;">Rio</h1>
          <p style="font-size:1.125rem; color:#6b7280; line-height:1.6;">Welcome to the Rio page — a simple placeholder page created for the project. Replace this content with your custom layout and components as needed.</p>
        </div>
      </section>

      <section style="padding:2rem 1rem; max-width: 900px; margin: 2rem auto;">
        <h2 style="font-size:1.5rem; color:#111827; margin-bottom:0.75rem;">What you'll find here</h2>
        <p style="color:#374151;">This page is a starting point. Add components, data fetching, or route-specific logic inside <code>src/views/Rio.vue</code>. The route is registered at <code>/rio</code>.</p>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Rio',
  components: { Navbar, Footer }
}
</script>

<style scoped>
.rio-page { display: flex; flex-direction: column; min-height: 100vh; }
.rio-content { flex: 1; margin-top: 5rem; }
.rio-hero h1 { line-height: 1.05; }
@media (max-width: 768px) {
  .rio-hero { padding: 3rem 1rem !important; }
  .rio-hero h1 { font-size: 2rem !important; }
}
</style>
