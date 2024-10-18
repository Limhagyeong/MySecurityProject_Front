    <template>
 <div>
    <h1>Main</h1>
    <p>User ID: {{ sessionId }}</p>
    <p>User Role: {{ sessionRole }}</p>
  </div>
    </template>

    <script>
    import api from '@/api';
    export default{
    computed: {
      sessionId() {
        return this.$store.state.id;
      },
      sessionRole() {
        return this.$store.state.role;
      }
    },
    mounted(){
      this.checkSession();
    },
    methods:{
      async checkSession() {
      try {
        const res = await api.get("/members");
        this.$store.dispatch('login',
        {
          id: res.data.data.id, 
          role: res.data.data.role
        })
      } catch (error) {
        console.error("세션 확인 실패:", error);
      }
    },
    }
    }
    </script>