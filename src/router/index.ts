import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'

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


router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  console.log('To:', to);
  if(to.name == 'Login' || to.name == 'Register'){


  if(token == undefined || token == null || token == ''){
    console.log('No token found, accept to login');

    next({name:'Home'});
  }else{
    next();
  }}else{
    next();
  }

});

export default router
