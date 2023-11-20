import type { Context, EntityOptions } from './types';
export default class Entity {
    private _ready;
    private _id;
    private _x;
    private _y;
    private _image;
    private _text;
    constructor(options?: EntityOptions);
    get ready(): boolean;
    set ready(value: boolean);
    get height(): number;
    protected set height(value: number);
    get width(): number;
    protected set width(value: number);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get image(): HTMLImageElement;
    private set image(value);
    get text(): string;
    protected set text(value: string);
    draw(context: Context): void;
    protected drawImage(context: Context): void;
    protected drawText(context: Context): void;
}
