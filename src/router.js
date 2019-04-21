import Vue from "vue";
import Router from "vue-router";
import Login from "./Login";
import ClientList from "./ClientList";
import ClientDetail from "./ClientDetail";

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
    },
    {
      path: "/client/:uid",
      name: "client",
      component: ClientDetail,
      props: true
    }
  ]
});
