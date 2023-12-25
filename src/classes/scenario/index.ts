import { isFalsy, isNullOrUndefined } from '../../functions/types'
import type { Context, Position, ScenarioOptions, Velocity } from './types'

export default class Scenario {
	private _id: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	private _image: HTMLImageElement = new Image()
	private _position: Position = {}
	private _text: string = ''
	private _velocity: Velocity = {}

	constructor(options?: ScenarioOptions) {
		// Position
		this._position.x = options?.position?.x ?? 0
		this._position.y = options?.position?.y ?? 0
		this._position.z = options?.position?.z ?? 0

		// Velocity
		this._velocity.x = options?.velocity?.x ?? 0
		this._velocity.y = options?.velocity?.y ?? 0

		// Image
		if (options?.image)
			this.image.src = options.image

		// Text
		this.text = options?.text ?? ''
	}

	public get height(): number {
		return this._image.height


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

	public get z(): number {
		return this._z
	}

	public set z(z: number) {
		this._z = z
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

	public get velocity(): number {
		return this._velocity
	}

	public set velocity(value: number) {
		this._velocity = value
	}


	public draw(context: Context): void {
		this.drawImage(context)
		this.drawText(context)
	}

	protected drawImage(context: Context): void {
		if (isNullOrUndefined(this.image))
			return

		if (isFalsy(this.image.src))
			return

		if (this.image.complete === false)
			return

		context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height)
	}

	protected drawText(context: Context): void {
		if (isNullOrUndefined(this.text))
			return

		if (isFalsy(this.text))
			return

		context.fillText(this.text, this.x, this.y)
	}
}
