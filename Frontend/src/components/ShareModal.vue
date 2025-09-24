<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="share-modal" @click.stop>
      <div class="modal-header">
        <h3>Share Post</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="post-preview">
        <div class="post-header">
          <div class="user-avatar">{{ post.userAvatar }}</div>
          <div class="user-info">
            <span class="user-name">{{ post.userName }}</span>
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
          </div>
        </div>
        <p class="post-content">{{ truncateText(post.content, 100) }}</p>
      </div>

      <div class="share-options">
        <button 
          class="share-option twitter"
          @click="shareToTwitter"
        >
          <div class="option-icon">
            <i class="fab fa-twitter"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Share to Twitter</span>
            <span class="option-desc">Share with your Twitter followers</span>
          </div>
        </button>

        <button 
          class="share-option facebook"
          @click="shareToFacebook"
        >
          <div class="option-icon">
            <i class="fab fa-facebook"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Share to Facebook</span>
            <span class="option-desc">Post to your Facebook timeline</span>
          </div>
        </button>

        <button 
          class="share-option linkedin"
          @click="shareToLinkedIn"
        >
          <div class="option-icon">
            <i class="fab fa-linkedin"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Share to LinkedIn</span>
            <span class="option-desc">Share with your professional network</span>
          </div>
        </button>

        <button 
          class="share-option whatsapp"
          @click="shareToWhatsApp"
        >
          <div class="option-icon">
            <i class="fab fa-whatsapp"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Share to WhatsApp</span>
            <span class="option-desc">Send to WhatsApp contacts</span>
          </div>
        </button>

        <button 
          class="share-option copy-link"
          @click="copyLink"
        >
          <div class="option-icon">
            <i class="fas fa-link"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Copy Link</span>
            <span class="option-desc">Copy link to clipboard</span>
          </div>
          <div v-if="linkCopied" class="copied-indicator">
            <i class="fas fa-check"></i>
          </div>
        </button>

        <button 
          class="share-option email"
          @click="shareViaEmail"
        >
          <div class="option-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="option-info">
            <span class="option-title">Share via Email</span>
            <span class="option-desc">Send via email</span>
          </div>
        </button>
      </div>

      <div class="additional-options">
        <button class="option-btn" @click="embedPost">
          <i class="fas fa-code"></i>
          Embed Post
        </button>
        <button class="option-btn" @click="reportPost">
          <i class="fas fa-flag"></i>
          Report Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ShareModal',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'share'],
  setup(props, { emit }) {
    const linkCopied = ref(false)

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
        const days = Math.floor(diffInHours / 24)
        return `${days}d ago`
      }
    }

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    }

    const getShareUrl = () => {
      return `${window.location.origin}${window.location.pathname}#post-${props.post.id}`
    }

    const getShareText = () => {
      return `Check out this amazing progress update: "${truncateText(props.post.content, 100)}" - Mikaelson Initiative`
    }

    const shareToTwitter = () => {
      const url = getShareUrl()
      const text = getShareText()
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=MikaelsonInitiative,PersonalGrowth`
      
      window.open(twitterUrl, '_blank', 'width=600,height=400')
      emit('share', { platform: 'twitter', postId: props.post.id })
    }

    const shareToFacebook = () => {
      const url = getShareUrl()
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      
      window.open(facebookUrl, '_blank', 'width=600,height=400')
      emit('share', { platform: 'facebook', postId: props.post.id })
    }

    const shareToLinkedIn = () => {
      const url = getShareUrl()
      const text = getShareText()
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
      
      window.open(linkedinUrl, '_blank', 'width=600,height=400')
      emit('share', { platform: 'linkedin', postId: props.post.id })
    }

    const shareToWhatsApp = () => {
      const url = getShareUrl()
      const text = `${getShareText()} ${url}`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      
      window.open(whatsappUrl, '_blank')
      emit('share', { platform: 'whatsapp', postId: props.post.id })
    }

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(getShareUrl())
        linkCopied.value = true
        setTimeout(() => {
          linkCopied.value = false
        }, 2000)
        emit('share', { platform: 'copy_link', postId: props.post.id })
      } catch (err) {
        console.error('Failed to copy link:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = getShareUrl()
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        linkCopied.value = true
        setTimeout(() => {
          linkCopied.value = false
        }, 2000)
      }
    }

    const shareViaEmail = () => {
      const subject = 'Check out this progress update'
      const body = `${getShareText()}\n\n${getShareUrl()}`
      const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      window.location.href = emailUrl
      emit('share', { platform: 'email', postId: props.post.id })
    }

    const embedPost = () => {
      // TODO: Generate embed code
      const embedCode = `<iframe src="${getShareUrl()}?embed=true" width="500" height="300" frameborder="0"></iframe>`
      navigator.clipboard.writeText(embedCode)
      alert('Embed code copied to clipboard!')
    }

    const reportPost = () => {
      // TODO: Implement report functionality
      alert('Thank you for your report. We will review this post.')
      emit('close')
    }

    return {
      linkCopied,
      formatTime,
      truncateText,
      shareToTwitter,
      shareToFacebook,
      shareToLinkedIn,
      shareToWhatsApp,
      copyLink,
      shareViaEmail,
      embedPost,
      reportPost
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

.share-modal {
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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

.post-preview {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.post-time {
  color: #6b7280;
  font-size: 0.75rem;
}

.post-content {
  margin: 0;
  color: #374151;
  line-height: 1.5;
  font-size: 0.875rem;
}

.share-options {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  position: relative;
}

.share-option:hover {
  border-color: #20c9c0;
  background: #f8fafc;
  transform: translateX(4px);
}

.option-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  flex-shrink: 0;
}

.twitter .option-icon {
  background: #1da1f2;
}

.facebook .option-icon {
  background: #1877f2;
}

.linkedin .option-icon {
  background: #0077b5;
}

.whatsapp .option-icon {
  background: #25d366;
}

.copy-link .option-icon {
  background: #6b7280;
}

.email .option-icon {
  background: #ea4335;
}

.option-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.option-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
  margin-bottom: 0.125rem;
}

.option-desc {
  color: #6b7280;
  font-size: 0.875rem;
}

.copied-indicator {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #10b981;
  font-size: 1.25rem;
}

.additional-options {
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;
}

.option-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.option-btn:hover {
  border-color: #20c9c0;
  color: #20c9c0;
  background: #f8fafc;
}

/* Responsive design */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .share-modal {
    max-width: 100%;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .post-preview {
    padding: 1rem;
  }
  
  .share-options {
    padding: 1rem;
  }
  
  .share-option {
    padding: 0.75rem;
  }
  
  .option-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .additional-options {
    padding: 0 1rem 1rem 1rem;
    flex-direction: column;
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

.share-modal {
  animation: slideUp 0.3s ease;
}
</style>
