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
        padding: 30px 15px 15px 15px;
        font-size: 3em;
        color: whitesmoke;
        font-weight: bold;
    }
</style>