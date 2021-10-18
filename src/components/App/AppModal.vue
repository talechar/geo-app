<template>
  <div>
    <b-modal v-model="isShow" @hide="onClose">
      <span slot="modal-header">{{ $route.meta.title }}</span>
      <StatementForm ref="form"/>
      <template #modal-footer="{ close }">
        <b-button @click="close()">Закрыть</b-button>
        <b-button class="m-lg-1" @click="onSubmit">{{ $route.params.id ? 'Редактировать' : 'Создать' }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import StatementForm from '@/components/Forms/StatementForm.vue';

export default {
  name: 'AppModal',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    onClose() {
      this.$router.push({ name: 'statement-view' });
    },
    onSubmit() {
      this.$refs.form.submit();
      this.isShow = false;
    },
  },
  components: {
    StatementForm,
  },
};
</script>

<style scoped>

</style>
