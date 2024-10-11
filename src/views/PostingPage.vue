<template>
  <v-container>
    <v-row justify="center">
      <v-col class="d-flex align-center" cols="auto">
        <!-- 이미지 -->
        <div class="avatar-container"  style="margin-right: 100px;">
          <v-img 
            :src="require('@/assets/default_profile.png')" 
            class="rounded-avatar"
            @click="selectImage"
          />
        </div>
        <v-col>
          <v-row  style="width: 380px;" justify="start">
            <span class="mr-4" style="font-weight: bold; font-size: 23px;">{{ this.$store.state.id }}</span>
            <v-btn class="mr-2" @click="openPostDialog">게시물 올리기</v-btn>
            <v-btn @click="selectImage">프로필 편집</v-btn>
          </v-row>
          <!-- 다이얼로그 오픈 -->
          <post-insert-dialog ref="PostInsertDialog" v-model:show="dialog"  :show="hidden"/>
          <!-- 파일 입력 -->
          <v-file-input 
            ref="imageFile" 
            v-model="imgFile"
            accept="image/png, image/jpg" 
            style="display: none;"
            @change="handleImageChange"
          />
          <v-row style="width: 380px; margin:20px 0px 0px -10px;" justify="start">
            <span class="mr-4">게시물 0</span>
            <span class="mr-4">팔로워 0</span>
            <span class="mr-4">팔로잉 0</span>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <!-- 포스팅 출력 -->
    <v-row>
      <v-divider style="margin-top: 20px; width: 1000px;"></v-divider>
    </v-row>


    
   
  </v-container>
</template>

<script>
import api from '@/api';
import PostInsertDialog from './PostInsertDialog.vue';
export default {
  data() {
    return {
      imgFile: '',
      content: '',
      id: '',
      dialog: false
    };
  },
  components: {
    PostInsertDialog,
  },
  methods: {
    openPostDialog() {
      this.$refs.PostInsertDialog.dialog = true; // 다이얼로그 오픈
    },
    selectImage() {
      this.$refs.imageFile.click();
    },
    async upload() {
      try {
        console.log(this.imgFile);
        const formData = new FormData();
        formData.append('p_img', this.imgFile);
        formData.append('p_content', this.content);
        formData.append('username', this.$store.state.id);

        const res = await api.post('/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.status === 200) {
          alert('파일이 업로드 되었습니다');
          this.imgFile = '';
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imgFile = file;
      }
    },
    actionOne() {
      alert('프로필 편집 클릭됨');
    },
    actionTwo() {
      alert('설정 클릭됨');
    },
  },
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  overflow: hidden; /* 이미지가 원형으로 보이도록 설정 */
  border-radius: 50%; /* 부모 요소에 border-radius 추가 */
  width: 150px; /* 너비 설정 */
  height: 150px; /* 높이 설정 */
}

.rounded-avatar {
  border-radius: 50%; /* 이미지에 border-radius 추가 */
  width: 100%; /* 너비를 부모 요소에 맞춤 */
  height: 100%; /* 높이를 부모 요소에 맞춤 */
}
</style>