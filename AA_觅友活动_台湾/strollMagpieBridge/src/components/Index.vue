<template>
  <div class="page pageIndex">
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <RoolMsg />
    <!-- <canvas id="bg"></canvas> -->
    <div class="header">
      <div class="man" :style="{left: (owner.score / target_score) * 2.24 -1.74  > 0.5?'0.5rem': (owner.score / target_score) * 2.24 -1.74+'rem'}"></div>
      <div class="woman" :style="{right:(owner.score / target_score) * 2.24 -1.74  > 0.5?'0.5rem': (owner.score / target_score) * 2.24 -1.74+'rem'}"></div>
      <div class="bannerBridge"></div>
      <div class="ruleTips">
        <!-- <span v-if="type == 2" @click="showHistory = true">{{lang.index_ruleTips1}}</span> -->
        <span @click="$router.push({name:'rule'})" class="tips1">{{lang.index_ruleTips2}}</span>
        <span @click="showMail = true" class="tips2"> <i class="mail_nums" v-if="mailNew"></i> {{lang.index_ruleTips3}}</span>
      </div>
    </div>
    <UserLiner />
    <div class="giftListIndex">
      <div class="titleItem" v-for="(item,index) in gift" :key="index">
        <img :src="item.image" alt="">
        <div class="titleName">
          <!-- {{lang.index_titleName}} -->
          <div class="name"><em>【{{item.name}}】</em></div>
          <!-- <div class="score">{{lang.index_titleScore}}{{item.score}}</div> -->
        </div>
      </div>
    </div>
    <TabsScrollLoadList ref="rank" />
    <Footer ref="footer" />
    <!-- 抽獎記錄 -->
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>

    <!-- 郵箱 -->
    <div class="mask" v-show="showMail">
      <transition name="slide">
        <MailDialog :visible.sync="showMail" v-if="showMail" />
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
          <div class="singUpBtn" @click="joinAct()">
            {{lang.index_join}}
          </div>
        </div>
      </transition>
    </div>
    <!-- 有邀请 -->
    <div class="mask" v-show="inivit_pup">
      <transition name="slide">
        <div class="inivit" v-if="inivit_pup">
          <div class="title">{{lang.index_inivitTitle}}</div>
          <p class="inivitTips">{{lang.index_inivitTips1}}</p>
          <p class="inivitTips2">{{lang.index_inivitTips2}}</p>
          <ul>
            <li v-for="(item,index) in inivitList" :key="index" :class="{act:inivit_index == index}">
              <div class="li_mask" v-if="inivit_index != index" @click="inivit_index = index"></div>
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
          <p class="inivitTips3">{{lang.index_setFriend}}</p>
          <div class="set">
            <div class="ok" @click="setCp()">{{lang.index_ok}}</div>
            <u class="chang" @click="inivit_pup = false">{{lang.index_no}}</u>
          </div>
        </div>
      </transition>
    </div>
    <!-- 解除CP -->
    <div class="mask" v-show="showRelieve">
      <transition name="slide">
        <div class="queryPup" v-if="showRelieve">
          <div class="title">{{lang.index_relieveTitle}}</div>
          <div class="tips" v-html="tipsArr[relieveType].replace('&',owner.cp_nick)">
          </div>
          <div class="btns" v-if="relieveType == 1">
            <u class="st1" @click="reject()">{{lang.index_reject}}</u>
            <span class="st2" @click="accept()">{{lang.index_accept}}</span>
          </div>
          <div class="btns center" v-else>
            <span class="st1" @click="showRelieve = false">{{lang.ok}}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import { mapState } from "vuex"
import { creatInivitFriend, acceptFriend, getAcceptableInvita, rejectRelieve_cj, giftList, joinAct } from "../apis"
import MailDialog from "./MailDialog"
import History from "./History"
import RoolMsg from "./RoolMsg"
import UserLiner from "./UserLiner"

