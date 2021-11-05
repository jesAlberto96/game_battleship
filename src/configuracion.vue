<template>
    <div>
        <div class="container-configuracion">
            <div class="form-container">
                <form class="form">
                    <div>
                        <div v-if="!showSelectDificultad">
                            <label for="" class="label">Número de intentos</label>
                            <input type="text" name="" class="input" @input="setAttempts($event)" v-model="attempts">
                        </div>
                        <div v-else>
                            <label for="" class="label">Dificultad</label>
                            <select name="" class="select" @input="setAttempts($event)">
                                <option hidden selected></option>
                                <option value="9999">Fácil</option>
                                <option value="100">Medio</option>
                                <option value="50">Difícil</option>
                            </select>
                        </div>
                        <div>
                            <label for="" class="label">Con dificultad<input type="checkbox" name="" @input="showSelect($event)"></label>
                        </div>
                        
                        <button type="button" id="start" class="primary-button" :disabled="attempts === ''" @click="initTablero()">Start game</button>
                    </div>
                </form>
            </div>
        </div>

        <tablero v-bind:attempts="attempts"></tablero>

        <notifications width="20%"></notifications>
    </div>
</template>

<script>
const width = 10;
import tablero from './tablero.vue'

export default {
    components: {
        'tablero': tablero
    },
    name: 'app',
    data () {
        return {
            attempts: "",
            showSelectDificultad: false,
            shipArray: [
                {
                    name: 'destroyer',
                    directions: [
                        [0, 1],
                        [0, width],
                    ]
                },
                {
                    name: 'submarine',
                    directions: [
                        [0, 1, 2],
                        [0, width, width*2],
                    ]
                },
                {
                    name: 'cruiser',
                    directions: [
                        [0, 1, 2],
                        [0, width, width*2],
                    ]
                },
                {
                    name: 'battleship',
                    directions: [
                        [0, 1, 2, 3],
                        [0, width, width*2, width*3],
                    ]
                },
                {
                    name: 'carrier',
                    directions: [
                        [0, 1, 2, 3, 4],
                        [0, width, width*2, width*3, width*4],
                    ]
                },
                {
                    name: 'destroyerheavy',
                    directions: [
                        [0, 1],
                        [0, width],
                    ]
                },
                {
                    name: 'submarineheavy',
                    directions: [
                        [0, 1, 2],
                        [0, width, width*2],
                    ]
                },
                {
                    name: 'cruiserheavy',
                    directions: [
                        [0, 1, 2],
                        [0, width, width*2],
                    ]
                },
                {
                    name: 'battleshipheavy',
                    directions: [
                        [0, 1, 2, 3],
                        [0, width, width*2, width*3],
                    ]
                },
                {
                    name: 'carrierheavy',
                    directions: [
                        [0, 1, 2, 3, 4],
                        [0, width, width*2, width*3, width*4],
                    ]
                },
            ]
        }
    },
    methods:{
        initTablero() {
            let container_configuracion = document.querySelector(".container-configuracion");
            let container = document.querySelector(".container");
            container_configuracion.style.display = 'none';
            container.style.display = 'block';
            this.createBoard();
        },
        createBoard() {
            this.generate(this.shipArray[0]);
            this.generate(this.shipArray[1]);
            this.generate(this.shipArray[2]);
            this.generate(this.shipArray[3]);
            this.generate(this.shipArray[4]);
            this.generate(this.shipArray[5]);
            this.generate(this.shipArray[6]);
            this.generate(this.shipArray[7]);
            this.generate(this.shipArray[8]);
            this.generate(this.shipArray[9]);
        },
        generate(ship){
            let direction = 0;
            let randomDirection = Math.floor(Math.random() * ship.directions.length);
            let current = ship.directions[randomDirection];
            let computerSquares = document.querySelectorAll(".grid-computer div");
            if (randomDirection === 0) direction = 1;
            if (randomDirection === 1) direction = 10;
            let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));
            
            //busca un div aleatorio y verificar si la ubicación ya se esta usando
            const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken"));
            const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
            const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);
            
            if (!isTaken && !isAtRightEdge && !isAtLeftEdge){
                current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));
            } else {
                this.generate(ship);
            }
        },
        showSelect(){
            this.attempts = "";
            this.showSelectDificultad = !this.showSelectDificultad;
        },
        setAttempts(event){
            let value = event.target.value;
            if (this.isNumeric(value)){
                this.attempts = value;
            } else {
                this.attempts = "";
            }
        },
        isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
    }
}
</script>

<style lang="scss">
    $white: #FFFFFF;
    $black: #000000;
    $very-light-pink: #C7C7C7;
    $text-input-field: #F7F7F7;
    $hospital-green: #73d680;
    $sm: 14px;
    $md: 16px;
    $lg: 18px;

    body {
        margin: 0;
        font-family: 'Quicksand', sans-serif;

        .container-configuracion {
            width: 100%;
            height: 100vh;
            display: grid;
            place-items: center;
            background-color: #ffe4c4;

            .form-container {
                display: grid;
                grid-template-rows: auto 1fr auto;
                width: 300px;

                .form {
                    display: flex;
                    flex-direction: column;

                    div {
                        display: flex;
                        flex-direction: column;

                        .label {
                            font-size: var(--sm);
                            font-weight: bold;
                            margin-bottom: 4px;
                        }
                        .input, .select {
                            background-color: $text-input-field;
                            border: none;
                            border-radius: 8px;
                            height: 30px;
                            font-size: $md;
                            padding: 6px;
                            margin-bottom: 12px;
                        }

                        .select{
                            height: 50px;
                        }

                        .primary-button:disabled {
                            cursor: no-drop;
                        }   
                    }
                }
            }
        }

        .primary-button {
            background-color: $hospital-green;
            border-radius: 8px;
            border: none;
            color: $white;
            width: 100%;
            cursor: pointer;
            font-size: $md;
            font-weight: bold;
            height: 50px;
            margin-top: 14px;
            margin-bottom: 30px;
        }
    }
</style>