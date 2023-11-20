import Cactus from './classes/cactus'
import Cloud from './classes/cloud'
import Dinosaur from './classes/dinosaur'
import Game from './classes/game'
import Ground from './classes/ground'
import Mountain from './classes/mountain'

const game = new Game()

// Create Canvas
game.canvas.height = 192
game.canvas.width = 1200
game.canvas.parent = document.body

// Cactus
const cactus1 = new Cactus({ x: ((game.canvas.width) / 5) * 1 })
const cactus2 = new Cactus({ x: ((game.canvas.width) / 5) * 2 })
const cactus3 = new Cactus({ x: ((game.canvas.width) / 5) * 3 })
const cactus4 = new Cactus({ x: ((game.canvas.width) / 5) * 4 })
const cactus5 = new Cactus({ x: ((game.canvas.width) / 5) * 5 })

// Clouds
const cloud1 = new Cloud({ x: (game.canvas.width / 5) * 1 })
const cloud2 = new Cloud({ x: (game.canvas.width / 5) * 2 })
const cloud3 = new Cloud({ x: (game.canvas.width / 5) * 3 })
const cloud4 = new Cloud({ x: (game.canvas.width / 5) * 4 })
const cloud5 = new Cloud({ x: (game.canvas.width / 5) * 5 })

// Dinosaurs
const dinosaur1 = new Dinosaur({ x: 20 })
const dinosaur2 = new Dinosaur({ x: 40 })
const dinosaur3 = new Dinosaur({ x: 60 })

// Grounds
const ground1 = new Ground()
const ground2 = new Ground({ x: ground1.width })

// Mountains
const mountain0 = new Mountain({
	image: `./assets/mountain/0.bmp`,
	distance: 2
})

const mountain1 = new Mountain({
	image: `./assets/mountain/1.bmp`,
	distance: 2,
	x: mountain0.width
})

const mountain2 = new Mountain({
	image: `./assets/mountain/2.bmp`,
	distance: 1
})

const mountain3 = new Mountain({
	image: `./assets/mountain/3.bmp`,
	distance: 1,
	x: mountain2.width
})

const mountain4 = new Mountain({
	image: `./assets/mountain/4.bmp`,
	distance: 0
})

const mountain5 = new Mountain({
	image: `./assets/mountain/5.bmp`,
	distance: 0,
	x: mountain4.width
})

// Add entities to game
game.addEntity(cactus1)
game.addEntity(cactus2)
game.addEntity(cactus3)
game.addEntity(cactus4)
game.addEntity(cactus5)

game.addEntity(cloud1)
game.addEntity(cloud2)
game.addEntity(cloud3)
game.addEntity(cloud4)
game.addEntity(cloud5)

game.addEntity(dinosaur1)
game.addEntity(dinosaur2)
game.addEntity(dinosaur3)

game.addEntity(ground1)
game.addEntity(ground2)

game.addEntity(mountain0)
game.addEntity(mountain1)
game.addEntity(mountain2)
game.addEntity(mountain3)
game.addEntity(mountain4)
game.addEntity(mountain5)

// Render game
game.render()
