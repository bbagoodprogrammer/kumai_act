export default {
    //html/index.html
    title: "Tòa Cao Ốc    ",
    noAct: "Event chưa mở",
    actEd: "Event đã kết thúc",

    //index
    rule_tips: "Quy tắc & Quà",
    de: " ",
    lv_up: "Cao ốc của bạn đã tăng cấp    ",
    lv_up_tips: "Chúc mừng cao ốc của bạn tăng cấp",
    gift: "quà",
    ok: "Nhận",
    fans_rank_title: "XH Fan của ",
    rank: "Hạng    ",
    user: "Người chơi    ",
    total_height: "Cống hiến độ cao    ",
    fans_tips:
        "*Tổng độ cao là tổng cống hiến độ cao của người chơi giành cho 1 idol, BXH hiện thị Top 20    ",
    goKroom: "Vào phòng idol    ",
    floorConfig: {
        0: {
            name: "Mảnh đất",
            score: "",
            tips: "",
            gift: []
        },
        1: {
            name: "Hotel Xa Hoa",
            score: "3000",
            tips:
                "Khách sạn với sự kết hợp cổ điển và hiện đại, có 100 phòng            ",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_1.png"),
                    name: "Khách sạn xa hoa-Quà túi*1                    "
                }
            ]
        },
        2: {
            name: "Tháp Đồng Hồ",
            score: "20000",
            tips:
                "Tinh hoa kiến trúc, du khách có thể ngắm nhìn phong cảnh đẹp mắt, trải qua phút giây lãng mạn            ",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_2.png"),
                    name: "Tháp đồng hồ-Quà túi*1"
                },
                {
                    img: require("../../img/floor_giftList/gift_6.png"),
                    name: "1000 đậu"
                },
                {
                    img: require("../../img/floor_giftList/gift_4.png"),
                    name: "Moto nhỏ-Quà túi*1"
                }
            ]
        },
        3: {
            name: "Tòa Đế Quốc",
            score: "60000",
            tips:
                "Gió trên đỉnh rất lớn, nhưng phong cảnh thì vô cùng đẹp mắt                ",
            gift: [
                {
                    img: require("../../img/floor_giftList/gift_3.png"),
                    name: "Cao ốc đế quốc-Quà túi*1"
                },
                {
                    img: require("../../img/floor_giftList/gift_6.png"),
                    name: "2000 đậu"
                },
                {
                    img: require("../../img/floor_giftList/gift_5.png"),
                    name: "Hồn đảo cầu vàng-quà túi 7 ngày*1"
                }
            ]
        }
    },

    //roolMsg
    get: "xây dựng",
    rool_msg: "@ nhận được quà tặng $, +độ cao % từ#    ",
    //rank
    tm_tips1: "Sẽ mở sau",
    tm_tips2: "Kết thúc sau",
    tm_tips3: "Event đã kết thúc",
    rank_day: "ngày",
    rank_hour: "giờ    ",
    rank_min: "phút    ",
    rank_second: "giây    ",
    noData: "Không có dữ liệu",

    //rule
    rule_gift1: [
        {
            img: require("./img/gift1.png"),
            name: "pick you"
        },
        {
            img: require("./img/gift2.png"),
            name: "Đèn cầu vòng"
        },
        {
            img: require("./img/gift3.png"),
            name: "Bắn tim"
        }
    ],
    rule_gift2: [
        {
            img: require("./img/gift4.png"),
            name: "Khung Ảnh Phồn Thịnh            "
        },
        {
            img: require("./img/gift5.png"),
            name: "Lôi Đình Chiến Xa-Xe            "
        },
        {
            img: require("./img/gift6.png"),
            name: "xu"
        }
    ],

    //userTask
    task_title: "Tiến độ xây dựng:    ",
    task_name: "Nhiệm vụ    ",
    task_score: "Điểm tương ứng    ",
    task_limt: "Điểm giới hạn    ",
    bar: "Tiến độ    ",
    noSet: "Không giới hạn",
    task_doed: "Đã đạt",
    dayScore: "Độ cao hôm nay:",
    last_nums: "Hơn hôm qua    ",
    help_msg1: "Live nhận quà    ",
    help_msg2: "Hãy giúp Idol xây cao ốc    ",
    need_height: "Độ cao cần:",
    taskName: [
        {
            desc: "Số người vào phòng            ",
            score: "1 người=1 điểm            "
        },
        {
            desc: "Nhận quà chỉ định            ",
            score: "1 Xu=1 điểm            "
        }
    ],
    //html/app_share.ejs
    share_title: "Tòa Cao Ốc    ",
    share_desc: "",
    //rule
    rule_tite: "Quy tắc & Quà    ",
    rule_tm: "Thời gian sự kiện: 12/5 19：00- 18/5 23：59：59  ",
    rule_p_1: "1. Đối Tượng Tham Gia    ",
    rule_p_2:
        "Tất cả Idol đều có thể tham gia , trong thời gian diễn ra sự kiện Idol alochat sẽ được tham gia",
    rule_p_3: "2. Cách Xây Dựng Cao Ốc    ",
    rule_p_4:
        "Idol sẽ nhận được 1 mảnh đất trống, thông qua nhiệm vụ xây dựng để tích lũy độ cao nhà lầu,  độ cao tương ứng phần thưởng nhận được.        ",
    rule_p_5: "3. Nhiệm Vụ    ",
    rule_p_6:
        "Idol có thể thông qua 2 nhiệm vụ dưới đây để tích lũy độ cao:     ",
    rule_p_7:
        "Số người vào phòng: trong ngày 1 người chơi lần đầu tham gia vào phòng idol bất kỳ xem như hoàn thành 1 lần nhiệm vụ, 1 người=1 độ cao,  mỗi ngày tối đa 100        ",
    rule_p_8:
        "Nhận quà chỉ định: Idol nhận quà chỉ định, 1 Xu =1 độ cao, cứ thế tích lũy độ cao và không có giới hạn        ",
    rule_p_9: " 4, Quà xây dựng    ",
    rule_p_10: "5, Quà xếp hạng    ",
    rule_p_11:
        "Hạng 1: Khung ảnh phồn thịnh lấp lánh*7 ngày+ Xe Lôi Đình Chiến Xa*7 ngày+ Huy hiệu Bất động sản*10 ngày+ Trả lễ Xu 7%        ",
    rule_p_12:
        "Hạng 2: Khung ảnh phồn thịnh Tím*7 ngày+ Xe Lôi Đình Chiến Xa*7 ngày+ Huy hiệu Bất động sản*10 ngày+ Trả lễ Xu 5%        ",
    rule_p_13:
        "Hạng 3: Khung ảnh phồn thịnh Xanh*7 ngày+ Xe Lôi Đình Chiến Xa*7 ngày+ Huy hiệu Bất động sản*10 ngày+ Trả lễ Xu 3%        ",
    rule_p_14:
        "*Trả lễ Xu idol: Idol trong thời gian sự kiện, nhận  xu phòng theo quà chỉ định, sẽ thưởng xu theo tỉ lệ        ",
    rule_p_15: "6, Quà XH Fan Cống Hiến    ",
    rule_p_16:
        "Fan dẫn đầu của idol hạng 1: Fan dẫn đầu-Khung ảnh*7 ngày+ Trả lễ Xu 5%    ",
    rule_p_17:
        "Fan dẫn đầu của idol hạng 2: Fan dẫn đầu-Khung ảnh*7 ngày+ Trả lễ Xu 4%    ",
    rule_p_18:
        "Fan dẫn đầu của idol hạng 3: Fan dẫn đầu-Khung ảnh*7 ngày+ Trả lễ Xu 3%    ",
    rule_p_19:
        "*Trả lễ Xu Fan: Trong thời gian sự kiện,  Fan dẫn đầu được thưởng   tặng quà xu chỉ định, sẽ trả lễ xu theo tỉ lệ        ",
    rule_p_20: "(Quà nhận từ event có thời hạn 7 ngày, nhớ tặng sớm nhé!)",
    rule_p_21: "7, Khác    ",
    rule_p_22:
        "Trong thời gian event nếu phát hiện gian lẫn, ban tổ chức có quyền hủy tư cách tham gia của người vi phạm, khóa tài khoản và thu hồi quà..., bao gồm nhưng không giới han:        ",
    rule_p_23: "a) Cố ý tấn công hoặc gây rối người tham gia event    ",
    rule_p_24: "Event không liên quan đến Apple    "
};
