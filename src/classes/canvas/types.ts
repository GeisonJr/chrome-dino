export interface Options {
	context?: '2d' | 'bitmaprenderer' | 'experimental-webgl' | 'webgl' | 'webgl2' | 'webgpu'
	id?: string
	parent?: HTMLElement
	height?: number
	width?: number
}
