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
import { authAxios } from '@/axios';
import { useToast } from 'vue-toastification';

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
      const toast = useToast();
      try {
        await authAxios.post('/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        toast.success('Registration successful');
        this.$router.push('/login');
      } catch (error) {
        toast.error(`Failed to register: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
