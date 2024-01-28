<template>
  <el-container class="base-container">
    <el-aside width="200px">
      <BaseNav />
    </el-aside>
    <el-main>
      <router-view />
      <div id="sub-app" />
    </el-main>
  </el-container>
</template>

<script>
import BaseNav from './components/BaseNav.vue'
export default {
  name: 'App',
  components: { BaseNav },
  methods: {
    goVue3() {
      window.location.href = 'http://localhost:8001/'
    },
  },
}
</script>

<style>
.base-container {
  height: 100vh;
  width: 100vw;
}

#sub-app {
  border: red 1px solid;
}
</style>
