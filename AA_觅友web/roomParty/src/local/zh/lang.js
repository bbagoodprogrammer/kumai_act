export default {
    //index
    roomAct: "房間活動",
    release: "發佈",
    actStatus1: "活動預告中",
    actStatus2: "活動準備中",
    actStatus3: "活動進行中",
    joinUser: "已報名:%s人",
    jojin: "參與",
    jojinEd: "已參與",
    taskActive: "活躍用戶",
    fireworksCnt: "煙火獎勵",
    coinsCnt: "金幣流水",
    actGift: "活動獎勵",
    fireworks: "剩餘:%s次",
    fire: "發射煙花",
    startAct: "開始活動",
    endAct: "結束活動",
    actStartSuc: "當前活動已開啟",
    actEndSuc: "當前活動已結束！",
    fireSuc: "煙火已發射！",
    jojinSuc: "已參與",
    delSuc: "當前活動已取消！",
    cancelTips: "是否確認結束本場活動",
    cancel: "取消",
    ok: "確認",
    taskName: {
        taskCoinLoop: {
            limit: "taskCoinLoopLimit",
            name: "房間金幣流水每增加%s"
        },
        taskActive: {
            limit: "taskActiveLimit",
            name: "房間活躍用戶達到%s"
        },
        taskCoins: {
            limit: "taskCoinsLimit",
            name: "房間金幣流水達到%s"
        }
    },
    typeTips: {
        1: "交友配對",
        2: "团战PK",
        3: "生日派對",
        4: "爛漫婚禮"
    },

    //Clamp
    all: "全文",
    put: "收起",

    //CreatAct
    creatActTitle: "發佈活動預告",
    startTm: "開始時間",
    endTm: "結束時間",
    creatTipsTitle: "注意事項",
    creatTipsTips1:
        "1、發布活動需完整填寫活動預告信息，目前僅支持發布緣分配對、團戰PK、生日派對、浪漫婚禮4個活動主題；",
    creatTipsTips2:
        "2、允許發布多個房間活動預告，房間內的預告提醒僅展示最近一場的活動信息；",
    creatTipsTips3:
        "3、活動時間最長為6個小時，允許跨天設置，房主需在達到開始時間後手動操作“開始活動”，即可進行活動數據統計；超出設定的結束時間2個小時後將自動結束活動；",
    creatTipsTips4:
        "4、活動開始後，將自動替換本場活動設置的話題話題、活動公告信息，無須再次手動設置；",
    creatTipsTips5:
        "5、活動開始後，參與活動預告的用戶將收到小秘書通知進入活動，參與預告的用戶越多房間越有人氣哦；",

    creatBtn: "發布",
    examineTimeTips: "請填寫活動時間！",
    examineTitleTips: "請填寫活動話題！",
    examineMsgTips: "請填寫活動公告！",
    ceatSucTips: "創建成功！",
    timerSelectorStr: {
        year: "%s年",
        month: "%s月",
        day: "%s日",
        hour: "%s時",
        minute: "%s分"
        // second: "%s秒"
    },
    //rule
    ruleTitle:
        "發起房間活動預告，邀請好友們參與可在活動中獲得豐富獎勵，並享有以下活動特權：",
    ruleCreatBtn: "發布活動預告",
    tipsArr: [
        {
            titleImg: require("./img/title1.png"),
            tips: "發起預告後展示活動信息，提前累積活動熱度，蓄勢待發"
        },
        {
            titleImg: require("./img/title2.png"),
            tips: "發起活動預告的房間將獲得額外的流量曝光，更具人氣"
        },
        {
            titleImg: require("./img/title3.png"),
            tips:
                "活動中完成階段任務，房主獲得煙火獎勵，可發射煙火特效。活動中完成階段任務，房主獲得煙火獎勵，可發射煙火特效。活動中完成階段任務，房主獲得煙火獎勵，可發射煙火特效。"
        },
        {
            titleImg: require("./img/title4.png"),
            tips: "活動中達到房間流水，觸發超級寶箱福利，可參與搶福利"
        }
    ]
};
