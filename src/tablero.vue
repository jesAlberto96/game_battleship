<template>
  <div>
    <div class="container">
      <div id="containerSquares" class="grid grid-computer">
        <div v-for="index in 100" :id="index" :key="index" @click="revealSquare($event)"></div>
      </div>
      <div class="container-attempts">
        <p><strong>INTENTOS:</strong> {{ attempts }}</p>
        <p><strong>INTENTOS REALIZADOS:</strong> {{ attemptsMade }}</p>
      </div>
    </div>

    <modal class="modal-success" name="content-modal-success" @before-close="beforeClose">
        <div>
            <h4>¡GANASTE!</h4>
            <h2>{{ msgResult }}</h2>
			<button type="button" class="primary-button" @click="startAgain()">Comenzar de nuevo</button>
        </div>
    </modal>

    <modal class="modal-error" name="content-modal-error" @before-close="beforeClose">
        <div>
            <h4>¡PERDISTE!</h4>
            <h2>{{ msgResult }}</h2>
			<button type="button" class="primary-button" @click="startAgain()">Comenzar de nuevo</button>
        </div>
    </modal>
  </div>
</template>

<script>
export default {
	name: "app",
	props: ["attempts"],
	data() {
		return {
			isGameOver: false,
			msgResult: "",
			attemptsMade: 0,
			destroyerCount: 0,
			submarineCount: 0,
			cruiserCount: 0,
			battleshipCount: 0,
			carrierCount: 0,
			destroyerheavyCount: 0,
			submarineheavyCount: 0,
			cruiserheavyCount: 0,
			battleshipheavyCount: 0,
			carrierheavyCount: 0,
		};
	},

  	methods: {
		revealSquare(event) {
			let square = event.target;

			if (!square.classList.contains("boom")) {
				if (square.classList.contains("destroyer")) this.destroyerCount++;
				if (square.classList.contains("submarine")) this.submarineCount++;
				if (square.classList.contains("cruiser")) this.cruiserCount++;
				if (square.classList.contains("battleship")) this.battleshipCount++;
				if (square.classList.contains("carrier")) this.carrierCount++;
				if (square.classList.contains("destroyerheavy")) this.destroyerheavyCount++;
				if (square.classList.contains("submarineheavy")) this.submarineheavyCount++;
				if (square.classList.contains("cruiserheavy")) this.cruiserheavyCount++;
				if (square.classList.contains("battleshipheavy")) this.battleshipheavyCount++;
				if (square.classList.contains("carrierheavy")) this.carrierheavyCount++;
			}

			if (square.classList.contains("taken")) {
				if (!square.classList.contains("boom")) {
					this.attemptsMade++;
					this.notifyMsg("LE ATINASTE A UN BARCO!", "light-blue");
				}

				square.classList.add("boom");
			} else {
				if (!square.classList.contains("miss")) {
					this.attemptsMade++;
					this.notifyMsg("FALLASTE EL TIRO!", "blue-grey");
				}
				square.classList.add("miss");
			}

			this.checkForWins();
		},

		checkForWins() {
			if (this.destroyerCount === 2) {
				this.notifyMsg("HUNDISTE EL DESTROYER !!!", "light-green");
				this.destroyerCount = 10;
			}
			if (this.submarineCount === 3) {
				this.notifyMsg("HUNDISTE UN SUBMARINO !!!", "light-green");
				this.submarineCount = 10;
			}
			if (this.cruiserCount === 3) {
				this.notifyMsg("HUNDISTE UN CRUCERO !!!", "light-green");
				this.cruiserCount = 10;
			}
			if (this.battleshipCount === 4) {
				this.notifyMsg("HUNDISTE EL BARCO DE BATALLA !!!", "light-green");
				this.battleshipCount = 10;
			}
			if (this.carrierCount === 5) {
				this.notifyMsg("HUNDISTE EL TRANSPORTADOR !!!", "light-green");
				this.carrierCount = 10;
			}
			if (this.destroyerheavyCount === 2) {
				this.notifyMsg("HUNDISTE EL DESTROYER !!!", "light-green");
				this.destroyerheavyCount = 10;
			}
			if (this.submarineheavyCount === 3) {
				this.notifyMsg("HUNDISTE UN SUBMARINO !!!", "light-green");
				this.submarineheavyCount = 10;
			}
			if (this.cruiserheavyCount === 3) {
				this.notifyMsg("HUNDISTE EL CRUCERO !!!", "light-green");
				this.cruiserheavyCount = 10;
			}
			if (this.battleshipheavyCount === 4) {
				this.notifyMsg("HUNDISTE EL BARCO DE BATALLA !!!", "light-green");
				this.battleshipheavyCount = 10;
			}
			if (this.carrierheavyCount === 5) {
				this.notifyMsg("HUNDISTE EL TRANSPORTADOR !!!", "light-green");
				this.carrierheavyCount = 10;
			}

			if (this.attemptsMade === parseInt(this.attempts)) {
				this.showError();
				this.gameOver();
			}

			if (this.destroyerCount + this.submarineCount + this.cruiserCount + this.battleshipCount + this.carrierCount + this.destroyerheavyCount + this.submarineheavyCount + this.cruiserheavyCount + this.battleshipheavyCount + this.carrierheavyCount === 100) {
				this.showSuccess();
				this.gameOver();
			}
		},

		gameOver() {
			this.isGameOver = true;
		},

		showSuccess() {
			this.msgResult = "HUNDISTE TODOS LOS BARCOS !!";
			this.$modal.show('content-modal-success');
		},

		showError() {
			this.msgResult = "YA USASTE TODOS LOS INTENTOS !!";
			this.$modal.show('content-modal-error');
		},

		beforeClose (event) {
			if (this.isGameOver) {
				event.cancel();
			}
		},

		startAgain(){
			this.isGameOver = false;
			this.attemptsMade = 0;
			this.attemptsMade = 0;
			this.destroyerCount = 0;
			this.submarineCount = 0;
			this.cruiserCount = 0;
			this.battleshipCount = 0;
			this.carrierCount = 0;
			this.destroyerheavyCount = 0;
			this.submarineheavyCount = 0;
			this.cruiserheavyCount = 0;
			this.battleshipheavyCount = 0;
			this.carrierheavyCount = 0;
			this.$modal.hide('content-modal-error');
			this.$modal.hide('content-modal-success');
			let container_configuracion = document.querySelector(".container-configuracion");
			let container = document.querySelector(".container");
			let containerSquares = document.querySelectorAll("#containerSquares div");
			containerSquares.forEach(element => element.className = '');
			container_configuracion.style.display = 'grid';
			container.style.display = 'none';
		},

		notifyMsg(msg, color){
			notify({text: msg, theme: color});
		}
  	},
};
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
		font-family: "Quicksand", sans-serif;
	}

	.container {
		width: 100%;
		height: 100vh;
		display: none;
		place-items: center;
		background-color: #ffe4c4;

		.grid-computer {
			position: relative;
			top: 160px;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			width: 400px;
			height: 400px;
			display: flex;
			flex-wrap: wrap;
			background-color: #6b8e23;

			div {
				width: 40px;
				height: 40px;
				background-color: #0c1824;
				box-shadow: 0 0 0 2px #6b8e23;

				&:hover {
					background-color: $white;
				}
			}
		}

		.container-attempts {
			position: absolute;
			top: 100px;
			right: 680px;

			p {
				margin: 0;

				strong {
					font-size: -$sm;
					font-weight: bold;
					margin-bottom: 4px;
				}
			}
		}
	}

	.destroyer {
		background-color: orange;
	}

	.submarine {
		background-color: pink;
	}

	.cruiser {
		background-color: purple;
	}

	.battleship {
		background-color: aqua;
	}

	.carrier {
		background-color: green;
	}

	.destroyerheavy {
		background-color: orange;
	}

	.submarineheavy {
		background-color: pink;
	}

	.cruiserheavy {
		background-color: purple;
	}

	.battleshipheavy {
		background-color: aqua;
	}

	.carrierheavy {
		background-color: green;
	}

	.boom {
		background-color: #00cc88 !important;
	}

	.miss {
		background-color: #2573aa !important;
	}

	.modal-success{
		.vm--modal{
			background-color: $hospital-green;

			div{
				button{
					margin-top: 55px;
					background-color: #dd2c00;
				}
			}
		}
	}

	.modal-error{
		.vm--modal{
			background-color: #dd2c00;

			div{

				button{
					margin-top: 55px;
				}
			}
		}
	}

	.vm--modal{
		top: 157px !important;
		left: 566px !important;
		width: 405px !important;
		height: 405px !important;
		
		div{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 45px;
			color: $white;

			h2{
				text-align: center;
			}
		}
	}
</style>
