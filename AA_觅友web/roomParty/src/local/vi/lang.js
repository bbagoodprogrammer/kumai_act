export default {
    //index
    roomAct: "Sự kiện phòng",
    release: "Phát hành",
    actStatus1: "Đang dự báo",
    actStatus2: "Đang chuẩn bị",
    actStatus3: "Đang tiến hành",
    joinUser: "Đã báo danh:%sb người",
    jojin: "Tham gia",
    jojinEd: "Đã tham gia",
    taskActive: "User hot",
    fireworksCnt: "Pháo hoa",
    coinsCnt: "Doanh thu Xu",
    actGift: "Giải thưởng sự kiện",
    fireworks: "Còn:%s Lần",
    fire: "Bắn pháo hoa",
    startAct: "Bắt đầu sự kiện",
    endAct: "Kết thúc sự kiện",
    actStartSuc: "Sự kiện đã bắt đầu",
    actEndSuc: "Sự kiện đã kết thúc！",
    fireSuc: "Đã bắn!",
    jojinSuc: "Đã tham gia",
    delSuc: "Sự kiện đã bị hủy！",
    cancelTips: "Kết thúc sự kiện này? ",
    cancel: "Hủy",
    ok: "Kết thúc",
    taskName: {
        taskCoinLoop: {
            limit: "taskCoinLoopLimit",
            name: "Doanh thu phòng tăng %sxu"
        },
        taskActive: {
            limit: "taskActiveLimit",
            name: "User hot đạt %s người"
        },
        taskCoins: {
            limit: "taskCoinsLimit",
            name: "Doanh thu phòng đạt %sxu"
        }
    },
    typeTips: {
        1: " Party kết bạn",
        2: "Vui mừng PK",
        3: "Birthday Party",
        4: "Lễ cưới lãng mạn"
    },

    //Clamp
    all: "Toàn văn",
    put: "Thu",

    //CreatAct
    creatActTitle: "Phát hành dự báo sự kiện",
    startTm: "Thời gian bắt đầu",
    endTm: "Thời gian bắt đầu",
    creatTipsTitle: "Điều cần lưu ý",
    creatTipsTips1:
        "1、Khi phát hành sự kiện, bạn cần điền thông tin dự báo đầy đủ, hiện tại chỉ nhận 4 Topic là Party kết bạn, Vui mừng PK, Birthday Party,Lễ cưới lãng mạn. ",
    creatTipsTips2:
        "2、Có thể phát hành nhiều dự báo sự kiện, chỉ hiển thị thông tin sự kiện được diễn ra mới đây;",
    creatTipsTips3:
        "3、Thời gian sự kiện dưới 6h, có thể diễn ra qua ngày, chủ phòng cần tự bấm “Bắđầu sự kiện” trước “Thời gian bắt đầu” mới được tính số liệu sự kiện; Nếu chủ phòng không bấm “Kết thúc sự kiện”, Sự kiện sẽ tự động kết thúc sau 2 giờ kể từ “Thời gian kết thúc”. ",
    creatTipsTips4:
        "4、Sau khi bắt đầu sự kiện, hệ thống sẽ tự động thay đổi Topic, thông báo sự kiện lần này,không cần tự bấm. ",
    creatTipsTips5:
        "5、Sau khi bắt đầu sự kiện, user tham gia dự báo sự kiện sẽ nhận được thông báo trợ lý, user càng nhiều hiệu quả sự kiện càng tốt. ",

    creatBtn: "Phát hành",
    examineTimeTips: "Hãy điền thời gian sự kiện!",
    examineTitleTips: "Hãy điền Topic!",
    examineMsgTips: "Hãy viết thông báo!",
    ceatSucTips: "Tạo sự kiện thành công!",
    timerSelectorStr: {
        year: "Năm %s",
        month: "Tháng %s",
        day: "Ngày %s",
        hour: "%s giờ",
        minute: "%s phút"
        // second: "%s giây"
    },
    //rule
    ruleTitle:
        "Phát hành dự báo sự kiện, mời bạn bè tham gia sự kiện được nhận giải thưởng phong phú, được hưởng đặc quyền dưới đây: ",
    ruleCreatBtn: "Phát hành dự báo sự kiện",
    tipsArr: [
        {
            titleImg: require("./img/title1.png"),
            tips: "Sau khi phát hành dự báo, sự kiện sẽ thu hút nhiều người. "
        },
        {
            titleImg: require("./img/title2.png"),
            tips:
                "Những phòng phát hành dự báo sự kiện sẽ được Đề xuất đặc biệt, kéo được nhiều view hơn. "
        },
        {
            titleImg: require("./img/title3.png"),
            tips:
                "Sau khi hoàn thành các nhiệm vụ giai đoạn trong thời gian sự kiện, chủ phfong nhận sẽ nhận được quà pháo hoa, được bắn pháo hoa."
        },
        {
            titleImg: require("./img/title4.png"),
            tips:
                "Doanh thu phòng đạt chỉ tiêu sẽ kích hoạt siêu rương báu, được nhận phúc lợi"
        }
    ]
};
