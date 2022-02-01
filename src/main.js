import { createApp } from "vue";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga-full.css";
// import "@oruga-ui/oruga-next/dist/oruga-full-vars.css";

import "./assets/oruga-tailwindcss.css";
// import "./assets/tailwindcss.css";

import App from "./App.vue";

// import Vuex from "vuex";
// import VuexORM from "@vuex-orm/core";
// import VuexORMAxios from "@vuex-orm/plugin-axios";
// import axios from "axios";
// import router from "./router";
// import {
//   User,
//   Role,
//   Group,
//   Product,
//   Order,
//   OrderItem,
//   CartItem,
// } from "./store/models";
// app.use(Vuex);

// VuexORM.use(VuexORMAxios, {
//   axios,
//   // baseURL: `${process.env.VUE_APP_API_URL}/v1/`,
// });
// // Create a new instance of Database.
// const database = new VuexORM.Database();

// // Register Models to Database.
// database.register(User);
// database.register(Role);
// database.register(Group);
// database.register(Product);
// database.register(Order);
// database.register(OrderItem);
// database.register(CartItem);

// // Create Vuex Store and register database through Vuex ORM.
// const store = new Vuex.Store({
//   plugins: [VuexORM.install(database)],
// });

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");

const app = createApp(App);
app.use(Oruga, {
  //   button: {
  //     roundedClass: "btn-rounded",
  //   },
});
app.mount("#app");
