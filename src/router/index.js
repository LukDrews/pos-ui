import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import store from "../store";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const routes = [
  {
    path: "/login",
    // route level code-splitting
    component: () => import("../layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../views/Auth.vue"),
      },
    ],
  },
  {
    path: "/logout",
    component: () => import("../layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "Logout",
        component: () => import("../views/Auth.vue"),
        props: { logout: true },
      },
    ],
  },
  {
    path: "/loading",
    name: "Preload",
    component: () => import("../views/Preload.vue"),
    props: (route) => ({ redirect: route.query.redirect }),
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

router.beforeEach((to, from, next) => {
  if (!store.state.authenticated && to.name !== "Login") {
    console.log("Redirect to login");
    return next({ name: "Login" });
  }

  if (
    store.state.authenticated &&
    !store.state.loaded &&
    to.name !== "Preload"
  ) {
    return next({ name: "Preload", query: { redirect: to.name } });
  }

  return next();
});

export default router;
