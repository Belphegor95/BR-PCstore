import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    personid: 0,
    maintainid: 0,
    detailsdata: {},
    order: {},
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
    show_order(state, payload) {
      state.order = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedstate()],
})
// 设置要重置的参数
const getDefaultState = () => {
  return {
    user: null,
    personid: 0,
    maintainid: 0,
    detailsdata: {},
    order: {},
  }
}