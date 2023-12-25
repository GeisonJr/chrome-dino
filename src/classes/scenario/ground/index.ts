import Scenario from '../../scenario'
import type { GroundOptions } from './types'

export default class Ground extends Scenario {

	constructor(options?: GroundOptions) {
		super({
			image: './assets/ground/0.svg',
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the ground
		//...

		super.draw(context)
	}
}
