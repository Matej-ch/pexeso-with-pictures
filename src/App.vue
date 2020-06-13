<template>
  <div id="app" class="container">
    <ScoreBoard :score=0 />

    <div class="cards-container">
      <Card v-for="card in cards" :key="card.id" :cardData="card"/>
    </div>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
import Card from './components/Card'
import cardsArray from './cards'

export default {
  name: 'App',
  components: {
    ScoreBoard,
    Card
  },
  mounted: function() {

    let cards = this.getRandomCards(this.carVarietyCount);

    this.generateCardsPairs(cards);

    this.shuffle();
  },
  data: function() {
    return {
      cards: [],
      carVarietyCount: 10
    }
  },
  methods: {
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

    shuffle: function () {
      let currentIndex = this.cards.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryValue;
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

  }
</style>
