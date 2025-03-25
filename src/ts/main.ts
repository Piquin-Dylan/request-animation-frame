import {settings} from "./settings";
import {Monster} from "./Monster";
import {Hsl} from "./framework25/colors/Hsl";
import {randomInt} from "./framework25/helpers/random";
import {Obstacle} from "./Obstacle";


const app = {

    init() {
        this.obstacles = []
        this.canvas = document.getElementById(settings.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.sprite = new Image();
        this.sprite.src = settings.monster.src
        this.addObstacles();
        this.addEventListeners();
    },

    addEventListeners() {

        this.sprite.addEventListener('load', () => {
            this.monster = new Monster(
                this.sprite, this.ctx,
                {y: this.canvas.height - settings.monster.height / 2, x: settings.monster.width},
                new Hsl(200, 200, 10),
                settings.monster.height,
                settings.monster.width,
                0,
            )
            this.monster.draw()
            window.requestAnimationFrame(this.animate.bind(this))
        })

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.monster.jump()
                e.preventDefault()
            }
        })
    },

    addObstacles() {

        const width = randomInt(settings.rectangle.minWidth, settings.rectangle.maxWidth)
        const height = randomInt(settings.rectangle.minHeight, settings.rectangle.maxHeight)

        this.obstacles.push(new Obstacle(
            this.ctx,
            {x: this.canvas.width + width / 2, y: this.canvas.height - height / 2},
            new Hsl(200, 1, 10),
            width,
            height,
            0
        ))
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.monster.update();

        for (const obstacle of this.obstacles) {
            obstacle.update();

            if (this.monster.checkCollision(obstacle)) {
                alert("Collision détectée !");
                // Gérer la collision ici (arrêter le jeu, réduire la vie, etc.)
            }
        }

        requestAnimationFrame(this.animate.bind(this));
    }

}
app.init()