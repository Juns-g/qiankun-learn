<template>
  <div id="app">
    <div class="links">
      <router-link to="/page1">Go to base vue2 Page1</router-link>
      <router-link to="/page2">Go to base vue2 Page2</router-link>
      <router-link to="/">Go to base vue2 HelloWorld</router-link>
      <router-link to="/sub-vue3">Go to /sub-vue3</router-link>
      <button @click="goVue3">去vue3子应用 独立访问</button>
    </div>
    <router-view />
    <div id="sub-app" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goVue3() {
      window.location.href = 'http://localhost:8001/'
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#sub-app {
  border: red 1px solid;
}
</style>
