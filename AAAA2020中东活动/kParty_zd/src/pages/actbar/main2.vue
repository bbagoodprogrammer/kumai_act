<template>
  <div class="myParty">
    <p v-if="actList.length == 0" class="noData">لا يوجد معطيات الآن! يرجي تقديم الطلب أولا!</p>
    <ul>
      <li v-for="(item,index) in actList" :key="index" :class="[{max:item.apply_status != 0,black:item.status == 2},'list'+item.cover]">
        <!-- {{partyTitle[item.cover]}}- -->
        <div class=" title">{{item.them}}</div>
        <div class="actCon">
          <img v-lazy="item.users.avatar" alt="" class="userAv">
          <div class="userMsg">
            <div class="name">{{lang.firePeople}}<strong>{{item.users.nick}}</strong> </div>
            <div class="time">{{lang.date}}{{getDate(item.stime)}}</div>
            <div class="roomMsg">{{lang.kRoom}}{{item.rid}} </div>
          </div>
        </div>
        <div class="barBox">
          <div class="barTitle">{{lang.actBarTitle}}</div>
          <div class="bar">
            <span class="actBar" :style="{width:getBar(item.apply_status)}"></span>
            <i v-for="i in 3" :key="i" :class="[{act:i-1<=item.apply_status,black:i==3&&item.apply_status==3 },'spot'+i]">
              <em v-if="i==1">{{lang.actBarTips1}}</em>
              <em v-else-if="i==2">{{lang.actBarTips2}}</em>
              <em v-else-if="i==3 && item.apply_status ==3">{{lang.actBarTips3}}</em>
              <em v-else>{{lang.actBarTips4}}</em>
            </i>
          </div>
        </div>
        <div class="noTips" :class="{end:item.status == 2}" v-if="item.comments!=''">
          <!-- v-if="item.status!=2" -->
          <span>{{lang.actBarTips5}}{{item.comments}}</span>
          <!-- <span v-else>{{lang.actBarTips5}}</br>{{lang.actBarTips6}}</span> -->
        </div>
        <div class="setBtn" v-if="item.apply_status != 2 && item.fail_nums !=2" @click="changeMsg(item.id)">{{lang.actBarChang}}</div>
        <!-- <span class="singMsg" @click="showPeople(item.id)" v-if="item.apply_status == 2">{{lang.singUpDetil}}</span> -->
      </li>
    </ul>
    <!-- <div class="mask" v-show="showPeopleList">
      <transition name="slide">
        <div class="peopleList" v-show="showPeopleList">
          <i class="close" @click="closePeopleList()"></i>
          <h3>{{lang.singUpDetil}}</h3>
          <ul class="scrollable">
            <p v-if="!sList.length" class="noData">{{lang.singUpNoData}}~</p>
            <li @click="goPeople(item.uid)" v-for="(item,index) in sList" :key="index">
              <img v-lazy="item.avatar" alt="">
              <div class="userMsg">
                <div class="name">{{item.nick}}</div>
                <div class="uid">{{item.uid}}</div>
              </div>
              <div class="singUpMsg" @click.stop="showSingUpMsg(item)">{{lang.singUpMsg}}</div>
              <div class="sendMsg">{{lang.ms}}</div>
            </li>
          </ul>
        </div>
      </transition>
    </div> -->
    <!-- <div class="mask" v-show="showSingUp">
      <transition name="slide">
        <div class="singUp" v-if="showSingUp">
          <i class="close" @click="closeSingUpPup()"></i>
          <div class="con">
            <textarea class="singUpMsg" v-model="singUpTips.reg_desc" disabled></textarea>
            <div class="singUpMsg">{{singUpTips.reg_desc}}</div>
            <div class="singUpBtn" @click="goPeople(singUpTips.uid)">{{lang.ms}}</div>
          </div>
        </div>
      </transition>
    </div> -->
    <Loading />
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
import getString from "../../utils/getString"
export default {
  components: { Loading },
  data() {
    return {
      // partyTitle: [
      //   '',
      //   '狂歡趴踢',
      //   '家族聯誼',
      //   '生日派對',
      //   '巨星演唱會'
      // ],
      singUpPupMsg: {},
      showPeopleList: false,
      actList: [],
      sList: [],
      nowActId: 0,
      loaded: false,
      more: true,
      mainLoaded: false,
      mainMore: true,
      showSingUp: false,
      singUpTips: {}
    }
  },
  created() {
    //  document.title = '我的趴踢'
    api.getMyAct(0).then(res => {
      this.actList = res.data.response_data.list
    })
  },
  mounted() {
    window.addEventListener('scroll', this.mainOnScroll)
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    changeMsg(id) {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&id=${id}`
    },
    showSingUpMsg(tips) {
      this.singUpTips = tips
      this.showSingUp = true
    },
    closeSingUpPup() {
      this.showSingUp = false
    },
    goPeople(uid) {
      location.href = `uid:${uid}`
    },
    showPeople(id) {
      api.getPeopleList(id, 0).then(res => {
        this.nowActId = id
        this.sList = res.data.response_data.list
        this.showPeopleList = true
      })
    },
    closePeopleList() {
      this.showPeopleList = false
    },
    getBar(apply_status) {
      if (apply_status == 0) {
        return 0
      } else if (apply_status == 1) {
        return '50%'
      } else {
        return '100%'
      }
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
    },
    mainOnScroll() {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom) { //加載
        if (this.mainLoaded) return
        if (this.mainMore) {
          this.mainMore = false
          api.getMyAct(this.actList.length, 'more').then(res => {
            this.mainMore = true
            if (res.data.response_data.list.length === 0) {
              this.mainLoaded = true
            } else {
              this.actList = this.actList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getPeopleList(this.nowActId, this.sList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.sList = this.sList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
  }
}
</script>
<style lang="scss" >
body {
  background: #41177a;
  direction: rtl;
}
.noData {
  text-align: center;
  margin-top: 0.5rem;
}
.myParty {
  padding-top: 0.25rem;
  .noData {
    text-align: center;
    font-weight: 36rem;
    font-weight: 600;
  }
  > ul {
    width: 7.15rem;
    margin: 0 auto;
    li {
      height: 3.52rem;
      background: url(../../assets/img/minCar1.png);
      background-size: 100% 100%;
      position: relative;
      margin-bottom: 0.2rem;
      &.max {
        height: 4.51rem;
        background: url(../../assets/img/maxCar1.png);
        background-size: 100% 100%;
        .title {
          // height: 0.7rem;
          // line-height: 0.7rem;
        }
      }
      &.black {
        height: 4.51rem;
        background: url(../../assets/img/blackCarBg.png);
        background-size: 100% 100%;
        .title {
          height: 0.7rem;
          line-height: 0.7rem;
        }
      }
      .title {
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.32rem;
        text-align: center;
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
          width: 4.5rem;
          margin-right: 0.19rem;
          opacity: 0.6;
          // color: #d8beff;
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
              color: #fff;
            }
          }
          .time {
            font-size: 0.24rem;
          }
          .roomMsg {
            font-size: 0.22rem;
          }
        }
        .userTop {
          margin-top: 0.05rem;
          display: flex;
          align-items: center;
          .topImg {
            width: 1.4rem;
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
            margin-left: 0.15rem;
            i {
              display: block;
            }
          }
        }
      }
      .barBox {
        height: 1.2rem;
        padding-right: 0.7rem;
        .barTitle {
          font-size: 0.24rem;
          text-indent: -0.4rem;
        }
        .bar {
          width: 3.49rem;
          height: 0.04rem;
          background: #6119ab;
          border-radius: 0.02rem;
          position: relative;
          margin: 0.22rem 0 0 0.4rem;
          .actBar {
            height: 0.04rem;
            background: #ffefb6;
            border-radius: 0.02rem;
            position: absolute;
            top: 0;
            left: 0;
          }
          i {
            width: 0.1rem;
            height: 0.1rem;
            background: rgba(97, 25, 171, 1);
            border-radius: 50%;
            position: absolute;
            top: -0.03rem;
            &.act {
              width: 0.3rem;
              height: 0.3rem;
              background: url(../../assets/img/yes.png);
              background-size: 100% 100%;
              margin: -0.13rem 0 0 -0.1rem;
              em {
                color: #ffefb6;
                bottom: -0.55rem;
              }
            }
            &.over {
              background: #ffefb6;
              em {
                color: #ffefb6;
              }
            }
            &.black {
              width: 0.3rem;
              height: 0.3rem;
              background: url(../../assets/img/no.png);
              background-size: 100% 100%;
              margin: -0.13rem 0 0 -0.1rem;
              em {
                color: #850074;
                bottom: -0.55rem;
              }
            }
            em {
              display: flex;
              height: 0.6rem;
              align-items: center;
              justify-content: center;
              text-align: center;
              width: 1.3rem;
              font-size: 0.22rem;
              color: #6119ab;
              position: absolute;
              bottom: -0.65rem;
              left: -0.6rem;
              // white-space: nowrap;
            }
            &.spot1 {
              left: 0;
            }
            &.spot2 {
              left: 50%;
            }
            &.spot3 {
              left: 100%;
            }
          }
        }
      }
      .noTips {
        width: 4.2rem;
        margin: 0.1rem 0.39rem 0 0;
        font-size: 0.24rem;
        color: #bffffe;
        line-height: 0.3rem;
      }
      .singMsg {
        display: block;
        width: 1.96rem;
        height: 0.68rem;
        border: 0.02rem solid rgba(255, 239, 182, 1);
        border-radius: 0.34rem;
        text-align: center;
        line-height: 0.68rem;
        position: absolute;
        right: 0.38rem;
        bottom: 0.26rem;
      }
      .setBtn {
        display: block;
        width: 1.78rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: url(../../assets/img/followBtn1.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
        position: absolute;
        left: 0.18rem;
        bottom: 0.26rem;
      }
      &.list2 {
        background: url(../../assets/img/minCar2.png);
        background-size: 100% 100%;
        &.max {
          background: url(../../assets/img/maxCar2.png);
          background-size: 100% 100%;
        }
      }
      &.list3 {
        background: url(../../assets/img/minCar3.png);
        background-size: 100% 100%;
        &.max {
          background: url(../../assets/img/maxCar3.png);
          background-size: 100% 100%;
        }
      }
      &.list4 {
        background: url(../../assets/img/minCar4.png);
        background-size: 100% 100%;
        &.max {
          background: url(../../assets/img/maxCar4.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}

.peopleList {
  width: 7rem;
  height: 9.41rem;
  background: url(../../assets/img/singUpListBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    background: url(../../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.7rem;
  }
  h3 {
    height: 1.36rem;
    line-height: 1.36rem;
    text-align: center;
    font-size: 0.48rem;
    font-weight: bold;
  }
  ul {
    width: 6.52rem;
    height: 7.6rem;
    background: rgba(88, 16, 161, 1);
    border-radius: 0.2rem;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      height: 1.4rem;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border: 0.03rem solid rgba(190, 127, 255, 1);
        border-radius: 50%;
        margin-left: 0.14rem;
      }
      .userMsg {
        width: 2rem;
        margin-left: 0.15rem;
        font-size: 0.24rem;
        .uid {
          // color: #d8beff;
        }
      }
      .singUpMsg {
        width: 1.31rem;
        height: 0.5rem;
        border: 0.02rem solid rgba(255, 225, 106, 1);
        border-radius: 0.25rem;
        text-align: center;
        line-height: 0.5rem;
        margin-right: 0.16rem;
        font-size: 0.24rem;
        color: #ffe16a;
      }
      .sendMsg {
        display: block;
        width: 1.78rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: url(../../assets/img/followBtn1.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
      }
    }
    li:after {
      content: "";
      width: 5.73rem;
      height: 0.02rem;
      background: rgba(107, 39, 175, 1);
      border-radius: 0.01rem;
      position: absolute;
      bottom: 0;
      left: 0.4rem;
    }
  }
}
.singUp {
  width: 5.91rem;
  height: 4.53rem;
  background: url(../../assets/img/singUpBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    background: url(../../assets/img/close.png);
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
      display: block;
      width: 5.27rem;
      height: 2.5rem;
      background: rgba(88, 16, 161, 1);
      border-radius: 0.1rem;
      padding: 0.15rem 0.09rem 0;
      margin: 0.2rem auto;
      color: #d8beff;
      font-size: 0.24rem;
    }
    .singUpBtn {
      width: 2.74rem;
      height: 0.9rem;
      font-size: 0.32rem;
      background: url(../../assets/img/commitBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.9rem;
      margin: 0.16rem auto 0.53rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
