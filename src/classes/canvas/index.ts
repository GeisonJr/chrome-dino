import type { Context } from '../entity/types'
import type { Options } from './types'

export default class Canvas {
	private _context: Context
	private _canvas: HTMLCanvasElement

	constructor(options?: Options) {
		this._canvas = document.createElement('canvas')

		if (options?.id)
			this.canvas.id = options.id

		if (options?.parent)
			this.parent = options.parent

		this.canvas.height = options?.height ?? 0
		this.canvas.width = options?.width ?? 0

		this._context = this.canvas.getContext(options?.context ?? '2d') as Context
	}

	public get canvas(): HTMLCanvasElement {
		return this._canvas
	}

	public set canvas(value: HTMLCanvasElement) {
		this._canvas = value
	}

	public get context(): Context {
		return this._context
	}

	public set context(value: Context) {
		this._context = value
	}

	public get height(): number {
		return this.canvas.height
	}

	public set height(value: number) {
		this.canvas.height = value
	}

	public get parent(): HTMLElement {
		return this.canvas.parentElement as HTMLElement
	}

	public set parent(value: HTMLElement) {
		this.canvas.parentElement?.removeChild(this.canvas)
		value.appendChild(this.canvas)
	}

	public get width(): number {
		return this.canvas.width
	}

	public set width(value: number) {
		this.canvas.width = value
	}
}
