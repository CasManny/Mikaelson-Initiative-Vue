<template>
  <article class="social-post" :class="{ 'is-repost': post.isRepost }">
    <!-- Repost indicator -->
    <div v-if="post.isRepost" class="repost-indicator">
      <i class="fas fa-retweet"></i>
      <span>{{ post.repostedBy.userName }} reposted</span>
    </div>

    <!-- Post header -->
    <header class="post-header">
      <div class="user-section" 
           @click="$emit('user-click', post.userId)"
           @mouseenter="$emit('user-hover', post.userId, $event)"
           @mouseleave="$emit('user-hover-end')"
      >
        <div class="user-avatar">{{ post.userAvatar }}</div>
        <div class="user-details">
          <h4 class="user-name">
            {{ post.userName }}
            <span v-if="post.verified" class="verified-badge">
              <i class="fas fa-check-circle"></i>
            </span>
          </h4>
          <div class="post-meta">
            <span class="username">@{{ post.userName.toLowerCase().replace(' ', '') }}</span>
            <span class="separator">•</span>
            <span class="post-time" :title="new Date(post.createdAt).toLocaleString()">
              {{ formatTime(post.createdAt) }}
            </span>
            <span v-if="post.challengeTitle" class="separator">•</span>
            <span v-if="post.challengeTitle" class="challenge-name">{{ post.challengeTitle }}</span>
          </div>
        </div>
      </div>
      <div class="post-options">
        <button class="options-btn" @click="showOptions = !showOptions" aria-label="More options">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <div v-if="showOptions" class="options-menu" @click.stop>
          <button @click="copyPostLink" class="option-item">
            <i class="fas fa-link"></i>
            Copy link to post
          </button>
          <button @click="bookmarkPost" class="option-item">
            <i class="fas fa-bookmark"></i>
            {{ isBookmarked ? 'Remove bookmark' : 'Bookmark post' }}
          </button>
          <button @click="reportPost" class="option-item">
            <i class="fas fa-flag"></i>
            Report post
          </button>
        </div>
      </div>
    </header>

    <!-- Progress section -->
    <div v-if="post.progress && showProgress" class="progress-section">
      <div class="progress-header">
        <div class="progress-info">
          <span class="progress-title">Progress Update</span>
          <span class="progress-details">
            Day {{ post.progress.currentDay }} of {{ post.progress.totalDays }}
          </span>
        </div>
        <div class="progress-percentage">
          <div class="percentage-circle" :style="{ '--progress': calculatedProgress + '%' }">
            <span>{{ calculatedProgress }}%</span>
          </div>
        </div>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: calculatedProgress + '%' }"
        ></div>
      </div>

      <!-- Additional progress metrics -->
      <div v-if="post.progress.booksRead" class="additional-metrics">
        <div class="metric">
          <i class="fas fa-book"></i>
          <span>{{ post.progress.booksRead }}/{{ post.progress.totalBooks }} books</span>
        </div>
      </div>
    </div>

    <!-- Post content -->
    <div class="post-content">
      <div class="post-text" v-html="formatPostContent(post.content)"></div>
      
      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="tags-section">
        <span 
          v-for="tag in post.tags" 
          :key="tag" 
          class="tag"
          @click="$emit('tag-click', tag)"
          role="button"
          tabindex="0"
          @keydown.enter="$emit('tag-click', tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Post images -->
    <div v-if="post.images && post.images.length > 0" class="post-images">
      <div 
        class="image-grid"
        :class="{
          'single-image': post.images.length === 1,
          'two-images': post.images.length === 2,
          'multiple-images': post.images.length > 2
        }"
      >
        <div 
          v-for="(image, index) in post.images.slice(0, 4)" 
          :key="index"
          class="image-container"
          @click="openImageModal(index)"
        >
          <img 
            :src="image" 
            :alt="`Post image ${index + 1}`"
            class="post-image"
          />
          <div v-if="index === 3 && post.images.length > 4" class="image-overlay">
            <span>+{{ post.images.length - 4 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement stats -->
    <div v-if="hasEngagement" class="engagement-stats">
      <div class="engagement-numbers">
        <span v-if="post.likes > 0" class="engagement-item" @click="showLikers">
          <i class="fas fa-heart text-red"></i>
          {{ formatNumber(post.likes) }}
        </span>
        <span v-if="post.comments > 0" class="engagement-item" @click="$emit('comment', post.id)">
          {{ formatNumber(post.comments) }} {{ post.comments === 1 ? 'comment' : 'comments' }}
        </span>
        <span v-if="post.reposts > 0" class="engagement-item">
          {{ formatNumber(post.reposts) }} {{ post.reposts === 1 ? 'repost' : 'reposts' }}
        </span>
      </div>
    </div>

    <!-- Action buttons -->
    <footer class="post-actions">
      <button 
        @click="$emit('like', post.id)" 
        class="action-btn like-btn"
        :class="{ 'liked': post.isLiked }"
      >
        <i class="fas fa-heart"></i>
        <span>{{ formatNumber(post.likes) }}</span>
      </button>
      
      <button 
        @click="$emit('comment', post.id)" 
        class="action-btn comment-btn"
      >
        <i class="fas fa-comment"></i>
        <span>{{ formatNumber(post.comments) }}</span>
      </button>
      
      <button 
        @click="$emit('repost', post.id)" 
        class="action-btn repost-btn"
        :class="{ 'reposted': post.isReposted }"
      >
        <i class="fas fa-retweet"></i>
        <span>{{ formatNumber(post.reposts) }}</span>
      </button>
      
      <button 
        @click="$emit('share', post.id)" 
        class="action-btn share-btn"
      >
        <i class="fas fa-share"></i>
        <span>{{ formatNumber(post.shares) }}</span>
      </button>

      <button 
        @click="bookmarkPost" 
        class="action-btn bookmark-btn"
        :class="{ 'bookmarked': isBookmarked }"
      >
        <i class="fas fa-bookmark"></i>
      </button>
    </footer>

    <!-- Quick comment preview -->
    <div v-if="showQuickComments && hasComments" class="quick-comments">
      <div 
        v-for="comment in quickComments" 
        :key="comment.id"
        class="quick-comment"
      >
        <div class="comment-avatar">{{ comment.userAvatar }}</div>
        <div class="comment-content">
          <span class="comment-author">{{ comment.userName }}</span>
          <span class="comment-text">{{ comment.content }}</span>
        </div>
      </div>
      <button 
        v-if="post.comments > quickComments.length"
        @click="$emit('comment', post.id)"
        class="view-more-comments"
      >
        View {{ post.comments - quickComments.length }} more comments
      </button>
    </div>
  </article>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useChallengesStore } from '@/stores/challenges'

export default {
  name: 'SocialPost',
  props: {
    post: {
      type: Object,
      required: true
    },
    showProgress: {
      type: Boolean,
      default: true
    }
  },
  emits: ['like', 'repost', 'share', 'comment', 'user-click', 'user-hover', 'user-hover-end', 'tag-click', 'mention-click', 'save', 'report'],
  setup(props, { emit }) {
    const challengesStore = useChallengesStore()
    
    const showOptions = ref(false)
    const showQuickComments = ref(false)
    const isBookmarked = ref(false)

    // Computed properties
    const hasEngagement = computed(() => 
      props.post.likes > 0 || props.post.comments > 0 || props.post.reposts > 0
    )

    const hasComments = computed(() => props.post.comments > 0)

    const quickComments = computed(() => {
      const comments = challengesStore.getPostComments(props.post.id)
      return comments.slice(0, 2) // Show first 2 comments
    })

    // Calculate progress percentage automatically based on current day and total days
    const calculatedProgress = computed(() => {
      if (props.post.progress && props.post.progress.currentDay && props.post.progress.totalDays) {
        const percentage = Math.round((props.post.progress.currentDay / props.post.progress.totalDays) * 100)
        return Math.min(percentage, 100) // Cap at 100%
      }
      return 0
    })

    // Methods
    const formatTime = (date) => {
      const now = new Date()
      const postDate = new Date(date)
      const diffInMinutes = Math.floor((now - postDate) / (1000 * 60))
      
      if (diffInMinutes < 1) {
        return 'now'
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m`
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60)
        return `${hours}h`
      } else {
        const days = Math.floor(diffInMinutes / 1440)
        return `${days}d`
      }
    }

    const formatNumber = (num) => {
      if (num < 1000) return num.toString()
      if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
      return (num / 1000000).toFixed(1) + 'M'
    }

    const formatPostContent = (content) => {
      // Format hashtags and @mentions as clickable links
      return content
        .replace(/#(\w+)/g, '<span class="hashtag-link" data-tag="$1">#$1</span>')
        .replace(/@(\w+)/g, '<span class="mention-link" data-user="$1">@$1</span>')
    }

    const copyPostLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href + `#post-${props.post.id}`)
        // TODO: Show toast notification
        console.log('Link copied!')
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
      showOptions.value = false
    }

    const reportPost = () => {
      // TODO: Implement report functionality
      console.log('Report post:', props.post.id)
      showOptions.value = false
      emit('report', props.post.id)
    }

    const bookmarkPost = () => {
      isBookmarked.value = !isBookmarked.value
      // TODO: Store bookmark in user preferences
      emit('save', props.post.id)
    }

    const openImageModal = (index) => {
      // TODO: Open image lightbox/modal
      console.log('Open image modal for image:', index)
    }

    const showLikers = () => {
      // TODO: Show modal with list of users who liked the post
      console.log('Show likers for post:', props.post.id)
    }

    // Click outside to close options
    const handleClickOutside = (event) => {
      if (!event.target.closest('.post-options')) {
        showOptions.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      // Show quick comments for posts with comments
      if (hasComments.value) {
        setTimeout(() => {
          showQuickComments.value = true
        }, 500)
      }
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showOptions,
      showQuickComments,
      isBookmarked,
      hasEngagement,
      hasComments,
      quickComments,
      calculatedProgress,
      formatTime,
      formatNumber,
      formatPostContent,
      copyPostLink,
      reportPost,
      bookmarkPost,
      openImageModal,
      showLikers
    }
  }
}
</script>

<style scoped>
.social-post {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  transition: background-color 0.2s ease;
  position: relative;
}

.social-post:hover {
  background: #fafbfc;
}

.social-post.is-repost {
  border-left: 3px solid #17bf63;
  background: #f8fff9;
}

/* Repost indicator */
.repost-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #657786;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  padding-left: 40px;
}

.repost-indicator i {
  color: #17bf63;
  font-size: 16px;
}

/* Post header */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  flex: 1;
}

.user-section:hover {
  opacity: 0.8;
}

.user-avatar {
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
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #14171a;
  margin-bottom: 2px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #657786;
  font-size: 14px;
}

.separator {
  font-weight: 700;
}

.challenge-name {
  color: #1da1f2;
  font-weight: 500;
}

.post-options {
  position: relative;
}

.options-btn {
  background: none;
  border: none;
  color: #657786;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
}

.options-btn:hover {
  background: #e1e8ed;
  color: #1da1f2;
}

.options-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  z-index: 10;
  min-width: 200px;
  overflow: hidden;
}

