<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="comments-modal" @click.stop>
      <div class="modal-header">
        <h3>Comments</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Original Post -->
      <div class="original-post">
        <div class="post-header">
          <div class="user-avatar">{{ post.userAvatar }}</div>
          <div class="user-info">
            <h4 class="user-name">{{ post.userName }}</h4>
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
          </div>
        </div>
        <div class="post-content">
          <p>{{ post.content }}</p>
          <div v-if="post.tags && post.tags.length > 0" class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
        </div>
        <div class="post-stats">
          <span class="stat-item">
            <i class="fas fa-heart"></i>
            {{ formatNumber(post.likes) }} likes
          </span>
          <span class="stat-item">
            <i class="fas fa-comment"></i>
            {{ formatNumber(post.comments) }} comments
          </span>
          <span class="stat-item">
            <i class="fas fa-retweet"></i>
            {{ formatNumber(post.reposts) }} reposts
          </span>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="comments-section">
        <!-- Add Comment Form -->
        <div v-if="authStore.isLoggedIn" class="add-comment-form">
          <div class="comment-avatar">{{ currentUserAvatar }}</div>
          <div class="comment-input-container">
            <textarea 
              v-model="newComment"
              placeholder="Write a comment..."
              class="comment-input"
              rows="3"
              maxlength="500"
              @keydown.enter.prevent="submitComment"
            ></textarea>
            <div class="comment-actions">
              <div class="comment-tools">
                <button class="tool-btn" @click="addEmoji('❤️')">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="tool-btn" @click="addEmoji('👏')">
                  <i class="fas fa-hands-clapping"></i>
                </button>
                <button class="tool-btn" @click="addEmoji('🔥')">
                  <i class="fas fa-fire"></i>
                </button>
                <button class="tool-btn" @click="addEmoji('💪')">
                  <i class="fas fa-dumbbell"></i>
                </button>
              </div>
              <div class="submit-section">
                <span class="char-count">{{ newComment.length }}/500</span>
                <button 
                  @click="submitComment"
                  class="submit-btn"
                  :disabled="!canSubmit"
                >
                  <i class="fas fa-paper-plane"></i>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Login Prompt -->
        <div v-else class="login-prompt">
          <p>Please log in to comment on this post.</p>
          <button class="login-btn">Log In</button>
        </div>

        <!-- Comments Filter -->
        <div v-if="comments.length > 0" class="comments-filter">
          <button 
            v-for="filter in commentFilters" 
            :key="filter.value"
            @click="selectedFilter = filter.value"
            class="filter-btn"
            :class="{ active: selectedFilter === filter.value }"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Comments List -->
        <div class="comments-list">
          <div 
            v-for="comment in filteredComments" 
            :key="comment.id"
            class="comment-item"
            :class="{ 'highlighted': comment.isNew }"
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
                  @click="likeComment(comment.id)"
                  class="comment-action-btn"
                  :class="{ liked: comment.isLiked }"
                >
                  <i class="fas fa-heart"></i>
                  <span v-if="comment.likes > 0">{{ comment.likes }}</span>
                </button>
                <button 
                  @click="replyToComment(comment.id)"
                  class="comment-action-btn"
                >
                  <i class="fas fa-reply"></i>
                  Reply
                </button>
                <button 
                  v-if="comment.userId === authStore.currentUser?.id"
                  @click="deleteComment(comment.id)"
                  class="comment-action-btn delete-btn"
                >
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
              </div>

              <!-- Replies -->
              <div v-if="comment.replies && comment.replies.length > 0" class="replies">
                <div 
                  v-for="reply in comment.replies" 
                  :key="reply.id"
                  class="reply-item"
                >
                  <div class="reply-avatar">{{ reply.userAvatar }}</div>
                  <div class="reply-content">
                    <div class="reply-header">
                      <span class="reply-author">{{ reply.userName }}</span>
                      <span class="reply-time">{{ formatTime(reply.createdAt) }}</span>
                    </div>
                    <p class="reply-text">{{ reply.content }}</p>
                    <div class="reply-actions">
                      <button 
                        @click="likeReply(reply.id)"
                        class="comment-action-btn"
                        :class="{ liked: reply.isLiked }"
                      >
                        <i class="fas fa-heart"></i>
                        <span v-if="reply.likes > 0">{{ reply.likes }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reply Form -->
              <div v-if="replyingTo === comment.id" class="reply-form">
                <div class="comment-avatar small">{{ currentUserAvatar }}</div>
                <div class="reply-input-container">
                  <textarea 
                    v-model="replyText"
                    :placeholder="`Reply to ${comment.userName}...`"
                    class="reply-input"
                    rows="2"
                    maxlength="300"
                    @keydown.enter.prevent="submitReply(comment.id)"
                  ></textarea>
                  <div class="reply-actions">
                    <button @click="cancelReply" class="cancel-btn">Cancel</button>
                    <button 
                      @click="submitReply(comment.id)"
                      class="submit-btn small"
                      :disabled="!replyText.trim()"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Comments -->
          <div v-if="hasMoreComments" class="load-more-section">
            <button @click="loadMoreComments" class="load-more-btn" :disabled="loading">
              <i class="fas fa-spinner fa-spin" v-if="loading"></i>
              <span v-else>Load More Comments</span>
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="comments.length === 0" class="empty-comments">
            <i class="fas fa-comment-slash"></i>
            <h4>No comments yet</h4>
            <p>Be the first to comment on this post!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useChallengesStore } from '@/stores/challenges'

