// Dashboard functionality
class Dashboard {
    constructor() {
        this.currentUser = authManager.getCurrentUser();
        this.habits = JSON.parse(localStorage.getItem('mikaelson_habits') || '[]');
        this.userStats = JSON.parse(localStorage.getItem('mikaelson_user_stats') || '{}');
        
        if (!this.currentUser) {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
            return;
        }
        
        this.initializePage();
        this.setupEventListeners();
    }

    initializePage() {
        this.populateUserInfo();
        this.loadUserStats();
        this.renderHabits();
        this.updateLeaderboard();
    }

    populateUserInfo() {
        const userName = document.getElementById('userName');
        const userInitials = document.getElementById('userInitials');
        const currentUserName = document.getElementById('currentUserName');
        
        if (userName) {
            userName.textContent = this.currentUser.firstName;
        }
        
        if (userInitials) {
            const initials = (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
            userInitials.textContent = initials;
        }
        
        if (currentUserName) {
            currentUserName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        }
    }

    loadUserStats() {
        const userId = this.currentUser.id;
        const stats = this.userStats[userId] || this.getDefaultStats();
        
        // Update stat displays
        const currentStreak = document.getElementById('currentStreak');
        const totalPoints = document.getElementById('totalPoints');
        const completionRate = document.getElementById('completionRate');
        const userPoints = document.getElementById('userPoints');
        const userRank = document.getElementById('userRank');
        
        if (currentStreak) currentStreak.textContent = stats.currentStreak;
        if (totalPoints) totalPoints.textContent = stats.totalPoints.toLocaleString();
        if (completionRate) completionRate.textContent = `${stats.completionRate}%`;
        if (userPoints) userPoints.textContent = `${stats.totalPoints} pts`;
        if (userRank) userRank.textContent = stats.rank;
    }

    getDefaultStats() {
        return {
            currentStreak: 0,
            totalPoints: 0,
            completionRate: 0,
            rank: Math.floor(Math.random() * 50) + 10, // Random rank for demo
            habitsCompleted: 0,
            totalHabits: 0
        };
    }

    renderHabits() {
        const habitsGrid = document.getElementById('habitsGrid');
        const userHabits = this.getUserHabits();
        
        // Clear existing sample cards
        const sampleCards = habitsGrid.querySelectorAll('.sample');
        sampleCards.forEach(card => card.remove());
        
        if (userHabits.length === 0) {
            this.showEmptyState();
            return;
        }
        
        userHabits.forEach(habit => {
            const habitCard = this.createHabitCard(habit);
            habitsGrid.appendChild(habitCard);
        });
    }

    getUserHabits() {
        const userId = this.currentUser.id;
        return this.habits.filter(habit => habit.userId === userId);
    }

    createHabitCard(habit) {
        const card = document.createElement('div');
        card.className = 'habit-card';
        card.dataset.habitId = habit.id;
        
        const statusClass = this.getHabitStatusClass(habit);
        const statusIcon = this.getHabitStatusIcon(habit);
        const progress = this.calculateHabitProgress(habit);
        
        card.innerHTML = `
            <div class="habit-header">
                <div class="habit-info">
                    <h3>${habit.name}</h3>
                    <p>${habit.description}</p>
                </div>
                <div class="habit-status ${statusClass}">
                    <i class="fas fa-${statusIcon}"></i>
                </div>
            </div>
            <div class="habit-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <span class="progress-text">${progress.text}</span>
            </div>
            <div class="habit-actions">
                ${this.getHabitActions(habit)}
            </div>
        `;
        
        this.addHabitEventListeners(card, habit);
        return card;
    }

    getHabitStatusClass(habit) {
        const today = new Date().toDateString();
        const completion = habit.completions.find(c => new Date(c.date).toDateString() === today);
        
        if (completion) {
            return completion.status === 'completed' ? 'completed' : 'skipped';
        }
        return 'pending';
    }

    getHabitStatusIcon(habit) {
        const today = new Date().toDateString();
        const completion = habit.completions.find(c => new Date(c.date).toDateString() === today);
        
        if (completion) {
            return completion.status === 'completed' ? 'check' : 'times';
        }
        return 'clock';
    }

    calculateHabitProgress(habit) {
        const totalDays = Math.ceil((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24)) + 1;
        const completedDays = habit.completions.filter(c => c.status === 'completed').length;
        const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
        
        return {
            percentage: Math.min(percentage, 100),
            text: `${completedDays} of ${totalDays} days`
        };
    }

    getHabitActions(habit) {
        const today = new Date().toDateString();
        const completion = habit.completions.find(c => new Date(c.date).toDateString() === today);
        
        if (completion) {
            if (completion.status === 'completed') {
                return `
                    <button class="habit-btn completed" disabled>
                        <i class="fas fa-check"></i>
                        Completed
                    </button>
                `;
            } else {
                return `
                    <button class="habit-btn complete" data-action="complete">
                        <i class="fas fa-check"></i>
                        Complete
                    </button>
                `;
            }
        }
        
        return `
            <button class="habit-btn complete" data-action="complete">
                <i class="fas fa-check"></i>
                Complete
            </button>
            <button class="habit-btn skip" data-action="skip">
                <i class="fas fa-times"></i>
                Skip
            </button>
        `;
    }

    addHabitEventListeners(card, habit) {
        const buttons = card.querySelectorAll('.habit-btn[data-action]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.closest('button').dataset.action;
                this.handleHabitAction(habit.id, action);
            });
        });
    }

    handleHabitAction(habitId, action) {
        const today = new Date().toISOString().split('T')[0];
        const habit = this.habits.find(h => h.id === habitId);
        
        if (!habit) return;
        
        // Remove existing completion for today
        habit.completions = habit.completions.filter(c => 
            new Date(c.date).toDateString() !== new Date().toDateString()
        );
        
        // Add new completion
        habit.completions.push({
            date: today,
            status: action,
            timestamp: new Date().toISOString()
        });
        
        // Update storage
        this.saveHabits();
        
        // Update user stats
        this.updateUserStats();
        
        // Re-render habits
        this.renderHabits();
        
        // Show feedback
        this.showActionFeedback(action, habit.name);
    }

    showActionFeedback(action, habitName) {
        const message = action === 'complete' 
            ? `Great job! You completed "${habitName}"` 
            : `"${habitName}" marked as skipped for today`;
            
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${action === 'complete' ? '#10b981' : '#6b7280'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    updateUserStats() {
        const userId = this.currentUser.id;
        const userHabits = this.getUserHabits();
        const stats = this.userStats[userId] || this.getDefaultStats();
        
        // Calculate completion rate
        const totalCompletions = userHabits.reduce((sum, habit) => sum + habit.completions.length, 0);
        const completedCount = userHabits.reduce((sum, habit) => 
            sum + habit.completions.filter(c => c.status === 'completed').length, 0
        );
        
        stats.completionRate = totalCompletions > 0 ? Math.round((completedCount / totalCompletions) * 100) : 0;
        stats.totalPoints = completedCount * 10; // 10 points per completion
        stats.habitsCompleted = completedCount;
        stats.totalHabits = userHabits.length;
        
        // Calculate current streak
        stats.currentStreak = this.calculateCurrentStreak();
        
        this.userStats[userId] = stats;
        localStorage.setItem('mikaelson_user_stats', JSON.stringify(this.userStats));
        
        // Update display
        this.loadUserStats();
    }

    calculateCurrentStreak() {
        const userHabits = this.getUserHabits();
        if (userHabits.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < 30; i++) { // Check last 30 days
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateString = checkDate.toDateString();
            
            const dayCompleted = userHabits.some(habit => 
                habit.completions.some(c => 
                    new Date(c.date).toDateString() === dateString && c.status === 'completed'
                )
            );
            
            if (dayCompleted) {
                streak++;
            } else if (i > 0) { // Don't break on today if no habits completed yet
                break;
            }
        }
        
        return streak;
    }

    showEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.style.display = 'block';
        }
    }

    setupEventListeners() {
        // Add habit buttons
        document.querySelectorAll('.add-habit-btn, .cta-button.primary').forEach(button => {
            button.addEventListener('click', () => this.showAddHabitModal());
        });
        
        // Quick action buttons
        document.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                this.handleQuickAction(action);
            });
        });
    }

    showAddHabitModal() {
        // For demo purposes, add a sample habit
        const sampleHabits = [
            { name: 'Morning Exercise', description: '30 minutes of physical activity' },
            { name: 'Read Daily', description: 'Read for 30 minutes each day' },
            { name: 'Drink Water', description: 'Drink 8 glasses of water' },
            { name: 'Meditation', description: '10 minutes of mindfulness' },
            { name: 'Journal Writing', description: 'Write 3 things you\'re grateful for' }
        ];
        
        const randomHabit = sampleHabits[Math.floor(Math.random() * sampleHabits.length)];
        this.addHabit(randomHabit.name, randomHabit.description);
    }

    addHabit(name, description) {
        const newHabit = {
            id: this.generateId(),
            userId: this.currentUser.id,
            name: name,
            description: description,
            createdAt: new Date().toISOString(),
            completions: []
        };
        
        this.habits.push(newHabit);
        this.saveHabits();
        this.renderHabits();
        this.updateUserStats();
        
        this.showActionFeedback('complete', `New habit "${name}" added!`);
    }

    handleQuickAction(action) {
        switch (action) {
            case 'Create Habit':
                this.showAddHabitModal();
                break;
            case 'Log Progress':
                // Scroll to habits section
                document.querySelector('.habits-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Find Partner':
                window.location.href = 'community.html';
                break;
            case 'View 
                window.location.href = 'community.html';
                break;
        }
    }

    updateLeaderboard() {
        // The leaderboard is already populated with sample data
        // In a real app, this would fetch from an API
    }

    saveHabits() {
        localStorage.setItem('mikaelson_habits', JSON.stringify(this.habits));
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Logout functionality
function confirmLogout() {
    authManager.logout();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Add CSS animations for toast notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
