<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <main class="main-content" style="padding: 6rem 1rem 2rem; max-width: 800px; margin: 0 auto;">
      <!-- Page Header -->
      <section class="contact-header" style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;">Contact Us</h1>
        <p style="font-size: 1.1rem; color: #444; line-height: 1.6;">
          Thank you for your interest in the Mikaelson Initiative. We'd love to hear from you!<br>
          Whether you have questions, feedback, or want to partner with us, drop us a message below or email us directly at 
          <a href="mailto:community@mikaelsoninitiative.org" style="color: #20c9c0; text-decoration: none; font-weight: 600;">community@mikaelsoninitiative.org</a>.
        </p>
      </section>

      <!-- Contact Form -->
      <section class="contact-form" style="background: #f8fafc; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <form>
          <div style="margin-bottom: 1rem;">
            <label for="name" style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Name</label>
            <input id="name" type="text" placeholder="Your Name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="email" style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Email</label>
            <input id="email" type="email" placeholder="your.email@example.com" required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="subject" style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Subject</label>
            <input id="subject" type="text" placeholder="Enter message subject" required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
          <div style="margin-bottom: 1rem;">
            <label for="message" style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Message</label>
            <textarea id="message" rows="6" placeholder="Your message..." required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;"></textarea>
          </div>

          <button type="submit" style="background: #20c9c0; color: #fff; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            Send Message
          </button>
        </form>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ContactUs',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
/* add any scoped styles if needed */
</style>
