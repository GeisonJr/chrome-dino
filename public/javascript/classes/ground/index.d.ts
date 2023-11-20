import Entity from '../entity';
import type { EntityOptions } from '../entity/types';
export default class Ground extends Entity {
    constructor(options?: EntityOptions);
    draw(context: CanvasRenderingContext2D): void;
}
