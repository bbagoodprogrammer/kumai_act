<template>
  <div class="actList">
    <p class="noData" v-if="list.length == 0">{{lang.noActData}}</p>
    <ul>
      <li @click="gokRoom(item.rid)" v-for="(item,index) in list" :key="index" :class="'list'+item.cover">
        <!-- {{partyTitle[item.cover]}}- {{partyTitle[item.cover]}} -->
        <div class="title titleMax1" v-if="item.is_official == 0">{{item.them}}</div>
        <div class="title flex" v-else><span class="titleMax2">{{item.them}}</span> <span class="titieTips">{{lang.officialAct}}</span> </div>
        <div class="actCon">
          <img v-lazy="item.avatar" alt="" class="userAv" @click.stop="goUser(item.uid)">
          <div class="userMsg">
            <div class="name">{{lang.firePeople}}<strong>{{item.nick}}</strong> </div>
            <div class="roomMsg">{{lang.kRoom}}{{item.rid}} <span>{{lang.date}}{{getDate(item.stime)}}</span> </div>
            <div class="userTop">
              <div class="topImg">
                <img v-lazy="item2.avatar" v-for="(item2,index2) in item.user" :key="index2" @click.stop="goUser(item2.uid)" />
              </div>
              <span v-if="item.status == 1">{{item.nums}}{{lang.peopleTips}} <i></i></span>
              <span v-else>{{item.nums}}شخص تم المتابعة</span>
            </div>
          </div>
        </div>
        <div class="actBtm">
          <!-- <span @click.stop="showSingUpPup(item.id)" v-if="item.is_reg == 2"> {{lang.singUp}}</span> -->
          <!-- <span>分享</span> -->
          <span @click.stop="showActMsgPup(item.id,index)">{{lang.actDetil}}</span>
        </div>
        <div class="followBtn">
          <span v-if="!item.attension" @click.stop="attention(item.id,index)">{{lang.attention}}</span>
          <span v-else @click.stop="attention(item.id,index)">{{lang.attention2}}</span>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="showActMsg">
      <transition name="slide">
        <div class="actMsg" v-if="showActMsg" :class="'list'+showParty.cover">
          <i class="carType"></i>
          <i class="close" @click="closeActMsgPup()"></i>
          <h5>{{showParty.them}}</h5>
          <div class="time"><span>نوع الغرفة: <em>{{showParty.type==1?'غرفة الغناء':'غرفة الدردشة'}}</em></span> {{getDate(showParty.stime)}} </div>
          <div class="room">
            <strong>{{lang.rid}}<em>{{showParty.rid}}</em> </strong>
            <!-- <span @click="showSingUpPup(showParty.id)" v-if="showParty.is_reg ==2">{{lang.singUp}}</span> -->
          </div>
          <div class="msgCon">
            <div class="actH">
              <h6>{{lang.actTips}}</h6>
              <textarea class="msgTips" disabled v-model="showParty.p_desc"></textarea>
            </div>
            <div class="actH">
              <h6 v-show="showParty.prize!=''">{{lang.actGifts}}</h6>
              <textarea class="msgGift" disabled v-model="showParty.prize" v-if="showParty.prize!=''"></textarea>
            </div>
            <div class="actPeople">
              {{lang.firePeople}} <strong>{{showParty.users.nick}}</strong> <img v-lazy="showParty.users.avatar" alt="" @click.stop="goUser(showParty.uid)">
            </div>
          </div>
          <div class="btmBox">
            <span v-if="!showParty.attension" @click.stop="attention(showParty.id,showPartyIndex)">{{lang.attention}}</span>
            <span v-else @click.stop="attention(showParty.id,showPartyIndex)">{{lang.attention2}}</span>
            <span @click="gokRoom(showParty.rid)">{{lang.goRoom}}</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- <div class="mask" v-show="showSingUp">
      <transition name="slide">
        <div class="singUp" v-if="showSingUp">
          <i class="close" @click="closeSingUpPup()"></i>
          <div class="con">
            <div class="title">{{lang.singUpTips1}}</div>
            <div class="msg">{{lang.singUpTips2}}</div>
            <div class="singUpMsg">
              <textarea maxlength="100" v-model="singUpMsg" :placeholder="lang.singUpTips3"></textarea>
              <span><em>{{singUpMsg.length}}</em>/100</span>
            </div>
            <div class="singUpBtn" @click="commitSingUp()">{{lang.singUpTipsCom}}</div>
          </div>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>
