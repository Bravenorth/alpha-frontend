<template>
  <div class="container mt-5">
    <h2>Edit Profile</h2>
    <b-form @submit.prevent="updateProfile">
      <b-form-group label="Username">
        <b-form-input v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password" v-model="password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Update Profile</b-button>
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
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { username, email } = response.data.data.user;
      this.username = username;
      this.email = email;
    },
    async updateProfile() {
      const token = localStorage.getItem('token');
      await axios.patch('/api/v1/auth/updateMe', {
        username: this.username,
        email: this.email,
        password: this.password,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.$router.push('/profile');
    },
  },
};
</script>
