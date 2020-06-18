const state = {
    cards: [],
    cardVarietyCount: 15,
    flipCount: 0,
};

const getters = {
    allCards: state => {
        return state.cards;
    },
    varietyCount: state => {
        return state.cardVarietyCount;
    },
    flipCount: state => {
        return state.flipCount
    }
};

const actions = {
    updateCardVariety({commit}, payload) {
        commit('updateCardVariety',payload);
    },
    incrementFlipsThisTurn({commit}) {
        commit('incrementFlipsThisTurn');
    },
    resetFlipCount({commit}) {
        commit('resetFlipCount');
    }
};

const mutations = {
    updateCardVariety(state, payload) {
        state.cardVarietyCount = payload.count;
    },
    incrementFlipsThisTurn(state) {
        state.flipCount++;
    },
    resetFlipCount(state) {
        state.flipCount = 0;
    }
};

export  default  {
    state,
    getters,
    actions,
    mutations
}