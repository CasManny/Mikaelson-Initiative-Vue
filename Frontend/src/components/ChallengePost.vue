<template>
  <div class="challenge-post">
    <!-- Post Header -->
    <div class="post-header">
      <div class="user-info">
        <div class="user-avatar">{{ post.userAvatar }}</div>
        <div class="user-details">
          <h4 class="user-name">{{ post.userName }}</h4>
          <p class="post-time">{{ formatTime(post.createdAt) }}</p>
        </div>
      </div>
      <div class="challenge-badge">
        <span>{{ post.challengeTitle }}</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-section" v-if="post.progress">
      <div class="progress-info">
        <span class="progress-text">
          Day {{ post.progress.currentDay }} of {{ post.progress.totalDays }}
        </span>
        <span class="progress-percentage">{{ post.progress.percentage }}%</span>
      </div>
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: post.progress.percentage + '%' }"
        ></div>
      </div>
      
      <!-- Additional progress info for reading challenge -->
      <div v-if="post.progress.booksRead" class="additional-progress">
        <span>📚 Books: {{ post.progress.booksRead }}/{{ post.progress.totalBooks }}</span>
      </div>
    </div>

    <!-- Post Content -->
    <div class="post-content">
      <p>{{ post.content }}</p>
      
      <!-- Tags -->
      <div class="tags" v-if="post.tags && post.tags.length > 0">
        <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>

    <!-- Post Images -->
    <div class="post-images" v-if="post.images && post.images.length > 0">
      <img 
        v-for="(image, index) in post.images" 
        :key="index"
        :src="image" 
        :alt="`Post image ${index + 1}`"
        class="post-image"
      />
    </div>

    <!-- Post Actions -->
    <div class="post-actions">
      <button 
        @click="$emit('like', post.id)" 
        class="action-btn like-btn"
        :class="{ liked: post.isLiked }"
      >
        <i class="fas fa-heart"></i>
        <span>{{ post.likes }}</span>
      </button>
      
      <button 
        @click="toggleComments" 
        class="action-btn comment-btn"
      >
        <i class="fas fa-comment"></i>
        <span>{{ post.comments }}</span>
      </button>
      
      <button 
        @click="$emit('repost', post.id)" 
        class="action-btn repost-btn"
        :class="{ reposted: post.isReposted }"
      >
        <i class="fas fa-retweet"></i>
        <span>{{ post.reposts }}</span>
      </button>
      
      <button 
        @click="$emit('share', post.id)" 
        class="action-btn share-btn"
      >
        <i class="fas fa-share"></i>
        <span>{{ post.shares }}</span>
      </button>
    </div>

    <!-- Comments Section -->
    <div v-if="showComments" class="comments-section">
      <!-- Add Comment Form -->
      <div class="add-comment-form">
        <div class="comment-avatar">{{ currentUserAvatar }}</div>
        <div class="comment-input-container">
          <textarea 
            v-model="newComment"
            placeholder="Write a comment..."
            class="comment-input"
            rows="2"
            @keydown.enter.prevent="addComment"
          ></textarea>
          <button 
            @click="addComment"
            class="comment-submit-btn"
            :disabled="!newComment.trim()"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <!-- Comments List -->
      <div class="comments-list">
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment-item"
        >
          <div class="comment-avatar">{{ comment.userAvatar }}</div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.userName }}</span>
              <span class="comment-time">{{ formatTime(comment.createdAt) }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button 
                @click="$emit('like-comment', comment.id)"
                class="comment-like-btn"
              >
                <i class="fas fa-heart"></i>
                <span v-if="comment.likes > 0">{{ comment.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Repost indicator -->
    <div v-if="post.isRepost" class="repost-indicator">
      <i class="fas fa-retweet"></i>
      <span>{{ post.repostedBy.userName }} reposted</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useChallengesStore } from '@/stores/challenges'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'ChallengePost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['like', 'repost', 'share', 'add-comment', 'like-comment'],
  setup(props, { emit }) {
    const challengesStore = useChallengesStore()
    const authStore = useAuthStore()
    
    const showComments = ref(false)
    const newComment = ref('')

    const comments = computed(() => {
      return challengesStore.getPostComments(props.post.id)
    })

    const currentUserAvatar = computed(() => {
      if (authStore.currentUser) {
        return (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase()
      }
      return 'U'
    })

    const formatTime = (date) => {
      const now = new Date()
      const postDate = new Date(date)
      const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60))
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - postDate) / (1000 * 60))
        return `${diffInMinutes}m ago`
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`
      } else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays}d ago`
      }
    }

    const toggleComments = () => {
      showComments.value = !showComments.value
    }

    const addComment = () => {
      if (newComment.value.trim() && authStore.currentUser) {
        const commentData = {
          userId: authStore.currentUser.id,
          userName: authStore.currentUser.firstName + ' ' + authStore.currentUser.lastName,
          userAvatar: (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase(),
          content: newComment.value.trim()
        }
        
        challengesStore.addComment(props.post.id, commentData)
        newComment.value = ''
      }
    }

    return {
      showComments,
      newComment,
      comments,
      currentUserAvatar,
      formatTime,
      toggleComments,
      addComment
    }
  }
}
</script>

