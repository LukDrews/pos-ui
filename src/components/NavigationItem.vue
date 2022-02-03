<template>
  <router-link
    class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
    :class="{ 'w-12': reduce }"
    :to="path"
  >
    <o-icon
      class="justify-center w-12"
      :class="{ 'pl-4': !reduce }"
      :icon="icon"
    >
    </o-icon>
    <span class="ml-2 text-sm font-medium" :class="{ hidden: reduce }">
      {{ title }}
    </span>
  </router-link>
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
};
</script>
