const uiw = 600;
const uih = 600;
const ballSize = 115;
const colorBallSize = 72;
const maxBalls = 20;

const defaultAvatar = require('./assets/avatar.png');

const colorBallImages = [
    require('./assets/color_ball_1.png'),
    require('./assets/color_ball_2.png'),
    require('./assets/color_ball_3.png'),
    require('./assets/color_ball_4.png'),
];

const userBallImages = [
    require('./assets/user_ball_1.png'),
    require('./assets/user_ball_2.png'),
    require('./assets/user_ball_3.png'),
    require('./assets/user_ball_4.png'),
    require('./assets/user_ball_5.png'),
];

const allImages = colorBallImages.concat(userBallImages).concat([defaultAvatar]);

export {
    uiw,
    uih,
    ballSize,
    colorBallSize,
    maxBalls,
    defaultAvatar,
    colorBallImages,
    userBallImages,
    allImages,
}