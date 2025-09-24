<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    
    <main class="social-feed" style="padding-top: 6rem;">
      <!-- Feed Container -->
      <div class="feed-container">
        <!-- Left Sidebar - Quick Actions & Filters -->
        <aside class="left-sidebar">
          <div class="sidebar-section">
            <h3>Quick Actions</h3>
            <button 
              @click="showCreateModal = true" 
              class="create-post-btn"
              v-if="authStore.isLoggedIn"
            >
              <i class="fas fa-plus"></i>
              Share Progress
            </button>
          </div>

          <div class="sidebar-section">
            <h3>Active Challenges</h3>
            <div class="challenges-list">
              <button 
                v-for="challenge in challengesStore.getActiveChallenges.slice(0, 4)" 
                :key="challenge.id"
                class="challenge-filter-btn"
                @click="filterByChallenge(challenge.id)"
                :class="{ active: selectedChallenge === challenge.id }"
              >
                <span class="challenge-name">{{ challenge.title }}</span>
                <span class="challenge-participants">{{ challenge.participants }}</span>
              </button>
              
              <button 
                v-if="selectedChallenge" 
                @click="clearFilter" 
                class="clear-filter-btn"
              >
                <i class="fas fa-times"></i>
                Clear Filter
              </button>
            </div>
          </div>

          <!-- Trending Topics -->
          <div class="sidebar-section">
            <h3>Trending</h3>
            <div class="trending-tags">
              <span 
                v-for="tag in trendingTags" 
                :key="tag"
                class="trending-tag"
                @click="filterByTag(tag)"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </aside>

        <!-- Main Feed -->
        <section class="main-feed">
          <!-- Create Post Quick Access -->
          <div v-if="authStore.isLoggedIn" class="quick-post-card">
            <div class="user-avatar">{{ currentUserAvatar }}</div>
            <button 
              @click="showCreateModal = true"
              class="quick-post-input"
            >
              What's your progress today?
            </button>
          </div>

          <!-- Filter Info -->
          <div v-if="selectedChallenge || selectedTag" class="filter-info-card">
            <div class="filter-content">
              <span v-if="selectedChallenge">
                <i class="fas fa-filter"></i>
                Showing posts for: <strong>{{ getSelectedChallengeTitle() }}</strong>
              </span>
              <span v-else-if="selectedTag">
                <i class="fas fa-hashtag"></i>
                Showing posts with tag: <strong>#{{ selectedTag }}</strong>
              </span>
              <button @click="clearAllFilters" class="clear-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Posts Feed -->
          <div class="posts-stream">
            <ChallengePost 
              v-for="post in filteredPosts" 
              :key="post.id"
              :post="post"
              @like="likePost"
              @repost="repostPost"
              @share="sharePost"
              class="feed-post"
            />
            
            <!-- Empty State -->
            <div v-if="filteredPosts.length === 0" class="empty-state-card">
              <div class="empty-content">
                <i class="fas fa-comments"></i>
                <h3>No posts yet</h3>
                <p v-if="selectedChallenge">No posts found for this challenge.</p>
                <p v-else-if="selectedTag">No posts found with this tag.</p>
                <p v-else>Be the first to share your challenge progress!</p>
                <button 
                  v-if="authStore.isLoggedIn"
                  @click="showCreateModal = true"
                  class="start-posting-btn"
                >
                  Start Posting
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Right Sidebar - Community Stats & Suggestions -->
        <aside class="right-sidebar">
          <div class="sidebar-section">
            <h3>Community Stats</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{ totalPosts }}</span>
                <span class="stat-label">Posts</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ totalLikes }}</span>
                <span class="stat-label">Likes</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ activeChallenges }}</span>
                <span class="stat-label">Challenges</span>
              </div>
            </div>
          </div>

          <div class="sidebar-section">
            <h3>Top Contributors</h3>
            <div class="contributors-list">
              <div 
                v-for="contributor in topContributors" 
                :key="contributor.id"
                class="contributor-item"
              >
                <div class="contributor-avatar">{{ contributor.avatar }}</div>
                <div class="contributor-info">
                  <span class="contributor-name">{{ contributor.name }}</span>
                  <span class="contributor-posts">{{ contributor.posts }} posts</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Create Post Modal -->
    <CreatePostModal 
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreatePost"
    />

    <!-- Share Modal -->
    <div v-if="showShareModal" class="modal-overlay" @click="closeShareModal">
      <div class="share-modal" @click.stop>
        <div class="share-header">
          <h3>Share Post</h3>
          <button @click="closeShareModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="share-options">
          <button class="share-option" @click="shareToSocial('twitter')">
            <i class="fab fa-twitter"></i>
            Share to Twitter
          </button>
          <button class="share-option" @click="shareToSocial('facebook')">
            <i class="fab fa-facebook"></i>
            Share to Facebook
          </button>
          <button class="share-option" @click="copyPostLink">
            <i class="fas fa-link"></i>
            Copy Link
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useChallengesStore } from '@/stores/challenges'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ChallengePost from '@/components/ChallengePost.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'

