<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus" :class="{bg:astState!=1}">
      <span class="noAct" v-if="astState === 1">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <!-- 單身 -->
      <div class="noFriehd" v-if="astState === 4" @click="showSetFriend = true">
        選擇心動對象
      </div>
      <div class="actIng" v-if="astState === 3" :class="['rank' + 1]" @click="resetUserMsg()">
        <div class="userRank">99</div>
        <div class="userAv">
          <img v-lazy="" alt="" class="man">
          <img v-lazy="" alt="" class="woman">
        </div>
        <div class="userNick">
          <div class="man">嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎灌灌灌灌灌</div>
          <div class="woman">剛剛嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎嘎灌灌灌灌灌</div>
        </div>
        <div class="score">99999</div>
      </div>
      <!-- noFriend -->
      <div class="mask" v-show="showSetFriend">
        <transition name="slide">
          <div class="noFriend" v-show="showSetFriend">
            <div class="title">選擇心動對象</div>
            <ul>
              <li v-for="(item,index) in 10" :key="index">
                <div class="li_mask" v-if="inivit_index != index" @click="inivit_index = index"></div>
                <img src="../img/singUpImg.png" alt="">
                <div class="userMsg">
                  <div class="nick">xxxxxxxx</div>
                  <div class="score"><i></i><strong>9999</strong></div>
                </div>
                <div class="status">
                  <i v-if="inivit_index == index"></i>
                </div>
              </li>
            </ul>
            <div class="set" :class="{act:inivit_index != -1}">確定心動對象</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import api from "../api/apiConfig"
// import { globalBus } from '../utils/eventBus'
export default {
  data () {
    return {
      inivit_index: -1,
      showSetFriend: false
    }
  },
  computed: {
    ...mapState(['activity_status', 'owner', 'is_anchor']),
    astState () {
      return 4
      if (this.activity_status === 0) { //活动未开始
        return 1
      } else if (this.activity_status === 2) { //活动已结束
        return 2
      } else if (this.is_anchor) { //活动开始已报名
        return 3
      }
    },
  },
  methods: {
    resetUserMsg () {
      if (this.is_anchor) {
        this.vxc('reSetChange_floor')
      }
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.44rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.36rem;
      font-weight: 600;
      margin-top: 0.2rem;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      width: 100%;
      height: 1.3rem;
      margin-bottom: 0.07rem;
      display: flex;
      align-items: center;
      .userRank {
        width: 0.45rem;
        height: 0.45rem;
        margin: 0 0.81rem 0 0.57rem;
        background: url(../img/defaUserRank_bg.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.45rem;
        font-size: 0.26rem;
      }
      .userAv {
        width: 1.5rem;
        height: 0.92rem;
        position: relative;
        .man {
          width: 0.92rem;
          height: 0.92rem;
          border-radius: 50%;
          position: absolute;
        }
        .woman {
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 50%;
          position: absolute;
          left: 0.6rem;
          bottom: 0;
        }
      }
      .userNick {
        width: 1.95rem;
        > div {
          font-size: 0.26rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        flex: 1;
        text-align: center;
        font-size: 0.32rem;
        color: rgba(255, 240, 159, 1);
        font-weight: 500;
      }
    }
  }
  .noFriend {
    width: 7.2rem;
    height: 8.45rem;
    padding-top: 0.28rem;
    background: url(../img/inivitBg.png);
    background-size: 100% 100%;
    .title {
      height: 1.1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.34rem;
      color: rgba(188, 37, 104, 1);
    }
    ul {
      width: 5.92rem;
      height: 5rem;
      overflow-y: scroll;
      margin: 0.1rem auto;
      li {
        height: 1.14rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.09rem;
        position: relative;
        .li_mask {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          background: url(../img/inivit_mask.png);
          background-size: 100% 100%;
        }
        img {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          margin: 0 0.16rem 0 0.46rem;
        }
        .userMsg {
          width: 3rem;
          .nick {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .score {
            display: flex;
            align-items: center;
            margin-top: 0.04rem;
            i {
              width: 0.25rem;
              height: 0.22rem;
              background: url(../img/hear.png);
              background-size: 100% 100%;
              margin-right: 0.08rem;
            }
            strong {
              font-size: 0.24rem;
              color: rgba(255, 240, 159, 1);
            }
          }
        }
        .status {
          width: 0.46rem;
          height: 0.46rem;
          background: url(../img/invit_status.png);
          background-size: 100% 100%;
          margin-left: 0.6rem;
          i {
            display: block;
            width: 0.47rem;
            height: 0.42rem;
            background: url(../img/yes.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .set {
      width: 2.79rem;
      height: 0.74rem;
      background: url(../img/set_black.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      margin: 0.3rem auto 0;
      &.act {
        background: url(../img/singUpBtn.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
