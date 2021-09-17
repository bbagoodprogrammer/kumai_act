const lang = {
  title: "音覓大富翁",
  noAct: "活動未開始",
  actEd: "活動已結束",
  ok: "確認",
  stepNums: "%s步",
  loading: "加載中....",
  noData: "暫無數據",
  //index
  indexRuleIcon: "規則&獎勵",
  indexHistoryIcon: "獎勵記錄",
  inivitTitle: "有好友邀請你玩音覓大富翁",
  inivitTips: "成功邀請你玩音覓大富翁的好友，有機會獲得",
  inivitEd: "接受他的邀請",

  //game
  fiveLuck: "搖5次",
  luckTips: "今天運氣棒棒噠<br />獲得%n",
  again: "繼續遊戲",
  ok: "我知道了",
  getEd: "趕緊收下",
  downTm: "倒計時：",
  share: "分享活動給好友",
  coinsTask: "給他人送一次金幣禮物",
  dice: "骰子*1",
  outTask: "放棄任務",
  shareFriend: "分享好友",
  sendGift: "去送禮",
  giftName: {
    gift: `%n背包禮物 *1`,
    frame: `%n頭像框 *%d天`,
    car: `%n *%d天`,
    coin: `%c 金幣`,
    bean: `%c 金豆`,
    dice: "骰子*1",
    coupon: `%r%儲值返利券`
  },
  buyDice: "購買骰子",
  buy: "購買",
  shareSuc: "分享成功！獲得骰子+1",
  taskName: {
    coin: "送出80金幣禮物",
    invite: "邀請一個活動新用戶（A/5）",
    mic: "在公開房間上麥30min(A/1)",
    owner: "自己魅力值增加500（A/1）",
    room: "自己房間的人氣值增加5000"
  },
  roomTips: "1玩家一分鐘貢獻10人氣值<br/>1金幣貢獻1人氣值",
  shareTitle:
    "我在玩大富翁遊戲，快來和我一起贏金幣、頭像框、座駕、特效禮物吧！",
  shareDesc: "我在玩大富翁遊戲，快來和我一起贏金幣、頭像框、座駕、特效禮物吧！",
  getSuc: "領取成功!",
  buySuc: "購買成功!",

  //history
  historyDiceNums: "已搖骰子:",
  bean: "金豆",
  coins: "金幣",
  diceNums: "骰子",
  coupon: "%儲值返利券",
  historyTaskName: {
    1001: "購買",
    1002: "購買 ",
    1003: "購買 ",
    1004: "購買 ",
    1005: "購買",
    2001: "購買",
    2002: "購買",
    2003: "購買",
    3001: "購買",
    3002: "購買",
    4001: "日榜獎勵",
    5001: "購買"
  },
  roolMsg: "恭喜%n前進%f步,獲得",
  backGift: "背包禮物",
  frame: "頭像框",
  tmTask: "限時任務",
  coupon: "%儲值返利券",
  //rule
  ruleTm: "活動時間:",
  ruleTab1: "活動規則",
  ruleTab2: "活動獎勵",
  ruleTips1: "1、搖骰子做富翁",
  ruleTips2:
    "通過購買可以獲得骰子,活動期間內累計步數從高到低進行排名，前10名玩家可獲得相關獎勵；",
  ruleTips3: "活動結束後，若有骰子未使用，則按照50金幣/顆回退相應金幣到賬號中",
  ruleTips4: "2、獎勵概率",
  ruleTips5: "若前300次沒有中海盗来了特效禮物，第301次必中海盗来了-特效礼物",
  ruleTips6:
    "儲值返利券使用說明：獲獎當天儲值任意金幣，在次日可獲得對應的金幣返利（不可疊加返利比例）。若一天同時獲得多張儲值返利券，按照所獲得的儲值返利券的最高比例來返利。返利券僅獲得當天有效",
  ruleTips7: "靜態背包禮物有效期為7天，特效背包禮物有效期為10天，請盡快送出哦~",
  ruleTips8: "3.注意事項",
  ruleTips9:
    "1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：",
  ruleTips10: "活動期間對參賽玩家進行惡意評論、造謠、影射他人",
  ruleTips11: "2、此活動與蘋果公司無關",
  ruleTips12: "1.總榜第1-3名",
  ruleTips13: "2.總榜第4-10名",
  ruleTips14: "3.日榜第一名將獲得骰子五枚，在次日0點發放",
  ruleTips15: "4.活動的最後一天的日榜獎勵將不發放",
  ruleTips16: "*活動最終解釋權歸活動主辦方所有",
  gift1: [
    {
      img: require("../assets/img/rule/Certification_01.png"),
      name: "【音覓大富翁】認證7天"
    },
    {
      img: require("../assets/img/rule/badge.png"),
      name: "音覓大富翁勛章10天"
    },
    {
      img: require("../assets/img/rule/car1.png"),
      name: "紅色魅影座駕7天"
    }
  ],
  gift2: [
    {
      img: require("../assets/img/rule/Certification_01.png"),
      name: "【聚財小天使】認證7天"
    },
    {
      img: require("../assets/img/rule/badge.png"),
      name: "音覓大富翁勛章7天"
    },
    {
      img: require("../assets/img/rule/BMW.png"),
      name: "BMW座駕7天"
    }
  ],
  //TabsScrollLoadList
  rankTab1: "日榜",
  rankTab2: "總榜",
  day: "天",
  hour: "時",
  min: "分"
};
export default lang;
