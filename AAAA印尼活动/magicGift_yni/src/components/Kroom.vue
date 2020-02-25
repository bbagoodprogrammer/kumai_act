<template>
  <div class="kroom" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>Ranking menurut ini : Menerima nilai pesona hadiah yang berikut di kamar karaoke setelah mendaftar</p>
      <div class="wards">
        <div class="wardsImg">
          <span class="water">
            <img src="../assets/img/motan.png" alt="">
            <em>Roller coaster</em>
          </span>
          <span class="cun">
            <img src="../assets/img/shengshui.png" alt="">
            <em>Pirate ship</em>
          </span>
          <span class="car">
            <img src="../assets/img/baodian.png" alt="">
            <em>Fan kartun</em>
          </span>
        </div>
      </div>
      <p class="fansong">Sawer hadiah yang di atas kepada peserta di kamar karaoke,sistem akan kembalikan 5% koin emas dari koin emas hadiah kepada orang yang sawer pada pukul 0:00:00.</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <!-- <img src="../assets/img/sunmmer.png" alt="" class="img1" v-if="index ===0"> -->
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span>
            <!-- <span class="cun">150</span>
                        <span class="car">180</span> -->
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img v-lazy="item.avatar" alt="">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span>
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

<style lang="scss" scope>
.kroom {
  padding-top: 0.13rem;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    // height: 3rem;
    // background: url(../assets/img/shanhu.png);
    // background-size: 100% 100%;
    p {
      padding: 0 0.08rem;
      text-align: center;
      color: #ffed6a;
    }
    .wards {
      height: 1.92rem;
      .wardsImg {
        // background: url(../assets/img/wardsSample.png) no-repeat;
        background-size: contain;
        margin: 0.2rem auto 0;
        width: 5rem;
        height: 1.5rem;
        position: relative;
        > span {
          display: inline-block;
          width: 33%;
          font-size: 80%;
          position: absolute;
          bottom: -0.4rem;
          img {
            display: block;
            width: 1.26rem;
            height: 1.23rem;
            margin: 0 auto;
          }
          em {
            width: 100%;
            height: 0.64rem;
            font-size: 80%;
            margin-top: 0.1rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &.car {
            // left: -0.4rem;
          }
          &.cun {
            left: 1.68rem;
          }
          &.water {
            left: 3.35rem;
          }
        }
      }
    }
    .fansong {
      font-size: 80%;
      color: #6ffff3;
      text-align: center;
      line-height: 0.25rem;
      margin: 0.1rem 0;
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
          width: 0.84rem;
          height: 0.73rem;
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
    .listBottom {
    }
    .listItem {
      height: 1.24rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      > span {
        width: 0.5rem;
        margin: 0 0.2rem 0 0.25rem;
        text-align: center;
        color: #63ffe2;
        font-size: 120%;
      }
      .userBox {
        width: 3rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.2rem;
          height: 1rem;
          display: flex;
          align-items: center;
          // background: url(../assets/img/sunmmer.png);
          // background-size: 100% 100%;
          z-index: 50;
          position: relative;
          img {
            // margin: 0.1rem 0.1rem 0 0;
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 0.03rem solid #fff;
          }
          .img1 {
            width: 0.93rem;
            height: 1.04rem;
            z-index: 999;
            position: absolute;
            margin: 0;
          }
          .img2 {
            display: inline-block;
            width: 0.86rem;
            height: 0.86rem;
            // position: absolute;
            // top: 0.15rem;
            // left: 0.05rem;
            margin: 0;
          }
        }
        .userMsg {
          .name {
            font-size: 85%;
            max-width: 1.7rem;
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
            padding-left: 0.35rem;
            background: url(../assets/img/charm.png) no-repeat;
            background-size: 0.28rem 100%;
            font-size: 80%;
            color: #fff88c;
            line-height: 0.33rem;
            margin-top: 0.05rem;
          }
        }
      }
      .wardsMsg {
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        // padding-right:.5rem;
        color: #6ffff3;
        font-size: 80%;
        line-height: 0.4rem;
        > span {
          margin-left: 0.2rem;
          padding-left: 0.43rem;
          width: 0.45rem;
        }
        // > span:first-child {
        //   margin-left: 0;
        //   background: url(../assets/img/Coconut.png) no-repeat;
        //   background-size: contain;
        // }
        // > span:nth-child(2) {
        //   background: url(../assets/img/Watergun.png) no-repeat;
        //   background-size: contain;
        // }
        // > span:nth-child(3) {
        //   background: url(../assets/img/car.png) no-repeat;
        //   background-size: contain;
        // }
      }
    }
  }
}
</style>
