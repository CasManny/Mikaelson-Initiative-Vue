<template>
  <!-- Navigation Component -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <router-link to="/" class="logo">
          <img src="/assets/images/mikaelsonlogo.png" alt="" />
        </router-link>
        <router-link to="/" class="nav-title">Mikaelson Initiative</router-link>
      </div>

      <div class="nav-right">
        <ul class="nav-menu">
          <!-- The Team item now routes to /team -->
          <li class="nav-item">
            <router-link to="/team" class="nav-link">The Team</router-link>
          </li>
          <!-- Replaced Ecosystem dropdown with About Us link -->
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/feed" class="nav-link">Social Feed</router-link>
          </li>
          <!-- Challenges only on Community page -->
          <li class="nav-item" v-if="route.name === 'Community'">
            <router-link to="/challenges" class="nav-link">Challenges</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/volunteer" class="nav-link" active-class="active">Volunteer</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sponsor" class="nav-link sponsor-link">
              Sponsor a program
              <svg class="sponsor-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </router-link>
          </li>
        </ul>

        <router-link
          v-if="showLoginButton"
          to="/login"
          class="nav-link login-link"
          >Login</router-link
        >

        <div class="user-menu" v-if="showProfileCircle">
          <div class="menu-dots" @click="toggleMenu">
            <i class="fas fa-ellipsis-v"></i>
            <div class="menu-dropdown" :class="{ show: showUserMenu }">
              <router-link to="/dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
              <a href="#"><i class="fas fa-cog"></i> Settings</a>
              <a href="#"><i class="fas fa-question-circle"></i> Help</a>
              <a href="#" @click="showLogoutModal"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
          </div>
          <div class="profile-circle" @click="toggleMenu">
            <span>{{ userInitials }}</span>
          </div>
        </div>

        <!-- Mobile hamburger -->
        <button class="hamburger mobile-only" @click="toggleMobileNav" aria-label="Toggle menu" :aria-expanded="showMobileNav.toString()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile slide-down menu -->
  <transition name="slide-fade">
    <div v-if="showMobileNav" class="mobile-menu" @click.self="showMobileNav = false">
      <ul class="mobile-list">
        <li><router-link to="/team" @click="closeMobileNav">The Team</router-link></li>
        <li><router-link to="/about" @click="closeMobileNav">About Us</router-link></li>
        <li><router-link to="/feed" @click="closeMobileNav">Social Feed</router-link></li>
        <li v-if="route.name === 'Community'"><router-link to="/challenges" @click="closeMobileNav">Challenges</router-link></li>
        <li><router-link to="/volunteer" @click="closeMobileNav">Volunteer</router-link></li>
        <li>
          <router-link to="/sponsor" class="sponsor-link" @click="closeMobileNav">
            Sponsor a program
            <svg class="sponsor-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </li>
        <li v-if="showLoginButton"><router-link to="/login" @click="closeMobileNav">Login</router-link></li>
        <li v-else-if="showProfileCircle"><router-link to="/dashboard" @click="closeMobileNav">Dashboard</router-link></li>
      </ul>
    </div>
  </transition>

  <!-- Logout Confirmation Modal -->
  <div v-if="showLogoutConfirmation" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <i class="fas fa-sign-out-alt error-icon"></i>
        <h3>Confirm Logout</h3>
      </div>
      <p>Are you sure you want to log out of your account?</p>
      <div class="modal-actions">
        <button class="modal-button secondary" @click="closeLogoutModal">
          Cancel
        </button>
        <button class="modal-button primary" @click="confirmLogout">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const showUserMenu = ref(false);
    const showLogoutConfirmation = ref(false);
    const searchQuery = ref("");
    const showMobileNav = ref(false);

    const showLoginButton = computed(() => {
      const allowedPaths = ['/community', '/feed', '/labs'];
      return !authStore.isLoggedIn && allowedPaths.includes(route.path);
    });

    const showProfileCircle = computed(() => {
      const allowedPaths = ['/community', '/feed'];
      return authStore.isLoggedIn && allowedPaths.includes(route.path);
    });

    // NEW: Safely compute user initials (prevents undefined reference breaking render)
    const userInitials = computed(() => {
      const user = authStore.currentUser;
      if (!user) return 'U';
      const first = (user.first_name || user.firstName || (user.name ? user.name.split(' ')[0] : '') || '').charAt(0).toUpperCase();
      const last = (user.last_name || user.lastName || (user.name && user.name.split(' ')[1] ? user.name.split(' ')[1] : '') || '').charAt(0).toUpperCase();
      const combined = `${first}${last}`.trim();
      if (combined) return combined;
      if (user.email) return user.email.charAt(0).toUpperCase();
      return 'U';
    });

    const toggleMenu = () => { showUserMenu.value = !showUserMenu.value; };
    const toggleMobileNav = () => { showMobileNav.value = !showMobileNav.value; };
    const closeMobileNav = () => { showMobileNav.value = false; };
    const showLogoutModal = () => { showLogoutConfirmation.value = true; showUserMenu.value = false; };
    const closeLogoutModal = () => { showLogoutConfirmation.value = false; };
    const confirmLogout = () => { authStore.logout(); showLogoutConfirmation.value = false; router.push("/"); };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) showUserMenu.value = false;
    };

    // Close mobile menu on route change
    watch(() => route.fullPath, () => { showMobileNav.value = false; });

    onMounted(() => { document.addEventListener("click", handleClickOutside); });
    onUnmounted(() => { document.removeEventListener("click", handleClickOutside); });

    return {
      authStore,
      route,
      showUserMenu,
      showLogoutConfirmation,
      searchQuery,
      userInitials,
      showLoginButton,
      showProfileCircle,
      showMobileNav,
      toggleMenu,
      toggleMobileNav,
      closeMobileNav,
      showLogoutModal,
      closeLogoutModal,
      confirmLogout
    };
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.7rem;
  height: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  height: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  margin-left: auto;
  height: 100%;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.2rem;
  flex-shrink: 0;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.2rem;
}

