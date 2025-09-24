<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    <main class="main-content" style="padding-top: 1.7rem;">
      <!-- Help Center Section -->
      <section class="help-section" style="max-width: 1200px; margin: 0 auto; padding: 4rem 1rem; background: white;">
        <div class="help-header" style="text-align: center; margin-bottom: 3rem;">
          <h1 style="font-size: 3rem; font-weight: 800; color: #111; margin-bottom: 1rem;">
            Help Center
          </h1>
          <p style="font-size: 1.2rem; color: #666; max-width: 700px; margin: 0 auto;">
            Find answers, get support, and learn how to make the most of your Mikaelson Initiative experience.
          </p>
        </div>

        <!-- Quick Help Categories -->
        <div class="help-categories" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          <div v-for="category in helpCategories" :key="category.id" class="help-category" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 2rem; border-radius: 16px; text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #20c9c0, #2563eb); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
              <i :class="category.icon" style="font-size: 1.8rem; color: white;"></i>
            </div>
            <h3 style="font-size: 1.3rem; font-weight: 700; color: #111; margin-bottom: 1rem;">{{ category.title }}</h3>
            <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">{{ category.description }}</p>
            <button @click="expandCategory(category.id)" style="background: #20c9c0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
              {{ expandedCategories.includes(category.id) ? 'Show Less' : 'Get Help' }}
            </button>
            
            <!-- Expanded Content -->
            <div v-show="expandedCategories.includes(category.id)" style="margin-top: 2rem; text-align: left; background: white; padding: 1.5rem; border-radius: 12px;">
              <div v-for="item in category.items" :key="item.title" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
                <h4 style="font-size: 1rem; font-weight: 600; color: #111; margin-bottom: 0.5rem;">{{ item.title }}</h4>
                <p style="color: #666; font-size: 0.9rem; line-height: 1.5;">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Help -->
        <div class="help-search" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 3rem; border-radius: 16px; text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #111; margin-bottom: 1rem;">
            Can't find what you're looking for?
          </h2>
          <p style="color: #666; margin-bottom: 2rem;">
            Search our knowledge base or contact our support team for personalized assistance.
          </p>
          <div style="display: flex; gap: 1rem; max-width: 600px; margin: 0 auto; flex-wrap: wrap; justify-content: center;">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search for help topics..."
              style="flex: 1; min-width: 200px; padding: 1rem; border: 1px solid #d1d5db; border-radius: 50px; font-size: 1rem;"
            />
            <button style="background: #2563eb; color: white; padding: 1rem 2rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
              Search
            </button>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="help-contact" style="text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #111; margin-bottom: 2rem;">
            Still Need Help?
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto;">
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
              <i class="fas fa-envelope" style="font-size: 2rem; color: #20c9c0; margin-bottom: 1rem;"></i>
              <h3 style="font-size: 1.2rem; font-weight: 600; color: #111; margin-bottom: 0.5rem;">Email Support</h3>
              <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">Get detailed help via email</p>
              <router-link to="/contact" style="text-decoration: none;">
                <button style="background: #20c9c0; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                  Contact Us
                </button>
              </router-link>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
              <i class="fab fa-whatsapp" style="font-size: 2rem; color: #25d366; margin-bottom: 1rem;"></i>
              <h3 style="font-size: 1.2rem; font-weight: 600; color: #111; margin-bottom: 0.5rem;">WhatsApp</h3>
              <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">Quick support via WhatsApp</p>
              <a href="https://wa.me/your-number" target="_blank" style="text-decoration: none;">
                <button style="background: #25d366; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                  Chat with Us
                </button>
              </a>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
              <i class="fas fa-question-circle" style="font-size: 2rem; color: #2563eb; margin-bottom: 1rem;"></i>
              <h3 style="font-size: 1.2rem; font-weight: 600; color: #111; margin-bottom: 0.5rem;">FAQ</h3>
              <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">Common questions answered</p>
              <router-link to="/faq" style="text-decoration: none;">
                <button style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                  View FAQ
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Resources and Guides -->
        <div class="help-resources" style="background: #f8fafc; padding: 3rem; border-radius: 16px;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #111; text-align: center; margin-bottom: 2rem;">
            Helpful Resources
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            <div v-for="resource in resources" :key="resource.title" style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
              <h3 style="font-size: 1.1rem; font-weight: 600; color: #111; margin-bottom: 0.5rem;">{{ resource.title }}</h3>
              <p style="color: #666; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">{{ resource.description }}</p>
              <a :href="resource.link" style="color: #20c9c0; text-decoration: underline; font-weight: 600; font-size: 0.9rem;">
                {{ resource.linkText }}
              </a>
            </div>
          </div>
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
  name: 'HelpCenter',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const expandedCategories = ref([]);
    const searchQuery = ref('');
    
    const helpCategories = ref([
      {
        id: 1,
        title: "Getting Started",
        icon: "fas fa-rocket",
        description: "Learn how to join our community and get the most out of your membership.",
        items: [
          {
            title: "How to Join the Community",
            description: "Step-by-step guide to becoming a member of the Mikaelson Initiative community."
          },
          {
            title: "Setting Up Your Profile",
            description: "Complete your profile to connect with other members and access all features."
          },
          {
            title: "Community Guidelines",
            description: "Understand our community standards and how to participate respectfully."
          }
        ]
      },
      {
        id: 2,
        title: "Programs & Events",
        icon: "fas fa-calendar-alt",
        description: "Information about our programs, workshops, and community events.",
        items: [
          {
            title: "Upcoming Events",
            description: "Stay updated on workshops, seminars, and community gatherings."
          },
          {
            title: "Program Registration",
            description: "How to register for and participate in our development programs."
          },
          {
            title: "Event Requirements",
            description: "What you need to know before attending our events and programs."
          }
        ]
      },
      {
        id: 3,
        title: "Technical Support",
        icon: "fas fa-cogs",
        description: "Get help with website issues, account problems, and technical difficulties.",
        items: [
          {
            title: "Account Issues",
            description: "Trouble logging in or accessing your account? We can help."
          },
          {
            title: "Website Problems",
            description: "Report bugs, broken links, or other technical issues."
          },
          {
            title: "Mobile App Support",
            description: "Get assistance with our mobile application and features."
          }
        ]
      },
      {
        id: 4,
        title: "Community Support",
        icon: "fas fa-users",
        description: "Connect with other members and get support from the community.",
        items: [
          {
            title: "Finding Mentors",
            description: "How to connect with mentors and advisors in our network."
          },
          {
            title: "Collaboration Opportunities",
            description: "Discover ways to collaborate with other community members."
          },
          {
            title: "Reporting Issues",
            description: "How to report problems or concerns within the community."
          }
        ]
      }
    ]);

    const resources = ref([
      {
        title: "Community Handbook",
        description: "Complete guide to making the most of your Mikaelson Initiative membership.",
        link: "#",
        linkText: "Download PDF"
      },
      {
        title: "Video Tutorials",
        description: "Watch step-by-step tutorials on using our platform and participating in programs.",
        link: "#",
        linkText: "Watch Videos"
      },
      {
        title: "Member Directory",
        description: "Connect with other members, mentors, and collaborators in our community.",
        link: "#",
        linkText: "Browse Directory"
      },
      {
        title: "Success Stories",
        description: "Read inspiring stories from community members who have achieved their goals.",
        link: "#",
        linkText: "Read Stories"
      }
    ]);

    const expandCategory = (categoryId) => {
      const index = expandedCategories.value.indexOf(categoryId);
      if (index > -1) {
        expandedCategories.value.splice(index, 1);
      } else {
        expandedCategories.value.push(categoryId);
      }
    };

    return {
      helpCategories,
      resources,
      expandedCategories,
      searchQuery,
      expandCategory
    };
  }
};
</script>

<style scoped>
.help-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

button:focus {
  outline: 2px solid #20c9c0;
  outline-offset: 2px;
}

input:focus {
  outline: 2px solid #20c9c0;
  outline-offset: 2px;
}
</style>
