<template>
  <div v-if="show" class="notification-container" :class="type">
    <div class="notification-content">
      <div class="notification-icon">
        <i :class="iconClass"></i>
      </div>
      <div class="notification-text">
        <h4 v-if="title">{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <button @click="close" class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'NotificationToast',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info', // 'success', 'error', 'warning', 'info'
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const iconClass = computed(() => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return icons[props.type] || icons.info
    })

    const close = () => {
      emit('close')
    }

    // Auto close functionality would be handled by parent component
    
    return {
      iconClass,
      close
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 100px;
  right: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #e1e8ed;
  min-width: 320px;
  max-width: 400px;
  z-index: 1100;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
}

.notification-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.notification-text {
  flex: 1;
}

.notification-text h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
}

.notification-text p {
  margin: 0;
  font-size: 14px;
  color: #657786;
  line-height: 1.4;
}

.notification-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #657786;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.notification-close:hover {
  background: #f7f9fa;
  color: #14171a;
}

/* Type-specific styles */
.notification-container.success {
  border-left: 4px solid #17bf63;
}

.notification-container.success .notification-icon {
  background: #e6f7ff;
  color: #17bf63;
}

.notification-container.error {
  border-left: 4px solid #e0245e;
}

.notification-container.error .notification-icon {
  background: #ffeef0;
  color: #e0245e;
}

.notification-container.warning {
  border-left: 4px solid #ffad1f;
}

.notification-container.warning .notification-icon {
  background: #fffbf0;
  color: #ffad1f;
}

.notification-container.info {
  border-left: 4px solid #1da1f2;
}

.notification-container.info .notification-icon {
  background: #e8f5fd;
  color: #1da1f2;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .notification-container {
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