.nav-item {
  position: relative;
  margin: 0;
  font-size: 14px;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.nav-link:hover {
  color: #20c9c0;
  background-color: #f0fdfc;
}

.nav-link.router-link-active {
  color: #20c9c0;
  background-color: #f0fdfc;
}

.nav-icon {
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
}

.nav-icon.rotated {
  transform: rotate(180deg);
}

.sponsor-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #000;
  color: white !important;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.sponsor-link:hover {
  background: #333;
  color: white !important;
  transform: translateY(-2px);
}

/* Keep sponsor CTA style when the route is active */
.sponsor-link.router-link-active,
.sponsor-link.router-link-exact-active {
  background: #000 !important;
  color: #fff !important;
}

.sponsor-link.router-link-active:hover,
.sponsor-link.router-link-exact-active:hover {
  background: #111 !important;
  color: #fff !important;
}

.nav-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  white-space: nowrap;
  text-decoration: none;
  margin-left: 8px;
}

.nav-title:hover {
  color: #1f2937;
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: contain;
}

/* User Menu */
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-dots {
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: #6b7280;
}

.menu-dots:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  min-width: 180px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.menu-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu-dropdown a {
  display: block;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  margin: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-dropdown a:hover {
  background-color: #f0fdfc;
  color: #20c9c0;
}

.profile-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #20c9c0, #2563eb);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.profile-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.3);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
}

/* Mobile: hamburger - handled by responsive CSS */
.hamburger {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
  gap: 4px;
}

.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Mobile menu panel - handled by responsive CSS */

/* Transition */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all .2s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* Responsive rules - handled by responsive CSS */

@media (max-width: 768px) {
  /* Mobile styles handled by responsive CSS */
}

@media (max-width: 768px) {
  /* Mobile styles handled by responsive CSS */
}

/* Mobile menu styles handled by responsive CSS */

@media (max-width: 480px) {
  /* Mobile styles handled by responsive CSS */
}

@media (max-width: 360px) {
  /* Mobile styles handled by responsive CSS */
}

/* Landscape orientation adjustments handled by responsive CSS */

/* Touch optimizations handled by responsive CSS */

/* High contrast mode handled by responsive CSS */

/* Improved animations */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
