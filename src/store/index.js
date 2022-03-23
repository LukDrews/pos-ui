import { createStore } from "vuex";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import * as Models from "./models";
import axios from "axios";

// Register models to databse
const database = new VuexORM.Database();
Object.values(Models).forEach((model) => database.register(model));

// Configure urls
const baseUrl = `${import.meta.env.VITE_API_URL}`;
const apiUrl = `${baseUrl}/v1/`;

// Set access token for api access
const instance = axios.create({ baseURL: apiUrl });
instance.interceptors.request.use(function (config) {
  config.headers.authorization = `Bearer ${cookies.get("access_token")}`;
  return config;
});

// Add axios plugin
VuexORM.use(VuexORMAxios, {
  axios: instance,
});

export default createStore({
  state() {
    return {
      loaded: false,
      authenticated: cookies.isKey("access_token"),
      apiUrl,
      baseUrl,
    };
  },
  mutations: {
    hasLoaded(state) {
      state.loaded = true;
    },
    signin(state) {
      state.authenticated = true;
    },
    signout(state) {
      state.authenticated = false;
    },
  },
  actions: {
    hasLoaded({ commit }) {
      commit("hasLoaded");
    },
    signin({ commit }, accessToken) {
      cookies.set("access_token", accessToken);
      commit("signin");
    },
    signout({ commit }) {
      cookies.remove("access_token");
      commit("signout");
    },
  },
  getters: {
    getAuthCookie() {
      return cookies.get("access_token");
    },
  },
  modules: {},
  plugins: [VuexORM.install(database)],
});
