<template>
  <div
    id="app"
    :class="[
      uiStore.currentView === 'mobile' ? 'mobile-layout' : '',
      'min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white transition-all duration-300'
    ]"
  >
    <!-- Sidebar for Desktop (visible only on Rio page) -->
    <aside v-if="route.name === 'Rio'" class="hidden lg:flex lg:flex-col lg:w-64 bg-gray-800 p-4">
      <Sidebar />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 overflow-y-auto">
      <router-view />
    </main>

    <!-- Bottom Navigation for Mobile -->
    <nav class="lg:hidden fixed bottom-0 w-full bg-gray-800 border-t p-2 flex justify-around">
      <BottomNav />
    </nav>
  </div>
</template>

<script setup>
import { useUIStore } from './stores/ui';
import Sidebar from './components/Sidebar.vue';
import BottomNav from './components/BottomNav.vue';

import { useRoute } from 'vue-router'

const uiStore = useUIStore();
const route = useRoute();
</script>

<style>
/* Keep your global styles */
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: all 0.3s ease;
}

span {
  font-family: "Poppins", sans-serif;
}

button {
  font-family: "Poppins", sans-serif;
}

input {
  font-family: "Poppins", sans-serif;
}

/* Mobile layout style */
.mobile-layout {
  max-width: 420px; /* Constrain width for mobile view */
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
