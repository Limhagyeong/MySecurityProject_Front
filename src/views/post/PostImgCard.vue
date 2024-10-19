<template>
  <v-container style="width: 1000px; margin: auto">
    <v-row justify="center" align="center">
      <v-col
        v-for="(post, index) in groupedPostList"
        :key="index"
        :post="post"
        cols="4"
        style="margin: 0px -10px -15px -10px"
      >
        <v-card
          class="mx-auto"
          v-if="postList"
          @click="openDetailDialog(post)"
          style="border-radius: 0"
        >
          <v-img :src="post[0].imgUrl" height="300px" cover />
        </v-card>
        <div v-else>Post data</div>
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
      required: true,
    },
  },
  data() {
    return {
      post: '',
      selectedPost: '',
      detailDialog: false,
    };
  },
  components: {
    PostDetailDialog,
  },
  computed: {
    groupedPostList() {
      const postgroup = this.postList.reduce((acc, post) => {
        const pnum = post.pnum;
        if (!acc[pnum]) {
          acc[pnum] = [];
        }
        acc[pnum].push(post);
        return acc;
      }, {});

      // 배열 정렬
      const sortedGroups = Object.values(postgroup).sort((a, b) => {
        return b[0].pnum - a[0].pnum; // pnum이 높은 순서로 정렬
      });

      return sortedGroups;
    },
  },
  methods: {
    // 게시물 상세 다이얼로그 오픈
    openDetailDialog(post) {
      this.selectedPost = post;
      console.log(post);
      this.$refs.detailDialog.detailDialog = true;
    },
  },
};
</script>
