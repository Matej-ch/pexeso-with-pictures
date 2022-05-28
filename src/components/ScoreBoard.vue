<template>
    <div class="scoreboard-section">
        <div>
            Score: {{gameState.overallScore}}
        </div>
    </div>
</template>

<script setup>

import {useGameStore} from "../stores/state";

const gameState = useGameStore();

</script>

<style scoped lang="scss">
    .scoreboard-section {
        padding: 30px 15px 15px 15px;
        font-size: 3em;
        color: whitesmoke;
        font-weight: bold;
    }
</style>