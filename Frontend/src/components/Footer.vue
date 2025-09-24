<template>
  <!-- Simple, Clean Footer -->
  <footer class="footer">
    <div class="container">
      <!-- Brand Section -->
      <div class="footer-brand">
        <router-link to="/" class="brand-link">
          <img src="/assets/images/mikaelsonlogo.png" alt="Mikaelson Initiative" class="logo" />
          <span class="brand-name">Mikaelson Initiative</span>
        </router-link>
        <p class="tagline">Elevating humanity through technology and community.</p>
      </div>

      <!-- Navigation Grid -->
      <div class="footer-nav">
        <div class="nav-section">
          <h3>Explore</h3>
          <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/community">Community</router-link>
            <router-link to="/labs">Labs</router-link>
            <router-link to="/team">Our Team</router-link>
          </nav>
        </div>

        <div class="nav-section">
          <h3>Support</h3>
          <nav>
            <router-link to="/help">Help Center</router-link>
            <router-link to="/contact">Contact</router-link>
            <router-link to="/faq">FAQ</router-link>
          </nav>
        </div>

        <div class="nav-section">
          <h3>Legal</h3>
          <nav>
            <router-link to="/terms">Terms</router-link>
            <router-link to="/privacy">Privacy</router-link>
            <router-link to="/code-of-conduct">Code of Conduct</router-link>
          </nav>
        </div>

        <div class="nav-section">
          <h3>Connect</h3>
          <div class="social-links">
            <!-- X (formerly Twitter) inline SVG without background -->
            <a href="https://x.com/mici_org" target="_blank" title="X (formerly Twitter)" aria-label="X" class="x-link">
              <svg viewBox="0 0 1200 1227" width="26" height="26" role="img" aria-hidden="true" class="x-icon">
                <path fill="currentColor" d="M714.2 519.2 1160.9 0h-105.3L661.6 442.6 377.3 0H0l468.1 681.6L0 1227.1h105.3l418.5-469.7 301.3 469.7h377.3L714.2 519.2Zm-148.1 165.4-48.5-70.4L143.3 80h171.5l245.2 356.2 48.5 70.4 399.7 580.5H836.7L566.1 684.6Z"/>
              </svg>
            </a>
            <!-- Instagram modern glyph (updated) -->
            <a href="https://www.instagram.com/mici_org/" target="_blank" title="Instagram" aria-label="Instagram" class="ig-link">
              <svg viewBox="0 0 448 512" width="26" height="26" role="img" aria-hidden="true">
                <defs>
                  <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f58529"/>
                    <stop offset="30%" stop-color="#dd2a7b"/>
                    <stop offset="60%" stop-color="#8134af"/>
                    <stop offset="100%" stop-color="#515bd4"/>
                  </linearGradient>
                </defs>
                <!-- Outer rounded square -->
                <rect x="32" y="32" width="384" height="384" rx="96" ry="96" fill="url(#igGradient)"/>
                <!-- Lens outer ring -->
                <circle cx="224" cy="224" r="110" fill="none" stroke="#fff" stroke-width="32"/>
                <!-- Lens inner -->
                <circle cx="224" cy="224" r="60" fill="#fff"/>
                <!-- Flash dot -->
                <circle cx="320" cy="128" r="28" fill="#fff"/>
              </svg>
            </a>
            <!-- LinkedIn logo -->
            <a href="https://www.linkedin.com/company/mikaelson-initiative/" target="_blank" title="LinkedIn" aria-label="LinkedIn" class="li-link">
              <svg viewBox="0 0 448 512" width="26" height="26" role="img" aria-hidden="true">
                <path fill="#0A66C2" d="M100.28 448H7.4V149.9h92.88V448zM53.79 108.1C24.09 108.1 0 83.5 0 53.8 0 24.5 23.49 0 53.49 0s53.8 24.5 53.8 53.8c.3 29.7-23.2 54.3-53.5 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V149.9h89.1v40.7h1.3c12.4-23.4 42.6-48.3 87.6-48.3 93.6 0 110.8 61.6 110.8 141.7V448z"/>
              </svg>
            </a>
            <!-- YouTube play button -->
            <a href="https://www.youtube.com/@TheMikaelsonCommunity" target="_blank" title="YouTube" aria-label="YouTube" class="yt-link">
              <svg viewBox="0 0 576 512" width="26" height="26" role="img" aria-hidden="true">
                <path fill="#FF0000" d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C458.8 64 288 64 288 64S117.2 64 74.9 75.5c-23.7 6.3-42.3 24.9-48.6 48.6C14 166.4 14 256 14 256s0 89.6 12.3 131.9c6.3 23.7 24.9 41.5 48.6 47.8C117.2 448 288 448 288 448s170.8 0 212.1-12.3c23.7-6.3 42.3-24.1 48.6-47.8C562 345.6 562 256 562 256s0-89.6-12.3-131.9z"/>
                <path fill="#FFF" d="M232 338V174l142 82-142 82z"/>
              </svg>
            </a>
          </div>
          <div class="reports-dropdown">
            <button class="reports-button" @click="toggleDropdown">
              📊 Annual Reports
              <i class="fas fa-chevron-down" :class="{ 'rotated': dropdownOpen }"></i>
            </button>
            <div class="dropdown-menu" :class="{ 'show': dropdownOpen }">
              <a href="https://drive.google.com/drive/folders/1qSFgMPFig9RvlKLAcjaCsPh58GUiotqU" 
                 target="_blank" 
                 class="dropdown-item">
                2025
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; 2025 Mikaelson Initiative. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!this.$el.querySelector('.reports-dropdown').contains(event.target)) {
        this.dropdownOpen = false;
      }
    });
  }
};
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 3rem 0 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Brand Section */
.footer-brand {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f3f4f6;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #1f2937;
  transition: transform 0.2s ease;
}

