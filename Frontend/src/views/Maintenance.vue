<template>
  <div class="maintenance-page">
    <Navbar />
    <main class="maintenance-content">
      <div class="maintenance-container">
        <div class="maintenance-card">
          <!-- Logo Section -->
          <div class="logo-section">
            <div class="logo-wrapper">
              <img src="/assets/images/mikaelsonlogo.png" alt="Mikaelson Initiative" class="logo" />
            </div>
          </div>
          
          <!-- Message Section -->
          <div class="message-section">
            <div class="message-header">
              <h1 class="maintenance-title">We're updating features</h1>
              <p class="maintenance-subtitle">Kindly wait while we enhance your experience</p>
            </div>
            
            <!-- Progress Section -->
            <div class="progress-section">
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <p class="progress-text">Updates in progress...</p>
              </div>
            </div>
            
            <!-- Action Section -->
            <div class="action-section">
              <router-link to="/" class="home-button">
                <i class="fas fa-home"></i>
                <span>Return to Homepage</span>
              </router-link>
              <router-link to="/social-feed" class="feed-button" style="margin-top: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-rss"></i>
                <span>Go to Social Feed</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Maintenance',
  components: { Navbar, Footer }
}
</script>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%);
}

.maintenance-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) var(--space-md);
  margin-top: 70px;
}

.maintenance-container {
  max-width: 600px;
  width: 100%;
}

.maintenance-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(92, 225, 230, 0.2);
  position: relative;
  overflow: hidden;
}

.maintenance-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #5ce1e6, #3b82f6);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

/* Logo Section */
.logo-section {
  margin-bottom: var(--space-xl);
}

.logo-wrapper {
  display: inline-flex;
  padding: var(--space-md);
  background: rgba(92, 225, 230, 0.1);
  border-radius: 50%;
  margin-bottom: var(--space-md);
}

.logo {
  height: 4rem;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* Message Section */
.message-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.message-header {
  margin-bottom: var(--space-md);
}

.maintenance-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: var(--space-sm);
  line-height: 1.2;
}

.maintenance-subtitle {
  font-size: var(--text-lg);
  color: #6b7280;
  margin-bottom: 0;
  line-height: 1.5;
  font-weight: 400;
}

/* Progress Section */
.progress-section {
  margin: var(--space-xl) 0;
}

.progress-container {
  background: #f8fafc;
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid #e5e7eb;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: var(--space-sm);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5ce1e6, #3b82f6);
  border-radius: 4px;
  animation: progress 2s ease-in-out infinite;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
}

.progress-text {
  font-size: var(--text-sm);
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Action Section */
.action-section {
  margin-top: var(--space-xl);
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-base);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  min-height: 48px;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.home-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.home-button:hover::before {
  left: 100%;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
}

.home-button i {
  font-size: 1rem;
}

.home-button span {
  font-weight: 600;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Enhanced Mobile Responsive Design */
@media (max-width: 768px) {
  .maintenance-content {
    padding: var(--space-lg) var(--space-sm);
    margin-top: 60px;
  }
  
  .maintenance-card {
    padding: var(--space-xl) var(--space-lg);
    border-radius: var(--radius-lg);
    margin: 0 var(--space-xs);
  }
  
  .logo-wrapper {
    padding: var(--space-sm);
    margin-bottom: var(--space-sm);
  }
  
  .logo {
    height: 3rem;
  }
  
  .maintenance-title {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-xs);
  }
  
  .maintenance-subtitle {
    font-size: var(--text-base);
  }
  
  .message-section {
    gap: var(--space-md);
  }
  
  .progress-section {
    margin: var(--space-lg) 0;
  }
  
  .progress-container {
    padding: var(--space-md);
  }
  
  .home-button {
    width: 100%;
    padding: var(--space-md);
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .maintenance-content {
    padding: var(--space-md) var(--space-xs);
    margin-top: 55px;
  }
  
  .maintenance-card {
    padding: var(--space-lg) var(--space-md);
    border-radius: var(--radius-md);
    margin: 0;
  }
  
  .logo-wrapper {
    padding: var(--space-xs);
  }
  
  .logo {
    height: 2.5rem;
  }
  
  .maintenance-title {
    font-size: var(--text-xl);
    line-height: 1.3;
  }
  
  .maintenance-subtitle {
    font-size: var(--text-sm);
    line-height: 1.4;
  }
  
  .progress-container {
    padding: var(--space-sm);
  }
  
  .progress-bar {
    height: 6px;
  }
  
  .progress-text {
    font-size: var(--text-xs);
  }
  
  .home-button {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-sm);
    gap: var(--space-xs);
    min-height: 44px;
  }
  
  .home-button i {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .maintenance-content {
    padding: var(--space-sm) var(--space-xs);
  }
  
  .maintenance-card {
    padding: var(--space-md) var(--space-sm);
  }
  
  .logo {
    height: 2rem;
  }
  
  .maintenance-title {
    font-size: var(--text-lg);
  }
  
  .maintenance-subtitle {
    font-size: var(--text-xs);
  }
  
  .message-section {
    gap: var(--space-sm);
  }
  
  .progress-section {
    margin: var(--space-md) 0;
  }
}

/* Landscape phone optimization */
@media (max-height: 600px) and (orientation: landscape) {
  .maintenance-content {
    margin-top: 50px;
    padding: var(--space-sm);
  }
  
  .maintenance-card {
    padding: var(--space-md);
  }
  
  .logo {
    height: 2rem;
  }
  
  .maintenance-title {
    font-size: var(--text-lg);
    margin-bottom: var(--space-xs);
  }
  
  .maintenance-subtitle {
    font-size: var(--text-sm);
  }
  
  .message-section {
    gap: var(--space-sm);
  }
  
  .progress-section {
    margin: var(--space-sm) 0;
  }
  
  .action-section {
    margin-top: var(--space-md);
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2) {
  .logo {
    image-rendering: -webkit-optimize-contrast;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .home-button {
    min-height: 48px;
    padding: var(--space-md) var(--space-lg);
  }
  
  .home-button:active {
    transform: translateY(0);
    transition: none;
  }
}

/* Reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  .progress-fill {
    animation: none;
  }
  
  .home-button::before {
    display: none;
  }
  
  .home-button:hover {
    transform: none;
  }
}
</style>