import { mapState } from "vuex"
import getDate from "../utils/getDate"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
      showActMsg: false,
      singUpMsg: '',
      showSingUp: false,
      // partyTitle: [
      //   '',
      //   '狂歡趴踢',
      //   '家族聯誼',
      //   '生日派對',
      //   '巨星演唱會'
      // ],
      showParty: {},
      showPartyIndex: 0,
      partyId: 0,
      mainLoaded: false,
      mainMore: true
    }
  },
  computed: {
    ...mapState(['list'])
  },
  mounted() {
    window.addEventListener('scroll', this.mainOnScroll)
  },
  methods: {
    mainOnScroll() {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom) { //加載
        if (this.mainLoaded) return
        if (this.mainMore) {
          this.mainMore = false
          api.getList(this.list.length, 'more').then(res => {
            this.mainMore = true
            if (res.data.response_data.list.length === 0) {
              this.mainLoaded = true
            } else {
              this.vxc('addActList', res.data.response_data.list)
            }
          })
        }
      }
    },
    gokRoom(rid) {
      location.href = `rid:${rid}`
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    showSingUpPup(id) {
      this.partyId = id
      this.showSingUp = true
    },
    closeSingUpPup() {
      this.showSingUp = false
    },
    showActMsgPup(id, index) {
      api.getActData(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.showParty = res.data.response_data.data
          this.showActMsg = true
          this.showPartyIndex = index
          this.ModalHelper.afterOpen()
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    },
    // commitSingUp() {
    //   globalBus.$emit('commonEvent', () => {
    //     if (this.singUpMsg == '') {
    //       this.vxc('setToast', {
    //         msg: `請填寫報名信息！`
    //       })
    //     } else {
    //       api.singUp(this.partyId, this.singUpMsg).then(res => {
    //         if (res.data.response_status.code == 0) {
    //           this.showSingUp = false
    //         } else {
    //           this.vxc('setToast', {
    //             msg: res.data.response_status.error
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    closeActMsgPup() {
      this.showActMsg = false
      this.ModalHelper.beforeClose()
    },
    attention(id, index) {
      globalBus.$emit('commonEvent', () => {
        api.attention(id).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setListAttention', index)
            if (this.showParty.id) {
              this.showParty.attension = !this.showParty.attension
            }
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      })
    },
    getDate(time) {
      let partyTime = this.getDayName(time * 1000)
      if (partyTime == 0) {
        return `اليوم ${getDate(new Date(time * 1000), 1)}`
      } else {
        return `${getDate(new Date(time * 1000), 2)}`
      }
    },
    getDayName(d) {
      var td = new Date();
      td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
      var od = new Date(d);
      od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
      var xc = (od - td) / 1000 / 60 / 60 / 24;
      return xc
    }
  }
}
</script>
<style lang="scss" scoped>
.actList {
  width: 7.26rem;
  margin: 0 auto;
  padding-bottom: 2rem;
  .noData {
    text-align: center;
    margin-top: 1rem;
    font-weight: 500;
  }
  li {
    height: 3.01rem;
    background: url(../assets/img/list1.png);
    background-size: 100% 100%;
    margin-bottom: 0.1rem;
    position: relative;
    .title {
      height: 0.6rem;
      line-height: 0.7rem;
      font-size: 0.32rem;
      text-indent: 0.34rem;
      &.flex {
        display: flex;
        align-items: center;
      }
      &.titleMax1 {
        max-width: 7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .titleMax2 {
        max-width: 5.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .titieTips {
        width: 1.5rem;
        height: 0.4rem;
        background: rgba(122, 41, 205, 1);
        border-radius: 0.15rem;
        display: inline-block;
        font-size: 0.22rem;
        line-height: 0.4rem;
        text-align: center;
        white-space: nowrap;
        margin-right: 0.12rem;
        text-indent: 0;
      }
    }
    .actCon {
      height: 1.68rem;
      display: flex;
      align-items: center;
      .userAv {
        width: 1.2rem;
        height: 1.2rem;
        border: 0.03rem solid rgba(190, 127, 255, 1);
        border-radius: 50%;
        margin-right: 0.31rem;
      }
      .userMsg {
        // width: 3.5rem;
        margin-right: 0.19rem;
        .name {
          height: 0.4rem;
          font-size: 0.22rem;
          display: flex;
          strong {
            display: block;
            font-size: 0.24rem;
            font-weight: 500;
            max-width: 3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .roomMsg {
          font-size: 0.22rem;
          span {
            display: block;
          }
        }
      }
      .userTop {
        margin-top: 0.05rem;
        display: flex;
        align-items: center;
        .topImg {
          // width: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 0.4rem;
            height: 0.4rem;
            border: 0.02rem solid rgba(255, 221, 147, 1);
            border-radius: 50%;
          }
        }
        span {
          color: #ffdd93;
          font-size: 0.22rem;
          margin-right: 0.15rem;
          display: flex;
          align-items: center;
          i {
            display: block;
            width: 0.2rem;
            height: 0.21rem;
            background: url(../assets/img/ing.png);
            background-size: 100% 100%;
            margin-right: 0.09rem;
          }
        }
      }
    }
    .actBtm {
      display: flex;
      align-items: center;
      position: absolute;
      left: 0.3rem;
      bottom: 1.3rem;
      span {
        display: block;
        // width: 1.26rem;
        padding: 0 0.15rem;
        height: 0.5rem;
        border: 0.02rem solid rgba(255, 225, 106, 1);
        border-radius: 0.25rem;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: #ffe16a;
        white-space: nowrap;
        // margin-right: 0.12rem;
      }
    }
    .followBtn {
      width: 1.78rem;
      height: 0.64rem;
      background: url(../assets/img/followBtn1.png);
      background-size: 100% 100%;
      font-size: 0.26rem;
      font-weight: 500;
      text-align: center;
      line-height: 0.64rem;
      position: absolute;
      left: 0.26rem;
      bottom: 0.18rem;
      &.black {
        background: url(../assets/img/followBtn2.png);
        background-size: 100% 100%;
      }
    }
    &.list2 {
      background: url(../assets/img/list2.png);
      background-size: 100% 100%;
    }
    &.list3 {
      background: url(../assets/img/list3.png);
      background-size: 100% 100%;
    }
    &.list4 {
      background: url(../assets/img/list4.png);
      background-size: 100% 100%;
    }
  }
  .actMsg {
    width: 6.01rem;
    height: 6.22rem;
    padding-top: 0.3rem;
    background: url(../assets/img/actMsg1.png);
    background-size: 100% 100%;
    position: relative;
    .carType {
      display: block;
      width: 1.1rem;
      height: 1.1rem;
      background: url(../assets/img/type1.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.85rem;
      left: 2.5rem;
    }
    h5 {
      text-align: center;
      font-size: 0.28rem;
      font-weight: bold;
      height: 0.65rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .time {
      font-size: 0.24rem;
      text-align: center;
      span {
        margin-left: 0.15rem;
      }
    }
    .room {
      height: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.15rem;
      strong {
        font-size: 0.3rem;
        font-weight: 600;
        margin-right: 0.26rem;
        // em {
        //   font-size: 0.3rem;
        //   font-weight: 600;
        // }
      }
      span {
        display: block;
        width: 1.26rem;
        height: 0.5rem;
        border: 0.02rem solid rgba(255, 225, 106, 1);
        border-radius: 0.25rem;
        text-align: center;
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: #ffe16a;
        margin-right: 0.12rem;
      }
    }
    .msgCon {
      // margin-top: 0.15rem;
      height: 4.18rem;
      padding: 0.16rem 0.21rem;
      .actH {
        height: 1.5rem;
      }
      h6 {
        font-size: 0.26rem;
        margin: 0.16rem 0 0.08rem 0;
      }
      p {
        font-size: 0.24rem;
        color: #bffffe;
      }
      .msgTips,
      .msgGift {
        width: 5.36rem;
        height: 1rem;
        font-size: 0.24rem;
        color: #bffffe;
        word-break: break-all;
        overflow-y: scroll;
        margin-left: 0.2rem;
        -webkit-overflow-scrolling: touch;
        -webkit-overflow-scrolling: auto;
      }
    }
    .actPeople {
      height: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.22rem;
      color: #f8a5ff;
      strong {
        font-size: 0.24rem;
        margin-left: 0.2rem;
        color: #fff;
        display: block;
        max-width: 1.6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      img {
        width: 0.8rem;
        height: 0.8rem;
        border: 0.03rem solid rgba(165, 255, 252, 1);
        border-radius: 50%;
        margin-left: 0.17rem;
      }
    }
    .btmBox {
      display: flex;
      justify-content: space-between;
      margin-top: 0.27rem;
      padding: 0 0.55rem;
      span {
        display: block;
        width: 1.78rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: url(../assets/img/followBtn1.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
      }
    }
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    &.list2 {
      background: url(../assets/img/actMsg2.png);
      background-size: 100% 100%;
      .carType {
        background: url(../assets/img/type2.png);
        background-size: 100% 100%;
      }
    }
    &.list3 {
      background: url(../assets/img/actMsg3.png);
      background-size: 100% 100%;
      .carType {
        background: url(../assets/img/type3.png);
        background-size: 100% 100%;
      }
    }
    &.list4 {
      background: url(../assets/img/actMsg4.png);
      background-size: 100% 100%;
      .carType {
        background: url(../assets/img/type4.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUp {
    width: 5.91rem;
    height: 4.53rem;
    background: url(../assets/img/singUpBg.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    .con {
      padding-top: 0.3rem;
      .title {
        text-align: center;
      }
      .msg {
        font-size: 0.24rem;
        text-align: center;
        margin-top: 0.07rem;
      }
      .singUpMsg {
        margin: 0.15rem auto;
        width: 5.57rem;
        position: relative;
        span {
          width: 0.8rem;
          text-align: center;
          position: absolute;
          bottom: 0.08rem;
          right: 0.09rem;
          font-size: 0.24rem;
          em {
            color: #dba9c3;
            font-size: 0.24rem;
          }
        }
        textarea {
          width: 5.57rem;
          height: 1.87rem;
          background: rgba(88, 16, 161, 1);
          border-radius: 0.1rem;
          padding: 0.15rem 0.09rem 0;
          color: #d8beff;
          font-size: 0.24rem;
        }
        textarea::-webkit-input-placeholder {
          color: #d8beff;
          font-size: 0.24rem;
        }
      }
      .singUpBtn {
        width: 2.74rem;
        height: 0.9rem;
        font-size: 0.32rem;
        background: url(../assets/img/commitBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.9rem;
        margin: 0.16rem auto 0.53rem;
      }
    }
  }
}
</style>
