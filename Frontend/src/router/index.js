import { createRouter, createWebHistory } from 'vue-router'

// Use lazy-loaded views to reduce initial bundle and avoid parse-time failures
const Home = () => import('../views/Home.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Sponsor = () => import('../views/Sponsor.vue')
const Labs = () => import('../views/Labs.vue')
const Volunteer = () => import('../views/Volunteer.vue')
const Team = () => import('../views/Team.vue')
const Rio = () => import('../views/Rio.vue')
const Product = () => import('../views/Product.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const Partnership = () => import('../views/Partnership.vue')

// Auth / user related (stored under stores/views per current structure)
const Login = () => import('../stores/views/Login.vue')
const Signup = () => import('../stores/views/Signup.vue')
const Community = () => import('../stores/views/Community.vue')
const Verify = () => import('../stores/views/Verify.vue')

// Static / info pages
const FAQ = () => import('../views/FAQ.vue')
const Terms = () => import('../views/Terms.vue')
const Privacy = () => import('../views/Privacy.vue')
const CodeOfConduct = () => import('../views/CodeOfConduct.vue')
const HelpCenter = () => import('../views/HelpCenter.vue')
const About = () => import('../views/About.vue')

// Additional feature feeds
const SuccessStories = () => import('../views/SuccessStories.vue')
const ChallengesFeed = () => import('../views/ChallengesFeed.vue')
const SocialFeed = () => import('../views/SocialFeed.vue')
const Maintenance = () => import('../views/Maintenance.vue')
const ChapterDetail = () => import('../views/ChapterDetail.vue')
const Leaderboard = () => import('../views/Leaderboard.vue')

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/contact', name: 'ContactUs', component: () => import('../views/ContactUs.vue') },
  { path: '/labs', name: 'Labs', component: Labs },
  { path: '/faq', name: 'FAQ', component: FAQ },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  { path: '/about', name: 'About', component: About },
  { path: '/maintenance', name: 'Maintenance', component: Maintenance },
  { path: '/network', name: 'Partnership', component: Partnership },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/community', name: 'Community', component: Community },
  { path: '/verify', name: 'Verify', component: Verify },
  { path: '/sponsor', name: 'Sponsor', component: Sponsor },
  { path: '/volunteer', name: 'Volunteer', component: Volunteer },
  { path: '/team', name: 'Team', component: Team },
  { path: '/rio', name: 'Rio', component: Rio },
  { path: '/product', name: 'Product', component: Product },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/code-of-conduct', name: 'CodeOfConduct', component: CodeOfConduct },
  { path: '/help', name: 'HelpCenter', component: HelpCenter },
  { path: '/success-stories', name: 'SuccessStories', component: SuccessStories },
  { path: '/challenges', name: 'ChallengesFeed', component: ChallengesFeed },
  { path: '/feed', name: 'MaintenanceFeed', component: Maintenance },
  { path: '/community/chapter/:id', name: 'ChapterDetail', component: ChapterDetail, props: true },
  { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { left: 0, top: 0, behavior: 'auto' }
  }
})

// Navigation guards: verify token only when needed
// No global maintenance redirects; normal routing applies

router.afterEach(() => {
  requestAnimationFrame(() => {
    const main = document.querySelector('main.main-content')
    if (main) main.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  })
})

export default router
