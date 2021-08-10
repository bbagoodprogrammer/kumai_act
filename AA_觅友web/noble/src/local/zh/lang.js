export default {
    //html/index.html
    title: "貴族",
    privilege: "特權信息",
    ed: "已達到",
    noEd: "尚未達到",
    userScore: "本月已累積 <em>%s</em> 貴族值",
    explain: "說明",
    thousand: "萬",
    num: "個",
    nobleConfig: [
        {
            name: "遊俠",
            privilege: 1
        },
        {
            name: "騎士",
            privilege: 2
        },
        {
            name: "子爵",
            privilege: 3
        },
        {
            name: "伯爵",
            privilege: 5
        },
        {
            name: "侯爵",
            privilege: 7
        },
        {
            name: "公爵",
            privilege: 8
        }
    ],
    iconConfig: [
        {
            name: "貴族稱號",
            tips:
                "貴族稱號將展示在房間的公屏發言、資料卡片中，貴族等級越高象徵身份越尊貴。"
        },
        {
            name: "特權禮物",
            tips:
                "貴族身份可在房間中贈送特權禮物，貴族等級越高可贈送的禮物越多，禮物特效越酷炫。"
        },
        {
            name: "專屬頭像框",
            tips: "貴族擁有專屬頭像框，貴族等級越高效果越酷炫。"
        },
        {
            name: "尊貴名片",
            tips:
                "貴族擁有尊貴名片，在房間戶信息卡展示效果，貴族等級越高效果越酷炫。"
        },
        {
            name: "酷炫进场秀",
            tips: "貴族擁有酷炫的進場秀效果，進入房間時觸發效果，獲得全場矚目。"
        },
        {
            name: "聊天氣泡",
            tips: "貴族擁有聊天氣泡裝飾，在房間、私訊中發言帶有醒目氣泡框。"
        },
        {
            name: "查看喜歡",
            tips: "貴族在交友配對中享有查看喜歡我的人特權，更容易找到心儀對象。"
        },
        {
            name: "稀有座駕",
            tips: "貴族擁有稀有座駕，進入房間時觸發效果，霸氣十足，驚豔全場。"
        },
        {
            name: "防踢",
            tips: "貴族擁有發防踢特權，在房間中無法被房主、房管踢出房間。"
        }
    ],
    explainTips:
        " 貴族是尊貴身份的彰顯，分為游俠、騎士、子爵、伯爵、侯爵、公爵6個等級，自然月內消費金幣達到條件即獲得貴族，享有眾多專屬特權。",
    explainTitle: "貴族等級",
    explainLvHeader1: "貴族",
    explainLvHeader2: "貴族值要求",
    explainLvHeader3: "擁有特權",
    explainTipsListTitle: "貴族升級",
    explainTipsList1:
        "1、每個自然月1號開始累積貴族值，應用內每消費1金幣增加1點貴族值，贈送背包禮物、特殊活動消費的金幣不算入，贈送幸運星禮物消費1金幣=0.8貴族值，21點下注消費金幣1金幣=0.2貴族值；參與官方活動玩法時，消耗1金幣=0.05～0.1貴族值；",
    explainTipsList2:
        "2、當月達成貴族即獲得對應的特權，並保留至下個月月底；當月升級貴族則特權獎勵及時生效；當月達成貴族比上月低則月底結算後降級處理；",
    explainTipsList3:
        "3、獲得的虛擬物品獎勵有效時間與貴族有效時間一致，同類型獎勵升級貴族時將替換升級獎勵。",
    lvConfig: [
        {
            lv: 6,
            score: "300",
            privilegeNums: 9,
            name: "公爵"
        },
        {
            lv: 5,
            score: "150",
            privilegeNums: 8,
            name: "侯爵"
        },
        {
            lv: 4,
            score: "80",
            privilegeNums: 6,
            name: "伯爵"
        },
        {
            lv: 3,
            score: "30",
            privilegeNums: 4,
            name: "子爵"
        },
        {
            lv: 2,
            score: "10",
            privilegeNums: 3,
            name: "騎士"
        },
        {
            lv: 1,
            score: "2",
            privilegeNums: 2,
            name: "游俠"
        }
    ]
};
