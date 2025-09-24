<template>
  <div class="social-feed-page">
    <!-- Navigation -->
    <Navbar />

    <main class="social-feed-container">
      <!-- Feed Layout -->
      <div class="feed-layout">
        <!-- Left Sidebar - Navigation & Quick Actions -->
        <aside class="left-sidebar">
          <!-- User Profile Card -->
          <!-- <div v-if="authStore.isLoggedIn" class="profile-card">  -->
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">{{ currentUserAvatar }}</div>
              <div class="profile-info">
                <h4>{{ currentUserName }}</h4>
                <p>
                  {{ userStats.posts }} posts •
                  {{ userStats.followers }} followers
                </p>
              </div>
            </div>
            <div class="profile-actions">
              <button @click="showCreateModal = true" class="create-post-btn">
                <i class="fas fa-plus"></i>
                What's happening?
              </button>
            </div>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-value">{{ userStats.streak }}</span>
                <span class="stat-label">Day Streak</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ userStats.challenges }}</span>
                <span class="stat-label">Challenges</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ userStats.points }}</span>
                <span class="stat-label">Points</span>
              </div>
            </div>
          </div>

          <!-- Quick Search -->
          <div class="search-card">
            <div class="search-input-container">
              <i class="fas fa-search"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search posts, users, hashtags..."
                @input="handleSearch"
                class="search-input"
              />
            </div>
            <div
              v-if="searchResults.length > 0 && searchQuery"
              class="search-results"
            >
              <div class="search-section">
                <h5>Recent searches</h5>
                <div
                  v-for="result in searchResults.slice(0, 5)"
                  :key="result.id"
                  class="search-result-item"
                >
                  <i class="fas fa-search"></i>
                  <span @click="applySearch(result.query)">{{
                    result.query
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <div class="nav-menu">
            <button
              @click="setFeedFilter('all')"
              class="nav-item"
              :class="{ active: currentFilter === 'all' }"
              style="width: auto"
            >
              <i class="fas fa-home"></i>
              <span style="width: auto">For You</span>
            </button>
            <button
              @click="setFeedFilter('following')"
              class="nav-item"
              :class="{ active: currentFilter === 'following' }"
            >
              <i class="fas fa-users"></i>
              <span>Following</span>
            </button>
            <button
              @click="setFeedFilter('challenges')"
              class="nav-item"
              :class="{ active: currentFilter === 'challenges' }"
            >
              <i class="fas fa-trophy"></i>
              <span>Challenges</span>
            </button>
            <button
              @click="setFeedFilter('achievements')"
              class="nav-item"
              :class="{ active: currentFilter === 'achievements' }"
            >
              <i class="fas fa-medal"></i>
              <span>Wins</span>
            </button>
          </div>

          <!-- Trending Topics -->
          <div class="trending-panel">
            <h3><i class="fas fa-fire"></i> Trending</h3>
            <div class="trending-list">
              <div
                v-for="(tag, index) in trendingTags"
                :key="tag"
                class="trending-item"
                @click="filterByTag(tag)"
              >
                <span class="trending-rank">{{ index + 1 }}</span>
                <div class="trending-info">
                  <span class="trending-tag">#{{ tag }}</span>
                  <span class="trending-count"
                    >{{ getTagCount(tag) }} posts</span
                  >
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Feed -->
        <main class="main-feed">
          <!-- Create Post Section (Twitter-like) -->
          <div v-if="authStore.isLoggedIn" class="create-post-section">
            <div class="create-post-header">
              <div class="user-avatar">{{ currentUserAvatar }}</div>
              <div class="create-post-input-area">
                <button
                  @click="showCreateModal = true"
                  class="create-post-input"
                  placeholder="What's happening with your challenges?"
                >
                  What's happening with your challenges?
                </button>
                <div class="post-type-tabs">
                  <button class="post-type-tab active">
                    <i class="fas fa-trophy"></i>
                    Progress
                  </button>
                  <button class="post-type-tab">
                    <i class="fas fa-star"></i>
                    Win
                  </button>
                  <button class="post-type-tab">
                    <i class="fas fa-chart-line"></i>
                    Update
                  </button>
                  <button class="post-type-tab">
                    <i class="fas fa-lightbulb"></i>
                    Reflection
                  </button>
                </div>
              </div>
            </div>
            <div class="create-post-actions">
              <div class="post-options">
                <button class="post-option-btn" @click="showCreateModal = true">
                  <i class="fas fa-image"></i>
                  Photo
                </button>
                <button class="post-option-btn" @click="showCreateModal = true">
                  <i class="fas fa-poll"></i>
                  Poll
                </button>
                <button class="post-option-btn" @click="showCreateModal = true">
                  <i class="fas fa-calendar"></i>
                  Schedule
                </button>
              </div>
              <button
                @click="showCreateModal = true"
                class="post-btn"
                :disabled="!authStore.isLoggedIn"
              >
                Post
              </button>
            </div>
          </div>

          <!-- Feed Tabs -->
          <div class="feed-tabs">
            <button
              @click="setFeedFilter('all')"
              class="feed-tab"
              :class="{ active: currentFilter === 'all' }"
            >
              For You
            </button>
            <button
              @click="setFeedFilter('following')"
              class="feed-tab"
              :class="{ active: currentFilter === 'following' }"
            >
              Following
            </button>
            <button
              @click="setFeedFilter('challenges')"
              class="feed-tab"
              :class="{ active: currentFilter === 'challenges' }"
            >
              Challenges
            </button>
          </div>

          <!-- Feed Filter -->
          <div v-if="selectedChallenge || selectedTag" class="feed-filter">
            <div class="filter-info">
              <i class="fas fa-filter"></i>
              <span v-if="selectedChallenge">
                Showing posts for:
                <strong>{{ getSelectedChallengeTitle() }}</strong>
              </span>
              <span v-else-if="selectedTag">
                Posts tagged: <strong>#{{ selectedTag }}</strong>
              </span>
              <button @click="clearAllFilters" class="clear-filter-btn">
                <i class="fas fa-times"></i>
                Clear
              </button>
            </div>
          </div>

          <!-- Posts Feed -->
          <div class="posts-feed" ref="postsContainer">
            <!-- Real-time posting indicator -->
            <div
              v-if="newPostsAvailable"
              class="new-posts-indicator"
              @click="loadNewPosts"
            >
              <i class="fas fa-arrow-up"></i>
              {{ newPostsCount }} new posts available
            </div>

            <SocialPost
              v-for="post in displayedPosts"
              :key="post.id"
              :post="post"
              :showProgress="currentFilter === 'challenges'"
              @like="likePost"
              @repost="repostPost"
              @share="sharePost"
              @comment="showCommentsForPost"
              @user-click="viewUserProfile"
              @user-hover="showUserMiniProfile"
              @user-hover-end="hideMiniProfile"
              @tag-click="filterByTag"
              @mention-click="viewUserProfile"
              @save="savePost"
              @report="reportPost"
              class="feed-post"
            />

            <!-- Loading indicator -->
            <div v-if="loading" class="loading-indicator">
              <div class="loading-spinner"></div>
              <p>Loading more posts...</p>
            </div>

            <!-- Empty State -->
            <div
              v-if="displayedPosts.length === 0 && !loading"
              class="empty-state"
            >
              <div class="empty-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h3>{{ getEmptyStateTitle() }}</h3>
              <p>{{ getEmptyStateMessage() }}</p>
              <button
                v-if="authStore.isLoggedIn && currentFilter === 'all'"
                @click="showCreateModal = true"
                class="start-posting-btn"
              >
                <i class="fas fa-plus"></i>
                Share Your First Update
              </button>
            </div>

            <!-- Infinite scroll trigger -->
            <div
              v-if="hasMorePosts && !loading"
              class="scroll-trigger"
              ref="scrollTrigger"
            ></div>
          </div>
        </main>

        <!-- Right Sidebar - Community & Suggestions -->
        <aside class="right-sidebar">
          <!-- Live Stats -->
          <div class="stats-card">
            <h3 style="color: grey">
              <i class="fas fa-chart-area"></i> Community Stats
            </h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-icon">📝</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalPosts }}</span>
                  <span class="stat-label">Posts Today</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">❤️</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalLikes }}</span>
                  <span class="stat-label">Likes</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🔥</div>
                <div class="stat-info">
                  <span class="stat-value">{{ activeChallenges }}</span>
                  <span class="stat-label">Active Challenges</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">👥</div>
                <div class="stat-info">
                  <span class="stat-value">{{ communityMembers }}</span>
                  <span class="stat-label">Members</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Contributors -->
          <div class="contributors-card">
            <h3><i class="fas fa-crown"></i> Top Contributors</h3>
            <div class="contributors-list">
              <div
                v-for="(contributor, index) in topContributors"
                :key="contributor.id"
                class="contributor-item"
                @click="viewUserProfile(contributor.id)"
              >
                <div class="contributor-rank">{{ index + 1 }}</div>
                <div class="contributor-avatar">{{ contributor.avatar }}</div>
                <div class="contributor-info">
                  <span class="contributor-name">{{ contributor.name }}</span>
                  <span class="contributor-stats"
                    >{{ contributor.posts }} posts •
                    {{ contributor.likes }} likes</span
                  >
                </div>
                <div class="contributor-badge">
                  <i class="fas fa-medal"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggested Challenges -->
          <div class="suggestions-card">
            <h3><i class="fas fa-lightbulb"></i> Suggested for You</h3>
            <div class="suggestions-list">
              <div
                v-for="challenge in suggestedChallenges"
                :key="challenge.id"
                class="suggestion-item"
              >
                <div class="suggestion-icon">{{ challenge.icon }}</div>
                <div class="suggestion-info">
                  <h4>{{ challenge.title }}</h4>
                  <p>{{ challenge.description }}</p>
                  <div class="suggestion-meta">
                    <span class="suggestion-duration"
                      >{{ challenge.duration }} days</span
                    >
                    <span class="suggestion-participants"
                      >{{ challenge.participants }} joined</span
                    >
                  </div>
                </div>
                <button class="join-btn">Join</button>
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
    <ShareModal
      v-if="showShareModal"
      :post="selectedPost"
      @close="closeShareModal"
      @share="handleShare"
    />

    <!-- Comments Modal -->
    <CommentsModal
      v-if="showCommentsModal"
      :post="selectedPost"
      @close="closeCommentsModal"
      @add-comment="handleAddComment"
      @like-comment="handleLikeComment"
    />

    <!-- Mini Profile Hover -->
    <MiniProfile
      :show="showMiniProfile"
      :userData="miniProfileData"
      :position="{ x: 0, y: 0 }"
      @close="hideMiniProfile"
      @follow="followUser"
    />

    <!-- Footer -->
    <Footer />

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useChallengesStore } from "@/stores/challenges";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CreatePostModal from "@/components/CreatePostModal.vue";
import SocialPost from "@/components/SocialPost.vue";
import ShareModal from "@/components/ShareModal.vue";
import CommentsModal from "@/components/CommentsModal.vue";
import MiniProfile from "@/components/MiniProfile.vue";
import MobileBottomNav from "@/components/MobileBottomNav.vue";

export default {
  name: "SocialFeed",
  components: {
    Navbar,
    Footer,
    CreatePostModal,
    SocialPost,
    ShareModal,
    CommentsModal,
    MiniProfile,
    MobileBottomNav,
  },
  setup() {
    const authStore = useAuthStore();
    const challengesStore = useChallengesStore();

    // Modal states
    const showCreateModal = ref(false);
    const showShareModal = ref(false);
    const showCommentsModal = ref(false);

    // Filter states
    const selectedChallenge = ref(null);
    const selectedTag = ref(null);
    const selectedPost = ref(null);
    const currentFilter = ref("all"); // 'all', 'following', 'challenges', 'achievements'

    // Search functionality
    const searchQuery = ref("");
    const searchResults = ref([]);
    const isSearching = ref(false);

    // Loading states
    const loading = ref(false);
    const postsPerPage = 15;
    const currentPage = ref(1);

    // Real-time updates
    const newPostsAvailable = ref(false);
    const newPostsCount = ref(0);
    const lastPostTime = ref(new Date());

    // Mini profile hover state
    const hoveredUserId = ref(null);
    const showMiniProfile = ref(false);
    const miniProfileData = ref(null);
    const hoverTimeout = ref(null);

    // Bookmarked posts
    const bookmarkedPosts = ref(new Set());

    // Refs
    const postsContainer = ref(null);
    const scrollTrigger = ref(null);

    // Initialize data
    onMounted(() => {
      challengesStore.initializeChallenges();
      setupInfiniteScroll();
      startRealTimeUpdates();
    });

    // Infinite scroll setup
    const setupInfiniteScroll = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMorePosts.value &&
            !loading.value
          ) {
            loadMorePosts();
          }
        },
        { threshold: 0.1 }
      );

      watch(scrollTrigger, (newVal) => {
        if (newVal) observer.observe(newVal);
      });
    };

    // Real-time updates simulation
    const startRealTimeUpdates = () => {
      setInterval(() => {
        // Simulate new posts
        if (Math.random() > 0.7) {
          newPostsCount.value += Math.floor(Math.random() * 3) + 1;
          newPostsAvailable.value = true;
        }
      }, 30000); // Check every 30 seconds
    };

    // Computed properties
    const currentUserAvatar = computed(() => {
      if (authStore.currentUser) {
        return (
          authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]
        ).toUpperCase();
      }
      return "U";
    });

    const currentUserName = computed(() => {
      if (authStore.currentUser) {
        return `${authStore.currentUser.firstName} ${authStore.currentUser.lastName}`;
      }
      return "User";
    });

    const userStats = computed(() => ({
      posts: challengesStore.getUserChallenges(authStore.currentUser?.id || 0)
        .length,
      followers: 245, // Mock data
      streak: 7, // Mock data
      challenges: 3, // Mock data
      points: 1250, // Mock data
    }));

    const filteredPosts = computed(() => {
      let posts = challengesStore.getAllPosts;

      // Apply filter based on current filter type
      switch (currentFilter.value) {
        case "following":
          // Filter posts from users the current user follows (mock)
          posts = posts.filter((p) => p.userId !== authStore.currentUser?.id);
          break;
        case "challenges":
          // Filter posts that are challenge-related
          posts = posts.filter((p) => p.challengeId);
          break;
        case "achievements":
          // Filter posts that are wins/achievements
          posts = posts.filter(
            (p) =>
              p.tags?.includes("achievement") ||
              p.tags?.includes("win") ||
              p.progress?.percentage === 100
          );
          break;
        default:
          // 'all' - show all posts
          break;
      }

      if (selectedChallenge.value) {
        posts = posts.filter((p) => p.challengeId === selectedChallenge.value);
      }

      if (selectedTag.value) {
        posts = posts.filter(
          (p) => p.tags && p.tags.includes(selectedTag.value)
        );
      }

      return posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    });

    const displayedPosts = computed(() => {
      return filteredPosts.value.slice(0, currentPage.value * postsPerPage);
    });

    const hasMorePosts = computed(() => {
      return displayedPosts.value.length < filteredPosts.value.length;
    });

    const totalPosts = computed(() => challengesStore.getAllPosts.length);

    const totalLikes = computed(() =>
      challengesStore.getAllPosts.reduce((sum, post) => sum + post.likes, 0)
    );

    const activeChallenges = computed(
      () => challengesStore.getActiveChallenges.length
    );

    const communityMembers = computed(() => 1247); // Mock data

    const activeChallengeSummary = computed(() =>
      challengesStore.getActiveChallenges.slice(0, 4).map((challenge) => ({
        ...challenge,
        progress: Math.floor(Math.random() * 100), // Mock progress
      }))
    );

    const trendingTags = computed(() => {
      const tagCounts = {};
      challengesStore.getAllPosts.forEach((post) => {
        if (post.tags) {
          post.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      return Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => tag);
    });

    const topContributors = computed(() => {
      const userPosts = {};
      challengesStore.getAllPosts.forEach((post) => {
        const key = `${post.userId}-${post.userName}-${post.userAvatar}`;
        if (!userPosts[key]) {
          userPosts[key] = {
            id: post.userId,
            name: post.userName,
            avatar: post.userAvatar,
            posts: 0,
            likes: 0,
          };
        }
        userPosts[key].posts++;
        userPosts[key].likes += post.likes;
      });

      return Object.values(userPosts)
        .sort((a, b) => b.posts - a.posts)
        .slice(0, 5);
    });

    const suggestedChallenges = computed(() => [
      {
        id: 99,
        title: "Digital Detox",
        description: "Disconnect to reconnect with yourself",
        duration: 7,
        participants: 189,
        icon: "📱",
      },
      {
        id: 100,
        title: "Gratitude Journal",
        description: "Write 3 things you're grateful for daily",
        duration: 21,
        participants: 342,
        icon: "📝",
      },
      {
        id: 101,
        title: "Water Challenge",
        description: "Drink 8 glasses of water every day",
        duration: 14,
        participants: 156,
        icon: "💧",
      },
    ]);

    // Methods
    const setFeedFilter = (filter) => {
      currentFilter.value = filter;
      currentPage.value = 1;
      selectedChallenge.value = null;
      selectedTag.value = null;
    };

    const loadNewPosts = () => {
      newPostsAvailable.value = false;
      newPostsCount.value = 0;
      // In a real app, this would fetch new posts from the server
      lastPostTime.value = new Date();
    };

    const getEmptyStateTitle = () => {
      switch (currentFilter.value) {
        case "following":
          return "No posts from people you follow";
        case "challenges":
          return "No challenge posts yet";
        case "achievements":
          return "No wins to celebrate yet";
        default:
          return "Welcome to your feed!";
      }
    };

    const getEmptyStateMessage = () => {
      switch (currentFilter.value) {
        case "following":
          return "Follow more people to see their updates here.";
        case "challenges":
          return "Join challenges and share your progress.";
        case "achievements":
          return "Complete challenges to share your wins!";
        default:
          return "Share your first update or join a challenge to get started.";
      }
    };
    const filterByChallenge = (challengeId) => {
      selectedChallenge.value =
        challengeId === selectedChallenge.value ? null : challengeId;
      selectedTag.value = null;
      currentPage.value = 1;
    };

    const filterByTag = (tag) => {
      selectedTag.value = tag === selectedTag.value ? null : tag;
      selectedChallenge.value = null;
      currentPage.value = 1;
    };

    const clearAllFilters = () => {
      selectedChallenge.value = null;
      selectedTag.value = null;
      currentPage.value = 1;
    };

    const getSelectedChallengeTitle = () => {
      if (selectedChallenge.value) {
        const challenge = challengesStore.getChallengeById(
          selectedChallenge.value
        );
        return challenge?.title || "";
      }
      return "";
    };

    const getTagCount = (tag) => {
      return challengesStore.getAllPosts.filter(
        (post) => post.tags && post.tags.includes(tag)
      ).length;
    };

    const loadMorePosts = () => {
      if (loading.value) return;
      loading.value = true;
      setTimeout(() => {
        currentPage.value++;
        loading.value = false;
      }, 800);
    };

    // Search functionality
    const handleSearch = (event) => {
      const query = event.target.value;
      if (query.length > 2) {
        isSearching.value = true;
        // Simulate search results - in real app, this would call an API
        setTimeout(() => {
          searchResults.value = [
            { id: 1, query: query, type: "recent" },
            { id: 2, query: "#" + query, type: "hashtag" },
            { id: 3, query: "@" + query, type: "user" },
          ];
          isSearching.value = false;
        }, 300);
      } else {
        searchResults.value = [];
      }
    };

    const applySearch = (searchTerm) => {
      searchQuery.value = searchTerm;
      // Apply the search filter to posts
      // This would typically update the filteredPosts computation
    };

    // Mini profile functionality
    const showUserMiniProfile = (userId, event) => {
      clearTimeout(hoverTimeout.value);
      hoverTimeout.value = setTimeout(() => {
        hoveredUserId.value = userId;
        showMiniProfile.value = true;
        // Mock user data - in real app, fetch from API
        miniProfileData.value = {
          id: userId,
          name: "User Name",
          username: "@username",
          bio: "Passionate about personal growth and challenges",
          followers: 245,
          following: 189,
          posts: 67,
          isFollowing: false,
        };
      }, 500);
    };

    const hideMiniProfile = () => {
      clearTimeout(hoverTimeout.value);
      hoverTimeout.value = setTimeout(() => {
        showMiniProfile.value = false;
        miniProfileData.value = null;
      }, 200);
    };

    const followUser = (userId) => {
      // Implement follow functionality
      console.log("Following user:", userId);
      if (miniProfileData.value) {
        miniProfileData.value.isFollowing = !miniProfileData.value.isFollowing;
      }
    };

    // Post interactions
    const likePost = (postId) => {
      challengesStore.likePost(postId);
    };

    const repostPost = (postId) => {
      if (authStore.currentUser) {
        challengesStore.repostPost(
          postId,
          authStore.currentUser.id,
          currentUserName.value,
          currentUserAvatar.value
        );
      }
    };

    const sharePost = (postId) => {
      const post = challengesStore.getAllPosts.find((p) => p.id === postId);
      selectedPost.value = post;
      showShareModal.value = true;
    };

    const savePost = (postId) => {
      // TODO: Implement save functionality
      console.log("Save post:", postId);
    };

    const reportPost = (postId) => {
      // TODO: Implement report functionality
      console.log("Report post:", postId);
    };

    const showCommentsForPost = (postId) => {
      const post = challengesStore.getAllPosts.find((p) => p.id === postId);
      selectedPost.value = post;
      showCommentsModal.value = true;
    };

    const viewUserProfile = (userId) => {
      // TODO: Navigate to user profile
      console.log("View user profile:", userId);
    };

    // Modal handlers
    const handleCreatePost = (postData) => {
      challengesStore.addChallengePost({
        ...postData,
        userId: authStore.currentUser.id,
        userName: currentUserName.value,
        userAvatar: currentUserAvatar.value,
      });
      showCreateModal.value = false;
    };

    const handleShare = (shareData) => {
      challengesStore.sharePost(selectedPost.value.id);
      showShareModal.value = false;
      selectedPost.value = null;
      // TODO: Handle actual sharing to social platforms
    };

    const closeShareModal = () => {
      showShareModal.value = false;
      selectedPost.value = null;
    };

    const closeCommentsModal = () => {
      showCommentsModal.value = false;
      selectedPost.value = null;
    };

    const handleAddComment = (commentData) => {
      challengesStore.addComment(selectedPost.value.id, {
        ...commentData,
        userId: authStore.currentUser.id,
        userName: currentUserName.value,
        userAvatar: currentUserAvatar.value,
      });
    };

    const handleLikeComment = (commentId) => {
      challengesStore.likeComment(commentId);
    };

    return {
      authStore,
      challengesStore,
      showCreateModal,
      showShareModal,
      showCommentsModal,
      selectedChallenge,
      selectedTag,
      selectedPost,
      currentFilter,
      searchQuery,
      searchResults,
      isSearching,
      showMiniProfile,
      miniProfileData,
      bookmarkedPosts,
      loading,
      newPostsAvailable,
      newPostsCount,
      postsContainer,
      scrollTrigger,
      currentUserAvatar,
      currentUserName,
      userStats,
      filteredPosts,
      displayedPosts,
      hasMorePosts,
      totalPosts,
      totalLikes,
      activeChallenges,
      communityMembers,
      activeChallengeSummary,
      trendingTags,
      topContributors,
      suggestedChallenges,
      setFeedFilter,
      loadNewPosts,
      getEmptyStateTitle,
      getEmptyStateMessage,
      filterByChallenge,
      filterByTag,
      clearAllFilters,
      getSelectedChallengeTitle,
      getTagCount,
      loadMorePosts,
      handleSearch,
      applySearch,
      showUserMiniProfile,
      hideMiniProfile,
      followUser,
      likePost,
      repostPost,
      sharePost,
      savePost,
      reportPost,
      showCommentsForPost,
      viewUserProfile,
      handleCreatePost,
      handleShare,
      closeShareModal,
      closeCommentsModal,
      handleAddComment,
      handleLikeComment,
    };
  },
};
</script>

