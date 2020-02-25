<template>
  <div class="giftListBox">
    <p class="title">Đổi thưởng</p>
    <div class="shengyu">
      <span>
        Số Điểm còn: <em>{{surplusCoins}}</em>
      </span>
    </div>
    <p class="duiTime">Thời gian sự kiện: 18h 15/10~21h 29/10 (9h~21h mỗi ngày đặt cược lúc 0 phút mỗi giờ)
      </br> Thời gian đổi thưởng: 18h 15/10~9h 30/10</p>
    <span class="lookRecet" @click="showHistory()">
      Xem thông tin đổi
    </span>
    <div class="giftList">
      <div v-for="(item,index) in giftList" :key="index">
        <img :src="wardListMsg[item.id].img" alt="">
        <p>{{wardListMsg[item.id].name}}</p>
        <p class="coins">Số điểm cần:{{item.b}}</p>
        <em @click="exchange(item.id,item.b)"></em>
      </div>
    </div>
    <ex-change-history v-show="showhistory" @closeHistory="closeHistory" :wardListMsg="wardListMsg"></ex-change-history>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <loading></loading>
  </div>
</template>

<script>
import getString from "../../utils/getString"
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import ExChangeHistory from "./ExChangeHistory"
import MsgToast from "../../components/commonToast"
import { mapState } from "vuex"
export default {
  components: { Loading, ExChangeHistory, MsgToast },
  data() {
    return {
      giftList: [],
      surplusCoins: 0,
      showhistory: false,
      tastMsg: '',
      showT: false,
      get_gift_status: null,
      wardListMsg: {
        0: {
          name: "500 Đậu",
          img: require('../../assets/img/ward1.png')
        },
        1: {
          name: "Phiếu quà nạp 10%",
          img: require('../../assets/img/ward2.png')
        },
        2: {
          name: "VIP",
          img: require('../../assets/img/ward3.png')
        },
        3: {
          name: "Khinh Khí Cầu",
          img: require('../../assets/img/ward4.png')
        },
        4: {
          name: "Thuyền Rồng",
          img: require('../../assets/img/ward5.png')
        },
        5: {
          name: "Quý tộc Bá Tước",
          img: require('../../assets/img/ward6.png')
        },
        6: {
          name: "Quý tộc Hầu Tước",
          img: require('../../assets/img/ward7.png')
        },
        7: {
          name: "Thiên Sứ ",
          img: require('../../assets/img/ward8.png')
        },
        8: {
          name: "Miu cưng",
          img: require('../../assets/img/ward9.png')
        },
        9: {
          name: "Xe Hoa",
          img: require('../../assets/img/ward10.png')
        },
        10: {
          name: "Đu Quay (Bài hát)",
          img: require('../../assets/img/ward11.png')
        },
        11: {
          name: "Hồ Điệp",
          img: require('../../assets/img/ward12.png')
        }
      }
    }
  },
  computed: {
    ...mapState(['actStatus', 'owner_msg'])
  },
  created() {
    this.surplusCoins = sessionStorage.getItem('surplusCoins')
    this.get_gift_status = sessionStorage.getItem('get_gift_status')
    api.giftList().then(res => {
      if (res.data.response_status.code === 0) {
        this.giftList = res.data.response_data.gift_lists
      }
    })
  },
  mounted() {
    // this.pushHistory();
    // let regstr = getString('token')
    // window.addEventListener('popstate', function (e) {
    //   // 根据自己的需求实现自己的功能
    //   window.location.href = `./index.html?token=${regstr}`;
    //   // history.go(0);
    // }, false);
  },
  methods: {
    exchange(id, b) { //兑换礼物
      if (this.get_gift_status === 0) {
        this.tastMsg = "Sự kiện chưa bắt đầu"
        this.showT = true
      } else if (this.get_gift_status === 2) {
        this.tastMsg = "Sự kiện đã kết thúc"
        this.showT = true
      } else if (Number(this.surplusCoins) < b) {
        this.tastMsg = `Không đủ xu để đổi`
        this.showT = true
      } else {
        api.receiveGift(id).then(res => {
          if (res.data.response_status.code === 0) {
            this.tastMsg = `Đã đổi xong`
            this.showT = true
            this.surplusCoins -= b
            sessionStorage.setItem("need-refresh", true);
            // sessionStorage.setItem('surplusCoins', this.surplusCoins)
          } else {//兑换错误处理
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
    },
    showHistory() {
      api.receiveGiftRecord(0).then((res => {
        this.$store.commit('changBettingHistory', res.data.response_data.record)
        this.showhistory = true
      }))
    },
    closeHistory() {
      this.showhistory = false
    },
    // pushHistory() {
    //   var state = {
    //     title: "title",
    //     url: "#"
    //   };
    //   window.history.pushState(state, "title", "#");
    // },
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
body {
  background: #0f2123;
}
.giftListBox {
  padding: 0.41rem 0.52rem 0;
  .title {
    color: #ffde5c;
    font-size: 160%;
    font-weight: bold;
    text-align: center;
  }
  .duiTime {
    font-size: 80%;
    color: #659c9c;
    text-align: left;
    margin-top: 0.2rem;
  }
  .shengyu {
    text-align: center;
    margin-top: 0.2rem;
    span {
      display: inline-block;
      width: 2.62rem;
      height: 0.62rem;
      line-height: 0.62rem;
      font-size: 80%;
      color: #659c9c;
      background: rgba(4, 19, 19, 1);
      border: 0.02rem solid rgba(11, 34, 34, 1);
      border-radius: 0.31rem;
      em {
        color: #fff261;
        font-size: 110%;
      }
    }
  }
  .lookRecet {
    display: block;
    width: 2.31rem;
    height: 0.5rem;
    font-size: 85%;
    color: #fff3d0;
    text-align: center;
    line-height: 0.5rem;
    background: rgba(145, 74, 16, 1);
    border: 0.02rem solid rgba(255, 251, 204, 1);
    border-radius: 0.25rem 0 0 0.25rem;
    position: absolute;
    right: -0.02rem;
    top: 1.03rem;
  }
  .giftList {
    padding-bottom: 1rem;
    div {
      display: inline-block;
      width: 33%;
      img {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0.35rem auto 0;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 80%;
        white-space: nowrap;
        margin-top: 0.14rem;
      }
      .coins {
        margin-top: 0.08rem;
        color: #fff7b7;
      }
      em {
        display: block;
        width: 1.6rem;
        height: 0.49rem;
        background: url(../../assets/img/duihuan.png);
        background-size: 100% 100%;
        margin: 0.17rem auto 0;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
