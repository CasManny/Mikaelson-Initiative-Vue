<template>
  <div class="success-stories-container">
    <h1 class="main-title">Success Stories</h1>
    <p class="subtitle">
      Discover how the Mikaelson Initiative has empowered individuals and
      communities.
    </p>

    <!-- Search and CTA -->
    <div class="controls-container">
      <div class="search-bar">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search stories..."
          class="search-input"
        />
      </div>
      <button class="cta-button" @click="showModal = true">
        <i class="fas fa-plus-circle"></i>
        Share Your Story
      </button>
    </div>

    <div class="stories-grid">
      <!-- Story Card 1 -->
      <div class="story-card" v-for="story in filteredStories" :key="story.id">
        <img :src="story.image" :alt="story.title" class="story-image" />
        <div class="story-content">
          <h3 class="story-title">{{ story.title }}</h3>
          <p class="story-excerpt">"{{ story.excerpt }}"</p>
          <p class="story-sharer">- {{ story.sharer }}</p>
          <div class="card-footer">
            <a href="#" class="read-more-link">Read More</a>
            <div class="social-share">
              <a href="#" class="share-icon"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="share-icon"><i class="fab fa-twitter"></i></a>
              <a href="#" class="share-icon"
                ><i class="fab fa-linkedin-in"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Story Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Share Your Success Story</h2>
          <button class="close-button" @click="showModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleStorySubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input
                type="text"
                id="name"
                v-model="newStory.name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div class="form-group">
              <label for="title">Story Title</label>
              <input
                type="text"
                id="title"
                v-model="newStory.title"
                placeholder="A catchy title for your story"
                required
              />
            </div>
            <div class="form-group">
              <label for="story">Your Story</label>
              <textarea
                id="story"
                v-model="newStory.text"
                rows="8"
                placeholder="Share the details of your success..."
                required
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn-secondary"
                @click="showModal = false"
              >
                Cancel
              </button>
              <button type="submit" class="btn-primary">Share Story</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, computed } from "vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "SuccessStories",
  components: {
    Footer,
  },
  setup() {
    const searchQuery = ref("");
    const showModal = ref(false);
    const newStory = ref({
      name: "",
      title: "",
      text: "",
    });
    const stories = ref([
      {
        id: 1,
        title: "From Novice to Software Engineer",
        excerpt:
          "The mentorship program provided me with the skills and confidence to land my dream job. I'm now a software engineer at a top tech company.",
        image: "/assets/images/20240726_164330.jpeg",
        sharer: "John Doe",
      },
      {
        id: 2,
        title: "Launching a Community Project",
        excerpt:
          "With the resources from the Mikaelson Initiative, I was able to launch a project that provides clean water to my community.",
        image:
          "/assets/images/Apple-MacBook-Pro-M3-Pro-Photoshop-231030_big.jpg.large_2x.jpg",
        sharer: "Jane Smith",
      },
      {
        id: 3,
        title: "A New Path in Tech",
        excerpt:
          "I never thought a career in tech was possible for me. The guidance and support I received here changed my life.",
        image: "/assets/images/hero-img.jpg",
        sharer: "Alex Johnson",
      },
    ]);

    const filteredStories = computed(() => {
      if (!searchQuery.value) {
        return stories.value;
      }
      return stories.value.filter((story) =>
        story.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const handleStorySubmit = () => {
      stories.value.unshift({
        id: stories.value.length + 1,
        title: newStory.value.title,
        excerpt: newStory.value.text,
        image: "/assets/images/hero-img.jpg", // Placeholder image
        sharer: newStory.value.name,
      });
      // Reset form and close modal
      newStory.value = { name: "", title: "", text: "" };
      showModal.value = false;
    };

    return {
      searchQuery,
      filteredStories,
      showModal,
      newStory,
      handleStorySubmit,
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/success-stories.css";
</style>
