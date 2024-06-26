<template>
    <div class="form-container">
      <h1 class="page-title">Forgot Password</h1>
      <form @submit.prevent="forgotPassword">
        <input type="email" v-model="email" placeholder="Email" required>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        email: '',
      };
    },
    methods: {
      forgotPassword() {
        const toast = useToast();
        axios.post('/forgotPassword', { email: this.email })
          .then(() => {
            toast.success('Password reset link sent!');
          })
          .catch((error) => {
            toast.error('Failed to send reset link: ' + error.message);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Vos styles existants */
  </style>
  