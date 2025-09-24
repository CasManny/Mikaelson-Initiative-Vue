// Component loader utility
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            
            // Re-initialize components after loading
            if (elementId === 'navbar-placeholder') {
                initializeDropdowns();
                updateNavbarAuthState();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Initialize dropdown functionality
function initializeDropdowns() {
    // Initialize dropdown listeners
    document.querySelectorAll('.dropdown .nav-link').forEach(link => {
        link.addEventListener('click', toggleNavDropdown);
    });
}

// Update navbar based on authentication state
function updateNavbarAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('mikaelson_current_user') || 'null');
    const userMenu = document.getElementById('userMenu');
    const navUserInitials = document.getElementById('navUserInitials');
    
    if (currentUser && userMenu) {
        // User is logged in - show user menu
        userMenu.style.display = 'flex';
        
        // Update user initials
        if (navUserInitials) {
            const initials = (currentUser.firstName[0] + currentUser.lastName[0]).toUpperCase();
            navUserInitials.textContent = initials;
        }
    } else if (userMenu) {
        // User is not logged in - hide user menu
        userMenu.style.display = 'none';
    }
}

// Show logout confirmation modal
function showLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar and footer components
    loadComponent('navbar-placeholder', '../components/navbar.html');
    loadComponent('footer-placeholder', '../components/footer.html');
});
