export default {
  state: {
    statements: [],
  },
  mutations: {
    setStatement(state, statement) {
      state.statements.push(statement);
    },
  },
  actions: {
    setStatement({ commit }, statement) {
      commit('setStatement', statement);
    },
  },

  getters: {
    getStatements(state) {
      return state.statements;
    },
    getStatementById: (state) => (id) => state.statements.find((statement) => statement.id === id),
  },
};
