import createKeyboardListener from "../functions/keyboard-listener.js";
import renderScreen from "../functions/render-screen.js";
import createGame from "../functions/game.js";

import { Cactus } from "../classes/Obstacles.js";
import { Dinosaur } from "../classes/Dinosaur.js";
import { Mountain, Cloud, Ground } from "../classes/Scenarios.js";

// screen
const screen = document.getElementById("screen");
screen.width = 1200;
screen.height = 192;

const terminal = document.getElementById("terminal");
terminal.width = 600;
terminal.height = 200;

// game
const game = createGame(screen);

const quantity = {
	/* Scenario */
	clouds: 5, // Min = 0, Min Recomended = 3, Recomended = 5, Max Recomended = 10, Max = Infinity
	grounds: 5, // Min = 0, Min Recomended = 2, Recomended = 2, Max Recomended = 2, Max = Infinity
	mountains: 6, // Min = 0, Min Recomended = 2, Recomended = 6, Max Recomended = 6, Max = 6 => 0, 2, 4, 6

	/* Obstacles */
	cacti: 4, // Min = 0, Min Recomended = 1, Recomended = 3, Max Recomended = 4, Max = 5

	/* Dinosaurs */
	dinosaurs: 1, // Min = 0, Min Recomended = 1, Recomended = 1, Max Recomended = 15, Max = Infinity
}

/* Scenario */
for (let i = 0; i < quantity.clouds; i++) {
	game.addCloud(new Cloud(screen, i, quantity.clouds).add());
};
for (let i = 0; i < quantity.grounds; i++) {
	game.addGround(new Ground(screen, i, quantity.grounds).add());
};
for (let i = 0; i < quantity.mountains; i++) {
	game.addMountain(new Mountain(screen, i, quantity, Math.floor(i / 2)).add(), Math.floor(i / 2));
};

/* Obstacles */
for (let i = 0; i < quantity.cacti; i++) {
	game.addCactus(new Cactus(screen, i, quantity.cacti, game).add());
};

/* Dinosaurs */
for (let i = 0; i < quantity.dinosaurs; i++) {
	game.addDino(new Dinosaur(screen, i, quantity.dinosaurs).add());
};

console.log(game.state);

// Render Screen
renderScreen(screen, terminal, game, requestAnimationFrame);

// KeyboardListener
createKeyboardListener(document).state.subscribe(game.moveDino);