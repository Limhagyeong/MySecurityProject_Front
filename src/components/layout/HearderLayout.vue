<template>
  <v-card>
    <v-toolbar dense>

      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title @click="$router.push('/')">Title</v-toolbar-title>

      <v-spacer>
      </v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon v-show="false">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="$router.push('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>


    </v-toolbar>
    
  </v-card>

  
</template>

<script>

</script>