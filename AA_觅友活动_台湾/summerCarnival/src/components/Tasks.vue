<template>
  <div class="tasks">
    <div class="frames">
      <div class="fMsg">
        <div class="imgBox">
          <img :src="tasks.exchange.image" alt="">
          <strong>{{tasks.exchange.name}}</strong>
        </div>
        <div class="msg">
          <div class="tip1">{{lang.taks_tips1.replace('%s',tasks.exchange.base_num)}}</div>
          <div class="tip2">{{lang.taks_tips2.replace('%s',tasks.send)}}</div>
          <div class="btnBox">
            <span @click="goRankTab()">{{lang.taks_tips3}}</span>
            <span @click="exChange()">{{lang.taks_getGift}} <em>{{lang.taks_getGiftDay.replace('%s',tasks.exchange.ex_days)}}</em></span>
          </div>
        </div>
      </div>
      <span class="tang">
        <i>{{tasks.sugar > 99?99:tasks.sugar}}</i>
      </span>
    </div>
    <div class="tasksList">
      <i class="topIcon"></i>
      <div class="novice" v-if="new_tasks.length >0">
        <h5>{{lang.newTaskTitle}}</h5>
        <ul>
          <li v-for="(item,index) in new_tasks" :key="index">
            <i class="giftNums">{{item.num}}</i>
            <div class="taskMsg">
              <div class="name">{{item.name}}</div>
              <div class="linerBar" v-if="item.id == 4">
                <span class="actLiner" :style="{width:item.process/item.target * 100 +'%'}"></span>
                <span class="taslkNum">{{item.process}}/{{item.target}}</span>
              </div>
            </div>
            <div class="status" :class="{act:item.finish && !item.get,black:item.get}">
              <em v-if="item.get">{{lang.getEd}}</em>
              <em v-else-if="item.finish" @click="newGift(item.id,index,item.num)">{{lang.getGift}}</em>
              <em v-else @click="newDoTask(item)">{{lang.doTask}}</em>
            </div>
          </li>
        </ul>
      </div>
      <div class="dayTasks">
        <h5>{{lang.dayTaskTips1}}</h5>
        <p>{{lang.dayTaskTips2}}</p>
        <ul>
          <li v-for="(item,index) in tasks.day_tasks" :key="index">
            <i class="giftNums">{{item.num}}</i>
            <div class="taskMsg">
              <div class="name">{{item.name}}</div>
              <div class="linerBar" v-if="item.target != 1">
                <span class="actLiner" :style="{width:item.process/item.target * 100 +'%'}"></span>
                <span class="taslkNum">{{item.process}}/{{item.target}}</span>
              </div>
            </div>
            <div class="status" :class="{act:item.finish && !item.get,black:item.get,mt:item.id == 5}">
              <em v-if="item.get">{{lang.getEd}}</em>
              <em v-else-if="item.finish" @click="dayGift(item.id,index,item.num)">{{lang.getGift}}</em>
              <em v-else @click="doTask(item)">{{lang.doTask}}</em>
              <u v-if="item.id == 5" class="pNums" @click.stop="showInivted()">{{lang.inivtedNums.replace('%s',item.total)}}</u>
            </div>
          </li>
        </ul>
      </div>
      <p class="lastTips" v-html="lang.taskScoreTips">
      </p>
    </div>
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="sharePup" v-if="showShare">
          <i class="close" @click="closeSharePup()"></i>
          <p class="giftTips">{{lang.inivitTips}} <i></i> x3</p>
          <p v-if="invitedList.length == 0" class="noData">{{lang.noData}}</p>
          <ul class="peopleList">
            <li v-for="(item,index) in invitedList" :key="index">
              <div class="userRank" :class="{noRank:item.rank == 0}">{{item.rank == 0?lang.noRank:item.rank}}</div>
              <div class="imgBox">
                <span class="avBg" v-if="item.rank<=3"></span>
                <img v-lazy="item.avatar" alt="">
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score"><span>{{lang.totalScore}}</span> <em>{{item.score}}</em></div>
            </li>
          </ul>
          <div class="inivitBtn" @click="showPelple()">{{lang.inivit}}</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="peoplePup" v-if="showPeople">
          <i class="close" @click="closePeople()"></i>
          <h5 class="tite">{{lang.fanListTitle}}</h5>
          <p v-if="peopleListHas.length == 0" class="noData">{{lang.noFans}}</p>
          <ul class="pList">
            <li v-for="(item,index) in peopleListHas" :key="index">
              <!-- <div class="userRank">{{item.rank}}</div> -->
              <div v-if="item.status!=2" class="lsitItem">
                <div class="imgBox">
                  <span class="avBg" v-if="item.rank<=3"></span>
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div class='name'>{{item.nick}}</div>
                  <div class="tips">{{lang.notSingUp}}</div>
                </div>
                <div class="shareBtn" :class="{share2:item.status == 3}">
                  <em v-if="item.status == 3">{{lang.inivitEd}}</em>
                  <em v-else @click="shareAct(item,index)">{{lang.inivitGet}}</em>
                </div>
              </div>
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
import share from "../utils/share"
import { globalBus } from '../utils/eventBus'
import getUrlString from '../utils/getString.js';
import lang from "../config/lang"

