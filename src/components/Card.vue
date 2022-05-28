<template>
    <div class="card" :class="cardClasses" @click="flipCard">
        <div class="inner">
            <div class="front" :style="'background: linear-gradient(45deg,#222,' + gradient + ')'"></div>
            <div class="back" :data-matchkey="cardData.matchKey">
                <img :src="imgUrl" alt="" class="image" style="max-width: 200px;">
            </div>
        </div>

    </div>
</template>

<script setup>
import {computed, ref} from 'vue'

const imgUrl = new URL('../assets/101-gym-guy.svg', import.meta.url).href

const props = defineProps({
    cardData: Object
})

const emit = defineEmits(['flipped'])

const cardImage = ref(props.cardData.img);
const gradient = ref(getGradientColor);

function flipCard() {
    emit('flipped', props.cardData.id);
}

function getGradientColor() {
    let colors = ['#1b4f72', '#21618c', '#2874a6', '#2e86c1', '#3498db', '#5dade2', '#85c1e9'];

    return colors[Math.floor(Math.random() * colors.length)];
}

const cardClasses = computed(() => {
    return {
        'flipped': props.cardData.isFlipped,
        'matched': props.cardData.isMatched,
    }
})

</script>

<style scoped lang="scss">
.card {
    max-width: 100%;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 15px;
    cursor: pointer;
}

.flipped .inner {
    transform: rotateY(180deg);
}

.matched .inner .image {
    opacity: 0.2;
}

.matched .inner {
    transform: scale(0.9);
}

.matched .inner .front {
    background: linear-gradient(45deg, #808080, #e3e3e3) !important;
}

.matched .inner .front::before {
    content: "X";
    font-weight: bold;
    font-size: 8em;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
}

.inner, .front, .back {
    border-radius: 5px;
    width: 100%;
    height: 100%;
}

.front, .back {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: black;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.front {
    /*background: linear-gradient(45deg, #222, rgb(200, 39, 92));*/
    z-index: 2;
}

.back {
    align-items: center;
    display: flex;
    justify-content: center;
    transform: rotateY(180deg);
}

.image {
    display: block;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>