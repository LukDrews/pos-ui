import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Oruga Framework + TailwindCSS
import Oruga from "@oruga-ui/oruga-next";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas as freeSolidIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/tailwindcss.css";
import "@oruga-ui/oruga-next/dist/oruga-full.css";
import "./assets/oruga-tailwindcss.css";

library.add(freeSolidIcons);
// Vuex Next + Vuex ORM + Vuex ORM Axios
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import axios from "axios";
import {
  User,
  Role,
  Group,
  Product,
  Order,
  OrderItem,
  CartItem,
} from "./store/models";

VuexORM.use(VuexORMAxios, {
  axios,
  baseURL: `${import.meta.env.VITE_API_URL}/v1/`,
});
// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(User);
database.register(Role);
database.register(Group);
database.register(Product);
database.register(Order);
database.register(OrderItem);
database.register(CartItem);

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.createStore({
  plugins: [VuexORM.install(database)],
});

const app = createApp(App);
app.component("VueFontawesome", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(Oruga, {
  iconPack: "fas",
  iconComponent: "vue-fontawesome",
  button: {
    roundedClass: "btn-rounded",
  },
  sidebar: {
    contentClass: "sidebar-content",
  },
});
app.mount("#app");
