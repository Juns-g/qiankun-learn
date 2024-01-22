<script setup>
function handleClick() {
  window.location.href = 'http://localhost:5173/sub-vue'
}
</script>

<template>
  <div class="container">
    <div class="base">
      <div>主应用</div>
      <div>
        <button @click="handleClick">sub-react</button>
      </div>
    </div>
    <!-- 子应用 -->
    <div id="sub-app">子应用的div</div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
