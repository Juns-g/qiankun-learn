<template>
  <el-menu
    router
    class="base-menu"
  >
    <el-menu-item index="/page1">
      <i class="el-icon-tickets" />
      <span slot="title"> vue2 Page1 </span>
    </el-menu-item>
    <el-menu-item index="/page2">
      <i class="el-icon-tickets" />
      <span slot="title"> vue2 Page2 </span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-tickets" />
      <span slot="title">vue2 home</span>
    </el-menu-item>
    <el-menu-item index="/sub-vue3">
      <i class="el-icon-tickets" />
      <span slot="title">/sub-vue3</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'BaseNav',
}
</script>

<style scoped>
.base-menu {
  height: 100%;
}
</style>
