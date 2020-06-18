import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    id: 0
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    initId (state, id) {
      state.id = id
    },
    setInputValue (state, newValue) {
      state.inputValue = newValue
    },
    addToList (state, info) {
      state.list.push({
        id: state.id,
        info: info,
        done: false
      })
      state.id++
      state.inputValue = ''
    }
  },
  actions: {
    getList (context) {
      axios.get('list.json').then(({ data }) => {
        context.commit('initList', data)
        context.commit('initId', data[data.length - 1].id + 1)
      })
    }
  }
})
