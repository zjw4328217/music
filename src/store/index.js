import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'
import search from './modules/search'
import toplistdetail from './modules/toplistdetail'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    main,
    toplistdetail,
    search
  }
})
