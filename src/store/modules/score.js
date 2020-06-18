const state = {
    score: 0
};

const getters = {
    overallScore: state => state.score
};

const actions = {
    updateScore({commit}, payload) {
        commit('updateScore',payload);
    }
};

const mutations = {
    updateScore(state, payload) {
        if(payload.reset) {
            state.score = 0;
        } else {
            state.score += payload.value;
        }
    }
};

export  default  {
    state,
    getters,
    actions,
    mutations
}