const wardList = {
    // type   1：500金豆  2：極速快艇座駕7天 3：VIP  4：皇冠車背包禮物*1 5:赤鷹戰機座駕9天
    //6:家族之星*1  7:老爺車座駕12天  8:仙女棒背包禮物*2 9:新年快乐座駕7天  10:家族鑰匙*1    11:家族戒指*1  
    //12:貴族富豪值1000  13:家族禮物套裝*1
    1: {
        score: 3000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500金豆'
        },
        {
            type: 2,
            num: 10,
            name: '極速快艇座駕7天'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP3天'
        },
        {
            type: 4,
            num: 10,
            name: '皇冠車背包禮物*1'
        }],
    },
    2: {
        score: 10000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500金豆'
        },
        {
            type: 5,
            num: 10,
            name: '赤鷹戰機座駕9天'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP3天'
        },
        {
            type: 6,
            num: 10,
            name: '家族之星*1'
        }],
    },
    3: {
        score: 18000,
        giftItem: [{
            type: 1,
            num: 10,
            name: '500金豆'
        },
        {
            type: 7,
            num: 10,
            name: '老爺車座駕12天  '
        },
        {
            type: 3,
            num: 10,
            name: 'VIP6天'
        },
        {
            type: 8,
            num: 20,
            name: '仙女棒背包禮物*2 '
        }],
    },
    4: {
        score: 30000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500金豆'
        },
        {
            type: 9,
            num: 10,
            name: '新年快乐座駕7天'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP9天'
        },
        {
            type: 10,
            num: 10,
            name: '家族鑰匙*1'
        }]
    },
    5: {
        score: 50000,
        giftItem: [{
            type: 4,
            num: 10,
            name: '皇冠車背包禮物'
        },
        {
            type: 9,
            num: 20,
            name: '新年快乐座駕7天'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP15天 '
        },
        {
            type: 11,
            num: 10,
            name: '家族戒指*1'
        }],
    },
    6: {
        score: 100000,
        giftItem: [{
            type: 3,
            num: 10,
            name: 'VIP30天'
        },
        {
            type: 9,
            num: 15,
            name: '新年快乐座駕14天'
        },
        {
            type: 12,
            num: 20,
            name: '貴族富豪值1000'
        },
        {
            type: 13,
            num: 5,
            name: '家族禮物套裝*1'
        }],
    },
    7: {
        score: 200000,
        giftItem: [{
            type: 3,
            num: 10,
            name: 'VIP30天'
        },
        {
            type: 9,
            num: 15,
            name: '新年快乐座駕28天'
        },
        {
            type: 12,
            num: 15,
            name: '貴族富豪值10000'
        },
        {
            type: 13,
            num: 10,
            name: '家族禮物套裝*1'
        }]
    }
}

export default wardList