.brand-link:hover {
  transform: translateY(-2px);
}

.logo {
  height: 3rem;
  width: auto;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.tagline {
  margin-top: 0.75rem;
  color: #6b7280;
  font-size: 1rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

/* Navigation Grid */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.nav-section h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.nav-section nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-section nav a {
  color: #6b7280;
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
  border-radius: 4px;
}

.nav-section nav a:hover {
  color: #2563eb;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
}

/* X (formerly Twitter) */
.social-links a.x-link {
  background: transparent !important;
  color: #111;
}

.social-links a.x-link:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.social-links a.x-link svg {
  display: block;
}

/* Instagram */
.social-links a.ig-link {
  background: transparent;
  color: inherit;
}

.social-links a.ig-link:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.social-links a.ig-link svg {
  display: block;
}

/* LinkedIn */
.social-links a.li-link {
  background: transparent;
  color: inherit;
}

.social-links a.li-link:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.social-links a.li-link svg {
  display: block;
}

/* YouTube */
.social-links a.yt-link {
  background: transparent;
  color: inherit;
}

.social-links a.yt-link:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.social-links a.yt-link svg {
  display: block;
}

/* Reports Dropdown */
.reports-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 200px;
}

.reports-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: space-between;
  min-height: 48px;
}

.reports-button:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.reports-button i {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.reports-button i.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 10;
  margin-top: 4px;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  margin: 4px;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: #f3f4f6;
  color: #2563eb;
}

/* Footer Bottom */
.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;
  color: #9ca3af;
  font-size: 0.9rem;
}

