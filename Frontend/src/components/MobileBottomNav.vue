<template>
  <nav v-if="isMobile" class="mobile-bottom-nav">
    <router-link 
      v-for="item in navItems" 
      :key="item.name"
      :to="item.path"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
    >
      <i :class="item.icon"></i>
      <span class="nav-label">{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'MobileBottomNav',
  setup() {
    const route = useRoute()
    const isMobile = ref(false)

    const navItems = [
      {
        name: 'Home',
        path: '/',
        icon: 'fas fa-home'
      },
      {
        name: 'Feed',
        path: '/feed',
        icon: 'fas fa-newspaper'
      },
      {
        name: 'Challenges',
        path: '/challenges',
        icon: 'fas fa-trophy'
      },
      {
        name: 'Messages',
        path: '/messages',
        icon: 'fas fa-envelope'
      },
      {
        name: 'Profile',
        path: '/dashboard',
        icon: 'fas fa-user'
      }
    ]

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    const isActive = (path) => {
      return route.path === path
    }

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      isMobile,
      navItems,
      isActive
    }
  }
}
</script>

<style scoped>
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-around;
  padding: 8px 0 env(safe-area-inset-bottom);
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #657786;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 60px;
  flex: 1;
  max-width: 80px;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
}

.nav-item.active {
  color: #1da1f2;
}

.nav-item.active i {
  transform: scale(1.1);
}

.nav-label {
  font-size: 10px;
  line-height: 1;
}

/* Hide on larger screens */
@media (min-width: 769px) {
  .mobile-bottom-nav {
    display: none;
  }
}

/* Add bottom padding to body when mobile nav is present */
@media (max-width: 768px) {
  body {
    padding-bottom: 70px;
  }
}
</style>
