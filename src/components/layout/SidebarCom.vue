<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <!-- <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    > -->
      <template v-slot:append>
        <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    <!-- </v-list-item> -->

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" @click="handleClick('')"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="Posting"  value="post"
      @click="handleClick('posting')" 
      :class="{ 'active': isActive }">
      </v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      rail: false,
      isActive : false
    }
  },
  methods: {
    handleClick(value) {
      this.isActive = value; 
      this.$router.push(`/${value}`); // 해당 value에 맞춰 페이지 이동
    },
  },
  beforeRouteLeave(to, from, next) {
    this.isActive=false 
    next(); 
  },
}
</script>