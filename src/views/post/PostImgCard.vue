<template>
    <v-row>
    <v-col 
     v-for="(post,index) in postList"
     :key="index"
     :post="post"
     cols="4"
    >
    <v-card v-if="postList" @click="openDetailDialog(post)">
      <v-img 
        :src="post.imgUrl" 
        height="300px"
      />
    </v-card>
    <div v-else>
         Post data
    </div>
    </v-col>
    </v-row>

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
        detailDialog: false,
    }
  },
  components:{
    PostDetailDialog
  },
  mounted(){
    console.log('Received post prop:', this.posts);
  },
  methods:{
    // 게시물 상세 다이얼로그 오픈
    openDetailDialog(post){
      console.log("클릭")
      this.selectedPost=post;
      this.$refs.detailDialog.detailDialog=true;
    }
  }

}
</script>