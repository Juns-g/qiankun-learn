<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content" />
    </el-col>
    <el-col :span="12">
      <div class="grid-content" />
    </el-col>
    <el-col :span="12">
      <div class="grid-content" />
    </el-col>
    <el-col :span="12">
      <h1>About vue3</h1>
    </el-col>
    <el-col :span="24"
      ><el-button>Default</el-button>
      <el-button
        type="primary"
        dark
        >Primary</el-button
      >
      <el-button
        type="success"
        plain
        >Success</el-button
      >
      <el-button
        type="info"
        text
        >Info</el-button
      >
      <el-button
        type="warning"
        round
        >Warning</el-button
      >
      <el-button
        type="danger"
        disabled
        >Danger</el-button
      ></el-col
    >
    <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="12">
      <div>
        <el-button @click="goP">params</el-button>
        <el-button @click="goQ">query</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goP = () => {
  const params = {
    p: 1,
  }
  router.push({ name: 'home', state: { params } })
}
const goQ = () => {
  router.push({ path: '/', query: { q: 1 } })
}
</script>

<style scoped>
.el-row {
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  background-color: #d5dce5;
}
</style>
