<template>
    <div class="scoreboard-section">
        <div>
            {{score}}
        </div>
        <div>
            <button>Reset game</button>
            <button>Shuffle</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ScoreBoard",
        props: {
            score: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style scoped>
    .scoreboard-section {

    }
</style>