import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import AboutView from '@/views/auth/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
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
      // component: () => import('../views/Login.vue'),
      component: Login,
      meta:{
        isAuthLayout:true // This route requires authentication
       }
    },
    {
      path: '/register',
      name: 'Register',
       component: () => import('../views/auth/Register.vue'),
       meta:{
        isAuthLayout:true // This route requires authentication
       }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/User.vue'),


    }


  ],
})


router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = accessToken !== undefined && accessToken !== null && accessToken !== '';
  console.log('accessToken:', accessToken);
  console.log('To route:', to.name);

  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
    // Chưa đăng nhập mà cố vào trang khác → chuyển về Login
    console.log('Redirecting to Login');
    next({ name: 'Login' });
  } else if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Đã đăng nhập mà cố vào Login/Register → chuyển về Home
     console.log('Redirecting to Home');
    next({ name: 'Home' });
  } else {
    // Trường hợp còn lại: cho phép
    console.log('Proceeding to route');
    next();
  }
});


export default router
