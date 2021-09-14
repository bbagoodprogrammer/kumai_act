<template>
  <div class="getDice">
    <div class="taskList">
      <i class="close" @click="closeGetDicePup()"></i>
      <div class="title"><i></i></div>
      <div class="taskMsgList">
        <!-- <p class="tips">每日任務 <em>（每日0點更新）</em></p>
        <ul class="taskItem">
          <li v-for="(item,index) in dayTask.tasks" :key="index">
            <div class="diceImg">
              <img src="../assets/img/dice.png" alt="">
              <strong>x{{item.give}}</strong>
            </div>
            <div class="taskMsg">
              <div class="name">{{getTaskName(index,item)}} <i v-if="index == 'room'" @click="showRoomTips()"></i> </div>
              <div class="linerBox">
                <div class="liner">
                  <i class="actLiner" :style="{width:(item.current/item.target) * 100 +'%'}"></i>
                </div>
                <strong>{{item.current}}/{{item.target}}</strong>
              </div>
            </div>
            <div class="status">
              <em class='ed' v-if="item.got">已領取</em>
              <em class="get" v-else-if="(item.current == item.target) && !item.got" @click="getDice(index,item)">領取骰子</em>
              <em class="doTask" v-else @click="doTask(index,item)">去完成</em>
              <u v-if="index == 'invite'" @click="showSharePup()" class="invite">已邀請{{item.invited}}人</u>
            </div>
          </li>
        </ul> -->
        <p class="tips tips2">{{lang.buyDice}} <span @click="gowalletpage()"><i></i><strong>{{dayTask.balance}}</strong> <i class="add"></i></span></p>
        <ul class="priceList">
          <li v-for="(item,index) in dayTask.goods" :key="index">
            <div class="diceImg">
              <img src="../assets/img/dice.png" alt="">
              <strong>x{{index}}</strong>
            </div>
            <div class="price">
              <div class="nowPrice">{{item.price}}</div>
              <!-- <del class="original">{{item.original}}</del> -->
            </div>
            <div class="buy" @click="buyDice(index)">{{lang.購買}}</div>
          </li>
        </ul>
      </div>

    </div>
    <!-- <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="sharePup" v-if="showShare">
          <i class="close" @click="closeSharePup()"></i>
          <div class="title"><i></i></div>
          <p class="giftTips">邀請活動新玩家，每成功邀請1人獎勵 <i></i> x3</p>
          <p v-if="invitedList.length == 0" class="noData">暫無數據</p>
          <ul class="peopleList">
            <li v-for="(item,index) in invitedList" :key="index">
              <div class="userRank" :class="{noRank:item.rank == 0}">{{item.rank == 0?'未上榜':item.rank}}</div>
              <div class="imgBox">
                <span class="avBg" v-if="item.rank<=3"></span>
                <img v-lazy="item.avatar" alt="">
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score"><em>{{item.score}}步</em></div>
            </li>
          </ul>
          <div class="inivitBtn" @click="showPelple()">邀請活動新玩家</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="peoplePup" v-if="showPeople">
          <div class="title"><i></i></div>
          <i class="close" @click="closePeople()"></i>
          <p v-if="peopleListHas.length == 0" class="noData">暫無可邀請好友，快去添加好友吧~</p>
          <ul class="pList">
            <li v-for="(item,index) in peopleListHas" :key="index">
              <div v-if="item.status!=2" class="lsitItem">
                <div class="imgBox">
                  <span class="avBg" v-if="item.rank<=3"></span>
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div>{{item.nick}}</div>
                  <div class="tips">還沒參加音覓大富翁活動</div>
                </div>
                <div class="shareBtn" :class="{share2:item.status == 1}">
                  <em v-if="item.status == 1">已邀請</em>
                  <em v-else @click="shareAct(item,index)">邀請領取</em>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import share from "../utils/share"
