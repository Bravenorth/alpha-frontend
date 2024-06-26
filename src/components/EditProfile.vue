<template>
  <div class="form-container">
    <h1 class="page-title">Edit Profile</h1>
    <form @submit.prevent="updateProfile">
      <input type="text" v-model="user.name" placeholder="Name" />
      <input type="email" v-model="user.email" placeholder="Email" />
      <input type="password" v-model="user.password" placeholder="Password" />
      <input type="text" v-model="user.avatar" placeholder="Avatar URL" />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'EditProfile',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        avatar: ''
      }
    };
  },
  methods: {
    async updateProfile() {
      const toast = useToast();
      try {
        const token = localStorage.getItem('token');
        // eslint-disable-next-line no-unused-vars
        const response = await axios.patch('http://localhost:5000/api/v1/auth/updateMe', this.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile: ' + error.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
