import { SET_FILENAME } from '../constants'

export default {
  namespaced: true,
  state: {
    filename: ''
  },
  mutations: {
    [SET_FILENAME](state, payload) {
      state.filename = payload
    }
  },
  actions: {
    [SET_FILENAME]({ commit }, payload) {
      return commit(SET_FILENAME, payload)
    }
  },
  getters: {
    filename: ({ filename }) => filename
  }
}
