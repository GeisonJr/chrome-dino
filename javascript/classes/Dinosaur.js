export class Dinosaur {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `./assets/dinosaurs/dinosaur${0}.bmp`;
		
		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `dinosaur${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: 50 - (this.i * (50 / this.quantity)), // Coodinate X
			y: this.screen.height - this.dimensions.height // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			enable: true,
			alive: true,
			color: {
				enable: false,
				element: "#0F0",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Jump params */
		this.jump = {

			enable: true,
			jumping: false,
			jump: false,

			gravity: 1.2,
			friction: 0.9,
			velocity: 0
		};

		this.score = {
			distance: 0
		};
	};

	add() {
		return {
			coordinates: this.coordinates,
			dimensions: this.dimensions,
			collision: this.collision,
			quantity: this.quantity,
			score: this.score,
			jump: this.jump,
			id: this.id,
		};
	};
};