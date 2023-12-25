import Entity from '..'
import type { EntityOptions } from '../types'

export default class Cactus extends Entity {

	constructor(options?: EntityOptions) {
		super({
			image: './assets/cactus/0.svg',
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the cactus
		//...

		super.draw(context)
	}
}