<style scoped>
/* Main Container */
.social-feed-page {
  background: #f8fafc;
  min-height: 100vh;
}

.social-feed-container {
  background: #f8fafc;
  min-height: 100vh;
  padding-top: 90px;
}

/* Feed Layout */
.feed-layout {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 24px;
  padding: 0 16px;
}

/* Left Sidebar */
.left-sidebar {
  position: sticky;
  top: 100px;
  height: calc(100vh - 100px);
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 16px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e1e8ed;
  transition: border-color 0.2s ease;
  flex-shrink: 0;
}

.profile-card:hover {
  border-color: #d1d5db;
}

/* Search Card */
.search-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e1e8ed;
  position: relative;
  flex-shrink: 0;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-container i {
  position: absolute;
  left: 16px;
  color: #657786;
  font-size: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #e1e8ed;
  border-radius: 24px;
  background: #f7f9fa;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  background: white;
  border-color: #1da1f2;
  outline: 2px solid rgba(29, 161, 242, 0.1);
  outline-offset: 0;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  z-index: 100;
  margin-top: 8px;
  overflow: hidden;
}

.search-section h5 {
  padding: 12px 16px 8px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
  border-bottom: 1px solid #f7f9fa;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #14171a;
}

.search-result-item:hover {
  background: #f7f9fa;
}

