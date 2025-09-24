<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content">
      <section class="auth-section">
        <div
          class="auth-container"
          style="grid-template-columns: 1fr; max-width: 600px"
        >
          <div class="auth-card">
            <div class="auth-header">
              <div class="logo-container">
                <div class="logo">
                  <i
                    :class="verificationIcon"
                    :style="{ color: verificationColor }"
                  ></i>
                </div>
                <h2>{{ verificationTitle }}</h2>
              </div>
              <p class="auth-subtitle">{{ verificationMessage }}</p>
            </div>

            <div v-if="isSuccess" class="verification-content">
              <div class="success-features">
                <h3>What's Next?</h3>
                <ul class="feature-list">
                  <li>
                    <i class="fas fa-tachometer-alt"></i>
                    Access your personalized dashboard
                  </li>
                  <li>
                    <i class="fas fa-plus"></i>
                    Start creating and tracking habits
                  </li>
                  <li>
                    <i class="fas fa-users"></i>
                    Connect with accountability partners
                  </li>
                  <!-- Removed community challenges, leaderboards, and workshops as per request -->
                </ul>
              </div>

              <div class="cta-container">
                <router-link to="/login" class="auth-button primary">
                  Continue to Dashboard
                </router-link>
                <router-link
                  to="/"
                  class="auth-button secondary"
                  style="background: #f3f4f6; color: #374151; margin-top: 12px"
                >
                  Back to Homepage
                </router-link>
              </div>
            </div>

            <div v-else class="verification-content">
              <div class="cta-container">
                <button
                  class="auth-button secondary"
                  @click="resendVerification"
                  :disabled="isResending"
                >
                  {{ isResending ? "Sending..." : "Resend Verification Email" }}
                </button>
                <router-link
                  to="/signup"
                  class="auth-button primary"
                  style="margin-top: 12px"
                >
                  Sign Up Again
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Error Modal for failed verification -->
    <div v-if="showErrorModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-exclamation-triangle error-icon"></i>
          <h3>Verification Failed</h3>
        </div>
        <p>{{ errorMessage }}</p>
        <div class="modal-actions">
          <button class="modal-button secondary" @click="closeErrorModal">
            Close
          </button>
          <router-link to="/signup" class="modal-button primary"
            >Sign Up Again</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Verify",
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();

    const isSuccess = ref(true); // Default to success for demo
    const isResending = ref(false);
    const showErrorModal = ref(false);
    const errorMessage = ref("");

    const verificationTitle = computed(() => {
      return isSuccess.value
        ? "Email Verified Successfully!"
        : "Verification Required";
    });

    const verificationMessage = computed(() => {
      return isSuccess.value
        ? "Your email address has been verified. You can now access all features of the Mikaelson Initiative platform."
        : "Please check your email and click the verification link to activate your account. If you haven't received the email, you can request a new one.";
    });

    const verificationIcon = computed(() => {
      return isSuccess.value ? "fas fa-check-circle" : "fas fa-envelope";
    });

    const verificationColor = computed(() => {
      return isSuccess.value ? "#10b981" : "#6b7280";
    });

    const resendVerification = async () => {
      isResending.value = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message (in real app, this would be a toast notification)
        alert("Verification email sent! Please check your inbox.");
      } catch (error) {
        errorMessage.value =
          "Failed to send verification email. Please try again.";
        showErrorModal.value = true;
      } finally {
        isResending.value = false;
      }
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    onMounted(() => {
      // Check for verification token in URL params
      const token = route.query.token;
      if (token) {
        // In a real app, you would verify the token with your backend
        // For demo purposes, we'll just check if it's a specific value
        if (token === "valid") {
          isSuccess.value = true;
        } else {
          isSuccess.value = false;
          errorMessage.value =
            "The verification link is invalid or has expired.";
          showErrorModal.value = true;
        }
      } else {
        // No token, show the resend verification interface
        isSuccess.value = false;
      }
    });

    return {
      isSuccess,
      isResending,
      showErrorModal,
      errorMessage,
      verificationTitle,
      verificationMessage,
      verificationIcon,
      verificationColor,
      resendVerification,
      closeErrorModal,
    };
  },
};
</script>

<style scoped>
/* Component-specific styles if needed */
.verification-content {
  margin-top: 30px;
}

.success-features {
  margin-bottom: 30px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-list i {
  color: #10b981;
  width: 20px;
}
</style>
