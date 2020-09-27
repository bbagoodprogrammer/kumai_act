<template>
  <div class="tasks">
    <div class="frames">
      <div class="fMsg">
        <div class="imgBox">
          <img src="" alt="">
          <strong>小恶魔头像框x3天</strong>
        </div>
        <div class="msg">
          <div class="tip1">活动期间，每送出{{tasks.send}}颗糖果可兑换</div>
          <div class="tip2">已累计送出{{tasks.send}}颗糖果</div>
          <div class="btnBox">
            <span>去贈送</span>
            <span>兌換</span>
          </div>
        </div>
      </div>
      <span class="tang">
        <i>{{tasks.sugar > 99?99:tasks.sugar}}</i>
      </span>
    </div>
    <div class="tasksList">
      <i class="topIcon"></i>
      <div class="novice">
        <h5>新手任務</h5>
        <ul>
          <li v-for="(item,index) in tasks.new_task" :key="index" v-if="item.show">
            <i class="giftNums">{{item.num}}</i>
            <div class="taskMsg">
              <div class="name">{{new_task_name[item.task_id].replace('A',item.process)}}</div>
              <div class="linerBar" v-if="item.task_id == 4">
                <span class="actLiner" :style="{width:item.process/5 * 100 +'%'}"></span>
                <span class="taslkNum">{{item.process}}/5</span>
              </div>
            </div>
            <div class="status" :class="{act:item.suc && !item.get,black:item.get}" @click="newGift(item.task_id,index)">
              <em v-if="item.get">已領取</em>
              <em v-else-if="item.suc" @click="newGift(item.task_id,index)">領取糖果</em>
              <em v-else>去完成</em>
            </div>
          </li>
        </ul>
      </div>
      <div class="dayTasks">
        <h5>每日任務</h5>
        <p>（每天0點更新）</p>
        <ul>
          <li v-for="(item,index) in tasks.day_task" :key="index">
            <i class="giftNums">{{item.nums}}</i>
            <div class="taskMsg">
              <div class="name">{{day_task_name[item.id]}}</div>
              <div class="linerBar">
                <span class="actLiner" :style="{width:item.schule/item.target * 100 +'%'}"></span>
                <span class="taslkNum">{{item.schule}}/{{item.target}}</span>
              </div>
            </div>
            <div class="status" :class="{act:item.finish && !item.get,black:item.get}" @click="dayGift(item.id,index)">
              <em v-if="item.get">已領取</em>
              <em v-else-if="item.finish" @click="dayGift(item.id,index)">領取糖果</em>
              <em v-else>去完成</em>
            </div>
          </li>
        </ul>
      </div>
      <p class="lastTips">
        任务所得的糖果将发放到背包中，清即使赠送糖果小捣蛋们<br />
        1糖果=10糖果狂欢值
      </p>
    </div>

    <div class="mask" v-show="showShare">
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
              <!-- <div class="userRank">{{item.rank}}</div> -->
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
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex"
import api from "../api/apiConfig"
import share from "../utils/share"
import { globalBus } from '../utils/eventBus'

let that = null
window.onShareSuccess = async (from, uid, type, typeName) => {
  api.shareSuc()
  that.toast(`分享成功！`)
}

export default {
  data() {
    return {
      new_task_name: {
        1: '创建交友卡',
        2: '添加個性標籤',
        3: '在公開房間上麥30min(A/1)',
        4: '上傳真人頭像並通過審核',
        5: '關注5個新朋友',
        6: '創建房間',
        7: '參與1次搶麥遊戲'
      },
      day_task_name: {
        1: '在公开房间上麦15min',
        2: '为任意声音作品送出20个糖果',
        3: '交友热力值提升20',
        4: '储值任意金额',
        5: '邀请1个【万圣节嘉年华】新用户（0/5）'
      },
      showShare: false,
      showPeople: false,
      invitedList: [],
      peopleList: []
    }
  },
  computed: {
    ...mapState(['tasks']),
    peopleListHas() {
      let isHas = this.peopleList.filter(item => {
        return item.status != 2
      })
      return isHas
    }
  },
  mounted() {
    that = this
  },
  methods: {
    newGift(id, index) {
      api.newGetGift(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setNewTaskStatus', index)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    dayGift(id, index) {
      api.dayGetGift(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setDayTaskStatus', index)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    doTask(key, item, rid) {
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
            title: `我在玩大富翁遊戲，快來和我一起贏金幣、頭像框、座駕、特效禮物吧！`,
            desc: `我在玩大富翁遊戲，快來和我一起贏金幣、頭像框、座駕、特效禮物吧！`,
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
    closeSharePup() {
      this.showShare = false
    },
    closePeople() {
      this.showPeople = false
    }
  }
}
</script>
<style lang="scss">
.frames {
  width: 7.5rem;
  height: 2.28rem;
  background: url(../assets/img/frameBg.png);
  background-size: 100% 100%;
  padding-top: 1.95rem;
  position: relative;
  .fMsg {
    display: flex;
    align-items: center;
    height: 2rem;
    .imgBox {
      width: 1.7rem;
      margin-left: 1rem;
      height: 100%;
      img {
        display: block;
        margin: 0 auto;
        width: 1.37rem;
        height: 1.43rem;
      }
      strong {
        width: 120%;
        margin-left: -0.1rem;
        font-size: 0.21rem;
        white-space: nowrap;
        display: block;
      }
    }
    .msg {
      margin-left: 0.3rem;
      span {
        width: 1.65rem;
        height: 0.65rem;
      }
      .tip1 {
        color: rgba(134, 72, 206, 1);
        font-size: 0.17rem;
        margin-bottom: 0.14rem;
      }
      .tip2 {
        color: rgba(200, 47, 142, 1);
        font-size: 0.24rem;
        margin-bottom: 0.25rem;
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
          color: rgba(174, 72, 0, 1);
          margin-right: 0.09rem;
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
  margin: 0.8rem auto;
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
      line-height: 0.95rem;
      color: rgba(108, 39, 194, 1);
      font-size: 0.35rem;
      background: url(../assets/img/hBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    ul {
      width: 6.62rem;
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
            .actLiner {
              max-width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              background: url(../assets/img/actLiner.png);
              background-size: auto 100%;
            }
            .taslkNum {
              font-size: 0.19rem;
              position: absolute;
              right: -0.5rem;
              top: -0.08rem;
            }
          }
        }
        .status {
          width: 1.65rem;
          height: 0.65rem;
          background: url(../assets/img/boxBtn.png);
          background-size: 100% 100%;
          color: rgba(174, 72, 0, 1);
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          justify-content: center;
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
    }
  }
  .lastTips {
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: rgba(120, 42, 190, 1);
    text-align: center;
    margin-top: 0.25rem;
  }
}
.close {
  display: block;
  width: 0.72rem;
  height: 0.78rem;
  //   background: url(../assets/img/close.png);
  //   background-size: 100% 100%;
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
    // background: url(../assets/img/title/ribbon.png);
    // background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      //   background: url(../assets/img/title/title_09.png);
      //   background-size: 100% 100%;
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
      //   background: url(../assets/img/dice.png);
      //   background-size: 100% 100%;
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
    // background: url(../assets/img/singUpBtn.png);
    // background-size: 100% 100%;
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
    // background: url(../assets/img/title/ribbon.png);
    // background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      //   background: url(../assets/img/title/title_10.png);
      //   background-size: 100% 100%;
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
        // background: url(../assets/img/shareBtn.png);
        // background-size: 100% 100%;
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
          //   background: url(../assets/img/ed.png);
          //   background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
