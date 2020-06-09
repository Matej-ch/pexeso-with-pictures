<template>
  <div id="app" class="container">
    <ScoreBoard :score=0 />

    <div class="cards-container">
      <Card v-for="card in Cards" :key="card.id"/>
    </div>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    ScoreBoard,
    Card
  },
  mounted: function() {
    this.cards = this.generateCards(20);
  },
  data: function() {
    return {
      cards: [],
    }
  },
  methods: {
    generateCards: function (objectCount) {
      console.log(objectCount);
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
