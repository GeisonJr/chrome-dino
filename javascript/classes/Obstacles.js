export class Cactus {
	constructor(screen, i, quantity, game) {

		const image = new Image();
		image.src = `./assets/obstacles/cacti/cactus${i}.bmp`;

		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `cactus${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		}

		/* Coordinates params */
		if (this.i === 0) {
			this.coordinates = {
				x: this.screen.width + (this.i * (this.screen.width / (this.quantity * .5))), // Coodinate X
				// x: this.screen.width + 500 + ((Math.random() * 200) - 100), // Coodinate X
				y: this.screen.height - (this.dimensions.height + 3) // Coodinate Y
			};
		} else {
			this.coordinates = {
				x: this.screen.width + (this.i * (this.screen.width / (this.quantity))), // Coodinate X
				// x: game.state.obstacles.cacti[`cactus${this.i}`].coordinates.x + this.screen.width + 500 + ((Math.random() * 200) - 100), // Coodinate X
				y: this.screen.height - (this.dimensions.height + 3) // Coodinate Y
			};
		}

		/* Collison params */
		this.collision = {
			color: {
				enable: false,
				element: "#F00",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */
		this.speed = {
			acceleration: 0.0005,
			velocity: 10
		};
	};

	add() {
		return {
			coordinates: this.coordinates,
			dimensions: this.dimensions,
			collision: this.collision,
			speed: this.speed,
			id: this.id
		};
	};
}