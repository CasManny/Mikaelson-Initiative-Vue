<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    <main class="main-content" style="padding-top: 1.7rem;">
      <!-- Hero Section -->
      <section class="hero-section" style="background: white; padding: 2rem 0">
        <div
          class="hero-main"
          style="
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(92, 225, 230, 0.5);
            padding: 5rem 2rem;
            text-align: left;
            border-radius: 24px;
            min-height: 550px;
          "
        >
          <div
            class="hero-inner-container"
            style="
              width: 100%;
              max-width: 1400px;
              display: flex;
          justify-content: space-between;
              align-items: stretch;
              position: relative;
              margin: 0;
              gap: 2.5rem;
            "
          >
            <!-- Left Side: Text and Buttons -->
            <div
              class="hero-headline"
              style="
                flex: 1 1 0;
                max-width: 600px;
                z-index: 2;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                text-align: left;
                padding-top: 2rem;
              "
            >
              <h1
                style="
                  font-size: 2.1rem;
                  font-weight: 700;
                  line-height: 1.2;
                  color: #111;
                  margin: 0;
                "
              >
                We're Building Africa's Future - 
                one Student, One Idea, One Action
                at a Time.
              </h1>
              <p
                style="
                  font-size: 1.1rem;
                  font-weight: 400;
                  line-height: 1.6;
                  color: #222;
                  margin: 1.2rem 0 0 0;
                "
              >
                The Mikaelson Initiative is a youth-driven movement using
                technology, intentional living, and community to transform Africa
                from the inside out. We're starting with students. We're staying
                with purpose.
              </p>
            </div>
            <!-- Right Side: YouTube Video -->
            <div
              style="
                flex: 1 1 0;
                max-width: 700px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div
                style="
                  width: 100%;
                  max-width: 620px;
                  aspect-ratio: 16/9;
                  background: #e5e7eb;
                  border-radius: 1.2rem;
                  overflow: hidden;
                  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/x8nYGAWlLnQ"
                  title="YouTube video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- A Home for Builders Section -->
      <section
        class="builders-section"
        style="max-width: 1200px; margin: 0 auto; padding: 4rem 1rem 1rem; text-align: center; background: white"
      >
        <h2
          style="
            font-size: 2.3rem;
            font-weight: 800;
            color: #111;
            text-align: center;
            margin-bottom: 2rem;
            line-height: 1.2;
            letter-spacing: -0.025em;
          "
        >
          A Home for Builders, Believers, and Doers
        </h2>
        <!-- Replaced clickable ABOUT US link with non-clickable button text -->
        <button
          style="
            width: 260px;
            height: 60px;
            font-size: 1.25rem;
            font-weight: 700;
            background: #1f2937;
            color: white;
            border: none;
            border-radius: 2.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            letter-spacing: 1px;
            transition: all 0.3s ease;
            cursor: default;
            pointer-events: none;
          "
        >
          Our Ecosystem
        </button>
      </section>

      <!-- Ecosystem Section -->
      <section
        class="ecosystem-section"
        style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem 1rem 4rem; background: white; margin-top: 0; position: relative; z-index: 1;"
      >
        <div
          class="mikaelson-buttons-container"
          style="justify-content: center; margin-top: 0; gap: 1.5rem"
        >
          <!-- Button 1: Community button -->
          <router-link to="/community" style="text-decoration: none">
            <button class="mikaelson-button community-btn" style="height: 55px">
              <span class="button-text">The Mikaelson Community</span>
              <span class="button-icon">
                <img src="../assets/svg/arrow.svg" alt="arrow" />
              </span>
            </button>
          </router-link>
          <!-- Button 2: Labs button -->
          <router-link to="/labs" style="text-decoration: none">
            <button
              class="mikaelson-button labs-btn"
              style="height: 55px; width: auto; min-width: unset"
            >
              <span class="button-text">Mikaelson Labs</span>
              <span class="button-icon labs-arrow-bg">
                <img src="../assets/svg/arrow.svg" alt="arrow" />
              </span>
            </button>
          </router-link>
          <!-- Button 3: Network button -->
          <router-link to="/sponsor" style="text-decoration: none">
            <button class="mikaelson-button network-btn" style="height: 55px">
              <span class="button-text">Partnership & Growth Network</span>
              <span class="button-icon">
                <img src="../assets/svg/black-arrow.svg" alt="arrow" />
              </span>
            </button>
          </router-link>
        </div>
      </section>

      <!-- Community Heading Section -->
      <section class="community-heading-section" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem; padding: 3rem 1rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 2rem; position: relative; overflow: hidden;">
        <div class="community-heading-wrapper">
          <h2 class="community-heading">The Mikaelson Community</h2>
        </div>
        <div class="community-description">
          <p>
            The Mikaelson Community is a vibrant network of ambitious students
            and changemakers across Africa, united by excellence and intentional
            growth.
          </p>
        </div>
        <router-link to="/community" style="text-decoration: none; margin-top: 2rem;">
            <button class="mikaelson-button community-btn" style="height: 55px">
              <span class="button-text">Join our community</span>
              <span class="button-icon">
                <img src="../assets/svg/arrow.svg" alt="arrow" />
              </span>
            </button>
        </router-link>
        <div class="macbook-image-container animated-image-container" style="margin-top: 2rem; text-align: center;">
          <img 
            src="/assets/images/Macbook-pro.jpg" 
            alt="Mikaelson Community on MacBook" 
            class="floating-image"
            style="max-width: 80%; height: auto; border-radius: 1rem; box-shadow: 0 8px 30px rgba(0,0,0,0.1);"
          />
        </div>
      </section>

      <!-- Mikaelson Labs Section -->
      <section class="community-heading-section" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem; padding: 3rem 1rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 2rem; position: relative; overflow: hidden;">
        <div class="community-heading-wrapper">
          <h2 class="community-heading">Mikaelson Labs</h2>
        </div>
        <div class="community-description">
          <p>
            Mikaelson Labs is our innovation hub where we build and experiment with new ideas to solve challenges across Africa.
          </p>
        </div>
        <router-link to="/labs" style="text-decoration: none; margin-top: 2rem;">
            <button class="mikaelson-button labs-btn" style="height: 55px">
              <span class="button-text">Contribute to Labs</span>
              <span class="button-icon labs-arrow-bg">
                <img src="../assets/svg/arrow.svg" alt="arrow" />
              </span>
            </button>
        </router-link>
        <div class="macbook-image-container animated-image-container" style="margin-top: 2rem; text-align: center;">
          <img 
            src="/assets/images/Desktop-image.jpg" 
            alt="Mikaelson Labs on Monitor" 
            class="scale-in-image"
            style="max-width: 80%; height: auto; border-radius: 1rem; box-shadow: 0 8px 30px rgba(0,0,0,0.1);"
          />
        </div>
      </section>

      <!-- Partnership & Growth Network Section -->
      <section class="community-heading-section" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 2rem; padding: 3rem 1rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 2rem; position: relative; overflow: hidden;">
        <div class="community-heading-wrapper">
          <h2 class="community-heading">Partnership & Growth Network</h2>
        </div>
        <div class="community-description">
          <p>
            Our network connects students with mentors, resources, and opportunities to foster collaboration and accelerate growth.
          </p>
        </div>
        <router-link to="/sponsor" style="text-decoration: none; margin-top: 2rem;">
            <button class="mikaelson-button network-btn" style="height: 55px">
              <span class="button-text">Sponsor a Program</span>
              <span class="button-icon">
                <img src="../assets/svg/black-arrow.svg" alt="arrow" />
              </span>
            </button>
        </router-link>
        <div class="macbook-image-container animated-image-container" style="margin-top: 2rem; text-align: center;">
          <img 
            src="/assets/images/iPad Image Presentation.jpg" 
            alt="Partnership & Growth Network on iPad" 
            class="rotate-in-image"
            style="max-width: 80%; height: auto; border-radius: 1rem; box-shadow: 0 8px 30px rgba(0,0,0,0.1);"
          />
        </div>
      </section>

      <!-- Our Impacts So Far Section -->
      <section class="impact-section">
        <div class="container">
          <button class="section-title-btn">OUR IMPACT SO FAR</button>
          <div class="impact-grid">
            <div class="impact-item">
              <div class="impact-icon-wrapper">
                <i class="fas fa-university impact-icon"></i>
              </div>
              <div class="impact-content">
                <h3 class="impact-number">4</h3>
                <p>Universities Touched (and counting…)</p>
              </div>
            </div>
            <div class="impact-item">
              <div class="impact-icon-wrapper">
                <i class="fas fa-users impact-icon"></i>
              </div>
              <div class="impact-content">
                <h3 class="impact-number">3,000+</h3>
                <p>Students Reached</p>
              </div>
            </div>
            <div class="impact-item">
              <div class="impact-icon-wrapper">
                <i class="fas fa-rocket impact-icon"></i>
              </div>
              <div class="impact-content">
                <h3 class="impact-number">6</h3>
                <p>Personal Growth Campaigns Run</p>
              </div>
            </div>
            <div class="impact-item">
              <div class="impact-icon-wrapper">
                <i class="fas fa-handshake impact-icon"></i>
              </div>
              <div class="impact-content">
                <h3 class="impact-number">12+</h3>
                <p>Strategic Collaborators and Volunteers</p>
              </div>
            </div>
            <div class="impact-item">
              <div class="impact-icon-wrapper">
                <i class="fas fa-microphone impact-icon"></i>
              </div>
              <div class="impact-content">
                <h3 class="impact-number">10+</h3>
                <p>Student Stories Captured</p>
              </div>
            </div>
          </div>
          <blockquote class="impact-quote">
            <p>"The Initiative gave me the structure I needed to finally take my life seriously."</p>
            <footer>— A Student, Wesley University</footer>
          </blockquote>
        </div>
      </section>      <!-- MEDIA AND STORIES Section -->
      <section class="media-stories-section">
        <div class="media-container">
          <div class="media-header">
            <div class="media-header-left">
              <h2 class="media-title">Media & Stories</h2>
              <p class="media-intro">Highlights from campuses, events and student impact journeys.</p>
            </div>
            <div class="media-actions">
              <button class="media-filter-btn" :class="{ active: activeMediaFilter==='all' }" @click="activeMediaFilter='all'">All</button>
              <button class="media-filter-btn" :class="{ active: activeMediaFilter==='video' }" @click="activeMediaFilter='video'">Videos</button>
              <button class="media-filter-btn" :class="{ active: activeMediaFilter==='image' }" @click="activeMediaFilter='image'">Images</button>
              <button class="media-filter-btn" :class="{ active: activeMediaFilter==='audio' }" @click="activeMediaFilter='audio'">Audio</button>
              <button class="media-filter-btn" :class="{ active: activeMediaFilter==='story' }" @click="activeMediaFilter='story'">Stories</button>
            </div>
          </div>
          <div class="media-grid">
            <div v-for="item in filteredMedia" :key="item.id" class="media-card" :data-type="item.type">
              <div v-if="item.type==='video'" class="media-thumb">
                <div class="video-wrapper">
                  <iframe :src="item.src" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
              <div v-else-if="item.type==='image'" class="media-thumb">
                <img :src="item.src" :alt="item.title" loading="lazy" />
              </div>
              <div v-else-if="item.type==='audio'" class="media-thumb audio">
                <div class="audio-wrapper">
                  <template v-if="item.twitterUrl">
                    <!-- Use internal TwitterEmbed to avoid cross-site frame errors -->
                    <div class="twitter-mini-embed">
                      <TwitterEmbed :tweet-id="item.tweetId" theme="light" align="center" conversation="none" />
                    </div>
                    <button class="twitter-play-btn" @click="openTwitterSpace(item)">
                      <i class="fas fa-play-circle"></i>
                      <span>Play Twitter Space</span>
                    </button>
                  </template>
                  <template v-else>
                    <audio controls :src="item.src"></audio>
                  </template>
                </div>
              </div>
              <div v-else-if="item.type==='story'" class="media-thumb story">
                <div class="story-body">
                  <p class="story-quote">“{{ item.quote }}”</p>
                  <p class="story-author">— {{ item.author }}</p>
                </div>
              </div>
              <div class="media-content">
                <div class="media-meta">
                  <span class="media-badge" :class="item.type">{{ item.type }}</span>
                  <span v-if="item.tag" class="media-tag">{{ item.tag }}</span>
                </div>
                <h3 class="media-item-title">{{ item.title }}</h3>
                <p class="media-description">{{ item.description }}</p>
                <div class="media-footer">
                  <button v-if="item.cta" class="media-cta" @click="openMedia(item)">{{ item.cta }}</button>
                  <span class="media-date">{{ item.date }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredMedia.length===0" class="media-more">
            <p>No media items found for this category.</p>
          </div>
        </div>
      </section>

      <!-- Twitter Space Modal -->
      <div v-if="showTwitterModal" class="modal-overlay" @click="closeTwitterSpace">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <i class="fab fa-x-twitter"></i>
              Student Voices: 30-Day Reset
            </h3>
            <button class="modal-close" @click="closeTwitterSpace">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content">
            <!-- Replace raw embed with our component -->
            <TwitterEmbed v-if="currentTweetId" :tweet-id="currentTweetId" theme="light" align="center" />
            <div v-if="embedError" class="embed-error">
              <i class="fas fa-exclamation-triangle"></i>
              Unable to load the Twitter Space. You can listen on X:
              <a :href="currentTwitterUrl" target="_blank" rel="noopener">Open on X</a>
            </div>
            <div class="autoplay-preference">
              <label>
                <input type="checkbox" v-model="autoOpenOnXForAutoplay" @change="persistAutoplayPref" />
                Also open on X to auto-play
              </label>
              <a v-if="currentTwitterUrl" :href="autoplayUrl(currentTwitterUrl)" target="_blank" rel="noopener" class="open-on-x">Open now</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Links Section -->
      <section class="links-section">
        <div class="container">
          <h2 class="section-title">Explore More</h2>
          <div class="links-grid">
            <div v-for="link in quickLinks" :key="link.id" class="link-card">
              <div class="link-icon">
                <i :class="link.icon"></i>
              </div>
              <h3>{{ link.title }}</h3>
              <p>{{ link.description }}</p>
              <router-link 
                v-if="link.id === 2" 
                to="/challenges" 
                class="link-button"
                style="text-decoration: none;"
              >
                {{ link.buttonText }}
              </router-link>
              <a v-else href="#" class="link-button">{{ link.buttonText }}</a>
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
import { ref, onMounted, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUIStore } from "@/stores/ui";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import TwitterEmbed from '@/components/TwitterEmbed.vue'

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
    TwitterEmbed,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const uiStore = useUIStore();

    const testimonials = ref([
      {
        id: 1,
        text: "The Mikaelson Initiative has transformed my daily routine and accountability. The leaderboard keeps me motivated, and the community support is incredible.",
        author: "Amara Okafor",
        role: "Product Manager",
      },
      {
        id: 2,
        text: "Joining this community gave me the structure I needed to build lasting habits. The accountability system has been life-changing for my personal growth.",
        author: "Kwame Asante",
        role: "Entrepreneur",
      },
      {
        id: 3,
        text: "The community-first approach and focus on African excellence has inspired me to push beyond my limits and achieve goals I never thought possible.",
        author: "Zara Mwangi",
        role: "Software Developer",
      },
    ]);

    const leaderboardUsers = ref([
      {
        id: 1,
        name: "Alex Kim",
        initials: "AK",
        contributions: 125,
        points: 2450,
      },
      {
        id: 2,
        name: "Jordan Davis",
        initials: "JD",
        contributions: 98,
        points: 2180,
      },
      {
        id: 3,
        name: "Riley Patel",
        initials: "RP",
        contributions: 87,
        points: 1920,
      },
    ]);

    const quickLinks = ref([
      {
        id: 1,
        icon: "fas fa-blog",
        title: "Blog & Newsletter",
        description:
          "Stay updated with productivity tips, success stories, and community news from our members.",
        buttonText: "Read Latest Posts",
      },
      {
        id: 2,
        icon: "fas fa-trophy",
        title: "Challenges",
        description:
          "Participate in habit-building challenges and accountability programs with the community.",
        buttonText: "View Challenges",
      },
      {
        id: 3,
        icon: "fas fa-book",
        title: "Community Guidelines",
        description:
          "Learn about our community values, accountability principles, and best practices for growth.",
        buttonText: "Read Guidelines",
      },
    ]);

    const activeMediaFilter = ref('all')
    const mediaItems = ref([
      { id:1, type:'video', title:'EKSU Campus Visit', description:'Engagement with students during campus activation.', tag:'Campus', date:'2025-07-12', src:'https://www.youtube.com/embed/', cta:'Watch Video' },
      { id:2, type:'image', title:'Community Events', description:'Collaboration and growth moments across sessions.', tag:'Event', date:'2025-06-30', src:'/assets/images/community-events.jpg', cta:'View' },
      // Updated audio item to use X (Twitter) Space
      { id:3, type:'audio', title:'Student Voices: 30-Day Reset', description:'Reflections on habit transformation.', tag:'Podcast', date:'2025-05-18', src:'/assets/audio/student-voices-30-day-reset.mp3', twitterUrl:'https://x.com/mikaelsonhq/status/1950962666605772872', tweetId:'1950962666605772872', cta:'Listen' },
      { id:4, type:'story', title:'Mindset Shift', description:'A story of renewed discipline and purpose.', tag:'Impact', date:'2025-05-02', quote:'The Initiative gave me the structure I needed to finally take my life seriously.', author:'Student, Wesley University' }
    ])

    const filteredMedia = computed(()=> activeMediaFilter.value==='all' ? mediaItems.value : mediaItems.value.filter(i=>i.type===activeMediaFilter.value))

    // Twitter Space modal state
    const showTwitterModal = ref(false)
    const currentTweetId = ref(null)
    const currentTwitterUrl = ref('')
    const twitterScriptLoaded = ref(!!window.twttr)
    const twitterEmbedContainer = ref(null)
    const embedError = ref(false)

    // Autoplay preference (best-effort): open X in new tab to ensure playback
    const autoOpenOnXForAutoplay = ref(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mi_auto_open_x_autoplay')
      if (saved !== null) autoOpenOnXForAutoplay.value = saved === 'true'
    }
    const persistAutoplayPref = () => {
      localStorage.setItem('mi_auto_open_x_autoplay', String(autoOpenOnXForAutoplay.value))
    }
    const autoplayUrl = (url) => url.includes('?') ? url + '&autoplay=1' : url + '?autoplay=1'

    const loadTwitterScript = () => {
      return new Promise((resolve) => {
        if (window.twttr) {
          twitterScriptLoaded.value = true
          return resolve()
        }
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.onload = () => {
          twitterScriptLoaded.value = true
          resolve()
        }
        script.onerror = () => {
          twitterScriptLoaded.value = false
          resolve()
        }
        document.body.appendChild(script)
      })
    }

    const renderTwitterEmbed = async () => {
      embedError.value = false
      await loadTwitterScript()
      await nextTick()
      const container = twitterEmbedContainer.value
      if (!container) return
      container.innerHTML = ''
      try {
        if (window.twttr && window.twttr.widgets && currentTweetId.value) {
          await window.twttr.widgets.createTweet(currentTweetId.value, container, {
            theme: 'light',
            align: 'center',
          })
        } else {
          // Fallback to simple iframe using twitframe if widgets fail
          const iframe = document.createElement('iframe')
          iframe.src = `https://twitframe.com/show?url=${encodeURIComponent(currentTwitterUrl.value)}`
          iframe.style.width = '100%'
          iframe.style.height = '600px'
          iframe.style.border = '0'
          iframe.allow = 'autoplay'
          container.appendChild(iframe)
        }
      } catch (e) {
        embedError.value = true
      }
    }

    const openTwitterSpace = async (item) => {
      currentTweetId.value = item.tweetId
      currentTwitterUrl.value = item.twitterUrl
      showTwitterModal.value = true
      await renderTwitterEmbed()
      // Best-effort autoplay: open X in a new tab on user gesture
      if (autoOpenOnXForAutoplay.value && currentTwitterUrl.value) {
        window.open(autoplayUrl(currentTwitterUrl.value), '_blank')
      }
    }

    const closeTwitterSpace = () => {
      showTwitterModal.value = false
      currentTweetId.value = null
      currentTwitterUrl.value = ''
      if (twitterEmbedContainer.value) twitterEmbedContainer.value.innerHTML = ''
    }

    const openMedia = (item)=>{
      if(item.type==='image'){ window.open(item.src,'_blank') }
      else if(item.type==='video'){ window.open(item.src.replace('embed/','watch?v='),'_blank') }
      else if(item.type==='audio' && item.twitterUrl){ openTwitterSpace(item) }
      else if(item.type==='audio'){ /* local audio uses native controls */ }
    }

    onMounted(async () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.main-content section').forEach((section) => {
        observer.observe(section);
      });
    });

    return {
      authStore,
      testimonials,
      leaderboardUsers,
      quickLinks,
      uiStore,
      activeMediaFilter,
      mediaItems,
      filteredMedia,
      openMedia,
      // Twitter modal
      showTwitterModal,
      openTwitterSpace,
      closeTwitterSpace,
      twitterEmbedContainer,
      embedError,
      currentTwitterUrl,
      autoOpenOnXForAutoplay,
      persistAutoplayPref,
      autoplayUrl,
    };
  },
};
</script>

