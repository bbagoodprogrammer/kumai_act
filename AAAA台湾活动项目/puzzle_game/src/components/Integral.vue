<template>
  <div class="integral">
    <div class="nowIntegral">
      當前可用積分： <i>{{userMsg.integral?userMsg.integral:0}}</i> 分
      <em>(20積分/1次)</em>
    </div>
    <div class="luckHistory" @click="goHistory()"></div>
    <div class="earnPoints">
      <div class="title">
        賺積分<i @click="showIntegralPup()"></i>
      </div>
      <div class="pointBody">
        <div class="success">
          <p class="title">完成任務</p>
          <div class="successTips" @click="showTasks()"></div>
        </div>
        <div class="people">
          <p class="title">邀請好友助力</p>
          <div class="peopleItem">
            <!--  v-for="(item,index) in praise_area.length" :key="index" -->
            <span v-for="(item,index) in praise_area" :key="index" @click="goPeoplePage(item.uid)">
              <img v-lazy="item.avatar" alt="" class="peopleImg">
              <em>+{{item.score}}</em>
            </span>
            <span v-for="(item,index) in (3 - praise_area.length)" :key="'item'+index" @click="share()">
              <img src="../assets/img/peopleItem.png" alt="" class="defaluteImg">
            </span>
          </div>
        </div>
        <div class="goPeople">
          <p class="title">助力好友</p>
          <div class="goTips" @click="assistance()"></div>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="integralTips" v-show="showIntegral">
        <div class="integralTipsCon">
          <span class="close" @click="closePup()"></span>
          <h5 class="title">賺積分攻略</h5>
          <h6>完成任務</h6>
          <p>可通過每天完成特定任務獲得積分</p>
          <p>完成任務後，積分將自動到賬，且獲得積分每日不清0</p>
          <h6>助力好友 </h6>
          <p>1、每日最多助力3個好友贏積分，每日最多被3個好友助力贏積分</p>
          <p>2、幫1位好友贏積分1次，可為自己增加10積分，可為好友增加實際抽中的積分</p>
          <p>3、每人每天只可給同一位好友贏積分1次</p>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="taskList" v-show="showTaskList">
        <div class="rankListCon">
          <span class="close" @click="closeTaskList()"></span>
          <div class="rankTitle">
            <span class="day">每日挑戰</span>
            <span class="point">獎勵 <i></i></span>
            <span class="du">進度</span>
          </div>
          <ul>
            <li v-for="(item,index) in ranklist" :key="index">
              <span class="day">
                <div>{{rankName[item.task_name]}}
                  <em class="num" v-if="item.task_list.length > 1">
                    <strong v-for="(item2,index2) in item.task_list" :key="index2"> <i v-if="index2 !=0">-</i> <em :class="{success:item.finish_count >= item2.counts}">{{item2.counts}}</em></strong>
                  </em>
                  <img src="../assets/img/taskImg.png" alt="" v-if="item.task_name== 'sendSpecialGift'">
                </div>
              </span>
              <!--  <em v-if="item.task_list.length > 1">*{{item.task_list.length}}</em>  -->
              <span class="point">{{item.integral}}</span>
              <span class="du">
                <span class="state">
                  <span v-if="item.finish_count !== item.task_count && item.task_list.length >1 && item.step >0">已達到{{item.task_list[item.step- 1].counts}}</span>
                  <span v-show="item.finish_count <item.task_count" class="nosuc"><em>{{item.finish_count}}</em>/{{item.task_count}}</span>
                  <span v-show="item.finish_count == item.task_count" class="suc">已達成</span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { globalBus } from "../utils/eventBus"
