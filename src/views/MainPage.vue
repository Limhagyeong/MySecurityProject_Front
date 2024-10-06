    <template>
 <div>
    <h1>Main</h1>
    <p>User ID: {{ sessionId }}</p>
    <p>User Role: {{ sessionRole }}</p>
  </div>
    </template>

    <script>
export default{
computed: {
  sessionId() {
    return this.$store.state.id;
  },
  sessionRole() {
    return this.$store.state.role;
  }
}
}
    </script>