<style scoped>
main.main-content {
  scroll-behavior: smooth;
}
.hero-cover-btn {
  width: 100%;
  min-height: 420px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5rem 0;
  box-sizing: border-box;
}
.hero-cover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}
.hero-cover-cta {
  display: inline-block;
  background: #fff;
  color: #2d6cdf;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.2rem 3.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: background 0.2s, color 0.2s;
}
.hero-cover-btn:hover .hero-cover-cta {
  background: #2d6cdf;
  color: #fff;
}

.mikaelson-buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 3rem;
  padding: 2.5rem 2rem;
  border-bottom: 1px solid #d3d3d3ff;
  position: relative;
}

.mikaelson-buttons-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(45, 108, 223, 0.02) 0%,
    rgba(32, 201, 192, 0.02) 100%
  );
  border-radius: inherit;
  z-index: 0;
}

.mikaelson-buttons-container > * {
  position: relative;
  z-index: 1;
}

.mikaelson-button {
  padding: 0.7rem 1.6rem;
  font-size: 1.15rem;
  border-radius: 40px;
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  font-weight: 700;
  white-space: nowrap;
  min-height: 50px;
}

.mikaelson-button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.button-text {
  padding: 0 0.25rem;
}

.button-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-left: 0.7rem;
  display: flex;
  background: black;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mikaelson-button img {
  width: 1.6rem;
  height: 1.6rem;
  margin: auto;
}

