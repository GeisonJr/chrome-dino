export default function createGame() {

	const state = {
		dinosaurs: {},
		obstacles: {
			cacti: {}
		},
		scenarios: {
			clouds: {},
			mountains: {},
			grounds: {},
		},
		scoreboard: {
			distance: 0,
			bestDistance: 0,
			lastDistance: 0,

			score: 0,
			bestScore: 0,
			lastScore: 0
		},
		speed: {
			obstacles: 0
		},
		population: {
			default: 0,
			current: 0,
		},
		gameover: false
	};

	const debug = {
		add: false, // Add messages
		debugAdd: (func, id) => {
			if (debug.add) {
				console.warn(`${func} -> '${id}' has been added`);
			}
		},

		move: false, // Move messages
		debugMove: (message) => {
			if (debug.move) {
				console.warn(message);
			}
		},

		remove: false, // Remove messages
		debugRemove: (func, id) => {
			if (debug.remove) {
				console.warn(`${func} -> '${id}' has been removed`);
			}
		},

		collision: false, // Collision messages
		debugCollision: (message) => {
			if (debug.collision) {
				console.warn(message);
			}
		},
	};

	// Dino
	function addDino(command) {
		const { coordinates, dimensions, quantity, collision, score, jump, id } = command;
		state.dinosaurs[id] = { coordinates, dimensions, quantity, collision, score, jump };
		state.population.default = Object.keys(state.dinosaurs).length;
		state.population.current = state.population.default;
		debug.debugAdd("game.addDino()", id);
	};
	function removeDino(command) {
		const { id } = command;
		state.dinosaurs[id].collision.alive = false;
		state.population.current--;
		debug.debugRemove("game.debugRemove()", id);
	};

	// Cloud
	function addCloud(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.clouds[id] = { coordinates, dimensions, collision, speed };
		debug.debugAdd("game.addCloud()", id);
	};

	// Mountain1
	function addMountain(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.mountains[id] = { coordinates, dimensions, collision, speed };
		debug.debugAdd("game.addMountain()", id);
	};

	// Ground
	function addGround(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.grounds[id] = { coordinates, dimensions, collision, speed };
		debug.debugAdd("game.addGround()", id);
	};

	// Obstacle
	function addCactus(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.obstacles.cacti[id] = { coordinates, dimensions, collision, speed };
		debug.debugAdd("game.addCactus()", id);
	};

	function moveDino(command) {
		const { dinoId, keyPressed } = command;
		
		const Moves = {
			ArrowUp(dino) {
				dino.jump.jump = true;
				debug.gameover = true;
				return "Up";
			},
			ArrowDown(dino) {
				return "Down";
			}
		};
		
		const dino = state.dinosaurs[dinoId];
		const move = Moves[keyPressed];
		
		debug.debugMove(`game.moveDino() -> Moving '${dinoId}' with '${keyPressed}'`);
		if (dino && move) {
			const direction = move(dino);
			debug.debugMove(`game.moveDino().${keyPressed}() -> '${dinoId}' moved to '${direction}'`);
			checkCollision(dinoId);
		} else if (!dino) {
			debug.debugMove(`game.moveDino() -> '${dinoId}' is not a valid dino`);
		} else if (!move) {
			debug.debugMove(`game.moveDino() -> '${keyPressed}' is not a valid movement`);
		};
	};

	function checkCollision(dinoId) {
		for (const obstacleId in state.obstacles.cacti) {
			const obstacle = state.obstacles.cacti[obstacleId];
			const dino = state.dinosaurs[dinoId];

			if (dino.coordinates.x < obstacle.coordinates.x + obstacle.dimensions.width && dino.coordinates.x + dino.dimensions.width > obstacle.coordinates.x) {
				if (dino.coordinates.y < obstacle.coordinates.y + obstacle.dimensions.height && dino.coordinates.y + dino.dimensions.height > obstacle.coordinates.y) {
					removeDino({ id: dinoId });
					debug.debugCollision(`game.checkCollision() -> '${dinoId}' collided with '${obstacleId}'`);
				};
			};
		};
	};

	return {
		state,
		addCactus,
		addDino, removeDino,
		addCloud, addMountain, addGround,
		checkCollision, moveDino
	};
};