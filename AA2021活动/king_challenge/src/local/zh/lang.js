export default {
    //html/index.html
    title: "王者挑戰賽",
    rule_title: "規則獎勵",

    //footer
    act_noStart: "活動未開始", //活動未開始
    act_end: "活動已結束", //活動已結束
    singUp: "立即報名", //立即報名
    noRank: "未上榜", //未上榜
    singUp_suc: "報名成功", //報名成功
    room_pk: "房間挑戰", //房間挑戰
    room_pk_tips: "活動期間達到10000分的K房可獲得王者挑戰房間邊框10天", //活動期間達到10000分的K房可獲得王者挑戰房間邊框7天
    room_gift_tips: "", // 獎勵將通過系統自動發放到你的賬戶上，請留意！

    //common
    lv: "段位",
    ok: "確定", //確定

    //index
    rule: "活動規則", //活動規則
    gift_title: "活動獎勵", //活動獎勵
    giftList: [
        {
            img: require("../../img/giftList/gift1.png"),
            name: "王者挑戰徽章"
        },
        {
            img: require("../../img/giftList/gift2.png"),
            name: "王者挑戰頭飾"
        },
        {
            img: require("../../img/giftList/gift9.png"),
            name: "布加迪威龍"
        },
        {
            img: require("../../img/giftList/gift4.png"),
            name: "稀有禮物"
        },
        {
            img: require("../../img/giftList/gift5.png"),
            name: "王者系列邊框和主題"
        },
        {
            img: require("../../img/giftList/gift6.png"),
            name: "挑戰段位寶箱"
        },
        {
            img: require("../../img/giftList/gift7.png"),
            name: "海量金幣"
        },
        {
            img: require("../../img/giftList/gift8.png"),
            name: "海量金豆"
        }
    ],

    //rank
    rank_title1: "挑戰榜", //K房達人榜
    rank_title2: "熱房榜", //人氣K房榜
    rank_title3: "王者簽到",
    rank_timeDown1: "活動結束倒計時", //活動結束倒計時
    rank_timeDown2: "活動開始倒計時", //活動開始倒計時
    rank_day: "天", //天
    rank_hour: "時", //時
    rank_min: "分", //分
    rank_second: "秒", //秒
    rank_tips1:
        "根據活動期間用戶在1v1PK/擂台PK/禮物挑戰/歡唱KTV/談天說地模式下收到的金幣魅力值進行排名", //根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的金幣進行排名
    rank_tips2:
        "根據活動期間報名用戶的房間在1v1PK/擂台PK/禮物挑戰/歡唱KTV/談天說地模式下產生的金幣魅力值進行排名", //根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000
    loading: "加載中...", //加載中...
    noData: "暫無數據", //暫無數據
    room_model: {
        1: "1v1PK",
        2: "家族PK",
        3: "擂台PK",
        4: "禮物挑戰",
        5: "談天說地",
        6: "歡唱KTV"
    },
    //history
    history_tm: "時間",
    history_get: "途徑",
    history_gift: "獎勵",
    singIn: "簽到", // 簽到
    singIn_days: "連續簽到$天", //連續簽到{{item.mark}}天
    singIn_lvGift: "寶箱獎勵", //段位獎勵

    //tasks
    tasksTips: "完成每日簽到任務領取豐厚獎勵",
    tasksHistory: "獎勵記錄>",
    tasks_signInDay: "已累計簽到$天",
    tasks_signInDay2: "已連續簽到$天",
    tasks_signInDay3: "連續簽到$天",
    tasks_today: "今日簽到任務",
    singIn_ed: "已簽到",
    singIn_not: "未簽到",
    singIn_dayNums: "第$天",
    tasksTips2: "連續簽到獎勵",
    onLine: "人在線"
};
