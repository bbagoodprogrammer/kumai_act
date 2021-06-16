export default {
    //html/index.html
    need_coins: "Xu không đủ",
    title: "Bắn Bong Bóng",
    noAct: "Event chưa mở",
    actEd: "Event đã kết thúc",
    ok: "Xác nhận",
    rule_tab1: "Quy tắc",
    rule_tab2: "Quà",
    noData: "Chưa có dữ liệu",
    //balloon
    balloon_one: "Bắn 1",
    balloon_ten: "Bắn 10",
    // ballTips:
    // " Nhấn giữ súng điều chỉnh góc bắn, thả tay sẽ bắn đạn/phi tiêu, súng bắn đạn 50 xu/lần, súng phi tiêu 100 xu/lần",
    balloon_tab1: "Súng bắn đạn",
    balloon_tab2: "Súng phi tiêu",
    queryTips: " Dùng 【%a】 bắn bóng %b lần, cần %c xu",
    cancel: "Suy nghĩ lại",
    determine: "Bắn",
    prizeTips: "Chúc mừng bắn trúng",
    prizeTips2: "Siêu xạ thủ! bạn đã bắn trúng thưởng lớn!",
    getEd: "Nhận",
    bean: "Xu",
    coins: "Đậu",
    //footer
    hitValue: "Chính xác",
    shoot: "Bắn bóng",
    //Grand
    no_people: "Đang chờ",
    grandTips: " Khi bắn bóng có thể bắn trúng bóng thưởng lớn (2000-10000 xu)",
    grandTips2: "Súng phi tiêu có tỉ lệ cao hơn",
    //index
    rule_tips: "Quy tắc & Quà",
    rule_tips2: "Quà của tôi",
    //rule
    rule_lastTips: "Quyết định cuối cùng thuộc về Alochat",
    rule_tm: "Thời gian: 18/06/2021 18:00- 24/06/2021 24:00",
    rule_item: [
        {
            h6: "Bắn Bong Bóng",
            p: [
                "1. Đặt xu có thể tham gia bắn bóng, súng bắn đạn 50 xu/lần, súng phi tiêu 100 xu/lần, 100% trúng thưởng. Có cơ hội trúng đậu, xu, quà túi (Mèo chiêu tài, Thiên nga may mắn), Bóng thưởng lớn (2000-10000 xu)"
            ],
            img: require("./img/ruleTable.png")
        },
        {
            h6: "Quy tắc xếp hạng",
            p: [
                "1. Súng bắn đạn và phi tiêu chung bảng xếp hạng",
                "2. Xếp hạng theo điểm chính xác từ cao đến thấp, cùng điểm thì ai đạt trước sẽ xếp hạng cao hơn.",
                "3. Điểm chính xác tăng theo thưởng bắn trúng",
                "Bắn bóng nhận 1 đậu = 1 điểm chính xác, 1 xu = 1 điểm chính xác, 1 quà túi = 200 điểm chính xác"
            ]
        },
        {
            h6: "Quà xếp hạng",
            giftList: [
                {
                    img: require("../../img/rule_gift1.png"),
                    name: "Siêu xạ thủ-Huy chương"
                },
                {
                    img: require("../../img/rule_gift2.png"),
                    name: "Bóng ma tím-Xe"
                }
            ],
            p: [
                "Hạng 1: Siêu xã thủ-Chứng nhận (7ngày)+Siêu xạ thủ-Huy chương (10ngày)+Bóng ma tím-Xe (10ngày)",
                "Hạng 2: Siêu xạ thủ-Huy chương (7ngày)+Bóng ma tím-Xe (7ngày)",
                "Hạng 3: Siêu xạ thủ-Huy chương (5ngày)+Bóng ma tím-Xe (5ngày)"
            ]
        },
        {
            h6: "Lưu ý:",
            p: [
                "1. Trong sự kiện, khi phát hiện người chơi gian lận, chúng tôi sẽ hủy bỏ tư cách tham gia của người chơi mà không cần thông báo, bao gồm nhưng không giới hạn:",
                "a) Dùng các hành vi vi phạm để nhận xu, quà hoặc cố ý hack xu",
                "b) Trong quá trình sự kiện nếu có hành động công kích xúc phạm người khác",
                "2. Quà event chỉ có hiệu lực 7 ngày",
                "3. Event không liên quan đến Apple"
            ]
        }
    ]
};
