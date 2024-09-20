<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- 헤더 -->
            <HeaderCom />
        </v-row>
        <v-row v-show="!isLoginPage && !isSignUpPage && !isFindidPage && !isFindpwdPage">
          <!-- 사이드바 (로그인, 회원가입 페이지에서는 숨김) -->
            <SidebarCom />
        </v-row>
          <!-- 메인 콘텐츠 -->
           <v-row>
          <v-col cols="10">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderCom from './components/layout/HeaderCom.vue'
import SidebarCom from './components/layout/SidebarCom.vue'
export default {
  name: 'App',
  components: {
    HeaderCom,
    SidebarCom
  },
  computed: {
    isLoginPage(){
      return this.$route.path === '/login';
    },
    isSignUpPage(){
      return this.$route.path === '/signup';
    },
    isFindidPage(){
      return this.$route.path === '/findid';
    },
    isFindpwdPage(){
      return this.$route.path === '/findpwd';
    }
    
  }
}
</script>
