<template>
  <div class="tasks">
    <div class="sign_list">
      <div class="liner">
        <div class="dayItem" v-for="(item,index) in sign_list" :key="index" :class="[{today:item.sign > 0},'item' +index]">
          <div class="imgBox">
            <div class="imgMask" v-if="item.sign == 0"></div>
            <!-- v-if="item.goods.type=='seed'" -->
            <img :src="require(`../img/goods/${item.goods_id}.png`)" alt="" class="seed">
            <!-- <img :src="require(`../img/props/${item.goods_id}.png`)" alt="" v-else class="props"> -->
            <div class="nums">x{{item.num}}</div>
          </div>
          <div class="dayTips">{{item.today ==1?lang.today:`${lang.dayIndex.replace('%i',index + 1)}`}}</div>
        </div>
      </div>
      <div class="singIn" :class="{black:today_sign==1}" @click="sign()">{{today_sign==1?lang.geted:lang.get}}</div>
    </div>
    <ul class="taskList">
      <li v-for="(item,index) in tasks" :key="index">
        <div class="imgBox">
          <img :src="require(`../img/goods/${item.goods_id}.png`)" alt="" class="seed" v-if="item.goods.type=='seed'">
          <img :src="_images['fertilizer']" alt="" v-else-if="item.goods.id == 1">
          <img :src="require(`../img/props/${item.goods_id}.png`)" alt="" v-else class="props">
        </div>
        <div class="msg">
          <div class="name">{{item.title}} {{item.id!=7?`(${item.process}/${item.target})`:''}} </div>
          <div class="giftTips">{{lang.gift}}{{item.name}}x{{item.num}} <strong>,{{lang.giftCount.replace('%c',item.count)}}</strong></div>
        </div>
        <div class="status">
          <em v-if="!item.get && !item.finish" @click="doTask(item.id)">{{lang.doTask}}</em>
          <em v-else-if="!item.get && item.finish" @click="taskGet(item.id)">{{lang.get}}</em>
          <em v-else class="ed">{{lang.geted}}</em>
          <u class="inivitNums" v-if="item.id == 7" @click="showInivted()">{{lang.inivitNums.replace('%s',item.total)}}</u>
        </div>
      </li>
    </ul>
    <!-- 已邀請列表 -->
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="peoplePup" v-if="showShare">
          <h5 class="title">{{lang.inivitEd}}</h5>
          <i class="close" @click="closeSharePup()"></i>
          <p v-if="invitedList.length == 0" class="noData">{{lang.noData}}</p>
          <ul class="pList">
            <li v-for="(item,index) in invitedList" :key="index">
              <div class="listItem">
                <div class="imgBox">
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div class='name'>{{item.nick}}</div>
                  <div class="tips"><i></i>{{item.intimacy}}</div>
                </div>
                <div class="score">
                  <i></i>
                  <strong>{{item.score}}</strong>
                </div>
              </div>
            </li>
          </ul>
          <div class="inivitBtn" @click="showPelple()">
            {{lang.inivitBtn}}
          </div>
        </div>
      </transition>
    </div>
    <!-- 邀請列表 -->
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="peoplePup" v-if="showPeople">
          <i class="close" @click="closeSharePup()"></i>
          <h5 class="title">{{lang.inivitListTitle}}</h5>
          <p v-if="peopleList.length == 0" class="noData">{{lang.noData}}</p>
          <ul class="pList">
            <li v-for="(item,index) in peopleList" :key="index" @click="setList(item.uid)">
              <div class="listItem">
                <div class="inivitMask" v-if="actUidArr.indexOf(item.uid) == -1"></div>
                <div class="imgBox">
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div class='name'>{{item.nick}}</div>
                  <div class="tips"><i></i>{{item.intimacy}}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="inivitBtn" :class="{black:actUidArr.length == 0}" @click="invite()">
            {{lang.inivit}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { tasks, taskGet, invitedUsers, invitedList, invite, sign } from "../apis"
import { mapState } from "vuex"

export default {
  data () {
    return {
      tasks: {},
      sign_list: [],
      showShare: false,
      showPeople: false,
      invitedList: [],
      actUidArr: [],
      peopleList: [],
      today_sign: 1
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState(['owner']),
    _images () {
      return _images
    }
  },
  methods: {
    init () {
      tasks().then(res => {
        this.sign_list = res.data.response_data.sign_list
        this.tasks = res.data.response_data.tasks
        this.today_sign = res.data.response_data.today_sign
      })
    },
    sign () {
      if (this.today_sign != 1) {
        sign().then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(this.lang.singInSuc)
            this.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    setList (uid) {
      if (this.actUidArr.indexOf(uid) > -1) {
        this.actUidArr.splice(this.actUidArr.indexOf(uid), 1)
      } else {
        if (this.actUidArr.length >= 10) {
          this.actUidArr.shift().push(uid)
        } else {
          this.actUidArr.push(uid)
        }
      }
    },
    showInivted () {
      invitedUsers().then(res => {
        this.invitedList = res.data.response_data.list
        this.showShare = true
      })
    },
    showPelple () {
      invitedList().then(res => {
        this.peopleList = res.data.response_data.list
        this.showPeople = true
      })
    },
    invite () {
      if (this.actUidArr.length) {
        invite(this.actUidArr.join(',')).then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(this.lang.inivitSuc)
            this.showPeople = false
            this.showShare = false
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    closeSharePup () {
      this.showPeople = false
      this.showShare = false
      this.actUidArr = []
    },
    taskGet (id) {
      taskGet(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.getSuc)
          this.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    doTask (id) {
      if (this.owner.is_alt) { //小号拦截
        return
      }
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (id == 1 || id == 5) {  //派對頁
        try {
          if (ios) {
            sendJsData('app://mainPage?page_index=party&page_index_child=party_recom_room');
          } else {
            javascript: JSInterface.sendJsData(' app://mainPage?page_index=party&page_index_child=party_recom_room');
          }
        } catch (e) { }
      } else if (id == 2) { //配對
        try {
          if (ios) {
            sendJsData(' app://mainPage?page_index=pair&page_index_child=pair_pair');
          } else {
            javascript: JSInterface.sendJsData(' app://mainPage?page_index=pair&page_index_child=pair_pair');
          }
        } catch (e) { }
      } else if (id == 3 || id == 4) { //搭讪
        try {
          if (ios) {
            sendJsData('app://mainPage?page_index=pair&page_index_child=pair_accost');
          } else {
            javascript: JSInterface.sendJsData(' app://mainPage?page_index=pair&page_index_child=pair_accost');
          }
        } catch (e) { }
      } else if (id == 6) { //跳转第一个榜单
        this.$parent.type = 0
      } else if (id == 7) { //跳转第一个榜单
        this.showPelple()
      }
    }
  }
}
</script>

<style lang="scss">
.sign_list {
  height: 0.86rem;
  padding-top: 0.54rem;
  position: relative;
  .liner {
    width: 5.55rem;
    height: 0.08rem;
    background: url(../img/singInLiner.png);
    background-size: 100% 100%;
    margin-left: 0.08rem;
    position: relative;
    .dayItem {
      width: 0.82rem;
      height: 0.82rem;
      background: url(../img/linerItemBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.41rem;
      &.today {
        .dayTips {
          color: #fff;
        }
      }
      .imgBox {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .imgMask {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          z-index: 2;
          border-radius: 50%;
        }
        img {
          &.seed {
            width: 0.65rem;
            height: 0.7rem;
            margin: 0 auto;
          }
        }
        .nums {
          font-size: 0.28rem;
          text-shadow: #985A2F 1px 0 0, #985A2F 0 1px 0, #985A2F -1px 0 0,
            #985A2F 0 -1px 0;
          position: absolute;
          right: 0.15rem;
          bottom: 0;
        }
      }
      .dayTips {
        white-space: nowrap;
        font-size: 0.26rem;
        color: #703600;
        text-align: center;
      }
      &.item0 {
        left: 0;
      }
      &.item1 {
        left: 1.16rem;
      }
      &.item2 {
        left: 2.35rem;
      }
      &.item3 {
        left: 3.55rem;
      }
      &.item4 {
        left: 4.83rem;
      }
    }
  }
  .singIn {
    width: 1.44rem;
    height: 0.67rem;
    background: url(../img/singin.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.4rem;
    right: 0;
    text-align: center;
    line-height: 0.67rem;
    color: #AE2B1F;
    font-size: 0.28rem;
    &.black {
      color: #fff;
      background: url(../img/black2.png);
      background-size: 100% 100%;
    }
  }
}

.taskList {
  width: 7.13rem;
  height: 8.35rem;
  overflow-y: scroll;
  margin: 0.2rem auto 0;
  li {
    height: 1.6rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.05rem;
    background: url(../img/taskbg.png);
    background-size: 100% 100%;
    .imgBox {
      width: 1.05rem;
      height: 1.05rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.13rem;
      img {
        width: 0.65rem;
        height: 0.7rem;
      }
    }
    .msg {
      width: 4rem;
      .name {
        font-size: 0.28rem;
        color: #703600;
      }
      .giftTips {
        font-size: 0.26rem;
        color: #EC933B;
        strong {
          font-size: 0.26rem;
        }
      }
    }
    .status {
      text-align: center;
      em {
        display: block;
        width: 1.58rem;
        height: 0.67rem;
        line-height: 0.67rem;
        font-size: 0.28rem;
        color: #AE2B1F;
        background: url(../img/status.png);
        background-size: 100% 100%;
        &.ed {
          color: #fff;
          background: url(../img/black.png);
          background-size: 100% 100%;
        }
      }
      .inivitNums {
        font-size: 0.24rem;
        color: #1189DE;
        margin-top: -0.3rem;
      }
    }
  }
}
.noData {
  text-align: center;
  margin-top: 0.6rem;
  color: #8E4908;
}
.peoplePup {
  width: 6.83rem;
  height: 7.06rem;
  padding-top: 0.3rem;
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
    height: 0.8rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.4rem;
    color: #8E4908;
    text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
  }
  .pList {
    min-height: 3rem;
    max-height: 4rem;
    overflow-y: scroll;
    margin-top: 0.5rem;
    .listItem {
      width: 5.92rem;
      display: flex;
      align-items: center;
      height: 1.14rem;
      margin: 0 auto;
      background: url(../img/pList.png);
      background-size: 100% 100%;
      margin-bottom: 0.1rem;
      position: relative;
      .inivitMask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
      }
      .imgBox {
        width: 0.89rem;
        height: 0.89rem;
        margin: 0 0.19rem 0 0.47rem;
        position: relative;
        img {
          display: block;
          height: 100%;
          border-radius: 50%;
        }
      }
      .nick {
        width: 3rem;
        .name {
          max-width: 3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
          color: #703600;
        }
        .tips {
          font-size: 0.22rem;
          color: #ED9640;
          display: flex;
          align-items: center;
          margin-top: 0.15rem;
          i {
            width: 0.25rem;
            height: 0.22rem;
            background: url(../img/hear.png);
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
      }
      .shareBtn {
        width: 1.65rem;
        height: 0.65rem;
        // background: url(../img/boxBtn.png);
        // background-size: 100% 100%;
        margin-left: 0.7rem;
        color: rgba(126, 45, 0, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        em {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 0.22rem;
          text-align: center;
          line-height: 0.65rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        i {
          width: 0.33rem;
          height: 0.33rem;
          background: url(../img/sunIcon1.png);
          background-size: 100% 100%;
          margin-right: 0.15rem;
        }
        strong {
          color: #8E4908;
        }
      }
    }
  }
  .inivitBtn {
    width: 2.78rem;
    height: 0.84rem;
    background: url(../img/buy.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.84rem;
    margin: 0.2rem auto 0;
    color: #672A0B;
    &.black {
      color: #fff;
      background: url(../img/black3.png);
      background-size: 100% 100%;
    }
  }
}
</style>