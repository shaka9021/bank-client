import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const URL = " http://localhost:9080/bank-service/service";

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      password: ""
    },
    clients: [],
    client: {},
    error: null
  },
  mutations: {
    user(state, user) {
      state.user = user;
      state.error = null;
    },
    clients(state, clients) {
      state.clients = clients;
      state.error = null;
    },
    error(state, message) {
      state.error = message;
    }
  },
  actions: {
    clients({ commit }, user) {
      axios
        .get(`${URL}/client`, {
          auth: user
        })
        .then(({ data }) => {
          commit("user", user);
          commit("clients", data);
        })
        .catch(error => {
          if (error.response.status === "401") {
            commit("error", "Usuario o contraseña incorrectos");
          } else {
            commit(
              "error",
              "Error al autenticar, por favor intente nuevamente"
            );
          }
        });
    }
  },
  getters: {
    error({ error }) {
      return error;
    },
    clients({ clients }) {
      return clients;
    }
  }
});
