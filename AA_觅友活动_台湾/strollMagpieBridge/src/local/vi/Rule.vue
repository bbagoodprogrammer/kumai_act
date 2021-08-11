<template>
  <div class="rule">
    <div class="title">Quy tắc & Thưởng</div>
    <div class="tab">
      <span :class="{act:type == 1}" @click="tabClick(1)">Quy tắc</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">Thưởng</span>
    </div>
    <div class="rule_tips" v-if="type == 1">
      <p class="tm">Thời gian sự kiện：{{actTime}}</p>
      <h5>1.Cách tham gia sự kiện</h5>
      <p>
        Thiết lập quan hệ：<br />
        User phải thiết lập quan hệ hẹn hò để tham gia sự kiện này <br />
        a）Nếu user đã có CP, thì 1 user trong CP đăng ký sự kiện sẽ mặc định cả 2 user đều tham gia luôn <br />
        b）Nếu user chưa có CP, thì phải tìm 1 đối tác thiết lập quan hệ CP mới được tham gia.
      </p>
      <p>
        Hủy quan hệ：<br />
        a）Nếu user hủy quan hệ CP, sẽ coi như là thoát sự kiện, điểm lãng mạn sẽ bị trừ hết<br />
        b）Nếu user hủy quan hệ hẹn hò, và điểm lãng mạn sẽ bị trừ hết <br />
        c）Nếu user đã thiết lập quan hệ hẹn hò, mà lại thiết lập CP với user khác, hệ thống sẽ tự hủy quan hệ hẹn hò và trừ hết điểm lãng mạn <br />
        d)Sau khi hủy quan hệ hẹn hò, user có thể thiết lập lại với user khác<br />
        để tham gia sự kiện, nhưng không được chọn lại đối tác cũ.
      </p>
      <div class="rejectBox">
        <u @click="showQuery = true" class="reject" v-if="owner.is_reg">Hủy quan hệ hẹn hò>></u>
      </div>
      <h5>2.Cách thu tập điểm lãng mạn</h5>
      <p>User tham gia sự kiện có thể nhận được điểm lãng mạn qua nhận quà chỉ định</p>
      <div class="giftList list1">
        <div class="gift_item" v-for="(item,index) in giftArr" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu ứng</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <h5>3.Cách dạo cầu ô thước</h5>
      <p>
        -User tích lũy điểm lãng mạn có thể kéo avatar của hai bên gần nhau, cũng như người Ngưu Lang và Chức Nữ. Khi điểm lãng mạn đủ N, hai bên sẽ nhận được danh hiệu (Chưa phải là yêu)*3 ngày; Khi
        điểm lãng mạn đủ 8000, hai bên sẽ nhận được danh hiệu(Đậu đỏ yêu thương)*7 ngày<br />
        -BXH điểm lãng mạn sẽ được sắp xếp từ cao xuống thấp, nếu điểm lãng mạn giống nhau thì user đến trước sẽ được ưu tiên
      </p>
      <h5>4.Tổ tình</h5>
      <p>-Mỗi quà 「Couple」（giá ：19999 xu）được tăng ra，sẽ có thông báo hiện ở tất cả phòng live trên app（5s）</p>
      <p>-User nào tạng ra quà 「Couple」 2 lần trở lên,sẽ nhận chủ đề phòng 「hẹn hò lãng mạn」*7 ngày</p>
      <h5>5.Điều khác</h5>
      <p>Trong sự kiện nếu phát hiện user tham gia qua kênh bất chính đáng, admin có quyền thu hồi quà, khóa acc, hủy bỏ điểm đã có trong sự kiện mà không thông báo trước, các kênh bất chính đáng gồm
        và không giới hạn：</p>
      <p>a）Nói xấu, bình luận xấu user khác</p>
      <p>b) Chơi xu lậu </p>
    </div>
    <div class="gift_tips" v-else>
      <p class="tm">Thời gian sự kiện：{{actTime}}</p>
      <h5>1.Qùa dạo cầu</h5>
      <div class="giftList list2">
        <div class="gift_item" v-for="(item,index) in giftArr2" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu ứng</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>
        Khi điểm lãng mạn đủ 4000, hai bên sẽ nhận được danh hiệu (Chưa phải là yêu)*3 ngày; Khi điểm lãng mạn đủ 8000, hai bên sẽ nhận được danh hiệu(Đậu đỏ yêu thương)*7 ngày
      </p>
      <h5>2.Qùa BXH</h5>
      <div class="giftList list3">
        <div class="gift_item" v-for="(item,index) in giftArr3" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">Hiệu ứng</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>CP Top1:Khung ảnh CP vô địch（15ngày）+ Huy chương Ngưu lang Chức nữ（30ngày）+Xe Sát cánh cùng bay（10ngày）+Chứng nhận CP đặc biệt（10ngày）+Qùa đặc biệt (đời đời kiếp kiếp)（Mỗi user nhận 1
        quà，9999
        xu/quà）+Qùa đặc biệt (hẹn hò cầu ô thước)（Mỗi user nhận 1 quà，13140 xu/quà） </p>
      <p>CP Top2:Khung ảnh CP về nhì（10ngày）+Huy chương Ngưu lang Chức nữ（15ngày）+Xe Sát cánh cùng bay（7ngày）+Chứng nhận CP tình yêu（7ngày）+Qùa đặc biệt (đời đời kiếp kiếp)（Mỗi user nhận 1 quà，9999
        xu/quà）
      </p>
      <p>CP Top3:Khung ảnh CP cao cấp（7ngày）+Xe Sát cánh cùng bay（10ngày）+Qùa đặc biệt (đời đời kiếp kiếp)（Mỗi user nhận 1 quà，9999 xu/quà） </p>

    </div>
    <p class="lastTips">Sự kiện không có liên quan với Công Ty Apple</p>
    <p class="lastTips2">*Quyền giải thích cuối cùng của sự kiện thuộc về đơn vị tổ chức sự kiện </p>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">Có xác nhận hủy quan hệ hẹn hò không</div>
          <div class="tips" v-html="tipsArr[1].replace('$',owner.days).replace('%',owner.score)">
          </div>
          <div class="btns">
            <u class="st1" @click="relieve()">Xác nhận hủy</u>
            <span class="st2" @click="showQuery = false">Tôi suy nghĩ lại</span>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { relieve } from "../../apis"
