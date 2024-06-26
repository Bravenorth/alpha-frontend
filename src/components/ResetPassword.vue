<template>
    <div class="form-container">
      <h1 class="page-title">Reset Password</h1>
      <form @submit.prevent="resetPassword">
        <input type="password" v-model="password" placeholder="New Password" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'ResetPassword',
    data() {
      return {
        password: '',
      };
    },
    methods: {
      async resetPassword() {
        const token = this.$route.params.token;
        const toast = useToast();
        try {
          await axios.patch(`http://localhost:5000/api/v1/auth/resetPassword/${token}`, { password: this.password });
          toast.success('Password has been reset!');
          this.$router.push('/login');
        } catch (error) {
          toast.error('Failed to reset password: ' + error.response.data.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  