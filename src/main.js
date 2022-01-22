import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { User, Role, Group, Product, Order, OrderItem, CartItem } from './store/models';

Vue.use(Vuex);

VuexORM.use(VuexORMAxios, { axios, baseURL: 'http://localhost:3000/v1/' });
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
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

axios.defaults.baseURL = 'http://localhost:3000/v1/';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
