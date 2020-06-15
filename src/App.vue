<template>
  <div id="app" class="container">
    <ScoreBoard :score=0 />

    <div class="btns-container">
      <div>
        <button class="btn" @click="reset">Reset game</button>
        <button class="btn" @click="shuffle">Shuffle</button>
      </div>

      <div>
        <span class="info">How many different cards do you want: </span> <input type="number" min="1" max="50" value="20" ref="cardCountInput" class="input">
        <button class="btn" @click="pickNewSet">Pick</button>
      </div>
    </div>

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

    flipCard: function(cardID) {
      console.log(cardID);

      const flippedCard = this.cards.find(obj => obj.id === cardID);

      if (flippedCard.isFlipped) {
        return;
      }
    },

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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
    row-gap: 10px;
    column-gap:80px;
    padding: 15px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
  }

  .btns-container {
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 2px solid gray;
    background-color: rgba(255,255,255,0.7);
    margin-bottom: 30px;

    box-shadow:
            0 0 10px #fff,            /* outer white */
            -10px 0 25px #7a007a,        /* outer left magenta */
            10px 10px 25px #006b6b;         /* outer right cyan */
  }

  .info {
    color: black;
    font-size: 1.2em;
    font-weight: bold;
  }

  .btn {
    backface-visibility: hidden;
    background-color: #0a0a0a;
    border: 2px solid black;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease 0s;
    margin-left: 15px;
    margin-right: 15px;
  }

  .btn:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0 0.3rem 1rem;
    background-color: rgba(10, 10, 10, 0.8);
  }

  .input {
    padding: 1em 2em;
    border-radius: 4px;
    border: 2px solid black;
  }

  .input[type=number]::-webkit-inner-spin-button,
  .input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input[type=number] {
    -moz-appearance: textfield;
  }

</style>
