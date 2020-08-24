import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    personid: 0,
    maintainid: 0,
    detailsdata: {}
  },
  mutations: {
    show_user(state, payload) {
      state.user = payload;
    },
    show_personid(state, payload) {
      state.personid = payload;
    },
    show_maintainid(state, payload) {
      state.maintainid = payload;
    },
    show_detailsdata(state, payload) {
      state.detailsdata = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()],
})
