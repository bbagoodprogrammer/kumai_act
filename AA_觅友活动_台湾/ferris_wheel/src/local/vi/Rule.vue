<template>
  <div class="rule">
    <div class="title">Thể lệ và giải thưởng</div>
    <div class="tab">
      <span :class="{act:type == 1}" @click="tabClick(1)">Thể lệ</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">Giải thưởng</span>
    </div>
    <div class="rule_tips" v-if="type == 1">
      <p class="tm">Thời gian sự kiện: 10/5-20/5</p>
      <h5>1.Cách tham gia Đu qua Yêu chân thành</h5>
      <p>
        Hủy quan hệ:<br />
        Người chơi cần ghép đôi tại sự kiện mới được coi là tham gia<br />
        a)Người chơi đã ghép đôi có một người tham gia sự kiện, người còn lại tự động tham gia<br />
        b)Người chơi chưa ghép đôi tham gia sự kiện, sau khi ghép đôi tại sự kiện sẽ được coi là ghép đôi thành công tại góc yêu
      </p>
      <p>
        Hủy quan hệ:<br />
        a)Cặp đôi đã hủy quan hệ ghép đôi tại góc yêu, sẽ được coi là thoát ra sự kiện, điểm True Love sẽ bị xóa.<br />
        b)Nếu không phải cặp đôi, có thể hủy quan hệ tại sự kiện, điểm True Love sẽ bị xóa. <br />
        c)Nếu không phải cặp đôi, mà cùng tham gia sự kiện, trên app ghép đôi với một tài khoản khác, hệ thống sẽ tự động hủy quan hệ ghép đôi tại sự kiện của cả hai, điểm True Love sẽ bị xóa. <br />
        d)Sau khi hủy quan hệ ghép đôi, người chơi có thể mời người khác ghép đôi để tham gia lại, không thể ghép đôi lại với người đã hủy ghép đôi.<br />
      </p>
      <div class="rejectBox">
        <u @click="showQuery = true" class="reject">Hủy quan hệ ghép đôi>></u>
      </div>
      <h5>2. Cách nhận điểm True Love</h5>
      <p>Người chơi tham gia sự kiện nhận được quà chỉ định sẽ được tăng điểm True Love</p>
      <div class="giftList">
        <div class="gift_item" v-for="(item,index) in giftArr" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu quà đặc biệt</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <h5>3. Cách đi Đu qua Yêu chân thành</h5>
      <p>
        Người chơi tích lũy điểm True Love, có thể lên Bảng True Love; Bảng True Love được chia thành BXH ngày và BXH tổng, BXH được xếp hạng theo tổng số điểm True Love từ cao đến thấp, nếu điểm bằng
        nhau sẽ tính theo thời gian trước sau. <br />
        Ngưởi chơi đứng Top 1 tại BXH hàng ngày sẽ được đi Đu quay Yêu chân thành, và được nhận [Bóng thủy tinh yêu chân thành]*2 (mỗi người một quả), người chơi nhận thưởng có thể nhận thêm 10% điểm
        True Love của BXH hàng ngày đã tích lũy (Điểm này sẽ được thêm trực tiếp vào BXH tổng, không thêm vào BXH hàng ngày của ngày tiếp theo)
      </p>
      <h5>4.Cách kêu gọi Thần tình yêu</h5>
      <p>Đưa 50 xu cho Thần tình yêu, có thể kêu thần một lần. Mỗi khi kêu gọi, bạn sẽ nhận được 100% giải thưởng chúc phúc từ Thần tình yêu.</p>
      <img src="./img/rule_table1.png" alt="" class="rule_table1">
      <p>Nếu không kêu gọi được Nhẫn thần tình yêu Cupid trong 500 lần đầu tiên, lần thứ 501 chắn chắn có thể nhận Nhẫn thần tình yêu Cupid . Mỗi người chơi chỉ có thể nhận nhẫn một lần.</p>
      <h5>5. Khác</h5>
      <p>Trong thời gian sự kiện diễn ra, phát hiện hành vi vi phạm sẽ tùy trường hợp xử lý cảnh cáo, tước quyền chơi hoặc khóa tài khoản.</p>
      <p>a)Trong thời gian sự kiện có tình dùng lời lẽ thô tục, ảnh hưởng tới mọi người</p>
    </div>
    <div class="gift_tips" v-else>
      <p class="tm">Thời gian sự kiện: 10/5-20/5</p>
      <h5>1. Giải thưởng đi đu quay</h5>
      <div class="giftList list2">
        <div class="gift_item" v-for="(item,index) in giftArr2" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu quà đặc biệt</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>
        Ngưởi chơi đứng Top 1 tại BXH hàng ngày sẽ được đi Đu quay Yêu chân thành, và được nhận [Bóng thủy tinh yêu chân thành]*2 (mỗi người một quả), người chơi nhận thưởng có thể nhận thêm 10% điểm
        True Love của BXH hàng ngày đã tích lũy (Điểm này sẽ được thêm trực tiếp vào BXH tổng, không thêm vào BXH hàng ngày của ngày tiếp theo)
      </p>
      <h5>2. Giải thưởng BXH tổng</h5>
      <div class="giftList">
        <div class="gift_item" v-for="(item,index) in giftArr3" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu quà đặc biệt</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>Hạng 1: Khung ảnh Quán quân CP (10 ngày)+Huy chương Đu quay Yêu chân thành (10 ngày)+Bơi moto lãng mạn (10 ngày)+chứng nhận CP (10 ngày)+Thiên sứ True Love-quà hiệu ứng (mỗi người một quà)
      </p>
      <p>Hạng 2: Khung ảnh Á quân CP (7 ngày)+Huy chương Đu quay Yêu chân thành (7 ngày)+Bơi moto lãng mạn (7 ngày)+chứng nhận CP (7 ngày)+Bong bóng lãng mạn-quà hiệu ứng (mỗi người một quà)</p>
      <p>Hạng 3: Khung ảnh Quý quân CP (7 ngày)+Huy chương Đu quay Yêu chân thành (7 ngày)+Bơi moto lãng mạn (7 ngày)+chứng nhận CP (7 ngày)+Bong bóng lãng mạn-quà hiệu ứng (mỗi người một quà)</p>
    </div>
    <p class="lastTips">Sự kiện không liên quan đến công ty Apple</p>
    <p class="lastTips2">*Quyết định cuối cùng thuộc về Alochat</p>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">Có hủy quan hệ không?</div>
          <div class="tips" v-html="tipsArr[1].replace('$',owner.days).replace('%',owner.total_score)">
          </div>
          <div class="btns">
            <span class="st1" @click="showQuery = false">Để tôi suy nghĩ lại</span>
            <span class="st2" @click="relieve()">Xác nhận hủy</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { relieve } from "../../apis"
