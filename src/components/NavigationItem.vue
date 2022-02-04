<template>
  <router-link
    class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
    :class="[reduce ? reduceClass : notReduceClass]"
    :to="path"
  >
    <o-icon class="w-6 h-6" :icon="icon"> </o-icon>
    <span v-if="!reduce" class="ml-2 text-sm font-medium">
      {{ title }}
    </span>
  </router-link>
  <!-- <a
    class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
    href="#"
  >
    <o-icon class="w-6 h-6" :icon="icon"></o-icon>
  </a>
  <a
    class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
    href="#"
  >
    <o-icon class="w-6 h-6" :icon="icon"></o-icon>
    <span v-if="!reduce" class="ml-2 text-sm font-medium">Messages</span>
  </a> -->
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
    reduce: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reduceClass: "justify-center w-12",
      notReduceClass: "relative w-full px-3",
    };
  },
};
</script>
