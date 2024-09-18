<template>
  <v-app-bar app dense>
    
      <v-toolbar-title @click="$router.push('/')">Title</v-toolbar-title>
      
      <!-- 검색 필드 -->
      <v-spacer></v-spacer>
      <v-text-field
        v-show="!isLoginPage && !isSignUpPage"
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

      </v-text-field>  

      <v-spacer></v-spacer>
      <v-btn icon v-show="false">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="$router.push('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

    </v-app-bar>

  
</template>

<script>
export default{
  data(){
    return{
      keyword: ''
    }
  },
  computed: {
    isLoginPage(){
      return this.$route.path === '/login';
    },
    isSignUpPage(){
      return this.$route.path === '/signup';
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