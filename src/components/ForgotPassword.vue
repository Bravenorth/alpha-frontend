<template>
  <div class="container mt-5">
    <h2>Forgot Password</h2>
    <b-form @submit.prevent="forgotPassword">
      <b-form-group label="Email">
        <b-form-input type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async forgotPassword() {
      await axios.post('/api/v1/auth/forgotPassword', { email: this.email });
      this.$router.push('/login');
    },
  },
};
</script>
