<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <main class="auth-main">
      <section class="auth-section">
        <div class="auth-wrapper">
          <div class="auth-card">
            <div class="auth-header">
              <div class="logo-container">
                <div class="logo">
                  <i class="fas fa-rocket"></i>
                </div>
                <h2>Join Our Community</h2>
                <p class="auth-subtitle">Start your transformation journey today</p>
              </div>
            </div>

            <form class="auth-form" @submit.prevent="handleSignup">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <div class="input-container">
                  <i class="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    id="firstName"
                    v-model="formData.firstName"
                    required
                    placeholder="Enter your first name"
                    :class="{ error: errors.firstName }"
                  />
                </div>
                <span v-if="errors.firstName" class="error-message">{{
                  errors.firstName
                }}</span>
              </div>

              <div class="form-group">
                <label for="lastName">Last Name</label>
                <div class="input-container">
                  <i class="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    id="lastName"
                    v-model="formData.lastName"
                    required
                    placeholder="Enter your last name"
                    :class="{ error: errors.lastName }"
                  />
                </div>
                <span v-if="errors.lastName" class="error-message">{{
                  errors.lastName
                }}</span>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <div class="input-container">
                  <i class="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    placeholder="Enter your email"
                    :class="{ error: errors.email }"
                  />
                </div>
                <span v-if="errors.email" class="error-message">{{
                  errors.email
                }}</span>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <div class="input-container">
                  <i class="fas fa-lock input-icon"></i>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="formData.password"
                    required
                    placeholder="Create a password"
                    :class="{ error: errors.password }"
                  />
                  <button
                    type="button"
                    class="toggle-password"
                    @click="togglePassword"
                  >
                    <i
                      :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </button>
                </div>
                <span v-if="errors.password" class="error-message">{{
                  errors.password
                }}</span>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="input-container">
                  <i class="fas fa-lock input-icon"></i>
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    required
                    placeholder="Confirm your password"
                    :class="{ error: errors.confirmPassword }"
                  />
                  <button
                    type="button"
                    class="toggle-password"
                    @click="toggleConfirmPassword"
                  >
                    <i
                      :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    ></i>
                  </button>
                </div>
                <span v-if="errors.confirmPassword" class="error-message">{{
                  errors.confirmPassword
                }}</span>
              </div>

              <div class="form-group">
                <label class="checkbox-container">
                  <input type="checkbox" v-model="formData.agreeToTerms" required />
                  <span class="checkmark"></span>
                  I agree to the <a href="#" class="terms-link">Terms of Service</a> and 
                  <a href="#" class="terms-link">Privacy Policy</a>
                </label>
                <span v-if="errors.agreeToTerms" class="error-message">{{
                  errors.agreeToTerms
                }}</span>
              </div>

              <button
                type="submit"
                class="auth-button primary"
                :disabled="isLoading"
              >
                <span v-if="!isLoading" class="button-text">Create Account</span>
                <span v-else class="button-loader">
                  <i class="fas fa-spinner fa-spin"></i>
                </span>
              </button>

              <div class="auth-divider">
                <span>or continue with</span>
              </div>

              <div class="social-links">
                <a href="#" class="social-link google" @click="handleGoogleSignup">
                  <i class="fab fa-google"></i>
                  Continue with Google
                </a>
                <a href="#" class="social-link facebook" @click="handleFacebookSignup">
                  <i class="fab fa-facebook-f"></i>
                  Continue with Facebook
                </a>
              </div>

              <div class="auth-footer">
                <p>
                  Already have an account?
                  <router-link to="/login">Sign in here</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Welcome to the Community!</h3>
        </div>
        <p>Your account has been created successfully. Please sign in to access your dashboard.</p>
        <button class="modal-button" @click="closeSuccessModal">Continue</button>
      </div>
    </div>

    <!-- Error Modal -->
    <div v-if="showErrorModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-exclamation-triangle error-icon"></i>
          <h3>Signup Failed</h3>
        </div>
        <p>{{ errorMessage }}</p>
        <button class="modal-button" @click="closeErrorModal">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Signup",
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const formData = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });

    const errors = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: "",
    });

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const showSuccessModal = ref(false);
    const showErrorModal = ref(false);
    const errorMessage = ref("");

    const validateForm = () => {
      let isValid = true;

      // Reset errors
      Object.keys(errors).forEach(key => errors[key] = "");

      // First name validation
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
        isValid = false;
      }

      // Last name validation
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
        isValid = false;
      }

      // Email validation
      if (!formData.email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }

      // Password validation
      if (!formData.password) {
        errors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
        isValid = false;
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      // Terms agreement validation
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the terms and conditions";
        isValid = false;
      }

      return isValid;
    };

    const handleSignup = async () => {
      if (!validateForm()) return;

      isLoading.value = true;

      try {
        const result = await authStore.register(formData);

        if (result.success) {
          // Check if auto-login was successful
          if (result.autoLoggedIn) {
            // User was automatically logged in, redirect to dashboard
            router.push("/dashboard");
          } else {
            // Registration succeeded but auto-login failed, show success modal
            showSuccessModal.value = true;
          }
        } else {
          errorMessage.value = result.message;
          showErrorModal.value = true;
        }

      } catch (error) {
        console.error('Signup error:', error);
        errorMessage.value = "An error occurred. Please try again.";
        showErrorModal.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const handleGoogleSignup = () => {
      // Implement Google OAuth signup
      console.log("Google signup clicked");
    };

    const handleFacebookSignup = () => {
      // Implement Facebook OAuth signup
      console.log("Facebook signup clicked");
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      router.push("/login");
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    onMounted(() => {
      // Check if already logged in
      if (authStore.isLoggedIn) {
        router.push("/dashboard");
      }
    });

    return {
      formData,
      errors,
      showPassword,
      showConfirmPassword,
      isLoading,
      showSuccessModal,
      showErrorModal,
      errorMessage,
      handleSignup,
      handleGoogleSignup,
      handleFacebookSignup,
      togglePassword,
      toggleConfirmPassword,
      closeSuccessModal,
      closeErrorModal,
    };
  },
};
</script>

<style scoped>
/* Page-specific styles */
.auth-main {
  min-height: 100vh;
  background: white;
  position: relative;
}

.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 120px 20px 10px; /* Further reduced bottom padding from 20px to 10px */
  position: relative;
  z-index: 2;
}

