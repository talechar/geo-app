<template>
  <Map :statements="statements" />
</template>

<script>
import Map from '@/components/Map/Map.vue';

export default {
  name: 'MapPage',
  components: {
    Map,
  },
  data() {
    return {
      statements: this.$store.getters.getStatements,
    };
  },
};
</script>

<style scoped>

</style>
