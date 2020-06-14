<template>
    <div class="card" :class="cardClasses" @click="flipCard">
        <div class="front"></div>
        <div class="back"></div>
        <img :src="require('@/assets/' + cardImage + '')" alt="" class="image" style="max-width: 200px;">
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            cardData: {
                type: Object,
            },
        },
        data() {
            return {
                cardImage: this.cardData.img
            }
        },
        computed: {
            cardClasses() {
                return  {
                    'flipped': this.cardData.isFlipped,
                    'matched': this.cardData.isMatched,
                };
            },
        },
        methods: {
            flipCard: function () {
                this.$emit('flipped', this.cardData.id);
            }
        }
    }
</script>

<style scoped>
    .card {
        max-width: 100%;
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .flipped {

    }

    .matched {

    }
</style>