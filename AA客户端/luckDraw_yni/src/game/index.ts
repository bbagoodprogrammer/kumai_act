import { Engine, Render, World, Bodies, Body, Runner } from 'matter-js';
import { uiw, uih, ballSize, colorBallSize, maxBalls, defaultAvatar, colorBallImages, userBallImages, allImages } from './config';
import { delay, getRand, loadImages } from './utils';

/**
 * https://stackoverflow.com/questions/58507514/matter-js-hollow-circle-body
 * https://github.com/liabru/matter-js/issues/380
 * 
 * Creates a polygon that can contain other objects by putting together
 * rectangles for each edge of the polygon.
 *
 * @param x, y: the center of the polygon
 * @param sides: the number of sides of the polygon
 * @param radius: the radius of the circumscribing circle
 * @param options: a set of properties applied to each edge of the polygon.
 * There are a few special options:
 *  'extraLength': The factor to increase the length of each rectangle by to
 *  avoid inner and outer gaps. Typically around 1.15.
 *  'width': the width of each rectangluar side. If this is too small, the
 *  matter-js engine will require a smaller interval to prevent objects from
 *  being pushed in / out of teh object.
 *  'initialRotation': The initital rotation to be applied to the shape.
 */
function containerPolygon(x: number, y: number, sides: number, radius: number, options): Body {
    const width = options.width || 20; delete options.width;
    const extraLength = options.extraLength || 1.15; delete options.extraLength;
    const initialRotation = options.initialRotation || 0; delete options.initialRotation;

    const theta = 2 * Math.PI / sides;
    const sideLength = 2 * radius * theta / 2 * extraLength;

    const parts = [];
    for (let i = 0; i < sides; i++) {
        // We'll build thin sides and then translate + rotate them appropriately.
        const body = Bodies.rectangle(0, 0, sideLength, width);
        Body.rotate(body, i * theta);
        Body.translate(body, { x: radius * Math.sin(i * theta), y: -radius * Math.cos(i * theta) });
        parts.push(body);

        if (i % (sides / 4) == 0) {
            const body = Bodies.circle(0, 0, 60);
            Body.translate(body, { x: radius * Math.sin(i * theta), y: -radius * Math.cos(i * theta) });
            parts.push(body);
        }
    }
    const ret = Body.create(options);
    Body.setParts(ret, parts);
    if (initialRotation) {
        Body.rotate(ret, initialRotation);
    }
    Body.translate(ret, { x: x, y: y });

    return ret;
}

/*
const game = new Game(document.getElementById('game'), ()=>{ console.log('Game inited'); });
game.setBalls([{uid:10,avatar:''}, {uid:100,avatar:''}]); //接口数据回来一次设置所有球
game.addBall(); //增加一个随机颜色球
game.addBall({uid:10,avatar:''}); //增加一个用户球
game.removeBall(); //随机移除一个颜色球
game.removeBall(10); //移除一个指定用户球
game.removeAllBalls(); //移除所有球
game.play(); //播放抽奖动画
game.stop(); //停止抽奖动画
*/
export default class Game {
    private world: World;
    private radius = uiw / 2;
    private wheel: Body;
    private timer;
    private balls: Body[] = [];
    inited = false;

    constructor(elem, cb) {
        this.init(elem, cb);
    }

