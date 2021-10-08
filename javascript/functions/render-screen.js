export default function renderScreen(screen, terminal, game, requestAnimationFrame) {
	const context_terminal = terminal.getContext("2d");
	const context_screen = screen.getContext("2d");

	/* Scenario */
	for (const id in game.state.scenarios.clouds) { // Clouds
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.clouds[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		coordinates.x -= speed.velocity;
		if (coordinates.x + dimensions.width < 0) {
			coordinates.x = screen.width - speed.velocity;
			coordinates.y = Math.floor(Math.random() * (screen.height / 4)); // Usar apenas 1/4 da tela, de ciam para baixo
		}

		objColor(coordinates, dimensions, color);
		objImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.mountains) { // Mountains
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.mountains[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		coordinates.x -= speed.velocity;
		if (id === id.substr(0, 4) + "1" || id === id.substr(0, 4) + "3" || id === id.substr(0, 4) + "5") {
			if (coordinates.x + dimensions.width < 0) {
				coordinates.x = dimensions.width - speed.velocity;
			}
		} else {
			if (coordinates.x + dimensions.width < 0) {
				coordinates.x = game.state.scenarios.mountains["scen" + Number.parseInt(id.substr(4) - 1)].coordinates.x + dimensions.width;
			}
		}

		objColor(coordinates, dimensions, color);
		objImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.grounds) { // Grounds
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.grounds[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		coordinates.x -= speed.velocity;
		if (id === id.substr(0, 4) + "1") {
			if (coordinates.x + dimensions.width < 0) {
				coordinates.x = dimensions.width - speed.velocity;
			}
		} else {
			if (coordinates.x + dimensions.width < 0) {
				coordinates.x = game.state.scenarios.grounds["scen" + Number.parseInt(id.substr(4) - 1)].coordinates.x + dimensions.width;
			}
		}

		objColor(coordinates, dimensions, color);
		objImage(coordinates, dimensions, image);
	};

	/* Obstacles */
	for (const id in game.state.obstacles.cacti) {
		const { coordinates, dimensions, collision, speed } = game.state.obstacles.cacti[id];
		const { color, image } = collision;

		game.state.speed.obstacles = speed.velocity;
		speed.velocity += speed.acceleration;
		coordinates.x -= speed.velocity;
		if (coordinates.x + dimensions.width <= 0) {
			coordinates.x = screen.width - speed.velocity;
			// console.log(Number.parseInt(id.substr(6) - 1));

			// if (id === id.substr(0, 6) + "1") {
			// 	if (coordinates.x + dimensions.width < 0) {
			// 		coordinates.x = dimensions.width - speed.velocity;
			// 	}
			// } else {
			// 	if (coordinates.x + dimensions.width < 0) {
			// 		coordinates.x = game.state.obstacles.cacti[`cactus${Number.parseInt(id.substr(6) - 1)}`].coordinates.x + 500
			// 	}
			// }
		}

		objColor(coordinates, dimensions, color);
		objImage(coordinates, dimensions, image);
	};

	/* Dinosaurs */
	for (const id in game.state.dinosaurs) {
		const { coordinates, dimensions, collision, jump } = game.state.dinosaurs[id];
		const { color, image } = collision;
		if (game.state.population.current > 0) {
			if (collision.alive) { // se a entidade estiver viva

				if (jump.enable && jump.jump && jump.jumping === false) {
					jump.velocity -= 20;
					jump.jumping = true;
				}

				jump.velocity += jump.gravity;
				coordinates.y += jump.velocity;
				jump.velocity *= jump.friction;

				if (coordinates.y > screen.height - dimensions.height) {
					jump.jumping = false;
					jump.jump = false;
					coordinates.y = screen.height - dimensions.height;
					jump.velocity = 0;
				}

				objColor(coordinates, dimensions, color);
				objImage(coordinates, dimensions, image);
				objCheckCollision(collision, id);

			}
		} else { // 
			game.state.gameover = true;
			console.warn("gameover");
		}
	};

	function objCheckCollision(collision, id) {
		if (collision.enable) {
			game.checkCollision(id);
		}
	}
	function objColor(coordinates, dimensions, color) {
		if (color.enable) {
			context_screen.fillStyle = color.element;
			context_screen.fillRect(coordinates.x, coordinates.y, dimensions.width, dimensions.height);
		};
	};
	function objImage(coordinates, dimensions, image) {
		if (image.enable) {
			context_screen.drawImage(image.element, coordinates.x, coordinates.y, dimensions.width, dimensions.height);
		};
	};

	requestAnimationFrame(() => {

		if (game.state.gameover) {
			localStorage.setItem("lastDistance", game.state.scoreboard.distance);
			if (localStorage.getItem("lastDistance") >= localStorage.getItem("bestDistance")) {
				localStorage.setItem("bestDistance", localStorage.getItem("lastDistance"))
			}
		}

		if (!game.state.gameover) {
			// Terminal render
			context_terminal.clearRect(0, 0, screen.width, screen.height); // x, y, width, height
			context_terminal.font = "normal normal 400 15px Consolas";
			const terminal_layout = [
				{ title: "unknown@unknown", x: 5, color: "#50FA7B" },
				{ title: navigator.platform, x: 135, color: "#BD93F9" },
				{ title: window.location.href, x: 185, color: "#FFB86C" },
			];
			for (let i = 0; i < terminal_layout.length; i++) {
				context_terminal.fillStyle = terminal_layout[i].color;
				context_terminal.fillText(`${terminal_layout[i].title}`, terminal_layout[i].x, 15);
			};
			const terminal_params = [
				{
					title: "Distance", type: "pxs",
					current: game.state.scoreboard.distance.toFixed(2), best: 500
				},
				{
					title: "Points", type: "pts",
					current: game.state.scoreboard.score.toFixed(0), best: 500,
				},
				{
					title: "Speed", type: "px/s",
					current: game.state.speed.obstacles.toFixed(3), best: 500
				},
				{
					title: "Population", type: "qty",
					current: game.state.population.current.toFixed(0), best: Object.keys(game.state.dinosaurs).length
				}
			];
			for (let i = 0; i < terminal_params.length; i++) {
				context_terminal.fillStyle = "#F8F8F2";
				context_terminal.fillText(
					`$ ${
					terminal_params[i].title
					}: ${
					terminal_params[i].current
					} ${
					terminal_params[i].type
					} │ ${
					terminal_params[i].best
					} ${
					terminal_params[i].type
					}`, 5, 35 + (20 * i)
				);
			};

			// Screen render
			context_screen.clearRect(0, 0, screen.width, screen.height); // x, y, width, height

			// calc
			game.state.scoreboard.distance += game.state.speed.obstacles;
			game.state.scoreboard.score++;

			renderScreen(screen, terminal, game, requestAnimationFrame);
		}
	});
}