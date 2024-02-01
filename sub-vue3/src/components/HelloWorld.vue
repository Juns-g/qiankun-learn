<template>
  <div class="hello">
    <h1>vue3</h1>
    <p class="vue3-p">这是vue3内部的一段话，测试样式隔离</p>
    <p class="test-scope-p">
      这段文字用来测试样式隔离，类名是: test-scope-p
      <br />
      在vue2里面的样式是: red 18px
      <br />
      vue3: blue 28px
    </p>
    <div>
      {{ $route }}
    </div>
    <br />
    <div>
      {{ $router }}
    </div>
    <div>
      {{ historyParams }}
      <router-link to="/about">about</router-link>
    </div>
  </div>
</template>

<script setup>
const historyParams = history.state.params
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
