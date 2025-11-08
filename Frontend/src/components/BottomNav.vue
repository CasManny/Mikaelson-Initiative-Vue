<template>
  <nav class="bottom-nav" role="navigation" aria-label="Bottom navigation">
    <ul>
      <li>
        <router-link to="/" class="btn" aria-label="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/product" class="btn" aria-label="Product">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
          <span>Product</span>
        </router-link>
      </li>
      <li>
        <router-link to="/team" class="btn" aria-label="Team">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Team</span>
        </router-link>
      </li>
      <li>
        <router-link to="/feed" class="btn" aria-label="Feed">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19h16M4 15h10M4 11h16M4 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Feed</span>
        </router-link>
      </li>
      <li>
        <router-link to="/volunteer" class="btn" aria-label="Volunteer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM6 20a6 6 0 0 1 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Volunteer</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style scoped>
:root{--muted:#6b7280;--accent:#5ce1e6;--dark:#374151;--ink:#111827}
.bottom-nav{display:none}
.bottom-nav ul{display:flex;gap:0.25rem;justify-content:space-around;align-items:center;margin:0;padding:0;list-style:none}
.bottom-nav .btn{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0.4rem 0.6rem;text-decoration:none;color:var(--dark);font-weight:600;border-radius:8px}
.bottom-nav .btn span{font-size:11px;margin-top:4px;color:var(--muted)}
.bottom-nav .btn svg{color:var(--dark)}
.bottom-nav .btn.router-link-active{background:var(--accent);color:#fff}

@media (max-width: 768px){
  .bottom-nav{display:block;position:fixed;left:0;right:0;bottom:0;background:#ffffff;border-top:1px solid #e6e9ec;padding:0.5rem 0;z-index:1200}
}
</style>
