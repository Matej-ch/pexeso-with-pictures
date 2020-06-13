<template>
    <div class="card">
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
        }
    }
</script>

<style scoped>
    .card {

    }
</style>