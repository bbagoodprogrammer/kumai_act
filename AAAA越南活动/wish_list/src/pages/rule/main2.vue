<template>
  <div class="rule">
    <div class="tabs">
      <span class="tab1" @click="changTab('tab1')" :class="{actTab:showTab == 'tab1'}">Thể lệ</span>
      <span class="tab2" @click="changTab('tab2')" :class="{actTab:showTab == 'tab2'}">Phần thưởng</span>
    </div>
    <p class="actTime">{{actTime}}</p>
    <div class="ruleMsg" v-show="showTab == 'tab1'">
      <h5>Thể lệ sự kiện</h5>
      <p>1. Người dùng nhấn đăng điều ước, ghi lại ước nguyện của mình, mỗi ngày mỗi người được đăng 5 lần.</p>
      <p>2. Người dùng khác sẽ đọc Điều Ước được gửi và lời nhắn kèm theo, nếu lấy điều ước, đăng bài hát công khai đầu tiên sẽ mặc định tặng cho người gửi Điều Ước. Điều Ước đã lấy sẽ không hiện trên danh sách nữa và có thể kiểm tra trong phần lịch sử.</p>
      <p>3. Chủ nhân Điều Ước có thể kiểm tra lịch sử để xem ai đã hoàn thành điều ước của mình.</p>
      <p>4. Cùng một thiết bị chỉ có 1 tài khoản được tham gia sự kiện (Ước và Lấy Điều Ước)</p>
      <p>5. Trong thời gian sự kiện bài hát bị chấm 1 điểm đạt 10 lần hoặc xoá bài hát đạt 5 lần sẽ không thể hái điều ước của người khác, điểm trên BXH Tặng sẽ bị xoá và huỷ tư cách thi bảng này.</p>
      <h5>Chú ý</h5>
      <p>Nếu Điều Ước mang nội dung xấu/tục tĩu/chính trị/lăng mạ/vu khống/ hoặc trong thời gian sự kiện diễn ra, xoá tác phẩm đã đăng đồng nghĩa với việc gian lận điểm, hệ thống sẽ  khoá tính năng tương ứng, đồng thời loại khỏi cuộc thi, nếu nghiêm trọng sẽ bị khoá tài khoản!</p>
    </div>
    <div class="ward" v-show="showTab == 'tab2'">
      <h5>Phần thưởng</h5>
      <p>
        Mỗi lần lấy Điều Ước và tặng bài hát sẽ nhận được 1 món quà được gửi thẳng vào Túi (mỗi ngày nhận tối đa 3 món qùa ngẫu nhiên),
        Nowkara（Hãy sử dụng phiên bản Nowkara trên IOS để được sử dụng Túi）
      </p>
      <h6>Thưởng Top 100 BXH Điều Ước</h6>
      <div class="title">Top 10</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward1.png" alt="">
          </div>
          <em>
            HC Đại Sứ Điều Ước
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward2.png" alt="">
          </div>
          <em>
            Quý tộc
            Công Tước
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward3.png" alt="">
          </div>
          <em>
            500 Xu
          </em>
        </span>
      </div>
      <div class="title">Top 11 ~ 100</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward4.png" alt="">
          </div>
          <em>
            HC Thên Sứ Ấm Áp
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward5.png" alt="">
          </div>
          <em>
            Quý tộc
            Hầu Tước
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 Đậu
          </em>
        </span>
      </div>
      <h6>Thưởng Top 100 BXH hoàn thành Điều Ước</h6>
      <div class="ward2Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward7.png" alt="">
          </div>
          <em>
            HC Vua Điều Ước
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 Đậu
          </em>
        </span>
      </div>
      <p class="tips1">Huy chương, quý tộc đều có thời hạn 31 ngày</p>
      <p class="tips2">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
    <loading></loading>
  </div>
</template>

<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      showTab: 'tab1',
      actTime: ''
    }
  },
  created() {
    api.getTime().then(res => {
      let resData = res.data.response_data
      this.actTime = `Thời gian hoạt động: ` + getDate(new Date(resData.stime * 1000), 'pai') + ' ~ ' + getDate(new Date(resData.etime * 1000), 'pai')
    })
  },
  methods: {
    changTab(tab) {
      this.showTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2d0080;
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.73rem;
    height: 0.95rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    span {
      display: inline-block;
      width: 3.56rem;
      height: 0.75rem;
      color: #a739da;
      font-size: 103%;
      line-height: 0.75rem;
      text-align: center;
      transition: all 0.2s;
      &.actTab {
        color: #fefefe;
        font-size: 113%;
        background: url(../../assets/img/avtTab.png);
        background-size: 100% 100%;
      }
      &.tab1 {
        margin: 0.1rem 0 0 0.1rem;
      }
      &.tab2 {
        margin: 0.1rem 0.12rem 0 0;
      }
    }
  }
  .ruleMsg {
    padding: 0 0.3rem;
  }
  .ward {
    padding: 0 0.3rem;
    h6 {
      font-size: 80%;
      color: #1dfadf;
      margin-top: 0.2rem;
      font-weight: bold;
    }
    .title {
      color: #1dfadf;
      font-weight: bold;
      text-align: center;
      margin-top: 0.2rem;
    }
    .ward1Box {
      display: flex;
      margin-top: 0.15rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .ward2Box {
      display: flex;
      justify-content: center;
      margin-top: 0.15rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .tips1 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      text-align: left;
      padding-left: 0.2rem;
    }
    .tips2 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      margin-top: 0.48rem;
    }
  }
  h5 {
    color: #1dfadf;
    font-size: 110%;
    font-weight: bold;
    text-align: left;
    margin: 0.21rem 0 0.1rem;
  }
  p {
    font-size: 70%;
    color: #e8b7ff;
  }
  .actTime {
    padding: 0 0.2rem;
    color: #1dfadf;
    margin: 0.1rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
