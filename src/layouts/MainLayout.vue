<template>
  <div class="main_container">
    <NavBar/>
    <div class="container">
      <router-view/>
    </div>
  </div>

</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue';

export default {
  name: 'MainLayout',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
  .main_container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
