export class Cloud {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `./assets/scenarios/clouds/cloud${0}.bmp`; // png, bmp

		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `scen${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: this.i * ((this.screen.width + this.image.width) / this.quantity), // Coodinate X
			y: Math.floor(Math.random() * (screen.height / 4))// Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: false,
				element: "#0F0",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */
		this.speed = {
			acceleration: 0.0004,
			velocity: 0
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
};

export class Mountain {
	constructor(screen, i, quantity, layer) {

		const image = new Image();
		image.src = `./assets/scenarios/mountains/mountain${i}.bmp`;

		/* Render params */
		// this.quantity = quantity;
		// this.screen = screen;
		this.layer = layer;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `scen${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: (this.i === 0 || this.i === 2 || this.i === 4 ? 0 : 1) * this.dimensions.width, // Coodinate X
			y: 0 // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: false,
				element: "#FFF",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */

		this.speed = {
			acceleration: 0.0005,
			velocity: this.layer / 10
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
};

export class Ground {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `./assets/scenarios/grounds/ground${0}.bmp`;

		/* Render params */
		// this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `scen${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width / 2, // Width -> size image
			height: this.image.height / 2 // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: this.i * this.dimensions.width, // Coodinate X
			y: this.screen.height - this.dimensions.height // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: true,
				element: "#FFF",
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
};