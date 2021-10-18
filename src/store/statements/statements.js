export default {
  state: {
    statements: [],
  },
  mutations: {
    pushStatement(state, statement) {
      state.statements.push(statement);
    },
    updateStatementById(state, statement) {
      const idx = state.statements.findIndex((s) => s.id === statement.id);
      state.statements.splice(idx, 1, statement);
    },
  },
  actions: {
    pushStatement({ commit }, statement) {
      commit('pushStatement', statement);
    },
    updateStatement({ commit }, statement) {
      commit('updateStatementById', statement);
    },
  },

  getters: {
    getStatements(state) {
      return state.statements;
    },
    getStatementById: (state) => (id) => state.statements.find((statement) => statement.id === id),
  },
};
