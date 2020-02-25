
let arr = []
let num = 0     //每天的几分数
for (var i = 1; i <= 25; i++) {
    let obj = {}
    obj.grade = i
    num += i * 1000
    obj.fraction = num
    arr.push(obj)
}
let giftArr = [
    {
        gift: [{
            type: 0,
            num: 20
        }]
    },
    {
        gift: [{
            type: 0,
            num: 20
        }]
    },
    {
        gift: [{
            type: 0,
            num: 20
        }]
    },
    {
        gift: [{
            type: 0,
            num: 20
        }, {
            type: 1,
            num: 1
        }]
    },
    {
        gift: [{
            type: 0,
            num: 20
        }, {
            type: 1,
            num: 1
        }]
    },
    {                             //6
        gift: [{
            type: 0,
            num: 20
        }, {
            type: 1,
            num: 1
        },
        {
            type: 4,
            num: 1,
        },
        {
            type: 5,
            num: 60,
        }]
    },
    {
        gift: [{
            type: 0,
            num: 50
        }, {
            type: 2,
            num: 1
        }],
    },
    {
        gift: [{
            type: 0,
            num: 50
        }, {
            type: 2,
            num: 1
        }],
    },
    {                             //9
        gift: [{
            type: 0,
            num: 50
        }, {
            type: 2,
            num: 1
        }],
    },
    {
        gift: [{
            type: 0,
            num: 80
        }, {
            type: 3,
            num: 1
        }],
    },
    {
        gift: [{
            type: 0,
            num: 80
        }, {
            type: 3,
            num: 1
        }],
    },
    {
        gift: [{
            type: 0,
            num: 80
        }, {                        //12
            type: 3,
            num: 1
        },
        {
            type: 4,
            num: 1,
        },
        {
            type: 5,
            num: 80,
        }]
    },
    {
        gift: [{
            type: 0,
            num: 80
        }, {
            type: 1,
            num: 2
        }],
    },
    {
        gift: [{
            type: 0,
            num: 80
        }, {
            type: 1,
            num: 2
        }],
    },
    {                          //15
        gift: [{
            type: 0,
            num: 80
        }, {
            type: 1,
            num: 2
        }],
    },
    {
        gift: [{
            type: 0,
            num: 110
        }, {
            type: 2,
            num: 2
        }],
    },
    {
        gift: [{
            type: 0,
            num: 110
        }, {
            type: 2,
            num: 2
        }],
    },
    {                          //18
        gift: [{
            type: 0,
            num: 110
        }, {
            type: 2,
            num: 2
        },
        {
            type: 4,
            num: 2,
        },
        {
            type: 5,
            num: 100,
        }]
    },
    {
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 3,
            num: 2
        }],
    },
    {
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 3,
            num: 2
        }],
    },
    {                          //21
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 3,
            num: 2
        }],
    },
    {
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 1,
            num: 3
        }],
    },
    {
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 1,
            num: 3
        }],
    },
    {                         //24
        gift: [{
            type: 0,
            num: 140
        }, {
            type: 1,
            num: 3
        }],
    },
    {                          //25
        gift: [{
            type: 0,
            num: 160
        }, {
            type: 2,
            num: 3
        },
        {
            type: 4,
            num: 3,
        },
        {
            type: 5,
            num: 120,
        }]
    },

]
export let newObj = arr.map((item, index) => {
    return { ...item, ...giftArr[index] };
});


export const findValueUseTwoSplit = (val) => {
    if (!val) {
        return {
            grade: 0,
        }
    }
    if (val >= newObj[newObj.length - 1].fraction) {
        newObj[newObj.length - 1].dcukScore = 0
        return newObj[newObj.length - 1]
    }
    if (val < newObj[0].fraction) {
        return {
            grade: 0,
            dcukScore: 1000 - val
        }
    }
    if (val <= 91000) {
        for (let i = 0; i < 13; i++) {
            if (val >= newObj[i].fraction && val < newObj[i + 1].fraction) {
                newObj[i].dcukScore = newObj[i + 1].fraction - val
                return newObj[i]
            }
        }
    } else {
        for (let i = 12; i < newObj.length; i++) {
            if (val >= newObj[i].fraction && val < newObj[i + 1].fraction) {
                newObj[i].dcukScore = newObj[i + 1].fraction - val
                return newObj[i]
            }
        }
    }
}

