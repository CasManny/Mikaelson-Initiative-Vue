<template>
  <div class="team-page">
    <Navbar />
    <main class="team-content">
      <!-- Team Hero Section (updated to match Home.vue hero proportions) -->
      <section class="team-hero-section" style="background: #fff; padding: 2rem 0;">
        <div style="width:100%; max-width:1200px; margin:0 auto;">
          <div class="team-hero-box" style="background: rgba(92, 225, 230, 0.5); padding: 5rem 2rem; border-radius: 24px; min-height: 550px; display:flex; align-items:center; justify-content:center;">
            <div style="text-align: center; max-width: 680px;">
              <button style="background: transparent; border: 2px solid #374151; color: #374151; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; padding: 0.6rem 1.25rem; border-radius: 0.75rem; cursor: pointer;">MEET THE TEAM</button>
              <h1 style="font-size: 2.9rem; font-weight: 800; margin: 0 0 1.25rem; color: #111827; line-height:1.15; letter-spacing:-0.02em;">Meet the Change Makers</h1>
              <p style="font-size: 1.25rem; line-height: 1.7; color: #374151; font-weight:500; margin:0;">Discover the passionate individuals driving the Mikaelson Initiative forward. Our dedicated team works tirelessly to create meaningful impact and transform ideas into reality, one project at a time.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Team of Impact -->
      <section class="team-impact" style="padding: 4rem 1rem; text-align: center; background: #f8fafc; margin-top: 4rem;">
        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; color: #111;">Our Team of Impact</h2>
        <h3 style="font-size: 1.5rem; font-weight: 500; margin-bottom: 2rem; color: #6b7280; max-width: 800px; margin-left: auto; margin-right: auto;">Shaping the future of Africa with community backed by sustainable technology</h3>
      </section>

      <!-- Filter Buttons Section -->
      <section class="filter-section" style="padding: 2rem 1rem; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; max-width: 1200px; margin: 0 auto;">
          <div style="display: flex; gap: 1rem;">
            <button @click="showCategory('all')" :style="{ 
              background: activeCategory === 'all' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'all' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">All</button>
            <button @click="showCategory('engineers')" :style="{ 
              background: activeCategory === 'engineers' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'engineers' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">Tech team</button>
            <button @click="showCategory('operations')" :style="{ 
              background: activeCategory === 'operations' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'operations' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">Operations</button>
            <button @click="showCategory('mentors')" :style="{ 
              background: activeCategory === 'mentors' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'mentors' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">Mentors</button>
            <button @click="showCategory('advisors')" :style="{ 
              background: activeCategory === 'advisors' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'advisors' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">Advisors & Patrons</button>
            <button @click="showCategory('trustees')" :style="{ 
              background: activeCategory === 'trustees' ? '#5ce1e6' : 'transparent', 
              border: '2px solid #5ce1e6', 
              color: activeCategory === 'trustees' ? 'white' : '#5ce1e6', 
              fontSize: '1rem', 
              fontWeight: '500', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }">Board of Trustees</button>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search team members by name or role..."
              aria-label="Search team members"
              style="padding: 0.5rem 1rem; border: 2px solid #374151; border-radius: 0.5rem; font-size: 1rem; outline: none; width: 260px;"
            >
          </div>
        </div>
      </section>

      <!-- Team Members Grid -->
      <section class="team-members" style="padding: 2rem 1rem; background: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <!-- All Team Members -->
          <div id="all-members" v-show="activeCategory === 'all'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in allTeamMembersFiltered" 
              :key="'all-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <p v-if="hasSearch && allTeamMembersFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>

          <!-- Engineers -->
          <div id="engineers" v-show="activeCategory === 'engineers'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in engineersFiltered" 
              :key="'eng-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <p v-if="hasSearch && engineersFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>

          <!-- Operations Team -->
          <div id="operations" v-show="activeCategory === 'operations'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in operationsFiltered" 
              :key="'ops-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <!-- Fill remaining boxes for demonstration -->
            <div v-if="!hasSearch"
              v-for="n in Math.max(0, 10 - teamData.operations.length)" 
              :key="'ops-placeholder-' + n"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; opacity: 0.5;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">Operations {{ teamData.operations.length + n }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">Operations Specialist</p>
              </div>
            </div>
            <p v-if="hasSearch && operationsFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>

          <!-- Mentors -->
          <div id="mentors" v-show="activeCategory === 'mentors'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in mentorsFiltered" 
              :key="'mentor-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <!-- Fill remaining boxes for demonstration -->
        <div v-if="!hasSearch"
          v-for="n in Math.max(0, 10 - teamData.mentors.length)" 
              :key="'mentor-placeholder-' + n"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; opacity: 0.5;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">Mentor {{ teamData.mentors.length + n }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">Professional Mentor</p>
              </div>
            </div>
            <p v-if="hasSearch && mentorsFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>

          <!-- Advisors -->
          <div id="advisors" v-show="activeCategory === 'advisors'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in advisorsFiltered" 
              :key="'adv-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <!-- Fill remaining boxes for demonstration -->
        <div v-if="!hasSearch"
          v-for="n in Math.max(0, 10 - teamData.advisors.length)" 
              :key="'adv-placeholder-' + n"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; opacity: 0.5;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">Advisor & Patron {{ teamData.advisors.length + n }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">Strategic Advisor</p>
              </div>
            </div>
            <p v-if="hasSearch && advisorsFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>

          <!-- Board of Trustees -->
          <div id="trustees" v-show="activeCategory === 'trustees'" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            <div 
              v-for="member in trusteesFiltered" 
              :key="'trustee-' + member.id"
              @click="openMemberBio(member)"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
              :style="{ 
                backgroundImage: member.image ? ('url(' + JSON.stringify(member.image) + ')') : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
              @mouseenter="$event.target.style.transform = 'translateY(-5px)'; $event.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">{{ member.name }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">{{ member.role }}</p>
              </div>
            </div>
            <!-- Fill remaining boxes for demonstration -->
            <div v-if="!hasSearch"
              v-for="n in Math.max(0, 10 - teamData.trustees.length)" 
              :key="'trustee-placeholder-' + n"
              style="width: 350px; height: 420px; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 0.5rem; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; opacity: 0.5;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 0.25rem; text-align: center;">
                <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #374151;">Board Member {{ teamData.trustees.length + n }}</h4>
                <p style="font-size: 1rem; margin: 0.25rem 0 0 0; color: #6b7280;">Board of Trustees</p>
              </div>
            </div>
            <p v-if="hasSearch && trusteesFiltered.length === 0" style="grid-column: 1 / -1; text-align: center; color: #6b7280;">No team members match your search.</p>
          </div>
        </div>
      </section>

      <!-- Join Our Team Section -->
      <section class="join-team" style="padding: 4rem 1rem; text-align: center; background: linear-gradient(135deg, #ebf8ff 0%, #f0f9ff 100%); margin-top: 4rem;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #111827;">Join Our Team</h2>
          <h3 style="font-size: 1.25rem; font-weight: 400; margin-bottom: 2.5rem; color: #6b7280; line-height: 1.6;">
            Ready to make a difference? Join our mission to transform communities across Africa through sustainable technology and innovation. Together, we can create lasting impact and build a brighter future.
          </h3>
          <button @click="$router.push('/volunteer')" style="background: #3b82f6; color: white; font-size: 1.125rem; font-weight: 600; padding: 1rem 2rem; border: none; border-radius: 0.75rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);" 
                  onmouseover="this.style.background='#2563eb'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(59, 130, 246, 0.4)'" 
                  onmouseout="this.style.background='#3b82f6'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
            Join Us Today
          </button>
        </div>
      </section>
    </main>
    <Footer />

    <!-- Bio Modal -->
    <div v-if="showModal" @click="closeMemberBio" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
      <div @click.stop style="background: white; border-radius: 1rem; padding: 2rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
        <button @click="closeMemberBio" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">&times;</button>
        
        <div v-if="selectedMember" style="text-align: center;">
          <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem; border: 4px solid #e5e7eb;">
            <img :src="selectedMember.image" :alt="selectedMember.name" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/assets/images/placeholder.jpg'">
          </div>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #111827;">{{ selectedMember.name }}</h2>
          <p style="font-size: 1.125rem; font-weight: 500; margin-bottom: 1.5rem; color: #6b7280;">{{ selectedMember.role }}</p>
          
          <div style="text-align: left; padding: 1.5rem; background: #f8fafc; border-radius: 0.5rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; color: #374151;">About</h3>
            <p style="font-size: 1rem; line-height: 1.6; color: #4b5563;">{{ selectedMember.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Team',
  components: { Navbar, Footer },
  setup() {
    // Import Ayomide's image using Vite's URL resolution to handle spaces properly
    const ayomideImg = new URL('../../assets/images/73d4d135-9f00-4e98-9924-5ef917cc5d32 - Ayomide Oladele.jpeg', import.meta.url).href
  // Import Irene's image (handles apostrophe and spaces)
  const ireneImg = new URL("../../assets/images/IreneC'Image - Irene Ezechi.jpg", import.meta.url).href
    
    const teamData = ref({
      engineers: [
    { id: 6, name: 'Ayomide Oladele', role: 'Product Designer', image: ayomideImg, bio: 'Product designer focused on user-centered design, prototyping, and creating polished, accessible interfaces for web and mobile.' },
        { id: 7, name: 'Motolani Faloyo', role: 'Frontend Developer', image: '/assets/images/Faloyo-Deborah.jpg', bio: 'A Frontend Developer passionate about building clean, responsive, and user-friendly web applications. My journey began with a love for design and problem-solving, and I’ve grown into creating modern interfaces using frameworks like Vue.js and other web technologies. I enjoy turning ideas into interactive digital experiences and continuously improving my craft.' },
        { id: 8, name: 'Fatima Al-Rashid', role: 'Mobile Developer', image: '/assets/images/team8.jpg', bio: 'Mobile app specialist with expertise in React Native and Flutter. Focused on creating seamless mobile experiences for diverse user bases.' },
        { id: 9, name: 'Samuel Osei', role: 'Backend Engineer', image: '/assets/images/team9.jpg', bio: 'Backend systems expert with strong knowledge in cloud infrastructure and database optimization. Ensures robust and scalable platform performance.' },
        { id: 10, name: 'Lisa Chen', role: 'DevOps Engineer', image: '/assets/images/team10.jpg', bio: 'DevOps specialist focused on automation, CI/CD pipelines, and cloud infrastructure. Streamlines development processes for maximum efficiency.' }
      ],
      operations: [
        { id: 1, name: 'Oluwasegun M. Olukayode', role: 'Founder & Executive Director', image: '/assets/images/20240726_164330.jpeg', bio: 'Visionary leader with over 10 years of experience in sustainable technology and community development. Passionate about empowering African communities through innovative solutions.' },
        { id: 2, name: 'Amara Okafor', role: 'Product Manager', image: '/assets/images/team2.jpg', bio: 'Strategic product leader with expertise in developing user-centered solutions for emerging markets. Drives innovation at the intersection of technology and social impact.' },
        { id: 42, name: 'Irene Ezechi', role: 'Program Management Lead', image: ireneImg, bio: 'Program management lead coordinating planning, execution, and impact across initiatives.' },
        { id: 4, name: 'Zara Mwangi', role: 'Community Manager', image: '/assets/images/team4.jpg', bio: 'Community engagement specialist with a passion for fostering meaningful connections and driving grassroots initiatives across Africa.' },
        { id: 11, name: 'Michael Johnson', role: 'Operations Coordinator', image: '/assets/images/team11.jpg', bio: 'Operations expert with extensive experience in project management and organizational efficiency. Ensures smooth execution of all initiatives.' },
        { id: 12, name: 'Aisha Patel', role: 'Finance Manager', image: '/assets/images/team12.jpg', bio: 'Financial strategist with expertise in sustainable funding models and impact measurement. Manages resources to maximize community benefit.' },
        { id: 5, name: 'Alex Kim', role: 'UX Designer', image: '/assets/images/team5.jpg', bio: 'Creative designer focused on creating intuitive and accessible user experiences that bridge cultural and technological gaps.' },
        { id: 17, name: 'Maya Singh', role: 'Marketing Coordinator', image: '/assets/images/team17.jpg', bio: 'Digital marketing specialist with expertise in social media strategy and content creation. Amplifies our mission through compelling storytelling.' },
        { id: 18, name: 'David Chen', role: 'Data Analyst', image: '/assets/images/team18.jpg', bio: 'Data science expert focused on impact measurement and analytics. Transforms complex data into actionable insights for decision-making.' },
        { id: 19, name: 'Grace Okoye', role: 'HR Coordinator', image: '/assets/images/team19.jpg', bio: 'Human resources professional with passion for building inclusive workplace culture. Ensures team development and organizational growth.' },
        { id: 20, name: 'Ahmed Hassan', role: 'Legal Advisor', image: '/assets/images/team20.jpg', bio: 'Legal expert specializing in nonprofit law and compliance. Ensures all operations meet regulatory requirements and ethical standards.' }
      ],
      mentors: [
        { id: 27, name: 'Dr. Amina Hassan', role: 'Leadership Mentor', image: '/assets/images/team27.jpg', bio: 'Executive leadership coach with 15+ years experience mentoring entrepreneurs and business leaders across Africa. Specializes in strategic thinking and organizational development.' },
        { id: 28, name: 'Marcus Johnson', role: 'Tech Industry Mentor', image: '/assets/images/team28.jpg', bio: 'Former CTO of major tech companies with expertise in scaling technology teams. Mentors engineers and technical leaders in career advancement.' },
        { id: 29, name: 'Priya Sharma', role: 'Product Development Mentor', image: '/assets/images/team29.jpg', bio: 'Product management expert with deep experience in user-centered design and agile methodologies. Guides product teams in building impactful solutions.' },
        { id: 30, name: 'Ibrahim Al-Mahmoud', role: 'Business Strategy Mentor', image: '/assets/images/team30.jpg', bio: 'Strategic business consultant with track record in emerging markets. Mentors entrepreneurs in business model development and market entry strategies.' },
        { id: 31, name: 'Catherine Osei', role: 'Finance & Operations Mentor', image: '/assets/images/team31.jpg', bio: 'Financial operations specialist with nonprofit and social enterprise experience. Provides guidance on sustainable funding and operational efficiency.' },
        { id: 32, name: 'Dr. James Mwangi', role: 'Research & Innovation Mentor', image: '/assets/images/team32.jpg', bio: 'Research director with expertise in innovation management and technology transfer. Mentors teams in research methodology and commercialization.' },
        { id: 33, name: 'Sofia Rodriguez', role: 'Marketing & Communications Mentor', image: '/assets/images/team33.jpg', bio: 'Brand strategy expert with global campaign experience. Mentors marketing teams in digital strategy and brand development for social impact.' },
        { id: 34, name: 'Dr. Kwaku Asante', role: 'Academic & Career Mentor', image: '/assets/images/team34.jpg', bio: 'University professor and career counselor specializing in professional development. Guides students and young professionals in career planning.' }
      ],
      advisors: [
        { id: 13, name: 'Dr. Kofi Mensah', role: 'Strategic Advisor', image: '/assets/images/team13.jpg', bio: 'Former UN Development Programme director with 20+ years experience in African development initiatives. Provides strategic guidance on policy and partnerships.' },
        { id: 14, name: 'Sarah Williams', role: 'Technology Advisor', image: '/assets/images/team14.jpg', bio: 'Tech industry veteran and former Silicon Valley executive. Advises on technology strategy and market expansion across global markets.' },
        { id: 15, name: 'Prof. Adaora Nnaji', role: 'Academic Advisor', image: '/assets/images/team15.jpg', bio: 'Leading researcher in sustainable development and social entrepreneurship. Bridges academic research with practical implementation.' },
        { id: 16, name: 'James McKenzie', role: 'Business Advisor', image: '/assets/images/team16.jpg', bio: 'Serial entrepreneur and business strategist with deep experience in scaling social impact ventures across emerging markets.' },
        { id: 21, name: 'Dr. Fatou Diallo', role: 'Regional Advisor', image: '/assets/images/team21.jpg', bio: 'Regional development expert with extensive knowledge of West African markets and policy landscape. Guides expansion strategies.' },
        { id: 22, name: 'Robert Thompson', role: 'Investment Advisor', image: '/assets/images/team22.jpg', bio: 'Impact investment specialist with track record in sustainable finance. Advises on funding strategies and investor relations.' },
        { id: 23, name: 'Dr. Nalaka Silva', role: 'Research Advisor', image: '/assets/images/team23.jpg', bio: 'Academic researcher in sustainable technology and social innovation. Provides evidence-based insights for program development.' },
        { id: 24, name: 'Elena Rodriguez', role: 'Partnership Advisor', image: '/assets/images/team24.jpg', bio: 'Partnership development expert with global NGO experience. Facilitates strategic alliances and collaborative initiatives.' },
        { id: 25, name: 'Dr. Kwame Nkrumah', role: 'Policy Advisor', image: '/assets/images/team25.jpg', bio: 'Policy expert and former government official. Provides guidance on regulatory frameworks and government relations.' },
        { id: 26, name: 'Amina Al-Zahra', role: 'Cultural Advisor', image: '/assets/images/team26.jpg', bio: 'Cultural liaison specialist ensuring community-centered approach. Bridges cultural understanding in program implementation.' }
      ],
      trustees: [
        { id: 35, name: 'Dr. Samuel Addai', role: 'Chairman of the Board', image: '/assets/images/team35.jpg', bio: 'Distinguished leader with 25+ years experience in governance and strategic oversight. Chairs the board with expertise in organizational development and fiduciary responsibility.' },
        { id: 40, name: 'Bashir Imam Abdulwahab', role: 'Secretary of the Board', image: '/assets/images/Imam Bashir IDs.JPG', bio: 'Dedicated board secretary with expertise in governance documentation and administrative oversight. Ensures proper record-keeping and compliance with organizational policies and procedures.' },
        { id: 36, name: 'Prof. Elizabeth Okonkwo', role: 'Board Trustee', image: '/assets/images/team36.jpg', bio: 'Academic leader and governance expert with extensive experience in nonprofit board management. Provides oversight on academic partnerships and research initiatives.' },
        { id: 37, name: 'Chief Adebayo Olumide', role: 'Board Trustee', image: '/assets/images/team37.jpg', bio: 'Traditional leader and community elder with deep understanding of African cultural values. Ensures community alignment and cultural preservation in all initiatives.' },
        { id: 38, name: 'Dr. Fatima Bello', role: 'Board Trustee', image: '/assets/images/team38.jpg', bio: 'Development finance expert with track record in sustainable funding models. Provides strategic oversight on financial sustainability and impact measurement.' },
        { id: 39, name: 'Ambassador John Asante', role: 'Board Trustee', image: '/assets/images/team39.jpg', bio: 'Former diplomat and international relations expert. Guides global partnerships and policy advocacy initiatives for maximum regional impact.' }
      ]
    })

  // Computed property to combine all team members for "All" category
    const allTeamMembers = computed(() => {
      // Find the founder/director from operations team
      const founder = teamData.value.operations.find(member => member.role === 'Founder & Executive Director')
      
      // Get all other team members (excluding the founder to avoid duplication)
      const otherOperations = teamData.value.operations.filter(member => member.role !== 'Founder & Executive Director')
      const allOthers = [
        ...teamData.value.trustees,
        ...teamData.value.engineers,
        ...otherOperations,
        ...teamData.value.mentors,
        ...teamData.value.advisors
      ]
      
      // Return founder first, then all others
      return founder ? [founder, ...allOthers] : allOthers
    })

    // Search state
    const searchQuery = ref('')

    const normalize = (s) => (s || '').toString().toLowerCase().trim()
    const matches = (member) => {
      const q = normalize(searchQuery.value)
      if (!q) return true
      return (
        normalize(member.name).includes(q) ||
        normalize(member.role).includes(q)
      )
    }

    const hasSearch = computed(() => normalize(searchQuery.value).length > 0)

    // Filtered lists per category
    const allTeamMembersFiltered = computed(() => allTeamMembers.value.filter(matches))
    const engineersFiltered = computed(() => teamData.value.engineers.filter(matches))
    const operationsFiltered = computed(() => teamData.value.operations.filter(matches))
    const mentorsFiltered = computed(() => teamData.value.mentors.filter(matches))
    const advisorsFiltered = computed(() => teamData.value.advisors.filter(matches))
    const trusteesFiltered = computed(() => teamData.value.trustees.filter(matches))

    const activeCategory = ref('all')
    const selectedMember = ref(null)
    const showModal = ref(false)

    const showCategory = (category) => {
      activeCategory.value = category
    }

    const openMemberBio = (member) => {
      selectedMember.value = member
      showModal.value = true
    }

    const closeMemberBio = () => {
      showModal.value = false
      selectedMember.value = null
    }

    return { 
      teamData, 
      allTeamMembers,
      // search
      searchQuery,
      hasSearch,
      allTeamMembersFiltered,
      engineersFiltered,
      operationsFiltered,
      mentorsFiltered,
      advisorsFiltered,
      trusteesFiltered,
      activeCategory, 
      selectedMember, 
      showModal, 
      showCategory, 
      openMemberBio, 
      closeMemberBio 
    }
  }
}
</script>

<style scoped>
.team-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.team-content {
  flex-grow: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-top: 5rem; /* Add margin to offset fixed navbar */
}
.logo-section {
  background-color: #ebf8ff;
}
.logo-section img {
  height: 4rem;
}
.team-hero {
  text-align: center;
  margin: 4rem 0 3rem;
}
.team-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #111;
}
.team-hero p {
  font-size: 1.25rem;
  color: #555;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}
.team-member {
  text-align: center;
  animation: fadeInUp 0.6s ease-out;
}
.image-wrapper {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}
.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-member h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: #111;
}
.team-member .role {
  font-size: 1rem;
  color: #666;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.team-content { margin-top: 1.7rem; /* align top spacing with Home.vue */ }
@media (max-width: 768px){
  .team-hero-box { padding: 4rem 1.5rem !important; min-height: 480px !important; }
  .team-hero-box h1 { font-size: 2.3rem !important; }
  .team-hero-box p { font-size: 1.05rem !important; }
}
</style>
