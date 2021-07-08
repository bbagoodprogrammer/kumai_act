export default {
    //html/index.html
    title: "魔法之戰",
    day: "天",
    hour: "時",
    minute: "分",
    second: "秒",

    //footer
    notStart: "活動未開始",
    actEnd: "活動已結束",
    singUp: "點擊報名",
    singUpSuc: "你已成為%n魔法師！,當前派系戰鬥力為%s,排名第%b",
    singUpTips: "*參加活動後，魔法師被隨機分到不同派系中",
    //history
    history_title: "戰鬥力紀錄",
    history_type: {
        synthesis: "合成【%n】*%s，戰鬥力+%b",
        divination: "【今日占卜】，戰鬥力+%b",
        receive: "收到【%n】*%s，戰鬥力+%b"
    },

    //index
    index_rultTips1: "規則&獎勵",
    index_rultTips2: "戰鬥力紀錄",
    index_downTm: "戰鬥結束倒計時",
    firstTipsTitle: "欢迎来到魔法世界",
    firstTips:
        "魔法世界由派系的魔法師組成——火系、風系、冰系，火系粗獷、風系凌厲、冰系幽寒，各顯神威，相互牽制，但究竟是哪一派最強呢？",
    join: "進入魔法世界",

    //MagicLand
    MagicLand_addScore: "%n,+%s戰鬥力",
    surplus: "剩餘",
    synthesis: "合成",
    synthesisTips: "合成後，禮物會發放到背包中",
    max: "最大",
    synthesisSucTips: "恭喜合成【%n*%s】,禮物已發放到您的背包，請查收",

    //Otsuge
    otsuge_tips:
        "每天可免費占卜一次，<br />當玩家今天收到%s金幣指定禮物即可占卜",
    outs: "占卜",
    outsIng: "占卜中",
    outsEd: "占卜結果",
    outsDddres: "占卜結語：",
    outsScore: "戰鬥力",
    outsError: "今日已經占卜過了哦！",

    //rank
    rank_group: "戰隊",
    empty: "虛位以待",
    rank_score: "戰鬥力",
    rank_otherPeople: "組員信息",
    noData: "暫無數據",
    //roolMsg
    roolMsg1: "%n合成【%a】*%s,+%b戰鬥力",
    roolMsg2: "%n收到【%a】*%s,+%b戰鬥力",

    //rule
    rule_tm: "活動時間：5月10日-5月20日",
    rule_tab1: "規則",
    rule_tab2: "獎勵",
    rank_giftTitle: "榜單獎勵",
    ruleItem: [
        {
            h6: "1、如何參與獲得戰鬥力",
            p:
                "-玩家報名參與活動，隨機加入到XX隊/XX隊/XX隊<br />-參與活動的玩家收到指定禮物可獲得戰鬥力"
        },
        {
            h6: "2、合成禮物",
            p:
                "-在房間收到6種活動禮物，均可合成禮物，合成後可增加自己的戰鬥力<br />-合成禮物後即使發放到玩家的背包（有效期均為3天）"
        },
        {
            h6: "3、占卜",
            p:
                "-玩家當天增加的戰鬥力滿N時，每天可免費占卜一次，次日失效。<br />-占卜可增加100-10000戰鬥力"
        },
        {
            h6: "4、注意",
            p:
                "-活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：<br />a）活動期間對參賽玩家惡意評論、造謠、影射等<br />b)非法獲得金幣、活動指定禮物、合成禮物，並用於惡意刷分的玩家",
            p2:
                "-活動結束後，剩餘的禮物材料失效，不可再合成禮物<br />-此活動與蘋果公司無關"
        }
    ],
    giftItem: [
        {
            h6: "【第一名隊伍】",
            p: [
                "第一名：頭像框（10天）+勛章（10天）+座駕（10天）+特效禮物（一人一個）",
                "第二名：頭像框（10天）+勛章（10天）+座駕（10天）+特效禮物（一人一個）",
                "第三名：頭像框（10天）+勛章（10天）+座駕（10天）+特效禮物（一人一個）"
            ]
        },
        {
            h6: "【第二名隊伍】",
            p: [
                "第一名：頭像框（10天）+勛章（10天）+座駕（10天）+特效禮物（一人一個）"
            ]
        },
        {
            h6: "【第三名隊伍】",
            p: [
                "第一名：頭像框（10天）+勛章（10天）+座駕（10天）+特效禮物（一人一個）"
            ]
        }
    ],
    giftArr: [
        {
            img: require(`../../img/ruleImg/1.png`),
            name: "羽毛<br/>+200戰鬥力"
        },
        {
            img: require(`../../img/ruleImg/2.png`),
            name: "魔法杖<br/>+1500戰鬥力"
        },
        {
            img: require(`../../img/ruleImg/3.png`),
            name: "隱形斗篷<br/>+2000戰鬥力"
        },
        {
            img: require(`../../img/ruleImg/4.png`),
            name: "神奇藥水<br/>+3000戰鬥力"
        },
        {
            img: require(`../../img/ruleImg/5.png`),
            name: "南瓜怪<br/>+8000戰鬥力"
        },
        {
            img: require(`../../img/ruleImg/6.png`),
            name: "魔法書<br/>+12000戰鬥力"
        }
    ],
    giftArr2: [
        {
            img: require(`../../img/ruleImg/7.png`),
            name: "頭像框<br/>(冠亞季軍有別)"
        },
        {
            img: require(`../../img/ruleImg/8.png`),
            name: "魔法師<br/>勛章"
        },
        {
            img: require(`../../img/ruleImg/9.png`),
            name: "魔法守護神<br/>特效禮物"
        },
        {
            img: require(`../../img/ruleImg/10.png`),
            name: "古代巨龍<br/>特效禮物"
        },
        {
            img: require(`../../img/ruleImg/11.png`),
            name: "烈焰火球鳥<br/>特效禮物"
        }
    ]
};
