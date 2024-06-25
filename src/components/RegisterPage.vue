<template>
  <div class="form-container">
    <h1 class="page-title">Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required>
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
      password: '',
    };
  },
  methods: {
    register() {
      const toast = useToast();
      axios.post('/signup', {
        username: this.username,
        password: this.password,
      })
      .then(() => {
        toast.success('Registration successful');
        this.$router.push('/login');
      })
      .catch((error) => {
        toast.error('Registration failed: ' + error.message);
      });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: #2e2e2e;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.page-title {
  text-align: center;
  color: #ffd700;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #3e3e3e;
  color: #f5f5f5;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #ffd700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: #ffd700;
  color: #333;
}
</style>
