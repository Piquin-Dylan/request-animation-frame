import {Rectangle} from "./framework25/shapes/Rectangle";
import {iPosition} from "./framework25/types/iPosition";
import {iColor} from "./framework25/types/iColor";


export class Obstacle extends Rectangle {


    constructor(ctx: CanvasRenderingContext2D, position: iPosition, color: iColor, width: number, height: number, rotation: number) {
        super(ctx, position, color, width, height, rotation);
    }

    update() {
        this.position.x--;
        super.draw()
    }
}