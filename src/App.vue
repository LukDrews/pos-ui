<template>
  <Navigation />
  <div id="content" class="grow mt-12">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navigation from "./views/Navigation.vue";
import { User } from "./store/models";

User.api().$fetch();
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply bg-gray-200;
}
</style>
