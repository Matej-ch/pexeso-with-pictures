<template>
    <div class="scoreboard-section">
        <div>
            Score: {{score}}
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