.search-result-item i {
  color: #657786;
  font-size: 14px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
}

.profile-info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #14171a;
}

.profile-info p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #657786;
}

.profile-actions {
  margin-bottom: 16px;
}

.create-post-btn {
  width: 100%;
  background: #1da1f2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.create-post-btn:hover {
  background: #0d8bd9;
  transform: translateY(-1px);
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #e1e8ed;
}

.stat {
  text-align: center;
  padding: 8px 4px;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1da1f2;
}

.stat-label {
  font-size: 11px;
  color: #657786;
  font-weight: 500;
  margin-top: 2px;
}

.nav-menu {
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  overflow: hidden;
  flex-shrink: 0;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: none;
  border: none;
  color: #14171a;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  border-bottom: 1px solid #f7f9fa;
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-item:hover {
  background: #f8fafc;
}

.nav-item.active {
  background: #eff6ff;
  color: #1da1f2;
  font-weight: 600;
  border-left: 3px solid #1da1f2;
}

.nav-item i {
  font-size: 16px;
  width: 18px;
  text-align: center;
}

.trending-panel {
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  overflow: hidden;
  flex: 1;
  min-height: 0;
}

.trending-panel h3 {
  margin: 0;
  padding: 16px 20px;
  font-size: 20px;
  font-weight: 700;
  color: #14171a;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.trending-list {
  height: calc(100% - 60px);
  overflow-y: auto;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f7f9fa;
}

.trending-item:hover {
  background: #f7f9fa;
}

.trending-item:last-child {
  border-bottom: none;
}

.trending-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1da1f2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.trending-info {
  flex: 1;
}

.trending-tag {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #14171a;
  margin-bottom: 2px;
}

.trending-count {
  font-size: 14px;
  color: #657786;
}

/* Main Feed */
.main-feed {
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  min-height: 100vh;
  background: white;
  border-radius: 0;
}

.create-post-section {
  border-bottom: 1px solid #e1e8ed;
  padding: 20px;
  background: #fafbfc;
}

.create-post-header {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.create-post-input-area {
  flex: 1;
}

.create-post-input {
  width: 100%;
  background: none;
  border: none;
  font-size: 20px;
  color: #657786;
  cursor: pointer;
  text-align: left;
  padding: 12px 0;
  min-height: 50px;
  line-height: 1.4;
}

.create-post-input:focus {
  outline: none;
  color: #14171a;
}

.post-type-tabs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.post-type-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f7f9fa;
  border: 1px solid #e1e8ed;
  color: #657786;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-type-tab:hover {
  background: #e8f5fd;
  border-color: #1da1f2;
  color: #1da1f2;
}

.post-type-tab.active {
  background: #1da1f2;
  border-color: #1da1f2;
  color: white;
}

.create-post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e1e8ed;
}

