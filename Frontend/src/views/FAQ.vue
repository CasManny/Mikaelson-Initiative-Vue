<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    <main class="main-content" style="padding-top: 1.7rem;">
      <!-- FAQ Section -->
      <section class="faq-section" style="max-width: 1200px; margin: 0 auto; padding: 4rem 1rem; background: white;">
        <div class="faq-header" style="text-align: center; margin-bottom: 3rem;">
          <h1 style="font-size: 3rem; font-weight: 800; color: #111; margin-bottom: 1rem;">
            Frequently Asked Questions
          </h1>
          <p style="font-size: 1.2rem; color: #666; max-width: 700px; margin: 0 auto;">
            Find answers to common questions about the Mikaelson Initiative, our community, and programs.
          </p>
        </div>

        <div class="faq-container" style="max-width: 800px; margin: 0 auto;">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item" style="margin-bottom: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <button 
              @click="toggleFAQ(index)"
              class="faq-question"
              style="width: 100%; padding: 1.5rem; background: #f8fafc; border: none; text-align: left; font-size: 1.1rem; font-weight: 600; color: #111; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.3s ease;"
            >
              <span>{{ faq.question }}</span>
              <i :class="openFAQs.includes(index) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" style="color: #20c9c0;"></i>
            </button>
            <div v-show="openFAQs.includes(index)" class="faq-answer" style="padding: 1.5rem; background: white; border-top: 1px solid #e5e7eb;">
              <p style="color: #555; line-height: 1.6; margin: 0;" v-html="faq.answer"></p>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="faq-contact" style="text-align: center; margin-top: 4rem; padding: 2rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 1rem;">
            Still have questions?
          </h3>
          <p style="color: #666; margin-bottom: 2rem;">
            Can't find the answer you're looking for? We'd love to help you out.
          </p>
          <router-link to="/contact" style="text-decoration: none;">
            <button style="background: #20c9c0; color: white; padding: 1rem 2rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
              Contact Support
            </button>
          </router-link>
        </div>
      </section>
    </main>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'FAQ',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const openFAQs = ref([]);
    
    const faqs = ref([
      {
        question: "What is the Mikaelson Initiative?",
        answer: "The Mikaelson Initiative is a youth-driven movement using technology, intentional living, and community to transform Africa from the inside out. We focus on empowering students and young changemakers across Africa through our community programs, labs, and partnership networks."
      },
      {
        question: "How can I join the Mikaelson Community?",
        answer: "You can join our community by visiting our <a href='/community' style='color: #20c9c0; text-decoration: underline;'>Community page</a> and signing up. Membership is open to ambitious students and changemakers across Africa who are committed to excellence and intentional growth."
      },
      {
        question: "What programs do you offer?",
        answer: "We offer various programs including:<br>• Personal Growth Campaigns<br>• Innovation Labs and Workshops<br>• Mentorship and Partnership Networks<br>• Community Events and Collaborations<br>• Student Leadership Development"
      },
      {
        question: "Is there a membership fee?",
        answer: "No, joining the Mikaelson Community is completely free. We believe in making personal development and community support accessible to all students and young professionals across Africa."
      },
      {
        question: "What is Mikaelson Labs?",
        answer: "Mikaelson Labs is our innovation hub where we build and experiment with new ideas to solve challenges across Africa. It's a space for creative collaboration, technology development, and solution-oriented thinking."
      },
      {
        question: "How can I contribute to the initiative?",
        answer: "There are many ways to contribute:<br>• Join our community and participate actively<br>• Volunteer for programs and events<br>• Share your skills and expertise<br>• Sponsor our programs<br>• Spread the word about our mission"
      },
      {
        question: "What universities are you currently working with?",
        answer: "We've touched 4 universities and counting, with over 3,000 students reached. We're continuously expanding our presence across African universities. Contact us if you'd like to bring the Initiative to your campus."
      },
      {
        question: "How can I contact the team?",
        answer: "You can reach us through our <a href='/contact' style='color: #20c9c0; text-decoration: underline;'>Contact page</a>, follow us on social media, or email us directly. We're always happy to hear from community members and potential collaborators."
      }
    ]);

    const toggleFAQ = (index) => {
      const faqIndex = openFAQs.value.indexOf(index);
      if (faqIndex > -1) {
        openFAQs.value.splice(faqIndex, 1);
      } else {
        openFAQs.value.push(index);
      }
    };

    return {
      faqs,
      openFAQs,
      toggleFAQ
    };
  }
};
</script>

<style scoped>
.faq-question:hover {
  background: #e2e8f0 !important;
}

button:focus {
  outline: 2px solid #20c9c0;
  outline-offset: 2px;
}
</style>