import { mapState } from "vuex"
export default {
  data () {
    return {
      type: 1,
      showQuery: false,
      tipsArr: {
        1: 'Hai bạn đã cùng tham gia sự kiện $ ngày, tích lũy % điểm True Love, bạn thực sự muốn hủy quan hệ không?<br/>Điểm True Love tích lũy được sẽ bị xóa sau khi hủy.',
      },
      giftArr: [
        {
          img: require('./img/rule_gift/gift_7.png'),
          name: 'Chìa khóa tình yêu<br/>+1000 Điểm True Love'
        },
        {
          img: require('./img/rule_gift/gift_4.png'),
          name: 'Mê bạn<br/>+10000 Điểm True Love',
          tips: 'Hiệu quà đặc biệt'
        },
        {
          img: require('./img/rule_gift/gift_5.png'),
          name: 'Pháo hoa tỏ tình<br/>+80000 Điểm True Love',
          tips: 'Hiệu quà đặc biệt'
        },
        {
          img: require('./img/rule_gift/gift_6.png'),
          name: 'Lọ tỏ tình<br/>+200 Điểm True Love',
        },
        {
          img: require('./img/rule_gift/gift_1.png'),
          name: 'Tên Thần tình yêu<br/>+500 Điểm True Love'
        },
        {
          img: require('./img/rule_gift/gift_2.png'),
          name: 'Cupid<br/>+5200 Điểm True Love'
        },
        {
          img: require('./img/rule_gift/gift_3.png'),
          name: 'Dây chuyền chân châu<br/>+20000 Điểm True Love',
          tips: 'Hiệu quà đặc biệt'
        },



      ],
      giftArr2: [
        {
          img: require('./img/rule_gift/gift_9.png'),
          name: '5% điểm True Love'
        },
        {
          img: require('./img/rule_gift/gift_16.png'),
          name: 'Bóng thủy tinh Yêu chân thành*2'
        }
      ],
      giftArr3: [
        {
          img: require('./img/rule_gift/gift_10.png'),
          name: 'Khung ảnh Couple (Top1-2-3)'
        },
        {
          img: require('./img/rule_gift/gift_11.png'),
          name: 'Huy hiệu Đu quay Yêu chân thành'
        },
        {
          img: require('./img/rule_gift/gift_12.png'),
          name: 'Bơi moto lãng mạn'
        },
        {
          img: require('./img/rule_gift/gift_13.png'),
          name: 'Chứng nhận Couple'
        },
        {
          img: require('./img/rule_gift/gift_14.png'),
          name: 'Thiên sứ tình yêu<br/>Quà hiệu ứng'
        },
        {
          img: require('./img/rule_gift/gift_15.png'),
          name: 'Bong bóng lãng mạn<br/>Quà hiệu ứng'
        },
        {
          img: require('./img/rule_gift/gift_16.png'),
          name: 'Bóng thủy tinh Yêu chân thành-Quà hiệu ứng'
        }
      ]
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  methods: {
    tabClick (val) {
      this.type = val
      console.log(this.type)
    },
    relieve () {
      relieve().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`Tin nhắn đang được gửi, vui lòng chờ đợi câu trả lời của bạn ấy`)
          this.showQuery = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rule {
  background: rgba(255, 195, 214, 1);
  padding: 0.6rem 0.29rem;
  > .title {
    font-size: 0.34rem;
    font-weight: 500;
    text-align: center;
    color: rgba(188, 37, 104, 1);
  }
  .tab {
    width: 4.98rem;
    height: 0.68rem;
    background: #EBAACD;
    border: 0.02rem solid #FCCBDA;
    border-radius: 0.34rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto;
    span {
      width: 2.59rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.78rem;
      margin-top: -0.06rem;
      &.act {
        background: url(../../img/singUpBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    font-size: 0.24rem;
    color: rgba(188, 102, 130, 1);
    margin: 0.15rem 0;
  }
  h5 {
    font-size: 0.26rem;
    font-weight: 600;
    color: rgba(176, 97, 101, 1);
  }
  p {
    color: rgba(176, 97, 101, 1);
    font-size: 0.24rem;
    margin: 0.2rem auto;
  }
  .rejectBox {
    text-align: right;
    margin: 0.1rem 0 0.2rem;
    .reject {
      font-size: 0.22rem;
      color: rgba(159, 64, 219, 1);
    }
  }
  .giftList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    &.list2 {
      padding: 0 1.78rem;
      .gift_item {
        &.gift0 {
          margin-left: 0rem;
        }
      }
    }
    .gift_item {
      width: 1.47rem;
      .imgBox {
        width: 1.47rem;
        height: 1.47rem;
        background: url(../../img/luckGiftItem.png);
        background-size: 100% 100%;
        position: relative;
        img {
          width: 1.47rem;
          height: 1.47rem;
        }
        .gType {
          display: block;
          padding: 0 0.1rem;
          height: 0.37rem;
          background: url(../../img/te.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.37rem;
        }
      }
      strong {
        width: 1.57rem;
        margin-left: -0.05rem;
        display: block;
        font-size: 0.24rem;
        color: rgba(176, 97, 101, 1);
        text-align: center;
      }
      &.gift0 {
        margin-left: 0.6rem;
      }
      &.gift2 {
        margin-right: 0.6rem;
      }
    }
  }
}
.rule_table1 {
  display: block;
  width: 5.96rem;
  height: 4.48rem;
  margin: 0 auto;
}

.queryPup {
  width: 6.77rem;
  height: 4.34rem;
  padding-top: 0.28rem;
  background: url(../../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: rgba(188, 37, 104, 1);
  }
  .tips {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
    color: rgba(176, 97, 101, 1);
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.25rem;
      font-size: 0.26rem;
      &.st1 {
        background: url(../../img/st1.png);
        background-size: 100% 100%;
      }
      &.st2 {
        background: url(../../img/st12.png);
        background-size: 100% 100%;
      }
    }
  }
}
.lastTips {
  text-align: center;
  font-size: 0.22rem;
  color: rgba(159, 64, 219, 1) !important;
  margin-top: 0.47rem !important;
}
.lastTips2 {
  text-align: center;
  font-size: 0.22rem;
  color: red !important;
  margin-top: 0.5rem !important;
}
</style>