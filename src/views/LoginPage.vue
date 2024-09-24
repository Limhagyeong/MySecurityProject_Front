<template>
    <v-sheet class="pa-2" rounded style="margin-top: 100px;">
        <v-card class="mx-auto px-6 py-8" max-width="500px" :elevation="12" style="min-width: 300px;">
            <v-text icon @click="$router.push('/')" class="ma-6">
            <v-icon>mdi-arrow-left</v-icon>
            </v-text>
            <v-card-title style="text-align: center;">
             <span class="headline">Login</span>
           </v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="PostLogin">
                <v-text-field width="400px" label="ID" required v-model="username" ref="usernameRef" 
                @blur="usernameVal" :error-messages="usernameError">
                <template v-slot:append>
                    <span style="width: 38px; display: inline-block;"></span> <!-- 공백 추가 -->
                </template>
                </v-text-field>
                <v-text-field :type="showPassword?'text':'password'" label="Password"  required v-model="password" ref="passwordRef" :rules="pwdRules" 
                @blur="passwordVal"
                :error-messages="passwordError"
                :append-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append="passwordVisibility"
                @keyup.enter="PostLogin"
                ></v-text-field>
            </form>
          </v-container>
        </v-card-text>
        <v-card-actions class="findInfo d-flex justify-center">
        <v-btn class="findInfoBtn" color="grey darken-1" style="font-weight: bold;" @click="ToFindId">아이디 찾기</v-btn>
        <span >|</span>
        <v-btn color="grey darken-1" style="font-weight: bold;" @click="$router.push('/findpwd')">비밀번호 찾기</v-btn>
        </v-card-actions>
        <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="PostLogin">Login</v-btn>
          <v-btn color="blue darken-1" flat @click="ToSignUp">SignUp</v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
    import axios from 'axios';

    export default {
    data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      id: '',
      role: '',
      usernameError: '', // ID 입력 여부 검사
      passwordError: '', // password 입력 여부 검사
    };
  },
  methods: {
    // ID 입력 여부 검사
    usernameVal(){
        if(!this.username){
            this.usernameError='아이디를 입력해주세요.'
        }else{
            this.usernameError=''
        }
    },
    // 비밀번호 입력 여부 검사
    passwordVal(){
        if(!this.password){
            this.passwordError='비밀번호를 입력해주세요.'
        }else{
            this.passwordError=''
        }
    },
    passwordVisibility() {
      this.showPassword = !this.showPassword;
    },
    ToSignUp() {
      this.$router.push("/signup");
    },
    ToFindId() {
      this.$router.push("/findid");
    },
    // 로그인
    async PostLogin() {
      if (!this.username) {
        this.$refs.usernameRef.focus();
        return;
      }

      if (!this.password) {
        this.$refs.passwordRef.focus();
        return;
      }

      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);

      try {
        await axios.post("/api/loginProcess", formData);
        this.checkSession();
        this.$router.push("/");
      } catch (error) {
        alert("로그인 실패");
        console.error("로그인 실패:", error);
      }
    },
    async checkSession() {
      try {
        const res = await axios.get("/api");
        this.id = res.data.id;
        this.role = res.data.role;
      } catch (error) {
        console.error("세션 확인 실패:", error);
      }
    },
  },
};
</script>

<style>
.findInfo{
    margin: -30px 0 10px 0;
}
</style>