.footer-bottom p {
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .footer-brand {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
  
  .brand-link {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .logo {
    height: 2.5rem;
  }
  
  .brand-name {
    font-size: 1.25rem;
  }
  
  .tagline {
    font-size: 0.9rem;
  }
  
  .footer-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .nav-section {
    text-align: center;
  }
  
  .nav-section h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .nav-section nav a {
    padding: 0.5rem 0;
    font-size: 0.95rem;
  }
  
  .social-links {
    justify-content: center;
    gap: 1.25rem;
  }
  
  .social-links a {
    width: 45px;
    height: 45px;
  }
  
  .reports-dropdown {
    max-width: 180px;
    margin: 0 auto;
  }
  
  .reports-button {
    font-size: 0.9rem;
    padding: 0.625rem 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0 1rem;
  }
  
  .container {
    padding: 0 0.75rem;
  }
  
  .footer-brand {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
  
  .logo {
    height: 2rem;
  }
  
  .brand-name {
    font-size: 1.1rem;
  }
  
  .tagline {
    font-size: 0.85rem;
    line-height: 1.4;
  }
  
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .nav-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }
  
  .nav-section nav a {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }
  
  .social-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .social-links a {
    width: 40px;
    height: 40px;
  }
  
  .reports-dropdown {
    max-width: 160px;
  }
  
  .reports-button {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    min-height: 40px;
  }
  
  .dropdown-item {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .footer-bottom {
    padding-top: 1.5rem;
  }
  
  .footer-bottom p {
    font-size: 0.8rem;
  }
}

/* Extra small devices */
@media (max-width: 320px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .tagline {
    font-size: 0.8rem;
  }
  
  .nav-section h3 {
    font-size: 1rem;
  }
  
  .social-links a {
    width: 35px;
    height: 35px;
  }
  
  .reports-button {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}

/* Enhanced Mobile Structure - Using CSS Variables */
@media (max-width: 768px) {
  .footer {
    padding: var(--space-lg) 0 var(--space-md);
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  }
  
  .container {
    padding: 0 var(--space-md);
  }
  
  .footer-brand {
    padding: var(--space-md);
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--space-lg);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .brand-link {
    flex-direction: column;
    gap: var(--space-sm);
    text-align: center;
  }
  
  .logo {
    height: 48px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  .brand-name {
    font-size: var(--text-xl);
    background: linear-gradient(135deg, #059669, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .tagline {
    font-size: var(--text-sm);
    color: #6b7280;
    line-height: 1.6;
    margin-top: var(--space-xs);
  }
  
  .footer-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  
  .nav-section {
    background: white;
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .nav-section h3 {
    font-size: var(--text-base);
    color: #1f2937;
    margin-bottom: var(--space-sm);
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: var(--space-xs);
    text-align: center;
  }
  
  .nav-section nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .nav-section nav a {
    padding: var(--space-sm);
    border-radius: var(--radius-md);
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 500;
    position: relative;
    overflow: hidden;
  }
  
  .nav-section nav a::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  .nav-section nav a:hover::before {
    left: 100%;
  }
  
  .nav-section nav a:hover {
    background: rgba(16, 185, 129, 0.05);
    color: #059669;
    transform: translateY(-1px);
  }
  
  .social-section {
    background: white;
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: var(--space-lg);
  }
  
  .social-section h3 {
    text-align: center;
    margin-bottom: var(--space-md);
    font-size: var(--text-base);
    color: #1f2937;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }
  
  .social-links a {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
    border: 2px solid rgba(16, 185, 129, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .social-links a::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #10b981, #059669);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .social-links a:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    border-color: #10b981;
  }
  
  .social-links a:hover::before {
    opacity: 0.9;
  }
  
  .social-links a:hover svg,
  .social-links a:hover i {
    color: white;
    transform: scale(1.1);
  }
  
  .reports-section {
    text-align: center;
    margin-bottom: var(--space-lg);
  }
  
  .reports-dropdown {
    display: inline-block;
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .reports-button {
    padding: var(--space-sm) var(--space-md);
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    font-weight: 600;
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
    min-height: 48px;
  }
  
  .reports-button:hover {
    background: linear-gradient(135deg, #047857, #059669);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
  }
  
  .footer-bottom {
    background: white;
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  
  .footer-bottom p {
    font-size: var(--text-sm);
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }
}

@media (max-width: 480px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
  
  .nav-section {
    padding: var(--space-sm);
  }
  
  .brand-name {
    font-size: var(--text-lg);
  }
  
  .logo {
    height: 40px;
  }
  
  .social-links a {
    width: 48px;
    height: 48px;
  }
}

/* Touch optimizations */
@media (hover: none) and (pointer: coarse) {
  .nav-section nav a {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-links a {
    min-width: 52px;
    min-height: 52px;
  }
  
  .reports-button {
    min-height: 52px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .nav-section nav a,
  .social-links a,
  .reports-button {
    transition: none;
  }
  
  .nav-section nav a:hover,
  .social-links a:hover,
  .reports-button:hover {
    transform: none;
  }
  
  .nav-section nav a::before {
    display: none;
  }
}
</style>
