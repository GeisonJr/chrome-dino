import { isArray } from '../../functions/typing'
import Cactus from '../cactus'
import Canvas from '../canvas'
import Cloud from '../cloud'
import Dinosaur from '../dinosaur'
import Entity from '../entity'
import Ground from '../ground'
import Mountain from '../mountain'
import type { State } from './types'

export default class Game {
	// FPS
	private _fps: number = 0
	private _last: number = performance.now()
	private _lastUpdate: number = performance.now()

	// Canvas
	private _canvas: Canvas = new Canvas()

	// Physics
	// private ACCELERATION: number = 0.5
	private GRAVITY: number = 1
	// private FRICTION: number = 0.9
	private _velocity: number = 10

	// Game
	private _state: State = 'stopped'
	private _cactus: Cactus[] = []
	private _clouds: Cloud[] = []
	private _dinosaurs: Dinosaur[] = []
	private _grounds: Ground[] = []
	private _mountains: Mountain[] = []

	private _events: {
		onkeypress?: (game: Game, event: KeyboardEvent) => void
		onstart?: (game: Game) => void
		onstop?: (game: Game) => void
		ongameover?: (game: Game) => void
	} = {}

	constructor() {
		// Listen for events
		this.listen()
	}

	public get velocity(): number {
		return this._velocity
	}

	protected set velocity(value: number) {
		this._velocity = value
	}

	public get canvas(): Canvas {
		return this._canvas
	}

	public get cactus(): Cactus[] {
		return this._cactus
	}

	public get clouds(): Cloud[] {
		return this._clouds
	}

	public get dinosaurs(): Dinosaur[] {
		return this._dinosaurs
	}

	public get grounds(): Ground[] {
		return this._grounds
	}

	public get mountains(): Mountain[] {
		return this._mountains
	}

	public get events(): {
		onkeypress?: (game: Game, event: KeyboardEvent) => void
		onstart?: (game: Game) => void
		onstop?: (game: Game) => void
		ongameover?: (game: Game) => void
	} {
		return this._events
	}

	protected set events(value: {
		onkeypress?: (game: Game, event: KeyboardEvent) => void
		onstart?: (game: Game) => void
		onstop?: (game: Game) => void
		ongameover?: (game: Game) => void
	}) {
		this._events = value
	}

	public get fps(): number {
		return this._fps
	}

	protected set fps(value: number) {
		this._fps = value
	}

	public get state(): State {
		return this._state
	}

	private set state(value: State) {
		this._state = value
	}

	public gameOver() {
		this.state = 'gameover'
	}

	public pause() {
		this.state = 'paused'
	}

	public start(force: boolean = false) {
		if (force)
			this.preload()

		this.state = 'started'
	}

	public stop() {
		this.state = 'stopped'
	}

	public addEntity(value: Entity | Entity[]) {
		const values = []
		if (isArray(value))
			values.push(...value)
		else
			values.push(value)

		for (const value of values) {
			if (value instanceof Cactus)
				this.cactus.push(value)
			else if (value instanceof Cloud)
				this.clouds.push(value)
			else if (value instanceof Dinosaur)
				this.dinosaurs.push(value)
			else if (value instanceof Ground)
				this.grounds.push(value)
			else if (value instanceof Mountain)
				this.mountains.push(value)
		}
	}

