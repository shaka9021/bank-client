<template>
  <div class="row">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <h1 class="text-primary my-4 text-uppercase text-center">
            Detalle del cliente
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-8 offset-2">
          <div class="container">
            <div class="row">
              <div class="col-2 offset-3">UID:</div>
              <div class="col-4">{{ client.uid }}</div>
            </div>
            <div class="row">
              <div class="col-2 offset-3">Nombre:</div>
              <div class="col-4">{{ client.name }}</div>
            </div>
            <div class="row">
              <div class="col-2 offset-3">Saldo:</div>
              <div class="col-4">{{ client.balance }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2 text-center">
          <button
            type="button"
            class="btn btn-warning mx-2"
            v-b-modal.modal-name
          >
            Modificar
          </button>
          <button
            type="button"
            class="btn btn-primary mx-2"
            v-b-modal.modal-record
          >
            Consignar
          </button>
          <button
            type="button"
            class="btn btn-danger mx-2"
            v-b-modal.modal-withdrawal
          >
            Retirar
          </button>
          <button
            type="button"
            class="btn btn-danger mx-2"
            v-b-modal.modal-transfer
          >
            Transferir
          </button>
          <button
            type="button"
            class="btn btn-danger mx-2"
            v-on:click="remove()"
            v-if="client.balance === 0"
          >
            Eliminar
          </button>
          <button
            type="button"
            class="btn btn-secondary mx-2"
            v-on:click="back()"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
    <b-modal id="modal-name" ref="modal" title="Ingrese su nombre" @ok="update">
      <form>
        <b-form-input
          v-model="name"
          placeholder="Ingrese su nombre"
        ></b-form-input>
      </form>
    </b-modal>
    <b-modal
      id="modal-record"
      ref="modal"
      title="Ingrese cantidad a consignar"
      @ok="record"
    >
      <form>
        <b-form-input
          v-model="quantity"
          placeholder="Ingrese cantidad"
        ></b-form-input>
      </form>
    </b-modal>
    <b-modal
      id="modal-withdrawal"
      ref="modal"
      title="Ingrese cantidad a retirar"
      @ok="withdrawal"
    >
      <form>
        <b-form-input
          v-model="quantity"
          placeholder="Ingrese cantidad"
        ></b-form-input>
      </form>
    </b-modal>
    <b-modal
      id="modal-transfer"
      ref="modal"
      title="Ingresar datos de transferencia"
      @ok="transfer"
    >
      <b-form>
        <b-form-group
          id="target-group"
          label="Cuenta destino:"
          label-for="target-input"
        >
          <b-form-select
            v-model="target"
            :options="clients"
            value-field="uid"
            text-field="name"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="quantity-group"
          label="Cantidad:"
          label-for="quantity-input"
        >
          <b-form-input
            id="quantity-input"
            placeholder="Ingrese cantidad a transferir"
            v-model="quantity"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["uid"],
  data() {
    return {
      name: "",
      quantity: 0,
      target: null
    };
  },
  async mounted() {
    await this.$store.dispatch("client", this.uid);
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
    clients() {
      return this.$store.getters.clients;
    }
  },
  methods: {
    back() {
      this.$router.push({ name: "clients" });
    },
    async update() {
      let client = { ...this.$store.getters.client };
      client.name = this.name;
      delete client.balance;
      await this.$store.dispatch("update", client);
    },
    async remove() {
      let uid = this.$store.getters.client.uid;
      await this.$store.dispatch("remove", uid);
      this.$router.push({ name: "clients" });
    },
    async record() {
      let client = this.$store.getters.client;
      let quantity = this.quantity;
      await this.$store.dispatch("record", { client, quantity });
      this.quantity = 0;
    },
    async withdrawal() {
      let client = this.$store.getters.client;
      let quantity = this.quantity;
      await this.$store.dispatch("withdrawal", { client, quantity });
      this.quantity = 0;
    },
    async transfer() {
      let source = this.$store.getters.client.uid;
      let target = this.target;
      let quantity = this.quantity;

      await this.$store.dispatch("transfer", { source, target, quantity });

      this.target = null;
      this.quantity = 0;
    }
  }
};
</script>
