import type { Context } from '../entity/types';
import type { Options } from './types';
export default class Canvas {
    private _context;
    private _canvas;
    constructor(options?: Options);
    get canvas(): HTMLCanvasElement;
    set canvas(value: HTMLCanvasElement);
    get context(): Context;
    set context(value: Context);
    get height(): number;
    set height(value: number);
    get parent(): HTMLElement;
    set parent(value: HTMLElement);
    get width(): number;
    set width(value: number);
}