.post-options {
  display: flex;
  gap: 16px;
}

.post-option-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #1da1f2;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  font-size: 18px;
}

.post-option-btn:hover {
  background: #e8f5fd;
}

.post-btn {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-btn:hover:not(:disabled) {
  background: #0d8bd9;
}

.post-btn:disabled {
  background: #aab8c2;
  cursor: not-allowed;
}

.feed-tabs {
  display: flex;
  border-bottom: 1px solid #e1e8ed;
  background: white;
  position: sticky;
  top: 90px;
  z-index: 10;
}

.feed-tab {
  flex: 1;
  background: none;
  border: none;
  padding: 16px;
  color: #657786;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.feed-tab:hover {
  background: #f7f9fa;
  color: #14171a;
}

.feed-tab.active {
  color: #1da1f2;
  font-weight: 700;
}

.feed-tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #1da1f2;
  border-radius: 2px;
}

.feed-filter {
  background: #e8f5fd;
  border-bottom: 1px solid #e1e8ed;
  padding: 12px 16px;
}

.filter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #14171a;
  font-size: 14px;
}

.clear-filter-btn {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.clear-filter-btn:hover {
  background: #0d8bd9;
}

.posts-feed {
  background: white;
}

.new-posts-indicator {
  background: #1da1f2;
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-bottom: 1px solid #e1e8ed;
}

.new-posts-indicator:hover {
  background: #0d8bd9;
}

.feed-post {
  border-bottom: 1px solid #e1e8ed;
  transition: all 0.2s ease;
}

.feed-post:hover {
  background: #f7f9fa;
}

.loading-indicator {
  text-align: center;
  padding: 40px 20px;
  color: #657786;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e1e8ed;
  border-top: 3px solid #1da1f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
  border-bottom: 1px solid #e1e8ed;
}

.empty-icon i {
  font-size: 48px;
  color: #aab8c2;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #14171a;
  margin-bottom: 8px;
  font-weight: 700;
}

.empty-state p {
  color: #657786;
  margin-bottom: 24px;
  font-size: 16px;
}

.start-posting-btn {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.start-posting-btn:hover {
  background: #0d8bd9;
  transform: translateY(-1px);
}

.scroll-trigger {
  height: 20px;
}

/* Right Sidebar */
.right-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-card,
.stats-card,
.contributors-card,
.suggestions-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  overflow: hidden;
}

.stats-card h3,
.contributors-card h3,
.suggestions-card h3 {
  margin: 0;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 600;
  color: #14171a;
  border-bottom: 1px solid #f7f9fa;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: #f7f9fa;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
}

.stat-icon {
  font-size: 18px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #1da1f2;
}

.stat-label {
  font-size: 12px;
  color: #657786;
  font-weight: 500;
}

.contributors-list {
  max-height: 300px;
  overflow-y: auto;
}

.contributor-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f7f9fa;
}

