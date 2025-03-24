import {settings} from "./settings";
import {Monster} from "./Monster";
import {Hsl} from "./framework25/colors/Hsl";
import {randomInt} from "./framework25/helpers/random";
import {Obsctacle} from "./Obsctacle";


const app = {
    init() {

        this.obstacles = [];
        this.canvas = document.getElementById(settings.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.sprite = new Image();
        this.sprite.src = settings.monster.src;
        this.addObstacle();
        this.addEventListeners();

    },

    addEventListeners() {
        this.sprite.addEventListener('load', () => {
            this.monster = new Monster(
                this.sprite, this.ctx,
                {y: this.canvas.height - settings.monster.height / 2, x: settings.monster.width},
                new Hsl(200, 100, 200),
                settings.monster.height,
                settings.monster.width,
            )
            this.monster.draw();
            window.requestAnimationFrame(this.animate.bind(this))
        })
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.monster.jump(); // 🔥 Appel de la fonction pour sauter
                event.preventDefault()
            }
        });


    },

    addObstacle() {

        const width = randomInt(settings.rectangle.minWidth, settings.rectangle.maxWidth);
        const height = randomInt(settings.rectangle.minHeight, settings.rectangle.maxHeight);

        this.obstacles.push(new Obsctacle(
            this.ctx,
            {x: this.canvas.width + width / 2, y: this.canvas.height - height / 2},
            new Hsl(200, 100, 200),
            width,
            height,
            0)
        )
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.monster.update();

        for (const obstacle of this.obstacles) {
            obstacle.update();
        }

        requestAnimationFrame(this.animate.bind(this));
    }

};
app.init();