export default {
  components: { History, RoolMsg, TabsScrollLoadList, Footer, MailDialog, UserLiner },
  data () {
    return {
      type: 1,
      singUpPup: false,
      inivit_pup: false,
      showMail: false,
      showHistory: false,
      inivit_index: 0,
      inivitList: [],
      showRelieve: false,
      relieveType: 1,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  computed: {
    ...mapState(['owner', 'popup', 'gift_list', 'mailNew', 'target_score']),
    tipsArr () {
      return this.lang.tipsArr
    },
    gift () {
      return this.lang.gift
    }
  },
  watch: {
    owner (val) {
      if (!val.is_reg && this.popup && this.popup.type == 'firstVisit') {
        this.singUpPup = true
      }
    },
    popup (val) {
      if (val) {
        if (val.type == 'cancelCouple') {  //解除CP申请
          this.relieveType = 1
          this.showRelieve = true
        } else if (val.type == 'dissolvedCp') {  //被解除CP
          this.relieveType = 2
          this.showRelieve = true
        } else if (val.type == 'invited') {  //成为CP邀请
          this.showInivitMeList()
        }
      }

    }
  },
  methods: {
    tabClick (val) {
      if (val == 2 && !this.gift_list.length) {
        giftList().then(res => {
          this.type = val
          this.vxc('setGift_list', res.data.response_data.list)
          this.vxc('setUser_coins', res.data.response_data.coins)
          this.vxc('setGo_count', res.data.response_data.go_count)
        })
      } else {
        this.type = val
      }

    },
    setCp () {
      acceptFriend(this.inivitList[this.inivit_index].id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.index_acceptSuc)
          this.inivit_pup = false
          this.$refs.rank.onRefresh('init')
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    showInivitMeList () {
      creatInivitFriend().then(res => {
        this.inivit_pup = true
        this.inivitList = res.data.response_data.list
      })
    },
    reject () { // 不同意
      rejectRelieve_cj(this.popup.data.mail_id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.rejectEd)
          this.showRelieve = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    accept () { //同意
      getAcceptableInvita(this.popup.data.mail_id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.index_relieveEd)
          this.$store.dispatch('getInitInfo');
          this.showRelieve = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    joinAct () {
      joinAct().then(res => {
        this.singUpPup = false
      })
    },
    onRefresh (val) {
      console.log(val)
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$store.dispatch('getInitInfo');
      this.$refs.rank.onRefresh()
    },
  }

}
</script>

<style lang="scss" scoped>
.pageIndex {
  overflow-x: hidden;
  #bg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .header {
    height: 6.6rem;
    position: relative;
    .man {
      width: 3.62rem;
      height: 3.33rem;
      background: url(../img/man.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.18rem;
      top: 2.98rem;
    }
    .woman {
      width: 3.62rem;
      height: 3.33rem;
      background: url(../img/woman.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0rem;
      top: 2.13rem;
    }
    .bannerBridge {
      width: 7.5rem;
      height: 2.62rem;
      background: url(../img/bannerBridge.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0rem;
      top: 4.54rem;
    }
  }
  .ruleTips {
    position: absolute;
    z-index: 10;
    top: 5.31rem;
    right: 0;
    &.ty2 {
      top: 12rem;
    }
    span {
      display: block;
      width: 1.52rem;
      height: 0.53rem;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.53rem;
      margin-bottom: 0.08rem;
      position: relative;
      &.tips1 {
        color: #045CC4;
        background: url(../img/ruleTips.png);
        background-size: 100% 100%;
      }
      &.tips2 {
        background: url(../img/ruleTips2.png);
        background-size: 100% 100%;
      }
    }
    .mail_nums {
      display: block;
      width: 0.24rem;
      height: 0.24rem;
      background: url(../img/mail_nums.png);
      background-size: 100% 100%;
      position: absolute;
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
      font-size: 0.34rem;
    }
    img {
      width: 4.85rem;
      height: 3.22rem;
      margin: 0.3rem auto 0;
    }
    .singUp_tips {
      padding: 0 0.8rem;
      font-size: 0.26rem;
      margin-top: 0.36rem;
    }
    .singUpBtn {
      width: 2.51rem;
      height: 0.74rem;
      background: url(../img/singUpBtn.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
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
    }
    .inivitTips,
    .inivitTips2 {
      padding: 0 0.71rem;
    }
    .inivitTips {
      font-size: 0.26rem;
    }
    .inivitTips2 {
      font-size: 0.22rem;
      margin-top: 0.1rem;
      color: #FCE278;
    }
    .inivitTips3 {
      font-size: 0.22rem;
      margin-top: 0.1rem;
      padding: 0 0.71rem;
      color: #FCE278;
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
        &.act {
          background: url(../img/pList.png);
          background-size: 100% 100%;
        }
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
        color: #FCE278;
        position: absolute;
        bottom: 0.1rem;
        right: 0.7rem;
      }
    }
  }
  .queryPup {
    width: 6.77rem;
    height: 4.34rem;
    padding-top: 0.28rem;
    background: url(../img/friend_set.png);
    background-size: 100% 100%;
    .title {
      height: 1.1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.34rem;
      color: #FCE278;
    }
    .tips {
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.6rem;
      font-size: 0.26rem;
    }
    .btns {
      padding: 0 0.97rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.center {
        justify-content: center;
      }
      u {
        color: rgba(212, 202, 250, 1);
      }
      span {
        width: 2.19rem;
        height: 0.74rem;
        text-align: center;
        line-height: 0.74rem;
        &.st2 {
          background: url(../img/st12.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .giftListIndex {
    width: 7.37rem;
    height: 4.17rem;
    padding-top: 1.02rem;
    background: url(../img/giftListBg.png);
    background-size: 100% 100%;
    margin: 0.78rem auto 0;
    position: relative;
    .titleItem {
      width: 6.5rem;
      height: 1.66rem;
      margin: 0 auto;
      background: url(../img/taskItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.11rem;
      position: relative;
      > img {
        width: 2.23rem;
        height: 1.44rem;
        margin-left: 0.11rem;
      }
      .titleName {
        flex: 1;
        margin-left: 0.3rem;
        .name {
          font-size: 0.28rem;
          color: #D721BF;
          em {
            font-size: 0.26rem;
          }
        }
        .score {
          color: #A583D3;
          font-size: 0.26rem;
        }
      }
      .status {
        width: 0.55rem;
        height: 0.55rem;
        background: url(../img/set.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.37rem;
        right: 0.3rem;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
  #refresh {
    display: block;
    width: 1rem;
    height: 1rem;
    position: fixed;
    right: 0.08rem;
    bottom: 1.5rem;
    background: url(../img/refresh.png) no-repeat;
    background-size: contain;
    transition: all 1s;
    text-indent: -999rem;
    z-index: 100;
  }
}
</style>