import { globalBus } from '../utils/eventBus'
import lang from "../config/lang"
let that = null
window.onShareSuccess = async (from, uid, type, typeName) => {
  api.shareSuc()
  that.toast(lang.shareSuc)
  that.$parent.showTask = false
  that.$parent.showGiftPup = true
  that.$parent.luck = true

  that.$parent.showGift = {
    "type": "dice",
  }
  that.vxc('addDice')
  // alert(`shareSuc${type}`)
  // if (type == 2 || type == 3) {
  //   if (from != 2) {
  //     api.shareSuc(from)
  //     this.toast(`分享成功！`)
  //   } else {
  //     api.shareCb().then(res => {
  //       if (res.data.response_status.code == 0) {
  //         store.commit('setTask', 'share')
  //         this.toast(`分享成功！`)
  //       } else {
  //         this.toast(res.data.response_status.error)
  //       }
  //     })
  //   }
  // }
}
export default {
  data () {
    return {
      //   taskName: {
      //     coin: '送出80金幣禮物',
      //     invite: '邀請一個活動新用戶（A/5）',
      //     mic: '在公開房間上麥30min(A/1)',
      //     owner: '自己魅力值增加500（A/1）',
      //     room: '自己房間的人氣值增加5000'
      //   },
      showShare: false,
      showPeople: false,
      invitedList: [],
      peopleList: [],
    }
  },
  computed: {
    ...mapState(['dayTask', 'dice']),
    peopleListHas () {
      let isHas = this.peopleList.filter(item => {
        return item.status != 2
      })
      return isHas
    },
    taskName () {
      return this.lang.taskName
    }
  },
  mounted () {
    that = this
  },
  methods: {
    showRoomTips () {
      this.vxc('setToast', {
        title: 'room',
        msg: this.lang.roomTips
      })
    },
    showSharePup () {
      api.getFriendList(0, 'invited').then(res => {
        this.invitedList = res.data.response_data.list
        this.showShare = true
      })
    },
    showPelple () {
      api.getFriendList(0).then(res => {
        this.peopleList = res.data.response_data.list
        this.showPeople = true
      })
    },
    shareAct (item, index) {
      if (!item.invited) {
        api.shareFriend(item.uid).then(res => {
          if (res.data.response_status.code == 0) {
            this.peopleList[index].status = 1
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    doTask (key, item, rid) {
      console.log(rid, key)
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (key == 'mic' || key == 'coin' || key == 'gift' || key == 'owner') {  //跳轉活躍度前十房間
        let keyId = this.dayTask.tasks ? this.dayTask.tasks[key].rid : null
        let newRid = rid ? rid : keyId
        try {
          if (ios) {
            sendJsData('app://room?rid=' + newRid);
          } else {
            javascript: JSInterface.sendJsData('app://room?rid=' + newRid);
          }
        } catch (e) { }
      } else if (key == 'share') {  //分享活動
        try {
          share({
            from: '2',
            url: `http://activity.udateapp.com/static_html/2020/richMan/index.html`,
            title: this.lang.shareTitle,
            desc: this.lang.shareDesc,
            image: 'http://activity.udateapp.com/static_html/2020/richMan/share.jpg'
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
            sendJsData('app://room?rid=' + this.dayTask.tasks.room.rid);
          } else {
            javascript: JSInterface.sendJsData('app://room?rid=' + this.dayTask.tasks.room.rid);
          }
        } catch (e) { }
      }
    },
    getDice (key, item) {
      api.getCai(key).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setTaskGiftStatus', key)
          this.vxc('setDice', res.data.response_data.dice)
          this.toast(this.lang.getSuc)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    buyDice (index) {
      if (this.dayTask.balance >= index) {
        api.buyDice(index).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setBalance', res.data.response_data.balance)
            this.vxc('setDice', res.data.response_data.dice)
            this.toast(this.lang.buySuc)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.gowalletpage()
      }
    },
    getTaskName (key, item) {
      if (key == 'invite') {
        return this.taskName[key].replace('A', item.current)
      }
      return this.taskName[key].replace('A', item.current == item.target ? '1' : '0')
    },
    gowalletpage () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
    closeGetDicePup () {
      this.$parent.showDayTask = false
    },
    closePeople () {
      this.showPeople = false
    },
    closeSharePup () {
      this.showShare = false
    },
  }
}
</script>
<style lang="scss">
.noData {
  margin-top: 0.6rem;
  text-align: center;
}
.getDice {
  .taskList {
    width: 6rem;
    height: 9rem;
    padding: 0.8rem 0.24rem 0;
    .taskMsgList {
      height: 9rem;
      overflow-y: scroll;
    }
    .title {
      i {
        background: url(../assets/img/title/title_08.png);
        background-size: 100% 100%;
      }
    }
    .tips2 {
      margin-top: 0.3rem;
    }
    .tips {
      em {
        font-size: 0.24rem;
      }
      span {
        display: block;
        float: right;
        width: 1.8rem;
        height: 0.5rem;
        background: url(../assets/img/bottom.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        strong {
          width: 0.9rem;
          text-align: center;
          font-size: 0.21rem;
        }
        i {
          display: block;
          width: 0.38rem;
          height: 0.38rem;
          background: url(../assets/img/gold.png);
          background-size: 100% 100%;
          margin-left: 0.1rem;
          &.add {
            background: url(../assets/img/plus.png);
            background-size: 100% 100%;
            margin-left: 0;
          }
        }
      }
    }
    .taskItem {
      margin-top: 0.15rem;
      li {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 1.4rem;
        background: rgba(103, 52, 191, 0.4);
        border-radius: 0.12rem;
        margin-bottom: 0.1rem;
        .diceImg {
          margin: 0 0.18rem 0 0.2rem;
          img {
            display: block;
            width: 0.74rem;
            height: 0.74rem;
          }
          strong {
            display: block;
            text-align: center;
          }
        }
        .taskMsg {
          width: 3.4rem;
          .name {
            font-size: 0.24rem;
            display: flex;
            align-items: center;
            i {
              width: 0.22rem;
              height: 0.22rem;
              background: url(../assets/img/question.png);
              background-size: 100% 100%;
            }
          }
          .linerBox {
            display: flex;
            align-items: center;
            margin-top: 0.15rem;
            .liner {
              width: 1.5rem;
              height: 0.1rem;
              background: #341273;
              border-radius: 0.05rem;
              margin-right: 0.13rem;
              position: relative;
              .actLiner {
                max-width: 100%;
                height: 0.1rem;
                background: linear-gradient(-90deg, #7aa3fd, #83d2fb);
                border-radius: 0.05rem;
                position: absolute;
                left: 0;
                top: 0;
              }
            }
            strong {
              font-size: 0.21rem;
            }
          }
        }
        .status {
          em {
            display: block;
            width: 1.4rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            font-size: 0.22rem;
          }
          .ed {
            color: rgba(59, 59, 59, 1);
            background: url(../assets/img/ed.png);
            background-size: 100% 100%;
          }
          .get {
            color: rgba(126, 45, 0, 1);
            background: url(../assets/img/shareBtn.png);
            background-size: 100% 100%;
          }
          .doTask {
            color: rgba(13, 94, 170, 1);
            background: url(../assets/img/doTask.png);
            background-size: 100% 100%;
          }
          .invite {
            display: block;
            text-align: center;
            color: rgba(156, 243, 255, 1);
            font-size: 0.21rem;
          }
        }
      }
    }
    .priceList {
      margin-top: 0.2rem;
      li {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 1.4rem;
        background: rgba(103, 52, 191, 0.4);
        border-radius: 0.12rem;
        margin-bottom: 0.1rem;
        .diceImg {
          margin: 0 0.18rem 0 0.2rem;
          img {
            display: block;
            width: 0.74rem;
            height: 0.74rem;
          }
          strong {
            display: block;
            text-align: center;
          }
        }
        .price {
          width: 3rem;
          text-align: right;
        }
        .buy {
          display: block;
          width: 1.4rem;
          height: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.22rem;
          color: rgba(126, 45, 0, 1);
          background: url(../assets/img/shareBtn.png);
          background-size: 100% 100%;
          margin-left: 0.4rem;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
  }
  .sharePup {
    width: 6.48rem;
    height: 9.6rem;
    background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
    border: 0.08rem solid #ffffff;
    border-radius: 0.24rem;
    position: relative;
    padding-top: 0.6rem;
    .title {
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/ribbon.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.8rem;
      left: 0.71rem;
      i {
        display: block;
        width: 5.14rem;
        height: 1.42rem;
        background: url(../assets/img/title/title_09.png);
        background-size: 100% 100%;
      }
    }
    .giftTips {
      margin-bottom: 0.1rem;
      font-size: 0.24rem;
      text-indent: 0.4rem;
      i {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
        background: url(../assets/img/dice.png);
        background-size: 100% 100%;
      }
    }
    .peopleList {
      min-height: 6.2rem;
      max-height: 7.5rem;
      overflow-y: scroll;
      li {
        width: 6rem;
        display: flex;
        align-items: center;
        height: 1.4rem;
        margin: 0 auto;
        background: rgba(103, 52, 191, 0.4);
        margin-bottom: 0.1rem;
        border-radius: 0.12rem;
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
      width: 3.76rem;
      height: 1rem;
      background: url(../assets/img/singUpBtn.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
      // position: absolute;
      // left: 1.75rem;
      // bottom: 0.35rem;
      color: rgba(126, 45, 0, 1);
      text-align: center;
      line-height: 0.8rem;
    }
  }
  .peoplePup {
    width: 6.48rem;
    height: 9.55rem;
    background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
    border: 0.08rem solid #ffffff;
    border-radius: 0.24rem;
    position: relative;
    padding-top: 0.6rem;
    .title {
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/ribbon.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.8rem;
      left: 0.71rem;
      i {
        display: block;
        width: 5.14rem;
        height: 1.42rem;
        background: url(../assets/img/title/title_10.png);
        background-size: 100% 100%;
      }
    }
    .pList {
      max-height: 9rem;
      overflow-y: scroll;
      .lsitItem {
        width: 6rem;
        display: flex;
        align-items: center;
        height: 1.4rem;
        margin: 0 auto;
        background: rgba(103, 52, 191, 0.4);
        margin-bottom: 0.1rem;
        border-radius: 0.12rem;
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
          width: 1.4rem;
          height: 0.5rem;
          background: url(../assets/img/shareBtn.png);
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
            line-height: 0.5rem;
          }
          &.share2 {
            color: RGBA(59, 59, 59, 1);
            background: url(../assets/img/ed.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
