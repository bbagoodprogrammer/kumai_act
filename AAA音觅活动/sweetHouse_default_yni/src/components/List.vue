<template>
  <div class="list">
    <div class="title"></div>
    <ul class="caiList">
      <li v-for="(item,index) in desserts" :key="index">
        <div class="name">{{item.name}}
          <span class="score">{{lang.score}}:{{item.score}}</span>
        </div>
        <div class="msg">
          <img :src="require(`../assets/img/sweets/sweet_${index}.png`)" alt="">
          <i class="deng"></i>
          <div class="cai">
            <span v-for="(item,index) in filtrObj(item.raw)" :key="index">
              <i :class="'raw' + index"></i>
              <strong>{{raws[index].count}}/{{item}}</strong>
            </span>
          </div>
          <div class="creatBtn" v-if="isCreat(item.raw)" @click="showTask()">
            {{lang.getScience}}
          </div>
          <div class="creatBtn status2" @click="creatDesserts(index)" v-else>
            {{lang.creat}}
          </div>
          <div class="overTips">{{lang.creatNums.replace('%c',item.count)}}</div>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="showTasks">
      <transition name="slide">
        <div class="tabs" v-if="showTasks">
          <i class="close" @click="closeTask()"></i>
          <div class="tabItem">
            <div class="item" v-for="(item,index) in tabArr" :key="index" :class="[{act:showType == item.type},'type'+item.type]">
              <span @click="tabClick(item.type)"></span>
              <strong>{{item.msg}}</strong>
            </div>
          </div>
          <div class="typeTips">
            <span class="icon" :class="'icon'+showType"></span>
            <div class="msg">
              <div class="typeTipsTitle">{{tabArr[showType-1].msg}}</div>
              <div class="tipsMsg">
                {{tabArr[showType-1].tips}}
              </div>
            </div>
          </div>
          <div class="taskList">
            <ul>
              <li v-for="(item,index) in tasks" :key="index">
                <div class="taskMsg">
                  <div class="name">{{taskName[item.key]}} <i v-if="item.key=='room'" @click="showRoomTips()"></i> </div>
                  <div class="gift">{{lang.countGift}} <i :class="'icon'+showType"></i> x{{item.give_count}},{{lang.dayTips.replace('%c',item.count)}} </div>
                  <div class="giftBar" v-if="item.key == 'mic'  ||item.key == 'friend'">
                    <i class="store" v-for="(item2,index2) in item.count" :key="index2" :class="'store'+index2"></i>
                    <span class="actLiner" :style="{width:item.current/item.max *100 + '%'}"></span>
                  </div>
                </div>
                <div class="status">
                  <div class="btn not" v-if="item.got == item.count"></div>
                  <div class="btn get" v-else-if="(item.got<item.nowStore && item.count>1) || (item.count==1 && item.current >= item.max && item.got == 0)" @click="getRaws(item)"></div>
                  <div class="btn" v-else @click="doTask(item.key,item)">{{lang.doTask}}({{item.nowStore}}/{{item.count}})</div>
                  <div class="oneLiner" v-if="item.key == 'room' || item.key == 'gift' || item.key == 'coin'|| item.key == 'mic' || item.key == 'friend'">
                    <div class="num">{{item.current}}/{{item.max}}</div>
                    <div class="liner">
                      <span class="numActLiner" :style="{width:item.current/item.max *100 + '%'}"></span>
                    </div>
                  </div>
                  <span class="invite" @click="showSharePup()" v-if="item.key=='invite'">{{lang.inivitNums.replace('%i',item.invited)}}</span>
                </div>
              </li>
            </ul>
          </div>
          <p class="lastTips">{{lang.taskTips}}</p>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="sharePup" v-if="showShare">
          <i class="close" @click="closeSharePup()"></i>
          <p class="giftTips">{{lang.inivitTitle}} <i></i> x5</p>
          <p v-if="invitedList.length == 0" class="noData">{{lang.noData}}</p>
          <ul class="peopleList">
            <li v-for="(item,index) in invitedList" :key="index">
              <div class="userRank" :class="{noRank:item.rank == 0}">{{item.rank == 0?lang.noRank:item.rank}}</div>
              <div class="imgBox">
                <span class="avBg" v-if="item.rank<=3"></span>
                <img v-lazy="item.avatar" alt="">
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{lang.score}}<em>{{item.score}}</em></div>
            </li>
          </ul>
          <div class="inivitBtn" @click="showPelple()"></div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="peoplePup" v-if="showPeople">
          <i class="close" @click="closePeople()"></i>
          <p v-if="peopleListHas.length == 0" class="noData">{{lang.noFriend}}</p>
          <ul class="pList">
            <li v-for="(item,index) in peopleListHas" :key="index">
              <!-- <div class="userRank">{{item.rank}}</div> -->
              <div v-if="item.status!=2" class="lsitItem">
                <div class="imgBox">
                  <span class="avBg" v-if="item.rank<=3"></span>
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div>{{item.nick}}</div>
                  <div class="tips">{{lang.noSingup}}</div>
                </div>
                <div class="shareBtn" :class="{share2:item.status == 1}" @click="shareAct(item,index)"></div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showCreatPup">
      <transition name="slide">
        <div class="dessertsPup" :class="'creat'+creatType" v-show="showCreatPup">
          <i class="close" @click="closeCreatPup()" v-if="creatType != 2"></i>
          <div class="creatQuyer" v-if="creatType == 1">
            <div class="title">{{lang.creatQuery}}</div>
            <div class="con">
              <div class="desserts">
                <img :src="require(`../assets/img/sweets/sweet_${creatIndex}.png`)" alt="">
                <strong>{{desserts[creatIndex].name}}</strong>
              </div>
              <div class="creatNum">
                <div class="setNum">
                  <span class="redux" @click="reduc()"></span>
                  <input type="number" v-model="cNum" disabled="disabled" name="" id="">
                  <span class="add" @click="add()"></span>
                </div>
                <p class="tips">{{lang.creatNums_get.replace('%o',sweetNum.over)}}</p>
                <!-- <p class="overNum" v-if="maxTips">超過可製作數量</p> -->
              </div>
            </div>
            <div class="creatBtn">
              <span class="cancel" @click="closeCreatPup()">{{lang.cancel}}</span>
              <span class="ok" @click="creat()">{{lang.ok}}</span>
            </div>
          </div>
          <div class="creatIng" v-else-if="creatType == 3">
            <div class="title">{{lang.creatSuc}}</div>
            <img :src="require(`../assets/img/sweets/sweet_${creatIndex}.png`)" alt="" class="dessertsImg">
            <p class="creatName">{{desserts[creatIndex].name}}x{{cNum}}</p>
            <p class="creatScore">{{lang.addScore}}{{desserts[creatIndex].score * cNum}}</p>
            <div class="goPack" @click="doTask('mic')">{{lang.goBack}}</div>
          </div>
          <div class="creatSuc" v-show="creatType == 2">
            <canvas id="creatAni"></canvas>
            <p class="doing">{{lang.creatIng}}{{rSecond}}s</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import share from "../utils/share"
