<template>
    <v-sheet class="pa-2" rounded style="margin-top: 100px;">
        <v-card class="mx-auto px-6 py-8" max-width="500px" :elevation="12" style="min-width: 300px;">
        <v-card-text>
          <v-container>
            <form>
                <v-text-field label="ID" required v-model="username"></v-text-field>
                <v-text-field type="Password" label="Password"  required v-model="password"></v-text-field>
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
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    export default {
        setup(){
            const username = ref('');
            const password = ref('');

            const id = ref('');
            const role = ref('');

            const router=useRouter();
            
            // 회원가입 이동
            const ToSignUp=()=>{
                router.push('/signup');
            };
            // 아이디 찾기 이동
            const ToFindId=()=>{
                router.push('/findid');
            };
            // 로그인 
            const PostLogin=async()=>{
                console.log(password.value);
                console.log(username.value);
                
                let formData = new FormData();
                formData.append('username', username.value)
                formData.append('password', password.value)
                try{
                    await axios.post('/api/loginProcess',formData)
                    checkSession()
                    router.push('/')
                }catch(error){
                    alert("로그인 실패");
                    console.error('로그인 실패:', error);
                }
                
            };
            // id, role 확인
            const checkSession=async()=>{
                try{
                    const res=await axios.get('/api');
                    id.value=res.data.id;
                    role.value=res.data.role;
                    console.log("ID:", id.value);
                    console.log("Role:", role.value);
                } catch (error) {
                    console.error('세션 확인 실패:', error);
                }
            };

            return{
                ToSignUp,
                ToFindId,
                PostLogin,
                username,
                password,
                checkSession
            }
        },
    }
  </script>

<style>
.findInfo{
    margin: -40px 0 10px 0;
}
</style>
