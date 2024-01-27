<template>
  <div id="app">
    <div class="links">
      <router-link to="/page1">Go to base vue2 Page1</router-link>
      <router-link to="/page2">Go to base vue2 Page2</router-link>
      <router-link to="/">Go to base vue2 HelloWorld</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
</style>