import store from "../store/stores"
import { globalBus } from '../utils/eventBus'
import { Downloader, Parser, Player } from 'svga.lite'
import { setInterval, clearInterval } from 'timers';
import lang from "../config/lang"

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

window.onShareSuccess = async (from, uid, type, typeName) => {
  // alert(`shareSuc${type}`)
  if (type == 2 || type == 3) {
    if (from != 2) {
      api.shareSuc(from)
      this.toast(lang.shareSuc)
    } else {
      api.shareCb().then(res => {
        if (res.data.response_status.code == 0) {
          store.commit('setTask', 'share')
          this.toast(lang.shareSuc)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
export default {
  props: ['nick'],
  data () {
    return {
      showType: 1,
      showTasks: false,
      showShare: false,
      showPeople: false,
      showCreatPup: false,
      creatType: 0,
      cNum: 1,
      //   tabArr: [
      //     {
      //       type: 1,
      //       msg: '水果',
      //       tips: '水果：可用於製作鱷梨果汁、水果大福、蜜桃莫吉托、冰激凌星空杯'
      //     },
      //     {
      //       type: 2,
      //       msg: '奶製品',
      //       tips: '奶製品：可用於製作水果大福、雙層布丁、蜜桃莫吉托、冰激凌星空杯'
      //     },
      //     {
      //       type: 3,
      //       msg: '繽紛小料',
      //       tips: '繽紛小料：可用於製作雙層布丁、蜜桃莫吉托、冰激凌星空杯'
      //     }
      //   ],
      rooms: {},
      peopleList: [],
      invitedList: [],
      //   taskName: {
      //     mic: '在房間上麥5min（私密房不算）',
      //     coin: '在房間送出100金幣',
      //     share: '分享活動到line或fb',
      //     create: '創建動態',
      //     // friend: '交友熱力每提升20',
      //     invite: '邀請好友開甜品屋',
      //     charge: '儲值任意金額',
      //     room: '自己房間的人氣值達到8000',
      //     gift: '收到任意甜品禮物15份',
      //     pairing: '瀏覽配對頁，找到3個我感興趣的玩家(對他/她感興趣,一定要右滑哦)'
      //   },
      creatIndex: 0,
      maxTips: false,
      player: null,
      rSecond: 3
    }
  },
  computed: {
    ...mapState(['desserts', 'raws', 'tasksList']),
    sweetNum () {
      let num = 0
      let max = null
      let raw = this.filtrObj(this.desserts[this.creatIndex].raw)
      for (let i in raw) {
        num = Math.floor(this.raws[i].count / raw[i])
        if (num < max || !max) {
          max = num
        }
      }
      return {
        max,
        over: max - this.cNum
      }
    },
    newTasksList () {
      let dataArr = { 1: [], 2: [], 3: [] };
      for (let i in this.tasksList) {
        this.tasksList[i].key = i
        dataArr[this.tasksList[i].give_id].push(this.tasksList[i])
      }
      return dataArr
    },
    tasks () {
      return this.newTasksList[this.showType]
    },
    peopleListHas () {
      let isHas = this.peopleList.filter(item => {
        return item.status != 2
      })
      return isHas
    },
    tabArr () {
      return this.lang.tabArr
    },
    taskName () {
      return this.lang.taskName
    }
  },
  mounted () {
    this.aniGo()
  },
  methods: {
    shareAct (item, index) {
      if (!item.invited) {
        api.shareFriend(item.uid).then(res => {
          if (res.data.response_status.code == 0) {
            //  this.peopleList[index].status = 1
            api.getFriendList(0).then(res => {
              this.peopleList = res.data.response_data.list
              // this.showPeople = true
            })

          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    creat () {  //改變類型，播放svga后   this.creatType = 3
      api.creatSweet(this.creatIndex, this.cNum).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setEasy', res.data.response_data.easy)
          this.rooms.hot = res.data.response_data.rid
          this.vxc('reduxRaws', {
            curretIndedx: this.creatIndex,
            num: this.cNum
          })   //減去材料
          this.creatType = 2
          this.player.start()
          let timer = setInterval(() => {
            this.rSecond--
          }, 1000)
          setTimeout(() => {
            clearInterval(timer)
            this.creatType = 3
            this.rSecond = 3
            this.player.clear()
            this.vxc('addScore', this.desserts[this.creatIndex].score * this.cNum)
          }, 3000)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getRaws (item) {
      api.getCai(item.key).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('addRaws', {
            id: item.give_id,
            count: item.give_count * (item.nowStore - item.got)
          })
          this.vxc('setTaskGot', item.key)
          this.toast(this.lang.getSuc)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    filtrObj (obj) {
      const result = {}
      for (let item in obj) {
        if (obj[item] > 0) {
          result[item] = obj[item]
        }
      }
      return result
    },
    isCreat (raws) {
      for (let i in this.raws) {
        if (this.raws[i].count < raws[i]) {
          return true
        }
      }
      return false
    },
    reduc () {
      if (this.cNum > 1) {
        this.cNum--
        this.maxTips = false
      }
    },
    add () {
      if (this.cNum == this.sweetNum.max) {
        this.maxTips = true
      } else if (this.cNum < this.sweetNum.max) {
        this.cNum++
      }
    },
    doTask (key, item) {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (key == 'mic' || key == 'coin' || key == 'gift') {  //跳轉活躍度前十房間
        try {
          console.log(this.rooms)
          if (ios) {
            sendJsData('app://room?rid=' + this.rooms.hot);
          } else {
            javascript: JSInterface.sendJsData('app://room?rid=' + this.rooms.hot);
          }
        } catch (e) { }
      } else if (key == 'share') {  //分享活動
        try {
          share({
            from: '2',
            url: `http://activity.udateapp.com/static_html/2020/sweetHouse/index.html?type=2&nick=${this.nick}`,
            title: this.lang.shareActTitle,
            desc: this.lang.shareActTitle,
            image: 'http://activity.udateapp.com/static_html/2020/sweetHouse/share.jpg'
          })
        } catch (e) { }
      } else if (key == 'create' || key == 'friend') {  //跳轉到邂逅頁
        try {
          if (ios) {
            sendJsData('app://bottlespage');
          } else {
            javascript: JSInterface.sendJsData('app://bottlespage');
          }
        } catch (e) { }
      } else if (key == 'invite') {  //邀請好友彈窗
        this.showPelple()
      } else if (key == 'charge') {  //儲值頁
        try {
          if (ios) {
            // goWalletpage()
            sendJsData('app://walletpage');
          } else {
            javascript: JSInterface.sendJsData('app://walletpage');
          }
        } catch (e) { }
      } else if (key == 'room') {  //跳自己房間
        try {
          if (ios) {
            sendJsData('app://room?rid=' + this.rooms.my);
          } else {
            javascript: JSInterface.sendJsData('app://room?rid=' + this.rooms.my);
          }
        } catch (e) { }
      } else if (key == 'pairing') {
        try {
          if (ios) {
            sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
          } else {
            javascript: JSInterface.sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
          }
        } catch (e) { }
        // this.toast(this.lang.pairingMsg)
      }
    },
    tabClick (val) {
      this.showType = val
    },
    async aniGo () {
      let fileData1 = await downloader.get('http://img.17sing.tw/uc/activity/10635b9f2d38e30d672ec3f127d4ec92_1595298372.svga')
      let svgaData1 = await parser.do(fileData1)
      let canvas = document.getElementById('creatAni')
      this.player = new Player(canvas)
      await this.player.mount(svgaData1)
    },
    showPelple () {
      api.getFriendList(0).then(res => {
        this.peopleList = res.data.response_data.list
        this.showPeople = true
      })
    },
    closePeople () {
      this.showPeople = false
    },
    showSharePup () {
      api.getFriendList(0, 'invited').then(res => {
        this.invitedList = res.data.response_data.list
        this.showShare = true
      })
    },
    closeSharePup () {
      this.showShare = false
    },
    showTask () {
      globalBus.$emit('commonEvent', () => {
        api.tasksList().then(res => {
          let task = res.data.response_data.tasks
          for (let i in task) {
            let nowStore = Math.floor(task[i].current / task[i].step)
            task[i].nowStore = nowStore >= task[i].count ? task[i].count : nowStore
          }
          this.vxc('setTasksList', task)
          this.rooms = res.data.response_data.rooms
          this.showTasks = true
        })
      })
    },
    showRoomTips () {
      this.vxc('setToast', {
        title: this.lang.roomTitle,
        msg: this.lang.roomMsg
      })
    },
    closeTask () {
      this.showTasks = false
      this.creatType = null
    },
    closeCreatPup () {
      this.showCreatPup = false
      this.creatType = null
      this.cNum = 1
      this.maxTips = false
    },
    creatDesserts (index) {
      this.creatType = 1
      this.creatIndex = index
      this.showCreatPup = true
    },
  }
}
</script>
<style lang="scss" scoped>
.noData {
  color: rgba(205, 87, 55, 1);
  text-align: center;
  margin: 0.2rem auto 0;
}
.list {
  width: 6.68rem;
  height: 14.1rem;
  background: url(../assets/img/listBg.png);
  background-size: 100% 100%;
  margin: 1.4rem auto 0;
  padding: 0.26rem 0.2rem 0;
  position: relative;
  > .title {
    width: 4.67rem;
    height: 1.22rem;
    background: url(../assets/img/title2.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.85rem;
    z-index: 10;
    left: 1.22rem;
  }
  .caiList {
    z-index: 10;
    li {
      width: 6.15rem;
      height: 2.69rem;
      padding: 0 0.19rem 0 0.35rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.11rem;
      position: relative;
      .name {
        height: 0.92rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.4rem;
        color: rgba(212, 62, 25, 1);
        font-weight: 500;
        .score {
          //   width: 1.6rem;
          padding: 0 0.15rem;
          height: 0.34rem;
          background: rgba(254, 118, 94, 1);
          border-radius: 0.17rem;
          font-size: 0.26rem;
          text-align: center;
          color: #fff;
        }
      }
      .msg {
        height: 1.6rem;
        display: flex;
        align-items: center;
        img {
          width: 1.4rem;
          height: 1.4rem;
        }
        .deng {
          width: 0.22rem;
          height: 0.21rem;
          background: url(../assets/img/deng.png);
          background-size: 100% 100%;
          margin: 0 0.16rem;
        }
        .cai {
          width: 2.3rem;
          // height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          span {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 0.21rem;
            color: rgba(215, 55, 18, 1);
            i {
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.24rem;
              &.raw1 {
                background: url(../assets/img/rawList/icon1.png);
                background-size: 100% 100%;
              }
              &.raw2 {
                background: url(../assets/img/rawList/icon2.png);
                background-size: 100% 100%;
              }
              &.raw3 {
                background: url(../assets/img/rawList/icon3.png);
                background-size: 100% 100%;
              }
            }
          }
          span:before {
            content: '';
            display: block;
            width: 0.22rem;
            height: 0.22rem;
            background: url(../assets/img/add.png);
            background-size: 100% 100%;
            position: absolute;
            bottom: -0.23rem;
            left: 0.1rem;
          }
          span:last-child:before {
            display: none;
          }
        }
        .creatBtn {
          width: 1.86rem;
          height: 0.62rem;
          background: url(../assets/img/creat1.png);
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.28rem;
          color: rgba(37, 186, 74, 1);
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          &.status2 {
            color: rgba(114, 0, 91, 1);
            background: url(../assets/img/creat2.png);
            background-size: 100% 100%;
          }
        }
        .overTips {
          position: absolute;
          right: 0.43rem;
          bottom: 0.23rem;
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(215, 55, 18, 1);
        }
      }
    }
  }
  .tabs {
    width: 7.1rem;
    height: 9.68rem;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.51rem;
    .tabItem {
      padding: 0 0.82rem;
      display: flex;
      justify-content: space-between;
      .item {
        width: 1.54rem;
        position: relative;
        color: rgba(205, 87, 55, 1);
        &.act {
          span {
            width: 2.23rem;
            height: 2.23rem;
            margin: -0.4rem 0 0 -0.4rem;
          }
          strong {
            margin-top: -0.1rem;
          }
        }
        &.type1 {
          span {
            background: url(../assets/img/tabs/tab1.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab1Act.png);
              background-size: 100% 100%;
            }
          }
        }
        &.type2 {
          span {
            background: url(../assets/img/tabs/tab2.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab2Act.png);
              background-size: 100% 100%;
            }
          }
        }
        &.type3 {
          span {
            background: url(../assets/img/tabs/tab3.png);
            background-size: 100% 100%;
          }
          &.act {
            span {
              background: url(../assets/img/tabs/tab3Act.png);
              background-size: 100% 100%;
            }
          }
        }
        span {
          display: block;
          width: 1.54rem;
          height: 1.54rem;
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.26rem;
          margin-top: 0.2rem;
        }
      }
    }
    .typeTips {
      width: 6.24rem;
      height: 1.53rem;
      background: url(../assets/img/tabs/tabBg.png);
      background-size: 100% 100%;
      margin: 0.08rem auto 0;
      display: flex;
      align-items: center;
      .icon {
        width: 1.47rem;
        height: 1.45rem;
        margin-top: -0.1rem;
        &.icon1 {
          background: url(../assets/img/tabs/tab1Tip.png);
          background-size: 100% 100%;
        }
        &.icon2 {
          background: url(../assets/img/tabs/tab2Tip.png);
          background-size: 100% 100%;
        }
        &.icon3 {
          background: url(../assets/img/tabs/tab3Tip.png);
          background-size: 100% 100%;
        }
      }
      .msg {
        flex: 1;
        margin-top: -0.1rem;
        padding-right: 0.2rem;
        .typeTipsTitle {
          font-size: 0.24rem;
        }
        .tipsMsg {
          font-size: 0.22rem;
          line-height: 0.3rem;
        }
      }
    }
    .taskList {
      margin: 0 auto 0;
      padding: 0 0.6rem 0 0.4rem;
      ul {
        li {
          width: 5.94rem;
          //   min-height: 1.17rem;
          background: url(../assets/img/taskItemBg.png);
          background-size: 100% 100%;
          padding: 0.15rem 0.15rem 0.3rem;
          display: flex;
          align-items: center;
          margin-top: -0.1rem;
          .taskMsg {
            flex: 1;
            // height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0.15rem 0 0.15rem 0.18rem;
            .name {
              font-size: 0.2rem;
              font-weight: 500;
              i {
                display: inline-block;
                width: 0.23rem;
                height: 0.23rem;
                vertical-align: middle;
                background: url(../assets/img/query.png);
                background-size: 100% 100%;
              }
            }
            .gift {
              font-size: 0.2rem;
              font-weight: 500;
              i {
                display: inline-block;
                width: 0.3rem;
                height: 0.3rem;
                vertical-align: bottom;
                &.icon1 {
                  background: url(../assets/img/gift/giftIcon1.png);
                  background-size: 100% 100%;
                }
                &.icon2 {
                  background: url(../assets/img/gift/giftIcon2.png);
                  background-size: 100% 100%;
                }
                &.icon3 {
                  background: url(../assets/img/gift/giftIcon3.png);
                  background-size: 100% 100%;
                }
              }
            }
            .giftBar {
              width: 2.87rem;
              height: 0.12rem;
              background: rgba(204, 101, 41, 1);
              box-shadow: 0 0.01rem 0.09rem 0 rgba(8, 78, 126, 0.38);
              border-radius: 0.06rem;
              margin-top: 0.08rem;
              position: relative;
              .store {
                display: block;
                width: 0.17rem;
                height: 0.17rem;
                background: url(../assets/img/gift/store.png);
                background-size: auto 100%;
                position: absolute;
                z-index: 10;
                top: -0.04rem;
                &.store0 {
                  left: 0.86rem;
                }
                &.store1 {
                  left: 1.8rem;
                }
                &.store2 {
                  right: 0;
                }
              }
              .actLiner {
                height: 100%;
                max-width: 100%;
                position: absolute;
                background: url(../assets/img/gift/actLiner.png);
                background-size: auto 100%;
                border-radius: 0.06rem;
              }
            }
          }
          .status {
            width: 1.7rem;
            // height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .btn {
              width: 1.55rem;
              height: 0.52rem;
              background: url(../assets/img/creat2.png);
              background-size: auto 100%;
              text-align: center;
              line-height: 0.52rem;
              font-size: 0.24rem;
              color: rgba(114, 0, 91, 1);
              font-weight: 600;
              &.not {
                background: url(../assets/img/getBlack.png);
                background-size: auto 100%;
              }
              &.get {
                background: url(../assets/img/getRaws.png);
                background-size: auto 100%;
              }
            }
            .oneLiner {
              text-align: center;
              .liner {
                width: 1.2rem;
                height: 0.12rem;
                background: rgba(204, 101, 41, 1);
                box-shadow: 0 0.01rem 0.09rem 0 rgba(8, 78, 126, 0.38);
                border-radius: 0.06rem;
                position: relative;
                .numActLiner {
                  display: block;
                  max-width: 100%;
                  height: 100%;
                  position: absolute;
                  background: url(../assets/img/gift/actLiner.png);
                  background-size: auto 100%;
                  border-radius: 0.06rem;
                }
              }
            }
            .invite {
              font-size: 0.2rem;
              color: rgba(164, 67, 10, 1);
              font-weight: 600;
              text-align: center;
            }
          }
        }
      }
    }
    .lastTips {
      color: rgba(164, 67, 10, 1);
      text-align: center;
      font-size: 0.24rem;
      margin-top: 0.1rem;
      padding: 0 0.2rem;
    }
  }
  .sharePup {
    width: 7.1rem;
    height: 9.55rem;
    background: url(../assets/img/shareBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.67rem;
    .giftTips {
      text-align: center;
      margin-bottom: 0.1rem;
      color: rgba(205, 87, 55, 1);
      i {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: middle;
        background: url(../assets/img/gift/giftIcon2.png);
        background-size: 100% 100%;
      }
    }
    .peopleList {
      max-height: 7.5rem;
      overflow-y: scroll;
      li {
        width: 6.37rem;
        display: flex;
        align-items: center;
        height: 1.21rem;
        margin: 0 auto;
        background: url(../assets/img/peopleListItem.png);
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        .userRank {
          width: 0.6rem;
          margin-left: 0.14rem;
          text-align: center;
          font-weight: 800;
          // white-space: nowrap;
          &.noRank {
            font-size: 0.22rem;
            font-weight: 500;
          }
        }
        .imgBox {
          width: 0.95rem;
          height: 0.94rem;
          margin-left: 0.15rem;
          position: relative;
          .avBg {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          img {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            margin: 0.07rem 0 0 0.06rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 3rem;
          color: rgba(240, 249, 254, 1);
          font-size: 0.38rem;
          font-weight: 500;
          margin-left: 0.17rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          width: 1.3rem;
          font-size: 0.24rem;
          font-weight: 500;
          text-align: center;
          em {
            font-size: 0.28rem;
            font-weight: 500;
            display: block;
          }
        }
      }
    }
    .inivitBtn {
      width: 3.66rem;
      height: 0.86rem;
      background: url(../assets/img/inivitBtn.png);
      background-size: 100% 100%;
      margin: 0.15rem auto 0;
      position: absolute;
      left: 1.75rem;
      bottom: 0.35rem;
    }
  }
  .peoplePup {
    width: 7.1rem;
    height: 9.55rem;
    background: url(../assets/img/peoplePupBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.67rem;
    .pList {
      max-height: 9rem;
      overflow-y: scroll;
      .lsitItem {
        width: 6.37rem;
        display: flex;
        align-items: center;
        height: 1.21rem;
        margin: 0 auto;
        background: url(../assets/img/listItembg.png);
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        .userRank {
          width: 0.6rem;
          margin-left: 0.14rem;
          text-align: center;
          font-weight: 800;
        }
        .imgBox {
          width: 0.95rem;
          height: 0.94rem;
          margin-left: 0.15rem;
          position: relative;
          .avBg {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          img {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            margin: 0.07rem 0 0 0.06rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 2.5rem;
          .tips {
            font-size: 0.24rem;
          }
        }
        .shareBtn {
          width: 1.82rem;
          height: 0.62rem;
          background: url(../assets/img/share1.png);
          background-size: 100% 100%;
          margin-left: 0.7rem;
          &.share2 {
            background: url(../assets/img/share2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .dessertsPup {
    width: 5.32rem;
    height: 4.02rem;
    background: url(../assets/img/desserts.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 0.94rem;
      text-align: center;
      line-height: 1.1rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: rgba(174, 6, 5, 1);
    }
    .creatQuyer {
      .con {
        display: flex;
        padding: 0 0.77rem 0 0.59rem;
        height: 1.85rem;
        .desserts {
          img {
            display: block;
            width: 1.51rem;
            height: 1.51rem;
            margin: 0 auto;
          }
          strong {
            display: block;
            margin-top: 0.1rem;
            white-space: nowrap;
            font-size: 0.24rem;
            text-align: center;
            color: rgba(233, 140, 86, 1);
          }
        }
        .creatNum {
          margin-left: 0.65rem;
          .setNum {
            display: flex;
            width: 1.75rem;
            height: 0.52rem;
            .redux {
              width: 0.53rem;
              height: 0.52rem;
              background: url(../assets/img/reduxNum.png);
              background-size: 100% 100%;
            }
            input {
              width: 0.67rem;
              border: none;
              outline: none;
              background: #fff;
              color: rgba(196, 68, 46, 1);
              font-size: 0.4rem;
              text-align: center;
            }
            .add {
              width: 0.53rem;
              height: 0.52rem;
              background: url(../assets/img/addNum.png);
              background-size: 100% 100%;
            }
          }
          .tips {
            font-size: 0.24rem;
            color: rgba(233, 140, 86, 1);
            margin-top: 0.3rem;
          }
          .overNum {
            font-size: 0.24rem;
            color: rgba(174, 6, 5, 1);
          }
        }
      }
      .creatBtn {
        padding: 0 0.12rem;
        margin-top: 0.45rem;
        height: 0.67rem;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          line-height: 0.67rem;
        }
        .cancel {
          color: rgba(247, 140, 76, 1);
          background: RGBA(248, 234, 221, 1);
          border-radius: 0 0 0 0.5rem;
        }
        .ok {
          background: RGBA(248, 176, 129, 1);
          border-radius: 0 0 0.5rem 0;
        }
      }
    }
    .creatSuc {
      #creatAni {
        display: block;
        width: 2.37rem;
        height: 2.37rem;
        margin: 0.52rem auto 0;
      }
      .doing {
        text-align: center;
        font-size: 0.24rem;
        color: rgba(89, 187, 237, 1);
        margin-top: 0.3rem;
      }
    }
    .creatIng {
      padding: 0 0.12rem;
      .dessertsImg {
        width: 1.51rem;
        height: 1.51rem;
        display: block;
        margin: 0 auto;
      }
      .creatName {
        text-align: center;
        color: rgba(233, 140, 86, 1);
        font-size: 0.24rem;
        font-weight: 500;
        height: 0.36rem;
      }
      .creatScore {
        text-align: center;
        color: rgba(241, 92, 103, 1);
        font-size: 0.28rem;
        font-weight: bold;
      }
      .goPack {
        height: 0.69rem;
        line-height: 0.69rem;
        text-align: center;
        background: RGBA(243, 168, 118, 1);
        border-radius: 0 0 0.5rem 0.5rem;
      }
    }
    .close {
      width: 0.36rem;
      height: 0.37rem;
      top: 0.35rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
}
.close {
  display: block;
  width: 0.51rem;
  height: 0.51rem;
  background: url(../assets/img/close.png);
  background-size: 100% 100%;
  position: absolute;
  right: 0.34rem;
  top: 1rem;
  z-index: 10;
}
</style>
