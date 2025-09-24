<template>
  <div>
    <Navbar />
    <main class="main-content" style="padding-top: 6rem;">
      <section class="sponsor-header" style="text-align: center; padding: 4rem 1rem; background: rgba(92, 225, 230, 0.5); border-radius:24px; max-width:1200px; margin:0 auto;">
        <h1 style="font-size: 3rem; font-weight: 800; color: #111;">Sponsor and Support Our Initiative</h1>
        <p style="font-size: 1.2rem; color: #555; max-width: 800px; margin: 1rem auto;">
          Your support empowers the next generation of African leaders, builders, and innovators. By sponsoring a program, you directly contribute to our mission of transforming the continent from the inside out.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
          <button @click="showIndividualOptions = true" style="background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1.1rem;">As an Individual</button>
          <button @click="showCompanyOptions = true" style="background: #1f2937; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1.1rem;">As a Company/Organization</button>
        </div>
        
        <!-- Individual Payment Options -->
        <div v-if="showIndividualOptions" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
          <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 50px rgba(0,0,0,0.3);">
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #111; text-align: center;">Choose Payment Method</h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
              <button @click="openPaystack" style="background: #20c9c0; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Mobile Payment (Paystack)</button>
              <button @click="showWireTransfer = true; showIndividualOptions = false" style="background: #6b7280; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Wire Transfer</button>
            </div>
            <div style="text-align: center;">
              <button @click="showIndividualOptions = false" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 1rem; border: none; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Close</button>
            </div>
          </div>
        </div>

        <!-- Company Payment Options -->
        <div v-if="showCompanyOptions" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
          <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 50px rgba(0,0,0,0.3);">
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #111; text-align: center;">Choose Payment Method</h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
              <button @click="openPaystack" style="background: #20c9c0; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Mobile Payment (Paystack)</button>
              <button @click="showWireTransfer = true; showCompanyOptions = false" style="background: #6b7280; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Wire Transfer</button>
            </div>
            <div style="text-align: center;">
              <button @click="showCompanyOptions = false" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 1rem; border: none; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Close</button>
            </div>
          </div>
        </div>

        <!-- Wire Transfer Details -->
        <div v-if="showWireTransfer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
          <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 50px rgba(0,0,0,0.3);">
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #111; text-align: center;">Wire Transfer Details</h3>
            <div style="text-align: left; font-size: 1rem; line-height: 1.6; color: #333; margin-bottom: 1.5rem;">
              <p><strong>Bank Name:</strong> Example Bank</p>
              <p><strong>Account Name:</strong> Mikaelson Initiative</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Routing Number:</strong> 123456789</p>
              <p><strong>SWIFT Code:</strong> EXAMPLEXXX</p>
              <p style="margin-top: 1rem; font-style: italic; color: #555;">Please email us at community@mikaelsoninitiative.org with your transfer confirmation.</p>
            </div>
            <div style="text-align: center;">
              <button @click="showWireTransfer = false" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 1rem; border: none; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Close</button>
            </div>
          </div>
        </div>
      </section>
      <!-- Sponsors Showcase Section -->
      <section class="sponsors-showcase" style="padding: 4rem 1rem; text-align: center; background: white;">
        <div style="background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 16px; padding: 2rem; margin: 0 auto 3rem auto; max-width: 900px; backdrop-filter: blur(10px); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0; color: #111;">Organizations and Individuals that supports and believes in our goal</h2>
        </div>
        <div style="overflow: hidden; width: 100%; position: relative;">
          <div class="logo-slider" style="display: flex; gap: 3rem; animation: slideLeft 20s linear infinite; white-space: nowrap; width: calc(200% + 6rem);">
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 1" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 2" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 3" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 4" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 5" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 6" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 7" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 8" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 9" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 10" style="height: 120px; flex-shrink: 0;" />
            <!-- Duplicate set for seamless loop -->
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 1 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 2 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 3 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 4 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 5 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 6 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 7 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 8 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 9 Duplicate" style="height: 120px; flex-shrink: 0;" />
            <img src="/assets/images/mikaelsonlogo.png" alt="Sponsor 10 Duplicate" style="height: 120px; flex-shrink: 0;" />
          </div>
        </div>
      </section>

      <section class="sponsorship-options" style="padding: 4rem 1rem;">
        <div style="width: 90%; max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem;">Ways to Give</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            
            <div class="sponsorship-card" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
              <h3 style="font-size: 1.8rem; font-weight: 700; color: #2563eb;">Sponsor a Student</h3>
              <p style="margin: 1rem 0; color: #333;">Provide a full scholarship for a promising student to participate in our intensive programs, covering mentorship, resources, and community access.</p>
              <button style="background: #2563eb; color: white; padding: 0.8rem 1.5rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer;">Donate Now</button>
            </div>

            <div class="sponsorship-card" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
              <h3 style="font-size: 1.8rem; font-weight: 700; color: #20c9c0;">Fund a Workshop</h3>
              <p style="margin: 1rem 0; color: #333;">Enable us to host specialized workshops on topics like software development, entrepreneurship, and intentional living for our community.</p>
              <button style="background: #20c9c0; color: white; padding: 0.8rem 1.5rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer;">Give Today</button>
            </div>

            <div class="sponsorship-card" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center;">
              <h3 style="font-size: 1.8rem; font-weight: 700; color: #1f2937;">Become a Partner</h3>
              <p style="margin: 1rem 0; color: #333;">Join our network of corporate partners committed to fostering talent and driving innovation in Africa. Let's build the future together.</p>
              <button style="background: #1f2937; color: white; padding: 0.8rem 1.5rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer;">Contact Us</button>
            </div>

          </div>
        </div>
      </section>

      <section class="partners-showcase" style="padding: 4rem 1rem; text-align: center; background: white;">
        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">Our Partners</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
          <img src="@assets/images/mikaelsonlogo.png" alt="Partner 1" style="height: 80px;" />
          <img src="@assets/images/mikaelsonlogo.png" alt="Partner 2" style="height: 80px;" />
          <img src="@assets/images/mikaelsonlogo.png" alt="Partner 3" style="height: 80px;" />
          <img src="@assets/images/mikaelsonlogo.png" alt="Partner 4" style="height: 80px;" />
        </div>
      </section>

      <section class="how-to-partner" style="padding: 4rem 1rem; background-color: #eef2ff; text-align: center;">
        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">How to Partner with Us</h2>
        <ol style="max-width: 800px; margin: 0 auto; text-align: left; font-size: 1.1rem; line-height: 1.6;">
          <li>Contact us at <a href="mailto:community@mikaelsoninitiative.org">community@mikaelsoninitiative.org</a></li>
          <li>Discuss partnership opportunities tailored to your organization.</li>
          <li>Select a partnership package and sign the agreement.</li>
          <li>Collaborate on programs and monitor impact together.</li>
        </ol>
      </section>

      <section class="contact-for-sponsorship" style="padding: 4rem 1rem; background-color: #eef2ff; text-align: center;">
        <h2 style="font-size: 2.2rem; font-weight: 700;">Have a different idea?</h2>
        <p style="font-size: 1.1rem; color: #555; margin: 1rem 0 2rem 0;">We are open to creative partnerships and custom sponsorship packages.</p>
        <a href="mailto:community@mikaelsoninitiative.org" style="font-size: 1.2rem; font-weight: 600; color: #1f2937; text-decoration: none;">community@mikaelsoninitiative.org</a>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Sponsor",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      showIndividualOptions: false,
      showCompanyOptions: false,
      showWireTransfer: false,
    };
  },
  methods: {
    openPaystack() {
      // Redirect to Paystack payment page
      window.open('https://paystack.com/pay/mikaelson-initiative', '_blank');
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for the sponsor page here */

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.logo-slider {
  will-change: transform;
  animation: slideLeft 20s linear infinite;
}

.logo-slider:hover {
  animation-play-state: paused;
}

/* Ensure animation works on all browsers */
.sponsors-showcase {
  overflow: hidden;
}
</style>
