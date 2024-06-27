<template>
  <div class="container mt-5">
    <h2>User Profile</h2>
    <div v-if="user">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Ajoutez d'autres informations de l'utilisateur ici -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'; // Utilisez l'instance Axios globale
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const toast = useToast();
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data.data.user;
      } catch (error) {
        toast.error(`Failed to fetch user profile: ${error.response?.data?.message || error.message}`);
        this.$router.push('/login');
      }
    },
  },
};
</script>