<style scoped>
.challenge-post {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.challenge-post:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Post Header */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  align-items: center;
  gap: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.user-details {
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.user-name {
  margin: 0;
  line-height: 1.2;
}

.post-time {
  margin: 0;
  line-height: 1.2;
}

.challenge-badge {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Progress Section */
.progress-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.progress-text {
  font-weight: 700;
  color: #111827;
  font-size: 1rem;
}

.progress-percentage {
  font-weight: 700;
  color: #0ea5e9; /* slightly brighter for emphasis */
  font-size: 1.125rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #20c9c0, #2563eb);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.additional-progress {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.4;
}

/* Post Content */
.post-content {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
}

.post-content p {
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: anywhere;
  margin: 0 0 0.875rem 0;
  line-height: 1.7;
  font-size: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
  align-items: center;
}

.tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  line-height: 1;
}

.tag:hover {
  background: #20c9c0;
  color: white;
  cursor: pointer;
}

/* Post Images */
.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Post Actions */
.post-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.action-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.like-btn.liked {
  color: #ef4444;
}

.like-btn.liked i {
  color: #ef4444;
}

.like-btn:hover {
  color: #ef4444;
}

.comment-btn:hover {
  color: #2563eb;
}

.repost-btn.reposted {
  color: #10b981;
}

.repost-btn.reposted i {
  color: #10b981;
}

.repost-btn:hover {
  color: #10b981;
}

.share-btn:hover {
  color: #20c9c0;
}

.action-btn i {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

/* Comments Section */
.comments-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.add-comment-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
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

.comment-input-container {
  flex: 1;
  position: relative;
}

.comment-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  font-size: 0.875rem;
  resize: none;
  transition: border-color 0.2s ease;
}

.comment-input:focus {
  outline: none;
  border-color: #20c9c0;
}

.comment-submit-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: #20c9c0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.comment-submit-btn:hover:not(:disabled) {
  background: #1ba8a1;
}

.comment-submit-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.comment-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  margin-bottom: 0.25rem;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  line-height: 1.2;
}

.comment-time {
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1.2;
}

.comment-text {
  color: #374151;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
}

.comment-like-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.comment-like-btn:hover {
  color: #ef4444;
}

/* Repost indicator */
.repost-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.repost-indicator i {
  color: #10b981;
}

/* Responsive Design */
@media (max-width: 768px) {
  .challenge-post {
    padding: 1rem;
  }
  
  .post-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .challenge-badge {
    align-self: stretch;
    text-align: center;
  }
  
  .post-actions {
    justify-content: space-around;
  }
  
  .action-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
