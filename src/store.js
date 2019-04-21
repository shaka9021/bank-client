import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const URL = " http://localhost:9080/bank-service/service";

export default new Vuex.Store({
  state: {
    user: {},
    clients: [],
    client: {}
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    clients(state, clients) {
      state.clients = clients;
    },
    client(state, client) {
      state.client = client;
    }
  },
  actions: {
    async login({ commit }, user) {
      await axios.post(`${URL}/user/login`, null, { auth: user });
      commit("user", user);
    },
    async clients({ commit, state }) {
      let { data } = await axios.get(`${URL}/client`, { auth: state.user });
      commit("clients", data);
    },
    async client({ commit, state }, uid) {
      let { data: client } = await axios.get(`${URL}/client/${uid}`, {
        auth: state.user
      });
      let { data: balance } = await axios.get(`${URL}/ledger/${uid}`, {
        auth: state.user
      });
      client.balance = balance;
      commit("client", client);
    }
  },
  getters: {
    clients({ clients }) {
      return clients;
    },
    client({ client }) {
      return client;
    }
  }
});
