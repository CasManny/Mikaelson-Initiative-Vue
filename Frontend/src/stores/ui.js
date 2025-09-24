import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const currentView = ref('laptop'); // 'laptop' or 'mobile'

  function setView(view) {
    if (['laptop', 'mobile'].includes(view)) {
      currentView.value = view;
    }
  }

  return { currentView, setView };
});
