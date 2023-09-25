import { createRouter, createWebHistory } from 'vue-router';
//import LoginView from '@/views/LoginView.vue';
import HomeView from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  /*{
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresGuest: true,
    },
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Routes protection
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
