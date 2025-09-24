import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

// Import global styles
import '../assets/css/response.css'
import '../assets/css/styles.css'
import '../assets/css/auth.css'
import '../assets/css/dashboard.css'
import '../assets/css/community.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize auth store after pinia is setup
const authStore = useAuthStore()
authStore.initAuth()

app.use(router)

app.mount('#app')
