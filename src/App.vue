<template>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <!-- <Navigation /> -->
  <div class="bg-red-500">Color from tailwindcss</div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Navigation from "./views/Navigation.vue";
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
</style>
