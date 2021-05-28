export default {
    //html/index.html
    title: "Du Hành Vũ Trụ",
    noAct: "Event chưa mở",
    actEd: "Event đã kết thúc",
    not_people: "Đang đợi",
    act_tm: "Thời gian: 28/05 17:00 - 03/06 23:59:59 ",
    //ball
    space_station: "Trạm không Gian",
    landing_star: "Hạ cánh hành tinh",
    landing_nums: "Số lần hạ cánh:",
    landing_nums2: "Số lần hạ cánh",
    mysterious_star: "Mysteriousness",
    starTips:
        "Mỗi khi nhận 80 Xu quà chỉ định, tiến độ +1%, khi tiến độ đạt 100%, tỉ lệ xuất hiện Hành Tinh Bí Mật tăng gấp đôi, 30 phút reset tiến độ",
    starTips2: "Du hành tinh hà, khám phá vũ trụ",
    starTips3: "Bạn đã hạ cánh tất cá hành tinh, chúc mừng bạn nhận【$、%】",
    star_get: "Nhận",
    landing_addres: "Hạ cánh",
    landing_addres_tips: "Du hành vụ trũ, bạn đã đến hành tinh Bí Mật",
    landing_downTime: "Tỉ lệ đang gấp đôi, còn $ phút % giây",

    //history
    history_tab1: "Lịch sử hạ cánh",
    history_tab2: "Lịch sử mảnh",

    //index
    index_ruleTips1: "Quy tắc & Thưởng",
    index_ruleTips2: "Lịch sử du hành",
    index_tab1: "Khám Phá Vũ Trụ",
    index_tab2: "Khám Phá Hành Tinh",
    index_firstTips:
        "Du hành vũ trụ, thích là đi<br />Cùng khám phá hành tinh vũ trụ",
    fly: "Bay",

    //slice
    slice_tips1:
        "Mỗi lần tặng 100 Xu quà chỉ định, nhận 1 phiếu du hành, dùng phiếu du hành nhận mảnh UFO, sau khi thu thập đủ sẽ nhận quà vũ trụ tương ứng",
    ufoLuck: "Rút mảnh UFO",
    ticket: "phiếu du hành",
    ticket_used: "Tôi đã dùng $ phiếu du hành",
    ticket_userNums: "còn $ phiếu",
    giftList: [
        {
            img: require(`../../img/gift_1.png`),
            name: "1000 đậu"
        },
        {
            img: require(`../../img/gift_2.png`),
            name: "1000 Xu"
        },
        {
            img: require(`../../img/gift_3.png`),
            name: "Mèo vũ trụ-Quà hiệu ứng*1"
        }
    ],
    frame_get: "Nhận",
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
    rule_tab1: "Quy tắc",
    rule_tab2: "Thưởng",
    rule_tips: [
        {
            h5: "1. Mở Du Hành Vũ Trụ",
            p:
                "Khi người chơi nhận được quà tặng sẽ trở thành phi hành gia, bắt đầu du hành vũ trụ, trải nghiệm không gian Bí Mật của vũ trụ. Khi người chơi nhận được vật phẩm chỉ định 100 Xu, sẽ nhận được cơ hội hạ cánh hành tinh 1 lần. Sau khi phi hành gia nhận được cơ hội hạ cánh, cần phải thao tác hạ cánh xuống hành tinh; Số lần hạ cánh sẽ mất khi kết thúc sự kiện",
            gift: [
                {
                    img: require(`../../img/ruleGift/1.png`),
                    name: "Đá Năng Lượng<br/>50 Xu"
                },
                {
                    img: require(`../../img/ruleGift/2.png`),
                    name: "Thuốc Điện Năng<br/>1000 Xu"
                },
                {
                    img: require(`../../img/ruleGift/3.png`),
                    name: "Kính Viễn Vọng<br/>9000 Xu"
                },
                {
                    img: require(`../../img/ruleGift/4.png`),
                    name: "Phi Thuyền<br/>12000 Xu"
                }
            ]
        },
        {
            h5: "2. Chiếm Lĩnh Hành Tinh",
            p:
                "Phi hành gia có số lần hạ cánh xuống hành tinh nhiều nhất sẽ chiếm lĩnh hành tinh. Trong thời gian sự kiện, số lần hạ cánh xuống hành tinh sẽ được cập nhật ngay, phi hành gia có thể tranh đua hành tinh; Khi sự kiện kết thúc, người chơi đang trong trạng thái chiếm lĩnh hành tinh sẽ nhận được phần thưởng. Khi số lần bằng nhau, người đến trước sẽ được xem là người chiếm lĩnh."
        },
        {
            h5: "3. Hành Tinh Bí Mật",
            p:
                "Khi hành tinh bí mật xuất hiện, tất cả phi hành gia khi nhận được quà tặng chỉ định mỗi 80 Xu, tiến độ hành tinh bí mật+1%, khi tiến độ đạt 100%, tỷ lệ xuất hiện của hành tinh bí mật tăng gấp đôi duy trì 30 phút, và tiến độ sẽ reset."
        },
        {
            h5: "4.Trạm Không Gian",
            p:
                "Phi hành gia hạ cánh ở tất cả hành tinh (bao gồm hành tinh bí mật), sẽ trở về trạm không gian, và nhận được phần thưởng từ trạm không gian. Avatar phi hành gia sẽ hiện trên trạm không gian khi là người có số lần hạ cánh xuống hành tinh nhiều nhất."
        },
        {
            h5: "5. Khám Phá Hành Tinh",
            p:
                "Khi người chơi mỗi lần tặng quà chỉ định 100 Xu, sẽ nhận được một phiếu du hành, sử dụng 1 phiếu du hành sẽ rút 1 lần mảnh UFO, Khi các mảnh nằm ngang được thu thập đầy đủ, sẽ nhận được phần quà tương ứng; khi thu thập đủ các mảnh sẽ nhận được vật cưỡi UFO (10 ngày)."
        },
        {
            h5: "6. Khác",
            p:
                "Trong sự kiện, khi phát hiện người chơi gian lận, chúng tôi sẽ hủy bỏ tư cách tham gia của người chơi mà không cần thông báo, bao gồm nhưng không giới hạn:<br /> a) Trong quá trình sự kiện nếu có hành động công kích xúc phạm người khác"
        }
    ],
    gift_title1: "1. Quà chiếm lĩnh hành tinh và đến trạm không gian",
    gift_p1:
        "Quà chiếm lĩnh hành tinh được gửi sau khi kết thúc sự kiện; Quà đến trạm không gian được gửi tự động khi đến trạm, mỗi người chỉ nhận được quà trạm không gian  1 lần",
    gift_title2: "2. Quà khám phá hành tinh",
    gift_p2:
        "Quà khám phá hành tinh được gửi tự động, mỗi người chơi được nhận mỗi phần quà 1 lần, tổng có thể nhận 4 quà du hành vũ trụ",
    gift_title3: "3. Quà xếp hạng",
    gift_p3:
        "Hạng 1: Ảnh nền du hành vũ trụ (10 ngày) + Phi thuyền-Quà hiệu ứng<br />Hạng 2: Ảnh nền du hành vũ trụ (5 ngày) + Khám phá vũ trụ-Quà hiệu ứng<br />Hạng 3: Quả cầu vũ trụ-Quà hiệu ứng",
    gift_p4: "*Quà event có thời hạn 7 ngày, vui lòng tặng sớm nhé!",
    gift_lastTips: "*Quyền quyết định cuối cùng thuộc về ban tổ chức",
    giftArr2: [
        {
            img: require(`../../img/ruleGift/10.png`),
            name: "Ảnh nền du hành vũ trụ"
        },
        {
            img: require(`../../img/ruleGift/11.png`),
            name: "Phi thuyền-Quà hiệu ứng"
        },
        {
            img: require(`../../img/ruleGift/12.png`),
            name: "Khám phá vũ trụ-Quà hiệu ứng"
        },
        {
            img: require(`../../img/ruleGift/13.png`),
            name: "Quả cầu vũ trụ-Quà hiệu ứng"
        }
    ],
    gift_tips: [
        {
            title: "-Chiếm hành tinh thường",
            gift: [
                {
                    img: require(`../../img/ruleGift/5.png`),
                    name: "Mộng Ngân Hà - Khung ảnh 7 ngày"
                },
                {
                    img: require(`../../img/ruleGift/6.png`),
                    name: "Hành Tinh Xanh-Quà động*1"
                }
            ]
        },
        {
            title: "-Chiếm hành tinh Bí Mật",
            gift: [
                {
                    img: require(`../../img/ruleGift/7.png`),
                    name: "Mộng Tinh Thần - Khung ảnh 7 ngày"
                },
                {
                    img: require(`../../img/ruleGift/6.png`),
                    name: "Hành Tinh Xanh-Quà động*1"
                }
            ]
        },
        {
            title: "-Đến trạm không gian",
            gift: [
                {
                    img: require(`../../img/ruleGift/8.png`),
                    name: "Tinh Đồ - Khung ảnh 7 ngày"
                },
                {
                    img: require(`../../img/ruleGift/9.png`),
                    name: "Phi Hành Gia - Huy chương (15ngày)"
                }
            ]
        }
    ]
};
