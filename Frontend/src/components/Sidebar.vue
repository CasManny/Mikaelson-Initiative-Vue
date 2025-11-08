<template>
  <aside class="sidebar" role="navigation" aria-label="Main sidebar">
    <div class="sidebar-inner">
      <nav>
        <ul>
          <li><router-link to="/" class="link">Home</router-link></li>
          <li><router-link to="/product" class="link">Our Product</router-link></li>
          <li><router-link to="/team" class="link">The Team</router-link></li>
          <li><router-link to="/about" class="link">About Us</router-link></li>
          <li><router-link to="/feed" class="link">Social Feed</router-link></li>
          <li><router-link to="/volunteer" class="link">Volunteer</router-link></li>
          <li><router-link to="/contact" class="link">Contact</router-link></li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
:root{--muted:#6b7280;--accent:#5ce1e6;--dark:#374151;--ink:#111827}
.sidebar{
  width: 240px;
  min-width: 200px;
  background: #ffffff;
  border-right: 1px solid #e6e9ec;
  padding: 1.25rem 0.75rem;
  box-shadow: 0 6px 18px rgba(6,30,40,0.04);
  height: 100vh;
  position: sticky;
  top: 70px; /* aligns with fixed navbar */
}
.sidebar-inner{max-width:220px;margin:0 auto}
.sidebar ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.35rem}
.sidebar .link{display:block;padding:0.6rem 0.8rem;border-radius:8px;color:var(--dark);text-decoration:none;font-weight:600}
.sidebar .link:hover{background:rgba(92,225,230,0.08);color:var(--ink)}
.sidebar .link.router-link-active{background:var(--accent);color:white}

@media (max-width: 1024px){
  .sidebar{display:none}
}
</style>