let that = null
window.onShareSuccess = async (from, uid, type, typeName) => {
  api.shareSuc()
  that.toast(lang.shareSuc)
}

export default {
  data () {
    return {

      showShare: false,
      showPeople: false,
      invitedList: [],
      peopleList: [],
      more: true,
      more2: true,
      loaded: false,
      loaded2: false,
      timer: null
    }
  },
  computed: {
    ...mapState(['tasks', 'userMsg']),
    peopleListHas () {
      let isHas = this.peopleList.filter(item => {
        return item.status != 2
      })
      return isHas
    },
    new_tasks () {
      let arr = []
      let new_tasks = this.tasks.new_tasks ? this.tasks.new_tasks : []
      console.log(new_tasks)
      for (let i = 0; i < new_tasks.length; i++) {
        if (new_tasks[i].show) {
          arr.push(new_tasks[i])
        }
      }
      return arr
    }
  },
  mounted () {
    that = this
    //已邀請分頁
    this.scrollable = this.$el.querySelector('.peopleList');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.peopleListScroll);
    }
    //好友列表分頁
    this.scrollable2 = this.$el.querySelector('.pList');
    if (this.scrollable2) {
      this.scrollable2.addEventListener('scroll', this.pListScroll);
    }
  },
  methods: {
    exChange () {
      globalBus.$emit('commonEvent', () => {
        if (!this.userMsg.reg) {
          this.toast(this.lang.needSingUp)
          return
        }
        api.exChange().then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              title: this.lang.getSucTips,
              msg: this.lang.getSucTipsmsg.replace('%s', this.tasks.exchange.name),
              noOk: false
            })
          } else {
            this.vxc('setToast', {
              title: this.lang.getFailTips,
              msg: this.lang.getFailTipsmsg,
              noOk: false
            })
            setTimeout(() => {
              this.scorllTo('tasksList')
            }, 1600)
          }
          setTimeout(() => {
            this.vxc('closeToast')
            api.tasks().then(res => {
              this.vxc('setTasks', res.data.response_data)
            })
          }, 1500)
        })
      })
    },
    newGift (id, index, nums) {
      globalBus.$emit('commonEvent', () => {
        api.newGetGift(id).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setNewTaskStatus', id - 1)
            this.vxc('addSugar', nums)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })
    },
    dayGift (id, index, nums) {
      globalBus.$emit('commonEvent', () => {
        api.dayGetGift(id).then(res => {
          if (res.data.response_status.code == 0) {
            api.tasks().then(res => {
              this.vxc('setTasks', res.data.response_data)
            })
            // let obj = {
            //   id,
            //   index
            // }
            // this.vxc('setDayTaskStatus', obj)
            // this.vxc('addSugar', nums)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })
    },
    showInivted () {
      if (!this.userMsg.reg) {
        this.toast(this.lang.needSingUp)
        return
      }
      api.invitedList(1, 0).then(res => {
        this.invitedList = res.data.response_data.list
        this.showShare = true
      })

    },
    showPelple () {
      api.invitedList(0, 0).then(res => {
        this.peopleList = res.data.response_data.list
        this.showPeople = true
      })
    },
    shareAct (item, index) { //邀請
      api.inivtedFriend(item.uid).then(res => {
        if (res.data.response_status.code == 0) {
          console.log(index)
          // this.peopleList[index].status = 3
          api.invitedList(0, 0).then(res => {
            this.peopleList = res.data.response_data.list
          })
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    newDoTask (item) {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let id = item.id
      console.log(id)
      if (!this.userMsg.reg) {
        this.toast(this.lang.needSingUp)
        return
      }
      if (id == 2) {
        const token = getUrlString('token') || '';
        const uid = getUrlString('uid') || '';
        location.href = `http://act.udateapp.com/html/person_authentication/index.html?uid=${uid}&token=${token}`
      } else if (id == 1 || id == 3 || id == 5) {
        try {
          if (ios) {
            sendJsData('app://eidpersonalDetails');
          } else {
            javascript: JSInterface.sendJsData('app://gotoPage?data={"page":"com.utalk.hsing.activity.UserInfoActivity","datas":[]}');
          }
        } catch (e) { }
      } else if (id == 4) {
        try {
          if (ios) {
            sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
          } else {
            javascript: JSInterface.sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
          }
        } catch (e) { }
      } else if (id == 6) {
        try {
          if (ios) {
            sendJsData('app://createroom');
          } else {
            javascript: JSInterface.sendJsData('app://createroom');
          }
        } catch (e) { }
      }
    },
    doTask (item) {
      globalBus.$emit('commonEvent', () => {
        if (!this.userMsg.reg) {
          this.toast(this.lang.needSingUp)
          return
        }
        const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        let id = item.id
        let key = null
        if (id == 1 || id == 2) {  //跳轉活躍度前十房間
          try {
            if (ios) {
              sendJsData('app://room?rid=' + item.rid);
            } else {
              javascript: JSInterface.sendJsData('app://room?rid=' + item.rid);
            }
          } catch (e) { }
        } else if (id == 3) {  //跳轉到邂逅頁
          try {
            if (ios) {
              sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
            } else {
              javascript: JSInterface.sendJsData('app://mainPage?page_index=pair&page_index_child=pair_pair');
            }
          } catch (e) { }
        } else if (id == 5) {  //邀請好友彈窗
          this.showPelple()
        } else if (id == 4) {  //儲值頁
          try {
            if (ios) {
              // goWalletpage()
              sendJsData('app://walletpage');
            } else {
              javascript: JSInterface.sendJsData('app://walletpage');
            }
          } catch (e) { }
        }
        // else if (key == 'room') {  //跳自己房間
        //   try {
        //     if (ios) {
        //       sendJsData('app://room?rid=' + this.dayTask.tasks.room.rid);
        //     } else {
        //       javascript: JSInterface.sendJsData('app://room?rid=' + this.dayTask.tasks.room.rid);
        //     }
        //   } catch (e) { }
        // }
      })
    },
    goRankTab () {
      this.$parent.tabClick('TabsScrollLoadList')
      setTimeout(() => {
        this.scorllTo('listBog')
      }, 100)
    },
    scorllTo (className) {
      let a = document.getElementsByClassName(className)[0].getBoundingClientRect().top
      let c = document.documentElement.scrollTop
      let e = a + c + 10
      this.timer = setInterval(() => {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 10;
        let c = document.documentElement.scrollTop
        let t = (e - c) / 10
        window.scrollTo(0, c + t)
        if (t < 1 || scrollToBottom) {
          clearInterval(this.timer)
        }
      }, 10)
    },
    peopleListScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.invitedList(1, this.invitedList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.invitedList = this.invitedList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    pListScroll () {
      console.log('xxxx')
      const scrollToBottom = this.scrollable2.scrollTop + this.scrollable2.clientHeight >= this.scrollable2.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded2) return
        if (this.more2) {
          this.more2 = false
          api.invitedList(0, this.peopleList.length, 'more').then(res => {
            this.more2 = true
            if (res.data.response_data.list.length === 0) {
              this.loaded2 = true
            } else {
              this.peopleList = this.peopleList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeSharePup () {
      this.showShare = false
      this.loaded = false
    },
    closePeople () {
      this.showPeople = false
      this.loaded2 = false
    }
  }
}
</script>
<style lang="scss">
.tasks {
  padding-bottom: 1.2rem;
}
.frames {
  width: 7.07rem;
  height: 2.95rem;
  background: url(../assets/img/frameBg.png);
  background-size: 100% 100%;
  padding-top: 2rem;
  position: relative;
  margin: 0 auto;
  .fMsg {
    display: flex;
    align-items: center;
    height: 2rem;
    .imgBox {
      margin-left: 0.7rem;
      height: 100%;
      img {
        display: block;
        margin: 0 auto;
        width: 1.85rem;
        height: 1.85rem;
      }
      strong {
        width: 120%;
        margin-left: -0.2rem;
        font-size: 0.21rem;
        white-space: nowrap;
        display: block;
        text-align: center;
        color: #fff;
      }
    }
    .msg {
      margin-left: 0.3rem;
      span {
        width: 1.65rem;
        height: 0.65rem;
      }
      .tip1 {
        font-size: 0.17rem;
        margin-bottom: 0.06rem;
      }
      .tip2 {
        color: #fff;
        font-size: 0.24rem;
        margin-bottom: 0.25rem;
        font-weight: bold;
      }
      .btnBox {
        display: flex;
        align-items: center;
        span {
          width: 1.65rem;
          height: 0.65rem;
          background: url(../assets/img/boxBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.65rem;
          font-size: 0.28rem;
          margin-right: 0.09rem;
          em {
            display: block;
            font-size: 0.21rem;
            white-space: nowrap;
            color: rgba(255, 237, 130, 1);
          }
        }
      }
    }
  }
  .tang {
    width: 0.64rem;
    height: 0.64rem;
    position: absolute;
    top: 2.2rem;
    right: 0.95rem;
    background: url(../assets/img/tang.png);
    background-size: 100% 100%;
    i {
      font-size: 0.2rem;
      display: block;
      width: 0.45rem;
      height: 0.48rem;
      text-align: center;
      line-height: 0.4rem;
      background: url(../assets/img/nums.png);
      background-size: 100% 100%;
      position: absolute;
      right: -0.1rem;
      top: 0.01rem;
    }
  }
}
.tasksList {
  width: 6.89rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  padding: 0.1rem 0 0.4rem;
  margin: 1.2rem auto;
  position: relative;
  .topIcon {
    display: block;
    width: 6.94rem;
    height: 1.58rem;
    background: url(../assets/img/pupIcon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -1rem;
  }
  .novice,
  .dayTasks {
    h5 {
      width: 6.06rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.35rem;
      background: url(../assets/img/hBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      font-weight: 600;
    }
    ul {
      width: 6.55rem;
      margin: 0.15rem auto 0;
      li {
        height: 1.12rem;
        background: url(../assets/img/taskItem.png);
        background-size: 100% 100%;
        margin-bottom: 0.05rem;
        display: flex;
        align-items: center;
        position: relative;
        .giftNums {
          display: block;
          font-size: 0.2rem;
          width: 0.45rem;
          height: 0.48rem;
          background: url(../assets/img/nums.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.2rem;
          left: 0.95rem;
          text-align: center;
          line-height: 0.43rem;
        }
        .taskMsg {
          width: 3rem;
          margin-left: 1.65rem;
          .name {
            font-size: 0.21rem;
          }
          .linerBar {
            width: 1.71rem;
            height: 0.11rem;
            background: RGBA(133, 72, 206, 1);
            position: relative;
            margin-top: 0.15rem;
            border-radius: 0.1rem;
            .actLiner {
              max-width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              border-radius: 0.1rem;
              overflow: hidden;
              background: url(../assets/img/actLiner.png);
              background-size: auto 100%;
            }
            .taslkNum {
              width: 0.5rem;
              font-size: 0.19rem;
              text-align: center;
              position: absolute;
              right: -0.55rem;
              top: -0.08rem;
            }
          }
        }
        .status {
          width: 1.65rem;
          height: 0.65rem;
          background: url(../assets/img/boxBtn2.png);
          background-size: 100% 100%;
          color: rgba(174, 72, 0, 1);
          font-size: 0.28rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-left: 0.1rem;
          .pNums {
            position: absolute;
            bottom: -0.3rem;
            font-size: 0.21rem;
            color: #fff;
          }
          &.mt {
            margin-top: -0.3rem;
          }
          &.act {
            color: rgba(255, 255, 255, 1);
            background: url(../assets/img/status1.png);
            background-size: 100% 100%;
          }
          &.black {
            color: rgba(255, 255, 255, 1);
            background: url(../assets/img/status2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .dayTasks {
    margin-top: 0.5rem;
    padding-top: 0;
    > p {
      text-align: center;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .lastTips {
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: #fff;
    text-align: center;
    margin-top: 0.25rem;
  }
}
.close {
  display: block;
  width: 0.95rem;
  height: 0.95rem;
  background: url(../assets/img/close.png);
  background-size: 100% 100%;
  position: absolute;
  right: -0.3rem;
  top: 0.6rem;
}
.noData {
  text-align: center;
}
.sharePup {
  width: 6.6rem;
  height: 7.12rem;
  background: url(../assets/img/inivListPup.png);
  background-size: 100% 100%;
  position: relative;
  padding-top: 1rem;
  .giftTips {
    height: 1.1rem;
    margin-bottom: 0.1rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 1.3rem;
    i {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      vertical-align: middle;
      background: url(../assets/img/tang.png);
      background-size: 100% 100%;
    }
  }
  .peopleList {
    // min-height: 6.2rem;
    max-height: 4.8rem;
    overflow-y: scroll;
    li {
      width: 5.75rem;
      display: flex;
      align-items: center;
      height: 1.15rem;
      margin: 0 auto;
      background: url(../assets/img/pListBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.1rem;
      border-radius: 0.12rem;
      .userRank {
        width: 0.9rem;
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
        width: 2rem;
        color: rgba(240, 249, 254, 1);
        font-size: 0.26rem;
        font-weight: 500;
        margin-left: 0.17rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        width: 1.3rem;
        font-size: 0.22rem;
        font-weight: 500;
        text-align: center;
        color: rgba(255, 237, 130, 1);
        em {
          font-size: 0.28rem;
          font-weight: 500;
          display: block;
        }
      }
    }
  }
  .inivitBtn {
    width: 3.12rem;
    height: 0.97rem;
    background: url(../assets/img/inivtBtn.png);
    background-size: 100% 100%;
    // margin: 0.3rem auto 0;
    font-size: 0.34rem;
    position: absolute;
    left: 1.75rem;
    bottom: -0.35rem;
    text-align: center;
    line-height: 0.97rem;
  }
}
.peoplePup {
  width: 6.6rem;
  height: 7.14rem;
  background: url(../assets/img/fListBg.png);
  background-size: 100% 100%;
  border-radius: 0.24rem;
  position: relative;
  padding-top: 1rem;
  h5 {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #fff;
    font-size: 0.35rem;
    font-weight: 600;
  }
  .pList {
    max-height: 5rem;
    overflow-y: scroll;
    margin-top: 0.25rem;
    .lsitItem {
      width: 6.23rem;
      display: flex;
      align-items: center;
      height: 1.25rem;
      margin: 0 auto;
      background: url(../assets/img/pListBg2.png);
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
        .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
        }
        .tips {
          font-size: 0.22rem;
          color: rgba(255, 237, 130, 1);
        }
      }
      .shareBtn {
        width: 1.65rem;
        height: 0.65rem;
        background: url(../assets/img/boxBtn.png);
        background-size: 100% 100%;
        margin-left: 0.7rem;
        color: rgba(126, 45, 0, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        em {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 0.22rem;
          text-align: center;
          line-height: 0.65rem;
        }
        &.share2 {
          color: RGBA(59, 59, 59, 1);
          background: url(../assets/img/status2.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
