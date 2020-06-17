<template>
  <div class="dayTasks">
    <i class="close" @click="closeTask()"></i>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="taskMsg">
          <div class="name">{{item.desc}}
            <em class="invitationed" @click="showInv()" v-if="item.id == 11"> 已邀請{{total_invited_users}}人>>></em>
            <span class="bar" v-if="item.id == 7">
              <em>{{Math.floor(item.rate/60) }}/{{item.target/60}}min</em>
              <i class="actBar" :style="{width:item.rate/item.target*100+'%'}"></i>
            </span>
          </div>
          <div class="giftTips">每次獎勵 <i></i>X{{item.reward}},每天{{item.limit}}次</div>
        </div>
        <div class="status">
          <em class="geted" v-if="item.status == 2"></em>
          <em class="getIng" v-else-if="item.status == 1" @click="getWater(item,index)"></em>
          <em class="share" v-else-if="item.status == 0 &&item.link== 5" @click="goHtml(item.link,item.rid)">
            <i>({{item.finished}}/{{item.limit}})</i>
          </em>
          <em class="noSuc" v-else @click="goHtml(item.link,item.rid,item.id)">
            <i>({{item.finished}}/{{item.limit}})</i>
          </em>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="invitationedPup">
      <transition name="slide">
        <div class="invitationedPup" v-if="invitationedPup">
          <i class="close" @click="colseInv()"></i>
          <div class="title"><i></i></div>
          <p v-if="invList.length == 0" class="noData">好友多，鹿好養~快去認識新朋友吧</p>
          <ul class="scrollable">
            <li v-for="(item,index) in invList" :key="index">
              <div class="id">{{item.id}}</div>
              <img v-lazy="item.avatar" alt="" class="userAvatar">
              <div class="nick">{{item.nick}}</div>
              <div class="deerLv">
                <img :src="require(`../assets/img/rankDeer/deer${item.deer_level}.png`)" alt="" class="userDeer">
              </div>
              <div class="score">
                <em>成長值</em>
                <strong>{{item.deer_exp}}</strong>
              </div>
            </li>
          </ul>
          <div class="sharebtn" @click="showFriend()"></div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showFriendList">
      <transition>
        <Friendslist v-if="showFriendList" @closeFriend="closeFriend"></Friendslist>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import Friendslist from "./Friendslist"
import share from "../utils/share"
import store from "../store/stores"
import common from "../utils/common"
window.onShareSuccess = async (from, uid, type, typeName) => {
  // alert(`shareSuc${type}`)
  if (type == 2 || type == 3) {
    let shareType = from.split('_')[0]
    let num = from.split('_')[1]
    let level = num / 100
    api.shareback(shareType, level).then(res => {
      if (res.data.response_status.code == 0) {
        globalBus.$emit('shareSuc')
        store.commit('addScore', num * 1)
        store.commit('setToast', {
          msg: `分享成功！梅花鹿獲得${num}成長值`,
          time: 2000
        })
      } else {
        // this.toast(res.data.response_status.error)
      }
    })
  }
}

