import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertTable: [{
      id: '',
      name: '',
      amount1: '',
      amount2: '',
      amount3: ''
    }]
  },
  mutations: {
    SHOW (state) {}
  }
})
