// import Vue from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    // route level code-splitting
    // this generates a separate chunk (shop.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "shop" */ "../views/Shop.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
  },
  {
    path: "/transactions",
    name: "Transaction",
    component: () => import("../views/Transactions.vue"),
  },
  {
    path: "/roles",
    name: "Roles",
    component: () => import("../views/Roles.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // base: import.meta.env.BASE_URL,
  routes,
});

export default router;
