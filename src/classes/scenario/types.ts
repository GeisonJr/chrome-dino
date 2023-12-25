export interface Position {
	x?: number
	y?: number
	z?: number
}

export interface Velocity {
	x?: number
	y?: number
}

export interface ScenarioOptions {
	image?: string
	text?: string
	position?: Position
	velocity?: Velocity
}

export type Context = CanvasRenderingContext2D
