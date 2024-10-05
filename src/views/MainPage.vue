    <template>
 <div>
    <h1>Main</h1>
    <p>User ID: {{ userId }}</p>
    <p>User Role: {{ userRole }}</p>
  </div>
    </template>

    <script>
export default{
    computed: {
  userId() {
    return this.$store.state.id;
  },
  userRole() {
    return this.$store.state.role;
  }
}
}
    </script>