	public draw() {
		// Clear canvas
		this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// Mountains
		for (const mountain of this.mountains)
			mountain.draw(this.canvas.context)

		// Clouds
		for (const cloud of this.clouds)
			cloud.draw(this.canvas.context)

		// Grounds
		for (const ground of this.grounds)
			ground.draw(this.canvas.context)

		// Cactus
		for (const cactus of this.cactus)
			cactus.draw(this.canvas.context)

		// Dinosaurs
		for (const dinosaur of this.dinosaurs) {
			// dinosaur.duration -= 0.1
			dinosaur.animate()
			dinosaur.draw(this.canvas.context)
		}

		if (this.state === 'started') {
			// FPS Counter
			this.canvas.context.font = '12px monospace'
			if (this.fps < 30)
				this.canvas.context.fillStyle = 'red'
			else if (this.fps < 45)
				this.canvas.context.fillStyle = 'yellow'
			else
				this.canvas.context.fillStyle = 'green'

			const now = performance.now()

			if (now - this._lastUpdate >= 100) {
				this.fps = Math.round(1000 / (now - this._last))
				this._lastUpdate = now
			}
			this._last = now

			this.canvas.context.fillText(`FPS: ${this.fps}`, 10, 10 + 12)

			// Score
			let count = 0
			for (const dinosaur of this.dinosaurs) {
				this.canvas.context.font = '12px monospace'
				this.canvas.context.fillStyle = 'white'
				this.canvas.context.fillText(`Score: ${Math.round(dinosaur.score)}`, 10, 10 + 12 + 12 + (12 * count++))
			}

		} else {

			// Apply overlay
			this.canvas.context.fillStyle = 'rgba(0, 0, 0, 0.5)'
			this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

			// Show game over
			if (this.state === 'gameover') {
				this.canvas.context.fillStyle = 'white'
				this.canvas.context.font = '36px monospace'
				this.canvas.context.fillText('Game Over', 10, 10 + 36)
			}

			// Show message to play
			this.canvas.context.fillStyle = 'white'
			this.canvas.context.font = '24px monospace'
			this.canvas.context.fillText('Press spacebar to play', 10, 10 + 36 + 24)

			// Show score
			if (this.state === 'gameover') {
				let count = 0
				for (const dinosaur of this.dinosaurs) {
					this.canvas.context.fillStyle = 'white'
					this.canvas.context.font = '24px monospace'
					this.canvas.context.fillText(`Score: ${Math.round(dinosaur.score)}`, 10, 10 + 36 + 24 + 24 + (24 * count++))
				}
			}
		}
	}

	public gravity() {
		// Cactus
		//...

		// Clouds
		//...

		// Dinosaurs
		for (const dinosaur of this.dinosaurs) {
			const groundLevel = this.canvas.height - dinosaur.height - 10
			if (dinosaur.jump && dinosaur.y === groundLevel) {
				// If the dinosaur can jump and is on the ground
				dinosaur.velocity = -15  // Adjust the jump strength as needed
			}

			// Simulate gravity
			dinosaur.velocity += this.GRAVITY

			// Update the dinosaur's position
			dinosaur.y += dinosaur.velocity

			// Boundary check for the bottom of the canvas
			if (dinosaur.y >= groundLevel) {
				dinosaur.jump = false
				dinosaur.y = groundLevel
				// Reset velocity when on the ground to simulate smooth descent
				dinosaur.velocity = 0
			}
		}

		// Grounds
		//...

		// Mountains
		//...
	}

	public parallax() {
		if (this.state !== 'started')
			return

		// Cactus
		for (const cactus of this.cactus)
			cactus.x -= this.velocity

		// Clouds
		for (const cloud of this.clouds)
			cloud.x -= this.velocity / 5

		// Dinosaurs
		//...

		// Grounds
		for (const ground of this.grounds)
			ground.x -= this.velocity

		// Mountains
		for (const mountain of this.mountains)
			if (mountain.distance === 0)
				mountain.x -= this.velocity / 2
			else if (mountain.distance === 1)
				mountain.x -= this.velocity / 3
			else if (mountain.distance === 2)
				mountain.x -= this.velocity / 4
	}

	public repostion() {
		if (this.state !== 'started')
			return

		// Update cactus
		for (const cactus of this.cactus) {
			// Reset cactus position if it's out of the screen
			if (cactus.x < -cactus.width) {
				cactus.image.src = `./assets/cactus/${Math.round(Math.random() * 4)}.bmp`
				cactus.x = this.canvas.width
				cactus.y = this.canvas.height - cactus.height - 10
			}
		}

		// Update clouds
		for (const cloud of this.clouds) {
			// Reset cloud position if it's out of the screen
			if (cloud.x < -cloud.width) {
				// cloud.image.src = ''Ï
				cloud.x = this.canvas.width
				cloud.y = Math.round(Math.random() * 30) + 30
			}
		}

		// Update dinosaurs
		//...

		// Update grounds
		for (const ground of this.grounds) {
			// TODO: Fix bug where sprite is bigger than the canvas width
			// Reset ground position if it's out of the screen
			if (ground.x < -ground.width) {
				// ground.image.src = ''
				ground.x = this.canvas.width - this._velocity
				ground.y = this.canvas.height - ground.height
			}
		}

		// Update mountains
		for (const mountain of this.mountains) {
			// TODO: Fix bug where sprite is bigger than the canvas width
			// Reset mountain position if it's out of the screen
			if (mountain.x < -mountain.width)
				mountain.x = this.canvas.width - this._velocity
		}
	}

