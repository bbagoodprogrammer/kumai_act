export default {
    READY_TIME: 3, //准备时间（单位：s）
    GAME_TIME: 60, //游戏时长（单位：s）
    LEVEL_CHANGE_COUNT: 30, //难度等级变换系数（打中黄鼠数量）

    TWO_GRAY_MOUSE_CHANCE: 0, //出现两只灰鼠概率
    MORE_YELLOW_MOUSE_LIMIT: 6, //黄鼠太多限制灰鼠生成数量
    CREATE_MOUSE_MAX_DELAY: 300, //生成一批鼠最大随机延时（单位：ms）

    SHOW_MOUSE_TIME1: 1000, //第一阶段黄鼠出现时间间隔（单位：ms）
    SHOW_MOUSE_TIME2: 500, //第二阶段黄鼠出现时间间隔（单位：ms）

    GRAY_MOUSE_SCORE: -30, //打中黄鼠减分
    YELLOW_MOUSE_SCORE1: 10, //第一阶段打中黄鼠基础得分
    YELLOW_MOUSE_SCORE2: 20, //第二阶段打中黄鼠基础得分
    DOUBLE_HIT_SCORE: 2, //连续打中黄鼠加分系数

    GRAY_MOUSE: 0, //灰鼠ID
    YELLOW_MOUSE: 1, //黄鼠ID
    GRAY_MOUSE_HIT: 2, //打中时灰鼠ID
    YELLOW_MOUSE_HIT: 3, //打中时黄鼠ID

    STAY_TIME: 1000, //鼠出现停留时间（不包含冒出和退回动画时间，单位：ms）
    TICK_TIME: 30, //动画计时器间隔（单位：ms）
    SPEED: .15, //动画位移速度（单位：rem）
    MIN_TRANSLATE_Y: -1.8, //鼠完全出现时Y轴数值（单位：rem）
    HIT_STAY_TIME: 200, //打中停留时间（单位：ms）
}