import api from "../api/apiConfig"
import getString from "../utils/getString"
import APP from "../utils/openApp"
import getAppUaInfo from "../utils/getAppUaInfo"
export default {
  data() {
    return {
      showIntegral: false,
      showTaskList: false,
      ranklist: {},
      rankName: {
        login: "登入活動頁面",
        publicWork: "當天發佈一首公開作品（僅限獨唱、合唱、MV、MV合唱）",
        last_publicWork: "前一天發佈的任意一首獨唱、合唱、MV、MV合唱作品未刪除",
        praise: "給10個不同的作品點讚",
        share: "分享一首作品到站外",
        online: "當天在K房停留15分鐘及以上",
        kmic_start: "當天在任意K房上麥演唱1次",
        sendBean: "當天送出300金豆",
        charge: "當天累計儲值金幣達到",
        sendSpecialGift: "當天送出以下禮物金幣達到"
      }
    }
  },
  computed: {
    ...mapState(['userMsg', 'praise_area', 'isShare'])
  },
  methods: {
    showTasks() {
      if (this.isShare) {
        APP()
        return
      }
      api.getTask().then(res => {
        this.ranklist = res.data.response_data.daily_tasks
        this.showTaskList = true
      })
    },
    assistance() {
      globalBus.$emit('commonEvent', callback => {
        let regstr = getString('token')
        location.href = `./index4.html?token=${regstr}`
      })
    },
    goHistory() {
      if (this.isShare) {
        APP()
        return
      }
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    closeTaskList() {
      this.showTaskList = false
    },
    showIntegralPup() {
      this.showIntegral = true
    },
    closePup() {
      this.showIntegral = false
    },
    goPeoplePage(uid) {
      location.href = `uid:${uid}`
    },
    share() {
      globalBus.$emit('commonEvent', callback => {
        api.shareClick()  //統計熱度
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        var data = {
          "share_title": "好玩！我正在歡歌賺積分拼拼圖",
          "share_content": "快助力我贏積分吧！",
          "share_image": "http://activity.17sing.tw/static_html/2019/puzzle_game/share.jpg",
          "link": `http://activity.17sing.tw/static_html/2019/puzzle_game/index.html?uid=${this.userMsg.uid}`,
          "image": "http://activity.17sing.tw/static_html/2019/puzzle_game/share.jpg",
        }
        if (ios) {
          // if (window.share != undefined) {
          //   share(JSON.stringify(data))
          // } else {
          location.href = 'shareUserInfo://http://activity.17sing.tw/static_html/2019/puzzle_game/index.html&shareText=快助力我贏積分吧！&userImg=http://activity.17sing.tw/static_html/2019/puzzle_game/share.jpg&title=好玩！我正在歡歌賺積分拼拼圖';
          // }
        } else {
          if (getAppUaInfo(ua).ver > 670682) {
            javascript: JSInterface.share(JSON.stringify(data));
          } else {
            javascript: JSInterface.share('http://activity.17sing.tw/static_html/2019/puzzle_game/index.html?uid=' + this.userMsg.uid + '', '好玩！我正在歡歌賺積分拼拼圖', '快助力我贏積分吧！', 'http://activity.17sing.tw/static_html/2019/puzzle_game/share.jpg');
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.integral {
  position: relative;
  margin-top: -0.3rem;
  .nowIntegral {
    text-align: center;
    color: #ffe0aa;
    i {
      color: #fff;
    }
    em {
      display: block;
    }
  }
  .luckHistory {
    width: 2rem;
    height: 0.55rem;
    margin: 0.23rem auto;
    background: url(../assets/img/luckHistory.png);
    background-size: 100% 100%;
  }
  .earnPoints {
    width: 6.84rem;
    height: 2.41rem;
    margin: 0.36rem auto 0.45rem;
    background: url(../assets/img/earnPointsBg.png);
    background-size: 100% 100%;
    > .title {
      height: 0.68rem;
      padding-left: 0.7rem;
      font-size: 133%;
      display: flex;
      align-items: center;
      i {
        display: block;
        margin: 0.08rem 0 0 0.13rem;
        width: 0.4rem;
        height: 0.43rem;
        background: url(../assets/img/points.png);
        background-size: 100% 100%;
      }
    }
    .pointBody {
      height: 1.73rem;
      display: flex;
      .success {
        width: 2.25rem;
        .successTips {
          width: 0.99rem;
          height: 0.88rem;
          background: url(../assets/img/ewqreew.png);
          background-size: 100% 100%;
          margin: 0 auto;
        }
      }
      .people {
        width: 3rem;
        .peopleItem {
          display: flex;
          justify-content: space-between;
          margin-top: -0.05rem;
          padding: 0 0.1rem;
          span {
            position: relative;
            .peopleImg {
              width: 0.86rem;
              height: 0.86rem;
              box-sizing: border-box;
              border-radius: 50%;
              border: 0.04rem solid rgba(248, 186, 76, 1);
            }
            em {
              display: block;
              width: 0.61rem;
              height: 0.34rem;
              line-height: 0.34rem;
              background: url(../assets/img/peopleScore.png);
              background-size: 100% 100%;
              position: absolute;
              bottom: 0.04rem;
              left: 0.15rem;
              font-size: 80%;
              text-align: center;
            }
            .defaluteImg {
              width: 0.94rem;
              height: 0.94rem;
              background: url(../assets/img/peopleItem.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      .goPeople {
        flex: 1;
        .goTips {
          width: 0.86rem;
          height: 0.86rem;
          background: url(../assets/img/goPeople.png);
          background-size: 100% 100%;
          margin: 0 auto;
        }
      }
      .title {
        height: 0.67rem;
        line-height: 0.67rem;
        color: #ffe0aa;
        text-align: center;
      }
    }
  }
  .integralTips {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .integralTipsCon {
      width: 5.71rem;
      height: 4.77rem;
      padding: 0.33rem 0.21rem 0;
      background: rgba(243, 114, 110, 1);
      border: 0.04rem solid rgba(247, 185, 169, 1);
      border-radius: 0.1rem;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -40%);
      .title {
        font-size: 120%;
        text-align: center;
      }
      h6 {
        color: #ffe71b;
        text-align: left;
        margin-top: 0.3rem;
      }
      p {
        font-size: 80%;
      }
      .close {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
  .taskList {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .rankListCon {
      width: 6.35rem;
      background: #f3726e;
      border-radius: 0.1rem;
      border: 0.04rem solid rgba(247, 185, 169, 1);
      border-bottom: none;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -40%);
      // box-sizing: border-box;
      .close {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
        border: 0;
      }
      .rankTitle {
        height: 0.61rem;
        background: #f56025;
        display: flex;
        > span {
          display: block;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff8d7;
          border-bottom: 0.04rem solid rgba(247, 185, 169, 1);
          border-right: 0.04rem solid rgba(247, 185, 169, 1);
          &.point {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &.du {
            border-right: 0;
          }
          i {
            display: inline-block;
            margin-left: 0.05rem;
            width: 0.3rem;
            height: 0.3rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
        }
      }
      li {
        display: flex;
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0.61rem;
          text-align: center;
          font-size: 80%;
          border-bottom: 0.04rem solid rgba(247, 185, 169, 1);
          border-right: 0.04rem solid rgba(247, 185, 169, 1);
          padding: 0.05rem 0;
        }
        .num {
          display: block;
          i {
            margin-left: 0.05rem;
          }
          .success {
            color: #ffda0f;
          }
        }
      }
      .day {
        width: 3.09rem;
        padding: 0.05rem 0.17rem;
        > em {
          display: block;
          text-align: left;
        }
        img {
          width: 2.92rem;
          height: 0.65rem;
          margin-top: 0.05rem;
        }
      }
      .point {
        width: 1.09rem;
        color: #ffe0aa;
        em {
          font-size: 100%;
        }
      }
      .du {
        width: 1.83rem;
        border-right: 0;
        .nosuc {
          em {
            color: #ffda0f;
            font-size: 100%;
          }
        }
        .suc {
          color: #ffe0aa;
        }
        .state {
          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>