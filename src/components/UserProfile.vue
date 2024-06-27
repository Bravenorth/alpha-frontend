<template>
  <div class="container mt-5">
    <h2>User Profile</h2>
    <p><strong>Username:</strong> {{ user.username }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <b-button variant="primary" @click="goToEditProfile">Edit Profile</b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data.data.user;
    },
    goToEditProfile() {
      this.$router.push('/edit-profile');
    },
  },
};
</script>
