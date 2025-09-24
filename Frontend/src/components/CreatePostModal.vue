<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Share Your Challenge Progress</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="submitPost" class="post-form">
        <!-- Challenge Selection -->
        <div class="form-group">
          <label for="challenge">Select Challenge *</label>
          <select 
            id="challenge" 
            v-model="selectedChallenge" 
            required
            class="form-control"
          >
            <option value="">Choose a challenge...</option>
            <option 
              v-for="challenge in challenges" 
              :key="challenge.id" 
              :value="challenge.id"
            >
              {{ challenge.title }}
            </option>
          </select>
        </div>

        <!-- Progress Information -->
        <div v-if="selectedChallenge" class="form-group">
          <label>Progress Information</label>
          <div class="progress-inputs">
            <div class="input-row">
              <div class="input-group">
                <label for="currentDay">Current Day *</label>
                <input 
                  id="currentDay"
                  type="number" 
                  v-model.number="progress.currentDay" 
                  :max="selectedChallengeData?.duration || 100"
                  min="1"
                  required
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <label for="totalDays">Total Days</label>
                <input 
                  id="totalDays"
                  type="number" 
                  :value="selectedChallengeData?.duration || progress.totalDays"
                  readonly
                  class="form-control"
                />
              </div>
            </div>
            
            <!-- Additional fields for reading challenge -->
            <div v-if="selectedChallengeData?.category === 'Learning' && selectedChallengeData?.title.includes('Read')" class="input-row">
              <div class="input-group">
                <label for="booksRead">Books Read</label>
                <input 
                  id="booksRead"
                  type="number" 
                  v-model.number="progress.booksRead" 
                  min="0"
                  max="10"
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <label for="totalBooks">Total Books Goal</label>
                <input 
                  id="totalBooks"
                  type="number" 
                  :value="5"
                  readonly
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Post Content -->
        <div class="form-group">
          <label for="content">Share your experience *</label>
          <div class="content-input-wrapper">
            <textarea 
              id="content"
              v-model="content" 
              placeholder="Tell the community about your progress, challenges, wins, or insights..."
              required
              class="form-control textarea"
              rows="4"
              @input="handleContentInput"
            ></textarea>
            <div class="input-toolbar">
              <div class="toolbar-left">
                <button type="button" @click="toggleEmojiPicker" class="toolbar-btn" title="Add emoji">
                  <i class="fas fa-smile"></i>
                </button>
                <button type="button" @click="selectImage" class="toolbar-btn" title="Add image">
                  <i class="fas fa-image"></i>
                </button>
                <button type="button" @click="showMentionSuggestions" class="toolbar-btn" title="Mention someone">
                  <i class="fas fa-at"></i>
                </button>
                <button type="button" @click="addHashtag" class="toolbar-btn" title="Add hashtag">
                  <i class="fas fa-hashtag"></i>
                </button>
              </div>
              <div class="char-count" :class="{ 'over-limit': content.length > 500 }">
                {{ content.length }}/500
              </div>
            </div>
          </div>
          
          <!-- Emoji Picker -->
          <div v-if="showEmojiPicker" class="emoji-picker">
            <div class="emoji-grid">
              <span 
                v-for="emoji in commonEmojis" 
                :key="emoji"
                @click="addEmoji(emoji)"
                class="emoji-item"
              >
                {{ emoji }}
              </span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="form-group">
          <label for="tags">Tags (optional)</label>
          <input 
            id="tags"
            type="text" 
            v-model="tagsInput" 
            placeholder="Enter tags separated by commas (e.g., motivation, fitness, reading)"
            class="form-control"
          />
          <small class="help-text">Add relevant tags to help others find your post</small>
        </div>

        <!-- Image Upload Placeholder -->
        <div class="form-group">
          <label>Images (coming soon)</label>
          <div class="image-upload-placeholder">
            <i class="fas fa-camera"></i>
            <p>Image upload feature will be available soon</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary" :disabled="!canSubmit">
            Share Progress
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useChallengesStore } from '@/stores/challenges'

