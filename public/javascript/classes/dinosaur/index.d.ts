import Entity from '../entity';
import type { EntityOptions } from '../entity/types';
export default class Dinosaur extends Entity {
    private _alive;
    private _duck;
    private _jump;
    private _sprite;
    private _duration;
    private _updated;
    private _score;
    private _highscore;
    private _velocity;
    constructor(options?: EntityOptions);
    get alive(): boolean;
    set alive(value: boolean);
    get duck(): boolean;
    set duck(value: boolean);
    get duration(): number;
    set duration(value: number);
    get jump(): boolean;
    set jump(value: boolean);
    get highscore(): number;
    set highscore(value: number);
    get updated(): number;
    set updated(value: number);
    get score(): number;
    set score(value: number);
    get sprite(): number;
    protected set sprite(value: number);
    get velocity(): number;
    set velocity(value: number);
    animate(): void;
    draw(context: CanvasRenderingContext2D): void;
}
