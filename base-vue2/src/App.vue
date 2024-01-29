<template>
  <el-container class="base-container">
    <el-aside width="200px">
      <BaseNav />
    </el-aside>
    <el-main>
      <p class="test-scope-p">
        这段文字用来测试样式隔离，类名是: test-scope-p
        <br />
        在vue2里面的样式是: red 18px
        <br />
        vue3: blue 28px
      </p>
      <router-view class="base-view" />
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

#sub-app,
.base-view {
  border: #dcdfe6 1px solid;
  border-radius: 10px;
  padding: 8px;
  height: 97%;
}

.base-view {
  text-align: center;
}

.test-scope-p {
  font-size: 18px;
  color: red;
}
.vue3-p {
  font-size: 18px;
  color: red;
}
</style>
