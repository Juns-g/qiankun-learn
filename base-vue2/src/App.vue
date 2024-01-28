<template>
  <el-container class="base-container">
    <el-aside width="200px">
      <BaseNav />
    </el-aside>
    <el-main>
      <router-view />
      <div
        id="sub-app"
        v-if="isMicro"
      />
    </el-main>
  </el-container>
</template>

<script>
import BaseNav from './components/BaseNav.vue'
import { activeRules } from './qiankun.js'
export default {
  name: 'App',
  components: { BaseNav },
  methods: {},
  computed: {
    isMicro() {
      const { path } = this.$route
      return activeRules.some(rule => path.startsWith(rule))
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
