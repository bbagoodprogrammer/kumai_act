<template>
  <div class="chione">
    <div class="header">
      <div class="time">
        <i class="clock" v-if="voteData.status == 2 || (voteData.status == 1 && voteData.ttl != 0)"></i>
        <strong v-if="voteData.status == 2">{{lang.chione_end}}</strong>
        <strong v-else-if="voteData.status == 1 && voteData.ttl != 0">{{lang.chione_tm}}{{surplusTime.minute}}:{{surplusTime.second}}</strong>
      </div>
      <span class="overVote" v-if="host == 1 && voteData.status == 1" @click="endVote()">{{lang.chione_over}}</span>
    </div>
    <div class="tltle">{{voteData.descriptions}}</div>
    <!-- <div class="chioneBtn"> -->
    <ul>
      <li v-for="(item,index) in voteData.options " :key="index" @click="setIndex(index)">
        <i :class="{act:voteState==3 && cIndex == index,black2:(voteState==1 && voteData.my_vote == index) || (voteState==4 && voteData.my_vote == index)}"></i>
        <div class="msg">
          <span class="txt" v-if="voteData.option_type == 1">{{item.txt}}</span>
          <span class="user" v-else> <img v-lazy="item.avatar" alt=""> <strong>{{item.nick}}</strong></span>
          <span class="ticket" v-if="voteData.results">{{voteData.results[index]}} {{lang.chione_nums}}</span>
        </div>
      </li>
    </ul>
    <!-- </div> -->
    <span class="commitBtn" :class="{act:cIndex!=null && voteState==3}" v-if="voteData.status == 2 ||voteState!=4" @click="commitChione()">{{voteData.status == 2?lang.chione_ended:lang.chione_ticket}}</span>
    <!-- <Loading /> -->
  </div>
</template>
<script>
import api from "../apis"
import { getUrlString } from "../utils"
import downTime from "../utils/downTime"
import store from "../store"
// import Loading from "../../components/Loading"
export default {
  //   components: { Loading },
  data() {
    return {
      list: [],
      rid: 0,
      vote_id: 0,
      voteData: {},
      host: null,
      surplusTime: {},
      cIndex: null,
      timer: null
    }
  },
  computed: {
    voteState() {
      if (this.voteData.status == 2 && this.voteData.my_vote != -1) {  //投票結束用戶有投票
        return 1
      } else if (this.voteData.status == 2 && this.voteData.my_vote == -1) {//投票結束用戶無投票
        return 2
      } else if (this.voteData.status == 1 && !this.voteData.results) { //投票進行，用戶未投票
        return 3
      } else if (this.voteData.status == 1 && this.voteData.results) { //投票進行，用戶已投票
        return 4
      }
    }
  },
  watch: {
    voteData(val) {
      if (val.status == 1 && val.ttl) {
        this.downTimeGo('time', val.ttl)
      }
    }
  },
  created() {
    this.host = getUrlString('host')
    this.init()
  },
  methods: {
    init() {
      api.voteMsg(this.rid, this.vote_id).then(res => {
        if (res.data.response_data) {
          this.voteData = res.data.response_data
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          //刷新頁面
          this.init()
        }
      }, 1000)
    },
    endVote() {
      store.commit("updateLoading", true)
      api.endVote(this.rid, this.vote_id).then(res => {
        store.commit("updateLoading", false)
        if (res.data.response_data) {
          this.closeWeb()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    setIndex(index) {
      if (this.voteState == 3) {
        this.cIndex = index
      }
    },
    commitChione() {
      if (this.cIndex != null && this.voteState == 3) {
        store.commit("updateLoading", true)
        api.commitChione(this.cIndex).then(res => {
          store.commit("updateLoading", false)
          if (res.data.response_data) {
            this.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.JSInterface.closeWeb();
      } else {
        closeWeb();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
html {
  background-color: transparent;
}
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 10000;
}
.chione {
  width: 7.5rem;
  height: 9.3rem;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 0.3rem 0.3rem 0 0;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  .header {
    height: 0.94rem;
    position: relative;
    box-sizing: border-box;
    font-size: 0.28rem;
    color: rgba(54, 54, 54, 1);
    padding: 0 0.3rem;
    line-height: 0.94rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .time {
      display: flex;
      align-items: center;
      .clock {
        margin-right: 0.1rem;
        width: 0.3rem;
        height: 0.3rem;
        background: url(../img/clock.png);
        background-size: 100% 100%;
      }
    }
    .overVote {
      font-size: 0.28rem;
      font-weight: bold;
      color: rgba(255, 31, 31, 1);
      position: absolute;
      right: 0.3rem;
    }
  }
  .header::before {
    display: block;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(236, 236, 236, 1);
  }
  .tltle {
    margin: 0.4rem 0;
    padding: 0 0.4rem;
    min-height: 0.53rem;
    font-weight: bold;
    line-height: 0.35rem;
    color: rgba(38, 38, 38, 1);
  }
  // .chioneBtn {
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  ul {
    flex: 1;
    min-height: 1.6rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.4rem;
    li {
      min-height: 1rem;
      color: rgba(62, 62, 62, 1);
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      > i {
        width: 0.31rem;
        height: 0.31rem;
        background: url(../img/cVoteIcon1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../img/cVoteIcon3.png);
          background-size: 100% 100%;
        }
        &.black2 {
          background: url(../img/cVoteIcon2.png);
          background-size: 100% 100%;
        }
      }
      .msg {
        margin-left: 0.25rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .txt {
          font-size: 0.32rem;
          color: rgba(62, 62, 62, 1);
        }
        .user {
          display: flex;
          align-items: center;
          img {
            width: 0.46rem;
            height: 0.46rem;
            border-radius: 50%;
          }
          strong {
            color: rgba(43, 43, 43, 1);
            margin-left: 0.14rem;
          }
        }
        .ticket {
          font-size: 0.28rem;
          color: rgba(199, 199, 199, 1);
        }
        span {
          display: block;
        }
      }
    }
  }
  // }
  .commitBtn {
    margin: 0.2rem auto 0.6rem;
    display: block;
    width: 3.7rem;
    height: 0.8rem;
    font-size: 0.32rem;
    line-height: 0.8rem;
    border-radius: 1rem;
    border: 0.01rem solid rgba(0, 0, 0, 0);
    text-align: center;
    background: rgba(230, 230, 230, 1);
    &.act {
      background: linear-gradient(
        313deg,
        rgba(252, 2, 116, 1) 0%,
        rgba(252, 82, 40, 1) 100%
      );
    }
  }
}
</style>
