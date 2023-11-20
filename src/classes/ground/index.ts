import Entity from '../entity'
import type { EntityOptions } from '../entity/types'

export default class Ground extends Entity {

	constructor(options?: EntityOptions) {
		super({
			image: './assets/ground/0.bmp',
			x: 0,
			y: 0,
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the ground
		//...

		super.draw(context)
	}
}
