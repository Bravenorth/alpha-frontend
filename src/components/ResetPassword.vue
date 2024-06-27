<template>
  <div class="container mt-5">
    <h2>Reset Password</h2>
    <b-form @submit.prevent="resetPassword">
      <b-form-group label="New Password">
        <b-form-input type="password" v-model="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Reset Password</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    async resetPassword() {
      const token = this.$route.params.token;
      await axios.patch(`/api/v1/auth/resetPassword/${token}`, { password: this.password });
      this.$router.push('/login');
    },
  },
};
</script>