import { mapState } from "vuex"
import getDate from "../../utils/getDate"

export default {
  data () {
    return {
      type: 1,
      showQuery: false,
      tipsArr: {
        1: 'Các bạn dùng $ ngày để tích lũy % điểm lãng mạn, có xác nhận hủy bỏ không？<br/>Sau khi hủy，điểm lãng mạn sẽ bị trừ hết',
      },
      giftArr: [
        {
          img: require('./img/rule_gift/gift_1.png'),
          name: 'Thiệp ngọt ngào<br/>+100 điểm lãng mạn'
        },
        {
          img: require('./img/rule_gift/gift_2.png'),
          name: 'Hoa tổ tình<br/>+1880 điểm lãng mạn',
          tips: 'Hiệu ứng'
        },
        {
          img: require('./img/rule_gift/gift_3.png'),
          name: 'Magpies<br/>+3000 điểm lãng mạn',
          tips: 'Hiệu ứng'
        },
        {
          img: require('./img/rule_gift/gift_4.png'),
          name: 'Album tình yêu<br/>+12000 điểm lãng mạn',
          tips: 'Hiệu ứng'
        },
        {
          img: require('./img/rule_gift/gift_5.png'),
          name: 'Couple<br/>+19999 điểm lãng mạn',
          tips: 'Hiệu ứng'
        },
      ],
      giftArr2: [
        {
          img: require('./img/rule_gift/gift_6.png'),
          name: 'LV.1 Chưa phải là yêu'
        },
        {
          img: require('./img/rule_gift/gift_7.png'),
          name: 'LV.2 Đậu đỏ yêu thương'
        }
      ],
      giftArr3: [
        {
          img: require('./img/rule_gift/gift_10.png'),
          name: 'Khung CP（Sẽ có khác biệt）'
        },
        {
          img: require('./img/rule_gift/gift_11.png'),
          name: 'Huy chương Ngưu lang Chức nữ'
        },
        {
          img: require('./img/rule_gift/gift_12.png'),
          name: 'Xe Sát cánh cùng bay'
        },
        {
          img: require('./img/rule_gift/gift_13.png'),
          name: 'Chứng nhận CP'
        },
        {
          img: require('./img/rule_gift/gift_19.png'),
          name: 'hẹn hò cầu ô thước<br/>Qùa đặc biệt'
        },
        {
          img: require('./img/rule_gift/gift_20.png'),
          name: 'đời đời kiếp kiếp<br/>Qùa đặc biệt'
        }

      ]
    }
  },
  computed: {
    ...mapState(['owner', 'activity']),
    actTime () {
      return getDate(new Date(this.activity.stime * 1000), 8) + '-' + getDate(new Date(this.activity.etime * 1000), 8)
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
      console.log(this.type)
    },
    relieve () {
      relieve().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`tỏ tình đã gửi đến, xin vui lòng chờ đời hồi âm từ đối phương`)
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
  background: rgba(59, 28, 171, 1);
  padding: 0.6rem 0.29rem;
  > .title {
    font-size: 0.34rem;
    font-weight: 500;
    text-align: center;
  }
  .tab {
    width: 4.98rem;
    height: 0.68rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto;
    background: url(../../img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 2.56rem;
      height: 0.68rem;
      text-align: center;
      line-height: 0.68rem;
      &.act {
        color: #3B1CAB;
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    font-size: 0.26rem;
    color: #FCE278;
    text-align: center;
  }
  h5 {
    color: #F3D97C;
    font-size: 0.26rem;
    font-weight: 600;
  }
  p {
    font-size: 0.24rem;
    margin: 0.2rem auto;
  }
  .rejectBox {
    text-align: right;
    margin: 0.1rem 0 0.2rem;
    .reject {
      font-size: 0.22rem;
      color: #F3D97C;
    }
  }
  .giftList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    &.list1 {
      .gift_item {
        &.gift0 {
          margin-left: 0.6rem;
        }
        &.gift2 {
          margin-right: 0.6rem;
        }
        &.gift3 {
          margin-left: 1.5rem;
        }
        &.gift4 {
          margin-right: 1.5rem;
        }
      }
    }
    &.list3 {
      padding: 0 0.8rem;
      margin-top: 0.3rem;
    }
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
      margin-bottom: 0.2rem;
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
          width: 0.93rem;
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
        text-align: center;
      }
    }
  }
}
.queryPup {
  width: 6.46rem;
  height: 4rem;
  padding-top: 0.28rem;
  background: url(../../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 0.88rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: #FCE278;
  }
  .tips {
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    u {
      color: rgba(212, 202, 250, 1);
    }
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
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
  color: #F3D97C !important;
  margin-top: 0.47rem !important;
}
.lastTips2 {
  text-align: center;
  font-size: 0.22rem;
  color: #F3D97C !important;
  margin-top: 0.5rem !important;
}
</style>