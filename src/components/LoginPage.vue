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
import axios from '@/axios'; // Utilisez l'instance Axios globale
import eventBus from '../eventBus';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const toast = useToast();
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        eventBus.emit('login');
        toast.success('Login successful!');
        this.$router.push('/');
      } catch (error) {
        toast.error(`Failed to login: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
