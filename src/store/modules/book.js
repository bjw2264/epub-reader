export default {
  state: {
    a: 123
  },
  mutations: {
    'SET_A': (state, payload) => {
      console.log(payload)
      // return {...state, ...payload}
      state = Object.assign(state, payload)
    }
  },
  actions: {
    setA: ({commit}, payload) => {
      commit('SET_A', payload)
    }
  }
}