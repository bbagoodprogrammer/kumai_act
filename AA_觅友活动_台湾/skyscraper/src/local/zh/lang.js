export default {
    //html/index.html
    title: "摩天大樓",
    noAct: "活動未開始",
    actEd: "活動已結束",

    //index
    rule_tips: "規則獎勵",
    de: "的",
    lv_up: "你的大樓升級啦！",
    lv_up_tips: "恭喜你的大樓已經升級到",
    gift: "獎勵",
    ok: "開心收下",
    fans_rank_title: "的粉絲榜",
    rank: "排名",
    user: "用戶",
    total_height: "總高度",
    fans_tips: "*總高度為粉絲對同一名主播所貢獻的高度總和，榜單顯示前20名粉絲",
    goKroom: "進入主播房間",
    floorConfig: {
        0: {
            name: "空地",
            score: "",
            tips: "",
            gift: []
        },
        1: {
            name: "豪華酒店",
            score: "5000",
            tips: "酒店將古典和現代設施完美融合，極具特色，擁有100間客房",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_1.png"),
                    name: "豪華酒店-背包禮物*1"
                },
                {
                    img: require("../../img/floor_giftList/gift_7.png"),
                    name: "魅力四射-背包禮物*1"
                }
            ]
        },
        2: {
            name: "大笨鐘",
            score: "30000",
            tips: "聳立於最精華地段，遊客可享盡英倫美景，營造浪漫風情",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_2.png"),
                    name: "大笨鐘-背包禮物*1"
                },
                {
                    img: require("../../img/floor_giftList/gift_6.png"),
                    name: "1000金豆"
                },
                {
                    img: require("../../img/floor_giftList/gift_8.png"),
                    name: "貓貓星雲-背包禮物*1"
                }
            ]
        },
        3: {
            name: "帝國大廈",
            score: "60000",
            tips:
                "頂樓的風很大，吹亂了我的頭髮，但整座不夜城的風景都能盡收眼底",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_3.png"),
                    name: "帝國大廈-背包禮物*1"
                },
                {
                    img: require("../../img/floor_giftList/gift_6.png"),
                    name: "2000金豆"
                },
                {
                    img: require("../../img/floor_giftList/gift_9.png"),
                    name: "琴音裊裊-背包禮物*1"
                }
            ]
        }
    },

    //roolMsg
    get: "建成",
    rool_msg: "@收到#的$,+%高度",
    //rank
    tm_tips1: "活動開始倒計時",
    tm_tips2: "活動結束倒計時",
    tm_tips3: "活動已結束",
    rank_day: "天",
    rank_hour: "時",
    rank_min: "分",
    rank_second: "秒",
    noData: "暫無數據",

    //rule
    rule_gift1: [
        {
            img: require("./img/gift1.png"),
            name: "pick you"
        },
        {
            img: require("./img/gift2.png"),
            name: "彩虹燈"
        },
        {
            img: require("./img/gift3.png"),
            name: "發射愛心"
        }
    ],
    rule_gift2: [
        {
            img: require("./img/gift4.png"),
            name: "盛放系列頭像框"
        },
        {
            img: require("./img/gift5.png"),
            name: "飛翔熱氣球座駕"
        },
        {
            img: require("./img/gift6.png"),
            name: "金幣"
        }
    ],

    //userTask
    task_title: "建設進度：",
    task_name: "任務",
    task_score: "對應積分",
    task_limt: "積分上限",
    bar: "進度",
    noSet: "不限",
    task_doed: "已達成",
    dayScore: "今日高度:",
    last_nums: "較昨日",
    help_msg1: "開播收禮",
    help_msg2: "幫主播建樓",
    need_height: "所需高度：",
    taskName: [
        {
            desc: "進房人數",
            score: "1人=1分"
        },
        {
            desc: "收到指定禮物",
            score: "1金幣=1分"
        }
    ],
    //html/app_share.ejs
    share_title: "摩天大樓",
    share_desc: "",
    //rule
    rule_tite: "規則&獎勵",
    rule_tm: "活動時間：",
    rule_p_1: "1、參與對象",
    rule_p_2:
        "平台內已經合作的官方主播和官方房主均可以參與，活動期間內成為官方主播和官方房主均可參與，有興趣加入的玩家可聯繫音覓莓莓子（UID:1888）",
    rule_p_3: "2、如何建高樓",
    rule_p_4:
        "官方主播和官方房主均獲得一塊空地，通過任務累計高度即可建成對應的大樓，並獲得對應的建成獎勵",
    rule_p_5: "3、任務",
    rule_p_6: "主播通過以下兩個任務可獲得高度",
    rule_p_7:
        "進房人數：一位玩家當天首次進入某主播房間算作完成一次任務，一人=1高度， 每日上限100；官方主播/官方房主進入自己房間不算",
    rule_p_8:
        "收到指定禮物：主播收到指定禮物，pick you、彩虹燈、發射愛心按照1金幣=1高度的比例累計高度，1個粉絲牌-魅力值禮物=200高度、1個水晶鞋-魅力值禮物=1500高度（水晶鞋和粉絲牌特效禮物可在#神豪來了#活動中合成，敬請留意）",
    rule_p_9: "4、建成獎勵",
    rule_p_10: "5、榜單獎勵",
    rule_p_11:
        "第一名：璀璨盛放頭像框*7天+飛翔熱氣球-座駕*7天+房產大亨勛章*10天+金幣流水返利7%",
    rule_p_12:
        "第二名：紫光盛放頭像框*7天+飛翔熱氣球-座駕*5天+房產大亨勛章*10天+金幣流水返利5%",
    rule_p_13:
        "第三名：藍光盛放頭像框*7天+飛翔熱氣球-座駕*3天+房產大亨勛章*10天+金幣流水返利3%",
    rule_p_14:
        "*主播金幣流水返利說明：主播/房主在活動期間，個人收到指定禮物的金幣流水，按比例獎勵金幣",
    rule_p_15: "6、粉絲貢獻獎勵",
    rule_p_16: "第一名主播的頭號粉絲：頭號粉絲-頭像框*7天+金幣返利5%",
    rule_p_17: "第一名主播的頭號粉絲：頭號粉絲-頭像框*7天+金幣返利4%",
    rule_p_18: "第一名主播的頭號粉絲：頭號粉絲-頭像框*7天+金幣返利3%",
    rule_p_19:
        "*粉絲金幣返利說明：在活動期間，獲獎粉絲送出指定禮物的金幣流水，按比例返利",
    rule_p_20: "（活動中獲得的禮物有效期均為7天，請盡快送出哦~）",
    rule_p_21: "7、其他",
    rule_p_22:
        "活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：",
    rule_p_23: "a）活動期間對參賽玩家惡意評論、造謠、影射等",
    rule_p_24: "此活動與蘋果公司無關"
};
