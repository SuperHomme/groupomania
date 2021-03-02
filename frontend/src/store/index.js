import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showComments: [],
  },
  plugins: [createPersistedState()],
  mutations: {
    updateShowComments (state, showComment) {
      if (state.showComments.includes(showComment)) { // si le post._id (showComment) existe déjà dans le tableau, on le retire
        let index = state.showComments.indexOf(showComment);
        if (index !== -1) {
          state.showComments.splice(index, 1);
        }
      } else {  // si le post._id n'est pas dedans, on l'ajoute
      state.showComments.push(showComment)
      }
    },
  },
  actions: {
  },
  modules: {
    account,
  }
})
