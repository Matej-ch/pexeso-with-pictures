<template>
    <div class="scoreboard-section">
        <div>
            Score: {{overallScore}}
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "ScoreBoard",
        computed: mapGetters(['overallScore'])
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