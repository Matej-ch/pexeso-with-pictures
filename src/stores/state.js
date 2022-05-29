import {defineStore} from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            cards: [],
            cardVarietyCount: 15,
            flips: 0,
            score: 0
        }
    },
    getters: {
        varietyCount: (state) => state.cardVarietyCount,

        overallScore: (state) => state.score,

        allCards: (state) => state.cards,

        flipCount: (state) => state.flips
    },
    actions: {
        updateCardVariety(value) {
            this.cardVarietyCount = value;
        },
        updateScore(value, reset = false) {
            if (reset) {
                this.score = 0;
            } else {
                this.score += value;
            }
        },
        incrementFlips() {
            this.flips++;
        },
        resetFlipCount() {
            this.flips = 0;
        }
    }
})