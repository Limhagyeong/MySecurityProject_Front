<template>
    <v-container>
      <!-- 게시물 상세보기 다이얼로그-->
      <v-dialog
        v-model="detailDialog"
        max-width="850"
        persistent
      >
  
        <v-card
          style="height: 100%;"
        >
          <v-card-text style="display: flex; height: 100%;" no-gutters>
            <v-col cols="12" md="6" sm="6" style="cursor: pointer;" >
              <div class="imgBox">
              <v-img 
                :src="selectedPost.imgUrl"
                 height="100%"
               /> 
              </div>
            </v-col> 
            <v-row>
            <v-col cols="12" md="6" sm="6"> 
              <v-row style="margin-top: 10px;">
                <v-col style="font-weight: bold; font-size: 20px;">
                  <v-icon prepend>mdi-account</v-icon> {{ selectedPost.username }}
                  <v-divider style="width: 900px"></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  {{ selectedPost.content }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          </v-card-text>
  
          <v-divider></v-divider>

          <v-card-actions> 
  
            <v-btn v-if="selectedPost.username === sessionID"
              text="Close"
              variant="plain"
              @click="dialogClose"
            ></v-btn>
  
            <v-btn 
              color="primary"
              text="delete"
              variant="tonal"
              @click="deletePost"
            ></v-btn>

            <v-btn 
              color="primary"
              text="update"
              variant="tonal"
              @click="openUpdateDialog"
            ></v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 게시물 수정하기 다이얼로그-->
      <v-dialog
        v-model="updateDialog"
        max-width="850"
        persistent
      >  
  
        <v-card
          prepend-icon="mdi-account"
          title="Update Post"
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
              hide-details
              label="게시물 내용 수정"
              >
              {{ selectedPost.content }}
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
              @click="updatePost"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

  <script>
  import api from '@/api';
  export default{
    props:{
      selectedPost: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        detailDialog: false,
        sessionID: this.$store.state.id,
        updateDialog: false,
        content: '',
        defaultImg: '',
        imgFile:''
      }
    },
    mounted(){
      console.log(this.selectedPost.content)
    },
    methods:{
      dialogClose(){
        this.detailDialog=false;
        this.updateDialog=false;
      },
      async deletePost(){
        try{
          const res=await api.delete(`/post/${this.selectedPost.pnum}`)
          if(res.status === 200){
          alert("게시물이 삭제되었습니다.")
          this.detailDialog=false
          this.$store.dispatch('deleteOK', true); // 게시물 삭제 상태 true로 변경
          }
        }catch(error){
          alert(error.response.data.message);
        }
    },
    openUpdateDialog(){
      this.detailDialog=false;
      this.content=this.selectedPost.content;
      this.defaultImg=this.selectedPost.imgUrl;
      console.log(this.imgFile)
      this.updateDialog=true;
    },
    // 이미지 선택창 오픈
    selectImage() {
      this.$refs.imageFile.click();
    },
    // 선택된 이미지 미리보기
    imgChange(event) {
      const file = event.target.files[0];
      if(file){
        this.defaultImg=URL.createObjectURL(file);
      }
    },
    // 게시물 업데이트
    async updatePost(){
      try{
        const formData = new FormData();

        if(!this.imgFile){
          formData.append('updated', 'N');
        }else{
          formData.append('img', this.imgFile);
          formData.append('updated', 'Y');
        }
        formData.append('pNum',this.selectedPost.pnum)
        formData.append('content', this.content);
        const res=await api.patch(`/post/${this.selectedPost.pnum}`,formData)
        if(res.status === 200){
          alert("게시물 업데이트 성공")
        }
      }catch(error){
        alert(error.response.data.message);
      }
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