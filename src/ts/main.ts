import {settings} from "./settings";
import {Monster} from "./Monster";
import {Hsl} from "./framework25/colors/Hsl";
import {randomInt} from "./framework25/helpers/random";
import {Obstacle} from "./Obstacle";

const app = {
    canvas: document.getElementById(settings.canvasID) as HTMLCanvasElement,
    ctx: null as CanvasRenderingContext2D | null,
    monster: null as Monster | null,
    obstacles: [] as Obstacle[],

    init() {
        this.ctx = this.canvas.getContext("2d");
        this.monster = new Monster(
            new Image(), this.ctx,
            {x: 100, y: this.canvas.height - settings.monster.height / 2},
            new Hsl(200, 200, 10),
            settings.monster.width, settings.monster.height, 0
        );

        this.canvas.addEventListener("click", (e) => this.handleClick(e));
        setInterval(() => this.addObstacles(), 2000);
        this.animate();
    },

    addObstacles() {
        for (let i = 0; i < randomInt(1, 3); i++) {
            this.obstacles.push(new Obstacle(
                this.ctx!, {x: this.canvas!.width + randomInt(50, 300), y: this.canvas!.height - 50},
                new Hsl(200, 1, 10), randomInt(20, 50), 50, 0
            ));
        }
    },

    handleClick(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

        this.obstacles = this.obstacles.filter(ob => !(
            x >= ob.position.x - ob.width / 2 && x <= ob.position.x + ob.width / 2 &&
            y >= ob.position.y - ob.height / 2 && y <= ob.position.y + ob.height / 2
        ));
    },

    animate() {
        if (!this.ctx || !this.monster) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.monster.update();
        this.obstacles.forEach(ob => ob.update());
        this.obstacles = this.obstacles.filter(ob => ob.position.x + ob.width > 0);

        requestAnimationFrame(() => this.animate());
    }
};

app.init();
