import Vue from "vue";
import Router from "vue-router";
import Login from "./Login";
import ClientList from "./ClientList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/clients",
      name: "clients",
      component: ClientList
    }
  ]
});
