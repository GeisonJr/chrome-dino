import Entity from '../entity'
import type { EntityOptions } from '../entity/types'

export default class Cactus extends Entity {

	constructor(options?: EntityOptions) {
		super({
			image: './assets/cactus/0.bmp',
			x: 0,
			y: 0,
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the cactus
		//...

		super.draw(context)
	}
}
