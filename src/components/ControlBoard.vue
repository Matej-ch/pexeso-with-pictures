<template>
    <div class="btns-container">
        <div>
            <button class="btn" @click="reset">Reset game</button>
            <button class="btn" @click="shuffle">Shuffle</button>
        </div>

        <div>
            <span class="info">How many different cards do you want: </span>
            <input type="number" min="1" max="50" :value=varietyCount ref="cardCountInput" class="input">
            <button class="btn" @click="pickNewSet">Pick</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "ControlBoard",
        computed: {
            ...mapGetters(['varietyCount'])
        },
        methods: {
            ...mapActions(['updateCardVariety']),
            reset: function () {
                this.$emit('reseted');
            },
            shuffle: function () {
                this.$emit('shuffled');
            },
            pickNewSet: function () {
                let input = this.$refs.cardCountInput;
                let val = input.value;
                let max = parseInt(input.getAttribute('max'));
                if(val > max) {
                    input.value = max;
                    this.updateCardVariety({count : max});
                } else {
                    this.updateCardVariety({count : parseInt(val)});
                }
                this.$emit('picked');
            }
        }
    }
</script>

<style scoped>
    .btns-container {
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        border-bottom: 2px solid gray;
        background-color: rgba(255,255,255,0.7);
        margin-bottom: 30px;

        box-shadow:
                0 0 10px #fff,            /* outer white */
                -10px 0 25px #7a007a,        /* outer left magenta */
                10px 10px 25px #006b6b;         /* outer right cyan */
    }

    .info {
        color: black;
        font-size: 1.2em;
        font-weight: bold;
    }

    .btn {
        backface-visibility: hidden;
        background-color: #0a0a0a;
        border: 2px solid black;
        border-radius: 4px;
        color: rgb(255, 255, 255);
        cursor: pointer;
        display: inline-block;
        font-weight: bold;
        letter-spacing: 0.1em;
        padding: 1em 2em;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.3s ease 0s;
        margin-left: 15px;
        margin-right: 15px;
    }

    .btn:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0 0.3rem 1rem;
        background-color: rgba(10, 10, 10, 0.8);
    }

    .input {
        padding: 1em 2em;
        border-radius: 4px;
        border: 2px solid black;
    }

    .input[type=number]::-webkit-inner-spin-button,
    .input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .input[type=number] {
        -moz-appearance: textfield;
    }
</style>