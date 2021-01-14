export default {
    //html/index.html
    title: 'Lucky draw', //抽奖
    page_start: 'Initiator',//發起者:
    page_noLuck: 'No lucky draw at the moment',//當前暫無抽獎
    page_luckIng: 'Lucky draw in progress...',//正在抽獎...
    page_downTime: 'Countdown',//倒計時
    page_lc: 'Congratulations:',  //恭喜：
    page_gift: 'Prize:',//獎品：
    page_gift_tips: 'Send',//送出X即可參加抽獎
    page_gift_tips2: 'to enter the lucky draw',

    //common
    common_loading: 'Loading...', // 加載中...
    common_ok: 'Confirm', //确定
    common_no: 'Cancel', //取消
    common_day: 'Days',//天
    common_min: 'minutes', //分钟
    common_tips: 'Tips',//提示
    // common_bead: 'Beans',//金豆
    // common_coins: 'Coins',//金幣
    common_noData: 'List is empty',//列表为空

    //setting
    setting_instructions: 'Lucky draw rules',//抽獎玩法
    setting_tips1: 'You initiate a lucky draw and pay a certain amount of coins to buy VIP members or K room gifts as prizes. In the countdown, users in the room will be given a chance to win a prize if they send a gift that you specify as a raffle eligible gift. At the end of the countdown, the results of the drawing will be displayed and one of the participants will be selected as the winner to receive your prize.If no one takes part in the lucky draw, the prize belongs to the initiator.',// 由你發起抽獎並支付一定金幣購買VIP會員或K房禮 物作爲抽獎獎品在倒計時間內，房間內的用戶送出 你指定的抽獎資格禮物即可獲得抽獎機會，倒計時 結束立即開獎，抽取其中一名參與者爲得獎者，獲 得你的獎品。無人參與則獎品歸發起人所有。
    setting_tips2: '1. You may initiate a lucky draw by selecting the following prizes and paying the corresponding coins.',// 1.由你選擇以下抽獎獎品，並支付對應金幣，可發起抽獎
    setting_tips3: '2. In the countdown, users in the room will be given a chance to win a prize if they send a gift that you specify as a raffle eligible gift', //2.在倒計時間內，房間內的用戶送出參與方式指定的抽獎入場券禮物即可獲得抽獎機會，倒計時結束立即開獎，抽取其中一名參與者爲得獎者，獲得你的獎品。
    setting_tips4: '3. If no one takes part in the lucky draw, the prize belongs to the initiator',//3.無人參與則獎品歸發起人所有。

    setting_type: 'Participation:  ', //參與方式：送出A參與抽獎 
    setting_type2: 'to participate in the draw',
    setting_seniority: 'Raffle eligibility', // 抽獎資格
    setting_noSet: 'Not set',//未設置
    setting_giftSet: 'Prize selection',//獎品選擇
    setting_who: 'Who can participate',//誰可參與
    setting_every: 'For all',//所有人
    setting_other: 'Users queuing to sing',//麥上用戶
    setting_start: 'Start drawing',//開始抽獎
    setting_cGift: 'Select the raffle prizes',//選擇抽獎獎品
    setting_vipTips: 'Select the number of months of VIP membership (already a member will be added to the length of time if wins the prize)',//選擇VIP會員月數（已是會員獲得獎品則疊加時長）
    setting_query: 'Confirm the payment of $ coins for the prize and initiate a lucky draw?',//確認支付X購買獎品,並發起抽獎？
    // setting_vip: ' VIP membership',  //VIP
    // setting_gift: 'Platform gift', //禮物
    // setting_car: 'Cars', //座駕
    // setting_frame: '', //頭飾
    // setting_card: '', //名片
    // setting_theme: '',//主題
    setting_commit_tips1: 'Please select the draw qualification!',//請選擇抽獎資格！
    setting_commit_tips2: ' Please choose the prize!',//請選擇獎品！
    setting_commit_tips3: 'The draw initiated',//抽獎已發起

    //history
    history_title: 'Draw record',//抽獎記錄
    history_startPeople: 'initiated',//发起
    history_startPeople2: 'lucky draw',//抽奖
    history_open: 'Raffle result',//開獎
    history_threeDay: 'Show only the last 3 days of voting',//僅顯示最近3天發起的投票

    history_bigLuck: 'Drew the grand prize!',//抽到了大獎！
    history_eligibility: 'Raffle eligibility', // 抽獎資格
    history_startP: 'Initiator:',//發起者:
    history_jionsNums: 'Participants:',//參與人數:
    history_tips: 'Send out $ gifts and get % draw opportunities',//送出$份禮物，獲得%個抽獎機會

    //config
    tabArr: ["VIP", "Platform gift", "Cars", "Headdress", null, "Card", "Theme"],
    giftType: {
        coin: 'Coins',
        bean: 'Beans',
        free: ''
    }
}