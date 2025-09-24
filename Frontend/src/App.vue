<template>
  <div id="app" :class="{ 'mobile-layout': uiStore.currentView === 'mobile' }">
    <router-view />
  </div>
</template>

<script>
import { useUIStore } from "./stores/ui";

export default {
  name: "App",
  setup() {
    const uiStore = useUIStore();
    return { uiStore };
  },
};
</script>

<style>
/* Global styles */
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

/* Styles for the mobile layout */
.mobile-layout {
  max-width: 420px; /* Example: constrain width for mobile view */
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
