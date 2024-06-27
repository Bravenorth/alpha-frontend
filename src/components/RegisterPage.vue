<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <b-form @submit.prevent="register">
      <b-form-group label="Username">
        <b-form-input v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password" v-model="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      await axios.post('/api/v1/auth/signup', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.$router.push('/login');
    },
  },
};
</script>
