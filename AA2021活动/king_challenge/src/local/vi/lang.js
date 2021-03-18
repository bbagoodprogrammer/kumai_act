export default {
    //html/index.html
    title: "Thách Đấu Vương Giả",
    rule_title: "Hướng dẫn",

    //footer
    act_noStart: "Sự kiện chưa kết thúc", //活動未開始
    act_end: "Sự kiện đã kết thúc", //活動已結束
    singUp: "Báo danh", //立即報名
    noRank: "Chưa lên bảng", //未上榜
    singUp_suc: "Báo danh thành công", //報名成功
    room_pk: "Thách đấu", //房間挑戰
    room_pk_tips: "Phòng Kara đạt 10k điểm nhận Khung phòng(10 ngày).", //活動期間達到10000分的K房可獲得王者挑戰房間邊框7天
    room_gift_tips: "", // 獎勵將通過系統自動發放到你的賬戶上，請留意！

    //common
    lv: "Xếp hạng",
    ok: "Xác nhận", //確定

    //index
    rule: "Quy tắc", //活動規則
    gift_title: "Phần thưởng", //活動獎勵
    giftList: [
        {
            img: require("../../img/giftList/gift1.png"),
            name: "Huy Chương Thách Đấu Vương Giả"
        },
        {
            img: require("../../img/giftList/gift2.png"),
            name: "Trang Sức Thách Đấu Vương Giả"
        },
        {
            img: require("../../img/giftList/gift3.png"),
            name: "Thuyền Ngọc Tiên"
        },
        {
            img: require("../../img/giftList/gift4.png"),
            name: "Túi Quà Hiếm Có"
        },
        {
            img: require("../../img/giftList/gift5.png"),
            name: "Khung phòng Thách Đấu Vương Giả"
        },
        {
            img: require("../../img/giftList/gift6.png"),
            name: "Rương Thách Đấu Xếp Hạng"
        },
        {
            img: require("../../img/giftList/gift7.png"),
            name: "Vô số xu"
        },
        {
            img: require("../../img/giftList/gift8.png"),
            name: "Vô số đậu"
        }
    ],

    //rank
    rank_title1: "Bảng thách đấu", //K房達人榜
    rank_title2: "Bảng phòng hát", //人氣K房榜
    rank_title3: "Điểm danh",
    rank_timeDown1: "Đếm ngược sự kiện kết thúc", //活動結束倒計時
    rank_timeDown2: "Đếm ngược sự kiện bắt đầu", //活動開始倒計時
    rank_day: "ngày", //天
    rank_hour: "giờ", //時
    rank_min: "phút", //分
    rank_second: "giây", //秒
    rank_tips1:
        "Xếp hạng theo thời gian sự kiện điểm mị quà xu thí sinh nhận được dưới chế độ PK 1v1/ PK Võ Đài/ Thách đấu quà tặng/ Hát Karaoke / Hóng hớt", //根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的金幣進行排名
    rank_tips2:
        "Xếp hạng theo thời gian sự kiện điểm mị xu tiêu trong phòng Kara dưới chế độ PK 1v1/ PK Võ Đài/ Thách đấu quà tặng/ Hát Karaoke / Hóng hớt", //根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000
    noData: "Chưa có dữ liệu",
    loading: "ang tải...",
    room_model: {
        1: "PK 1v1",
        2: "家族PK",
        3: "PK Võ Đài",
        4: "Thách đấu quà tặng",
        5: "Hóng hớt",
        6: "Hát Karaoke"
    },
    //history
    history_tm: "Thời gian",
    history_get: "Lộ trình",
    history_gift: "Phần thưởng",
    singIn: " Điểm danh", // 簽到
    singIn_days: "Điểm danh liên tục $ ngày", //連續簽到{{item.mark}}天
    singIn_lvGift: " Phần thưởng rương", //段位獎勵

    //tasks
    tasksTips: "Hoàn thành nhiệm vụ điểm danh ngày nhận phần thưởng khủng",
    tasksHistory: "Lịch sử>",
    tasks_signInDay: "Đã điểm danh $ ngày",
    tasks_signInDay2: "Đã điểm danh liên tục $ ngày",
    tasks_signInDay3: "Điểm danh liên tục $ ngày",
    tasks_today: "Nhiệm vụ điểm danh hôm nay",
    singIn_ed: "Đã điểm danh",
    singIn_not: "Chưa điểm danh",
    singIn_dayNums: "Ngày $",
    tasksTips2: "Phần thưởng điểm danh liên tiếp",
    onLine: "online"
};
