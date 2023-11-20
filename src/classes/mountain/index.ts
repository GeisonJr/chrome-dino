import Entity from '../entity'
import type { MountainOptions } from './types'

export default class Mountain extends Entity {
	private _distance: number = 0

	constructor(options?: MountainOptions) {
		super({
			image: './assets/mountain/0.bmp',
			x: 0,
			y: 0,
			...options
		})

		this.distance = options?.distance ?? 0
	}

	public get distance(): number {
		return this._distance
	}

	public set distance(value: number) {
		this._distance = value
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the mountain
		//...

		super.draw(context)
	}
}