.community-btn {
  background: #20c9c0;
  border: none;
}

.community-btn img {
  filter: invert(1);
}

.labs-btn {
  background: #2563eb;
  border: none;
}

.labs-arrow-bg {
  background: #fff !important;
}

.labs-arrow-bg img {
  filter: invert(0) !important;
}

.labs-btn img {
  filter: invert(1);
}

.network-btn {
  background: black;
  border: 1px solid white;
  color: white;
}

.network-btn .button-icon {
  background: white;
}

.community-heading-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  position: relative;
}

.community-heading-wrapper::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 150%;
  z-index: 0;
}

.community-description {
  max-width: 700px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1.5rem auto 0 auto;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.community-description p {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #4a5568;
  margin: 0;
  text-align: center;
  font-weight: 500;
  width: 100%;
  letter-spacing: 0.025em;
}

.community-heading {
  position: relative;
  font-weight: 800;
  margin-bottom: 0;
  max-width: 960px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  background: linear-gradient(181deg, #d2d2d2 0.8%, #474747 99.2%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 20px rgba(45, 108, 223, 0.3);
  font-size: 3rem;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

@media (max-width: 767px) {
  .community-heading {
    font-size: 2.2rem;
  }
}

@media (min-width: 768px) {
  .community-heading {
    font-size: 3.2rem;
  }
}

html {
  scroll-behavior: smooth;
}

.main-content section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-content section.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Animate the Labs monitor image from bottom on scroll */
.main-content section .macbook-image-container img {
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
}
.main-content section.visible .macbook-image-container img {
  opacity: 1;
  transform: translateY(0);
}

.mikaelson-button {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.visible .mikaelson-button {
  opacity: 1;
  transform: translateY(0);
}

.mikaelson-button:nth-child(1) {
  transition-delay: 0.1s;
}

.mikaelson-button:nth-child(2) {
  transition-delay: 0.2s;
}

.mikaelson-button:nth-child(3) {
  transition-delay: 0.3s;
}

.hero-inner-container {
  padding: 2rem 0 !important;
}

.impact-section {
  padding: 4rem 1rem;
  background: #f8fafc;
  text-align: center;
  border-top: 3px solid #333;
  border-bottom: 3px solid #333;
}

.impact-section .container {
  max-width: 1200px;
  margin: 0 auto;
}

.impact-section .section-title {
  font-family: 'Times New Roman', serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #111;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 2px solid #333;
  padding-bottom: 1rem;
}

.section-title-btn {
  font-family: 'Times New Roman', serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #111;
  text-align: center;
  margin: 0 auto 3rem;
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 1.2rem 2rem;
  background: rgba(92, 225, 230, 0.5); /* updated to match hero section */
  border: 2px solid rgba(92, 225, 230, 0.9); /* subtle border aligning with theme */
  border-radius: 1.2rem;
  cursor: default;
  display: block;
  width: 100%;
  max-width: fit-content;
  box-shadow: 0 6px 20px rgba(32, 201, 192, 0.2), 
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 0 12px rgba(37, 99, 235, 0.12);
  position: relative;
  overflow: hidden;
}

.section-title-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.section-title-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: calc(1.2rem - 3px);
  pointer-events: none;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  text-align: center;
}

.impact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #20c9c0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.impact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.impact-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.impact-icon {
  font-size: 1.8rem;
  color: white;
}

.impact-content {
  text-align: center;
}

.impact-number {
  font-family: 'Times New Roman', serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.impact-item p {
  margin: 0;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
  font-weight: 500;
}

.impact-quote {
  background: white;
  border-left: 6px solid #20c9c0;
  padding: 2rem 3rem;
  margin: 2rem auto 0;
  max-width: 700px;
  text-align: left;
  font-style: italic;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.impact-quote p {
  font-family: 'Times New Roman', serif;
  font-size: 1.6rem;
  color: #333;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.impact-quote footer {
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
  font-style: normal;
  text-align: right;
}

/* Image Animations */
.animated-image-container {
  overflow: hidden;
}

/* Base styles for images - no continuous animations */
.floating-image,
.scale-in-image,
.rotate-in-image,
.pulse-image,
.slide-in-image {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects only */
.floating-image:hover {
  transform: scale(1.05);
}

.scale-in-image:hover {
  transform: scale(1.08) rotate(2deg);
}

.rotate-in-image:hover {
  transform: scale(1.05) rotate(-2deg);
}

.pulse-image:hover {
  transform: scale(1.1);
}

.slide-in-image:hover {
  transform: scale(1.05) translateX(-5px);
}

/* Scroll-triggered animations when section becomes visible */
.main-content section.visible .floating-image {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

.main-content section.visible .scale-in-image {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.4s;
}

.main-content section.visible .rotate-in-image {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
  transition-delay: 0.5s;
}

.main-content section.visible .pulse-image {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

.main-content section.visible .slide-in-image {
  opacity: 1;
  transform: translateY(0) translateX(0);
  transition-delay: 0.6s;
}

/* Reduce animations on smaller screens for performance */
@media (max-width: 768px) {
  .floating-image,
  .scale-in-image,
  .rotate-in-image,
  .pulse-image,
  .slide-in-image {
    transition-duration: 0.6s;
  }
  
  .floating-image:hover,
  .scale-in-image:hover,
  .rotate-in-image:hover,
  .pulse-image:hover,
  .slide-in-image:hover {
    transform: scale(1.02);
  }
}

.media-stories-section { padding:4rem 1rem; background:#ffffff; }
.media-container { max-width:1200px; margin:0 auto; }
.media-header { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:2rem; margin:0 0 2.5rem; }
.media-header-left { max-width:620px; }
.media-title { font-size:2.5rem; font-weight:800; margin:0 0 .75rem; color:#111; letter-spacing:-0.02em; }
.media-intro { font-size:1.05rem; line-height:1.55; color:#222; margin:0; }
.media-actions { display:flex; gap:.6rem; flex-wrap:wrap; }
.media-filter-btn { background:#fff; border:1px solid #d1d5db; padding:.55rem 1.1rem; border-radius:2rem; font-size:.7rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; cursor:pointer; color:#374151; transition:all .25s ease; }
.media-filter-btn.active, .media-filter-btn:hover { background:#1f2937; border-color:#1f2937; color:#fff; }
.media-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:2rem; }
.media-card { background:#f8fafc; border:1px solid #e2e8f0; border-radius:1rem; overflow:hidden; display:flex; flex-direction:column; position:relative; box-shadow:0 2px 8px rgba(0,0,0,.06); transition:box-shadow .3s, transform .3s; }
.media-card:hover { box-shadow:0 10px 28px rgba(0,0,0,.12); transform:translateY(-4px); }
.media-thumb { aspect-ratio:16/9; position:relative; background:#e5e7eb; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.media-thumb img { width:100%; height:100%; object-fit:cover; }
.video-wrapper, .audio-wrapper { width:100%; height:100%; display:flex; }
.video-wrapper iframe { width:100%; height:100%; border:0; }
.audio-wrapper { align-items:center; justify-content:center; padding:1rem; }
.story-body { padding:1.25rem 1rem 1rem; display:flex; flex-direction:column; justify-content:center; height:100%; text-align:left; }
.story-quote { font-size:.95rem; font-style:italic; line-height:1.5; color:#1f2937; margin:0 0 .75rem; }
.story-author { font-size:.7rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:#475569; margin:0; }
.media-content { padding:1.2rem 1.2rem 1.3rem; display:flex; flex-direction:column; gap:.65rem; }
.media-meta { display:flex; align-items:center; gap:.4rem; flex-wrap:wrap; }
.media-badge { font-size:.55rem; font-weight:700; padding:.35rem .7rem; border-radius:1rem; text-transform:uppercase; letter-spacing:.6px; background:#1f2937; color:#fff; }
.media-badge.video { background:#2563eb; }
.media-badge.image { background:#20c9c0; }
.media-badge.audio { background:#8b5cf6; }
.media-badge.story { background:#f59e0b; }
.media-tag { font-size:.55rem; font-weight:700; padding:.35rem .7rem; border-radius:1rem; background:#e2e8f0; color:#374151; letter-spacing:.5px; }
.media-item-title { font-size:1.05rem; font-weight:600; margin:0; color:#111; line-height:1.3; }
.media-description { font-size:.8rem; line-height:1.45; color:#334155; margin:0; flex-grow:1; }
.media-footer { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-top:.2rem; }
.media-cta { background:#1f2937; color:#fff; border:none; padding:.55rem 1rem; border-radius:2rem; font-size:.65rem; font-weight:700; letter-spacing:.5px; cursor:pointer; transition:background .25s ease, transform .25s; }
.media-cta:hover { background:#111827; transform:translateY(-2px); }
.media-date { font-size:.65rem; font-weight:600; letter-spacing:.5px; color:#475569; text-transform:uppercase; }
.media-more { text-align:center; margin-top:2rem; }
.media-more p { color:#475569; font-size:.9rem; }
@media (max-width:640px){ .media-title { font-size:2.1rem; } .media-header { flex-direction:column; align-items:flex-start; } }

/* Twitter modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.modal-container {
  background: #fff;
  border-radius: 12px;
  max-width: 760px;
  width: 92%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-title { margin: 0; font-weight: 700; display: flex; align-items: center; gap: 8px; }
.modal-close { background: none; border: 0; font-size: 1.25rem; cursor: pointer; color: #6b7280; }
.modal-content { padding: 12px; }
.twitter-embed-container { min-height: 400px; }
.embed-error { margin-top: 12px; color: #991b1b; background: #fee2e2; padding: 10px; border-radius: 8px; }

/* Play button on audio card when using Twitter */
.twitter-play-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #111827;
  color: #fff;
  border: 0;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
}
.twitter-play-btn:hover { background: #0b1220; }

.autoplay-preference {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
}
.autoplay-preference .open-on-x {
  color: #1d4ed8;
  text-decoration: underline;
}

.twitter-mini-embed {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #fff;
  margin-bottom: 8px;
}

/* Enhanced Mobile Structure - Using CSS Variables */
@media (max-width: 768px) {
  .main-content {
    padding-top: var(--space-sm) !important;
  }
  
  /* Hero Section Structure */
  .hero-section {
    padding: var(--space-md) var(--space-sm) !important;
  }
  
  .hero-main {
    padding: var(--space-lg) var(--space-md) !important;
    border-radius: var(--radius-xl) !important;
    min-height: 400px !important;
    background: linear-gradient(135deg, rgba(92, 225, 230, 0.6), rgba(92, 225, 230, 0.4)) !important;
  }
  
  .hero-inner-container {
    flex-direction: column !important;
    gap: var(--space-lg) !important;
    padding: 0 !important;
  }
  
  .hero-headline {
    max-width: 100% !important;
    padding-top: 0 !important;
    text-align: center !important;
    align-items: center !important;
  }
  
  .hero-headline h1 {
    font-size: var(--text-2xl) !important;
    line-height: 1.2 !important;
    margin-bottom: var(--space-md) !important;
  }
  
  .hero-headline p {
    font-size: var(--text-base) !important;
    line-height: 1.6 !important;
    margin-bottom: var(--space-lg) !important;
    text-align: center !important;
  }
  
  .hero-buttons {
    flex-direction: column !important;
    gap: var(--space-sm) !important;
    width: 100% !important;
    align-items: center !important;
  }
  
  .mikaelson-button {
    width: 100% !important;
    max-width: 280px !important;
    padding: var(--space-md) var(--space-lg) !important;
    font-size: var(--text-base) !important;
    border-radius: var(--radius-lg) !important;
    min-height: 48px !important;
    justify-content: center !important;
  }
  
  /* Macbook Image Container */
  .macbook-image-container {
    order: -1 !important;
    max-width: 100% !important;
    text-align: center !important;
  }
  
  .macbook-image-container img {
    max-width: 280px !important;
    height: auto !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--shadow-lg) !important;
  }
  
  /* Impact Section Structure */
  .impact-section {
    padding: var(--space-lg) var(--space-md) !important;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9) !important;
  }
  
  .impact-section .section-title {
    font-size: var(--text-xl) !important;
    margin-bottom: var(--space-lg) !important;
    padding-bottom: var(--space-sm) !important;
  }
  
  .section-title-btn {
    font-size: var(--text-lg) !important;
    margin-bottom: var(--space-lg) !important;
    padding: var(--space-sm) var(--space-md) !important;
    border-radius: var(--radius-lg) !important;
    background: white !important;
    box-shadow: var(--shadow-sm) !important;
  }
  
  /* Stats Grid Structure */
  .stats-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: var(--space-md) !important;
    margin-bottom: var(--space-lg) !important;
  }
  
  .stat-card {
    background: white !important;
    padding: var(--space-md) !important;
    border-radius: var(--radius-lg) !important;
    box-shadow: var(--shadow-sm) !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
    text-align: center !important;
    transition: all 0.3s ease !important;
  }
  
  .stat-card:hover {
    transform: translateY(-2px) !important;
    box-shadow: var(--shadow-md) !important;
  }
  
  .stat-number {
    font-size: var(--text-xl) !important;
    font-weight: 800 !important;
    color: #059669 !important;
    margin-bottom: var(--space-xs) !important;
  }
  
  .stat-label {
    font-size: var(--text-sm) !important;
    color: #6b7280 !important;
    font-weight: 600 !important;
  }
  
  /* Community Section Structure */
  .community-heading {
    font-size: var(--text-xl) !important;
    text-align: center !important;
    margin-bottom: var(--space-lg) !important;
    line-height: 1.3 !important;
  }
  
  /* Media Stories Section Structure */
  .media-stories-section {
    padding: var(--space-lg) var(--space-md) !important;
  }
  
  .media-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: var(--space-md) !important;
    margin-bottom: var(--space-lg) !important;
  }
  
  .media-title {
    font-size: var(--text-xl) !important;
    text-align: center !important;
    width: 100% !important;
  }
  
  .media-intro {
    font-size: var(--text-sm) !important;
    text-align: center !important;
    width: 100% !important;
  }
  
  .media-actions {
    width: 100% !important;
    justify-content: center !important;
    gap: var(--space-xs) !important;
  }
  
  .media-filter-btn {
    padding: var(--space-xs) var(--space-sm) !important;
    font-size: var(--text-xs) !important;
    border-radius: var(--radius-lg) !important;
    min-height: 36px !important;
  }
  
  .media-grid {
    grid-template-columns: 1fr !important;
    gap: var(--space-md) !important;
  }
  
  .media-card {
    border-radius: var(--radius-lg) !important;
    overflow: hidden !important;
    box-shadow: var(--shadow-sm) !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
  }
  
  .media-content {
    padding: var(--space-md) !important;
    gap: var(--space-sm) !important;
  }
  
  .media-item-title {
    font-size: var(--text-base) !important;
  }
  
  .media-description {
    font-size: var(--text-sm) !important;
  }
  
  .media-footer {
    margin-top: var(--space-sm) !important;
    gap: var(--space-sm) !important;
  }
  
  .media-cta {
    padding: var(--space-xs) var(--space-sm) !important;
    border-radius: var(--radius-md) !important;
    font-size: var(--text-xs) !important;
    min-height: 36px !important;
  }
}

@media (max-width: 480px) {
  .hero-main {
    padding: var(--space-md) var(--space-sm) !important;
    min-height: 350px !important;
  }
  
  .hero-headline h1 {
    font-size: var(--text-xl) !important;
  }
  
  .hero-headline p {
    font-size: var(--text-sm) !important;
  }
  
  .mikaelson-button {
    max-width: 100% !important;
    padding: var(--space-sm) var(--space-md) !important;
    font-size: var(--text-sm) !important;
  }
  
  .macbook-image-container img {
    max-width: 240px !important;
  }
  
  .stats-grid {
    grid-template-columns: 1fr !important;
    gap: var(--space-sm) !important;
  }
  
  .stat-card {
    padding: var(--space-sm) !important;
  }
  
  .community-heading {
    font-size: var(--text-lg) !important;
  }
  
  .media-title {
    font-size: var(--text-lg) !important;
  }
}

@media (max-width: 360px) {
  .hero-main {
    margin: 0 var(--space-xs) !important;
    padding: var(--space-sm) !important;
  }
  
  .hero-headline h1 {
    font-size: var(--text-lg) !important;
  }
  
  .macbook-image-container img {
    max-width: 200px !important;
  }
  
  .impact-section {
    padding: var(--space-md) var(--space-sm) !important;
  }
}

/* Touch optimizations */
@media (hover: none) and (pointer: coarse) {
  .mikaelson-button {
    min-height: 48px !important;
  }
  
  .media-filter-btn {
    min-height: 44px !important;
  }
  
  .media-cta {
    min-height: 44px !important;
  }
  
  .stat-card {
    min-height: 100px !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .main-content section,
  .mikaelson-button,
  .stat-card,
  .media-card {
    transition: none !important;
  }
  
  .main-content section.visible,
  .stat-card:hover,
  .media-card:hover {
    transform: none !important;
  }
}
</style>
/* Center .floating-image class images and containers */
.floating-image {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 1rem !important;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
  position: static !important;
}
.floating-image-container {
  width: 100% !important;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
/* Force centering of images and containers on desktop and mobile */
.hero-inner-container .macbook-image-container,
.hero-inner-container .animated-image-container {
  width: 100% !important;
  max-width: 480px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.hero-inner-container .macbook-image-container img,
.hero-inner-container .animated-image-container img {
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  border-radius: 1rem !important;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
  position: static !important;
}
/* Desktop image alignment fix */
@media (min-width: 1024px) {
  .hero-inner-container {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 3rem !important;
    padding: 0 !important;
  }
  .macbook-image-container,
  .animated-image-container {
    max-width: 480px !important;
    width: 100% !important;
    margin: 0 auto !important;
    text-align: center !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    order: 2 !important;
  }
  .macbook-image-container img,
  .animated-image-container img {
    max-width: 100% !important;
    height: auto !important;
    margin: 0 auto !important;
    display: block !important;
    border-radius: 1rem !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
    position: static !important;
  }
  .hero-headline {
    flex: 1 1 0 !important;
    max-width: 600px !important;
    align-items: flex-start !important;
    justify-content: center !important;
    text-align: left !important;
    padding-top: 2rem !important;
  }
}
/* Fix image displacement on mobile */
@media (max-width: 768px) {
  .macbook-image-container,
  .animated-image-container {
    width: 100% !important;
    max-width: 100% !important;
    margin: 1.5rem auto 0 auto !important;
    text-align: center !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    order: 2 !important;
  }
  .macbook-image-container img,
  .animated-image-container img {
    max-width: 90vw !important;
    width: 100% !important;
    height: auto !important;
    margin: 0 auto !important;
    display: block !important;
    border-radius: 1rem !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
    position: static !important;
  }
  /* Ensure sections stack vertically */
  .community-heading-section,
  .feature-section {
    flex-direction: column !important;
    align-items: center !important;
  }
  .feature-section > div {
    flex-direction: column !important;
    align-items: center !important;
  }
}

@media (max-width: 480px) {
  .macbook-image-container img,
  .animated-image-container img {
    max-width: 98vw !important;
  }
}
