import Scenario from '../../scenario'
import type { MountainOptions } from './types'

export default class Mountain extends Scenario {

	constructor(options?: MountainOptions) {
		super({
			image: './assets/mountain/0.svg',
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the mountain
		//...

		super.draw(context)
	}
}
