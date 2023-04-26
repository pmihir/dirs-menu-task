<template>
<!-- Fixed navbar -->
<md-toolbar class="md-primary">
      <img src="../assets/Logo.png" @click="navigateToDashboard()" alt="Logo" width="100px" height="50px"/>
    </md-toolbar>
</template>

<script>
import router from '../router/index';
export default {
  data () {
    return {}
  },
  methods: {
    navigateToDashboard() {
      router.replace('/');
    }
  }
}
</script>
