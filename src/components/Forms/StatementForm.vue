<template>
  <div>
    <b-form-group
        id="form-group-1"
        label="Адрес:"
        label-for="address"
    >
      <b-form-input
          id="address"
          v-model="data.address"
          required
      ></b-form-input>
    </b-form-group>

    <b-form-group
        id="form-group-2"
        label="Местоположение:"
    >
      <Map height="250px" @click="getCoordinate"/>
    </b-form-group>

    <b-form-group id="form-group-3" label="Тип аварии:" label-for="accident">
      <b-form-select
          id="accident"
          v-model="data.type"
          :options="types"
          class="w-100"
      ></b-form-select>
    </b-form-group>

    <b-form-group id="form-group-4" label="Приоритет:" label-for="priority">
      <b-form-select
          id="priority"
          v-model="data.priority"
          :options="priorities"
          class="w-100"
      ></b-form-select>
    </b-form-group>

    <b-form-group
        id="form-group-5"
        label="Заявитель:"
        label-for="applicant"
    >
      <b-form-input
          id="applicant"
          v-model="data.applicant"
          required
      ></b-form-input>
    </b-form-group>

    <b-form-group
        id="form-group-6"
        label="Номер телефона:"
        label-for="phone"
    >
      <b-form-input
          id="phone"
          v-model="data.phone"
          required
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue';
import uuid from '@/utils/Uuid';

export default {
  created() {
    if (this.$route.params.id) this.fillForm();
  },
  name: 'StatementForm',
  data() {
    return {
      types: this.$store.getters.getTypes,
      priorities: this.$store.getters.getPriorities,
      data: {
        address: '',
        location: null,
        type: null,
        priority: null,
        applicant: '',
        phone: '',
      },
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('setStatement', {
        id: uuid.nextUuid(),
        ...this.data,
      });
    },
    getCoordinate(coordinate) {
      this.data.location = coordinate;
    },
    fillForm() {
      const statement = this.$store.getters.getStatementById(this.$route.params.id);
      this.data = { ...this.data, ...statement };
    },
  },
  components: {
    Map,
  },
};
</script>

<style scoped>

</style>
