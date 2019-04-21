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
        username: "simpson",
        password: "simpson"
      },
      error: null
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", this.user);
        this.$router.push({ path: "clients" });
      } catch (e) {
        this.error = "Error al autenticar, por favor intente nuevamente";
      }
    }
  }
};
</script>
