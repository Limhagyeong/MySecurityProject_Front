<template>
  <v-container style="width: 1000px; margin: auto;" >
  <v-row justify="center" align="center">
  <v-col
   v-for="(post,index) in postList"
   :key="index"
   :post="post"
   cols="4"
   style="margin: 0px -10px -15px -10px;"
  >
  <v-card class="mx-auto" v-if="postList" @click="openDetailDialog(post)" style="border-radius: 0;"> 
    <v-img 
      :src="post.imgUrl" 
      height="300px"
      cover
    />
  </v-card>
  <div v-else>
       Post data
  </div>
  </v-col>
</v-row>
</v-container>

  <!-- 게시물 상세 다이얼로그 오픈 -->
    <post-detail-dialog
       ref="detailDialog"
       v-model="detailDialog"
      :show="hidden" 
      :selectedPost="selectedPost"
    />


</template>



<script>
import PostDetailDialog from './Dialog/PostDetailDialog.vue';
export default {
props: {
  postList: {
      type: Array,
      required: true
  }
},
data(){
  return{
      post:'',
      selectedPost: '',
      detailDialog: false
  }
},
components:{
  PostDetailDialog
},
methods:{
  // 게시물 상세 다이얼로그 오픈
  openDetailDialog(post){
    this.selectedPost=post;
    console.log(post)
    this.$refs.detailDialog.detailDialog=true;
  }
}

}
</script>