export default {
  name: 'CommentsModal',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'add-comment', 'like-comment'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const challengesStore = useChallengesStore()
    
    const newComment = ref('')
    const replyText = ref('')
    const replyingTo = ref(null)
    const selectedFilter = ref('recent')
    const loading = ref(false)
    const commentsPerPage = 20
    const currentPage = ref(1)

    const commentFilters = [
      { label: 'Most Recent', value: 'recent' },
      { label: 'Most Liked', value: 'popular' },
      { label: 'Oldest First', value: 'oldest' }
    ]

    // Computed properties
    const currentUserAvatar = computed(() => {
      if (authStore.currentUser) {
        return (authStore.currentUser.firstName[0] + authStore.currentUser.lastName[0]).toUpperCase()
      }
      return 'U'
    })

    const canSubmit = computed(() => {
      return newComment.value.trim().length > 0 && newComment.value.length <= 500
    })

    const comments = computed(() => {
      return challengesStore.getPostComments(props.post.id)
    })

    const filteredComments = computed(() => {
      let filtered = [...comments.value]
      
      switch (selectedFilter.value) {
        case 'popular':
          filtered.sort((a, b) => b.likes - a.likes)
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        default: // recent
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }
      
      return filtered.slice(0, currentPage.value * commentsPerPage)
    })

    const hasMoreComments = computed(() => {
      return filteredComments.value.length < comments.value.length
    })

    // Methods
    const formatTime = (date) => {
      const now = new Date()
      const commentDate = new Date(date)
      const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60))
      
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

    const addEmoji = (emoji) => {
      newComment.value += emoji
    }

    const submitComment = () => {
      if (!canSubmit.value || !authStore.currentUser) return

      const commentData = {
        content: newComment.value.trim(),
        isNew: true // Mark as new for highlighting
      }

      emit('add-comment', commentData)
      newComment.value = ''
    }

    const likeComment = (commentId) => {
      emit('like-comment', commentId)
    }

    const replyToComment = (commentId) => {
      replyingTo.value = commentId
      replyText.value = ''
    }

    const cancelReply = () => {
      replyingTo.value = null
      replyText.value = ''
    }

    const submitReply = (commentId) => {
      if (!replyText.value.trim() || !authStore.currentUser) return

      // TODO: Implement reply functionality in store
      console.log('Submit reply to comment:', commentId, replyText.value)
      
      cancelReply()
    }

    const deleteComment = (commentId) => {
      if (confirm('Are you sure you want to delete this comment?')) {
        // TODO: Implement delete functionality in store
        console.log('Delete comment:', commentId)
      }
    }

    const likeReply = (replyId) => {
      // TODO: Implement reply like functionality
      console.log('Like reply:', replyId)
    }

    const loadMoreComments = () => {
      loading.value = true
      setTimeout(() => {
        currentPage.value++
        loading.value = false
      }, 500)
    }

    // Remove highlighting after a delay
    onMounted(() => {
      setTimeout(() => {
        comments.value.forEach(comment => {
          if (comment.isNew) {
            comment.isNew = false
          }
        })
      }, 3000)
    })

    return {
      authStore,
      newComment,
      replyText,
      replyingTo,
      selectedFilter,
      loading,
      commentFilters,
      currentUserAvatar,
      canSubmit,
      comments,
      filteredComments,
      hasMoreComments,
      formatTime,
      formatNumber,
      addEmoji,
      submitComment,
      likeComment,
      replyToComment,
      cancelReply,
      submitReply,
      deleteComment,
      likeReply,
      loadMoreComments
    }
  }
}
</script>

