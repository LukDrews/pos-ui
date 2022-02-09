<template>
  <div
    class="opacity-40 h-screen sidebar-content"
    :class="[reduce ? 'sidebar-reduce' : '']"
  >
    <o-sidebar fullheight :can-cancel="false" :reduce="reduce" open>
      <div>
        <router-link
          class="flex items-center justify-center py-2"
          to="/"
          @click="reduce = !reduce"
        >
          <svg
            class="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
        </router-link>
        <!-- <div class="flex flex-col items-center mt-3 border-t border-gray-700"></div> -->
        <!-- <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700"></div> -->
        <div
          class="flex flex-col items-center border-t border-gray-700"
          :class="{ 'w-full': !reduce }"
        >
          <ul>
            <NavigationItem
              v-for="item in items"
              :key="item.title"
              :reduce="reduce"
              :title="item.title"
              :icon="item.icon"
              :path="item.path"
            ></NavigationItem>
          </ul>
        </div>
      </div>
    </o-sidebar>
  </div>
</template>

<script>
/**
 * @see: https://codepen.io/robstinson/pen/bGwpNMV
 */
import NavigationItem from "../components/NavigationItem.vue";
export default {
  name: "Navigation",
  components: {
    NavigationItem,
  },
  data: () => ({
    reduce: false,
    items: [
      { title: "Home", icon: "home", path: "/" },
      { title: "Shop", icon: "store", path: "/shop" },
      { title: "Products", icon: "tag", path: "/products" },
      { title: "Users", icon: "user", path: "/users" },
      { title: "Orders", icon: "shopping-cart", path: "/orders" },
      { title: "Statistics", icon: "chart-line", path: "/statistics" },
      {
        title: "Transactions",
        icon: "credit-card",
        path: "/transactions",
      },
      { title: "Roles", icon: "user-lock", path: "/roles" },
    ],
  }),
};
</script>

<style></style>
