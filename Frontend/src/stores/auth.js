import { defineStore } from 'pinia'

const API_BASE_URL = 'http://localhost:5001'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    isAuthenticated: false,
    token: null
  }),

  getters: {
    user: (state) => state.currentUser,
    isLoggedIn: (state) => state.isAuthenticated,
    authToken: (state) => state.token
  },

  actions: {
    // Initialize auth state from localStorage
    async initAuth() {
      const token = localStorage.getItem('mikaelson_token')
      const user = localStorage.getItem('mikaelson_current_user')
      
      if (token && user && user !== 'null') {
        this.token = token
        this.currentUser = JSON.parse(user)
        this.isAuthenticated = true
        
        // Verify token is still valid
        try {
          await this.verifyToken()
        } catch (error) {
          // Token is invalid, logout
          this.logout()
        }
      }
    },

        // Verify token with server
    async verifyToken() {
      try {
        const token = localStorage.getItem('mikaelson_token')
        
        if (!token) {
          this.isAuthenticated = false
          this.currentUser = null
          return false
        }

        const response = await fetch(`${API_BASE_URL}/verify-token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (response.ok && data.success) {
          this.isAuthenticated = true
          this.currentUser = data.user
          this.token = token
          return true
        } else {
          // If account requires login after 30 days, clear auth state
          if (data.requiresLogin || data.expired) {
            this.logout()
            return false
          }
          
          this.isAuthenticated = false
          this.currentUser = null
          this.token = null
          localStorage.removeItem('mikaelson_token')
          localStorage.removeItem('mikaelson_current_user')
          return false
        }
      } catch (error) {
        console.error('Token verification error:', error)
        this.isAuthenticated = false
        this.currentUser = null
        this.token = null
        localStorage.removeItem('mikaelson_token')
        localStorage.removeItem('mikaelson_current_user')
        return false
      }
    },

    // Register action
    async register(userData) {
      try {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password
          })
        })

        const data = await response.json()

        if (data.success) {
          // Auto-login after successful registration
          const loginResult = await this.login({
            email: userData.email,
            password: userData.password
          })
          
          if (loginResult.success) {
            return { 
              success: true, 
              message: data.message, 
              user: loginResult.user,
              autoLoggedIn: true
            }
          } else {
            return { 
              success: true, 
              message: data.message,
              autoLoggedIn: false,
              loginRequired: true
            }
          }
        } else {
          return { success: false, message: data.message }
        }
      } catch (error) {
        console.error('Registration error:', error)
        return { success: false, message: 'Network error. Please try again.' }
      }
    },

    // Login action
    async login(credentials) {
      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (data.success) {
          this.currentUser = data.user
          this.token = data.token
          this.isAuthenticated = true
          
          // Store in localStorage
          localStorage.setItem('mikaelson_token', data.token)
          localStorage.setItem('mikaelson_current_user', JSON.stringify(data.user))
          
          return { success: true, message: data.message, user: data.user }
        } else {
          return { success: false, message: data.message }
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, message: 'Network error. Please try again.' }
      }
    },

    // Logout action
    logout() {
      this.currentUser = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('mikaelson_token')
      localStorage.removeItem('mikaelson_current_user')
    },

    // Update user data
    updateUser(userData) {
      this.currentUser = { ...this.currentUser, ...userData }
      localStorage.setItem('mikaelson_current_user', JSON.stringify(this.currentUser))
    }
  }
})
