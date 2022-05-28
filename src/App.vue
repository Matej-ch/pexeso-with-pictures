<template>
    <div id="app" class="container">
        <ScoreBoard/>

        <ControlBoard @reseted="reset" @shuffled="shuffle" @picked="pickNewSet"/>

        <div class="pyro" v-show="fireworks">
            <div class="before"></div>
            <div class="after"></div>
        </div>

        <transition-group name="show-cards" tag="div" class="cards-container">
            <Card v-for="card in cards" :key="card.id" :cardData="card" @flipped="flipCard"/>
        </transition-group>

    </div>
</template>

<script setup>
import ScoreBoard from './components/ScoreBoard.vue'
import ControlBoard from "./components/ControlBoard.vue";
import Card from './components/Card.vue'
import cardsArray from './cards'
import {ref, onMounted} from "vue"
import {useGameStore} from "./stores/state";

const gameState = useGameStore();
const cards = ref([]);
const fireworks = ref(false);
const firstFlipID = ref(null);
const firstFlipMatchKey = ref(null);

onMounted(() => {

    let cards = getRandomCards(gameState.varietyCount);

    generateCardsPairs(cards);

    shuffleCards();
});

function getRandomCards(count) {
    let cards = new Array(count);
    let len = cardsArray.length;
    let taken = new Array(len);

    while (count--) {
        let x = Math.floor(Math.random() * len);
        cards[count] = cardsArray[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return cards;
}

function generateCardsPairs(localCards) {
    for (const card of localCards) {
        let name = card.src.split('.')[0];
        const firstCard = {
            matchKey: name,
            isFlipped: false,
            isMatched: false,
            isIgnored: false,
            id: `${name}-a`,
            img: `${card.src}`,
        };

        cards.value.push(firstCard);

        const secondCard = {...firstCard};
        secondCard.id = `${name}-b`;

        cards.value.push(secondCard);
    }
}

function shuffleCards() {
    let currentIndex = cards.value.length, temp, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temp = cards.value[currentIndex];

        cards.value[currentIndex] = cards.value[randomIndex];

        cards.value[randomIndex] = temp;
    }
}

function shuffle() {
    shuffleCards();
}

function flipCard(cardID) {
    const flippedCard = cards.value.find(obj => obj.id === cardID);

    if (flippedCard.isFlipped) {
        return;
    }

    gameState.incrementFlips();

    if (parseInt(gameState.flipCount) === 1) {
        flipFirst(flippedCard);
    }

    if (parseInt(gameState.flipCount) === 2) {
        flipSecond(flippedCard);
    }
}

function flipFirst(card) {
    showCard(card.id);

    firstFlipID.value = card.id;
    firstFlipMatchKey.value = card.matchKey
}

function flipSecond(card) {
    showCard(card.id);
    checkMatch(card);
}

function showCard(cardID) {
    cards.value = cards.value.map(card => (card.id === cardID && !card.isIgnored) ? {
        ...card,
        isFlipped: !card.isFlipped
    } : card);
}

function checkFinishingMove() {
    const isIgnored = (card) => card.isIgnored;

    if (cards.value.every(isIgnored)) {
        cards.value = [];
        fireworks.value = true;
    }
}

function reset() {
    cards.value = [];

    let localCards = getRandomCards(gameState.varietyCount);

    generateCardsPairs(localCards);

    shuffleCards();

    gameState.resetFlipCount();
    firstFlipID.value = null;
    firstFlipMatchKey.value = null;
    gameState.updateScore(0, true);
    fireworks.value = false;
}

function pickNewSet() {
    cards.value = [];

    let localCards = getRandomCards(gameState.varietyCount);

    generateCardsPairs(localCards);

    shuffleCards();

    gameState.resetFlipCount();
    firstFlipID.value = null;
    firstFlipMatchKey.value = null;
    gameState.updateScore(0, true);
    fireworks.value = false;
}

function checkMatch(card) {
    setTimeout(() => {
        if (card.matchKey === firstFlipMatchKey.value) {
            // Match!
            gameState.resetFlipCount();

            this.cards = this.cards.map(item => [card.id, firstFlipID.value].includes(item.id) ? {
                ...item,
                isMatched: true,
                isIgnored: true
            } : item);

            gameState.updateScore(1);

            setTimeout(() => {
                checkFinishingMove();
            }, 500);

        } else {
            // Not a match
            showCard(card.id);
            showCard(firstFlipID.value);
            gameState.resetFlipCount();
        }
    }, 850);
}
</script>

<style lang="scss">

@import './assets/styles/main.scss';

.container {
    overflow: auto;
    height: 100vh;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    background: radial-gradient(black 15%, transparent 16%) 0 0,
    radial-gradient(black 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
    background-color: #141414;
    background-size: 16px 16px;
}

.cards-container {
    display: flex;
    flex-flow: wrap;
    padding: 15px 10px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    justify-content: center;
}

.show-cards-enter-active, .show-cards-leave-active {
    transition: opacity 1s;
}

.show-cards-enter, .show-cards-leave-to {
    opacity: 0;
}

.show-cards-move {
    transition: opacity 1s;
}
</style>
