import Vuex from 'vuex'
import Vue from 'vue'
import score from '@/store/modules/score'
import cards from "@/store/modules/cards"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        score,
        cards
    }
})