// Navigation dropdown functionality
function toggleNavDropdown(event) {
    event.preventDefault();
    const dropdown = event.currentTarget.closest('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const navIcon = dropdown.querySelector('.nav-icon');
    
    // Close other dropdowns
    document.querySelectorAll('.dropdown-content.show').forEach(content => {
        if (content !== dropdownContent) {
            content.classList.remove('show');
            const otherIcon = content.closest('.dropdown').querySelector('.nav-icon');
            if (otherIcon) {
                otherIcon.classList.remove('rotated');
            }
        }
    });
    
    // Toggle current dropdown
    dropdownContent.classList.toggle('show');
    if (navIcon) {
        navIcon.classList.toggle('rotated');
    }
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    const menuDots = document.querySelector('.menu-dots');
    const menuDropdown = document.getElementById('menuDropdown');
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.getElementById('languageDropdown');
    
    // Handle nav dropdowns
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content.show').forEach(content => {
            content.classList.remove('show');
            const icon = content.closest('.dropdown').querySelector('.nav-icon');
            if (icon) {
                icon.classList.remove('rotated');
            }
        });
    }
    
    // Handle menu dropdown
    if (menuDots && !menuDots.contains(event.target)) {
        menuDropdown.classList.remove('show');
    }
    
    // Handle language dropdown
    if (languageSelector && !languageSelector.contains(event.target)) {
        languageDropdown.classList.remove('show');
    }
});

// Menu dropdown functionality
function toggleMenu() {
    const menuDropdown = document.getElementById('menuDropdown');
    menuDropdown.classList.toggle('show');
}

// Language dropdown functionality
function toggleLanguage() {
    const languageDropdown = document.getElementById('languageDropdown');
    languageDropdown.classList.toggle('show');
}

// Language selection functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown listeners
    document.querySelectorAll('.dropdown .nav-link').forEach(link => {
        link.addEventListener('click', toggleNavDropdown);
    });
    
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    const languageText = document.querySelector('.language-text');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            const langMap = {
                'en': 'EN',
                'fr': 'FR',
                'sw': 'SW',
                'ha': 'HA',
                'yo': 'YO'
            };
            
            languageText.textContent = langMap[selectedLang];
            document.getElementById('languageDropdown').classList.remove('show');
            
            // Here you would implement actual translation logic
            console.log('Language changed to:', selectedLang);
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
            // You can add actual search implementation based on your backend
        }
    }
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation for cards
    const cards = document.querySelectorAll('.testimonial-card, .link-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // CTA button click handlers
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Join')) {
                // Handle join community action
                console.log('Join community clicked');
                // You can add modal or redirect logic here
            } else if (this.textContent.includes('Learn More')) {
                // Handle learn more action
                console.log('Learn more clicked');
                // You can add scroll to information section or modal
            }
        });
    });

    // Profile circle click handler
    document.querySelector('.profile-circle').addEventListener('click', function() {
        // Handle profile click
        console.log('Profile clicked');
        // You can add profile menu or redirect to profile page
    });

    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .testimonial-card, .link-card {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .hero-title {
            animation: fadeInUp 0.8s ease-out;
        }
        
        .mission-statement {
            animation: fadeInUp 1s ease-out;
        }
        
        .cta-container {
            animation: fadeInUp 1.2s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.section-title, .leaderboard-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add scroll-based navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.querySelectorAll('.cta-button, .link-button').forEach(button => {
    button.addEventListener('click', createRipple);
});
