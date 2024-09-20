<template>
    <v-sheet class="pa-2" rounded>
       <v-card class="mx-auto px-6 py-8" max-width="550px" :elevation="12" style="min-width: 300px;">
           <v-card-title>
             <span class="headline">SignUp</span>
           </v-card-title>
           <v-card-text>
             <v-container>
               <form>
               <v-row>
                 <v-col cols="9">
                   <v-text-field ref="name" label="Name*" required v-model="name"/>
                 </v-col>
                 <v-radio-group v-model="gender">
                    <v-radio ref="gender" label="Male*" value="M"/>
                    <v-radio ref="gender" label="FMale*" value="F"/>
                 </v-radio-group>
                 <v-col cols="12">
                   <v-text-field ref="email" label="E-mail*" required v-model="email"
                    :rules="emailRules"
                   />
                 </v-col>
                 <v-col cols="9">
                   <v-text-field ref="username" label="ID*" required v-model="username"
                    :rules="IDRules"/>
                   
                 </v-col>
                 
                 <v-col cols="3">
                    <v-btn color="blue darken-1" size="55" style="width: 100%; font-weight: bold;" @click="validatinonOfID">중복확인</v-btn>
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
                    :rules="phoneRules"/>
                 </v-col>
                 <v-col cols="12">
                   <v-select
                     :items="['0-19', '20-29', '30-55', '55+']"
                     label="Age"
                   />
                 </v-col>
               </v-row>
              </form>
             </v-container>
             <small>*필수 입력값 (indicates required field)</small>
           </v-card-text>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn color="blue darken-1" flat @click="$router.push('/login')">Close</v-btn>
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
            checkID: false,
            // validation (조건식이 true가 아니면 문구 반환)
            IDRules: [
                v => !!v || 'ID를 입력해주세요.', // 이메일 미입력 시 (!v => v가 false면 true를 반환함 // !!v => v가 true면 true)
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
               console.log(res)
               if(res.status===200){
                alert("사용 가능한 아이디입니다.")
                this.checkID=true
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
        // 아이디 중복 검증 미수행 시
        if(this.checkID==false){
          console.log(this.checkID)
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