<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand">
        <router-link to="/">Alpha Salvage</router-link>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/profile">Profile</router-link></li>
        <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
      </ul>
    </div>
  </nav>
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

<style scoped>
.navbar {
  background-color: #2c2c2c;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.brand {
  font-size: 1.5rem;
  font-family: 'Poiret One', cursive;
  color: #ffd700;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: flex;
  align-items: center;
}

.nav-links a, .nav-links button {
  color: #ffd700;
  font-size: 1rem;
  text-decoration: none;
}

.nav-links button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-links a:hover, .nav-links button:hover {
  color: #ffcc33;
  text-decoration: underline;
}
</style>
