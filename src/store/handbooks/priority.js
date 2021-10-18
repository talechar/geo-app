export default {
  state: {
    priorities: [
      { value: { value: 'red', text: 'Незамедлительно' }, text: 'Незамедлительно' },
      { value: { value: 'orange', text: 'Высокий' }, text: 'Высокий' },
      { value: { value: 'white', text: 'Средний' }, text: 'Средний' },
      { value: { value: 'gray', text: 'Низкий' }, text: 'Низкий' },
    ],
  },

  getters: {
    getPriorities(state) {
      return state.priorities;
    },
  },
};
