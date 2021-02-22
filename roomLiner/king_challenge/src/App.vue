<template>
  <div id="app">
    <div class="petsNum">
      <div class="time">
        距結束:{{surplusTime.hour}}:{{surplusTime.minute}}:{{surplusTime.second}}
      </div>
      <div class="user1" v-if="!user1.util">
        <span v-if="!mic_uid">暫無人上麥<br />快去排麥演唱吧</span>
        <div class="msg" v-else>
          <img :src="user2.avatar" alt="">
          <div class="noSingUp" v-if="!user2.reg">尚未報名活動</div>
          <div class="userMsg" v-else>
            <div class="rank">{{user2.rank}} <span v-if="user2.mic">演出中</span></div>
            <div class="score"><i></i>{{user2.score}}</div>
          </div>
        </div>
      </div>
      <div class="user1">
        <div class="msg">
          <img :src="user1.avatar" alt="">
          <div class="noSingUp" v-if="!user1.reg">尚未報名活動</div>
          <div class="userMsg" v-else>
            <div class="rank">{{user1.rank}}
              <span v-if="user1.task">已簽到</span>
              <span v-else class="no_s">未簽到</span>
            </div>
            <div class=" score"><i></i>{{user1.score}}</div>
          </div>
        </div>
      </div>
      <div class="user2" v-if="user1.util">
        <span class="lastScore">距離{{lvArr[user1.level]}}段位還差 <span>{{user1.util}}</span> </span>
      </div>
    </div>
  </div>
</template>

<script>

import { getDefaultData } from "./apis"
import store from "./store"
import { pageInited } from "./utils"
import downTime from './utils/downTime.js'
export default {
  data() {
    return {
      pets: {},
      myRank: {},
      appData: {
        rid: 0,
        uid: 0,
        fid: 0,
        public: 0,
        mic_uid: 0,
        mic_uids: [],
      },
      user1: {},
      user2: {},
      surplusTime: {},//日榜剩余时间
      lvArr: {
        3: '黃金',
        4: '鉑金',
        5: '鑽石'
      }
    };
  },
  watch: {
    mic_uid(newVal) {
      this.changeUser(newVal)
    },
  },
  computed: {
    mic_uid() {
      return this.appData.mic_uid || 0;
    },
  },
  mounted() {
    window.onAppData = res => {
      const data = JSON.parse(res || '{}');
      this.appData = data;
    };
    pageInited();
    this.changeUser(0)
  },
  methods: {
    changeUser(val) {
      getDefaultData(val).then(res => {
        console.log(res)
        this.user1 = res.data.response_data.uid
        this.user2 = res.data.response_data.uid1

        console.log(res.data.response_data.time)
        this.downTimeGo('time', res.data.response_data.time)
      })
    },
    downTimeGo(timeName, val) {
      console.log(val)
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },

  }
};
</script>

<style lang="scss">
#app {
  width: 1.6rem;
  height: 1.56rem;
  background: url(./img/bg.png);
  background-size: 100% 100%;
  padding-top: 0.74rem;
}
.petsNum {
  color: #881349;
  .time {
    height: 0.26rem;
    text-align: center;
    line-height: 0.26rem;
    font-size: 0.14rem;
    font-weight: 500;
  }
  .user1,
  .user2 {
    height: 0.65rem;
    font-size: 0.14rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .msg {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        border: 0.02rem solid #830943;
        margin-right: 0.06rem;
      }
    }
    .userMsg {
      .no_s {
        color: #666666;
        font-size: 0.1rem;
      }
      .score {
        display: flex;
        align-items: center;
        i {
          width: 0.17rem;
          height: 0.21rem;
          background: url(./img/fire.png);
          background-size: 100% 100%;
          margin-right: 0.05rem;
        }
      }
    }
  }
  .lastScore {
    padding: 0 0.1rem;
    font-size: 0.18rem;
    font-weight: 500;
    span {
      font-size: 0.2rem;
    }
  }
  .user1::before {
    content: "";
    display: block;
    width: 1.26rem;
    height: 0.02rem;
    background: #830943;
    position: absolute;
    bottom: 0;
    left: 0.2rem;
  }
}
</style>