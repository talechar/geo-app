export default {
  state: {
    types: [
      { value: { value: { type: 'rush' }, text: 'Порыв' }, text: 'Порыв' },
      { value: { value: 'leak', text: 'Утечка' }, text: 'Утечка' },
      { value: { value: 'hydrant', text: 'Колонка уличная' }, text: 'Колонка уличная' },
      { value: { value: 'lowQualityWater', text: 'Некачественная вода' }, text: 'Некачественная вода' },
      { value: { value: 'blockage', text: 'Закупорка' }, text: 'Закупорка' },
      { value: { value: 'other', text: 'Другое' }, text: 'Другое' },
    ],
  },

  getters: {
    getTypes(state) {
      return state.types;
    },
  },
};
