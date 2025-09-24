<template>
  <div 
    v-if="show && userData" 
    class="mini-profile-overlay"
    @mouseenter="keepOpen"
    @mouseleave="$emit('close')"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
  >
    <div class="mini-profile">
      <div class="mini-profile-header">
        <div class="profile-avatar">{{ userData.avatar || userData.name?.[0] || 'U' }}</div>
        <button 
          v-if="!isCurrentUser"
          @click="toggleFollow"
          :class="['follow-btn', { following: userData.isFollowing }]"
        >
          {{ userData.isFollowing ? 'Following' : 'Follow' }}
        </button>
      </div>
      
      <div class="profile-info">
        <h4 class="profile-name">
          {{ userData.name }}
          <span v-if="userData.verified" class="verified-badge">
            <i class="fas fa-check-circle"></i>
          </span>
        </h4>
        <p class="profile-username">{{ userData.username }}</p>
        <p v-if="userData.bio" class="profile-bio">{{ userData.bio }}</p>
      </div>

      <div class="profile-stats">
        <div class="stat">
          <span class="stat-value">{{ formatNumber(userData.followers) }}</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ formatNumber(userData.following) }}</span>
          <span class="stat-label">Following</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ formatNumber(userData.posts) }}</span>
          <span class="stat-label">Posts</span>
        </div>
      </div>

      <div v-if="userData.recentPosts?.length > 0" class="recent-activity">
        <h5>Recent Activity</h5>
        <div 
          v-for="post in userData.recentPosts.slice(0, 2)" 
          :key="post.id"
          class="recent-post"
        >
          <p>{{ truncateText(post.content, 60) }}</p>
          <span class="post-time">{{ formatTime(post.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'MiniProfile',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: null
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
  emits: ['close', 'follow'],
  setup(props, { emit }) {
    const authStore = useAuthStore()

    const isCurrentUser = computed(() => {
      return authStore.currentUser?.id === props.userData?.id
    })

    const formatNumber = (num) => {
      if (num < 1000) return num.toString()
      if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
      return (num / 1000000).toFixed(1) + 'M'
    }

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

    const truncateText = (text, length) => {
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    const keepOpen = () => {
      // Keep the mini profile open when hovering over it
    }

    const toggleFollow = () => {
      emit('follow', props.userData.id)
    }

    return {
      isCurrentUser,
      formatNumber,
      formatTime,
      truncateText,
      keepOpen,
      toggleFollow
    }
  }
}
</script>

<style scoped>
.mini-profile-overlay {
  position: fixed;
  z-index: 1000;
  pointer-events: auto;
}

.mini-profile {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e1e8ed;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  animation: fadeInScale 0.15s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.mini-profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
}

.follow-btn {
  background: #1da1f2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-btn:hover {
  background: #0d8bd9;
}

.follow-btn.following {
  background: transparent;
  color: #1da1f2;
  border: 1px solid #1da1f2;
}

.follow-btn.following:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #dc2626;
}

.follow-btn.following:hover::after {
  content: "Unfollow";
}

.follow-btn.following:hover .follow-text {
  display: none;
}

.profile-info {
  margin-bottom: 16px;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: #14171a;
  margin: 0 0 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.verified-badge {
  color: #1da1f2;
}

.profile-username {
  color: #657786;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.profile-bio {
  color: #14171a;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

.profile-stats {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e1e8ed;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #14171a;
}

.stat-label {
  font-size: 12px;
  color: #657786;
}

.recent-activity {
  margin-top: 12px;
}

.recent-activity h5 {
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
  margin: 0 0 8px 0;
}

.recent-post {
  padding: 8px 0;
  border-bottom: 1px solid #f7f9fa;
}

.recent-post:last-child {
  border-bottom: none;
}

.recent-post p {
  font-size: 13px;
  color: #14171a;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.post-time {
  font-size: 12px;
  color: #657786;
}
</style>
