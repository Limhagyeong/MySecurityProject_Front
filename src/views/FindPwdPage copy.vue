<template>
    <v-sheet class="pa-2" rounded style="margin-top: 100px;">
        <v-card class="mx-auto px-6 py-8" max-width="500px" :elevation="12" style="min-width: 300px;">
            <v-text icon  @click="loading ? null : $router.go(-1)" class="ma-6">
            <v-icon>mdi-arrow-left</v-icon>
            </v-text>
            <v-card-title style="text-align: center;">
             <span class="headline">Find PWD</span>
           </v-card-title>
        <v-card-text>
          <v-container>
            <form>
                <v-text-field label="이름" required v-model="name" ref="name" :disabled="loading"
                 :rules="nameRules"
                ></v-text-field>
                <v-text-field label="아이디" required v-model="id" ref="ID" :disabled="loading"
                 :rules="IDRules"
                ></v-text-field>
                <v-text-field label="가입 시 입력한 이메일" required v-model="email" ref="email" :disabled="loading"
                 :rules="emailRules"
                 @keyup.enter="findPwd"
                ></v-text-field>
            </form>
          </v-container>
        </v-card-text>
        <v-card-actions class="findInfo d-flex justify-center" style="padding-top: 20px;">
            <div v-if="loading" class="mr-2">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
        <v-btn color="grey darken-1" style="font-weight: bold;" @click="findPwd" :disabled="loading">메일 발송</v-btn>
        <span>|</span>
        <v-btn color="grey darken-1" style="font-weight: bold;" @click="$router.push('/findid')" :disabled="loading">아이디 찾기</v-btn>
        <span>|</span>
        <v-btn color="grey darken-1" style="font-weight: bold;" @click="$router.push('/signup')" :disabled="loading">회원가입</v-btn>
        </v-card-actions>
        
      </v-card>
    </v-sheet>
  </template>
  
  <script>
    import axios from 'axios';

    export default {
        data(){
            return{
                name: '',
                email: '',
                id: '',
                loading: false,

                nameRules: [
                v => !!v || '이름을 입력해주세요.', 
                v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', 
                v => /^[^0-9]*$/.test(v) || '숫자는 입력할 수 없습니다.'
                ],

                emailRules: [
                v => !!v || '이메일을 입력해주세요.', 
                v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', 
                v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.', 
                ],

                IDRules: [
                v => !!v || 'ID를 입력해주세요.', // 이메일 미입력 시 (!v => v가 false면 true를 반환함 // !!v => v가 true면 true)
                v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', // 공백만 입력 혹은 포함 시
                v => /^[a-zA-Z0-9]*$/.test(v) || '영어와 숫자만 허용됩니다.'
                ],

            }
        },
        methods: {
            async findPwd(){

                if(!this.name){
                 this.$refs.name.focus();
                 return
                }

                if(!this.email){
                    this.$refs.email.focus();
                    return
                }

                this.loading = true;    

                try{
                    const res=await axios.post("/api/members/findUserInfo", {name : this.name , email : this.email,   requestType: "findPwd"});
                    console.log(res)
                    if(res.status===200){
                        alert("임시 비밀번호가 메일로 발송되었습니다.");
                        this.$router.push('/login');
                    }

                }catch(error){
                    alert(error.response.data.message) // 서버에서 검증 거침
                }finally{
                    this.loading = false;
                }
            }
        }
    }
  </script>
