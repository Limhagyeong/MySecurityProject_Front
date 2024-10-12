import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue'; 
import SignUpPage from '@/views/SignUpPage.vue';
import FindIdPage from '@/views/FindIdPage.vue';
import FindPwdPage from '@/views/FindPwdPage.vue'
import PostingPage from '@/views/PostingPage.vue';
import PostImgCard from '@/views/PostImgCard.vue';
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
  {
    path: '/posting',
    name: 'PostingPage',
    component: PostingPage
  },
  {
    path: '/postimgcard',
    component: PostImgCard
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;