<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)">Phần thưởng</span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)">Quy tắc</span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>Thời gian</h5>
      <p>{{actTime}}</p>
      <h5>Phần thưởng</h5>
      <div class="giftsItem">
        <!-- <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
            
          </div>
          <strong v-html="giftName[index]"></strong>
        </div> -->
      </div>
      <h5>Quà Túi giá trị Đậu Mỗi Ngày</h5>
      <img src="./img/ruleImg2.png" alt="" class="ruleImg2">
      <p>
        Hộp May Mắn cấp càng cao, quà càng nhiều, lần thứ 5 nhận được Hộp quà siêu sẽ trúng Huy Chương May Mắn
      </p>
      <h5>Quà top 10 BXH May Mắn</h5>
      <h6>Hạng 1:</h6>
      <p>Huy Chương May Mắn (30 ngày)+Trang Sức Ma Kết (30 ngày)+ Xe Bạch Ngọc (30 ngày)+Hội Viên VIP (30 ngày)+1000 xu+1000 đậu</p>
      <h6>Hạng 2:</h6>
      <p>Huy Chương May Mắn (20 ngày)+Trang Sức Ma Kết (20 ngày)+ Xe Bạch Ngọc (20 ngày)+Hội Viên VIP (30 ngày)+800 xu+800 đậu</p>
      <h6>Hạng 3:</h6>
      <p>Huy Chương May Mắn (15 ngày)+Trang Sức Ma Kết (15 ngày)+ Xe Bạch Ngọc (15 ngày)+Hội Viên VIP (30 ngày)+500 xu+500 đậu </p>
      <h6>Hạng 4-5:</h6>
      <p>Huy Chương May Mắn (15 ngày)+ Xe Bạch Ngọc (15 ngày)+Hội Viên VIP (30 ngày)+300 xu+300 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Xe Bạch Ngọc (15 ngày)+Hội Viên VIP (30 ngày)+200 xu+200 đậu</p>
      <h5>Quà top 10 BXH Tiếp Ứng</h5>
      <h6>Hạng 1:</h6>
      <p>Huy Chương Tiếp Ứng (30 ngày), Trang Sức Ma Kết (30 ngày)+Xe Bạch Ngọc (30 ngày)+Hội Viên VIP (30 ngày)+1000 xu+1000 đậu</p>
      <h6>Hạng 2:</h6>
      <p>Huy Chương Tiếp Ứng (20 ngày), Trang Sức Ma Kết (20 ngày)+Xe Bạch Ngọc (20 ngày)+Hội Viên VIP (30 ngày)+800 xu+800 đậu</p>
      <h6>Hạng 3:</h6>
      <p>Huy Chương Tiếp Ứng (15 ngày), Trang Sức Ma Kết (15 ngày)+Xe Bạch Ngọc (15 ngày)+Hội Viên VIP (30 ngày)+500 xu+500 đậu</p>
      <h6>Hạng 4-5:</h6>
      <p>Huy Chương Tiếp Ứng (15 ngày), Trang Sức Ma Kết (15 ngày)+Hội Viên VIP (30 ngày)+300 xu+300 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Xe Bạch Ngọc (15 ngày)+Hội Viên VIP (30 ngày)+200 xu+200 đậu</p>
    </div>
    <div class="ruleItem" v-else>
      <h5>Thời gian</h5>
      <p>{{actTime}}</p>
      <h5>Quy tắc</h5>
      <h6 class="minTop">Báo danh</h6>
      <p>1.Nhấn “Báo danh” sẽ báo danh thành công, sau khi báo danh mới bắt đầu tính điểm</p>
      <p>2.Cách tặng Hộp May Mắn quà bài hát: Vào bài hát chọn Quà - sự kiện - chọn hộp quà tương ứng và tặng</p>
      <h5>Quy tắc BXH</h5>
      <h6>BXH may mắn:</h6>
      <p>1.Xếp hạng dựa vào tổng mị lực 3 loại Hộp May Mắn quà bài hát nhận được sau khi báo danh</p>
      <P>2.Hiển thị top 100, nếu bằng điểm, ai đạt được điểm trước xếp trước </P>
      <h6>BXH tiếp ứng:</h6>
      <p>1.Xếp hạng dựa vào số xu tiêu phí tặng ra 3 loại Hộp May Mắn quà bài hát sau khi báo danh</p>
      <P>2.Hiển thị top 100, nếu bằng điểm, ai đạt được điểm trước xếp trước</P>
      <h5>Quy tắc Quà Hàng Ngày</h5>
      <p>
        1.Mỗi ngày nhận được Hộp quà, Hộp quà cao, Hộp quà siêu, có thể nhận quà tương ứng<br />
        2.Hộp May Mắn cấp càng cao, nhận được quà càng giá trị, lần thứ 5 nhận Hộp quà siêu sẽ trúng Huy Chương May Mắn<br />
        3.Phần thưởng mỗi loại Hộp May Mắn mỗi ngày chỉ có thể nhận 1 lần, có hiệu lực trong ngày
      </p>
    </div>
    <p class="lastTips">Quyền giải thích cuối cùng của sự kiện này thuộc về ban tổ chức</p>
  </div>
</template>

<script>


import getDate from "../../utils/getDate"
import { mapState } from "vuex"

export default {
  data() {
    return {
      type: 1
    }
  },
  computed: {
    ...mapState(['stime', 'etime']),
    actTime() {
      console.log(this.stime)
      return getDate(new Date(this.stime * 1000), 4) + '-' + getDate(new Date(this.etime * 1000), 4)
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  .rule {
    background-color: RGBA(73, 28, 95, 1);
    padding: 0.37rem 0.18rem 0.6rem;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        display: block;
        width: 3.55rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .p1Tab1 {
        background: url(../../img/tab3.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab4.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../img/tab2.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab1.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: #ffa0a9;
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 7.12rem;
      height: 5.2rem;
      background: url(./img/ruleImg1.png);
      background-size: 100% 100%;
    }
    .ruleImg2 {
      width: 7.02rem;
      height: 2.8rem;
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
    .gifts {
      h6 {
        color: #fff;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0;
    font-size: 0.28rem;
  }
}
// @import "../../assets/scss/common.scss";
</style>
