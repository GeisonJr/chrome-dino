import Entity from '../entity'
import type { EntityOptions } from '../entity/types'

export default class Dinosaur extends Entity {
	// States
	private _alive: boolean = true
	private _duck: boolean = false
	private _jump: boolean = false
	private _sprite: number = 0
	private _duration: number = 0
	private _updated: number = 0

	// Score
	private _score: number = 0
	private _highscore: number = 0

	// Physics
	private _velocity: number = 0

	constructor(options?: EntityOptions) {
		super({
			image: './assets/dinosaur/0.bmp',
			x: 0,
			y: 0,
			...options
		})
	}

	public get alive(): boolean {
		return this._alive
	}

	public set alive(value: boolean) {
		this._alive = value
	}

	public get duck(): boolean {
		return this._duck
	}

	public set duck(value: boolean) {
		this._duck = value
	}

	public get duration(): number {
		return this._duration
	}

	public set duration(value: number) {
		this._duration = value
	}

	public get jump(): boolean {
		return this._jump
	}

	public set jump(value: boolean) {
		this._jump = value
	}

	public get highscore(): number {
		return this._highscore
	}

	public set highscore(value: number) {
		this._highscore = value
	}

	public get updated(): number {
		return this._updated
	}

	public set updated(value: number) {
		this._updated = value
	}

	public get score(): number {
		return this._score
	}

	public set score(value: number) {
		this._score = value
	}

	public get sprite(): number {
		return this._sprite
	}

	protected set sprite(value: number) {
		this._sprite = value
	}

	public get velocity(): number {
		return this._velocity
	}

	public set velocity(value: number) {
		this._velocity = value
	}

	public animate() {
		if (!this.alive)
			return

		if (!this.duration)
			return

		const now = performance.now()
		if (now - this.updated < this.duration)
			return

		this.updated = now

		if (this.duck) {
			this.image.src = `./assets/dinosaur/${this.sprite}.bmp`
			if (this.sprite === 0)
				this.sprite = 1
			else if (this.sprite === 1)
				this.sprite = 4
			else if (this.sprite === 2)
				this.sprite = 3
			else if (this.sprite === 3)
				this.sprite = 4
			else if (this.sprite === 4)
				this.sprite = 3

		} else if (this.jump) {
			this.image.src = `./assets/dinosaur/${this.sprite}.bmp`
			this.sprite = 0

		} else {
			this.image.src = `./assets/dinosaur/${this.sprite}.bmp`
			if (this.sprite === 0)
				this.sprite = 1
			else if (this.sprite === 1)
				this.sprite = 2
			else if (this.sprite === 2)
				this.sprite = 1
			else if (this.sprite === 3)
				this.sprite = 2
			else if (this.sprite === 4)
				this.sprite = 1
		}
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the dinosaur
		//...

		super.draw(context)
	}
}
