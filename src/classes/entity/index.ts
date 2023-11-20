import { isFalsy, isNullOrUndefined } from '../../functions/typing'
import type { Context, EntityOptions } from './types'

export default class Entity {
	private _ready: boolean = false
	private _id: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	private _x: number = 0
	private _y: number = 0
	private _image: HTMLImageElement = new Image()
	private _text: string = ''

	constructor(options?: EntityOptions) {
		// Position
		this.x = options?.x ?? 0
		this.y = options?.y ?? 0

		// Image
		if (options?.image)
			this.image.src = options.image

		// Text
		this.text = options?.text ?? ''
	}

	public get ready(): boolean {
		return this._ready
	}

	public set ready(value: boolean) {
		this._ready = value
	}

	public get height(): number {
		return this._image.height
	}

	protected set height(value: number) {
		this._image.height = value
	}

	public get width(): number {
		return this._image.width
	}

	protected set width(value: number) {
		this._image.width = value
	}

	public get x(): number {
		return this._x
	}

	public set x(x: number) {
		this._x = x
	}

	public get y(): number {
		return this._y
	}

	public set y(y: number) {
		this._y = y
	}

	public get image(): HTMLImageElement {
		return this._image
	}

	private set image(value: HTMLImageElement) {
		this._image = value
	}

	public get text(): string {
		return this._text
	}

	protected set text(value: string) {
		this._text = value
	}

	public draw(context: Context): void {
		this.drawImage(context)
		this.drawText(context)
	}

	protected drawImage(context: Context): void {
		if (isNullOrUndefined(this._image))
			return

		if (isFalsy(this._image.src))
			return

		if (this._image.complete === false)
			return

		context.drawImage(this._image, this._x, this._y, this._image.width, this._image.height)
	}

	protected drawText(context: Context): void {
		if (isNullOrUndefined(this._text))
			return

		if (isFalsy(this._text))
			return

		context.fillText(this._text, this._x, this._y)
	}
}
