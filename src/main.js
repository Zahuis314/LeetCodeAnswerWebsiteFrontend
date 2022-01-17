import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { BootstrapVue } from "bootstrap-vue";
Vue.config.productionTip = false;

const axiosBase = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});
Vue.prototype.$axios = axiosBase;
Vue.use(BootstrapVue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
