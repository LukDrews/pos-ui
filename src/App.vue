<template>
  <Navigation />
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navigation from "./views/Navigation.vue";
import { User } from "./store/models";

User.api().$fetch();
</script>

<style>
#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
