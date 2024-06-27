<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <b-form @submit.prevent="login">
      <b-form-group label="Username">
        <b-form-input v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password" v-model="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const response = await axios.post('/api/v1/auth/login', {
        username: this.username,
        password: this.password,
      });
      localStorage.setItem('token', response.data.token);
      eventBus.emit('login');
      this.$router.push('/');
    },
  },
};
</script>
