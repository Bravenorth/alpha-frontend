<template>
  <div id="app">
    <app-navbar />
    <main>
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import AppFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding-top: 60px; /* Height of the navbar */
  padding-bottom: 40px; /* Height of the footer */
}
</style>
