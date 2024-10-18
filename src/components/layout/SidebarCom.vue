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
      <v-list-item 
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      rail: false,
      isActive : false,
      items:[
        {title:'Home', icon: 'mdi-home-city', to:"/home"},
        {title:'Posting', icon: 'mdi-account', to:"/posting"},
      ]
    }
  },
}
</script>