.contributor-item:hover {
  background: #f7f9fa;
}

.contributor-item:last-child {
  border-bottom: none;
}

.contributor-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffad00, #ff6b35);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.contributor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
}

.contributor-info {
  flex: 1;
}

.contributor-name {
  display: block;
  font-weight: 700;
  color: #14171a;
  font-size: 14px;
  margin-bottom: 2px;
}

.contributor-stats {
  font-size: 12px;
  color: #657786;
}

.contributor-badge {
  color: #ffad00;
  font-size: 16px;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f7f9fa;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: #f7f9fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-icon {
  font-size: 20px;
  padding: 8px;
  background: #f7f9fa;
  border-radius: 8px;
}

.suggestion-info {
  flex: 1;
}

.suggestion-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 700;
  color: #14171a;
}

.suggestion-info p {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #657786;
  line-height: 1.4;
}

.suggestion-meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
}

.suggestion-duration {
  color: #1da1f2;
  font-weight: 600;
}

.suggestion-participants {
  color: #657786;
}

.join-btn {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.join-btn:hover {
  background: #0d8bd9;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .feed-layout {
    grid-template-columns: 250px 1fr 300px;
    gap: 20px;
  }
}

@media (max-width: 968px) {
  .feed-layout {
    grid-template-columns: 1fr;
    max-width: 600px;
    gap: 0;
  }

  .left-sidebar,
  .right-sidebar {
    display: none;
  }

  .main-feed {
    border-left: none;
    border-right: none;
  }
}

