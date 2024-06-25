<template>
  <div class="home-page">
    <h1 class="page-title">Welcome to Alpha</h1>
    <p>This is the home page of Alpha.</p>
    <div v-if="!isAuthenticated" class="cta-buttons">
      <router-link to="/register" class="btn">Get Started</router-link>
      <router-link to="/login" class="btn">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  margin-top: 100px;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  background-color: #ffd700;
  color: #333;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: #333;
  color: #ffd700;
}
</style>
