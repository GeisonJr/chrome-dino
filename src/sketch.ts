import Cactus from './classes/entity/cactus'
import Cloud from './classes/scenario/cloud'
import Dinosaur from './classes/entity/dinosaur'
import Pterodactyl from './classes/entity/pterodactyl'
import Spike from './classes/entity/spike'
import Game from './classes/game'
import Ground from './classes/scenario/ground'
import Mountain from './classes/scenario/mountain'

const game = new Game()

game.loadSprites([
	'./assets/cactus/0.svg',
	'./assets/cactus/1.svg',
	'./assets/cactus/2.svg',
	'./assets/cactus/3.svg',
	'./assets/cactus/4.svg',
	'./assets/cloud/0.svg',
	'./assets/airplane/0.svg',
	'./assets/airplane/1.svg',
	'./assets/dinosaur/0.svg',
	'./assets/dinosaur/1.svg',
	'./assets/dinosaur/2.svg',
	'./assets/dinosaur/3.svg',
	'./assets/dinosaur/4.svg',
	'./assets/dinosaur/5.svg',
	'./assets/pterodactyl/0.svg',
	'./assets/pterodactyl/1.svg',
	'./assets/spike/0.svg',
	'./assets/ground/0.svg',
	'./assets/ground/1.svg',
	'./assets/mountain/0.svg',
	'./assets/mountain/1.svg',
	'./assets/mountain/2.svg',
	'./assets/mountain/3.svg',
	'./assets/mountain/4.svg',
	'./assets/mountain/5.svg'
])
	.then(() => startGame())

function startGame() {

	// Create Canvas
	game.canvas.height = 192
	game.canvas.width = 1200
	game.canvas.parent = document.body

	// Dinosaurs
	const dinosaur1 = new Dinosaur({ position: { x: 20 } })
	const dinosaur2 = new Dinosaur({ position: { x: 40 } })
	const dinosaur3 = new Dinosaur({ position: { x: 60 } })

	// Cactus
	const cactus1 = new Cactus({
		velocity: { x: 4 },
		position: { x: ((game.canvas.width) / 5) * 1 }
	})
	const cactus2 = new Cactus({
		velocity: { x: 4 },
		position: { x: ((game.canvas.width) / 5) * 2 }
	})
	const cactus3 = new Cactus({
		velocity: { x: 4 },
		position: { x: ((game.canvas.width) / 5) * 3 }
	})
	const cactus4 = new Cactus({
		velocity: { x: 4 },
		position: { x: ((game.canvas.width) / 5) * 4 }
	})
	const cactus5 = new Cactus({
		velocity: { x: 4 },
		position: { x: ((game.canvas.width) / 5) * 5 }
	})

	// Spikes
	const spike1 = new Spike({
		velocity: { x: 4 },
		position: { x: 20 }
	})

	// Pterodactyls
	const pterodactyl1 = new Pterodactyl({
		velocity: { x: 4 },
		position: { x: 20 }
	})

	// Clouds
	const cloud1 = new Cloud({ position: { x: (game.canvas.width / 7) * 1 } })
	const cloud2 = new Cloud({ position: { x: (game.canvas.width / 7) * 2 } })
	const cloud3 = new Cloud({ position: { x: (game.canvas.width / 7) * 3 } })
	const cloud4 = new Cloud({ position: { x: (game.canvas.width / 7) * 4 } })
	const cloud5 = new Cloud({ position: { x: (game.canvas.width / 7) * 5 } })
	const cloud6 = new Cloud({ position: { x: (game.canvas.width / 7) * 6 } })
	const cloud7 = new Cloud({ position: { x: (game.canvas.width / 7) * 7 } })

	// Grounds
	const ground1 = new Ground({
		image: './assets/ground/0.svg',
		velocity: { x: 4 }
	})

	const ground2 = new Ground({
		image: './assets/ground/1.svg',
		velocity: { x: 4 },
		position: { x: ground1.width }
	})

	// Mountains
	const mountain0 = new Mountain({
		image: './assets/mountain/0.svg',
		velocity: { x: 1 }
	})

	const mountain1 = new Mountain({
		image: './assets/mountain/1.svg',
		velocity: { x: 1 },
		position: { x: mountain0.width }
	})

	const mountain2 = new Mountain({
		image: './assets/mountain/2.svg',
		velocity: { x: 2 }
	})

	const mountain3 = new Mountain({
		image: './assets/mountain/3.svg',
		velocity: { x: 2 },
		position: { x: mountain2.width }
	})

	const mountain4 = new Mountain({
		image: './assets/mountain/4.svg',
		velocity: { x: 3 }
	})

	const mountain5 = new Mountain({
		image: './assets/mountain/5.svg',
		velocity: { x: 3 },
		position: { x: mountain4.width }
	})

	// Add enemies to game
	game.addEnemy(spike1)

	game.addEnemy(pterodactyl1)

	game.addEnemy(cactus2)
	game.addEnemy(cactus1)
	game.addEnemy(cactus3)
	game.addEnemy(cactus4)
	game.addEnemy(cactus5)

	// Add players to game
	game.addPlayer(dinosaur1)
	game.addPlayer(dinosaur2)
	game.addPlayer(dinosaur3)

	// Add scenarios to game
	game.addScenario(cloud1)
	game.addScenario(cloud2)
	game.addScenario(cloud3)
	game.addScenario(cloud4)
	game.addScenario(cloud5)
	game.addScenario(cloud6)
	game.addScenario(cloud7)

	game.addScenario(mountain0)
	game.addScenario(mountain1)
	game.addScenario(mountain2)
	game.addScenario(mountain3)
	game.addScenario(mountain4)
	game.addScenario(mountain5)

	game.addScenario(ground1)
	game.addScenario(ground2)

	// Render game
	game.preload()
	game.render()
}