@media (max-width: 640px) {
  .social-feed-container {
    padding-top: 80px;
  }

  .feed-layout {
    padding: 0;
  }

  .create-post-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .user-avatar {
    align-self: flex-start;
  }

  .post-type-tabs {
    justify-content: center;
  }

  .create-post-actions {
    flex-direction: column;
    gap: 12px;
  }

  .post-options {
    justify-content: center;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.feed-post {
  animation: fadeInUp 0.3s ease-out;
}

.loading-spinner {
  animation: pulse 1.5s ease-in-out infinite;
}

.new-posts-indicator {
  animation: fadeInUp 0.3s ease-out;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .feed-post,
  .loading-spinner,
  .new-posts-indicator {
    animation: none;
  }

  .profile-avatar,
  .contributor-avatar,
  button {
    transition: none;
  }
}

/* Focus styles for accessibility */
button:focus,
.nav-item:focus,
.search-input:focus {
  outline: 2px solid #1da1f2;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .social-post {
    border: 2px solid #14171a;
  }

  .profile-card,
  .search-card,
  .stats-card {
    border: 2px solid #14171a;
  }
}

/* Dark mode preparation (can be activated with theme toggle) */
@media (prefers-color-scheme: dark) {
  .social-feed-page {
    background: #15202b;
    color: #ffffff;
  }

  .profile-card,
  .search-card,
  .stats-card,
  .main-feed {
    background: #1c2938;
    border-color: #38444d;
  }
}
</style>
