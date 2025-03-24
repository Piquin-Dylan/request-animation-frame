import {Rectangle} from "./framework25/shapes/Rectangle";
import {iPosition} from "./framework25/types/iPosition";
import {iColor} from "./framework25/types/iColor";
import {settings} from "./settings";

export class Monster extends Rectangle {

    private sprite: CanvasImageSource;
    public currentFrame: number;
    private velocityY: number;
    private isJumping: boolean;
    private gravity: number = 0.5;
    private jumpStrength: number = 10;
    private groundY: number;


    constructor(sprite: CanvasImageSource, ctx: CanvasRenderingContext2D, position: iPosition, color: iColor, width: number, height: number, rotation: number = 0) {
        super(ctx, position, color, width, height, rotation);
        this.sprite = sprite;
        this.currentFrame = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.groundY = position.y; // Position au sol
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
            this.height,
        );
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -this.jumpStrength; // Appliquer une impulsion vers le haut
            this.isJumping = true;
        }
    }

    update() {

        this.velocityY += this.gravity; // Appliquer la gravité
        this.position.y += this.velocityY; // Déplacer le sprite

        // Vérifier si le monstre touche le sol
        if (this.position.y >= this.groundY) {
            this.position.y = this.groundY;
            this.velocityY = 0;
            this.isJumping = false;
        }

        this.currentFrame++;
        if (this.currentFrame >= settings.monster.frames.length) {
            this.currentFrame = 0;
        }
        this.draw();
    }
}
