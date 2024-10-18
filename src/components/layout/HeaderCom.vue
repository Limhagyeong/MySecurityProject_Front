<template>
  <v-app-bar app dense>
    
      <v-toolbar-title @click="$router.push('/')">Title</v-toolbar-title>
      
      <!-- 검색 필드 -->
      <v-spacer></v-spacer>
      <!-- <v-text-field
        v-show="!isLoginPage && !isSignUpPage && !isFindidPage && !isFindpwdPage"
        v-model="keyword"
        placeholder="Search Keyword"
        class="search-field"
        dense
        solo
      >
      <v-btn style="align-items: center;">
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>

      </v-text-field>   -->

      <v-spacer></v-spacer>
      <v-btn icon v-show="false">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      
      <v-btn icon @click="sessionRole==='ROLE_USER' || sessionRole==='ROLE_ADMIN' ? logout() : $router.push('/')">
        <v-icon v-if="(sessionRole!=='ROLE_USER') && (sessionRole!=='ROLE_ADMIN')">mdi-login</v-icon>
        <v-icon v-else>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

  
</template>

<script>
import api from '../../api';

export default{
  data(){
    return{
      keyword: ''
    }
  },
  computed: {
    isLoginPage(){
      return this.$route.path === '/';
    },
    isSignUpPage(){
      return this.$route.path === '/signup';
    },
    isFindidPage(){
      return this.$route.path === '/findid';
    },
    isFindpwdPage(){
      return this.$route.path === '/findpwd';
    },
    sessionId(){
      return this.$store.state.id;
    },
    sessionRole(){
      return this.$store.state.role;
    }
    
  },
  methods:{
    async logout(){
      try{
        const res=await api.post('/logout') // 로그아웃 요청
        if(res.status===200){
          this.$store.dispatch('logout') // sessionID, ROLE 초기화
           this.$router.push('/') // 로그인 페이지로 이동
        }
        
      }catch(error){
        console.log("로그아웃 실패"+error.response.data.message)
      }
    }
  }
}
</script>
<style>
.search-field{
  width: 50%;
  height: 85%;
  margin-bottom: 10px;
}
.v-field__input{
  border-radius: 100px;
}
</style>