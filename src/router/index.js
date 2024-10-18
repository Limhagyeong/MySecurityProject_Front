import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/member/LoginPage.vue'; 
import SignUpPage from '@/views/member/SignUpPage.vue';
import FindIdPage from '@/views/member/FindIdPage.vue';
import FindPwdPage from '@/views/member/FindPwdPage.vue'
import PostingPage from '@/views/post/PostingPage.vue';
import PostImgCard from '@/views/post/PostImgCard.vue';
const routes = [
  {
    path: '/home',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/',
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