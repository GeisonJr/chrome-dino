import { randomInt } from '../../functions/math'
import { isArray } from '../../functions/types'
import Canvas from '../canvas'
import Entity from '../entity'
import Cactus from '../entity/cactus'
import Dinosaur from '../entity/dinosaur'
import Pterodactyl from '../entity/pterodactyl'
import Spike from '../entity/spike'
import Scenario from '../scenario'
import Cloud from '../scenario/cloud'
import Ground from '../scenario/ground'
import Mountain from '../scenario/mountain'
import type { Sprite, State } from './types'

export default class Game {
	// FPS
	private _fps: number = 0
	private _last: number = performance.now()
	private _lastUpdate: number = performance.now()
	private _lastPressedKeys: string[] = []

	private tick: number = 60
	private lastTick: number = performance.now()

	// Canvas
	private _canvas: Canvas = new Canvas()

	// Physics
	private ACCELERATION: number = 0.001
	private GRAVITY: number = 1.2
	private FRICTION: number = 0.9

	// Game
	private _state: State = 'stopped'
	private _enemies: Entity[] = []
	private _players: Entity[] = []
	private _scenarios: Scenario[] = []
	private _sprites: Sprite = {}

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

	public get enemies(): Entity[] {
		return this._enemies
	}

	public get players(): Entity[] {
		return this._players
	}

	public get scenarios(): Scenario[] {
		return this._scenarios
	}

