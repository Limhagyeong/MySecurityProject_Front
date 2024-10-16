<template>
    <v-container>
      <v-dialog
        v-model="dialog"
        max-width="850"
        persistent
      >
  
        <v-card
          prepend-icon="mdi-account"
          title="Upload Post"
          style="height: 100%;"
        >
          <v-card-text style="display: flex; height: 100%;" no-gutters>
            <v-col cols="12" md="6" sm="6" style="cursor: pointer;" >
              <div class="imgBox">
              <v-img 
               class="selectedImg"
               :src="defaultImg"
               @click="selectImage"
               /> 
              </div>
            </v-col> 
            <v-col cols="12" md="6" sm="6"> 
              <v-textarea 
              class="hg_textarea"
              v-model="content"
              label="사진에 담긴 경험을 공유해주세요!"
              hide-details
              >
              </v-textarea> 
            </v-col>
          </v-card-text>

          <!-- 파일 입력 -->
          <v-file-input 
            ref="imageFile" 
            v-model="imgFile"
            accept=".png, .jpg" 
            style="display: none;"
            @change="imgChange"
          />
  
          <v-divider></v-divider>

          <v-card-actions> 
  
            <v-btn
              text="Close"
              variant="plain"
              @click="dialogClose"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              @click="upload"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

<script>
import api from '@/api';

export default {
  props: {
    // 업로드 감지 속성
    uploadPost:{
      type:Boolean
    }
  },
  data: () => ({
    dialog: false,
    defaultImg: require('@/assets/image.png'),
    content: '',
  }),
  methods:{
    // 이미지 선택창 오픈
    selectImage() {
      this.$refs.imageFile.click();
    },
    // 선택된 이미지 미리보기
    imgChange(event) {
      const file = event.target.files[0];
      if(file){
        this.defaultImg=URL.createObjectURL(file);
        this.$store.dispatch('saveImgFile', file); // store에 최초 업로드 이미지 파일 저장
      }
    },
    // 게시물 insert
    async upload() {
      try {
        const formData = new FormData();
        formData.append('img', this.imgFile);
        formData.append('content', this.content);
        formData.append('username', this.$store.state.id);

        const res = await api.post('/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.status === 200) {
          alert('게시물이 업로드되었습니다');
          this.$emit('update:uploadPost', true); // 부모에게 업로드 알림
          this.dialog=false;
          this.defaultImg=require('@/assets/image.png')
          this.content=''
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    // 다이얼로그 close
    dialogClose(){
      this.dialog=false
      this.defaultImg=require('@/assets/image.png')
      this.content=''
    }
  }
}
</script>
<style>
.imgBox{
    width:380px;
    height:390px;
    overflow:hidden;
    display: flex; 
    align-items: center;
    justify-content: center;
}
.selectedImg{
    width:100%;
    height:100%;
    object-fit:cover;
}
.hg_textarea .v-input__control{
  height: 390px !important;
  border-radius: 0 !important;
  resize: none !important;
}
</style>
