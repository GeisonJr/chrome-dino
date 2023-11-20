import Entity from '../entity';
import type { MountainOptions } from './types';
export default class Mountain extends Entity {
    private _distance;
    constructor(options?: MountainOptions);
    get distance(): number;
    set distance(value: number);
    draw(context: CanvasRenderingContext2D): void;
}