	public get canvas(): Canvas {
		return this._canvas
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

	public addEnemy(value: Entity | Entity[]) {
		if (isArray(value))
			this._enemies.push(...value)
		else
			this._enemies.push(value)
	}

	public addPlayer(value: Entity | Entity[]) {
		if (isArray(value))
			this._players.push(...value)
		else
			this._players.push(value)

	}

	public addScenario(value: Scenario | Scenario[]) {
		if (isArray(value))
			this._scenarios.push(...value)
		else
			this._scenarios.push(value)
	}

	public draw() {

		// Clear canvas
		this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// Draw scenario
		for (const scenario of this.scenarios) {
			const entity = scenario as any
			const duration = entity.duration as number
			entity.duration = duration - 0.001
			entity?.animate?.()
			scenario.draw(this.canvas.context)
		}

		// Draw enemies
		for (const enemy of this.enemies) {
			const entity = enemy as any
			const duration = entity.duration as number
			entity.duration = duration - 0.001
			entity?.animate?.()
			enemy.draw(this.canvas.context)
		}

		// Draw players
		for (const player of this.players) {
			const entity = player as any
			const duration = entity.duration as number
			entity.duration = duration - 0.001
			entity?.animate?.()
			player.draw(this.canvas.context)
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
			for (const player of this.players) {
				if (player instanceof Dinosaur) { // Dinosaurs
					this.canvas.context.font = '12px monospace'
					this.canvas.context.fillStyle = 'white'
					this.canvas.context.fillText(`Score: ${Math.round(player.score)}`, 10, 10 + 12 + 12 + (12 * count++))
				}
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
				for (const player of this.players) {
					if (player instanceof Dinosaur) { // Dinosaurs
						this.canvas.context.fillStyle = 'white'
						this.canvas.context.font = '24px monospace'
						this.canvas.context.fillText(`Score: ${Math.round(player.score)}`, 10, 10 + 36 + 24 + 24 + (24 * count++))
					}
				}
			}
		}

		// Render last 5 pressed keys in to right corner, if is last color white else color gray
		let count = 0
		for (const key of this._lastPressedKeys) {
			this.canvas.context.fillStyle = count === this._lastPressedKeys.length - 1 ? 'white' : 'gray'
			this.canvas.context.font = '12px monospace'
			this.canvas.context.fillText(key, this.canvas.width - 10 - (12 * key.length), 10 + (12 * count++))
		}
	}

	public gravity() {

		if (this.state !== 'started')
			return

		// Update players
		for (const player of this.players) {
			if (player instanceof Dinosaur) { // Dinosaurs
				const groundLevel = this.canvas.height - player.height - 10
				if (player.jump && player.y === groundLevel) {
					// If the dinosaur can jump and is on the ground
					player.velocity = -15  // Adjust the jump strength as needed
				}

				// Simulate gravity
				player.velocity += this.GRAVITY

				// Update the dinosaur's position
				player.y += player.velocity

				// Boundary check for the bottom of the canvas
				if (player.y >= groundLevel) {
					player.jump = false
					player.y = groundLevel
					// Reset velocity when on the ground to simulate smooth descent
					player.velocity = 0
				}
			}
		}

		// Update enemies
		// ...

		// Update scenarios
		// ...
	}

	public move() {

		// Update players
		for (const player of this.players) {
			player.x += player.velocity.x
			player.y += player.velocity.y
		}

		// Update enemies
		for (const enemy of this.enemies) {
			enemy.x -= enemy.velocity.x
			enemy.y -= enemy.velocity.y
		}

		// Update scenarios
		for (const scenario of this.scenarios) {
			scenario.x -= scenario.velocity.x
			scenario.y -= scenario.velocity.y
		}
	}

	public repostion(reset: boolean = false) {

		// Update players
		for (const player of this.players) {
			if (player instanceof Dinosaur) { // Dinosaurs
				if (reset) {
					player.image.src = './assets/dinosaur/0.svg'
					player.y = this.canvas.height - player.height - 10
					player.velocity.x = 0
					player.velocity.y = 0
				}

				if (reset) {
					player.duration = 100
					player.alive = true
					player.score = 0
				}
			}
		}

		// Update enemies
		for (const enemy of this.enemies) {
			// Out of the screen
			const isOut = enemy.x < -enemy.width

			// Reset default values
			enemy.velocity.x = 4
			enemy.velocity.y = 0

			if (enemy instanceof Cactus) { // Cactus
				if (reset || isOut) {
					enemy.image.src = `./assets/cactus/${randomInt(0, 4)}.svg`
					enemy.position.y = this.canvas.height - enemy.height - 10
				}

				if (reset) {
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					enemy.position.x = this.canvas.width
				}

			} else if (enemy instanceof Pterodactyl) { // Pterodactyl
				if (reset || isOut) {
					enemy.position.y = this.canvas.height - enemy.height - 40
				}

				if (reset) {
					enemy.duration = 200
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					enemy.position.x = this.canvas.width
				}

			} else if (enemy instanceof Spike) { // Spikes
				if (reset || isOut) {
					enemy.position.y = this.canvas.height - enemy.height - 10
				}

				if (reset) {
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					enemy.position.x = this.canvas.width
				}
			}
		}

		// Update scenarios
		for (const scenario of this.scenarios) {
			// Out of the screen
			const isOut = scenario.x < -scenario.width

			// Reset default values
			scenario.velocity.x = 0
			scenario.velocity.y = 0

			if (scenario instanceof Cloud) {
				if (reset || isOut) {
					scenario.image.src = `./assets/cloud/${randomInt(0, 2)}.svg`
					scenario.y = randomInt(0, 30) + 30
					scenario.velocity = randomInt(1, 2)
				}

				if (reset) {
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					scenario.position.x = this.canvas.width
				}

			} else if (scenario instanceof Ground) { // Grounds
				if (reset || isOut) {
					scenario.position.y = this.canvas.height - scenario.height
				}

				scenario.position.y = this.canvas.height - scenario.height
				if (reset) {
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					scenario.position.x = this.canvas.width
				}

			} else if (scenario instanceof Mountain) { // Mountains
				if (reset || isOut) {
					scenario.position.y = this.canvas.height - scenario.height
				}

				if (reset) {
					// TODO: Generate random x position
					// ...

				} else if (isOut) {
					scenario.position.x = this.canvas.width - scenario.velocity
				}
			}
		}
	}

	public preload() {

		// Reset players
		for (const player of this.players) {
			if (player instanceof Dinosaur) { // Dinosaurs
				// entity.image.src = ''
				// entity.x = 0
				player.y = this.canvas.height - player.height - 10
				// player.velocity = 0

				// Reset entity
				player.duration = 100
				player.alive = true
				player.score = 0
			}
		}

		// Reset enemies
		for (const enemy of this.enemies) {
			if (enemy instanceof Cactus) { // Cactus
				enemy.image.src = `./assets/cactus/${randomInt(0, 4)}.svg`
				// enemy.x = this.canvas.width
				enemy.y = this.canvas.height - enemy.height - 10
				// player.velocity = 0

			} else if (enemy instanceof Pterodactyl) { // Pterodactyl
				// enemy.image.src = ''
				// enemy.x = this.canvas.width
				enemy.y = this.canvas.height - enemy.height - 40
				// player.velocity = 0

				// Reset entity
				enemy.duration = 200

			} else if (enemy instanceof Spike) { // Spikes
				// enemy.image.src = ''
				// enemy.x = this.canvas.width
				enemy.y = this.canvas.height - enemy.height - 10
				// player.velocity = 0
			}
		}

		// Reset scenario
		for (const scenario of this.scenarios) {
			if (scenario instanceof Cloud) { // Clouds
				// scenario.image.src = ''
				// scenario.x = 0
				scenario.y = randomInt(0, 30) + 30
				scenario.velocity = randomInt(1, 2)

			} else if (scenario instanceof Ground) { // Grounds
				scenario.image.src = `./assets/ground/${randomInt(0, 1)}.svg`
				// scenario.x = 0
				scenario.y = this.canvas.height - scenario.height
				// scenario.velocity = 0

			} else if (scenario instanceof Mountain) { // Mountains
				// scenario.image.src = ''
				// scenario.x = 0
				scenario.y = this.canvas.height - scenario.height
				// scenario.velocity = 0
			}
		}
	}

	public async loadSprites(sprites: string[]) {
		return await Promise.all(sprites
			.map(src => ((url: string) => {
				return new Promise<HTMLImageElement>((resolve, reject) => {
					const image = new Image()
					image.onload = () => resolve(image)
					image.onerror = reject
					image.src = url
				})
			})(src)))
	}

	public render() {

		// Check tick
		if (performance.now() - this.lastTick < this.tick) {
			this.lastTick = performance.now()

			this.gravity()
			this.repostion()
			this.move()
			// this.collision()

			// Update
			// for (const enemy of this.enemies) {
			// 	for (const player of this.players) {
			// 		// Check collision
			// 		if (this.collision(player, enemy))
			// 			if (player instanceof Dinosaur) // Dinosaurs
			// 				player.alive = false
			// 	}
			// }

			// Check if has any dinosaur alive
			let alive = false
			for (const player of this.players) {

				if (player instanceof Dinosaur) {

					if (player.alive) {
						alive = true

						// Update score
						player.score += 0.1
					}
				}
			}

			if (!alive)
				this.gameOver()
		}

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
				for (const player of this.players) {
					if (player instanceof Dinosaur) { // Dinosaurs
						// Jump
						if (['ArrowUp', 'KeyW', 'Space'].includes(event.code)) {
							if (player.jump)
								return

							player.jump = true
						}

						// Duck
						if (['ArrowDown', 'KeyS'].includes(event.code))
							player.duck = true
					}
				} else if (this.state === 'paused') {
					this.start()
				} else if (this.state === 'stopped') {
					this.start(true)
				} else if (this.state === 'gameover') {
					this.start(true)
				}

			// Last 5 pressed keys
			if (this._lastPressedKeys.length >= 5)
				this._lastPressedKeys.shift()
			this._lastPressedKeys.push(event.code)
		})

		document.addEventListener('keyup', (event) => {
			if (this.state === 'started') {
				for (const player of this.players) {

					if (player instanceof Dinosaur) { // Dinosaurs
						// Jump
						//...

						// Duck
						if (['ArrowDown', 'KeyS'].includes(event.code))
							player.duck = false
					}
				}
			}
		})
	}
}
