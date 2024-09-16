<template>
  <div id="app">
   <HeaderLayout />
   <div id="content" class="content">
    <router-view></router-view>
   </div>
  </div>
</template>

<script>
import HeaderLayout from './components/layout/HearderLayout.vue'

export default {
  name: 'App',
  components: {
    HeaderLayout
  }
}
</script>

<style>

</style>