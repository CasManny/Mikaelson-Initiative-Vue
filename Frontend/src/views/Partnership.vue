<template>
  <div>
    <Navbar />
    <main class="main-content" style="padding-top: 6rem;">
      <!-- Header Section -->
      <section class="network-header" style="text-align: center; padding: 4rem 1rem; background: #eef2ff;">
        <h1 style="font-size: 3rem; font-weight: 800; color: #111;">Partnership & Growth Network</h1>
        <p style="font-size: 1.2rem; color: #555; max-width: 800px; margin: 1rem auto;">
          Our network connects students with mentors, resources, and opportunities to foster collaboration and accelerate growth.
        </p>
      </section>

      <!-- Partners Showcase -->
      <section class="partners-showcase" style="padding: 4rem 1rem; text-align: center; background: white;">
        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">Our Partners</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
          <img src="/assets/images/mikaelsonlogo.png" alt="Partner 1" style="height: 80px;" />
          <img src="/assets/images/hero-img.jpg" alt="Partner 2" style="height: 80px; object-fit:cover;" />
          <img src="/assets/images/20240726_164330.jpeg" alt="Partner 3" style="height: 80px; object-fit:cover;" />
        </div>
      </section>

      <!-- How to Partner -->
      <section class="how-to-partner" style="padding: 4rem 1rem; background-color: #f8fafc; text-align: center;">
        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">How to Partner with Us</h2>
        <ol style="max-width: 800px; margin: 0 auto; text-align: left; font-size: 1.1rem; line-height: 1.6;">
          <li>Contact us at <a href="mailto:partnerships@mikaelsoninitiative.com">partnerships@mikaelsoninitiative.com</a></li>
          <li>Discuss partnership opportunities tailored to your organization.</li>
          <li>Select a partnership package and sign the agreement.</li>
          <li>Collaborate on programs and monitor impact together.</li>
        </ol>
      </section>

      <!-- Contact / Call to Action -->
      <section class="contact-cta" style="padding: 4rem 1rem; text-align: center; background: #fff;">
        <p style="font-size: 1.2rem; color: #333;">Ready to join our network? Get in touch to start a meaningful partnership.</p>
        <button style="margin-top: 1.5rem; background: #20c9c0; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 2rem; font-weight: 600; cursor: pointer;">
          Contact Us
        </button>
      </section>

      <!-- Our Team of Impact -->
      <section class="team-impact" style="padding: 4rem 1rem; text-align: center; background: #f8fafc;">
        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; color: #111;">Our Team of Impact</h2>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Partnership',
  components: { Navbar, Footer },
}
</script>

<style scoped>
/* Scoped styles for Partnership page */
.main-content {
  scroll-behavior: smooth;
}
</style>
