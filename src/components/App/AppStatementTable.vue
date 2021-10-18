<template>
  <div>
    <div class="mt-4 d-flex justify-content-end">
      <b-button size="sm" variant="outline-primary" @click="createStatement">Создать заявку</b-button>
    </div>
    <b-input-group size="sm" class="mt-4">
      <b-form-input
          id="search_input"
          v-model="filter"
          type="search"
          placeholder="Поиск заявки"
      ></b-form-input>
    </b-input-group>
    <b-table hover
             id="statement-table"
             class="mt-4"
             :fields="fields"
             :items="items"
             :per-page="perPage"
             :current-page="currentPage"
             :filter="filter"
             caption-top
             @row-clicked="editStatement"
             @filtered="onFiltered"
    >
      <template #table-caption>Журнал заявок</template>
    </b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="statement-table"
        class="mt-4"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppStatementTable',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      modalIsShow: false,
      fields: [
        { key: 'address', label: 'Адрес' },
        {
          key: 'type',
          label: 'Тип аварии',
          formatter: this.onFormat,
        },
        {
          key: 'priority',
          label: 'Приоритет',
          formatter: this.onFormat,
        },
        { key: 'applicant', label: 'Заявитель' },
        { key: 'phone', label: 'Номер телефона' },
      ],
      items: this.$store.getters.getStatements,
      filter: null,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    onFiltered(items, length) {
      this.currentPage = 1;
    },
    onFormat(value) {
      return value?.text;
    },
    createStatement() {
      this.$router.push({ name: 'statement-add' });
    },
    editStatement(row, index, e) {
      this.$router.push({ name: 'statement-edit', params: { id: row.id } });
    },
  },
};
</script>

<style scoped>

</style>
