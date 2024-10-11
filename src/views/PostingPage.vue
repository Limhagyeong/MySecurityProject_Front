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
  },
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