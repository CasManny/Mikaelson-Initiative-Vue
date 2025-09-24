// Email verification functionality
class EmailVerification {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('mikaelson_users') || '[]');
        this.urlParams = new URLSearchParams(window.location.search);
        this.token = this.urlParams.get('token');
        
        this.initializeVerification();
    }

    initializeVerification() {
        if (!this.token) {
            this.showError('No verification token provided');
            return;
        }

        // Find user with matching verification token
        const user = this.users.find(u => u.verificationToken === this.token);
        
        if (!user) {
            this.showError('Invalid verification token');
            return;
        }

        if (user.verified) {
            this.showAlreadyVerified();
            return;
        }

        // Verify the user
        this.verifyUser(user);
    }

    verifyUser(user) {
        try {
            // Mark user as verified
            user.verified = true;
            user.verifiedAt = new Date().toISOString();
            
            // Remove verification token for security
            delete user.verificationToken;
            
            // Save updated users
            localStorage.setItem('mikaelson_users', JSON.stringify(this.users));
            
            // Show success message
            this.showSuccess(user);
            
        } catch (error) {
            this.showError('An error occurred during verification');
        }
    }

    showSuccess(user) {
        const title = document.getElementById('verificationTitle');
        const message = document.getElementById('verificationMessage');
        const cta = document.getElementById('verificationCTA');
        
        if (title) {
            title.textContent = 'Email Verified Successfully!';
            title.style.color = '#10b981';
        }
        
        if (message) {
            message.textContent = `Welcome to the Mikaelson Initiative, ${user.firstName}! Your email has been verified and your account is now active.`;
        }
        
        if (cta) {
            cta.textContent = 'Sign In to Continue';
            cta.href = 'login.html';
        }
    }

    showAlreadyVerified() {
        const title = document.getElementById('verificationTitle');
        const message = document.getElementById('verificationMessage');
        const cta = document.getElementById('verificationCTA');
        
        if (title) {
            title.textContent = 'Already Verified';
            title.style.color = '#4f46e5';
        }
        
        if (message) {
            message.textContent = 'Your email address has already been verified. You can sign in to access your account.';
        }
        
        if (cta) {
            cta.textContent = 'Sign In Now';
            cta.href = 'login.html';
        }
    }

    showError(errorMessage) {
        const title = document.getElementById('verificationTitle');
        const message = document.getElementById('verificationMessage');
        const cta = document.getElementById('verificationCTA');
        const logo = document.querySelector('.logo i');
        
        if (title) {
            title.textContent = 'Verification Failed';
            title.style.color = '#ef4444';
        }
        
        if (message) {
            message.textContent = errorMessage;
        }
        
        if (logo) {
            logo.className = 'fas fa-exclamation-triangle';
            logo.style.color = '#ef4444';
        }
        
        if (cta) {
            cta.textContent = 'Request New Verification';
            cta.href = 'signup.html';
            cta.style.background = '#ef4444';
        }
        
        // Show error modal
        setTimeout(() => {
            const modal = document.getElementById('errorModal');
            const modalMessage = document.getElementById('errorModalMessage');
            
            if (modal && modalMessage) {
                modalMessage.textContent = errorMessage;
                modal.classList.add('show');
            }
        }, 1000);
    }
}

// Global function for modal interactions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Initialize verification when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EmailVerification();
});
