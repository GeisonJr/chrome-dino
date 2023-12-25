import Scenario from '../../scenario'
import type { CloudOptions } from './types'

export default class Cloud extends Scenario {

	constructor(options?: CloudOptions) {
		super({
			image: './assets/cloud/0.svg',
			...options
		})
	}

	public draw(context: CanvasRenderingContext2D): void {

		// TODO: Draw the cloud
		//...

		super.draw(context)
	}
}
