<template>
  <div class="row">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <h1 class="text-primary my-4 text-uppercase text-center">
            Clientes registrados
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-8 offset-2 my-2">
          <button
            type="button"
            class="btn btn-primary"
            v-b-modal.modal-create-client
          >
            Crear cliente
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-8 offset-2">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-center">UID</th>
                <th scope="col" class="text-center">Nombre</th>
                <th scope="col" class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" :key="client.uid">
                <td class="text-right">{{ client.uid }}</td>
                <td class="text-left">{{ client.name }}</td>
                <td class="text-center">
                  <button class="btn btn-primary" v-on:click="view(client)">
                    Ver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-create-client"
      ref="modal"
      title="Ingresar datos de cliente"
      @ok="create"
    >
      <b-form>
        <b-form-group id="uid-group" label="UID:" label-for="uid-input">
          <b-form-input
            id="uid-input"
            placeholder="Ingrese su identificacion"
            v-model="client.uid"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="name-group"
          label="Nombre:"
          label-for="client-name-input"
        >
          <b-form-input
            id="client-name-input"
            placeholder="Ingrese nombre del cliente"
            v-model="client.name"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: { uid: "", name: "" }
    };
  },
  async mounted() {
    await this.$store.dispatch("clients");
  },
  computed: {
    clients() {
      return this.$store.getters.clients;
    }
  },
  methods: {
    view(client) {
      this.$router.push({ name: "client", params: { uid: client.uid } });
    },
    async create() {
      await this.$store.dispatch("create", this.client);
    }
  }
};
</script>
