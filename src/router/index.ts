import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import AboutView from '@/views/auth/AboutView.vue'
import ProjectsList from '../views/ProjectsList.vue'

const routes = [
  {
    path: '/boards/:boardId',
    name: 'BoardDetail',
    component: () => import('@/views/BoardDetail.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsList,
  },
  {
    path: '/projects/:projectId',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isAuthLayout: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta: {
      isAuthLayout: true,
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  const isAuthenticated = accessToken !== undefined && accessToken !== null && accessToken !== ''
  console.log('accessToken:', accessToken)
  console.log('To route:', to.name)

  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
    // Chưa đăng nhập mà cố vào trang khác → chuyển về Login
    console.log('Redirecting to Login')
    next({ name: 'Login' })
  } else if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Đã đăng nhập mà cố vào Login/Register → chuyển về Home
    console.log('Redirecting to Home')
    next({ name: 'Home' })
  } else {
    // Trường hợp còn lại: cho phép
    console.log('Proceeding to route')
    next()
  }
})

export default router
