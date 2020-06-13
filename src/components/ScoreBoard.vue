<template>
    <div class="scoreboard-section">
        <div>
            Score: {{score}}
        </div>

        <div>
            How many different cards do you want <input type="number" min="1" max="50" value="20">
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