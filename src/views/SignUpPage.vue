<template>
  <v-sheet class="pa-2" rounded>
     <v-card class="mx-auto px-6 py-8" max-width="550px" :elevation="12" style="min-width: 300px;">
      <v-text icon @click="loading ? null : $router.go(-1)" class="ma-6">
          <v-icon>mdi-arrow-left</v-icon>
      </v-text>   
      <v-card-title style="text-align:center;">
           <span class="headline">SignUp</span>
         </v-card-title>
         <v-card-text>
           <v-container :class="{disabled: loading === true}"> <!-- 인증 메일 발송 대기중일 때 다른 동작을 방지함 -->
             <form>
             <v-row>
               <v-col cols="9">
                 <v-text-field ref="name" label="Name*" required v-model="name"/>
               </v-col>
               <v-radio-group v-model="gender">
                  <v-radio ref="gender" label="Male*" value="M"/>
                  <v-radio ref="gender" label="FMale*" value="F"/>
               </v-radio-group>

               <v-col cols="12" :class="{disabled: mailCheck === true}"> <!-- 메일 인증 완료 후 수정 방지 -->
               <v-row>
               <v-col cols="9">
                 <v-text-field ref="email" label="E-mail*" required v-model="email"
                  :rules="emailRules"
                 />
               </v-col>
               <v-col cols="3">
                  <v-btn color="blue darken-1" size="55" style="width: 100%; font-weight: bold;" @click="sendMailAuth">메일인증</v-btn>
               </v-col>
              </v-row>
              </v-col>

               <v-col cols="12" v-if="loading">
                
                <div class="mr-2" style="margin: auto;">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
               </div>

               </v-col>

               <v-col cols="12" v-if="mailSend" :class="{disabled: mailCheck === true}"> <!-- 메일 발송 후 입력칸 show && 인증 완료 후 수정 방지 -->
               <v-row>
               <v-col cols="9">
                 <v-text-field ref="code" label="code*" required v-model="code"/>
               </v-col>

               <v-col cols="3">
                  <v-btn color="blue darken-1" size="55" style="width: 100%; font-weight: bold;" @click="sendCode">인증확인</v-btn>
               </v-col>
              </v-row>
              </v-col>
               

              <v-col cols="12" :class="{disabled: idCheck === true}">
              <v-row >
              
               <v-col cols="9">
                 <v-text-field ref="username" label="ID*" required v-model="username"
                  :rules="IDRules"/>
               </v-col>
               
               <v-col cols="3">
                  <v-btn color="blue darken-1" size="55" style="width: 100%; font-weight: bold;" @click="validatinonOfID">중복확인</v-btn>
               </v-col>
              </v-row>
              </v-col>

               <v-col cols="12">
                 <v-text-field ref="password" label="Password*" type="password" required v-model="password"
                  :rules="pwdRules"
                 />
               </v-col>
               <v-col cols="12">
                 <v-text-field ref="bday" label="Birth* (YYYY-MM-DD)" required v-model="bday"
                  :rules="dateRules"/>
               </v-col>
               <v-col cols="12">
                 <v-text-field ref="phone" label="phone*" required v-model="phone"
                  :rules="phoneRules"
                  @keyup.enter="submitSignUp"/>
               </v-col>
             </v-row>
            </form>
           </v-container>
           <small>*필수 입력값 (indicates required field)</small>
         </v-card-text>
         <v-card-actions :class="{disabled: loading === true}">
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1" flat @click="$router.push('/login')">login</v-btn>
           <v-btn color="blue darken-1" flat @click="submitSignUp">Save</v-btn>
         </v-card-actions>
       </v-card>
     </v-sheet>
 </template>
 
 <script>
 import axios from 'axios';

 export default{
    data(){
      return{

          name: '', // 실명
          username: '', // 아이디
          password: '', // 비밀번호
          gender: '',
          bday: '',
          phone: '',
          email: '',
          idCheck: false, // 아이디 중복검증 여부
          code: '', // 이메일 인증 코드
          mailSend:false, // 이메일 인증 메일 발송 여부
          mailCheck: false, // 이메일 인증 완료 여부,
          loading: false,

          // validation (조건식이 true가 아니면 문구 반환)
          IDRules: [
              v => !!v || 'ID를 입력해주세요.', // 아이디 미입력 시 (!v => v가 false면 true를 반환함 // !!v => v가 true면 true)
              v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', // 공백만 입력 혹은 포함 시
              v => /^[a-zA-Z0-9]*$/.test(v) || '영어와 숫자만 허용됩니다.'
          ],

          emailRules: [
              v => !!v || '이메일을 입력해주세요.', // 이메일 미입력 시 (!v => v가 false면 true를 반환함 // !!v => v가 true면 true)
              v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', // 공백만 입력 혹은 포함 시
              v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.', //@와 . 이 포함되지 않았을 시
          ],

          pwdRules: [
              v => !!v || '비밀번호를 입력해주세요', // 비밀번호 미입력 시
              v => v.trim().length > 0 && !/\s/.test(v) || '공백을 사용할 수 없습니다.', // 공백만 입력 혹은 포함 시
              v => (v && v.length >= 8) || '비밀번호는 최소 8자 이상이어야 합니다.', // 최소 8자
              v => (v && v.length <= 20) || '비밀번호는 최대 20자까지 입력할 수 있습니다.', // 최대 20자
              v => /[a-zA-Z]/.test(v) || '비밀번호에는 하나 이상의 문자(알파벳)가 포함되어야 합니다.', // 문자 포함
              v => /\d/.test(v) || '비밀번호에는 하나 이상의 숫자가 포함되어야 합니다.', // 숫자 포함
              v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || '비밀번호에는 하나 이상의 특수문자가 포함되어야 합니다.', // 특수문자 포함
          ],

          phoneRules: [
              v => /^[a-zA-Z0-9]*$/.test(v) || '특수문자를 포함할 수 없습니다.',
              v => (v && v.length == 11) || '휴대전화번호 11자리를 입력하세요.',
          ],

          dateRules: [
             v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'YYYY-MM-DD 형식으로 입력해주세요.',
          ]
      }
    },

    methods: {

      // 아이디 중복 검증
      async validatinonOfID(){
           try{

             const res= await axios.post('/api/members/idValidate', {username : this.username})
             if(res.status===200){
              alert("사용 가능한 아이디입니다.")
              this.idCheck=true
             }
             
           }catch(error){
              alert(error.response.data.message) // 서버에서 검증 거침
           }
      },

      // 이메일 인증 메일 발송
      async sendMailAuth(){
        this.loading = true // 로딩 중
        try{
          const res=await axios.post('/api/members/sendMailAuth', {email:this.email})
          if(res.status===200){
            alert("인증번호가 발송되었습니다.")
            this.mailSend=true // 인증코드 입력란  show
          }
        }catch(error){
          alert(error.response.data.message) 
          this.$refs.email.focus();
        }finally{
          this.loading = false // 로딩 종료
        }
      },

      // 이메일 인증 코드 확인
      async sendCode(){

        try{
          const res=await axios.post('/api/members/mailAuthVal', {email:this.email,code:this.code})
          if(res.status===200){
            alert("이메일 인증이 완료되었습니다.")
            this.mailCheck=true
          }
        }catch(error){
          alert(error.response.data.message) // 서버에서 검증 거침
        }
      },

      // 회원 가입
      async submitSignUp() {

      // 필수값 미입력 시
      if(!this.name){
          this.$refs.name.focus();
          return
      }
      if(!this.gender){
          alert("성별을 선택해주세요.")
          return
      }
      if(!this.username){
          this.$refs.username.focus();
          return
      }
      if(!this.password){
          this.$refs.password.focus();
          return
      }
      if(!this.bday){
          this.$refs.bday.focus();
          return
      }
      if(!this.phone){
          this.$refs.phone.focus();
          return
      }
      if(!this.email){
        this.$refs.email.focus();
        return
      }

      // 아이디 중복 검증 미수행 시
      if(this.idCheck==false){
        alert("아이디 중복확인이 필요합니다.");
        return
      }
      
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("gender", this.gender);
      formData.append("bday", this.bday);
      formData.append("phone", this.phone);
      formData.append("email", this.email);

      try {
        const res = await axios.post('/api/members', formData);
        if (res.status === 200) {
          alert("회원가입 성공");
          this.$router.push('/login');
        } 
      } catch (error) {
        alert(error.response.data.message) // 서버에서 검증 거침
    }
  }
}
}
 </script>
 
<style>
.disabled{
  pointer-events: none;
  opacity: 0.6;
}

</style>