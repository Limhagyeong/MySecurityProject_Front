<template>
  <v-container>
    <v-row justify="center">
      <v-col class="d-flex align-center" cols="auto">

        <!-- 프로필 이미지 -->
        <div class="avatar-container"  style="margin-right: 100px;">
          <v-img 
            :src="require('@/assets/default_profile.png')" 
            class="rounded-avatar"
          />
        </div>
        <v-col>
          <v-row  style="width: 380px;" justify="start">
            <span class="mr-4" style="font-weight: bold; font-size: 23px;">{{ this.$store.state.id }}</span>
            <v-btn class="mr-2" @click="openPostDialog">게시물 올리기</v-btn>
            <v-btn>프로필 편집</v-btn>
          </v-row>

          <!-- 게시물 작성 다이얼로그 오픈 -->
           <!--uploadPost 속성을 자식에게 넘기고  
               자식에서 @update:uploadPost="uploadOK"를 통해 부모에게 업로드 알림 -->
          <post-insert-dialog ref="InsertDialog" 
                              v-model:show="dialog" 
                              :show="hidden" 
                              :uploadPost="uploadPost"
                              @update:uploadPost="uploadOK"
                              />
          
          <v-row style="width: 380px; margin:20px 0px 0px -10px;" justify="start">
            <span class="mr-4">게시물 {{ postCount }}</span>
            <span class="mr-4">팔로워 0</span>
            <span class="mr-4">팔로잉 0</span>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <!-- 게시물 목록 출력 -->
    <v-row>
      <v-divider style="margin-top: 20px; width: 1000px;"></v-divider>
      <!-- 목록 로딩 중 -->
        <v-row v-if="isLoading" align="center" justify="center" style="margin-top: 200px;">
          <v-progress-circular
            color="grey-lighten-5"
            indeterminate
          />
        </v-row>
    </v-row>
    <!-- 목록 받기 완료 (로딩종료) -->
    <v-row style="margin-top: 40px;">
    <template v-if="!isLoading&&postList.length>0">
        <PostImgCard :postList="postList" />
    </template>
    </v-row>
    <!-- 게시물 없는 사용자 -->
    <v-row>
    <div v-if="!isLoading&&postList.length===0">
      당신의 경험을 공유해보세요
    </div>
    </v-row> 

  </v-container>
</template>

<script>
import PostInsertDialog from './Dialog/PostInsertDialog.vue';
import api from '@/api';
import PostImgCard from './PostImgCard.vue'

export default {
  data() {
    return {
      username: '',
      dialog: false,
      postList:[],
      postCount:'',
      isLoading: true, // 목록 받기 전
      uploadPost: false, // 게시물 업로드 감지
    };
  },
  components: {
    PostInsertDialog,
    PostImgCard
  },
  mounted(){
    // 게시물 출력
       this.selectPost()
  },
  methods: {
    // 게시물 가져오기 및 출력
    async selectPost(){
      try{
        this.username=this.$store.state.id;   
        const res=await api.get(`/post/${this.username}`)
        if(res.status === 200){
          console.log(res.data)
          this.postList=res.data.data // 게시물 담음
          this.postCount = this.postList.length // 게시물 개수
        }
      }catch(error){
        alert(error.response.data.message);
      }finally{
        this.isLoading=false // api 요청 완료 후 로딩 해제
      }
    },
    // 게시물 업로드 다이얼로그 오픈
    openPostDialog() {
      this.$refs.InsertDialog.dialog=true; 
    },
    // 자식에서 보낸 업로드 감지
    uploadOK(OK){
      this.uploadPost=OK
    },
  },
  // uploadPost 속성이 변할때 마다 감지해서 게시물 목록 리랜더링
  watch:{
    uploadPost(OK){
      if(OK){ 
        this.selectPost()
        this.uploadPost=false
      }
    }
  }
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  overflow: hidden; 
  border-radius: 50%;
  width: 150px; 
  height: 150px;
}

.rounded-avatar {
  border-radius: 50%; 
  width: 100%; 
  height: 100%;
}
</style>