.auth-wrapper {
  max-width: 500px;
  width: 100%;
}

.auth-card {
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2563eb, #20c9c0);
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2563eb 0%, #20c9c0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
}

.auth-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.auth-subtitle {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.5;
  margin: 8px 0 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  text-align: left;
  display: block;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-container input {
  width: 100%;
  padding: 12px 16px 12px 45px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.input-container input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #9ca3af;
  font-size: 16px;
  z-index: 2;
}

.toggle-password {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-container {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

.checkbox-container input[type="checkbox"] {
  width: auto !important;
  margin: 0;
  padding: 0;
}

.terms-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.auth-button {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.auth-button.primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.auth-button.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.auth-divider {
  position: relative;
  text-align: center;
  margin: 8px 0; /* Reduced margin */
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.auth-divider span {
  background: white;
  color: #9ca3af;
  font-size: 14px;
  padding: 0 16px;
  position: relative;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  color: #374151;
}

.social-link:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
  text-decoration: none;
}

.social-link.google:hover {
  border-color: #db4437;
  color: #db4437;
}

.social-link.facebook:hover {
  border-color: #4267b2;
  color: #4267b2;
}

.auth-footer {
  text-align: center;
  margin-top: 8px; /* Reduced margin */
  margin-bottom: 0; /* Ensure no bottom margin */
}

.auth-footer p {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.auth-footer a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
}

.input-container input.error {
  border-color: #e74c3c;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  margin-bottom: 20px;
}

.success-icon {
  font-size: 48px;
  color: #10b981;
  margin-bottom: 16px;
}

.error-icon {
  font-size: 48px;
  color: #ef4444;
  margin-bottom: 16px;
}

.modal-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-content p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.modal-button {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-section {
    padding: 100px 16px 10px; /* Further reduced bottom padding for mobile */
  }
  
  .auth-card {
    padding: 32px 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .social-links {
    flex-direction: column;
  }
  
  .auth-header h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 24px 20px;
  }
  
  .auth-header h2 {
    font-size: 22px;
  }
  
  .logo {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>
