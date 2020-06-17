<template>
  <div class="kroom" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p class="rankTips">Xếp hạng theo mị lực nhận tại phòng Kara từ những quà sau </p>
      <div class="wards">
        <img src="../assets/img/ward2.png" alt="">
        <div class="giftName">
          <span>Dừa Lạnh</span>
          <span>Ghế Bãi Biển</span>
          <span>Nhà Ven Biển</span>
        </div>
        <!-- <div class="wardItem">
          <img src="../assets/img/ward4.png" alt="">
          <strong>Vịt Con</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward5.png" alt="">
          <strong>Súng Nước</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward6.png" alt="">
          <strong>Xe Lửa</strong>
        </div> -->
      </div>
      <p class="fansong">Tặng quà cho thí sinh dự thi tại phòng Karra,</br> người tặng sẽ nhận lại 5% số xu vào sáng sớm hôm sau</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/user1.png`)" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :key="index">
              <img :src="item2.img" alt="" class="giftImg">
              <strong>{{item2.total}}</strong>
            </span>
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :key="index">
              <img :src="item2.img" alt="" class="giftImg">
              <strong>{{item2.total}}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(["kRoomArr", "activateState"]),
    top() {
      if (this.kRoomArr !== []) {
        return this.kRoomArr.slice(0, 3)
      }
    },
    bottom() {
      if (this.kRoomArr !== []) {
        return this.kRoomArr.slice(3)
      }
    }
  },
  methods: {
    goPersonalMsg(id) {
      location.href = `uid:${id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.kroom {
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    background: url(../assets/img/sh.png) no-repeat;
    background-size: 100% 2.1rem;
    .rankTips {
      width: 4.65rem;
      margin: 0.11rem auto 0;
      text-align: center;
      color: #ffed6a;
      font-size: 0.26rem;
      font-weight: 500;
      line-height: 0.3rem;
    }
    .wards {
      width: 4.37rem;
      margin: 0.09rem auto 0.08rem;
      img {
        height: 1.2rem;
      }
      .giftName {
        width: 4.37rem;
        // margin-left: -0.1rem;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.24rem;
          white-space: nowrap;
          text-indent: 0.3rem;
        }
        span:first-child {
          text-indent: 0.1rem;
        }
        span:nth-child(3) {
          text-indent: 0.2rem;
        }
      }
      // .wardItem {
      //   width: 1.6rem;
      //   img {
      //     display: block;
      //     width: 1.6rem;
      //     height: 1.6rem;
      //   }
      //   strong {
      //     display: block;
      //     margin-top: 0.09rem;
      //     font-size: 80%;
      //     text-align: center;
      //     font-weight: 500;
      //   }
      // }
    }
    .fansong {
      padding: 0 0.5rem;
      font-size: 80%;
      color: #b5f7ff;
      text-align: center;
      font-weight: 500;
    }
  }
  .wordsList {
    margin: 0.05rem 0.15rem 0;
    padding-bottom: 1.6rem;
    .listTop {
      .userBox {
        .userMsg {
          margin-left: 0;
        }
      }
      .listItem {
        > span {
          display: block;
          margin: 0 0 0 0.1rem;
          width: 0.75rem;
          height: 0.65rem;
          text-indent: -999rem;
        }
      }
      .img1 {
        width: 1.2rem !important;
        height: 1.1rem !important;
        left: 0.03rem;
        top: 0.01rem;
      }
      .img2 {
        border: none !important;
      }
      .top1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      .top2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      .top3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.2rem;
      background: url(../assets/img/top3Bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      > span {
        display: block;
        margin: 0 0 0 0.1rem;
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        color: #63ffe2;
        font-size: 0.36rem;
        font-style: italic;
        font-weight: 700;
        line-height: 0.65rem;
      }
      .userBox {
        width: 3.3rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.2rem;
          height: 1.1rem;
          z-index: 50;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .img1 {
            width: 1.09rem;
            height: 1.09rem;
            z-index: 999;
            position: absolute;
            border: none;
          }
          .img2 {
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 0.03rem solid #fff;
          }
        }
        .userMsg {
          width: 1.94rem;
          margin-left: 0.16rem;
          .name {
            font-size: 0.26rem;
            max-width: 2.1rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
          }
          .id {
            color: #86edf1;
            font-size: 75%;
            height: 0.3rem;
          }
          .charm {
            height: 0.33rem;
            // padding-left: 0.35rem;
            // background: url(../assets/img/charm.png) no-repeat;
            // background-size: 0.28rem 100%;
            font-size: 0.28rem;
            color: #fff88d;
            line-height: 0.33rem;
            font-weight: 500;
          }
        }
      }
      .wardsMsg {
        width: 2.86rem;
        display: flex;
        font-weight: 700;
        font-size: 80%;
        > span {
          margin-right: 0.1rem;
          width: 0.88rem;
          display: flex;
          align-items: center;
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 auto;
          }
          strong {
            color: #6ffff3;
            font-size: 0.24rem;
            font-weight: 600;
            text-align: center;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
}
</style>