export default {
  name: 'ChallengesFeed',
  components: {
    Navbar,
    Footer,
    ChallengePost,
    CreatePostModal
  },
  setup() {
    const authStore = useAuthStore()
    const challengesStore = useChallengesStore()
    
    const showCreateModal = ref(false)
    const showShareModal = ref(false)
    const selectedChallenge = ref(null)
    const selectedTag = ref(null)
    const sharePostId = ref(null)

    // Initialize stores
    onMounted(() => {
      challengesStore.initializeChallenges()
    })

    // Computed properties
    const filteredPosts = computed(() => {
      let posts = challengesStore.getAllPosts
      
      if (selectedChallenge.value) {
        posts = posts.filter(p => p.challengeId === selectedChallenge.value)
      }
      
      if (selectedTag.value) {
        posts = posts.filter(p => p.tags && p.tags.includes(selectedTag.value))
      }
      
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    })

    const currentUserAvatar = computed(() => {
      if (authStore.currentUser) {
        return (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase()
      }
      return 'U'
    })

    const totalPosts = computed(() => challengesStore.getAllPosts.length)
    
    const totalLikes = computed(() => 
      challengesStore.getAllPosts.reduce((sum, post) => sum + post.likes, 0)
    )
    
    const activeChallenges = computed(() => challengesStore.getActiveChallenges.length)

    const trendingTags = computed(() => {
      const tagCounts = {}
      challengesStore.getAllPosts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        }
      })
      
      return Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([tag]) => tag)
    })

    const topContributors = computed(() => {
      const userPosts = {}
      challengesStore.getAllPosts.forEach(post => {
        const key = `${post.userId}-${post.userName}-${post.userAvatar}`
        if (!userPosts[key]) {
          userPosts[key] = {
            id: post.userId,
            name: post.userName,
            avatar: post.userAvatar,
            posts: 0
          }
        }
        userPosts[key].posts++
      })
      
      return Object.values(userPosts)
        .sort((a, b) => b.posts - a.posts)
        .slice(0, 5)
    })

    // Methods
    const filterByChallenge = (challengeId) => {
      selectedChallenge.value = challengeId === selectedChallenge.value ? null : challengeId
      selectedTag.value = null
    }

    const filterByTag = (tag) => {
      selectedTag.value = tag === selectedTag.value ? null : tag
      selectedChallenge.value = null
    }

    const clearFilter = () => {
      selectedChallenge.value = null
    }

    const clearAllFilters = () => {
      selectedChallenge.value = null
      selectedTag.value = null
    }

    const getSelectedChallengeTitle = () => {
      if (selectedChallenge.value) {
        const challenge = challengesStore.getChallengeById(selectedChallenge.value)
        return challenge?.title || ''
      }
      return ''
    }

    const likePost = (postId) => {
      challengesStore.likePost(postId)
    }

    const repostPost = (postId) => {
      if (authStore.currentUser) {
        challengesStore.repostPost(
          postId, 
          authStore.currentUser.id,
          authStore.currentUser.firstName + ' ' + authStore.currentUser.lastName,
          (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase()
        )
      }
    }

    const sharePost = (postId) => {
      sharePostId.value = postId
      showShareModal.value = true
    }

    const closeShareModal = () => {
      showShareModal.value = false
      sharePostId.value = null
    }

    const shareToSocial = (platform) => {
      challengesStore.sharePost(sharePostId.value)
      
      const post = challengesStore.getAllPosts.find(p => p.id === sharePostId.value)
      const url = window.location.href
      const text = `Check out this amazing progress: "${post.content.substring(0, 100)}..."`
      
      let shareUrl = ''
      if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      } else if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
      }
      
      closeShareModal()
    }

    const copyPostLink = async () => {
      challengesStore.sharePost(sharePostId.value)
      
      try {
        await navigator.clipboard.writeText(window.location.href + `#post-${sharePostId.value}`)
        // You could add a toast notification here
        alert('Link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
      
      closeShareModal()
    }

    const handleCreatePost = (postData) => {
      challengesStore.addChallengePost({
        ...postData,
        userId: authStore.currentUser.id,
        userName: authStore.currentUser.firstName + ' ' + authStore.currentUser.lastName,
        userAvatar: (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase()
      })
      showCreateModal.value = false
    }

    return {
      authStore,
      challengesStore,
      showCreateModal,
      showShareModal,
      selectedChallenge,
      selectedTag,
      sharePostId,
      filteredPosts,
      currentUserAvatar,
      totalPosts,
      totalLikes,
      activeChallenges,
      trendingTags,
      topContributors,
      filterByChallenge,
      filterByTag,
      clearFilter,
      clearAllFilters,
      getSelectedChallengeTitle,
      likePost,
      repostPost,
      sharePost,
      closeShareModal,
      shareToSocial,
      copyPostLink,
      handleCreatePost
    }
  }
}
</script>

<style scoped>
/* Social Feed Layout */
.social-feed {
  background: #f8fafc;
  min-height: 100vh;
}

.feed-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 2rem;
  padding: 2rem 1rem;
}

