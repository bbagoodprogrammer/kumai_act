export default {
    //html/index.html
    title: "Qúy tộc",
    privilege: "Thông tin đặc quyền",
    ed: "Đã đạt",
    noEd: "Chưa đạt",
    userScore: "Tháng này đã tích lũy <em>%s</em> điểm quý tộc",
    explain: "Giới thiệu",
    thousand: "vạn",
    num: "vị",
    nobleConfig: [
        {
            name: "Du hiệp",
            privilege: 1
        },
        {
            name: "Kỵ sĩ",
            privilege: 2
        },
        {
            name: "Tử ước",
            privilege: 3
        },
        {
            name: "Bá tước",
            privilege: 5
        },
        {
            name: "Hầu tước",
            privilege: 7
        },
        {
            name: "Công tước",
            privilege: 8
        }
    ],
    iconConfig: [
        {
            name: "Danh hiệu quý tộc",
            tips:
                "Danh hiệu quý tộc sẽ được hiển thị trong phòng và trang cá nhân, cấp quý tộc càng cao, địa vị cũng càng cao quý hơn. "
        },
        {
            name: "Quà độc quyền",
            tips:
                "Quý tộc có thể tặng quà độc quyền trong phòng, cấp quý tộc càng cao, giá trị quà càng quý. "
        },
        {
            name: "Khung riêng biệt",
            tips:
                "Quý tộc có khung ảnh hiếm riêng, cấp quý tộc càng cao, khung ảnh càng cool."
        },
        {
            name: "Danh thiếp cao quý",
            tips:
                "Quý tộc có danh thiếp cao quý, cấp quý tộc càng cao, trang sức càng đẹp."
        },
        {
            name: "Chào mừng vào phòng siêu cool",
            tips: "Quý tộc vào phòng siêu cool, người người ngước nhìn."
        },
        {
            name: "Khung chat",
            tips:
                "Quý tộc có khung chat hiếm riêng, nhắn tin thu hút mọi ánh mắt."
        },
        {
            name: "Kiểm tra người thích tôi",
            tips:
                "Quý tộc có quyền xem người thích tôi, dễ kiểm đươc đối tượng hơn."
        },
        {
            name: "Xe hiếm có",
            tips: "Quý tộc có xe hiếm, thu hút mọi ánh mắt. "
        },
        {
            name: "Ngăn bị đá",
            tips: "Quý tộc có đặc quyền không thể bị đá ra khỏi phòng"
        }
    ],
    explainTips:
        " Quý tộc có địa vị cao quý, được chia thành 6 cấp là du hiệp, kỵ sĩ, tử tước, bá tước, hầu tước, công tước, tiêu xu đạt đến mức trong tháng sẽ đươc trở thành quý tộc, được hưởng nhiều đặc quyền. ",
    explainTitle: "Cấp quý tộc",
    explainLvHeader1: "Quý tộc",
    explainLvHeader2: "Yêu cầu về điểm quý tộc",
    explainLvHeader3: "Được hưởng đặc quyền",
    explainTipsListTitle: "Nâng cấp quý tộc",
    explainTipsList1:
        "1. Điểm quý tộc được tích lũy theo tháng, tiêu 1xu tại App được tăng 1 điểm quý tộc. Không tính tiêu xu của quà túi và tiêu xu trong những sự kiện đặc biệt. Tặng sao may mắn 1 xu = 0,8 điểm quý tộc; đặt ván tại xì dách 21, tiêu 1xu=0,2 điểm quý tộc; Tham gia các loại sự kiện trên App, tiêu 1xu= 0,05 ~ 0,1 điểm quý tộc; ",
    explainTipsList2:
        "2. Trở thành quý tộc trong tháng sẽ được nhận ngay đặc quyền, địa vị quý tộc được giữ đến cuối tháng sau; Nâng cấp quý tộc được nhận ngay thưởng độc quyền; Khi cấp quý tộc tháng này thấp hơn tháng trước sẽ bị giáng cấp ; ",
    explainTipsList3:
        "3. Thời gian hiệu lực quà đồng nhất với thời gian quý tộc, và phần thưởng cùng loại sẽ thay bằng thưởng cấp tương ứng. ",
    lvConfig: [
        {
            lv: 6,
            score: "300",
            privilegeNums: 9,
            name: "Công tước"
        },
        {
            lv: 5,
            score: "150",
            privilegeNums: 8,
            name: "Hầu tước"
        },
        {
            lv: 4,
            score: "80",
            privilegeNums: 6,
            name: "Bá tước"
        },
        {
            lv: 3,
            score: "30",
            privilegeNums: 4,
            name: "Tử tước"
        },
        {
            lv: 2,
            score: "10",
            privilegeNums: 3,
            name: "Kỵ sĩ"
        },
        {
            lv: 1,
            score: "2",
            privilegeNums: 2,
            name: "Du hiệp"
        }
    ]
};
