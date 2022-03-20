import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (shop.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(/* webpackChunkName: "shop" */ "../views/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "App",
    component: AppLayout,
    redirect: "/shop", // TODO remove
    children: [
      {
        path: "shop",
        name: "Shop",
        component: () => import("../views/Shop.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("../views/Users.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("../views/Orders.vue"),
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../views/Products.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // base: import.meta.env.BASE_URL,
  routes,
});

export default router;
