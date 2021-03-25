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
    updateShowComments (state, post_id) {
      if (post_id != "refresh") {
        if (state.showComments.includes(post_id)) { // si le post._id existe déjà dans le tableau, on le retire
          let index = state.showComments.indexOf(post_id);
          if (index !== -1) {
            state.showComments.splice(index, 1);
          }
        } else {  // si le post._id n'est pas dedans, on l'ajoute
        state.showComments.push(post_id)}
      } else {
        state.showComments = [];
      }
    },
  },
  actions: {
  },
  modules: {
    account,
  }
})
