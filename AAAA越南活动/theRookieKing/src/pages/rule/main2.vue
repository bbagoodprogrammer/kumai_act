<template>
  <div class="rules">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Thể lệ</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Phần thưởng</a>
    </div>
    <div class="rule" v-if="mainTab === 0">
      <p class="time">Thời gian: {{totalTime}}</p>
      <h5>Thể lệ:</h5>
      <p>1. Cấp ca sĩ ≤4 mới được tham gia sự kiện.</p>
      <p>2. Sau khi báo danh, tổng mị lực đậu + mị lực xu mà thí sinh nhận được tại phòng Kara trong thời gian sự kiện (bao gồm quà trong Túi phòng Kara) sẽ được tính để xếp hạng, nếu nhận quà tại phòng Kara đang khoá sẽ không được tính.</p>
      <p>3. Điểm BXH Ngày ≥5000 sẽ nhận 200 Đậu do hệ thống tự động gửi.</p>
      <p>4.Thời gian BXH ngày cụ thể như sau:</p>
      <div v-html="actTime" class="daysTime"></div>
      <h5 class="zhuyi">Chú ý:</h5>
      <p>Nếu phát hiện hành vi dùng nhiều tài khoản phụ để gian lân điểm, ban tổ chức sẽ huỷ kết quả hoặc khoá tài khoản~</p>
      <p class="jies">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
    <div class="rule" v-else>
      <p class="time">Thời gian: {{totalTime}}</p>
      <h5>Thưởng BXH Tổng:</h5>
      <p class="ruleone">Hạng nhất: Quý tộc Hoàng Đế (1 tháng) + huy chương Tân Vương (14 ngày) + 2000 xu + 5000 đậu</p>
      <p>Hạng nhì: Quý tộc Công Tước (1 tháng) + huy chương Tân Vương (14 ngày) + 1500 xu + 3000 đậu</p>
      <p>Hạng ba: Quý tộc Công Tước (1 tháng) + huy chương Tân Vương (14 ngày) + 1000 xu + 2000 đậu</p>
      <p class="jies">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
    <Loading></Loading>
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
      mainTab: 0,
      actTime: '',
      totalTime: ''
    }
  },
  created() {
    api.getDaysTime().then((res) => {
      const { days, stime, etime } = res.data.response_data
      for (var item in days) {
        var stimeIt = getDate(new Date(days[item].stime * 1000), '~')
        var etimeIt = getDate(new Date(days[item].etime * 1000), '~')
        this.actTime += `<p>Day${item}:${stimeIt} ~ ${etimeIt}</p>`
      }
      //活动总时间
      var totalStime = getDate(new Date(stime * 1000), '~')
      var totalEtime = getDate(new Date(etime * 1000), '~')
      this.totalTime += `${totalStime} ~ ${totalEtime}`
    })
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #0c003b;
}
.rules {
  padding: 0.39rem 0.63rem 0;
  .days {
    margin-top: 0.2rem;
  }
  .mainTabs {
    width: 6.23rem;
    height: 0.8rem;
    margin: 0 auto;
    background: url(../../assets/img/tabsBg.png) no-repeat;
    background-size: contain;
    a {
      display: inline-block;
      width: 49%;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      color: #ca9dfd;
      font-weight: bold;
      &.current {
        color: #5b00b6;
        background: url(../../assets/img/actBg.png);
        background-size: 100% 100%;
      }
    }
  }
  .daysTime {
    padding-left: 0.2rem;
  }
  .rule {
    .ruleone {
      margin-top: 0.2rem;
    }
    .time {
      color: #bb81fb;
      font-size: 88%;
      margin: 0.57rem 0 0.2rem 0;
    }
    h5 {
      font-size: 88%;
      font-weight: bold;
    }
    p {
      font-size: 88%;
      line-height: 0.34rem;
    }
    .zhuyi {
      margin-top: 0.65rem;
    }
    .jies {
      color: #453192;
      font-size: 75%;
      text-align: center;
      margin-top: 1rem;
    }
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
