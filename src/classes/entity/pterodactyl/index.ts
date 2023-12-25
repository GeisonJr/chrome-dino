import Entity from '..'
import type { EntityOptions } from '../types'

export default class Pterodactyl extends Entity {
	// States
	private _sprite: number = 0
	private _duration: number = 0
	private _updated: number = 0

	constructor(options?: EntityOptions) {
		super({
			image: './assets/pterodactyl/0.svg',
			...options
		})
	}

	public get duration(): number {
		return this._duration
	}

	public set duration(value: number) {
		this._duration = value
	}

	public get updated(): number {
		return this._updated
	}

	public set updated(value: number) {
		this._updated = value
	}

	public get sprite(): number {
		return this._sprite
	}

	protected set sprite(value: number) {
		this._sprite = value
	}

	public animate() {

		if (!this.duration)
			return

		const now = performance.now()
		if (now - this.updated < this.duration)
			return

		this.updated = now

		this.image.src = `./assets/pterodactyl/${this.sprite}.svg`
		if (this.sprite === 0)
			this.sprite = 1
		else
			this.sprite = 0
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the pterodactyl
		//...

		super.draw(context)
	}
}
