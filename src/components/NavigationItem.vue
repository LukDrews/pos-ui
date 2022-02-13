<template>
  <router-link
    class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
    :class="[isReduced, isActive]"
    :to="item.path"
  >
    <o-icon class="w-6 h-6" :icon="item.icon"> </o-icon>
    <span v-if="!reduce" class="ml-2 text-sm font-medium">
      {{ item.title }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    item: {
      type: Object,
      default: () => {
        return { title: "", icon: "", path: "" };
      },
    },
    reduce: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      reduceClass: "justify-center w-12",
      notReduceClass: "relative w-full px-3",
      activeClass: "bg-gray-700",
    };
  },
  computed: {
    isReduced() {
      return this.reduce ? this.reduceClass : this.notReduceClass;
    },
    isActive() {
      return this.selected === this.item ? this.activeClass : "";
    },
  },
};
</script>
