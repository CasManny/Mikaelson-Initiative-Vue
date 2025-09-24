<template>
  <div class="device-switcher-container">
    <button
      :class="['device-button', { active: uiStore.currentView === 'laptop' }]"
      @click="uiStore.setView('laptop')"
      aria-label="Switch to Laptop View"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path>
        <line x1="4" y1="15" x2="20" y2="15"></line>
        <path d="M2 20h20"></path>
      </svg>
    </button>
    <button
      :class="['device-button', { active: uiStore.currentView === 'mobile' }]"
      @click="uiStore.setView('mobile')"
      aria-label="Switch to Mobile View"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore();
</script>

<style scoped>
.device-switcher-container {
  display: flex;
  gap: 0.5rem;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
}

.device-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  color: #6b7280;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.device-button:hover {
  background-color: #e5e7eb;
}

.device-button.active {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.device-button svg {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