<style scoped>
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
  padding: 1rem;
}

.comments-modal {
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  font-size: 1.25rem;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.original-post {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
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

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.post-time {
  color: #6b7280;
  font-size: 0.875rem;
}

.post-content p {
  margin: 0 0 0.75rem 0;
  color: #374151;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-item i {
  color: #20c9c0;
}

.comments-section {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.add-comment-form {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.comment-avatar {
  width: 40px;
  height: 40px;
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

.comment-avatar.small {
  width: 32px;
  height: 32px;
  font-size: 0.75rem;
}

.comment-input-container {
  flex: 1;
}

.comment-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  font-size: 1rem;
  resize: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.comment-input:focus {
  outline: none;
  border-color: #20c9c0;
  box-shadow: 0 0 0 3px rgba(32, 201, 192, 0.1);
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
}

.comment-tools {
  display: flex;
  gap: 0.5rem;
}

.tool-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: #f3f4f6;
  color: #20c9c0;
}

.submit-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.char-count {
  font-size: 0.75rem;
  color: #6b7280;
}

.submit-btn {
  background: #20c9c0;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.submit-btn:hover:not(:disabled) {
  background: #1ba8a1;
}

.submit-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.login-prompt {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.login-prompt p {
  margin: 0 0 1rem 0;
  color: #6b7280;
}

.login-btn {
  background: #20c9c0;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background: #1ba8a1;
}

.comments-filter {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.filter-btn {
  background: none;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #20c9c0;
  color: #20c9c0;
}

.filter-btn.active {
  background: #20c9c0;
  color: white;
  border-color: #20c9c0;
}

.comments-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.comment-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.comment-item.highlighted {
  background: linear-gradient(135deg, rgba(32, 201, 192, 0.1), rgba(37, 99, 235, 0.05));
  border: 1px solid rgba(32, 201, 192, 0.2);
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.comment-time {
  color: #6b7280;
  font-size: 0.75rem;
}

.comment-text {
  margin: 0 0 0.75rem 0;
  color: #374151;
  line-height: 1.5;
  font-size: 0.875rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.comment-action-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.comment-action-btn:hover {
  color: #20c9c0;
}

.comment-action-btn.liked {
  color: #ef4444;
}

.comment-action-btn.delete-btn:hover {
  color: #ef4444;
}

.replies {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #f3f4f6;
}

.reply-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.reply-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.reply-content {
  flex: 1;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.reply-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.75rem;
}

.reply-time {
  color: #6b7280;
  font-size: 0.625rem;
}

.reply-text {
  margin: 0 0 0.5rem 0;
  color: #374151;
  line-height: 1.4;
  font-size: 0.75rem;
}

.reply-actions {
  display: flex;
  gap: 0.5rem;
}

.reply-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.reply-input-container {
  flex: 1;
}

.reply-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  resize: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.reply-input:focus {
  outline: none;
  border-color: #20c9c0;
  box-shadow: 0 0 0 2px rgba(32, 201, 192, 0.1);
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cancel-btn {
  background: none;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.cancel-btn:hover {
  border-color: #6b7280;
  color: #374151;
}

.load-more-section {
  text-align: center;
  padding: 1rem 0;
}

.load-more-btn {
  background: white;
  border: 2px solid #20c9c0;
  color: #20c9c0;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #20c9c0;
  color: white;
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.empty-comments {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-comments i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-comments h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.empty-comments p {
  margin: 0;
  font-size: 0.875rem;
}

/* Responsive design */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 0;
  }
  
  .comments-modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .original-post {
    padding: 1rem;
  }
  
  .add-comment-form {
    padding: 1rem;
  }
  
  .comments-filter {
    padding: 0.75rem 1rem;
    overflow-x: auto;
  }
  
  .filter-btn {
    white-space: nowrap;
  }
  
  .comments-list {
    padding: 0.75rem 1rem;
  }
  
  .comment-item {
    padding: 0.75rem;
  }
  
  .comment-actions {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

/* Animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comments-modal {
  animation: slideUp 0.3s ease;
}
</style>
