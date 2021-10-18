import Vue from 'vue';
import Vuex from 'vuex';
import statements from '@/store/statements/statements';
import types from '@/store/handbooks/types';
import priority from '@/store/handbooks/priority';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    statements,
    types,
    priority,
  },
});
