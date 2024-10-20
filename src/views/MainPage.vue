<template>
  <v-container style="width: 1000px; margin: auto">
    <v-row justify="center" align="center">
      <v-col
        v-for="(post, index) in postList"
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
          <v-img
            v-if="post.imgUrls && post.imgUrls.length > 0"
            :src="post.imgUrls[0]"
            height="300px"
            cover
          />
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
import api from '@/api';
import PostDetailDialog from './post/Dialog/PostDetailDialog.vue';
export default {
  computed: {
    sessionId() {
      return this.$store.state.id;
    },
    sessionRole() {
      return this.$store.state.role;
    },
  },
  components: {
    PostDetailDialog,
  },
  data() {
    return {
      postList: [],
      selectedPost: '',
    };
  },
  mounted() {
    this.checkSession();
    this.allPost();
  },
  methods: {
    async checkSession() {
      try {
        const res = await api.get('/members');
        this.$store.dispatch('login', {
          id: res.data.data.id,
          role: res.data.data.role,
        });
      } catch (error) {
        console.error('세션 확인 실패:', error);
      }
    },
    async allPost() {
      console.log('실행');
      try {
        const res = await api.get('/post/allpost');
        if (res.status === 200) {
          console.log('res:', res);
          this.postList = res.data.data;
          console.log('this.postList:', this.postList);
        }
      } catch (error) {
        console.error('실패:', error);
      }
    },
    openDetailDialog(post) {
      this.selectedPost = post;
      console.log(post);
      this.$refs.detailDialog.detailDialog = true;
    },
  },
};
</script>
