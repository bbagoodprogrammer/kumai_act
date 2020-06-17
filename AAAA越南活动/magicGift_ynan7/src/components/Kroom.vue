<template>
  <div class="kroom" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p class="rankTips"> <strong>Xếp hạng theo mị lực nhận tại phòng Kara từ những quà sau</strong> </p>
      <div class="wards">
        <div class="wardItem">
          <img src="../assets/img/ward4.png" alt="">
          <strong>Sinh Tố Dâu</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward5.png" alt="">
          <strong>Bông Phấn</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward6.png" alt="">
          <strong>Trâm Cài Tóc</strong>
        </div>
      </div>
      <p class="fansong">Tặng quà cho thí sinh dự thi tại phòng Karra, người tặng sẽ nhận lại 5% số xu vào sáng sớm hôm sau</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img src="../assets/img/shi.png" alt="" class="img1" v-if="item.rank == 1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key="index">{{item2.total}}</span>
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <!-- <img src="../assets/img/shi.png" alt="" class="img1"> -->
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key="index">{{item2.total}}</span>
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
    height: 3.7rem;
    .rankTips {
      text-align: center;
      margin-top: 0.29rem;
      strong {
        display: inline-block;
        height: 0.39rem;
        line-height: 0.42rem;
        padding: 0 0.19rem;
        color: #fceeb8;
        font-weight: 600;
        font-size: 0.24rem;
        text-align: center;
      }
    }
    .wards {
      width: 5.6rem;
      display: flex;
      justify-content: space-between;
      margin: 0.1rem auto 0.1rem;
      .wardItem {
        width: 1.8rem;
        img {
          display: block;
          width: 1.4rem;
          height: 1.4rem;
          margin: 0 auto;
        }
        strong {
          display: block;
          width: 100%;
          height: 0.64rem;
          margin-top: 0.09rem;
          color: #f3d5e1;
          font-size: 0.21rem;
          text-align: center;
          // white-space: nowrap;
        }
      }
    }
    .fansong {
      font-size: 80%;
      color: #f3d5e1;
      text-align: center;
      line-height: 0.3rem;
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
      .top1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .img2 {
          border: none !important;
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
        background: url(../assets/img/top3Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.2rem;
      background: url(../assets/img/top4Bg.png);
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
        color: #ffc0ee;
        font-size: 0.36rem;
        font-style: italic;
        font-weight: 800;
        line-height: 0.65rem;
      }
      .userBox {
        width: 2.8rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1rem;
          height: 1.1rem;
          z-index: 50;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .img1 {
            width: 0.94rem;
            height: 0.96rem;
            z-index: 999;
            position: absolute;
            border: none;
            top: 0.06rem;
            left: 0.05rem;
          }
          .img2 {
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 0.04rem solid #fff;
          }
        }
        .userMsg {
          .name {
            font-size: 0.26rem;
            max-width: 1.7rem;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
            color: #ffedff;
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
            font-size: 93%;
            color: #fff88c;
            line-height: 0.33rem;
            margin-top: 0.05rem;
            font-weight: 700;
          }
        }
      }
      .wardsMsg {
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        // padding-right:.5rem;
        color: #fffbfb;
        font-weight: 700;
        font-size: 0.24rem;
        line-height: 0.4rem;
        > span {
          padding-left: 0.43rem;
          margin-left: 0.05rem;
        }
        > span:nth-child(1) {
          width: 0.7rem;
        }
        > span:nth-child(2) {
          width: 0.6rem;
        }
        > span:nth-child(2) {
          flex: 1;
        }
      }
    }
  }
}
</style>
