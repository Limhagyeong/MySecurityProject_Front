import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue'; 
import SignUpPage from '@/views/SignUpPage.vue';
import FindIdPage from '@/views/FindIdPage.vue';
import FindPwdPage from '@/views/FindPwdPage copy.vue'
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/findid',
    name: 'FindIdPage',
    component: FindIdPage
  },
  {
    path: '/findpwd',
    name: 'FindPwdPage',
    component: FindPwdPage
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;