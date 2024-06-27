<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Alpha Salvage</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/scrapping-tool">Scrapping Tool</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/register">Register</b-nav-item>
        <b-nav-item v-if="isAuthenticated" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../eventBus';

export default {
  name: 'AppNavbar',
  setup() {
    const isAuthenticated = ref(!!localStorage.getItem('token'));
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      isAuthenticated.value = false;
      router.push('/login');
    };

    const updateAuthStatus = () => {
      isAuthenticated.value = !!localStorage.getItem('token');
    };

    eventBus.on('login', updateAuthStatus);

    return {
      isAuthenticated,
      logout,
    };
  },
  beforeUnmount() {
    eventBus.off('login', this.updateAuthStatus);
  },
};
</script>

<style scoped>
.navbar {
  background-color: #2c2c2c;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.navbar-nav .nav-item .nav-link {
  color: #ffd700;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #ffcc33;
}
</style>
