// Authentication functionality
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('mikaelson_users') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('mikaelson_current_user') || 'null');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', this.handleSignup.bind(this));
        }

        // Password toggle buttons
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', this.togglePassword);
        });

        // Password strength checker
        const passwordInput = document.getElementById('password');
        if (passwordInput && document.getElementById('passwordStrength')) {
            passwordInput.addEventListener('input', this.checkPasswordStrength);
        }

        // Social login buttons
        const googleLogin = document.getElementById('googleLogin') || document.getElementById('googleSignup');
        const facebookLogin = document.getElementById('facebookLogin') || document.getElementById('facebookSignup');
        
        if (googleLogin) {
            googleLogin.addEventListener('click', () => this.handleSocialLogin('google'));
        }
        
        if (facebookLogin) {
            facebookLogin.addEventListener('click', () => this.handleSocialLogin('facebook'));
        }

        // Check if user is already logged in
        if (this.currentUser && window.location.pathname.includes('index.html')) {
            this.redirectToDashboard();
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe');

        // Clear previous errors
        this.clearErrors();

        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return;
        }

        if (!password) {
            this.showError('passwordError', 'Password is required');
            return;
        }

        // Show loading state
        this.setButtonLoading('loginButton', true);

        try {
            // Simulate API call delay
            await this.delay(1500);

            // Find user
            const user = this.users.find(u => u.email === email);
            
            if (!user) {
                throw new Error('No account found with this email address');
            }

            if (user.password !== this.hashPassword(password)) {
                throw new Error('Incorrect password');
            }

            if (!user.verified) {
                throw new Error('Please verify your email address before logging in');
            }

            // Update last login
            user.lastLogin = new Date().toISOString();
            this.saveUsers();

            // Set current user
            this.currentUser = user;
            localStorage.setItem('mikaelson_current_user', JSON.stringify(user));

            // Set remember me
            if (rememberMe) {
                localStorage.setItem('mikaelson_remember_me', 'true');
            }

            // Show success and redirect
            this.showSuccessModal();
            setTimeout(() => {
                this.redirectToDashboard();
            }, 2000);

        } catch (error) {
            this.showErrorModal(error.message);
        } finally {
            this.setButtonLoading('loginButton', false);
        }
    }

    async handleSignup(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const userData = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim().toLowerCase(),
            country: formData.get('country'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            agreeTerms: formData.get('agreeTerms'),
            newsletter: formData.get('newsletter')
        };

        // Clear previous errors
        this.clearErrors();

        // Validate all fields
        if (!this.validateSignupForm(userData)) {
            return;
        }

        // Show loading state
        this.setButtonLoading('signupButton', true);

        try {
            // Simulate API call delay
            await this.delay(2000);

            // Check if user already exists
            if (this.users.find(u => u.email === userData.email)) {
                throw new Error('An account with this email already exists');
            }

            // Create new user
            const newUser = {
                id: this.generateId(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                country: userData.country,
                password: this.hashPassword(userData.password),
                newsletter: !!userData.newsletter,
                verified: false,
                verificationToken: this.generateId(),
                createdAt: new Date().toISOString(),
                lastLogin: null
            };

            // Add user to storage
            this.users.push(newUser);
            this.saveUsers();

            // Send verification email (simulated)
            await this.sendVerificationEmail(newUser);

            // Show verification modal
            this.showVerificationModal(userData.email);

        } catch (error) {
            this.showErrorModal(error.message);
        } finally {
            this.setButtonLoading('signupButton', false);
        }
    }

    validateSignupForm(userData) {
        let isValid = true;

        // First name validation
        if (!userData.firstName || userData.firstName.length < 2) {
            this.showError('firstNameError', 'First name must be at least 2 characters');
            isValid = false;
        }

        // Last name validation
        if (!userData.lastName || userData.lastName.length < 2) {
            this.showError('lastNameError', 'Last name must be at least 2 characters');
            isValid = false;
        }

        // Email validation
        if (!this.validateEmail(userData.email)) {
            this.showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Country validation
        if (!userData.country) {
            this.showError('countryError', 'Please select your country');
            isValid = false;
        }

        // Password validation
        const passwordStrength = this.getPasswordStrength(userData.password);
        if (passwordStrength.score < 3) {
            this.showError('passwordError', 'Password must be stronger (use uppercase, lowercase, numbers, and symbols)');
            isValid = false;
        }

        // Confirm password validation
        if (userData.password !== userData.confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        // Terms agreement validation
        if (!userData.agreeTerms) {
            this.showError('agreeTermsError', 'You must agree to the Terms of Service');
            isValid = false;
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        if (password.length >= 8) score++;
        else feedback.push('At least 8 characters');

        if (/[a-z]/.test(password)) score++;
        else feedback.push('Lowercase letters');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Uppercase letters');

        if (/\d/.test(password)) score++;
        else feedback.push('Numbers');

        if (/[^a-zA-Z\d]/.test(password)) score++;
        else feedback.push('Special characters');

        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['weak', 'weak', 'fair', 'good', 'strong'];

        return {
            score,
            level: levels[score] || 'Very Weak',
            color: colors[score] || 'weak',
            feedback
        };
    }

    checkPasswordStrength(event) {
        const password = event.target.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        const strengthFill = strengthIndicator.querySelector('.strength-fill');
        const strengthText = strengthIndicator.querySelector('.strength-text');

        if (!password) {
            strengthFill.style.width = '0%';
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Password strength';
            return;
        }

        const strength = authManager.getPasswordStrength(password);
        strengthFill.style.width = `${(strength.score / 5) * 100}%`;
        strengthFill.className = `strength-fill ${strength.color}`;
        strengthText.textContent = `${strength.level} password`;
    }

    togglePassword(event) {
        const button = event.currentTarget;
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    async handleSocialLogin(provider) {
        try {
            // Show loading state
            const button = event.currentTarget;
            const originalContent = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            button.disabled = true;

            // Simulate social login
            await this.delay(2000);

            // For demo purposes, create a mock social user
            const mockUser = {
                id: this.generateId(),
                firstName: provider === 'google' ? 'John' : 'Jane',
                lastName: provider === 'google' ? 'Doe' : 'Smith',
                email: `${provider}.user@example.com`,
                country: 'nigeria',
                provider: provider,
                verified: true,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            // Check if user exists
            let existingUser = this.users.find(u => u.email === mockUser.email);
            if (!existingUser) {
                this.users.push(mockUser);
                this.saveUsers();
                existingUser = mockUser;
            }

            // Set current user
            this.currentUser = existingUser;
            localStorage.setItem('mikaelson_current_user', JSON.stringify(existingUser));

            // Show success and redirect
            this.showSuccessModal();
            setTimeout(() => {
                this.redirectToDashboard();
            }, 2000);

        } catch (error) {
            this.showErrorModal(`Failed to connect with ${provider}. Please try again.`);
        } finally {
            // Restore button
            const button = event.currentTarget;
            button.innerHTML = originalContent;
            button.disabled = false;
        }
    }

    async sendVerificationEmail(user) {
        // Simulate sending verification email
        await this.delay(500);
        console.log(`Verification email sent to ${user.email}`);
        console.log(`Verification link: /verify?token=${user.verificationToken}`);
    }

    async resendVerification() {
        const email = document.getElementById('verificationEmail').textContent;
        const user = this.users.find(u => u.email === email);
        
        if (user) {
            await this.sendVerificationEmail(user);
            alert('Verification email sent again!');
        }
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    showErrorModal(message) {
        const modal = document.getElementById('errorModal');
        const messageElement = document.getElementById('errorModalMessage');
        
        if (modal && messageElement) {
            messageElement.textContent = message;
            modal.classList.add('show');
        }
    }

    showVerificationModal(email) {
        const modal = document.getElementById('verificationModal');
        const emailElement = document.getElementById('verificationEmail');
        
        if (modal && emailElement) {
            emailElement.textContent = email;
            modal.classList.add('show');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.textContent = '';
        });
    }

    setButtonLoading(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (button) {
            if (loading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        }
    }

    redirectToDashboard() {
        // Redirect to dashboard after successful login
        window.location.href = 'dashboard.html';
    }

    hashPassword(password) {
        // Simple hash for demo - in production, use proper hashing
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    saveUsers() {
        localStorage.setItem('mikaelson_users', JSON.stringify(this.users));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('mikaelson_current_user');
        localStorage.removeItem('mikaelson_remember_me');
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Global functions for modal interactions
function closeModal(modalId) {
    authManager.closeModal(modalId);
}

function resendVerification() {
    authManager.resendVerification();
}

// Initialize auth manager
const authManager = new AuthManager();

// Export for other scripts
window.authManager = authManager;
