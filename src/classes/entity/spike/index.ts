import Entity from '..'
import type { EntityOptions } from '../types'

export default class Spike extends Entity {

	constructor(options?: EntityOptions) {
		super({
			image: './assets/spike/0.svg',
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the spike
		//...

		super.draw(context)
	}
}
