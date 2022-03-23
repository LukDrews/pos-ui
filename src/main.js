import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Oruga Framework + TailwindCSS
import Oruga from "@oruga-ui/oruga-next";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas as freeSolidIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/tailwindcss.css";
import "@oruga-ui/oruga-next/dist/oruga-full.css";
import "./assets/oruga-tailwindcss.css";

library.add(freeSolidIcons);

// Attach axios to vue
import VueAxios from "vue-axios";
import axios from "axios";

const app = createApp(App);
app.component("VueFontawesome", FontAwesomeIcon);
app.use(
  VueAxios,
  axios.create({
    baseURL: store.state.apiUrl,
  })
);
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
    reduceClass: "sidebar-reduce",
  },
  modal: {
    contentClass: "modal-content",
  },
});

app.mount("#app");