export default {
  name: 'CreatePostModal',
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const challengesStore = useChallengesStore()
    
    const selectedChallenge = ref('')
    const content = ref('')
    const tagsInput = ref('')
    const showEmojiPicker = ref(false)
    const mentionSuggestions = ref([])
    const progress = ref({
      currentDay: 1,
      totalDays: 30,
      booksRead: 0,
      totalBooks: 5
    })

    // Common emojis for the picker
    const commonEmojis = [
      '😊', '😍', '🤩', '😎', '😤', '💪', '🔥', '⚡', '✨', '🌟',
      '🎯', '🚀', '💯', '👏', '🙌', '💡', '📚', '✏️', '📝', '🏆',
      '🥇', '🎖️', '🏅', '💎', '🌈', '☀️', '🌅', '🌄', '🗻', '🎭'
    ]

    // Get challenges from store
    const challenges = computed(() => challengesStore.getActiveChallenges)
    
    // Get selected challenge data
    const selectedChallengeData = computed(() => {
      if (selectedChallenge.value) {
        return challengesStore.getChallengeById(selectedChallenge.value)
      }
      return null
    })

    // Update total days when challenge is selected
    watch(selectedChallenge, (newValue) => {
      if (newValue) {
        const challenge = challengesStore.getChallengeById(newValue)
        if (challenge) {
          progress.value.totalDays = challenge.duration
        }
      }
    })

    // Calculate progress percentage
    const progressPercentage = computed(() => {
      if (progress.value.totalDays > 0) {
        return Math.round((progress.value.currentDay / progress.value.totalDays) * 100)
      }
      return 0
    })

    // Check if form can be submitted
    const canSubmit = computed(() => {
      return selectedChallenge.value && 
             content.value.trim().length > 0 && 
             content.value.length <= 500 &&
             progress.value.currentDay > 0 &&
             progress.value.currentDay <= progress.value.totalDays
    })

    // Methods
    const closeModal = () => {
      emit('close')
    }

    const submitPost = () => {
      if (!canSubmit.value) return

      const tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0)

      const postData = {
        challengeId: selectedChallenge.value,
        challengeTitle: selectedChallengeData.value.title,
        content: content.value.trim(),
        progress: {
          currentDay: progress.value.currentDay,
          totalDays: progress.value.totalDays,
          percentage: progressPercentage.value,
          ...(progress.value.booksRead > 0 && {
            booksRead: progress.value.booksRead,
            totalBooks: progress.value.totalBooks
          })
        },
        tags,
        images: [] // Will be implemented later
      }

      emit('submit', postData)
    }

    // Emoji picker functionality
    const toggleEmojiPicker = () => {
      showEmojiPicker.value = !showEmojiPicker.value
    }

    const addEmoji = (emoji) => {
      content.value += emoji
      showEmojiPicker.value = false
    }

    // Content input handling
    const handleContentInput = (event) => {
      const text = event.target.value
      // You could add auto-complete for hashtags and mentions here
      content.value = text
    }

    // Mention functionality
    const showMentionSuggestions = () => {
      content.value += '@'
      // In a real app, this would show a dropdown with user suggestions
    }

    // Hashtag functionality
    const addHashtag = () => {
      content.value += '#'
    }

    // Image selection
    const selectImage = () => {
      // This would open a file picker in a real implementation
      console.log('Image selection coming soon!')
    }

    return {
      selectedChallenge,
      content,
      tagsInput,
      progress,
      showEmojiPicker,
      commonEmojis,
      challenges,
      selectedChallengeData,
      progressPercentage,
      canSubmit,
      closeModal,
      submitPost,
      toggleEmojiPicker,
      addEmoji,
      handleContentInput,
      showMentionSuggestions,
      addHashtag,
      selectImage
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

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid #e1e8ed;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
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

.post-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #20c9c0;
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.progress-inputs {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.input-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-row:last-child {
  margin-bottom: 0;
}

.input-group {
  flex: 1;
}

.input-group label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.help-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Content Input Enhancements */
.content-input-wrapper {
  position: relative;
}

.input-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #f9fafb;
}

.toolbar-left {
  display: flex;
  gap: 8px;
}

.toolbar-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.toolbar-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.char-count {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.char-count.over-limit {
  color: #dc2626;
}

/* Emoji Picker */
.emoji-picker {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  z-index: 100;
  margin-top: 4px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.emoji-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.2s ease;
}

.emoji-item:hover {
  background: #f3f4f6;
}

.image-upload-placeholder {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.image-upload-placeholder i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #d1d5db;
}

.image-upload-placeholder p {
  margin: 0;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #20c9c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1ba8a1;
}

.btn-primary:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .input-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
