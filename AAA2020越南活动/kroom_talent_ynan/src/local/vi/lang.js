export default {
    //html/index.html
    title: "Thách Đấu Thần Tượng Phòng Kara",
    rule_title: "Thách Đấu Thần Tượng Phòng Kara",

    //footer
    act_noStart: "Sự kiện chưa mở", //活動未開始
    act_end: "Sự kiện đã kết thúc", //活動已結束
    singUp: "Báo danh", //立即報名
    noRank: "Chưa lên BXH", //未上榜
    singUp_suc: "Báo danh thành công", //報名成功

    //index
    rule: "Hướng Dẫn", //活動規則
    gift_title: "Phần thưởng", //活動獎勵
    giftList: [
        {
            img: require("../../img/giftList/gift1.png"),
            name: "Huy Chương Thần Tượng"
        },
        {
            img: require("../../img/giftList/gift2.png"),
            name: "Chủ Đề Phòng Sôi Nổi"
        },
        {
            img: require("../../img/giftList/gift8.png"),
            name: "Xe Bão Tố"
        },
        {
            img: require("../../img/giftList/gift9.png"),
            name: "Quà hiếm có"
        },
        {
            img: require("../../img/giftList/gift5.png"),
            name: "Vô số xu"
        },
        {
            img: require("../../img/giftList/gift6.png"),
            name: "Vô số đậu"
        }
    ],
    //Integral
    integral_lv: "Cấp thần tượng", //我的達人等級
    integral_coins: "Tiêu phí xu ", //消費金幣
    integral_tips:
        " Tiêu xu bằng nổ Lì Xì/ tặng Hộp May Mắn/ chơi Đập Trứng sẽ nhận thưởng tương ứng.", //在禮物紅包/福運禮物/砸蛋探寶中消費金幣可獲得相應獎勵
    integral_luck: "Chúc mừng nhận được", //恭喜獲得
    integral_luckTips: "Phần thưởng sẽ tự động gửi tới tài khoản bạn", //獎勵獎通過系統自動發放到您的帳戶上
    integral_ok: "Xác nhận", //確定
    giftArr: {
        1: {
            gift_tips: "x50",
            img: require("../../img/get_gift/giftItem_1.png"),
            name: "30 xu",
            act_width: "13%",
            gname: "50 đậu"
        },
        2: {
            gift_tips: "7 ngày",
            img: require("../../img/get_gift/giftItem_9.png"),
            name: "100 xu",
            act_width: "30%",
            gname: "Thầm Nhớ 7 ngày"
        },
        3: {
            img: require("../../img/get_gift/giftItem_10.png"),
            name: "300 xu",
            act_width: "50%",
            gname: "2021 "
        },
        4: {
            gift_tips: "7 ngày",
            img: require("../../img/get_gift/giftItem_11.png"),
            name: "500 xu",
            act_width: "70%",
            gname: "Siêu Động Cơ 7 ngày"
        },
        5: {
            img: require("../../img/get_gift/giftItem_12.png"),
            name: "1000 xu",
            act_width: "100%",
            gname: "Mojito"
        }
    },

    //rank
    rank_title1: "Bảng Thần Tượng", //K房達人榜
    rank_title2: "Bảng Phòng Kara", //人氣K房榜
    rank_timeDown1: "Đếm ngược sự kiện bắt đầu", //活動結束倒計時
    rank_timeDown2: "Đếm ngược sự kiện kết thúc", //活動開始倒計時
    rank_day: "ngày", //天
    rank_hour: "Giờ", //時
    rank_min: "Phút", //分
    rank_second: "Giây", //秒
    rank_tips1:
        " Xếp hạng theo số xu người dùng tiêu bằng <br />nổ Lì Xì/ tặng Hộp Quà May Mắn/ chơi Đập Trứng.", //根據用戶個人在禮物紅包/福運禮盒/砸蛋探寶中所花費的金幣進行排名
    rank_tips2:
        "  Xếp hạng theo điểm mị từ nổ Lì Xì /tặng Hộp Quà May Mắn.<br />Trong phòng mỗi lần nổ tên lửa sẽ tăng 10000 điểm.", //根據房間中禮物紅包/福運禮盒產生的魅力值進行排名房間內每開啟一次火箭活動分數增加10000
    loading: "Đang tải...", //加載中...
    noData: " Chưa có số liệu" //暫無數據
};
