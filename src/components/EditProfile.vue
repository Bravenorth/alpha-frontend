<template>
    <div class="form-container">
      <h1 class="page-title">Edit Profile</h1>
      <form @submit.prevent="updateProfile">
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="avatar" placeholder="Avatar URL">
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'EditProfile',
    data() {
      return {
        name: '',
        avatar: '',
      };
    },
    created() {
      this.getUserProfile();
    },
    methods: {
      getUserProfile() {
        const token = localStorage.getItem('token');
        axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            this.name = response.data.user.name;
            this.avatar = response.data.user.avatar;
          })
          .catch(error => {
            console.error('Failed to fetch user profile:', error);
          });
      },
      updateProfile() {
        const toast = useToast();
        const token = localStorage.getItem('token');
        axios.patch('/updateMe', { name: this.name, avatar: this.avatar }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success('Profile updated successfully');
        })
        .catch((error) => {
          toast.error('Profile update failed: ' + error.message);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Vos styles existants */
  </style>
  