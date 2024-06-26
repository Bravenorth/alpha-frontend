<template>
  <div class="form-container">
    <h1 class="page-title">Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <router-link to="/forgot-password" class="forgot-password-link">Forgot Password?</router-link>
  </div>
</template>

<script>
import axios from '../axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const toast = useToast();
      axios.post('/login', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
          this.$router.push('/profile');
        })
        .catch(error => {
          toast.error('Login failed: ' + error.message);
        });
    },
  },
};
</script>

<style scoped>
.forgot-password-link {
  display: block;
  margin-top: 10px;
  text-align: right;
}
</style>
