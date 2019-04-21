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
    },
    async update({ commit, state }, user) {
      let { data: client } = await axios.put(`${URL}/client`, user, {
        auth: state.user
      });
      let { data: balance } = await axios.get(`${URL}/ledger/${user.uid}`, {
        auth: state.user
      });
      client.balance = balance;
      commit("client", client);
    },
    async remove({ commit, state }, uid) {
      await axios.delete(`${URL}/client/${uid}`, {
        auth: state.user
      });
      commit("client", {});
    },
    async create({ state, dispatch }, client) {
      await axios.post(`${URL}/client`, client, {
        auth: state.user
      });
      dispatch("clients");
    },
    async record({ state, dispatch }, { client, quantity }) {
      await axios.post(`${URL}/ledger/record/${client.uid}/${quantity}`, null, {
        auth: state.user
      });
      dispatch("client", client.uid);
    },
    async withdrawal({ state, dispatch }, { client, quantity }) {
      await axios.post(
        `${URL}/ledger/withdrawal/${client.uid}/${quantity}`,
        null,
        {
          auth: state.user
        }
      );
      dispatch("client", client.uid);
    },
    async transfer({ state, dispatch }, { source, target, quantity }) {
      await axios.post(
        `${URL}/ledger/transfer/${source}/${target}/${quantity}`,
        null,
        {
          auth: state.user
        }
      );
      dispatch("client", source);
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
