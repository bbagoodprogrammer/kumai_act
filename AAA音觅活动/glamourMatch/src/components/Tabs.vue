<template>
  <div class="tabs">
    <span class="strategy" @click="showPup(1)"></span>
    <span class="rules" @click="showPup(2)"></span>
    <span class="champion" @click="showPup(3)"></span>
    <div class="pupBox">
      <div class="mask" v-show="showPup1">
        <transition name="slide">
          <div class="strategyPup" v-show="showPup1">
            <span class="close" @click="closePup(1)"></span>
            <p class="actTime">活動時間：2020.02.21~03.01</p>
            <p class="popleTips">參與對象：注冊少於60天的音覓玩家</p>
            <h5 class="title1">如何積攢金幣魅力值</h5>
            <p>魅力值是在房間收到的禮物所轉換的虛擬值；通過接受觀眾的金幣禮物，獲得金幣魅力值。累計金幣魅力值登上魅力榜。</p>
            <p>收到1金幣禮物可獲得10金幣魅力值。</p>
            <h5 class="title2">開播內容建議</h5>
            <p>1. 話題分享，情感、趣聞、吐槽、塔羅占卜、星座、寵物</p>
            <p>2. 遊戲，21點、真心話大冒險、蒙面歌王、爆笑K歌</p>
            <p>3. 點歌房，唱你想聽的歌</p>
            <p>4. 交友聯誼告白會</p>
            <p class="last">*聯繫音覓小可愛（LINE ID：chantal1555）獲取開播懶人包</p>
            <p class="last">*活動最終解釋權歸活動主辦方所有</p>
          </div>
        </transition>
      </div>
      <div class="mask" v-show="showPup2">
        <transition name="slide">
          <div class="rulesPup" v-show="showPup2">
            <span class="close" @click="closePup(2)"></span>
            <div class="rule">
              <h5>參與活動獎勵</h5>
              <p class="tips1">參與活動且金幣魅力值達到3000</p>
              <div class="imgBox">
                <img src="../assets/img/ruleImg1.png" alt="">
                <strong>魅力新聲稱號(15天)</strong>
              </div>
              <h5 class="title1">魅力新生冠軍獎勵</h5>
              <div class="wardsList">
                <span>
                  <img src="../assets/img/wards/ward1.png" alt="">
                  <strong>魅力新聲徽章</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward2.png" alt="">
                  <strong>官方推薦</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward3.png" alt="">
                  <strong>800金幣</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward4.png" alt="">
                  <strong>2000金豆</strong>
                </span>
              </div>
              <h5 class="title1">第二名</h5>
              <div class="wardsList wardsList2">
                <span>
                  <img src="../assets/img/wards/ward2.png" alt="">
                  <strong>官方推薦</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward5.png" alt="">
                  <strong>500金幣</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward6.png" alt="">
                  <strong>800金豆</strong>
                </span>
              </div>
              <h5 class="title1">第三名</h5>
              <div class="wardsList wardsList2">
                <span>
                  <img src="../assets/img/wards/ward7.png" alt="">
                  <strong>300金幣</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward8.png" alt="">
                  <strong>500金豆</strong>
                </span>
              </div>
              <h5 class="title1">第四名~十名</h5>
              <div class="wardsList wardsList2">
                <span>
                  <img src="../assets/img/wards/ward9.png" alt="">
                  <strong>200金幣</strong>
                </span>
                <span>
                  <img src="../assets/img/wards/ward10.png" alt="">
                  <strong>300金豆</strong>
                </span>
              </div>
              <h5 class="title1">魅力榜前10魅力新聲可另外獲得階梯現金獎勵</h5>
              <div class="cash">
                <div class="cashItem">
                  <div class="ward">
                    <h6>金幣魅力值達到15W</h6>
                    <img src="../assets/img/wards/ward11.png" alt="">
                    <em>NT$3750</em>
                  </div>
                </div>
                <div class="cashItem">
                  <div class="ward">
                    <h6>金幣魅力值達到10W</h6>
                    <img src="../assets/img/wards/ward12.png" alt="">
                    <em>NT$2000</em>
                  </div>
                  <div class="ward">
                    <h6>金幣魅力值達到6W</h6>
                    <img src="../assets/img/wards/ward13.png" alt="">
                    <em>NT$1000</em>
                  </div>
                </div>
              </div>
              <div class="ruleBon">
                <p>
                  *魅力榜前兩名，獲得音覓全平臺廣場banner
                  推薦機會一次
                </p>
              </div>
              <p class="lastTips">*活動最終解釋權歸活動主辦方所有</p>
            </div>
          </div>
        </transition>
      </div>
      <div class="mask" v-show="showPup3">
        <transition name="slide">
          <div class="championPup" v-show="showPup3">
            <span class="close" @click="closePup(3)"></span>
            <ul class="scrollable">
              <li v-for="(item,index) in championList" :key="index" :class="{mgB:championList.length>1}">
                <p class="title">第一期新聲魅力榜冠軍</p>
                <div class="userMsg">
                  <div class="avatar">
                    <img v-lazy="item.avatar" alt="">
                    <strong>{{item.nick}}</strong>
                  </div>
                  <div class="score">
                    <strong>金幣魅力值</strong>
                    <em>{{item.score}}</em>
                  </div>
                </div>
                <div class="wardList">
                  <div class="wardItem">
                    <span class="imgbox">
                      <img src="../assets/img/championWards/ward1.png" alt="">
                    </span>
                    <em>魅力新聲徽章</em>
                  </div>
                  <div class="wardItem">
                    <span class="imgbox">
                      <img src="../assets/img/championWards/ward2.png" alt="">
                    </span>
                    <em>官方推薦</em>
                  </div>
                  <div class="wardItem">
                    <span class="imgbox">
                      <img src="../assets/img/championWards/ward3.png" alt="">
                    </span>
                    <em>800金幣</em>
                  </div>
                  <div class="wardItem">
                    <span class="imgbox">
                      <img src="../assets/img/championWards/ward4.png" alt="">
                    </span>
                    <em>2000金豆</em>
                  </div>
                  <!-- v-if="item.score >= 60000" -->
                  <div class="wardItem" v-if="item.score >= 60000">
                    <span class="imgbox">
                      <img :src="require(`../assets/img/championWards/ward${getCoins(item.score)}.png`)" alt="">
                    </span>
                    <em v-if="getCoins(item.score) == 5">NT$1000</em>
                    <em v-else-if="getCoins(item.score) == 6">NT$2000</em>
                    <em v-else-if="getCoins(item.score) == 7">NT$3750</em>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="mask" v-show="showPup4">
        <transition name="slide">
          <div class="imgPupBox" v-show="showPup4">
            <span class="close" @click="closePup(4)"></span>
            <div class="imgPup">
              <img src="../assets/img/imgPup.png" alt="">
              <!-- <span class="goBtn" @click="goHtml(owner_msg.rid)">
                馬上開播
              </span> -->
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showPup1: false,
      showPup2: false,
      showPup3: false,
      showPup4: false,
      championList: [],
      isOne: true,
      loaded: false,
      more: true,
    }
  },
  computed: {
    ...mapState(['owner_msg']),
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    showPup(index) {
      if (index == 1) {
        this.showPup1 = true
      } else if (index == 2) {
        this.showPup2 = true
      } else if (index == 3) {
        if (this.isOne) {
          this.isOne = false
          api.getChampion(0).then(res => {
            let rank = res.data.response_data.rank
            if (rank.length == 0) {
              this.showPup4 = true
            } else {
              this.championList = res.data.response_data.rank
              this.showPup3 = true
            }
          })
        } else if (this.championList.length == 0) {
          this.showPup4 = true
        } else {
          this.showPup3 = true
        }
      }
    },
    closePup(index) {
      if (index == 1) {
        this.showPup1 = false
      } else if (index == 2) {
        this.showPup2 = false
      } else if (index == 3) {
        this.showPup3 = false
      } else if (index == 4) {
        this.showPup4 = false
      }
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          this.loading = true
          api.getChampion(0, 'more').then((res) => {
            this.more = true
            this.loading = false
            if (res.data.response_status.code === 0) {
              let rank = res.data.response_data.rank
              if (rank.length == 0) {
                this.loaded = true
              } else {
                this.championList = this.championList.concat(rank)
              }
            }
          })
        }
      }
    },
    goHtml(rid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (rid != 0) {
        if (isiOS) {
          sendJsData('app://room?rid=' + rid);
        } else {
          javascript: JSInterface.sendJsData('app://room?rid=' + rid);
        }
      } else {  //创建房间页
        location.href = `goto:{"controller":"com.utalk.hsing.activity.CreateRoomEditActivity"}`
      }
    },
    getCoins(score) {
      if (score >= 60000 && score < 100000) {
        return 5
      } else if (score >= 100000 && score < 150000) {
        return 6
      } else if (score >= 150000) {
        return 7
      }
    }
  }
}
</script>
<style lang= "scss" scoped>
.tabs {
  height: 1.14rem;
  margin: 0.34rem auto 0.43rem;
  display: flex;
  justify-content: center;
  > span {
    width: 1.9rem;
    height: 1.14rem;
    margin-left: 0.28rem;
    &.strategy {
      background: url(../assets/img/tab1.png);
      background-size: 100% 100%;
      margin-left: 0;
    }
    &.rules {
      background: url(../assets/img/tab2.png);
      background-size: 100% 100%;
    }
    &.champion {
      background: url(../assets/img/tab3.png);
      background-size: 100% 100%;
    }
  }
  .pupBox {
    .strategyPup {
      width: 6.86rem;
      /* height: 6.82rem; */
      padding: 1.37rem 0 0.8rem 0;
      background: url(../assets/img/strategyPup.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.32rem;
      top: 1.6rem;
      .actTime,
      .popleTips {
        color: #46453f;
        text-align: center;
        font-size: 0.26rem;
      }
      .popleTips {
        margin-top: 0.1rem;
      }
      h5 {
        font-size: 0.34rem;
        text-align: center;
        font-weight: 900;
        color: rgba(117, 9, 55, 1);
        -webkit-text-stroke: 0.4px #f5dd22;
        text-stroke: 0.4px #f5dd22;
      }
      p {
        color: #625704;
        font-size: 0.24rem;
        padding: 0 0.53rem;
      }
      .last {
        margin-top: 0.21rem;
      }
      .title1 {
        margin-top: 0.43rem;
      }
      .title2 {
        margin-top: 0.73rem;
      }
    }
    .rulesPup {
      width: 6.86rem;
      height: 8.19rem;
      padding-top: 1.43rem;
      background: url(../assets/img/rulesPup.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.6rem;
      left: 0.32rem;
      .rule {
        width: 5.8rem;
        height: 7.5rem;
        padding: 0 0.2rem 0 0.5rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        h5 {
          text-align: center;
          font-weight: 900;
          color: rgba(117, 9, 55, 1);
          -webkit-text-stroke: 0.4px #f5dd22;
          text-stroke: 0.4px #f5dd22;
          &.title1 {
            margin-top: 0.24rem;
          }
        }
        .tips1 {
          font-size: 0.24rem;
          color: #625704;
          text-align: center;
          margin: 0.19rem 0 0.17rem;
        }
        .imgBox {
          text-align: center;
          img {
            width: 1.6rem;
            height: 1.6rem;
            display: block;
            margin: 0 auto;
          }
          strong {
            font-size: 0.22rem;
            color: #6a0700;
            margin-top: 0.15rem;
            display: block;
          }
        }
        .wardsList {
          display: flex;
          justify-content: space-between;
          margin-top: 0.25rem;
          span {
            display: block;
            width: 1.5rem;
            img {
              width: 1.2rem;
              height: 1.2rem;
              margin: 0 auto;
              display: block;
            }
            strong {
              font-size: 0.22rem;
              color: #c86700;
              margin-top: 0.14rem;
              text-align: center;
              white-space: nowrap;
              display: block;
            }
          }
          &.wardsList2 {
            justify-content: center;
            span {
              margin-right: 0.15rem;
            }
          }
        }
        .cash {
          width: 5.68rem;
          height: 4.39rem;
          margin-top: 0.22rem;
          border: 0.015rem solid rgba(0, 0, 145, 1);
          background: linear-gradient(
            180deg,
            rgba(255, 228, 181, 1) 0%,
            rgba(255, 181, 93, 1) 100%
          );
          border-radius: 0.4rem;
          .cashItem {
            display: flex;
            justify-content: center;
            margin-top: 0.16rem;
            h6 {
              text-align: center;
              color: #750937;
              font-size: 0.28rem;
              font-weight: bold;
            }
            img {
              width: 1.2rem;
              height: 1.2rem;
              display: block;
              margin: 0 auto;
              margin-top: 0.1rem;
            }
            em {
              text-align: center;
              font-size: 0.22rem;
              color: #750937;
              display: block;
            }
          }
        }
        .ruleBon {
          width: 4.69rem;
          height: 1.49rem;
          background: url(../assets/img/ruleBon.png);
          background-size: 100% 100%;
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          padding: 0 0.49rem;
          p {
            color: #9b3022;
            font-size: 0.24rem;
          }
        }
        .lastTips {
          text-align: center;
          color: #d34a42;
          font-size: 0.24rem;
          margin-top: 0.25rem;
        }
      }
    }
    .championPup {
      width: 6.86rem;
      height: 9.62rem;
      background: url(../assets/img/champion.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.58rem;
      left: 0.32rem;
      ul {
        width: 5.92rem;
        max-height: 7.5rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 1.56rem;
        left: 0.6rem;
        li {
          width: 5.68rem;
          min-height: 3.83rem;
          padding: 0.19rem 0;
          border: 0.015 solid rgba(0, 0, 145, 1);
          background: linear-gradient(
            180deg,
            rgba(255, 228, 181, 1) 0%,
            rgba(255, 181, 93, 1) 100%
          );
          border-radius: 0.4rem;
          &.mgB {
            margin-bottom: 0.48rem;
          }
          .title {
            font-size: 0.28rem;
            color: #750937;
            font-weight: bold;
            text-align: center;
          }
          .userMsg {
            height: 1.5rem;
            margin-top: 0.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .avatar {
              img {
                width: 1rem;
                height: 1rem;
                border: 0.03rem solid #fffbf4;
                border-radius: 50%;
                display: block;
                margin: 0 auto;
              }
              strong {
                display: block;
                text-align: center;
                font-size: 0.24rem;
                color: #9b3022;
                margin-top: 0.05rem;
                max-width: 1.8rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .score {
              width: 2.3rem;
              margin-left: 0.8rem;
              text-align: center;
              strong {
                color: #9f1954;
                font-size: 0.28rem;
                display: block;
              }
              em {
                font-size: 0.56rem;
                color: #9c1750;
                font-weight: bold;
              }
            }
          }
          .wardList {
            margin-top: 0.12rem;
            display: flex;
            justify-content: space-between;
            padding: 0 0.25rem;
            /* height: 1.35rem; */
            .wardItem {
              flex: 1;
              .imgbox {
                display: block;
                width: 0.9rem;
                height: 0.9rem;
                background: url(../assets/img/wardBg.png);
                background-size: 100% 100%;
                margin: 0 auto;
                img {
                  width: 0.9rem;
                  height: 0.9rem;
                }
              }
              em {
                display: block;
                color: #750937;
                font-size: 0.22rem;
                text-align: center;
              }
            }
          }
        }
      }
    }
    .imgPupBox {
      width: 6.86rem;
      height: 9.6rem;
      background: url(../assets/img/champion.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.58rem;
      left: 0.32rem;
      .imgPup {
        width: 3.08rem;
        height: 3.58rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .close {
          right: -0.8rem;
        }
        img {
          width: 3.08rem;
          height: 3.58rem;
        }
        .goBtn {
          display: inline-block;
          width: 1.31rem;
          height: 0.67rem;
          background: url(../assets/img/goBtn.png);
          background-size: 100% 100%;
          font-size: 0.22rem;
          line-height: 0.67rem;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    background: #00badb;
    border-radius: 1rem;
    border: 0.015rem solid rgba(0, 0, 145, 1);
  }
  ::-webkit-scrollbar-thumb {
    border: 0.015rem solid rgba(0, 0, 145, 1);
    background: #f19114;
  }
  .close {
    display: block;
    width: 0.38rem;
    height: 0.37rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