export default {
  components: { Friendslist },
  data() {
    return {
      list: [],
      invList: [],
      invitationedPup: false,
      showFriendList: false,
      loaded: false,
      more: true,
      total_invited_users: 0
    }
  },
  created() {
    api.waterTask().then(res => {
      this.list = res.data.response_data.missions
      this.total_invited_users = res.data.response_data.total_invited_users
    })
  },
  methods: {
    getWater(item, index) {  //修改禮物
      globalBus.$emit('commonEvent', () => {
        api.getGifts(item.id).then(res => {
          if (res.data.response_status.code == 0) {
            this.list[index].status = 2
            this.toast('領取成功')
            this.vxc('addWater', item.finished * item.reward)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.sharedPeople(this.invList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.invList = this.invList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    showInv() {
      if (this.invList.length == 0) {
        api.sharedPeople(0).then(res => {
          this.invList = res.data.response_data.list
          this.invitationedPup = true
          this.$nextTick(() => {
            this.scrollable = this.$el.querySelector('.scrollable');
            if (this.scrollable) {
              this.scrollable.addEventListener('scroll', this.onScroll);
            }
          })
        })
      } else {
        this.invitationedPup = true
      }
    },
    colseInv() {
      this.invitationedPup = false
    },
    goShareHtml() {

    },
    showFriend() {
      this.showFriendList = true
    },
    closeFriend() {
      this.showFriendList = false
    },
    closeTask() {
      this.$emit('closeTaskList')
    },
    goHtml(link, rid, id) {//0無鏈接，1進房間，2邂逅頁，3儲值頁，4分享活動，5邀請好友
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (link == 1) {
        try {
          if (id == 10) {
            api.shareback(3).then(res => {
              if (ios) {
                sendJsData('app://room?rid=' + rid);
              } else {
                javascript: JSInterface.sendJsData('app://room?rid=' + rid);
              }
            })
          } else {
            if (ios) {
              sendJsData('app://room?rid=' + rid);
            } else {
              javascript: JSInterface.sendJsData('app://room?rid=' + rid);
            }
          }
        } catch (e) { }
      } else if (link == 2) {
        try {
          if (ios) {
            sendJsData('app://bottlespage');
          } else {
            javascript: JSInterface.sendJsData('app://bottlespage');
          }
        } catch (e) { }
      } else if (link == 3) {
        try {
          if (ios) {
            // goWalletpage()
            sendJsData('app://walletpage');
          } else {
            javascript: JSInterface.sendJsData('app://walletpage');
          }
        } catch (e) { }
      } else if (link == 4) {
        //url title desc image from
        try {
          share({
            from: '1_0',
            url: `http://activity.udateapp.com/static_html/2020/raisingDeer/index.html?type=1`,
            title: '我正在養梅花鹿，很好玩！也送你一隻鹿寶寶',
            desc: '我正在養梅花鹿，很好玩！也送你一隻鹿寶寶',
            image: 'http://activity.udateapp.com/static_html/2020/raisingDeer/share.jpg'
          })
        } catch (e) { }
      } else if (link == 5) {
        this.showFriend()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dayTasks {
  width: 6.88rem;
  height: 9.97rem;
  background: url(../assets/img/tasksBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0.82rem;
  left: 0.29rem;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 0.6rem;
  }
  > ul {
    width: 6.3rem;
    height: 8.1rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    position: absolute;
    top: 1.57rem;
    left: 0.28rem;
    li {
      height: 1.24rem;
      padding: 0 0.17rem 0 0.3rem;
      display: flex;
      align-items: center;
      background: rgba(226, 255, 194, 1);
      border: 0.04rem solid rgba(202, 255, 148, 1);
      // box-shadow: -1px 1px 31px 1px rgba(255, 255, 255, 0.75);
      border-radius: 0.1rem;
      margin-bottom: 0.18rem;
      .taskMsg {
        width: 5rem;
        .name {
          font-size: 0.28rem;
          color: #2a5103;
          font-weight: bold;
          .invitationed {
            font-size: 0.2rem;
            color: #f57b09;
          }
          .bar {
            display: inline-block;
            width: 1.28rem;
            height: 0.06rem;
            background: rgba(126, 141, 112, 1);
            border-radius: 0.03rem;
            position: relative;
            em {
              font-size: 0.18rem;
              color: #508d12;
              position: absolute;
              top: -0.25rem;
            }
            .actBar {
              display: block;
              height: 100%;
              background: rgba(246, 123, 12, 1);
              border-radius: 3px;
              position: absolute;
              z-index: 10;
              left: 0;
            }
          }
        }
        .giftTips {
          font-size: 0.24rem;
          color: #619035;
          display: flex;
          align-items: center;
          margin-top: 0.07rem;
          font-weight: 500;
          i {
            display: block;
            margin: 0 0.1rem;
            width: 0.32rem;
            height: 0.34rem;
            background: url(../assets/img/waterIcon.png);
            background-size: 100% 100%;
          }
        }
      }
      .status {
        em {
          display: block;
          width: 1.11rem;
          height: 0.52rem;
          position: relative;
          i {
            width: 1.11rem;
            font-size: 0.16rem;
            color: #fefab7;
            text-align: center;
            position: absolute;
            bottom: 0rem;
          }
          &.geted {
            background: url(../assets/img/taskPup/geted.png);
            background-size: 100% 100%;
          }
          &.getIng {
            background: url(../assets/img/taskPup/getIng.png);
            background-size: 100% 100%;
          }
          &.share {
            background: url(../assets/img/taskPup/share.png);
            background-size: 100% 100%;
          }
          &.noSuc {
            background: url(../assets/img/taskPup/noSuc.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.invitationedPup {
  width: 6.88rem;
  height: 8.8rem;
  background: url(../assets/img/invitationedBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 1.8rem;
  left: 0.31rem;
  .title {
    width: 4.77rem;
    height: 0.99rem;
    background: url(../assets/img/invitationedTitle.png);
    background-size: 100% 100%;
    position: relative;
    margin: 0.55rem auto 0;
    i {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../assets/img/invitationedWater.png);
      background-size: 100% 100%;
      position: absolute;
      right: -0.6rem;
      bottom: 0;
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.4rem;
    color: #316501;
  }
  ul {
    margin-top: 0.25rem;
    width: 6.3rem;
    // height: 5.3rem;
    margin: 0.35rem auto 0;
    max-height: 5.3rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      height: 1.24rem;
      padding: 0 0.17rem 0 0.3rem;
      display: flex;
      align-items: center;
      background: rgba(226, 255, 194, 1);
      border: 0.04rem solid rgba(202, 255, 148, 1);
      // box-shadow: -1px 1px 31px 1px rgba(255, 255, 255, 0.75);
      border-radius: 0.1rem;
      margin-bottom: 0.18rem;
      .id {
        width: 0.5rem;
        text-align: center;
        font-size: 0.42rem;
        color: #3a7007;
        font-weight: 800;
      }
      .userAvatar {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        border: 0.02rem solid #f8fc6a;
        margin-left: 0.2rem;
      }
      .userDeer {
        width: 0.9rem;
        height: 0.9rem;
      }
      .nick {
        font-size: 0.32rem;
        color: #3a7007;
        font-weight: bold;
        width: 2.3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 2.3rem;
        margin-left: 0.1rem;
      }
      .score {
        width: 1.5rem;
        text-align: center;
        margin-left: 0.15rem;
        em {
          display: block;
          color: #65b21c;
          font-weight: bold;
        }
        strong {
          font-size: 0.34rem;
          color: #4e8c11;
          font-weight: bold;
        }
      }
    }
  }
  .sharebtn {
    width: 4.18rem;
    height: 1.02rem;
    background: url(../assets/img/taskPup/shareBtn.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 0.5rem;
    left: 1.26rem;
  }
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: -0.5rem;
  }
}
</style>