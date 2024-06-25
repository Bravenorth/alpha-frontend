<template>
    <nav class="navbar">
      <div class="container">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/profile">Profile</router-link></li>
          <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  import eventBus from '../eventBus';
  
  export default {
    name: 'AppNavbar',
    data() {
      return {
        isAuthenticated: !!localStorage.getItem('token'),
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        this.$router.push('/');
      },
      updateAuthStatus() {
        this.isAuthenticated = !!localStorage.getItem('token');
      },
    },
    created() {
      eventBus.on('login', this.updateAuthStatus);
    },
    beforeUnmount() {
      eventBus.off('login', this.updateAuthStatus);
    },
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #1e1e1e;
    color: #ffd700;
    padding: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }
  
  li {
    display: inline;
  }
  
  a {
    color: #ffd700;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  button {
    background: none;
    border: none;
    color: #ffd700;
    cursor: pointer;
  }
  
  button:hover {
    text-decoration: underline;
  }
  </style>
  