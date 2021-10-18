<template>
  <div>
    <AppStatementTable/>
    <router-view/>
  </div>
</template>

<script>
import AppStatementTable from '@/components/App/AppStatementTable.vue';

export default {
  name: 'StatementPage',
  components: {
    AppStatementTable,
  },
};
</script>

<style scoped>

</style>
