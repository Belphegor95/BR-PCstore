import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personid: 0,
    maintainid: 0,
  },
  mutations: {
    show_personid(state, payload) {
      state.personid = payload;
    },
    show_maintainid(state, payload) {
      state.maintainid = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
