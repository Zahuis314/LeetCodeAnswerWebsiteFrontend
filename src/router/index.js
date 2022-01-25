import Vue from "vue";
import VueRouter from "vue-router";
import Problems from "../views/Problems.vue";
import ProblemDetail from "../views/ProblemDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Problems",
    component: Problems,
  },
  {
    path: "/problem/:slug",
    name: "ProblemDetail",
    component: ProblemDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
