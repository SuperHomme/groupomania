const state = { // on met les valeur à null par défaut
    userId: null,
    token: null,
    role: null
};

const mutations = {
    login(state, loginData) { // on reçoit loginData de loginUser.vue, l'objet contenant userId et token
        state.userId = loginData.userId;
        state.token = loginData.token;
        state.role = loginData.role;
    },
    logout(state) {
        state.userId = null;
        state.token = null;
        state.role = null;
    },
};

export default {
    state,
    mutations
}