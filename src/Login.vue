<template>
  <div class="row">
    <div class="col-4 offset-4">
      <b-alert v-if="!!error" show variant="danger">{{ error }}</b-alert>
      <b-form>
        <b-form-group
          id="username-group"
          label="Usuario:"
          label-for="username-input"
        >
          <b-form-input
            id="username-input"
            placeholder="Ingrese su usuario"
            v-model="user.username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password-group"
          label="Contraseña:"
          label-for="password-input"
        >
          <b-form-input
            id="password-input"
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="user.password"
          ></b-form-input>
        </b-form-group>

        <b-button type="button" variant="primary" v-on:click="login"
          >Ingresar</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.clients,
      newValue => {
        if (newValue.length >= 0) {
          this.$router.push({ path: "clients" });
        }
      }
    );
  },
  methods: {
    login() {
      this.$store.dispatch("clients", this.user);
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>
