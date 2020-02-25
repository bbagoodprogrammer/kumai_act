<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>
        按累計人氣值排名，人氣值=K房內獲得魅力值</br>
        上麥時獲得送禮人數前五名人氣值增加1%-5%
      </p>
      <div class="wards">
        <div class="wardsImg">
          <span class="water">
            <img src="../assets/img/shuijing.png" alt="">
            <em>應援氣球<i class="bi"></i><i>10</i></em>
          </span>
          <span class="cun">
            <img src="../assets/img/jiezhi.png" alt="">
            <em>應援燈牌<i class="bi"></i><i>100</i></em>
          </span>
          <span class="car">
            <img src="../assets/img/mdeng.png" alt="">
            <em>全場焦點<i class="bi"></i><i>1255</i></em>
          </span>
        </div>
      </div>
      <p class="fansong"><em>收到以上應援禮物，該禮物魅力值增加5%</em></p>
    </div>
    <div class="wordsList">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="bordeBt">
            <div class="userBox">
              <div class="imgBox">
                <img src="../assets/img/NO1.png" alt="" class="img1" v-if="index ===0">
                <img src="../assets/img/NO2.png" alt="" class="img1" v-if="index ===1">
                <img src="../assets/img/NO3.png" alt="" class="img1" v-if="index ===2">
                <img v-lazy="item.avatar" alt="" class="img2">
              </div>
              <div class="userMsg">
                <p class="name">{{item.nick}}</p>
                <!-- <p class="id">UID:{{item.uid}}</p> -->
                <p class="charm">ID {{item.uid}}</p>
              </div>
            </div>
            <div class="wardsMsg">
              <em></em>
              <span class="score">{{item.score}}</span>
              <span class="got" v-if="item.scaling>0"><i></i>{{item.scaling*100+'%'}}</span>
              <!-- <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain'}" :key=index>{{item2.total}}</span> -->
              <!-- <span class="cun">150</span>
                        <span class="car">180</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="bordeBt">
            <div class="userBox">
              <div class="imgBox">
                <img v-lazy="item.avatar" alt="" class="borb">
              </div>
              <div class="userMsg">
                <p class="name">{{item.nick}}</p>
                <!-- <p class="id">UID:{{item.uid}}</p> -->
                <p class="charm">ID {{item.uid}}</p>
              </div>
            </div>
            <div class="wardsMsg">
              <em></em>
              <span class="score">{{item.score}}</span>
              <span class="got" v-if="item.scaling>0"><i></i>{{item.scaling*100+'%'}}</span>
              <!-- <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain'}" :key=index>{{item2.total}}</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="nolist" v-if="top.length == 0">暫無名次</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(["worksArr", "activateState"]),
    top() {
      if (this.worksArr !== []) {
        return this.worksArr.slice(0, 3)
      }
    },
    bottom() {
      if (this.worksArr !== []) {
        return this.worksArr.slice(3)
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
.words {
  position: relative;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    height: 4.1rem;
    // background: url(../assets/img/shanhu.png);
    background-size: 100% 100%;
    p {
      height: 0.71rem;
      margin-top: 0.39rem;
      text-align: center;
      color: #f4e7ff;
      font-size: 85%;
      line-height: 0.4rem;
    }
    .wards {
      height: 2.02rem;
      .wardsImg {
        // background: url(../assets/img/wardsSample.png) no-repeat;
        background-size: contain;
        margin: 0.49rem auto 0;
        width: 6.4rem;
        height: 2.02rem;
        position: relative;
        > span {
          display: inline-block;
          width: 32%;
          font-size: 80%;
          img {
            display: block;
            width: 1.51rem;
            height: 1.51rem;
            margin: 0 auto;
          }
          em {
            width: 100%;
            font-size: 80%;
            margin-top: 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            .bi {
              display: inline-block;
              width: 0.25rem;
              height: 0.25rem;
              background: url(../assets/img/bi.png);
              background-size: 100% 100%;
              margin: 0 0.05rem;
            }
            i {
              font-size: 80%;
              color: #fff260;
            }
          }
        }
      }
    }
    .fansong {
      width: 7.23rem;
      height: 0.78rem;
      background: url(../assets/img/score.png);
      background-size: 100% 100%;
      margin: 0 auto;
      em {
        display: inline-block;
        font-size: 72%;
        color: #eded8b;
        margin-top: 0.3rem;
      }
    }
  }
  .wordsList {
    min-height: 7rem;
    margin: 0.05rem 0.15rem 0;
    padding: 0.3rem 0.2rem 1.6rem;
    background: url(../assets/img/listBg.png) no-repeat;
    background-size: 100% auto;
    .listTop {
      .userBox {
        .userMsg {
          margin-left: 0.1rem;
        }
      }
      .listItem {
        > span {
          display: block;
          margin: 0 0 0 0.1rem;
          width: 0.44rem;
          height: 0.48rem;
          text-indent: -999rem;
          margin: 0 0.2rem 0 0.255rem;
        }
      }
      .top1 {
        > span {
          background: url(../assets/img/jin.png);
          background-size: 100% 100%;
        }
      }
      .top2 {
        > span {
          background: url(../assets/img/yin.png);
          background-size: 100% 100%;
        }
      }
      .top3 {
        > span {
          background: url(../assets/img/tong.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.24rem;
      // background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      .bordeBt {
        height: 100%;
        display: flex;
        flex: 1;
        align-items: center;
        border-bottom: 1px transparent solid;
        border-image: linear-gradient(to right, #a25dd2, #ffc1c1, #7c52ef) 0 5
          10;
        // position: relative;
        // > i {
        //   width: 100%;
        //   height: 0.01rem;
        //   background: url(../assets/img/xian.png);
        //   background-size: 100% 100%;
        //   position: absolute;
        //   bottom: 0;
        // }
      }
      > span {
        width: 0.5rem;
        height: 0.6rem;
        margin: 0 0.2rem 0 0.2rem;
        text-align: center;
        background: url(../assets/img/rankBg.png);
        background-size: 100% 100%;
        line-height: 0.53rem;
        font-size: 80%;
      }
      .userBox {
        width: 3rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1rem;
          height: 1.1rem;
          // background: url(../assets/img/sunmmer.png);
          // background-size: 100% 100%;
          z-index: 50;
          position: relative;
          .borb {
            border: 0.03rem solid #fff;
          }
          img {
            margin: 0.1rem 0.1rem 0 0;
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
          }
          .img1 {
            width: 1rem;
            height: 1.06rem;
            z-index: 999;
            position: absolute;
            margin: 0;
            border-radius: 0%;
            left: -0.03rem;
            top: 0.01rem;
          }
          .img2 {
            display: inline-block;
            width: 0.92rem;
            height: 0.92rem;
            position: absolute;
            top: 0.15rem;
            left: 0.05rem;
            margin: 0;
          }
        }
        .userMsg {
          margin-left: 0.1rem;
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
            // padding-left: 0.35rem;
            // background: url(../assets/img/charm.png) no-repeat;
            // background-size: 0.28rem 100%;
            font-size: 80%;
            color: #fff88c;
            line-height: 0.33rem;
            margin-top: 0.05rem;
          }
        }
      }
      .wardsMsg {
        height: 1rem;
        display: flex;
        flex: 1;
        align-items: center;
        // padding-right:.5rem;
        color: #fff95b;
        line-height: 0.4rem;
        // padding-left: 0.3rem;
        em {
          width: 0.59rem;
          height: 0.76rem;
          margin-top: -0.2rem;
          background: url(../assets/img/huo.png);
          background-size: 100% 100%;
        }
        .score {
          width: 1.2rem;
        }
        .got {
          display: inline;
          width: 0.7rem;
          height: 0.3rem;
          margin-left: 0.3rem;
          font-size: 80%;
          color: #ff4cb5;
          i {
            display: inline-block;
            width: 0.21rem;
            height: 0.23rem;
            background: url(../assets/img/goT.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .nolist {
      text-align: center;
      margin-top: 0.5rem;
    }
  }
}
</style>
