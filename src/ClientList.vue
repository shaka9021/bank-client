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
                  <button class="btn btn-primary">Ver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("clients");
  },
  computed: {
    clients() {
      return this.$store.getters.clients;
    }
  }
};
</script>