.option-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #14171a;
  font-size: 14px;
}

.option-item:hover {
  background: #f7f9fa;
}

.option-item i {
  width: 16px;
  color: #657786;
}

/* Progress section */
.progress-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e1e8ed;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-info {
  flex: 1;
  text-align: left;
}

.progress-title {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  display: block;
}

.progress-details {
  color: #6b7280;
  font-size: 12px;
  margin-top: 2px;
  display: block;
}

.percentage-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: conic-gradient(#20c9c0 var(--progress), #e5e7eb var(--progress));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.percentage-circle::before {
  content: '';
  position: absolute;
  inset: 6px;
  background: white;
  border-radius: 50%;
}

.percentage-circle span {
  position: relative;
  z-index: 1;
  font-size: 0.75rem;
  font-weight: 600;
  color: #20c9c0;
  line-height: 1;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #20c9c0, #2563eb);
  border-radius: 3px;
  transition: width 0.8s ease;
}

.additional-metrics {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.metric {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.metric i {
  color: #20c9c0;
}

/* Post content */
.post-content {
  margin-bottom: 1rem;
}

.post-text {
  color: #374151;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  word-wrap: break-word;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #20c9c0;
  color: white;
  transform: translateY(-1px);
}

/* Hashtag and mention links */
.post-text :deep(.hashtag-link),
.post-text :deep(.mention-link) {
  color: #1da1f2;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-text :deep(.hashtag-link):hover,
.post-text :deep(.mention-link):hover {
  color: #0d8bd9;
  text-decoration: underline;
}

.username {
  color: #657786;
  font-size: 14px;
}

.verified-badge {
  color: #1da1f2;
  margin-left: 4px;
}

.verified-badge i {
  font-size: 14px;
}

/* Post images */
.post-images {
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.image-grid {
  display: grid;
  gap: 2px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.image-grid.single-image {
  grid-template-columns: 1fr;
}

.image-grid.two-images {
  grid-template-columns: 1fr 1fr;
}

.image-grid.multiple-images {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .post-image {
  transform: scale(1.05);
}

.image-grid.single-image .post-image {
  height: 300px;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
}

/* Engagement stats */
.engagement-stats {
  padding: 0.75rem 0;
  border-top: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 0.75rem;
}

.engagement-numbers {
  display: flex;
  gap: 1rem;
}

.engagement-item {
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.engagement-item:hover {
  color: #374151;
}

.text-red {
  color: #ef4444;
}

/* Action buttons */
.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  justify-content: center;
}

.action-btn:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

.like-btn:hover,
.like-btn.liked {
  color: #ef4444;
}

.like-btn.liked {
  background: rgba(239, 68, 68, 0.1);
}

.comment-btn:hover {
  color: #2563eb;
}

.repost-btn:hover,
.repost-btn.reposted {
  color: #10b981;
}

.repost-btn.reposted {
  background: rgba(16, 185, 129, 0.1);
}

.share-btn:hover {
  color: #20c9c0;
}

.bookmark-btn:hover,
.bookmark-btn.bookmarked {
  color: #f59e0b;
}

.bookmark-btn.bookmarked {
  background: rgba(245, 158, 11, 0.1);
}

.action-btn i {
  font-size: 1rem;
}

/* Quick comments */
.quick-comments {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.quick-comment {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.comment-avatar {
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
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  background: #f9fafb;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.comment-text {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.4;
}

.view-more-comments {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.view-more-comments:hover {
  color: #20c9c0;
}

/* Responsive design */
@media (max-width: 768px) {
  .social-post {
    padding: 1rem;
  }
  
  .post-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .progress-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .percentage-circle {
    align-self: flex-end;
  }
  
  .post-actions {
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.5rem;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .action-btn span {
    font-size: 0.75rem;
  }
  
  .image-grid.multiple-images {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .engagement-numbers {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tags-section {
    gap: 0.25rem;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
  }
}

/* Animation for new posts */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-post {
  animation: slideInFromTop 0.5s ease;
}
</style>
