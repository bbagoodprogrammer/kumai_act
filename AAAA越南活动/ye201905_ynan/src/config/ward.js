const wardList = {
    // type   1：500 đậu  2：Du Thuyền 7 ngày 3：VIP  4：1 Túi quà Xe Vương Miện 5:赤鷹戰機座駕9天
    //6:家族之星*1  7:老爺車座駕12天  8:仙女棒背包禮物*2 9:新年快乐座駕7天  10:家族鑰匙*1    11:家族戒指*1  
    //12:貴族富豪值1000  13:家族禮物套裝*1
    1: {
        score: 3000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500 đậu'
        },
        {
            type: 2,
            num: 5,
            name: 'Thuyền Rồng (7 ngày) '
        },
        {
            type: 3,
            num: 10,
            name: 'VIP 3 ngày'
        },
        {
            type: 6,
            num: 5,
            name: 'Ngôi Sao Tộc '
        }],
    },
    2: {
        score: 10000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500 đậu'
        },
        {
            type: 5,
            num: 10,
            name: 'Chiến Đấu CƠ(9 ngày)'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP 3 ngày'
        },
        {
            type: 6,
            num: 10,
            name: 'Ngôi Sao Tộc'
        }],
    },
    3: {
        score: 20000,
        giftItem: [{
            type: 1,
            num: 10,
            name: '500 đậu'
        },
        {
            type: 7,
            num: 10,
            name: 'Xe Cổ(12 ngày)'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP 6 ngày'
        },
        {
            type: 10,
            num: 20,
            name: 'Chìa Khóa Tộc'
        }],
    },
    4: {
        score: 30000,
        giftItem: [{
            type: 1,
            num: 20,
            name: '500 đậu'
        },
        {
            type: 9,
            num: 10,
            name: 'Xe Mừng Năm Mới(7 ngày)'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP 9 ngày'
        },
        {
            type: 11,
            num: 10,
            name: 'Nhẫn Gia Tộc'
        }]
    },
    5: {
        score: 50000,
        giftItem: [{
            type: 1,
            num: 10,
            name: '1000 đậu'
        },
        {
            type: 9,
            num: 20,
            name: 'Xe Mừng Năm Mới 7 ngày'
        },
        {
            type: 3,
            num: 10,
            name: 'VIP 15 ngày'
        },
        {
            type: 16,
            num: 10,
            name: 'Trượng Gia Tộc'
        }],
    },
    6: {
        score: 100000,
        giftItem: [{
            type: 3,
            num: 10,
            name: 'VIP 30 ngày'
        },
        {
            type: 9,
            num: 15,
            name: 'Xe Mừng Năm Mới 14 ngày'
        },
        {
            type: 14,
            num: 15,
            name: 'Quý Tộc Hầu Tước(7 ngày)'
        },
        {
            type: 13,
            num: 10,
            name: 'Bộ quà gia tộc'
        }],
    },
    7: {
        score: 300000,
        giftItem: [{
            type: 3,
            num: 5,
            name: 'VIP 30 ngày'
        },
        {
            type: 9,
            num: 15,
            name: 'Xe Mừng Năm Mới 28 ngày'
        },
        {
            type: 15,
            num: 10,
            name: 'Quý Tộc Công Tước(7 ngày)'
        },
        {
            type: 13,
            num: 20,
            name: 'Bộ quà gia tộc'
        }]
    }
}

export default wardList