<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="container app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNav from './components/appNav.vue'

export default {
  name: 'app',
  components: { AppNav },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
html {
  position: relative;
  min-height: 100%;
}
.app-content {
  height: 100%;
}
#app {
  position: relative;
  height: 100vh;
  overflow: auto;
}
</style>
