const Lang = {
    ActNot: 'Sự kiện chưa bắt đầu', //活動未開始
    ActEnd: 'Sự kiện đã kết thúc', //活動已結束
    ok: 'Biết rồi', //我知道啦
    GameB: 'Xu Gala:',  //盛典幣：
    fiveTips: 'Chúc mừng bạn rút 5 lần nhận thưởng sau',//恭喜您連抽5次獲得以下獎品
    noCointTitle: 'Không thể rút thưởng',  //無法抽獎
    noCoinsTips4: 'Không đủ Xu Gala, không thể rút thưởng', //您的盛典幣餘額不足，無法抽獎
    noCoinsTips2: 'Mau lấy thêm xu Gala!',  //快去賺取盛典幣吧！
    noRank: 'Chưa có hạng',  //未上榜
    myScore: 'Điểm Vui Vẻ: ', //我的歡樂值：
    lastRankScore: 'Lên BXH cần thêm:', //距離上榜還差歡樂值：
    myScore2: 'Điểm MVP:',   //助攻值
    lastRankScore2: 'Lên BXH cần thêm: ', //離上榜還差助攻值：
    storeNum: 'Đã nạp tổng ',  //已累計儲值:
    numTips2: 'Hơn hạng nhì',  //遠超第二名:
    numTips3: 'Kém hạng trên', //離趕超上一名還差:
    numTips4: 'Lên BXH nhận quà cần thêm', //離上榜領取獎勵還差:
    singUpNo: 'Báo danh thất bại',  //報名失敗
    noData: 'Chưa có dữ liệu',  //暫無數據
    happyScore: 'Điểm Vui Vẻ:',// 歡樂值：
    rankTips1: 'Điểm Vui Vẻ = số xu Gala đã dùng', //歡樂值=使用的盛典幣數量
    mvpTips1: 'Cấp của tôi:', //我的等级:
    mvpTips2: 'Điểm MVP:', //助攻值:
    mvpTips3: 'Điểm MVP = mị lực quà xu tặng tại phòng Kara hoặc bài hát sau khi báo danh',//助攻值=報名後在作品或K歌房送出的金幣禮物魅力值
    mvpTips4: 'Điểm MVP đạt <em>X</em> nhận', //助攻值達到 <em>{{showBoxItem.limit}}</em> 可領取
    mvpTips5: '(tăng đến Lv.X)', //(即升級到Lv.{{showBoxItem.level}}等級)
    mvpTips6: 'Nhận xong', //領取成功
    mvpTips7: 'Phần thưởng đã gửi vào tài khoản, mời kiểm tra',//對應獎勵已派發到您的賬戶上,<br/>請注意查收
    day: 'ngày', //天
    loading: 'Đang tải...',  //加載中
    // noPeople: 'Saat ini tidak ada penyanyi dalam peringkat, menunggu Anda!',
    chuzTips1: '1. Túi quà cần cập nhật phiên bản mới nhất để dùng~', //1.背包禮物需更新到最新版本才可使用~
    chuzTips2: '2. Phần thưởng BXH sẽ được gửi trong vòng 14 ngày làm việc sau khi Lễ Tạ Ơn kết thúc~', //2.排行獎勵將於感恩節結束後14個工作日內派發完畢~
    chuzTips3: '2. Phần thưởng BXH sẽ được gửi trong vòng 14 ngày làm việc sau khi Lễ Giáng Sinh kết thúc',
    taskTips1: 'Xu Gala gửi ngay khi xong nhiệm vụ, qua ngày mới sẽ xoá hết xu Gala', //任務達成盛典幣自動到賬，每天獲得的盛典幣清0
    taskTips2: 'Nhiệm vụ ngày', //每日任務
    taskTips3: 'Tiến độ', //進度
    taskTips4: 'Đã xong', //已達成
    luckTips1: 'Chúc mừng bạn trúng ', //恭喜您成功抽中了
    luckTips2: 'Thời gian', //抽獎時間
    luckTips3: 'Nhận thưởng', //獲得的獎品
    luckTips4: 'Chưa có lịch sử rút thưởng,Mau lấy thêm xu Gala nào!', //抽獎紀錄空空如也<br />快去賺取盛典幣抽獎吧！
    luckTips5: 'Không thể rút thưởng', //無法抽獎
    luckTips6: 'Bạn chưa báo danh, không thể rút thưởng,Mau báo danh nào! ', //您還未報名，無法抽獎  快去報名吧！
    luckTips7: 'Thẻ Gala dùng để bỏ phiếu bình chọn trong sự kiện Nhân Vật Tiêu Biểu',
    luckTips8: 'thời hạn 7 ngày', //有效期為7天
    luckTips9: 'thời hạn 1 ngày', //有效期為1天
    luckTips10: 'Thẻ Gala dùng để bình chọn trong sự kiện Nhân Vật Tiêu Biểu',
    luckTips11: 'Túi quà có thời hạn 7 ngày', //背包禮物有效期為7天
    luckTips12: 'Phiếu nạp có thời hạn 1 ngày', //儲值券有效期為1天
    luckTips13: 'Phiếu tặng có thời hạn 1 ngày',//送禮券有效期為1天
    petTips1: 'Người tặng',  //贈送者
    petTips2: 'Thời gian', //收集時間
    petTips3: 'Quà', //收集禮物
    petTips4: 'Chưa có lịch sử nhận', // 暫無收集紀錄
    petTips5: 'Xếp hạng theo số lượng quà <em>$</em> nhận được, top 1 được quyền vinh danh quà <em>%</em>, top 10 nhận phần thưởng khủng.',
    petTips6: 'Bạn bè chưa có hạng ,Còn trống, đang đợi bạn đó!',
    petTips7: 'Mỗi khi nhận 1 loại quà tặng sẽ mở phần thưởng 1 cấp,<em>S</em>người thu thập đủ 6 loại quà tặng',
    actTips1: 'Trong thời gian quy định dưới đây, từ 21:00:00 - 21:10:00 điểm số sự kiện sẽ tăng 10%'
}
export default Lang