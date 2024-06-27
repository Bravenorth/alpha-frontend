<template>
  <div class="container mt-5">
    <h1>Welcome to Alpha Salvage</h1>
    <p>Your trusted partner in ship scrapping and resource management.</p>
    <b-button variant="primary" v-if="!isAuthenticated" @click="goToRegister">Get Started</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  methods: {
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>
