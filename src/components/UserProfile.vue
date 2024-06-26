<template>
  <div class="profile-page">
    <h1 class="page-title">User Profile</h1>
    <div v-if="user" class="card">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <img :src="user.avatar" alt="Avatar" v-if="user.avatar">
      <router-link to="/edit-profile" class="btn">Edit Profile</router-link>
      <router-link to="/forgot-password" class="btn btn-secondary">Reset Password</router-link>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            this.user = response.data.data.user; // Assurez-vous que cette ligne correspond à la structure de la réponse
          })
          .catch(error => {
            console.error('Failed to fetch user profile:', error);
            this.$router.push('/login');
          });
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
/* Vos styles existants */
</style>
