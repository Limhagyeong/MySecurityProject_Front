<template>
    <v-row>
    <v-col 
     v-for="(post,index) in postList"
     :key="index"
     :post="post"
     cols="4"
    >
    <v-card v-if="postList">
      <v-img :src="post.imgUrl" height="300px"></v-img>
    </v-card>
    <div v-else>
         Post data
    </div>
    </v-col>
    </v-row>
  </template>

<script>
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
    }
  },
 mounted(){
    console.log('Received post prop:', this.posts);
 }
}
</script>