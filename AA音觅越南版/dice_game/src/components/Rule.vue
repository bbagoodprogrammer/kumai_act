<template>
  <div class="rule">
    <i class="close" @click="closeRule()"></i>
    <div class="title"><i></i></div>
    <div class="actTime">Thời gian: 19:00 ngày 28/4 - 23:59:59 ngày 5/5</div>
    <div class="tab">
      <span class="ruleTab" :class="{act:type == 1}" @click="tabClick(1)">Thể lệ</span>
      <span class="wardTab" :class="{act:type == 2}" @click="tabClick(2)">Thưởng</span>
    </div>
    <div class="ruleTips" v-if="type== 1">
      <h6>1. Đổ xúc xắc làm phú ông:</h6>
      <p>Mua xúc xắc quay thưởng, trúng nhiều phần thưởng hấp dẫn. </p>
      <P>Top 10 đổ xúc xắc đi được nhiều bước nhất sẽ nhận thưởng. </P>
      <P>Sau khi sự kiện kết thúc, nếu xúc xắc còn không đổ hết sẽ được trả lại xu vớ mức tính 20 xu 1 xúc xắc.</P>
      <h6>2. Tỉ lệ trúng thưởng </h6>
      <img src="../assets/img/rule/table.png" alt="" class="gl_img">
      <h6>3. Chú ý: </h6>
      <p>* Trong thời gian sự kiện diễn ra, nếu người dùng có hành vi gian lận tuỳ trường hợp, app sẽ tiến hành cảnh cáo, huỷ tư cách tham gia hoặc xoá tài khoản. </p>
      <P>* Sự kiện không liên quan đến tập đoàn apple.</P>
    </div>
    <div class="wardsTips" v-if="type== 2">
      <h6>1. Top 1-3</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>2. Top 4-10</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>3. Top 1 BXH ngày nhận 5 xúc xắc được phát vào 0h ngày kế tiếp </h6>
      <h6>*Ngày 5/5 là ngày kết thúc event, quà BHX ngày 5/5 sẽ không gửi.</h6>
    </div>
    <p class="lastTips">*Quyết định cuối cùng thuộc về alochat</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 1,
      gift1: [
        {
          img: require('../assets/img/rule/Certification_01.png'),
          name: 'Danh hiệu Đại Phú ông 7 ngày'
        },
        {
          img: require('../assets/img/rule/badge.png'),
          name: 'Huy chương Đại phú ông 10 ngày'
        },
        {
          img: require('../assets/img/rule/car1.png'),
          name: 'xe Chiến trận 7 ngày'
        }
      ],
      gift2: [
        {
          img: require('../assets/img/rule/Certification_01.png'),
          name: 'Tiểu Thiên Sứ 7 ngày'
        },
        {
          img: require('../assets/img/rule/badge.png'),
          name: 'Huy chương Đại phú ông 7 ngày'
        },
        {
          img: require('../assets/img/rule/BMW.png'),
          name: 'Xe BMW 7 ngày'
        }
      ]
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    },
    closeRule () {
      this.$parent.showRule = false
    }
  }
}
</script>
<style lang="scss">
.red {
  color: #ffe747 !important;
}
.gl_img {
  width: 5.9rem;
  height: 2.85rem;
  margin: 0.15rem auto;
}

.rule {
  width: 6.48rem;
  height: 10rem;
  padding-top: 0.54rem;
  border: 0.08rem solid #ffffff;
  border-radius: 0.24rem;
  background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
  position: relative;
  padding-bottom: 0.1rem;
  .title {
    width: 5.14rem;
    height: 1.42rem;
    background: url(../assets/img/title/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/title_14.png);
      background-size: 100% 100%;
    }
  }
  .actTime {
    text-align: center;
  }
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.24rem;
    span {
      width: 2.7rem;
      height: 0.8rem;
      background: url(../assets/img/tab2.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: rgba(59, 59, 59, 1);
      line-height: 0.67rem;
      &.wardTab {
        margin-left: 0.46rem;
      }
      &.act {
        color: rgba(126, 45, 0, 1);
        background: url(../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    height: 7.8rem;
    overflow-y: scroll;
    padding: 0 0.31rem;
    h6 {
      font-size: 0.28rem;
      font-weight: bold;
      margin: 0.33rem 0 0.22rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
  .wardsTips {
    height: 7.8rem;
    overflow-y: scroll;
    padding: 0 0.3rem;
    h6 {
      margin: 0.2rem auto;
    }
    .giftBox {
      width: 5.88rem;
      height: 2.66rem;
      background: rgba(103, 52, 191, 0.4);
      border-radius: 0.12rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 1.7rem;
        height: 100%;
        padding-top: 0.7rem;
        img {
          display: block;
          margin: 0 auto;
          width: 1.4rem;
          height: 1.4rem;
        }
        strong {
          display: block;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.05rem;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
  }
  .lastTips {
    text-align: center;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
}
</style>