	public preload() {
		// Cactus
		for (const cactus of this.cactus) {
			cactus.image.src = `./assets/cactus/${Math.round(Math.random() * 4)}.bmp`
			// cactus.x = 0
			cactus.y = this.canvas.height - cactus.height - 10
		}

		// Clouds
		for (const cloud of this.clouds) {
			// cloud.image.src = ''
			// cloud.x = 0
			cloud.y = Math.round(Math.random() * 30) + 30
		}

		// Dinosaurs
		for (const dinosaur of this.dinosaurs) {
			// dinosaur.image.src = ''
			// dinosaur.x = 0
			dinosaur.y = this.canvas.height - dinosaur.height - 10

			// Reset dinosaur
			dinosaur.duration = 100
			dinosaur.ready = false
			dinosaur.alive = true
			dinosaur.score = 0
		}

		// Grounds
		for (const ground of this.grounds) {
			// ground.image.src = ''
			// ground.x = 0
			ground.y = this.canvas.height - ground.height
		}

		// Mountains
		for (const mountain of this.mountains) {
			// mountain.image.src = ''
			// mountain.x = 0
			mountain.y = this.canvas.height - mountain.height
		}
	}

	public render() {

		this.gravity()
		this.repostion()
		this.parallax()

		// Update
		for (const dinosaur of this.dinosaurs) {

			const src = `./assets/dinosaur/${dinosaur.sprite}.bmp`
			if (dinosaur.image.src !== src)
				dinosaur.image.src = src

			// Check collision
			for (const cactus of this.cactus) {
				// if (this.collision(dinosaur, cactus))
				// 	dinosaur.alive = false
			}

			// Update score
			dinosaur.score += 0.1
		}

		// Check if has any dinosaur alive
		// for (const entity of this.entities) {
		// 	if (entity instanceof Dinosaur) {
		// 		const dinosaur = entity as Dinosaur

		// 		if (dinosaur.alive)
		// 			break

		// 		this.gameOver()
		// 	}
		// }

		this.draw()

		requestAnimationFrame(() => this.render())
	}

	private collision(entity: Entity, target: Entity): boolean {
		const entityX = entity.x + entity.width
		const entityY = entity.y + entity.height

		const targetX = target.x + target.width
		const targetY = target.y + target.height

		if (entityX >= target.x) // Check if entity is on the right of the target
			if (entityY >= target.y) // Check if entity is below the target
				if (targetX >= entity.x) // Check if target is on the right of the entity
					if (targetY >= entity.y) // Check if target is below the entity
						return true

		return false
	}

	private listen() {
		document.addEventListener('keypress', (event) => {
			if (this.state === 'started')
				for (const dinosaur of this.dinosaurs) {
					// Jump
					if (['ArrowUp', 'KeyW', 'Space'].includes(event.code)) {
						if (dinosaur.jump)
							return

						dinosaur.jump = true
					}

					// Duck
					if (['ArrowDown', 'KeyS'].includes(event.code))
						dinosaur.duck = true
				}
			else if (this.state === 'paused')
				this.start()
			else if (this.state === 'stopped')
				this.start(true)
			else if (this.state === 'gameover')
				this.start(true)
		})

		document.addEventListener('keyup', (event) => {
			if (this.state === 'started') {
				for (const dinosaur of this.dinosaurs) {
					// Jump
					//...

					// Duck
					if (['ArrowDown', 'KeyS'].includes(event.code))
						dinosaur.duck = false
				}
			}
		})
	}
}
