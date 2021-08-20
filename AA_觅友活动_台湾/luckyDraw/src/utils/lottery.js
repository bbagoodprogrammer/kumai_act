import {tween,linear, easeInOutSine} from './tween'

/**
 * 格子抽奖
 * @param {number} gridsCount 格子总数
 * @param {number} targetIndex 本轮抽奖目标索引
 * @param {function} tick 格子索引更新回调，在这里设置Vue data属性，并驱动格子高亮状态改变
 * @param {function} complete 抽奖完成回调，会传回抽奖目标索引
 * @param {number} [startIndex=0] 抽奖从第几个索引开始，绑定Vue data属性可实现从上一轮结果继续开始下一轮抽奖
 */
function lotteryForGrids(gridsCount, targetIndex, tick, complete, startIndex = 0,cycle,duration) {
    // const cycle = 1;
    // const duration = 200;

    targetIndex = Math.min(Math.max(0, targetIndex), gridsCount - 1);
    startIndex = Math.min(Math.max(0, startIndex), gridsCount - 1);
    
    const to = gridsCount * cycle + targetIndex;
    let step = startIndex - 1;
    let gridIndex = startIndex - 1;
    tween(startIndex, to, duration, value => {
        if (Math.round(value) != step) {
            step++;
            gridIndex++;
            if (gridIndex >= gridsCount) {
                gridIndex = 0;
            }
            tick(gridIndex);
        }
    }, () => {
        complete(targetIndex);
    }, linear);
}

/**
 * 转盘抽奖
 * @param {number} stepCount 转盘分割总数
 * @param {number} targetIndex 本轮抽奖目标索引
 * @param {function} tick 格子索引更新回调，在这里设置Vue data属性，并驱动格子高亮状态改变
 * @param {function} complete 抽奖完成回调，会传回抽奖目标索引
 * @param {number} [startIndex=0] 抽奖从第几个索引开始，绑定Vue data属性可实现从上一轮结果继续开始下一轮抽奖
 * @param {number} [offset=0] 角度偏移量，如果美术设计第一个奖项指针是垂直指向北的，需要设置本值为负单个扇形角度二分之一值
 */
function lotteryForTurntable(stepCount, targetIndex, tick, complete, startIndex = 0, offset = 0) {
    const cycle = 5;
    const duration = 7000;

    targetIndex = Math.min(Math.max(0, targetIndex), stepCount - 1);
    startIndex = Math.min(Math.max(0, startIndex), stepCount - 1);

    const angle = 360 / stepCount;
    const target = targetIndex * angle + angle / 2 + offset;
    const start = startIndex * angle + angle / 2 + offset;
    const to = 360 * cycle + target;
    tween(start, to, duration, value => {
        tick(Math.round(value * 100) / 100);
    }, () => {
        complete(targetIndex);
    }, easeInOutSine);
}

export {
    lotteryForGrids,
    lotteryForTurntable,
}