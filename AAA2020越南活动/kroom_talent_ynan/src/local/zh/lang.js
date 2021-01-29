export default {
    //html/index.html
    title: '人氣K房達人賽',
    rule_title: '人氣K房達人賽',

    //footer
    act_noStart: '活動未開始',  //活動未開始
    act_end: '活動已結束',  //活動已結束
    singUp: '立即報名',  //立即報名
    noRank: '未上榜', //未上榜
    singUp_suc: '報名成功', //報名成功

    //index
    rule: '活動規則',  //活動規則
    gift_title: '活動獎勵', //活動獎勵
    giftList: [
        {
            img: require("../../img/giftList/gift1.png"),
            name: 'K房達人徽章'
        },
        {
            img: require("../../img/giftList/gift2.png"),
            name: '人氣K房主題'
        },
        {
            img: require("../../img/giftList/gift3.png"),
            name: '隆重登場座駕'
        },
        {
            img: require("../../img/giftList/gift4.png"),
            name: '稀有特效禮物'
        },
        {
            img: require("../../img/giftList/gift5.png"),
            name: '海量金幣'
        },
        {
            img: require("../../img/giftList/gift6.png"),
            name: '海量金豆'
        }
    ],
    //Integral
    integral_lv: '我的達人等級',//我的達人等級
    integral_coins: '消費金幣',//消費金幣
    integral_tips: '在禮物紅包/福運禮物/砸蛋探寶中消費金幣可獲得相應獎勵',//在禮物紅包/福運禮物/砸蛋探寶中消費金幣可獲得相應獎勵
    integral_luck: '恭喜獲得',//恭喜獲得
    integral_luckTips: '獎勵獎通過系統自動發放到您的帳戶上',//獎勵獎通過系統自動發放到您的帳戶上
    integral_ok: '確定',//確定
    giftArr: {
        1: {
            gift_tips: 'x30',
            img: require('../../img/get_gift/giftItem_1.png'),
            name: '10 金幣',
            act_width: '13%',
            gname: '30 金豆'
        },
        2: {
            gift_tips: '7天',
            img: require('../../img/get_gift/giftItem_2.png'),
            name: '30 金幣',
            act_width: '30%',
            gname: 'VIP7天'
        },
        3: {
            img: require('../../img/get_gift/giftItem_3.png'),
            name: '100 金幣',
            act_width: '50%',
            gname: '紅玫瑰（180金豆）'
        },
        4: {
            img: require('../../img/get_gift/giftItem_6.png'),
            name: '300 金幣',
            act_width: '70%',
            gname: '雞尾酒（5金幣）'
        },
        5: {
            gift_tips: '7天',
            img: require('../../img/get_gift/giftItem_5.png'),
            name: '500 金幣',
            act_width: '100%',
            gname: '糖果城名片7天（110金幣）'
        },
    },


    //rank
    rank_title1: 'K房達人榜',  //K房達人榜
    rank_title2: '人氣K房榜',//人氣K房榜
    rank_timeDown1: '活動結束倒計時', //活動結束倒計時
    rank_timeDown2: '活動開始倒計時', //活動開始倒計時
    rank_day: '天',//天
    rank_hour: '時',//時
    rank_min: '分',//分
    rank_second: '秒', //秒
    rank_tips1: '根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的金幣進行排名', //根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的金幣進行排名
    rank_tips2: '根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000', //根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000
    loading: '加載中...',//加載中...
    noData: '暫無數據', //暫無數據

}