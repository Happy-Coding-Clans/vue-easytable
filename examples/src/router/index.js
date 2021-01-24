import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "./router.config.js";
//import routerConfig from "./router.config-test.js";

Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: "active",
    routes: routerConfig
});
