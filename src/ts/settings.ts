export const settings = {
    rectangle: {
        minHeight: 30,
        maxHeight: 50,
        minWidth: 25,
        maxWidth: 40,
        minSpeed: 5,
        maxSpeed: 7
    },
    monster: {
        src: "src/img/sprite.png",
        width: 27,
        height: 29,
        frames: [
            {
                sx: 104,
                sy: 16,
            }, {
                sx: 132,
                sy: 16,
            }, {
                sx: 160,
                sy: 16,
            }, {
                sx: 188,
                sy: 16,
            }, {
                sx: 216,
                sy: 16,
            }, {
                sx: 244,
                sy: 16,
            }],
        x: 50,
        y: 150,
        maxFallSpeed: 3
    },
    gravity: 0.2,
    canvasID: "my-canvas"
}