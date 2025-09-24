import { defineStore } from 'pinia'

export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    challenges: [],
    userPosts: [],
    postComments: [],
    loading: false,
    error: null
  }),

  getters: {
    getAllPosts: (state) => state.userPosts,
    getActiveChallenges: (state) => state.challenges.filter(c => c.status === 'active'),
    getUserChallenges: (state) => (userId) => state.userPosts.filter(p => p.userId === userId)
  },

  actions: {
    // Initialize with sample data
    initializeChallenges() {
      this.challenges = [
        {
          id: 1,
          title: "30-Day Morning Routine",
          description: "Build a consistent morning routine for 30 days",
          duration: 30,
          category: "Productivity",
          status: "active",
          participants: 245,
          createdAt: new Date('2024-12-01'),
          difficulty: "Beginner"
        },
        {
          id: 2,
          title: "Read 5 Books in 2 Months",
          description: "Challenge yourself to read 5 books in 2 months",
          duration: 60,
          category: "Learning",
          status: "active",
          participants: 189,
          createdAt: new Date('2024-12-05'),
          difficulty: "Intermediate"
        },
        {
          id: 3,
          title: "Daily Exercise Challenge",
          description: "Exercise for at least 30 minutes every day for 21 days",
          duration: 21,
          category: "Health",
          status: "active",
          participants: 432,
          createdAt: new Date('2024-12-10'),
          difficulty: "Beginner"
        },
        {
          id: 4,
          title: "Learn a New Skill",
          description: "Dedicate 1 hour daily to learning a new skill for 45 days",
          duration: 45,
          category: "Learning",
          status: "active",
          participants: 156,
          createdAt: new Date('2024-12-15'),
          difficulty: "Advanced"
        }
      ];

      this.userPosts = [
        {
          id: 1,
          userId: 1,
          userName: "Amara Okafor",
          userAvatar: "AO",
          challengeId: 1,
          challengeTitle: "30-Day Morning Routine",
          content: "Day 15 of my morning routine challenge! 🌅 Started with meditation, journaling, and a quick workout. Feeling more focused and energized than ever!",
          progress: {
            currentDay: 15,
            totalDays: 30,
            percentage: 50
          },
          images: [],
          likes: 24,
          comments: 8,
          reposts: 3,
          shares: 5,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-16T08:30:00'),
          tags: ["morningroutine", "meditation", "productivity"]
        },
        {
          id: 2,
          userId: 2,
          userName: "Kwame Asante",
          userAvatar: "KA",
          challengeId: 2,
          challengeTitle: "Read 5 Books in 2 Months",
          content: "Just finished 'Atomic Habits' by James Clear! 📚 Book 3/5 completed. The insights on habit formation are incredible. Who else is reading this?",
          progress: {
            currentDay: 35,
            totalDays: 60,
            percentage: 58,
            booksRead: 3,
            totalBooks: 5
          },
          images: [],
          likes: 31,
          comments: 12,
          reposts: 7,
          shares: 9,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-16T19:45:00'),
          tags: ["reading", "books", "atomichabits"]
        },
        {
          id: 3,
          userId: 3,
          userName: "Zara Mwangi",
          userAvatar: "ZM",
          challengeId: 3,
          challengeTitle: "Daily Exercise Challenge",
          content: "Week 2 of daily exercise complete! 💪 Mixed it up with yoga, running, and strength training. My energy levels have improved so much!",
          progress: {
            currentDay: 14,
            totalDays: 21,
            percentage: 67
          },
          images: [],
          likes: 18,
          comments: 5,
          reposts: 2,
          shares: 4,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-16T17:20:00'),
          tags: ["exercise", "fitness", "yoga", "running"]
        },
        {
          id: 4,
          userId: 4,
          userName: "Emmanuel Adebayo",
          userAvatar: "EA",
          challengeId: 4,
          challengeTitle: "Learn a New Skill",
          content: "Day 20 of learning Python! 🐍 Built my first web scraper today. The progress feels slow some days, but consistency is key. #NeverStopLearning",
          progress: {
            currentDay: 20,
            totalDays: 45,
            percentage: 44
          },
          images: [],
          likes: 27,
          comments: 9,
          reposts: 6,
          shares: 8,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-16T21:10:00'),
          tags: ["python", "coding", "webdevelopment", "learning"]
        },
        {
          id: 5,
          userId: 1,
          userName: "Amara Okafor",
          userAvatar: "AO",
          challengeId: 1,
          challengeTitle: "30-Day Morning Routine",
          content: "Morning routine update: Added gratitude journaling to my practice. Three things I'm grateful for today: ☀️ Beautiful sunrise, 👥 Supportive community, 📈 Personal growth",
          progress: {
            currentDay: 16,
            totalDays: 30,
            percentage: 53
          },
          images: [],
          likes: 19,
          comments: 6,
          reposts: 4,
          shares: 7,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T07:15:00'),
          tags: ["gratitude", "journaling", "morningroutine"]
        },
        {
          id: 6,
          userId: 5,
          userName: "Chioma Nwachukwu",
          userAvatar: "CN",
          challengeId: 3,
          challengeTitle: "Daily Exercise Challenge",
          content: "Struggled with motivation today but showed up anyway! Did a 20-minute yoga session. Sometimes just showing up is the biggest victory. 🧘‍♀️ #consistency",
          progress: {
            currentDay: 8,
            totalDays: 21,
            percentage: 38
          },
          images: [],
          likes: 42,
          comments: 15,
          reposts: 8,
          shares: 12,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T18:30:00'),
          tags: ["motivation", "yoga", "consistency", "selfcare"]
        },
        {
          id: 7,
          userId: 6,
          userName: "Taiwo Adeleke",
          userAvatar: "TA",
          challengeId: 2,
          challengeTitle: "Read 5 Books in 2 Months",
          content: "Book recommendation! 📖 Just started 'The 7 Habits of Highly Effective People' and already loving the insights on personal leadership. What are you reading?",
          progress: {
            currentDay: 25,
            totalDays: 60,
            percentage: 42,
            booksRead: 2,
            totalBooks: 5
          },
          images: [],
          likes: 28,
          comments: 11,
          reposts: 5,
          shares: 9,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T14:20:00'),
          tags: ["reading", "books", "leadership", "growth"]
        },
        {
          id: 8,
          userId: 7,
          userName: "Fatima Kone",
          userAvatar: "FK",
          challengeId: 4,
          challengeTitle: "Learn a New Skill",
          content: "Major breakthrough! 🎉 Finally understood recursion in programming. Built my first recursive function today. The 'aha!' moment was incredible!",
          progress: {
            currentDay: 32,
            totalDays: 45,
            percentage: 71
          },
          images: [],
          likes: 35,
          comments: 18,
          reposts: 12,
          shares: 6,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T20:45:00'),
          tags: ["programming", "learning", "breakthrough", "coding"]
        },
        {
          id: 9,
          userId: 8,
          userName: "David Osei",
          userAvatar: "DO",
          challengeId: 1,
          challengeTitle: "30-Day Morning Routine",
          content: "Week 3 complete! My morning routine now includes: 5 min meditation, 10 min journaling, 15 min reading, and a healthy breakfast. Energy levels through the roof! 🚀",
          progress: {
            currentDay: 21,
            totalDays: 30,
            percentage: 70
          },
          images: [],
          likes: 56,
          comments: 23,
          reposts: 15,
          shares: 18,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T08:10:00'),
          tags: ["morningroutine", "meditation", "energy", "habits"]
        },
        {
          id: 10,
          userId: 9,
          userName: "Aisha Musa",
          userAvatar: "AM",
          challengeId: 3,
          challengeTitle: "Daily Exercise Challenge",
          content: "Rest day reflections: Taking breaks is just as important as showing up. Listened to my body today and did gentle stretching instead of intense workout. Self-care wins! 💪✨",
          progress: {
            currentDay: 12,
            totalDays: 21,
            percentage: 57
          },
          images: [],
          likes: 31,
          comments: 9,
          reposts: 6,
          shares: 4,
          isLiked: false,
          isReposted: false,
          createdAt: new Date('2024-12-17T16:00:00'),
          tags: ["restday", "selfcare", "listening", "balance"]
        }
      ];

      // Initialize sample comments
      this.postComments = [
        {
          id: 1,
          postId: 1,
          userId: 2,
          userName: "Kwame Asante",
          userAvatar: "KA",
          content: "This is so inspiring! Keep it up! 💪",
          createdAt: new Date('2024-12-16T09:15:00'),
          likes: 3
        },
        {
          id: 2,
          postId: 1,
          userId: 3,
          userName: "Zara Mwangi",
          userAvatar: "ZM",
          content: "What meditation app do you use? Looking for recommendations!",
          createdAt: new Date('2024-12-16T10:30:00'),
          likes: 1
        },
        {
          id: 3,
          postId: 2,
          userId: 1,
          userName: "Amara Okafor",
          userAvatar: "AO",
          content: "Added this to my reading list! Thanks for the recommendation 📚",
          createdAt: new Date('2024-12-16T20:00:00'),
          likes: 2
        },
        {
          id: 4,
          postId: 6,
          userId: 2,
          userName: "Kwame Asante",
          userAvatar: "KA",
          content: "I needed to hear this today! Thank you for the reminder that showing up is enough sometimes 🙏",
          createdAt: new Date('2024-12-17T19:00:00'),
          likes: 8
        },
        {
          id: 5,
          postId: 6,
          userId: 4,
          userName: "Emmanuel Adebayo",
          userAvatar: "EA",
          content: "Absolutely! Some days are about maintenance, not improvement. Great mindset! 👏",
          createdAt: new Date('2024-12-17T19:15:00'),
          likes: 5
        },
        {
          id: 6,
          postId: 7,
          userId: 3,
          userName: "Zara Mwangi",
          userAvatar: "ZM",
          content: "Currently reading 'Mindset' by Carol Dweck. Highly recommend it!",
          createdAt: new Date('2024-12-17T15:00:00'),
          likes: 4
        },
        {
          id: 7,
          postId: 8,
          userId: 1,
          userName: "Amara Okafor",
          userAvatar: "AO",
          content: "Congratulations! Recursion was my biggest challenge too. What resources helped you?",
          createdAt: new Date('2024-12-17T21:00:00'),
          likes: 2
        },
        {
          id: 8,
          postId: 9,
          userId: 5,
          userName: "Chioma Nwachukwu",
          userAvatar: "CN",
          content: "Your routine sounds amazing! How long did it take to make it a habit?",
          createdAt: new Date('2024-12-17T08:30:00'),
          likes: 3
        }
      ];
    },

    // Add a new challenge post
    addChallengePost(postData) {
      const newPost = {
        id: Date.now(),
        userId: postData.userId,
        userName: postData.userName,
        userAvatar: postData.userAvatar,
        challengeId: postData.challengeId,
        challengeTitle: postData.challengeTitle,
        content: postData.content,
        progress: postData.progress,
        images: postData.images || [],
        likes: 0,
        comments: 0,
        reposts: 0,
        shares: 0,
        isLiked: false,
        isReposted: false,
        createdAt: new Date(),
        tags: postData.tags || []
      };
      
      this.userPosts.unshift(newPost);
      return newPost;
    },

    // Like a post
    likePost(postId) {
      const post = this.userPosts.find(p => p.id === postId);
      if (post) {
        if (post.isLiked) {
          post.likes -= 1;
          post.isLiked = false;
        } else {
          post.likes += 1;
          post.isLiked = true;
        }
      }
    },

    // Repost a post
    repostPost(postId, userId, userName, userAvatar) {
      const originalPost = this.userPosts.find(p => p.id === postId);
      if (originalPost && !originalPost.isReposted) {
        originalPost.reposts += 1;
        originalPost.isReposted = true;
        
        // Create a repost entry
        const repost = {
          ...originalPost,
          id: Date.now(),
          isRepost: true,
          originalPostId: postId,
          repostedBy: {
            userId,
            userName,
            userAvatar
          },
          createdAt: new Date()
        };
        
        this.userPosts.unshift(repost);
      }
    },

    // Share a post (increment share count)
    sharePost(postId) {
      const post = this.userPosts.find(p => p.id === postId);
      if (post) {
        post.shares += 1;
      }
    },

    // Add comment to post
    addComment(postId, commentData) {
      const comment = {
        id: Date.now(),
        postId,
        userId: commentData.userId,
        userName: commentData.userName,
        userAvatar: commentData.userAvatar,
        content: commentData.content,
        createdAt: new Date(),
        likes: 0
      };
      
      this.postComments.unshift(comment);
      
      // Increment comment count on post
      const post = this.userPosts.find(p => p.id === postId);
      if (post) {
        post.comments += 1;
      }
      
      return comment;
    },

    // Get comments for a post
    getPostComments(postId) {
      return this.postComments.filter(c => c.postId === postId);
    },

    // Like a comment
    likeComment(commentId) {
      const comment = this.postComments.find(c => c.id === commentId);
      if (comment) {
        comment.likes += 1;
      }
    },

    // Filter posts by challenge
    getPostsByChallenge(challengeId) {
      return this.userPosts.filter(p => p.challengeId === challengeId);
    },

    // Get challenge by ID
    getChallengeById(challengeId) {
      return this.challenges.find(c => c.id === challengeId);
    }
  }
})