    private getImageObject(src: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            // 用户头像为空或加载失败，使用默认头像
            const loadDefaultAvatar = () => {
                const avatar = new Image();
                avatar.onload = avatar.onerror = () => resolve(avatar);
                avatar.src = defaultAvatar;
            };

            if (!src) {
                loadDefaultAvatar();
            }

            const img = new Image();
            img.setAttribute('crossOrigin', 'Anonymous');
            img.onload = () => resolve(img);
            img.onerror = () => {
                if (/^http/i.test(src)) {
                    loadDefaultAvatar();
                } else {
                    resolve(img);
                }
            };
            img.src = src;
        });
    }

    private getColorBall(): Body {
        const texture = colorBallImages[getRand(0, colorBallImages.length - 1)];
        return Bodies.circle(0, 0, colorBallSize / 2, {
            label: 'empty',
            restitution: 1,
            render: {
                sprite: {
                    texture,
                    xScale: 1,
                    yScale: 1,
                },
            }
        });
    }

    private getUserBall({ uid = 0, avatar = '' } = {}) {
        const radius = ballSize / 2;
        const randImage = userBallImages[getRand(0, userBallImages.length - 1)];

        const body = Bodies.circle(0, 0, radius, {
            label: uid.toString(),
            restitution: .5,
            render: {
                sprite: {
                    texture: randImage,
                    xScale: 1,
                    yScale: 1,
                },
            }
        });

        const p1 = this.getImageObject(avatar);
        const p2 = this.getImageObject(randImage);
        Promise.all([p1, p2]).then(imgs => {
            const face = imgs[0];
            const ball = imgs[1];

            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = ballSize;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, ballSize, ballSize);

            ctx.save();
            const margin = 4;
            const faceWidth = ballSize - margin * 2;
            ctx.beginPath();
            ctx.arc(radius, radius, radius - margin, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.drawImage(face, margin, margin, faceWidth, faceWidth);
            ctx.restore();

            ctx.beginPath();
            ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.drawImage(ball, 0, 0, ballSize, ballSize);

            // https://github.com/liabru/matter-js/issues/433
            body.render.sprite.texture = canvas.toDataURL();
        });

        return body;
    }

    private async init(elem, cb) {
        const engine = Engine.create();
        this.world = engine.world;
        const render = Render.create({
            element: elem,
            engine: engine,
            options: {
                width: uiw,
                height: uih,
                wireframes: false,
                background: 'none',
                // showAngleIndicator: true,
            },
        });

        Engine.run(engine);
        Render.run(render);

        // FPS提升，物体速度更快，效果更真实（原理有待确认）
        const runner = Runner.create();
        Runner.run(runner, engine);

        const options: Matter.IChamferableBodyDefinition = { isStatic: true, render: { visible: false } };
        this.wheel = containerPolygon(this.radius, this.radius, 20, this.radius, options);

        // @ts-ignore
        World.add(this.world, this.wheel);

        await loadImages(...allImages);

        this.inited = true;
        if (typeof cb == 'function') {
            cb.call(this);
        }
    }

    async setBalls(balls: object[]) {
        this.removeAllBalls();
        for (let i = 0; i < maxBalls; i++) {
            this.addBall(balls.shift());
            await delay(50);
        }
    }

    private getMoreCountUserBall(uid: number) {
        const count = {};
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            const label = ball.label;
            if (label != 'empty' && label != uid.toString()) {
                count[label]++;
            }
        }

        let c = 0;
        for (let key in count) {
            if (count[key] > c) {
                c = count[key];
                uid = parseInt(key);
            }
        }
        return uid;
    }

    /**
     * 增加一个球到世界中（不传参数增加一个随机颜色球）
     * @param ball 包含uid和avatar属性对象
     */
    addBall(ball = null) {
        if (!this.inited) {
            console.error('Game not inited');
            return false;
        }

        // 展示球数已经达到上限，尝试删除一个再新增当前的球
        if (this.balls.length >= maxBalls) {
            if (ball) {
                // 尝试删除一个颜色球失败
                if (!this.removeBall()) {
                    // 删除一个展示较多的用户球
                    const removeUid = this.getMoreCountUserBall(ball.uid);
                    if (removeUid != ball.uid) {
                        this.removeBall(removeUid);
                    } else {
                        // 里面所有球已经是当前用户的球不执行操作
                        return false;
                    }
                }
            } else {
                // 达到上限后无法增加颜色球
                return false;
            }
        }

        const body = ball ? this.getUserBall(ball) : this.getColorBall();
        Body.setPosition(body, { x: uiw / 2, y: 160 });
        Body.rotate(body, getRand(0, 360) * (2 * Math.PI / 360));
        World.add(this.world, body);
        this.balls.push(body);
        return true;
    }

    removeBall(uid = 0): boolean {
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            const label = ball.label;
            if (uid.toString() == label || (uid == 0 && label == 'empty')) {
                World.remove(this.world, ball);
                this.balls = this.balls.slice(0, i).concat(this.balls.slice(i + 1));
                return true;
            }
        }
        return false;
    }

    removeAllBalls() {
        // World.clear(this.world, true); // 这样调用会把MouseConstraint也清除掉
        for (let i = 0; i < this.balls.length; i++) {
            World.remove(this.world, this.balls[i]);
        }
        this.balls = [];
    }

    play() {
        this.stop();
        const step = Math.random() > .5 ? .05 : -.05;
        this.timer = setInterval(() => {
            Body.rotate(this.wheel, step);
        }, 20);
    }

    stop() {
        clearInterval(this.timer);
    }
}