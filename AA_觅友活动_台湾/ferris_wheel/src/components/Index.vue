<template>
  <div class="page pageIndex">
    <canvas id="bg"></canvas>
    <div class="header"></div>
    <div class="ruleTips" :class="{ty2:type == 2}">
      <span>兌換紀錄</span>
      <span @click="shouRulePup = true">規則獎勵</span>
      <span @click="showMailbox = true">信箱</span>
    </div>
    <div class="tab">
      <span class="tab1" :class="{act:type == 1}" @click="type =1">摩天輪</span>
      <span class="tab2" :class="{act:type == 2}" @click="type =2">召喚愛神</span>
    </div>
    <keep-alive>
      <component :is="type==1?'wheel':'turn'"></component>
    </keep-alive>
    <TabsScrollLoadList />
    <Footer />
    <div class="mask" v-show="shouRulePup">
      <transition name="slide">
        <Rule v-show="shouRulePup" />
      </transition>
    </div>
    <div class="mask" v-show="showMailbox">
      <transition name="slide">
        <Mailbox v-show="showMailbox" />
      </transition>
    </div>
    <!-- 报名弹窗 -->
    <div class="mask" v-show="singUpPup">
      <transition name="slide">
        <div class="singUp" v-if="singUpPup">
          <div class="title">歡迎來到真愛摩天輪</div>
          <img src="../img/singUpImg.png" alt="">
          <div class="singUp_tips">
            傳說中，摩天輪的每一個盒子都裝滿了
            幸福，每轉一圈，地球上幸福的cp又多
            了一隊
          </div>
          <div class="singUpBtn">
            進入摩天輪
          </div>
        </div>
      </transition>
    </div>
    <!-- 有邀请 -->
    <div class="mask" v-show="inivit_pup">
      <transition name="slide">
        <div class="inivit" v-if="inivit_pup">
          <div class="title">他想和你一起乘坐摩天輪</div>
          <p class="inivitTips">歡迎來到真愛摩天輪，與心動對象一起收集真愛值, 有機會乘坐摩天輪並獲得限量獎勵、指定戒指喔！</p>
          <p class="inivitTips2">以下是對妳心動的玩家，可從中選擇一個心動對象，一起參與～</p>
          <ul>
            <li v-for="(item,index) in 3" :key="index">
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
          <p class="inivitTips3">*請謹慎選擇自己的心動對象</p>
          <div class="set">
            <div class="ok">確定心動對象</div>
            <u class="chang">沒有心動對象</u>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import wheel from "./wheel"
import turn from "./turn"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import Rule from "./Rule"
import Mailbox from "./Mailbox"


export default {
  components: { wheel, turn, TabsScrollLoadList, Footer, Rule, Mailbox },
  data () {
    return {
      type: 1,
      singUpPup: false,
      inivit_pup: false,
      shouRulePup: false,
      showMailbox: false,
      inivit_index: 0
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: rgba(255, 156, 226, 1);
  #bg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .header {
    height: 3.44rem;
  }
  .ruleTips {
    position: absolute;
    z-index: 10;
    top: 10.92rem;
    right: 0;
    &.ty2 {
      top: 12rem;
    }
    span {
      display: block;
      width: 1.52rem;
      height: 0.53rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      color: rgba(222, 112, 185, 1);
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.53rem;
      margin-bottom: 0.08rem;
    }
  }
  .tab {
    padding: 0 0.46rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    span {
      width: 3rem;
      height: 0.63rem;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.28rem;
      font-size: 0.34rem;
      background: url(../img/tab2.png);
      background-size: 100% 100%;
      &.act {
        background: url(../img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUp {
    width: 6.11rem;
    height: 6.8rem;
    padding-top: 0.28rem;
    background: url(../img/singUp_bg.png);
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
    img {
      width: 4.16rem;
      height: 2.79rem;
      margin: 0 auto;
    }
    .singUp_tips {
      padding: 0 0.8rem;
      font-size: 0.26rem;
      color: rgba(176, 97, 101, 1);
      margin-top: 0.36rem;
    }
    .singUpBtn {
      width: 2.79rem;
      height: 0.74rem;
      background: url(../img/singUpBtn.png);
      background-size: 100% 100%;
      margin: 0.2rem auto 0;
      text-align: center;
      line-height: 0.74rem;
    }
  }
  .inivit {
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
    .inivitTips,
    .inivitTips2 {
      padding: 0 0.71rem;
    }
    .inivitTips {
      color: rgba(176, 97, 101, 1);
      font-size: 0.26rem;
    }
    .inivitTips2 {
      color: rgba(192, 48, 111, 1);
      font-size: 0.22rem;
      margin-top: 0.1rem;
    }
    .inivitTips3 {
      color: rgba(192, 48, 111, 1);
      font-size: 0.22rem;
      margin-top: 0.1rem;
      padding: 0 0.71rem;
    }
    ul {
      width: 5.92rem;
      height: 3.5rem;
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
      position: relative;
      .ok {
        width: 2.79rem;
        height: 0.74rem;
        background: url(../img/singUpBtn.png);
        background-size: 100% 100%;
        margin: 0.2rem auto 0;
        text-align: center;
        line-height: 0.74rem;
      }
      .chang {
        height: 0.24;
        font-size: 0.22rem;
        color: #9F40DB;
        position: absolute;
        bottom: 0.1rem;
        right: 0.7rem;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>