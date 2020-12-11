<template>
  <div class="left">
    <div class="actMsg">
      <h5><i class="left"></i> <strong>{{nowAct.name}}</strong> <i class="right"></i></h5>
      <div class="time">Thời gian:{{nowAct.stime}} - {{nowAct.etime}}</div>
    </div>
    <div class="universe" :class="{bg:showUnBg}">
      <canvas id="unBg" v-show="!showUnBg"></canvas>
      <div class="starItem" v-for="(item,index) in starsArr" :key="index" :class="[{ani:aning},'start' +item.ainIndex]" @click="starClick(index)">
        <div class="imgBox">
          <img src="../assets/img/actLiner.png" alt="" class="defaultImg">
          <img :src="item.img" alt="" class="actImg" v-if="item.img">
          <img src="../assets/img/actDefaultImg.png" alt="" class="actImg" v-else>
          <span class="linght" v-if="item.step == 1 && showLingth"></span>
          <canvas class="linghtAni" v-show="item.step == 1 && !showLingth"></canvas>
        </div>
        <strong class="actName">{{item.name}}</strong>
      </div>
      <div class="userMsg">
        <h5 v-if="nowActTips">{{nowActTips}}</h5>
        <span class="actBtn " v-if="nowAct.step == 0">
          <em class="atted" v-if="nowAct.is_attension">Đã hẹn trước</em>
          <em class="att" v-else @click="actAttension(nowAct.act_id)">Hẹn trước</em>
        </span>
        <span class="actBtn go" @click="goActHtml(nowAct.url)" v-else>Xem thử</span>
      </div>
    </div>
    <!--榜單切換過渡效果 -->
    <div class="rankList" :class="{obc:obcAni}">
      <!-- 人物评选榜单 -->
      <div class="itemTop" :class="'list'+nowAct.act_id" v-if="nowAct.act_id ==0">
        <div class="hasPeople" v-if="nowAct.show">
          <div class="listItem" v-for="(item,index) in nowAct.list " :key="index">
            <div class="title">{{peopleTitle[index]}}</div>
            <div class="imgBox" :class="{br:index== 2 || index==3}" @click="goUser(item[0])">
              <img class="pd" src="../assets/img/title/default_3.png" alt="" v-if="index==0|| index== 1">
              <img :src="item[0].avatar" alt="" class="av">
              <span class="mv" v-if="index==3"><i>mv</i></span>
            </div>
            <strong class="nick has">{{item[0].nick}}</strong>
            <div class="more" @click="showMore(item)">Xem thêm</div>
          </div>
        </div>
        <div class="not" v-else>
          <div class="listItem" v-for="(item,index) in peopleDefaultList_0" :key="index">
            <div class="title">{{peopleTitle[index]}}</div>
            <div class="imgBox">
              <img :src="item[0].avatar" alt="" class="av">
              <span class="mv" v-if="index==3"><i>mv</i></span>
            </div>
            <strong class="nick">{{item[0].nick}}</strong>
          </div>
        </div>
      </div>

      <!-- K房男女神榜单 -->
      <div class="kroomList" v-else-if="nowAct.act_id ==3">
        <div class="noData">
          <div class="man" :class="{girl:index==1}" v-for="(item,index) in nowAct.show?nowAct.list:kroomDefault" :key="index">
            <ul class="userList">
              <li v-for="(item2,index) in item.slice(0, 3)" :key="index" :class="'item' + index">
                <img :src="item2.avatar" alt="" class="defaultAv" v-if="!nowAct.show">
                <div class="imgBox" :class="'top' + item2.rank" v-else @click="goUser(item2)">
                  <span class="avBg"></span>
                  <img v-lazy="item2.avatar" alt="" class="av">
                </div>
                <strong class="nick" :class="{act:nowAct.show}">{{item2.nick}}</strong>
              </li>
            </ul>
            <div class="more" @click="showMore(item)" v-if="nowAct.show">Xem thêm</div>
          </div>
        </div>
      </div>
      <!-- 其他榜单 -->
      <div class="otherList" :class="'list'+nowAct.act_id" v-else-if="nowAct.act_id != 8 &&nowAct.act_id != 1">
        <ul class="userList">
          <li v-for="(item2,index) in showActList" :key="index" :class="'item' + index">
            <img :src="item2.avatar" alt="" class="defaultAv" v-if="!nowAct.show">
            <div class="imgBox" :class="[{fstyle:nowAct.act_id == 7},'top' + item2.rank]" v-else @click="goUser(item2)">
              <span class="avBg"></span>
              <img v-lazy="item2.avatar" alt="" class="av">
            </div>
            <strong class="nick" :class="{act:nowAct.show}">{{item2.nick}}</strong>
          </li>
        </ul>
        <div class="more" @click="showMore(nowAct.list[0])" v-if="nowAct.show">Xem thêm</div>
      </div>
    </div>

    <!-- Xem thêm -->
    <div class="mask" v-show="showListPup">
      <transition name="slide">
        <div class="listPup" v-show="showListPup">
          <i class="close" @click="closeListPup()"></i>
          <ul>
            <li v-for="(item,index) in pupListData " :key="index">
              <span class="rank">{{item.rank}}</span>
              <div class="imgBox" :class="{song:!item.uid}" @click="goUser(item)">
                <span class="default"></span>
                <img :src="item.avatar" alt="" class="av">
              </div>
              <div class="nick">{{item.nick}}</div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import getString from "../utils/getString"
