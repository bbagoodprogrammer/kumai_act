<template>
  <div class="playing2">

    <div class="boxList">
      <div class="userScore">
        <div class="lv">我的等级:{{level}}</div>
        <div class="score">助攻值:{{socre}}</div>
      </div>
      <div class="boxItem" ref="giftBox">
        <div class="gitem" v-for="(item,index) in boxList" :key="index">
          <div class="imgBox">
            <img :src="boxConfig[item.level].imgAct" alt="" v-if="item.receive || item.able" class="giftBox" @click="boxClick(item)">
            <img :src="boxConfig[item.level].imgBlack" alt="" v-else class="giftBox" @click="boxClick(item)">

            <canvas class="linght" v-if="item.able"></canvas>
          </div>
          <div class="lvTips">
            <strong class="lv">Lv.{{item.level}}</strong>
            <strong class="limit">{{item.limit}}</strong>
          </div>
        </div>
      </div>
      <i class="left" @click="rollAmi('left')"></i>
      <i class="right" @click="rollAmi('right')"></i>
    </div>
    <div class="Playing2Rank">
      <div class="mvp"></div>
      <p class="tips">助攻值=報名後在作品或K歌房送出的金幣禮物魅力值</p>
      <div class="rank1" :style="{height:listHeight+'rem'}">
        <div class="bg">
          <div class="top">
            <p v-if="!list.length" class="noData">暫無數據</p>
          </div>
          <div class="con"></div>
          <div class="bottom"></div>
        </div>
        <ul class="list">
          <li v-for="(item,index) in list" :key="index" :class="'top' + item.rank">
            <span class="rank">{{item.rank}}</span>
            <div class="imgBox" @click="goUser(item.uid)">
              <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
              <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
              <img v-else-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
              <img v-lazy="item.avatar" alt="" class="av">
            </div>
            <div class="nick">{{item.nick}}</div>
            <div class="score">助攻值：{{item.score}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 寶箱禮物展示 -->
    <div class="mask" v-show="showBoxGift">
      <transition name="slide">
        <div class="boxGifts" v-if="showBoxGift">
          <i class="close" @click="showBoxGift = !showBoxGift"></i>
          <h3>助攻值達到 <em>{{showBoxItem.limit}}</em> 可領取</h3>
          <strong class="needLv">(即升級到Lv.{{showBoxItem.level}}等級)</strong>
          <div class="giftBox">
            <div class="giftItem" v-for="(item,index) in boxConfig[showBoxItem.level].gift" :key="index">
              <div class="imgBox">
                <img :src="item.img" alt="">
              </div>
              <strong class="gName">{{item.name}}</strong>
            </div>
          </div>
          <div class="getStatus" :class="{geted:showBoxItem.receive}" @click="getGift(showBoxItem)"></div>
        </div>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>
<script>

import api from "../api/apiConfig"
import boxConfig from "../config/boxConfig"
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data() {
    return {
      boxList: {},
      list: [],
      rank: null,
      listHeight: 0,
      loaded: false,
      more: true,
      boxConfig: boxConfig,
      timer: null,
      showBoxGift: false,
      showBoxItem: {},
      level: 0,
      socre: 0,
      loaded: false,
      more: true,
      rotatePx: 0,    //刷新旋转动画
      playerArr: []
    }
  },
  watch: {
    list(val) {
      if (val.length) {
        this.listHeight = val.length * 1.4 + .65
      } else {
        this.listHeight = 1.65 + .65
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  activated() {
    window.addEventListener('scroll', this.onScroll)
  },
  deactivated() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init() {
      api.page2().then(res => {
        const { list, rank_list, point, rank, socre, level, step } = res.data.response_data
        this.boxList = list
        this.list = rank_list
        this.level = level
        this.socre = socre
        this.rank = rank
        let newPoint = point
        newPoint.two = false
        this.vxc('setActStatus', step)
        this.vxc('setPoint', newPoint)
        this.vxc('changGroupsUserMsg', {
          key: 2,
          msg: rank
        })
        setTimeout(() => {
          for (let item in this.boxList) {
            console.log(item)
            if (this.boxList[item].able) {
              this.loadSvgaData('http://fstatic.cat1314.com/uc/svga/75f31ec61b8be01a21e43844a178e0cb_1604054340.svga')
              return
            }
          }
        }, 20)
      })
    },
    boxClick(item) {
      console.log(item)
      this.showBoxItem = item
      this.showBoxGift = true
    },
    getGift(item) {
      if (!item.receive) {
        api.getGift(item.level).then(res => {
          if (res.data.response_status.code == 0) {
            this.boxList[item.level].receive = true
            this.boxList[item.level].able = false
            this.showBoxItem.receive = true
            this.showBoxItem.able = false
            this.vxc('setToast', {
              title: '領取成功',
              msg: '對應獎勵已派發到您的賬戶上,<br/>請注意查收'
            })
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && !this.loaded && this.more && this.rank) {
        this.more = false
        api.list2(this.list.length, 'more').then(res => {
          this.more = true
          let list = res.data.response_data.list
          this.list = this.list.concat(list)
          if (list.length < 20) {
            this.loaded = true
          }
        })
      }
    },
    rollAmi(t) {
      clearInterval(this.timer)
      let scorllEnd = document.getElementsByClassName('gitem')[0].getBoundingClientRect().width * 2
      let scorllLeft = this.$refs.giftBox.scrollLeft
      let c = t == 'right' ? scorllEnd : -scorllEnd
      this.timer = setInterval(() => {
        scorllLeft = this.$refs.giftBox.scrollLeft
        this.$refs.giftBox.scrollTo(scorllLeft + (c / 6), 0)
        c -= c / 6
        if ((t == 'left' && c > -1) || (t == 'right' && c < 1)) {
          clearInterval(this.timer)
        }
      }, 25)
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    async loadSvgaData(addres) {
      let canvas = document.getElementsByClassName('linght')
      const fileData = await downloader.get(addres);
      const data = await parser.do(fileData);
      for (let i = 0; i < canvas.length; i++) {
        let player = new Player(canvas[i])
        player.mount(data)
        await player.mount(data)
        this.playerArr.push(player)
      }
      this.playerArr.forEach(element => {
        element.start()
      });
    },
    refrsh() { //刷新
      if (!this.more) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.playerArr.forEach(element => {
        element.clear()
      });
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped >
.playing2 {
  .boxList {
    width: 6.27rem;
    height: 3.71rem;
    background: url(../assets/img/boxListBg.png);
    background-size: 100% 100%;
    margin: 0.3rem auto;
    padding: 0.3rem 0.5rem 0;
    position: relative;
    .userScore {
      height: 1rem;
      font-size: 0.28rem;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    .boxItem {
      width: 6rem;
      height: 2.4rem;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
      margin: 0 auto;
      position: relative;

      .gitem {
        width: 1.5rem;
        display: inline-block;
        .imgBox {
          display: block;
          height: 1.8rem;
          position: relative;
          .giftBox {
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            z-index: 2;
          }
          .linght {
            width: 1.5rem;
            height: 2rem;
            position: absolute;
            top: -0.2rem;
          }
        }
      }
      .lvTips {
        margin-top: -0.15rem;
        strong {
          font-size: 0.24rem;
          display: block;
          text-align: center;
          &.limit {
            color: rgba(255, 248, 166, 1);
          }
        }
      }
    }
    .left {
      display: block;
      width: 0.35rem;
      height: 0.44rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.86rem;
      left: 0.3rem;
    }
    .right {
      display: block;
      width: 0.35rem;
      height: 0.44rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.86rem;
      right: 0.3rem;
    }
    .boxItem::-webkit-scrollbar {
      display: none;
    }
  }
  .Playing2Rank {
    .mvp {
      width: 5.53rem;
      height: 0.67rem;
      margin: 0.5rem auto 0;
      background: url(../assets/img/mvp.png);
      background-size: 100% 100%;
    }
    .tips {
      text-align: center;
      margin: 0.1rem 0 0.15rem;
    }
    .rank1 {
      width: 7.35rem;
      min-height: 2.4rem;
      position: relative;
      margin: 0 auto;
      .noData {
        text-align: center;
        margin-top: 1rem;
      }
      .bg {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .top {
          width: 100%;
          height: 1.56rem;
          background: url(../assets/img/listBgHeader.png);
          background-size: 100% 100%;
        }
        .con {
          width: 100%;
          flex: 1;
          background: url(../assets/img/listBgCon.png);
          background-size: 100% auto;
        }
        .bottom {
          width: 100%;
          height: 0.65rem;
          background: url(../assets/img/listBgBotton.png);
          background-size: 100% 100%;
        }
      }
      .list {
        width: 6.67rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.39rem 0.3rem 0;
        li {
          height: 1.4rem;
          display: flex;
          align-items: center;
          .rank {
            width: 0.51rem;
            height: 0.67rem;
            line-height: 0.67rem;
            text-align: center;
            font-size: 0.26rem;
            margin: 0 0.18rem 0 0.2rem;
          }
          .imgBox {
            width: 1.1rem;
            height: 1.1rem;
            position: relative;
            .nob {
              width: 1.1rem;
              height: 1.1rem;
              position: absolute;
              top: 0rem;
              left: 0rem;
              z-index: 10;
            }
            .frame {
              width: 1.5rem;
              height: 1.5rem;
              position: absolute;
              top: -0.21rem;
              left: -0.2rem;
              z-index: 10;
            }
            .av {
              width: 0.88rem;
              height: 0.88rem;
              position: absolute;
              top: 0.1rem;
              left: 0.11rem;
              border-radius: 50%;
            }
          }
          .nick {
            width: 2.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.28rem;
            margin-left: 0.18rem;
          }
          .score {
            font-size: 0.28rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          &.top1 {
            .rank {
              text-indent: 999rem;
              background: url(../assets/img/top1.png);
              background-size: 100% 100%;
            }
          }
          &.top2 {
            .rank {
              text-indent: 999rem;
              background: url(../assets/img/top2.png);
              background-size: 100% 100%;
            }
          }
          &.top3 {
            .rank {
              text-indent: 999rem;
              background: url(../assets/img/top3.png);
              background-size: 100% 100%;
            }
          }
        }
        li::before {
          content: "";
          width: 5.4rem;
          height: 1px;
          background: #ffffff;
          opacity: 0.3;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        li:last-child::before {
          height: 0;
        }
      }
    }
  }
  .boxGifts {
    width: 6.7rem;
    height: 6.15rem;
    padding-top: 0.75rem;
    background: url(../assets/img/giftBg3.png);
    background-size: 100% 100%;
    position: relative;
    h3 {
      text-align: center;
      font-size: 0.32rem;
      font-weight: bold;
      em {
        color: rgba(254, 246, 113, 1);
        font-size: 0.32rem;
        font-weight: bold;
      }
    }
    .needLv {
      display: block;
      text-align: center;
      font-size: 0.26rem;
      margin-top: 0.16rem;
    }
    .giftBox {
      padding: 0 0.3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .giftItem {
        display: inline-block;
        vertical-align: middle;
        width: 33%;
        height: 1.5rem;
        .imgBox {
          width: 1.24rem;
          height: 1.24rem;
          margin: 0 auto;
          background: url(../assets/img/luckBg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            margin: 0 auto;
            width: 1rem;
            height: 1rem;
          }
        }
        .gName {
          display: block;
          text-align: center;
          font-size: 0.28rem;
          height: 0.3rem;
          line-height: 0.3rem;
          margin-top: 0.05rem;
          padding: 0 0.1rem;
        }
      }
    }
    .getStatus {
      width: 3.61rem;
      height: 1.14rem;
      background: url(../assets/img/get.png);
      background-size: 100% 100%;
      margin: 0 auto;
      &.geted {
        background: url(../assets/img/geted.png);
        background-size: 100% 100%;
      }
    }
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      top: 0rem;
      right: 0rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
}
</style>