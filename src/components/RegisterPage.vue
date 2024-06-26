<template>
  <div class="form-container">
    <h1 class="page-title">Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
  register() {
    const toast = useToast();
    axios.post('/signup', {
      username: this.username,
      email: this.email,
      password: this.password,
    })
      .then(() => { // Suppression de la variable response
        toast.success('Registration successful!');
        this.$router.push('/login');
      })
      .catch(error => {
        toast.error('Registration failed: ' + error.message);
      });
  },
}

};
</script>

<style scoped>
/* Vos styles existants */
</style>