/* Left Sidebar */
.left-sidebar {
  position: sticky;
  top: 8rem;
  height: fit-content;
}

.sidebar-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
}

.sidebar-section h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.create-post-btn {
  width: 100%;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.create-post-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(32, 201, 192, 0.3);
}

.challenges-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.challenge-filter-btn {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.challenge-filter-btn:hover {
  border-color: #20c9c0;
  background: #f0fdfc;
}

.challenge-filter-btn.active {
  border-color: #20c9c0;
  background: linear-gradient(135deg, rgba(32, 201, 192, 0.1), rgba(37, 99, 235, 0.1));
}

.challenge-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.challenge-participants {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.clear-filter-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.clear-filter-btn:hover {
  background: #dc2626;
}

.trending-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.trending-tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.trending-tag:hover {
  background: #20c9c0;
  color: white;
}

/* Main Feed */
.main-feed {
  max-width: 600px;
  margin: 0 auto;
}

.quick-post-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.quick-post-input {
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  color: #6b7280;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.quick-post-input:hover {
  border-color: #20c9c0;
  background: white;
}

.filter-info-card {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  border-left: 4px solid #20c9c0;
}

.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-content span {
  color: #374151;
  font-weight: 500;
}

.clear-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #f3f4f6;
  color: #ef4444;
}

.posts-stream {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feed-post {
  transform: scale(1);
  transition: transform 0.2s ease;
}

.feed-post:hover {
  transform: scale(1.01);
}

.empty-state-card {
  background: white;
  border-radius: 1rem;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 2px dashed #e5e7eb;
}

.empty-content i {
  font-size: 3rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-content h3 {
  font-size: 1.5rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.empty-content p {
  color: #9ca3af;
  margin-bottom: 2rem;
}

.start-posting-btn {
  background: #20c9c0;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-posting-btn:hover {
  background: #1ba8a1;
  transform: translateY(-2px);
}

/* Right Sidebar */
.right-sidebar {
  position: sticky;
  top: 8rem;
  height: fit-content;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #20c9c0;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.contributors-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contributor-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contributor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.contributor-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.contributor-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.contributor-posts {
  color: #6b7280;
  font-size: 0.75rem;
}

/* Share Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.share-modal {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
}

.share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.share-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.share-option:hover {
  background: white;
  border-color: #20c9c0;
}

.share-option i {
  font-size: 1.25rem;
  color: #20c9c0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .feed-container {
    grid-template-columns: 250px 1fr 280px;
    gap: 1rem;
  }
}

@media (max-width: 968px) {
  .feed-container {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
  
  .left-sidebar,
  .right-sidebar {
    display: none;
  }
  
  .main-feed {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .feed-container {
    padding: 1rem 0.5rem;
  }
  
  .quick-post-card {
    padding: 1rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
