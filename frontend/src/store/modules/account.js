const state = { // on met les valeur à null par défaut
    userId: null,
    token: null
};

const mutations = {
    login(state, loginData) { // on reçoit loginData de loginUser.vue, l'objet contenant userId et token
        state.userId = loginData.userId;
        state.token = loginData.token;
    },
    logout(state) {
        state.userId = null;
        state.token = null;
    },
};

export default {
    state,
    mutations
}