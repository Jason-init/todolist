import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 0
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    initId (state, id) {
      state.nextId = id
    },
    setInputValue (state, newValue) {
      state.inputValue = newValue
    },
    addToList (state, info) {
      state.list.push({
        id: state.nextId,
        info: info,
        done: false
      })
      state.nextId++
      state.inputValue = ''
    },
    deleteFromList (state, id) {
      const index = state.list.findIndex(item => {
        return item.id === id
      })
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    updateStatus (state, params) {
      const index = state.list.findIndex(item => {
        return item.id === params.id
      })

      if (index !== -1) { state.list[index].done = params.status }
    },
    deleteDones (state) {
      console.log('!!!')

      state.list = state.list.filter(item => {
        return item.done === false
      })
    }
  },
  actions: {
    getList (context) {
      axios.get('list.json').then(({ data }) => {
        context.commit('initList', data)
        context.commit('initId', data[data.length - 1].id + 1)
      })
    }
  },
  getters: {
    getUndoneCount (state) {
      return state.list.filter(item => {
        return item.done === false
      }).length
    }
  }
})
