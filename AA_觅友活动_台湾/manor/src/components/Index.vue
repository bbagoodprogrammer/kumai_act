<template>
  <div class="page pageIndex">
    <RoolMsg />
    <div class="header">
      <div class="ruleTipsBox">
        <div class="ruleIcon">
          <em>攻略</em>
        </div>
        <div class="historyIcon" @click="showHistoryPup = true">
          <em>動態</em>
        </div>
      </div>
    </div>
    <LandsBox ref="landsBox" />
    <div class="tabsList">
      <div class="tabs">
        <div class="tabItem" v-for="(item,index) in tabs" :key="index" :class="[{act:type == index },'tab' + index]" @click="type = index">
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <component :is="tabs[type].com" />
    </div>
    <!-- 動態 -->
    <div class="mask" v-show="showHistoryPup">
      <transition name="slide">
        <HistoryTabsScrollLoadList v-if="showHistoryPup" />
      </transition>
    </div>
    <!-- 报名弹窗 -->
    <div class="mask" v-show="singUpPup">
      <transition name="slide">
        <div class="singUp" v-if="singUpPup">
          <div class="title">{{lang.index_singUpTitle}}</div>
          <img src="../img/singUpImg.png" alt="">
          <div class="singUp_tips">
            {{lang.index_singUpTips}}
          </div>
          <div class="singUpBtn" @click="singUp()">
            {{lang.index_join}}
          </div>
        </div>
      </transition>
    </div>
    <!-- 有邀请 -->
    <div class="mask" v-show="inivit_pup">
      <transition name="slide">
        <div class="inivit" v-if="inivit_pup">
          <i class="close" @click="inivit_pup =false"></i>
          <div class="title">{{lang.index_join}}</div>
          <p class="inivitTips">{{lang.index_inivitTips1}}</p>
          <ul>
            <li v-for="(item,index) in inviters" :key="index" :class="{act:inivit_index == index}" @click="inivit_index = index">
              <img v-lazy="item.avatar" alt="">
              <div class="userMsg">
                <div class="nick">{{item.nick}}</div>
                <div class="score"><i></i><strong>{{item.intimacy}}</strong></div>
              </div>
              <div class="status">
                <i v-if="inivit_index == index"></i>
              </div>
            </li>
          </ul>
          <div class="set">
            <div class="ok" @click="singUp(inviters[inivit_index].uid)">{{lang.index_ok}}</div>
            <!-- <u class="chang" @click="inivit_pup = false">{{lang.index_no}}</u> -->
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import LandsBox from "./LandsBox"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Commodity from "./Commodity"
import Task from "./Task"
import { mapState } from "vuex"
import { reg } from "../apis"
import RoolMsg from "./RoolMsg"
import HistoryTabsScrollLoadList from "./HistoryTabsScrollLoadList"
export default {
  components: { LandsBox, TabsScrollLoadList, Commodity, Task, RoolMsg, HistoryTabsScrollLoadList },
  data () {
    return {
      type: 0,
      singUpPup: false,
      inivit_pup: false,
      showHistoryPup: false,
      inivit_index: 0,
      tabs: [
        {
          name: '排行榜',
          com: 'TabsScrollLoadList'
        },
        {
          name: '商店',
          com: 'Commodity'
        }, {
          name: '任務',
          com: 'Task'
        }
      ]
    }
  },
  computed: {
    ...mapState(['owner', 'inviters'])
  },
  watch: {
    owner (val) {
      if (!val.reg && !this.inviters.length) {
        this.singUpPup = true
      }
    },
    inviters (val) {
      if (val.length && !this.owner.reg) {
        this.inivit_pup = true
      }
    }
  },
  methods: {
    singUp (uid) {
      reg(uid).then(res => {
        if (res.data.response_status.code == 0) {
          this.singUpPup = false
          this.inivit_pup = false
          this.toast(`成為莊園主！`)
          this.$store.dispatch('getInitInfo');
          this.$refs.landsBox.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: #6CC94F url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  .header {
    height: 3.81rem;
    position: relative;
    .ruleTipsBox {
      position: absolute;
      top: 2.85rem;
      right: 0.04rem;
      z-index: 5;
      .ruleIcon,
      .historyIcon {
        width: 1.39rem;
        height: 1.35rem;
        background: url(../img/ruleIcon.png);
        background-size: 100% 100%;
        position: relative;
        em {
          display: block;
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 0.1rem;
          color: #672A0B;
          font-size: 0.26rem;
        }
      }
      .historyIcon {
        background: url(../img/historyIcon.png);
        background-size: 100% 100%;
      }
    }
  }
  .tabsList {
    width: 7.35rem;
    height: 10.19rem;
    background: url(../img/tabsListBg.png);
    background-size: 100% 100%;
    margin: 0.82rem auto 0;
    position: relative;
    padding-top: 1rem;
    .tabs {
      width: 5.66rem;
      position: absolute;
      left: 0.92rem;
      top: -0.82rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tabItem {
        width: 1.6rem;
        height: 1.57rem;
        position: relative;
        strong {
          width: 100%;
          color: #672A0B;
          text-align: center;
          position: absolute;
          bottom: 0;
        }
        &.tab0 {
          background: url(../img/tabs/tab1.png);
          background-size: 100% 100%;
          &.act {
            background: url(../img/tabs/tab1_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab1 {
          background: url(../img/tabs/tab2.png);
          background-size: 100% 100%;
          &.act {
            background: url(../img/tabs/tab2_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab2 {
          background: url(../img/tabs/tab3.png);
          background-size: 100% 100%;
          &.act {
            background: url(../img/tabs/tab3_act.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .singUp {
    width: 6.83rem;
    height: 7.06rem;
    padding-top: 0.3rem;
    background: url(../img/singUp_bg.png);
    background-size: 100% 100%;
    .title {
      height: 0.8rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.4rem;
      color: #8E4908;
      text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
    }
    img {
      width: 4.02rem;
      height: 3.14rem;
      margin: 0.5rem auto 0;
    }
    .singUp_tips {
      color: #8E4908;
      text-align: center;
      padding: 0 0.8rem;
      font-size: 0.26rem;
      margin-top: 0.15rem;
    }
    .singUpBtn {
      width: 2.78rem;
      height: 0.84rem;
      background: url(../img/singUpBtn.png);
      background-size: 100% 100%;
      margin: 0.15rem auto 0;
      text-align: center;
      line-height: 0.84rem;
      color: #672A0B;
    }
  }
  .inivit {
    width: 6.8rem;
    height: 7.73rem;
    padding-top: 0.28rem;
    background: url(../img/singUp_bg.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.54rem;
      height: 0.54rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.15rem;
      top: 0.15rem;
    }
    .title {
      height: 0.9rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.4rem;
      color: #8E4908;
      text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
    }
    .inivitTips {
      margin-top: 0.4rem;
      padding: 0 0.71rem;
      font-size: 0.28rem;
      color: #703500;
    }
    ul {
      width: 5.92rem;
      height: 3.8rem;
      overflow-y: scroll;
      margin: 0.1rem auto;
      li {
        height: 1.14rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.09rem;
        position: relative;
        background: url(../img/pList.png);
        background-size: 100% 100%;
        // .li_mask {
        //   width: 100%;
        //   height: 100%;
        //   position: absolute;
        //   z-index: 1;
        //   background: url(../img/inivit_mask.png);
        //   background-size: 100% 100%;
        // }
        img {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          margin: 0 0.16rem 0 0.46rem;
        }
        .userMsg {
          width: 3rem;
          .nick {
            color: #703600;
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
              color: #ED9640;
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
      position: relative;
      .ok {
        width: 2.79rem;
        height: 0.74rem;
        background: url(../img/singUpBtn.png);
        background-size: 100% 100%;
        margin: 0.2rem auto 0;
        text-align: center;
        line-height: 0.74rem;
        color: #672A0B;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>