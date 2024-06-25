<template>
    <footer class="footer">
      <div class="container">
        <p>&copy; 2023 Alpha. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #1e1e1e;
    color: #ffd700;
    padding: 1rem;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
  }
  </style>
  