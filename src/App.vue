<template>
  <div id="app" class="container">
    <ScoreBoard :score=0 />

    <div>
      <div>
        How many different cards do you want <input type="number" min="1" max="50" value="20" ref="cardCountInput">
        <button @click="pickNewSet">Pick</button>
      </div>
      <button @click="reset">Reset game</button>
      <button @click="shuffle">Shuffle</button>
    </div>

    <div class="cards-container">
      <Card v-for="card in cards" :key="card.id" :cardData="card"/>
    </div>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
import Card from './components/Card'
import cardsArray from './cards'
import Vue from 'vue'

export default {
  name: 'App',
  components: {
    ScoreBoard,
    Card
  },
  mounted: function() {

    let cards = this.getRandomCards(this.carVarietyCount);

    this.generateCardsPairs(cards);

    this.shuffleCards();
  },
  data: function() {
    return {
      cards: [],
      carVarietyCount: 10
    }
  },
  methods: {
    reset: function() {
      this.cards = [];

      let cards = this.getRandomCards(this.carVarietyCount);

      this.generateCardsPairs(cards);

      this.shuffleCards();
    },
    shuffle: function() {

      this.shuffleCards();

    },
    pickNewSet: function() {
      this.cards = [];

      let cards = this.getRandomCards(this.$refs.cardCountInput.value);

      this.generateCardsPairs(cards);

      this.shuffleCards();
    },
    generateCardsPairs: function (cards) {

      for (const card of cards) {
        let name = card.src.split('.')[0];
        const firstCard = {
          matchKey: name,
          flipped: false,
          matched: false,
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
  .container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
    row-gap: 10px;
    column-gap:80px;
    padding: 15px;
  }
</style>
