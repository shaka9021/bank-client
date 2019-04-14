<template>
  <div class="row">
    <h1>Listado de clientes</h1>
    <ul>
      <li v-for="client in clients" :key="client.uid">
        {{ client.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    clients() {
      return this.$store.getters.clients;
    }
  }
};
</script>
