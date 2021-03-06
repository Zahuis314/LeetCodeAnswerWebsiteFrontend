import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.config.productionTip = false;

const axiosBase = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});
Vue.prototype.$axios = axiosBase;

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
