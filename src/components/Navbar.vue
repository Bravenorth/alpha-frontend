<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand href="#">Alpha Salvage</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item v-if="!isAuthenticated" to="/login">Login</b-nav-item>
          <b-nav-item v-if="!isAuthenticated" to="/register">Register</b-nav-item>
          <b-nav-item v-if="isAuthenticated" to="/profile">Profile</b-nav-item>
          <b-nav-item v-if="isAuthenticated">
            <b-button @click="logout">Logout</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import eventBus from '../eventBus';

export default {
  name: 'AppNavbar',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/');
    },
    updateAuthStatus() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
  created() {
    eventBus.on('login', this.updateAuthStatus);
  },
  beforeUnmount() {
    eventBus.off('login', this.updateAuthStatus);
  },
};
</script>
