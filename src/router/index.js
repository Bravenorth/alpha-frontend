import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import UserProfile from '@/components/UserProfile.vue';
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import EditProfile from '@/components/EditProfile.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import ScrappingToolPage from '@/components/ScrappingToolPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/edit-profile', component: EditProfile, meta: { requiresAuth: true } },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password/:token', component: ResetPassword },
  { path: '/scrapping-tool', component: ScrappingToolPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
