<template>
  <Navigation />
  <div id="content" class="grow py-16 px-4">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../views/Navigation.vue";
export default {
  name: "AppLayout",
  components: {
    Navigation,
  },
};
</script>

<style scoped>
#content {
  @apply bg-gray-200;
}
</style>
