<template>
  <div id="app" class="container">
    <ScoreBoard :score=score />

    <ControlBoard  @reseted="reset" @shuffled="shuffle" @picked="pickNewSet"/>

    <div class="cards-container">
      <Card v-for="card in cards" :key="card.id" :cardData="card" @flipped="flipCard"/>
    </div>
  </div>
</template>

<script>
  import ScoreBoard from './components/ScoreBoard.vue'
  import Card from './components/Card'
  import cardsArray from './cards'
  import Vue from 'vue'
  import ControlBoard from "@/components/ControlBoard";

  export default {
  name: 'App',
  components: {
    ScoreBoard,
    Card,
    ControlBoard
  },
  mounted: function() {

    let cards = this.getRandomCards(this.carVarietyCount);

    this.generateCardsPairs(cards);

    this.shuffleCards();
  },
  data: function() {
    return {
      cards: [],
      carVarietyCount: 10,
      flipCount: 0,
      firstFlipID: null,
      firstFlipMatchKey: null,
      score: 0,
    }
  },
  methods: {
    incrementFlipsThisTurn() {
      this.flipCount++;
    },
    flipCard: function(cardID) {

      const flippedCard = this.cards.find(obj => obj.id === cardID);

      if (flippedCard.isFlipped) {
        return;
      }

      this.incrementFlipsThisTurn();

      if(this.flipCount === 1) {
        this.flipFirst(flippedCard);
      }

      if(this.flipCount === 2) {
        this.flipSecond(flippedCard);
      }
    },

    flipFirst: function(card) {

      this.showCard(card.id);

      this.firstFlipID = card.id;
      this.firstFlipMatchKey = card.matchKey;
    },

    flipSecond: function(card) {

      this.showCard(card.id);
      this.checkMatch(card);
    },

    showCard: function (id) {
      this.cards = this.cards.map(card => card.id === id ? {...card, isFlipped: !card.isFlipped} : card);
    },

    checkMatch: function (card) {
      setTimeout(() => {
        if (card.matchKey === this.firstFlipMatchKey) {
          // Match!
          // reset flips counter
          this.flipCount = 0;
          // update the 2 cards 'matched' prop

          this.cards = this.cards.map(item => [card.id, this.firstFlipID].includes(item.id) ? { ...item, isMatched: true } : item );
          this.score++;
        } else {
          // Not a match
          // Turn both cards back face down
          this.showCard(card.id);
          this.showCard(this.firstFlipID);
          this.flipCount = 0;
        }
      }, 1000);
    },

    reset: function() {
      this.cards = [];

      let cards = this.getRandomCards(this.carVarietyCount);

      this.generateCardsPairs(cards);

      this.shuffleCards();

      this.flipCount = 0;
      this.firstFlipID = null;
      this.firstFlipMatchKey = null;
      this.score= 0;

    },
    shuffle: function() {
      this.shuffleCards();
    },
    pickNewSet: function(value) {
      this.cards = [];

      let cards = this.getRandomCards(value);

      this.generateCardsPairs(cards);

      this.shuffleCards();

      this.flipCount = 0;
      this.firstFlipID = null;
      this.firstFlipMatchKey = null;
      this.score= 0;
    },
    generateCardsPairs: function (cards) {

      for (const card of cards) {
        let name = card.src.split('.')[0];
        const firstCard = {
          matchKey: name,
          isFlipped: false,
          isMatched: false,
          id: `${name}-a`,
          img: `${card.src}`,
        };

        this.cards.push(firstCard);

        const secondCard = { ...firstCard };
        secondCard.id = `${name}-b`;

        this.cards.push(secondCard);
      }
    },

    getRandomCards: function(n) {
      let cards = new Array(n);
      let len = cardsArray.length;
      let taken = new Array(len);

      while (n--) {
        let x = Math.floor(Math.random() * len);
        cards[n] = cardsArray[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }

      return cards;
    },

    shuffleCards: function () {
      let currentIndex = this.cards.length, temp, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temp = this.cards[currentIndex];
        Vue.set(this.cards,currentIndex,this.cards[randomIndex]);
        Vue.set(this.cards,randomIndex,temp);
      }
    }
  }
}
</script>

<style>

  @import './assets/styles/main.css';

  .container {
    overflow: auto;
    height: 100vh;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    background:
            radial-gradient(black 15%, transparent 16%) 0 0,
            radial-gradient(black 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(255,255,255,0.1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(255,255,255,0.1) 15%, transparent 20%) 8px 9px;
    background-color:#141414;
    background-size:16px 16px;
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

</style>
