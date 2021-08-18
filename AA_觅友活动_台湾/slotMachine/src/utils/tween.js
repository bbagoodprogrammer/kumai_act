//react-native-master/Libraries/Animation/AnimationUtils.js
//http://api.jqueryui.com/easings/

export default function tween(
    fromValue,
    toValue,
    duration,
    tick,
    complete,
    easing
) {
    if (typeof easing != "function") {
        easing = function(t) {
            return t;
        };
    }
    var start = 0;
    var end = parseInt((duration / 1000) * 60); //每秒60帧
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
    var func = function() {
        var value = fromValue + easing(start++ / end) * (toValue - fromValue);
        if (typeof tick == "function") {
            tick(value);
        }
        if (start > end && typeof complete == "function") {
            complete(value);
        }
        if (start <= end) {
            requestAnimationFrame(func);
        }
    };
    func();
}

function linear(t) {
    return t;
}
function easeInQuad(t) {
    return t * t;
}
function easeOutQuad(t) {
    return -t * (t - 2);
}
function easeInOutQuad(t) {
    t = t * 2;
    if (t < 1) {
        return 0.5 * t * t;
    }
    return -((t - 1) * (t - 3) - 1) / 2;
}
function easeInCubic(t) {
    return t * t * t;
}
function easeOutCubic(t) {
    t -= 1;
    return t * t * t + 1;
}
function easeInOutCubic(t) {
    t *= 2;
    if (t < 1) {
        return 0.5 * t * t * t;
    }
    t -= 2;
    return (t * t * t + 2) / 2;
}
function easeInQuart(t) {
    return t * t * t * t;
}
function easeOutQuart(t) {
    t -= 1;
    return -(t * t * t * t - 1);
}
function easeInOutQuart(t) {
    t *= 2;
    if (t < 1) {
        return 0.5 * t * t * t * t;
    }
    t -= 2;
    return -(t * t * t * t - 2) / 2;
}
function easeInQuint(t) {
    return t * t * t * t * t;
}
function easeOutQuint(t) {
    t -= 1;
    return t * t * t * t * t + 1;
}
function easeInOutQuint(t) {
    t *= 2;
    if (t < 1) {
        return (t * t * t * t * t) / 2;
    }
    t -= 2;
    return (t * t * t * t * t + 2) / 2;
}
function easeInSine(t) {
    return -Math.cos(t * (Math.PI / 2)) + 1;
}
function easeOutSine(t) {
    return Math.sin(t * (Math.PI / 2));
}
function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}
function easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}
function easeOutExpo(t) {
    return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
}
function easeInOutExpo(t) {
    if (t === 0) {
        return 0;
    }
    if (t === 1) {
        return 1;
    }
    t *= 2;
    if (t < 1) {
        return 0.5 * Math.pow(2, 10 * (t - 1));
    }
    return (-Math.pow(2, -10 * (t - 1)) + 2) / 2;
}
function easeInCirc(t) {
    return -(Math.sqrt(1 - t * t) - 1);
}
function easeOutCirc(t) {
    t -= 1;
    return Math.sqrt(1 - t * t);
}
function easeInOutCirc(t) {
    t *= 2;
    if (t < 1) {
        return -(Math.sqrt(1 - t * t) - 1) / 2;
    }
    t -= 2;
    return (Math.sqrt(1 - t * t) + 1) / 2;
}
function easeInElastic(t) {
    var s = 1.70158;
    var p = 0.3;
    if (t === 0) {
        return 0;
    }
    if (t === 1) {
        return 1;
    }
    var s = (p / (2 * Math.PI)) * Math.asin(1);
    t -= 1;
    return -(Math.pow(2, 10 * t) * Math.sin(((t * 1 - s) * (2 * Math.PI)) / p));
}
function easeOutElastic(t) {
    var s = 1.70158;
    var p = 0.3;
    if (t === 0) {
        return 0;
    }
    if (t === 1) {
        return 1;
    }
    var s = (p / (2 * Math.PI)) * Math.asin(1);
    return (
        Math.pow(2, -10 * t) * Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) + 1
    );
}
function easeInOutElastic(t) {
    var s = 1.70158;
    var p = 0.3 * 1.5;
    if (t === 0) {
        return 0;
    }
    t *= 2;
    if (t === 2) {
        return 1;
    }
    var s = (p / (2 * Math.PI)) * Math.asin(1);
    if (t < 1) {
        t -= 1;
        return (
            -(
                Math.pow(2, 10 * t) *
                Math.sin(((t * 1 - s) * (2 * Math.PI)) / p)
            ) / 2
        );
    }
    t -= 1;
    return (
        (Math.pow(2, -10 * t) * Math.sin(((t * 1 - s) * (2 * Math.PI)) / p)) /
            2 +
        1
    );
}
function easeInBack(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function easeOutBack(t) {
    var s = 1.70158;
    t -= 1;
    return t * t * ((s + 1) * t + s) + 1;
}
function easeInOutBack(t) {
    var s = 1.70158 * 1.525;
    t *= 2;
    if (t < 1) {
        return (t * t * ((s + 1) * t - s)) / 2;
    }
    t -= 2;
    return (t * t * ((s + 1) * t + s) + 2) / 2;
}
function easeInBounce(t) {
    return 1 - easeOutBounce(1 - t);
}
function easeOutBounce(t) {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
    } else {
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
}
function easeInOutBounce(t) {
    if (t < 0.5) {
        return easeInBounce(t * 2) / 2;
    }
    return easeOutBounce(t * 2 - 1) / 2 + 0.5;
}

export {
    tween,
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInBack,
    easeOutBack,
    easeInOutBack,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce
};