import APP from "../utils/openApp"
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data() {
    return {
      aning: false,
      obcAni: false,
      starsArr: [],
      act_index: 0,
      peopleTitle: ['Nam Ca Sĩ Xuất Sắc', "Nữ Ca Sĩ Xuất Sắc", "Đơn Ca Hay Nhất", "MV Hay Nhất"],
      peopleDefaultList_0: [
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_3.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_3.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_2.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/title/default_2.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ]
      ],
      kroomDefault: [
        [
          {
            "uid": '',
            "avatar": require("../assets/img/top1.png"),
            "nick": "Còn trống",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top2.png"),
            "nick": "Còn trống",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top3.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ],
        [
          {
            "uid": '',
            "avatar": require("../assets/img/top1.png"),
            "nick": "Còn trống",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top2.png"),
            "nick": "Còn trống",
            "rank": 1
          },
          {
            "uid": '',
            "avatar": require("../assets/img/top3.png"),
            "nick": "Còn trống",
            "rank": 1
          }
        ]
      ],
      pupListData: [],
      showListPup: false,
      first: true,
      timer: null,
      timer2: null,
      showUnBg: true,
      showLingth: true,
      playerArr: []
    }
  },
  computed: {
    ...mapState(['actList', 'data_list', 'isShare']),
    nowAct() {
      return this.actList[this.act_index] ? this.actList[this.act_index] : {}
    },
    nowTopList() {
      return this.data_list[this.act_index]
    },
    nowActTips() {
      if (this.nowAct.step == 0) {
        if (this.nowAct.attension >= 100) {
          return `${this.nowAct.attension} người hẹn trước`
        } else {
          return false
        }
      } else {
        if (this.nowAct.data >= 100) {
          if (this.nowAct.act_id == 7) {
            return `Đã có ${this.nowAct.data} gia tộc tham gia`
          } else if (this.nowAct.act_id == 8) {
            return `Đã có ${this.nowAct.data} người trực tuyến`
          } else {
            return `${this.nowAct.data} người tham dự`
          }
        } else {
          return false
        }
      }
    },
    showActList() {
      if (this.nowAct.show) {
        if (this.nowAct.act_id == 4 || this.nowAct.act_id == 5) {
          return this.nowAct.list[0].slice(0, 1)
        } else {
          return this.nowAct.list[0].slice(0, 3)
        }
      } else {
        if (this.nowAct.act_id == 4 || this.nowAct.act_id == 5) {
          return this.kroomDefault[0].slice(0, 1)
        } else {
          return this.kroomDefault[0]
        }
      }
    }
  },
  watch: {
    actList(val) {
      let arr = JSON.parse(JSON.stringify(val))
      if (this.first) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].ainIndex = arr[i].act_id
        }
        this.starsArr = arr
        this.first = false
      } else {
        for (let i = 0; i < this.starsArr.length; i++) {
          arr[i].ainIndex = this.starsArr[i].ainIndex
        }
        this.starsArr = arr
      }
      this.$nextTick(() => {
        this.loadSvgaData(`http://fstatic.cat1314.com/uc/svga/e34a984a61ccc8b4166be9f3f16cbc6e_1604905653.svga`)
      })
      this.aniTime(4500)
      this.aning = true
    }
  },
  mounted() {
    this.unBgGo()
  },
  methods: {
    actAttension(aid) {
      clearInterval(this.timer)
      api.attension(aid).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`Bạn đã hẹn trước sự kiện, chúng tôi sẽ thông báo ngay khi sự kiện bắt đầu~`)
          this.vxc('setActStatus', aid)
          this.startAni(1000)
        } else {
          this.toast(res.data.response_status.error)
          this.startAni(1000)
        }
      })
    },
    starClick(index) {
      if (this.isShare) {
        APP()
        return
      }
      clearInterval(this.timer)
      // if (!this.aning) return
      this.aning = false
      let num = 0
      for (let i = index; i < 9; i++) {
        this.starsArr[i].ainIndex = num
        num++
      }
      for (let t = 0; t < index; t++) {
        this.starsArr[t].ainIndex = num
        num++
      }
      this.act_index = index
      this.startAni(1000)
    },
    startAni(tm) {
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        this.aning = true
        this.aniTime(4000)
      }, tm)
    },
    aniTime(tm) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.obcAni = !this.obcAni
        setTimeout(() => {
          this.obcAni = !this.obcAni
        }, 1000)
        this.starsArr.forEach(element => {
          if (element.ainIndex > 0) {
            element.ainIndex--
          } else {
            element.ainIndex = 8
          }
        });
        if (this.act_index < 8) {
          this.act_index++
        } else {
          this.act_index = 0
        }
      }, tm);
    },
    showMore(item) {
      this.pupListData = item
      this.showListPup = true
    },
    closeListPup() {
      this.showListPup = false
    },
    goUser(item) {
      if (item.uid) {
        location.href = `uid:${item.uid}`
      } else if (item.fid) {
        location.href = `fid:${item.fid}`
      } else if (item.sid) {
        location.href = 'songid:{"songlist":[' + item.sid + '],"index":0}';
      }
    },
    goActHtml(url) {
      let regstr = getString('token')
      let uid = getString('uid')
      location.href = `${url}?uid=${uid}&token=${regstr}`
    },
    clearTimer() {
      clearInterval(this.timer)
    },
    async unBgGo() {
      let canvas = document.getElementById('unBg')
      const fileData = await downloader.get(`http://fstatic.cat1314.com/uc/svga/cd041c586dce50247b1472bb168389de_1604893770.svga`);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.showUnBg = false
      player.start()
    },
    async loadSvgaData(addres) {
      let canvas = document.getElementsByClassName('linghtAni')
      console.log(canvas)
      const fileData = await downloader.get(addres);
      const data = await parser.do(fileData);
      for (let i = 0; i < canvas.length; i++) {
        let player = new Player(canvas[i])
        // player.mount(data)
        await player.mount(data)
        this.playerArr.push(player)
      }
      this.showLingth = false
      this.playerArr.forEach(element => {
        element.start()
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.actMsg {
  margin-top: 0.52rem;
  h5 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgba(255, 213, 129, 1);
    i {
      width: 2.02rem;
      height: 0.2rem;
      &.left {
        background: url(../assets/img/titleLeft.png);
        background-size: 100% 100%;
        margin-right: 0.3rem;
      }
      &.right {
        background: url(../assets/img/titleRight.png);
        background-size: 100% 100%;
        margin-left: 0.3rem;
      }
    }
  }
  .time {
    font-size: 0.28rem;
    color: rgba(165, 135, 123, 1);
    text-align: center;
    margin: 0.2rem 0;
  }
}
.universe {
  position: relative;
  width: 7.5rem;
  height: 8.21rem;
  &.bg {
    background: url(../assets/img/universe.png);
    background-size: 100% 100%;
  }
  #unBg {
    width: 7.5rem;
    height: 8.21rem;
    position: absolute;
    z-index: -1;
  }
  .userMsg {
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    left: 2.21rem;
    top: 2.56rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h5 {
      margin-bottom: 0.3rem;
      font-size: 0.26rem;
      color: rgba(255, 227, 113, 1);
    }
    .actBtn {
      display: block;
      width: 1.9rem;
      height: 0.64rem;
      background: url(../assets/img/actBtn2.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.64rem;
      color: rgba(255, 223, 75, 1);
      font-size: 0.28rem;
      font-weight: 600;
      em {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 0.28rem;
        font-weight: 600;
        &.atted {
          background: url(../assets/img/actBtn2.png);
          background-size: 100% 100%;
          color: rgba(255, 223, 75, 1);
        }
        &.att {
          background: url(../assets/img/actBtn.png);
          background-size: 100% 100%;
          color: rgba(108, 44, 0, 1);
        }
      }
    }
  }
  .starItem {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    // white-space: nowrap;
    .imgBox {
      width: 100%;
      height: 100%;
      position: absolute;
      .defaultImg {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
      }
      .actImg {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
      }
      .linght {
        display: block;
        width: 200%;
        height: 200%;
        position: absolute;
        left: -0.55rem;
        top: -0.55rem;
        background: url(../assets/img/linght.png);
        background-size: 100% 100%;
        z-index: -1;
        transition: all 1s ease;
      }
      .linghtAni {
        display: block;
        width: 200%;
        height: 200%;
        position: absolute;
        left: -0.55rem;
        top: -0.55rem;
        z-index: -1;
        transition: all 1s ease;
      }
    }
    .actName {
      width: 1.8rem;
      height: 0.6rem;
      font-weight: 600;
      font-size: 0.26rem;
      color: rgba(255, 223, 113, 0);
      text-shadow: 0 0.3rem 0.3rem rgba(14, 9, 16, 0.6);
      background: linear-gradient(0deg, #ef8734 0.68359375%, #fbc476 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      bottom: -0.3rem;
      z-index: 10;
    }
    &.ani {
      transition: all 1s ease;
    }
    &.start0 {
      width: 1.2rem;
      height: 1.2rem;
      top: 1rem;
      left: 3.17rem;
      .linght,
      .linghtAni {
        width: 2.42rem;
        height: 2.42rem;
        left: -0.6rem;
        top: -0.6rem;
      }
    }
    &.start8 {
      top: 1.66rem;
      left: 4.84rem;
    }
    &.start7 {
      top: 3.16rem;
      left: 5.69rem;
    }
    &.start6 {
      top: 4.86rem;
      left: 5.38rem;
    }
    &.start5 {
      top: 5.95rem;
      left: 4.06rem;
    }
    &.start4 {
      top: 5.95rem;
      left: 2.33rem;
    }
    &.start3 {
      top: 4.83rem;
      left: 1.02rem;
    }
    &.start2 {
      top: 3.16rem;
      left: 0.7rem;
    }
    &.start1 {
      top: 1.64rem;
      left: 1.59rem;
    }
  }
}

.rankList {
  transition: all 1s linear;
  opacity: 1;
  &.obc {
    opacity: 0;
  }
}

.itemTop {
  display: flex;
  align-items: center;
  .hasPeople,
  .not {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .listItem {
      width: 3rem;
      height: 3.8rem;
      background: url(../assets/img/title/listItem.png);
      background-size: 100% 100%;
      margin-top: 0.64rem;
      position: relative;
      .title {
        height: 0.45rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
        font-weight: 500;
        text-align: center;
        color: rgba(255, 184, 108, 1);
      }
      .imgBox {
        width: 1.6rem;
        height: 1.6rem;
        position: relative;
        margin: 0 auto;
        margin: 0.45rem auto 0;
        .mv {
          display: block;
          width: 1.6rem;
          height: 1.6rem;
          background: url(../assets/img/title/mv.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
          i {
            display: block;
            width: 0.6rem;
            line-height: 0.3rem;
            text-align: center;
            font-size: 0.24rem;
            color: rgba(48, 17, 21, 1);
            font-weight: 500;
          }
        }
        .av {
          display: block;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
      .nick {
        display: block;
        text-align: center;
        color: rgba(255, 237, 193, 0.3);
        margin-top: 0.29rem;
        &.has {
          padding: 0 0.2rem;
          color: rgba(255, 237, 193, 1);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .more {
        width: 1.8rem;
        height: 0.56rem;
        background: url(../assets/img/actBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.28rem;
        color: rgba(108, 44, 0, 1);
        font-weight: 600;
        position: absolute;
        left: 0.6rem;
        bottom: -0.25rem;
      }
    }
  }
  .hasPeople {
    .imgBox {
      &.br {
        .av {
          width: 1.6rem !important;
          height: 1.6rem !important;
          border-radius: 0.16rem;
          left: 0;
          top: 0;
        }
        .mv {
          z-index: 5;
        }
      }
      .pd {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
      }
      .av {
        width: 1.5rem !important;
        height: 1.5rem !important;
        border-radius: 50%;
        position: absolute;
        left: 0.05rem;
        top: 0.05rem;
        z-index: 5;
      }
    }
  }
  &.list0 {
    width: 6.26rem;
    height: 10.33rem;
    padding: 0 0.32rem;
    background: url(../assets/img/title/title0.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
}
.kroomList {
  .man {
    width: 6.9rem;
    height: 2.84rem;
    background: url(../assets/img/title/title3_1.png);
    background-size: 100% 100%;
    margin: 0 auto 0.35rem;
    padding-top: 1.69rem;
    position: relative;
    .userList {
      padding: 0 0.64rem;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        margin-right: 0.7rem;
        .defaultAv {
          width: 1.4rem;
          height: 1.4rem;
          display: block;
        }
        .imgBox {
          width: 1.4rem;
          height: 1.4rem;
          margin: 0 auto;
          position: relative;
          .avBg {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 2;
          }
          .av {
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 50%;
          }
          &.top1 {
            .avBg {
              background: url(../assets/img/title/p1.png);
              background-size: 100% 100%;
            }
          }
          &.top2 {
            .avBg {
              background: url(../assets/img/title/p2.png);
              background-size: 100% 100%;
            }
          }
          &.top3 {
            .avBg {
              background: url(../assets/img/title/p3.png);
              background-size: 100% 100%;
            }
          }
        }
        strong {
          display: block;
          text-align: center;
        }
        .nick {
          display: block;
          width: 1.5rem;
          font-size: 0.28rem;
          color: rgba(255, 237, 193, 0.3);
          margin-top: 0.39rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.act {
            color: rgba(255, 237, 193, 1);
          }
        }
        &.item0 {
          order: 2;
        }
        &.item1 {
          order: 1;
        }
        &.item2 {
          order: 3;
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
    &.girl {
      background: url(../assets/img/title/title3_2.png);
      background-size: 100% 100%;
    }
    .more {
      width: 1.8rem;
      height: 0.56rem;
      background: url(../assets/img/actBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.56rem;
      font-size: 0.28rem;
      color: rgba(108, 44, 0, 1);
      font-weight: 600;
      position: absolute;
      left: 2.5rem;
      bottom: -0.25rem;
    }
  }
}
.otherList {
  width: 6.9rem;
  height: 2.73rem;
  padding-top: 1.8rem;
  margin: 0 auto;
  position: relative;
  .userList {
    padding: 0 0.64rem;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin-right: 0.7rem;
      .defaultAv {
        width: 1.4rem;
        height: 1.4rem;
        display: block;
      }
      .imgBox {
        width: 1.4rem;
        height: 1.4rem;
        margin: 0 auto;
        position: relative;
        .avBg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
        }
        .av {
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 50%;
        }
        &.top1 {
          order: 1;
          .avBg {
            background: url(../assets/img/title/p1.png);
            background-size: 100% 100%;
          }
        }
        &.top2 {
          .avBg {
            background: url(../assets/img/title/p2.png);
            background-size: 100% 100%;
          }
        }
        &.top3 {
          .avBg {
            background: url(../assets/img/title/p3.png);
            background-size: 100% 100%;
          }
        }
        &.fstyle {
          .av {
            border-radius: 0.16rem;
          }
          &.top1 {
            order: 1;
            .avBg {
              background: url(../assets/img/title/f1.png);
              background-size: 100% 100%;
            }
          }
          &.top2 {
            .avBg {
              background: url(../assets/img/title/f2.png);
              background-size: 100% 100%;
            }
          }
          &.top3 {
            .avBg {
              background: url(../assets/img/title/f3.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      strong {
        display: block;
        text-align: center;
      }
      .nick {
        display: block;
        width: 1.5rem;
        font-size: 0.28rem;
        color: rgba(255, 237, 193, 0.3);
        margin-top: 0.39rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.act {
          color: rgba(255, 237, 193, 1);
        }
      }
      &.item0 {
        order: 2;
      }
      &.item1 {
        order: 1;
      }
      &.item2 {
        order: 3;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }
  .more {
    width: 1.8rem;
    height: 0.56rem;
    background: url(../assets/img/actBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.56rem;
    font-size: 0.28rem;
    color: rgba(108, 44, 0, 1);
    font-weight: 600;
    position: absolute;
    left: 2.5rem;
    bottom: -0.25rem;
  }
  &.list2 {
    background: url(../assets/img/title/title2.png);
    background-size: 100% 100%;
  }
  &.list6 {
    background: url(../assets/img/title/title6.png);
    background-size: 100% 100%;
  }
  &.list4 {
    background: url(../assets/img/title/title4.png);
    background-size: 100% 100%;
  }
  &.list7 {
    background: url(../assets/img/title/title7.png);
    background-size: 100% 100%;
  }
  &.list5 {
    background: url(../assets/img/title/title5.png);
    background-size: 100% 100%;
  }
}

.listPup {
  width: 6.74rem;
  height: 8rem;
  padding-top: 1.31rem;
  background: url(../assets/img/title/listPup.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1rem;
    left: 2.96rem;
  }
  ul {
    width: 6rem;
    height: 7.35rem;
    margin: 0.15rem auto;
    overflow-y: scroll;
    li {
      height: 1.1rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.39rem;
      .rank {
        width: 1.18rem;
        text-align: center;
        font-size: 0.4rem;
        color: rgba(255, 225, 163, 1);
      }
      .imgBox {
        width: 1.08rem;
        height: 1.08rem;
        position: relative;
        .default {
          position: absolute;
          width: 1.08rem;
          height: 1.08rem;
          background: url(../assets/img/title/av1.png);
          background-size: 100% 100%;
          z-index: 1;
        }
        .av {
          position: absolute;
          width: 1.08rem;
          height: 1.08rem;
          border-radius: 50%;
        }
        &.song {
          .default {
            background: url(../assets/img/title/av2.png);
            background-size: 100% 100%;
          }
          .av {
            border-radius: 0.16rem;
          }
        }
      }
      .nick {
        max-width: 3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>
