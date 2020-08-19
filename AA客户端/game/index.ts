import { Engine, Render, World, Bodies, Body, Vector } from 'matter-js';
import { uiw, uih, images } from './config';
import { loadImages } from './utils';

let ratio = 1;

async function gameInit() {
    const elBalls = document.getElementById('balls');
    const elWidth = elBalls.clientWidth;
    const elHeight = elBalls.clientHeight;
    ratio = elWidth / uiw;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
        element: elBalls,
        engine: engine,
        options: {
            width: elWidth,
            height: elHeight,
            wireframes: false,
            // background: 'none',
            // showAngleIndicator: true,
        },
    });

    const wallY = uih / 2 * ratio;
    const wallW = 20 * ratio;
    const wallH = uih * ratio;
    const options = { isStatic: true, render: { visible: false} };
    const leftWall = Bodies.rectangle(3*ratio, wallY, wallW, wallH, options);
    const rightWall = Bodies.rectangle(597*ratio, wallY, wallW, wallH, options);
    const topWall = Bodies.rectangle(uiw/2*ratio, 10*ratio, uiw*ratio, 20*ratio, options);
    const ground = Bodies.rectangle(uiw/2*ratio, 597*ratio, uiw*ratio, 20*ratio, options);
    
    World.add(world, [leftWall, rightWall, topWall, ground]);

    Engine.run(engine);

    Render.run(render);

    await loadImages(...images);

    // 初始化所有球
    const balls = [];
    images.concat(images).forEach(src => {
        const ball = Bodies.circle(uiw/2*ratio, 100*ratio, 40*ratio, {
            density: ratio > .5 ? .001 : .003,
            render: {
                sprite: {
                    texture: src,
                    xScale: ratio,
                    yScale: ratio,
                },
            }
        });
        World.add(world, ball);
        balls.push(ball);
    });

    // 创建一个高质量的球从上往下沉带动所有球动
    // let ball;
    // const tick = () => {
    //     if (!ball) {
    //         const x = (30 + Math.random() * 540)*ratio;
    //         ball = Bodies.circle(x, 50*ratio, 40*ratio, { density: 0.2, friction: .2, render: { visible: false} });
    //         World.add(world, ball);
    //     }
    //     const time = Math.round(Math.random()*500 + Math.random()*2500);
    //     setTimeout(tick, time);
    // };
    // tick();
    // setInterval(() => {
    //     if (ball && ball.position.y > 520*ratio) {
    //         World.remove(world, ball);
    //         ball = null;
    //     }
    // }, 100);

    // 取最底部一个球向上动带动所有球动
    const tick = () => {
        const bottomBalls = [];
        balls.forEach(ball => {
            if (ball.position.y > 520*ratio) {
                bottomBalls.push(ball);
            }
        });
        if (bottomBalls.length) {
            const randIndex = Math.floor(Math.random() * (bottomBalls.length - 1));
            const ball = bottomBalls[randIndex];
            const x = Math.random() > .5 ? -.5*ratio : .5*ratio;
            const y = -ratio;
            Body.applyForce(ball, {x:ball.position.x, y:ball.position.y}, {x, y});
        }
        const time = Math.round(1000 + Math.random()*2000);
        setTimeout(tick, time);
    };
    tick();
}

export {
    gameInit,
}
