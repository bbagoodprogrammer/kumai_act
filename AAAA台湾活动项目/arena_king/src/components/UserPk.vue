<template>
  <div class="main2">
    <div class="rank1Time">
      <div class="end" v-if="rankState == 2">— 爭霸賽已结束 —</div>
      <div class="time" v-else-if="rankState == 0 || rankState == 1">
        <div class="timeTitle" v-if="rankState== 0">— 爭霸賽開始倒計時 —</div>
        <div class="timeTitle" v-else>— 爭霸賽結束倒計時 —</div>
        <div class="timeItem">
          <span><em>{{surplusTime.day}}</em><i>天</i> </span>
          <span><em>{{surplusTime.hour}}</em><i>時</i> </span>
          <span><em>{{surplusTime.minute}}</em><i>分</i> </span>
          <span><em>{{surplusTime.second}}</em><i>秒</i></span>
        </div>
      </div>
      <div class="forward" v-else>— 敬请期待 —</div>
    </div>
    <div class="kRoom">
      <div class="roomImg">
        <img :src="mainRoom.pic_url" alt="">
      </div>
      <div class="roomMsg">
        <div class="live"></div>
        <div class="roomId">K房ID：<em>{{mainRoom.rid}}</em> </div>
        <div class="goLook" @click="goKroom(mainRoom.rid)">觀看爭霸賽直播</div>
      </div>
    </div>
    <p class='roomTips'>
      活動期間贈送任意金幣禮物獎勵棒棒糖x1
    </p>
    <div class="tabsBox">
      <span v-for="(item,index) in tabs" :key="index" :class="{active:step===index+1}" @click="undatStep(index+1)">{{item}}</span>
    </div>
    <div class="userPkMain">
      <!-- v-if="nowUserPk.length > 0 && step2 != 0" -->
      <div class="line">
        <div v-for="(item,index) in 3" :key="index" :class="[{act:(lineAct+1)==(++index) && nowUserStep == step},'line'+ index]">
          <em class="vs" v-if="(lineAct+1)==index  && nowUserStep == step"></em>
        </div>
      </div>
      <div class="userItem" v-for="(item,index) in nowUserPk" :key="index" :class="'user'+index">
        <div class="userImg" @click="goUser(item.uid)">
          <div class="userAvatar"></div>
          <img v-lazy="item.avatar" alt="" :data-uid="item.uid">
          <div class="ko" v-if="index <= lineAct && index!=0"></div>
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="score"><i></i><em>{{item.score}}</em></div>
        </div>
      </div>
      <!-- <div class="forward" v-if="nowUserPk.length == 0">— 敬请期待 —</div> -->
      <p class="pkTips">
        爭霸賽加時條件為：200票</br>
        上麥90秒內未達200票則自動下麥
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import downTime from '../utils/downTime.js'
export default {
  data() {
    return {
      step: 0,
      tiemr: null,
      surplusTime: {},
      tabs: ['第一場', '第二場', '第三場', '第四場', '決勝場'],
      defaluteUser: [
        {
          "score": "???",
          "pk": 0,
          "nick": "???",
          "avatar": "???"
        },
        {
          "score": "???",
          "pk": 0,
          "nick": "???",
          "avatar": "???"
        },
        {
          "score": "???",
          "pk": 0,
          "nick": "???",
          "avatar": "???"
        },
        {
          "score": "???",
          "pk": 0,
          "nick": "???",
          "avatar": "???"
        }
      ]
    }
  },
  watch: {
    nowUserStep(val) {
      this.step = val
    }
  },
  computed: {
    ...mapState(['userGroups', 'nowUserStep', 'step2Time', 'step3Time', 'step1', 'step2', 'mainRoom']),
    nowUserPk() {
      const user = this.userGroups[this.step] || {};
      let userArr = user.users || [];
      if (userArr.length == 0) {
        userArr = this.defaluteUser
      }
      return userArr;
    },
    lineAct() {
      for (var i = this.nowUserPk.length - 1; i >= 0; i--) {
        if (this.nowUserPk[i].pk == 1) {
          return i
        }
      }
      return 0
    },
    rankState() {
      if (this.step1 == 2 && this.step2 == 0) {  //等待開始
        this.downTimeGo(this.step3Time)
        return 0
      } else if (this.step2 == 1) {  //正在進行
        this.downTimeGo(this.step2Time)
        return 1
      } else if (this.step2 == 2) {  //結束
        return 2
      }
    }
  },
  methods: {
    undatStep(val) {
      if (!this.userGroups[val]) {
        api.getMain2(val).then(res => {   //储存场次
          const { response_data } = res.data
          this.$store.commit('updateUserGroups', {
            key: response_data.step,
            users: response_data.users
          });
          this.step = val
        })
      } else {
        this.step = val
      }
    },
    downTimeGo(val) {
      downTime('time2', val);
      this.surplusTime = downTime('time2');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time2');
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.$store.commit('changStep2', 2)
        }
      }, 1000)
    },
    onRefresh() {
      api.getMain2(this.step).then(res => {   //储存场次
        const { response_data } = res.data
        this.$store.commit('changStep2', response_data.step2)
        this.$store.commit('changStep2Time', response_data.step2Time)
        this.$store.commit('updateUserGroups', {
          key: response_data.step,
          users: response_data.users
        });
      })
    },
    goKroom(rid) {
      location.href = `rid:${rid}`
    },
    goUser(uid) {
      if (uid) {
        location.href = `uid:${uid}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main2 {
  .rank1Time {
    width: 4.22rem;
    height: 0.86rem;
    background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    .timeTitle {
      font-size: 72%;
      color: #d89d58;
      text-align: center;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .timeItem {
      height: 0.56rem;
      color: #d89d58;
      display: flex;
      align-items: center;
      padding: 0 0.27rem;
      span {
        flex: 1;
        em {
          color: #fff3ba;
          font-size: 120%;
          margin-right: 0.16rem;
        }
        i {
          font-size: 71%;
        }
      }
    }
  }
  .kRoom {
    margin-top: 0.35rem;
    height: 1.74rem;
    display: flex;
    justify-content: center;
    .roomImg {
      width: 1.74rem;
      height: 1.74rem;
      background: url(../assets/img/roomImgBg.png);
      background-size: 100% 100%;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.12rem;
      }
    }
    .roomMsg {
      margin-left: 0.34rem;
      .roomId {
        color: #d89d58;
        margin: .05rem 0;
        em {
          color: #ffdeb7;
        }
      }
      .live {
        display: block;
        width: 0.64rem;
        height: 0.28rem;
        margin: 0.14rem 0 0;
        background: url(../assets/img/live.png);
        background-size: 100% 100%;
      }
      .goLook {
        width: 2.53rem;
        height: 0.71rem;
        background: url(../assets/img/gokRoom.png);
        background-size: 100% 100%;
        color: #532e01;
        line-height: 0.71rem;
        text-align: center;
      }
    }
  }
  .roomTips {
    font-size: 80%;
    text-align: center;
    color: #d89d58;
    margin-top: 0.33rem;
  }
  .tabsBox {
    margin-top: 0.3rem;
    padding: 0 0.11rem 0 0.18rem;
    display: flex;
    span {
      margin-right: 0.07rem;
      display: block;
      width: 1.37rem;
      height: 0.63rem;
      color: #e1ab70;
      text-align: center;
      line-height: 0.63rem;
      background: url(../assets/img/tabDefault.png);
      background-size: 100% 100%;
      &.active {
        color: #fff9d6;
        background: url(../assets/img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .userPkMain {
    width: 7.12rem;
    height: 6.22rem;
    background: rgba(35, 19, 3, 1);
    border: 0.06rem solid rgba(123, 66, 13, 1);
    border-radius: 0.1rem;
    margin: 0.64rem auto;
    position: relative;
    .line {
      .vs {
        display: block;
        width: 0.66rem;
        height: 0.5rem;
        background: url(../assets/img/vs.png);
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .line1 {
        width: 2.58rem;
        height: 1.35rem;
        background: url(../assets/img/line1.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.83rem;
        left: 1.28rem;
        &.act {
          background: url(../assets/img/line1Act.png);
          background-size: 100% 100%;
        }
      }
      .line2 {
        width: 2.85rem;
        height: 0.12rem;
        background: url(../assets/img/line2.png);
        background-size: 100% 100%;
        position: absolute;
        top: 2.4rem;
        left: 1.28rem;
        &.act {
          background: url(../assets/img/line2Act.png);
          background-size: 100% 100%;
        }
      }
      .line3 {
        width: 2.58rem;
        height: 1.35rem;
        background: url(../assets/img/line3.png);
        background-size: 100% 100%;
        position: absolute;
        top: 2.73rem;
        left: 1.28rem;
        &.act {
          background: url(../assets/img/line3Act.png);
          background-size: 100% 100%;
        }
      }
    }
    .userItem {
      width: 1rem;
      height: 1rem;
      position: absolute;
      top: 1.94rem;
      left: 3.64rem;
      display: flex;
      .userImg {
        .userAvatar {
          width: 1rem;
          height: 1rem;
          background: url(../assets/img/userOther.png);
          background-size: 100% 100%;
          position: relative;
          z-index: 10;
        }
        img {
          width: 0.9rem;
          height: 0.9rem;
          position: absolute;
          top: 0.05rem;
          left: 0.05rem;
        }
        .ko {
          display: block;
          width: 1.03rem;
          height: 0.45rem;
          background: url(../assets/img/ko.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.28rem;
          left: -0.015rem;
          z-index: 11;
        }
      }
      .userMsg {
        width: 1.8rem;
        margin-top: 0.1rem;
        .name {
          max-width: 1.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 98%;
          color: #fff9d6;
        }
        .score {
          display: flex;
          align-items: center;
          margin-top: 0.06rem;
          i {
            display: block;
            width: 0.39rem;
            height: 0.4rem;
            background: url(../assets/img/Microphone.png);
            background-size: 100% 100%;
          }
          em {
            color: #fff88e;
            margin-left: 0.09rem;
          }
        }
      }
      &.user0 {
        width: 1.3rem;
        height: 1.3rem;
        top: 1.79rem;
        left: 0.71rem;
        display: block;
        .userAvatar {
          width: 1.3rem;
          height: 1.3rem;
          background: url(../assets/img/user1.png);
          background-size: 100% 100%;
          position: relative;
          z-index: 10;
        }
        .userMsg {
          margin: 0 0 0 -0.1rem;
        }
        img {
          width: 0.9rem;
          height: 0.9rem;
          position: absolute;
          top: 0.2rem;
          left: 0.2rem;
        }
        .name {
          text-align: center;
          max-width: 1.5rem;
        }
      }
      &.user1 {
        top: 0.43rem;
        left: 3.64rem;
        .userMsg {
          margin-left: 0.15rem;
        }
      }
      &.user2 {
        top: 1.94rem;
        left: 3.64rem;
        .userMsg {
          margin-left: 0.15rem;
        }
      }
      &.user3 {
        top: 3.48rem;
        left: 3.64rem;
        .userMsg {
          margin-left: 0.15rem;
        }
      }
    }
    .pkTips {
      position: absolute;
      bottom: 0.53rem;
      left: 1.76rem;
      color: #d89d58;
      font-size: 80%;
      text-align: center;
    }
  }
}
</style>
