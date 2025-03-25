import {Rectangle} from "./framework25/shapes/Rectangle";
import {iPosition} from "./framework25/types/iPosition";
import {iColor} from "./framework25/types/iColor";
import {settings} from "./settings";
import {Obstacle} from "./Obstacle";


export class Monster extends Rectangle {

    private sprite: CanvasImageSource;
    public currentFrame: number
    private velicityY: number
    private isJumping: boolean;
    private gravity: number = 0.5;
    private jumpStrenght: number = 10
    private groundY: number


    constructor(sprite: CanvasImageSource, ctx: CanvasRenderingContext2D, position: iPosition, color: iColor, width: number, height: number, rotation: number) {
        super(ctx, position, color, width, height, rotation);

        this.sprite = sprite;
        this.currentFrame = 0;
        this.velicityY = 0;
        this.isJumping = false;
        this.groundY = this.position.y
    }


    draw() {
        this.ctx.drawImage(
            this.sprite,
            settings.monster.frames[this.currentFrame].sx,
            settings.monster.frames[this.currentFrame].sy,
            this.width,
            this.height,
            this.position.x - this.width / 2,
            this.position.y - this.height / 2,
            this.width,
            this.height
        )


    }

    jump() {

        if (!this.isJumping) {
            this.velicityY = -this.jumpStrenght
            this.isJumping = true;
        }

    }

    update() {
        this.velicityY += this.gravity
        this.position.y += this.velicityY
        if (this.position.y >= this.groundY) {
            this.position.y = this.groundY
            this.velicityY = 0
            this.isJumping = false;
        }

        this.currentFrame++
        if (this.currentFrame >= settings.monster.frames.length) {
            this.currentFrame = 0;
        }
        this.draw();
    }

    checkCollision(obstacle: Obstacle): boolean {
        return (
            this.position.x < obstacle.position.x + obstacle.width &&
            this.position.x + this.width > obstacle.position.x &&
            this.position.y < obstacle.position.y + obstacle.height &&
            this.position.y + this.height > obstacle.position.y
        );
    }

}