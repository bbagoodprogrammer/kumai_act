<template>
  <div class="taskList">
    <div class="pointBody">
      <div class="people">
        <p class="title">{{lang.Invitation}}</p>
        <div class="peopleItem">
          <span v-for="(item,index) in praise_area" :key="index" @click="goPeoplePage(item.uid)">
            <img v-lazy="item.avatar" alt="" class="peopleImg">
          </span>
          <span v-for="(item,index) in (3 - praise_area.length)" :key="'item'+index" @click="share()">
            <img src="../assets/img/peopleItem.png" alt="" class="defaluteImg">
          </span>
        </div>
      </div>
      <div class="goPeople">
        <p class="title">{{lang.ComeOn}}</p>
        <div class="goTips" @click="assistance()"></div>
      </div>
    </div>
    <div class="rankListCon">
      <!-- <span class="close"></span> -->
      <div class="rankTitle">
        <span class="day">{{lang.dayTask}}</span>
        <span class="point">{{lang.GameB2}} <i></i></span>
        <span class="du">{{lang.duce}}</span>
      </div>
      <ul>
        <li v-for="(item,index,i) in daily_tasks" :key="index" :class="{act:i %2 == 0}">
          <span class="day">
            <div>{{rankName[item.task_name]}}
              <em class="num" v-if="item.task_list.length > 1">
                <strong v-for="(item2,index2) in item.task_list" :key="index2"> <i v-if="index2 !=0">-</i> <em :class="{success:item.finish_count >= item2.counts}">{{item2.counts}}</em></strong>
              </em>
              <!-- <img src="../assets/img/taskImg.png" alt="" v-if="item.task_name== 'sendSpecialGift'"> -->
            </div>
          </span>
          <!--  <em v-if="item.task_list.length > 1">*{{item.task_list.length}}</em>  -->
          <span class="point">{{item.send_b}}</span>
          <span class="du">
            <span class="state">
              <span v-show="item.finish_count <item.task_count" class="nosuc"><em :class="{col:item.finish_count>0}">{{item.finish_count}}</em>/{{item.task_count}}</span>
              <span v-if="item.finish_count == item.task_count" class="suc">{{lang.reached}} </span>
              <!-- <span v-else>未達成</span> -->
              <b v-if="item.task_list.length > 1" @click="showWhole(item.finish_count,item.task_list)">{{lang.lookWhole}}</b>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <transition name="slide">
      <div class="whole" v-if="wholePup">
        <div class="wholeCon">
          <span class="close" @click="closeWholePup()"></span>
          <div class="title">{{lang.nowTis}}</div>
          <div class="coinsBox">
            <i class="coins" v-for="(item,index) in 4" :key="index" :class="'coins'+index"></i>
          </div>
          <div class="intrgral">
            <span>0</span>
            <span v-for="(item,index) in nowTask_list" :key="index">
              {{item.send_counts}}
            </span>
          </div>
          <div class="line">
            <div class="actLine" :style="{width:lineWidth}"></div>
            <span v-for="(item,index) in 4" :key="index" :class="['item'+item,{act:(sucStep+1)>=index || index== 0}]">
            </span>
          </div>
          <div class="count">
            <span>0</span>
            <span v-for="(item,index) in nowTask_list" :key="index">
              {{item.counts}}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { globalBus } from "../utils/eventBus"
import getString from "../utils/getString"
import getAppUaInfo from "../utils/getAppUaInfo"
import lang from "../config/lang"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      rankName: {
        login: "- دخول إعلان النشاط",
        publicWork: "-نشر عمل عام يوميا",
        last_publicWork: "- لم تحذف أي عمل عام منشور أمس",
        praise: "- إعجاب 10 أعمال مختلفة",
        share: "- مشاركة النشاط خارج التطبيق",
        online: "- البقاء في غرفة الغناء أكثر من 15 دقيقة",
        kmic_start: "- ممارسة الغناء الواحد في أي غرفة الغناء",
        radio_online: "- البقاء في غرفة الدردشة أكثر من 15 دقيقة",
        sendBean: "- إهداء 100 فول",
        sendCoin: "- تصل قيمة الهدايا التالية التي تهديها إلى ",
        charge: "- تصل قيمة الشحن إلى",
      },
      wholePup: false,
      nowTask_list: [],
      finish_count: 0
    }
  },
  computed: {
    ...mapState(["daily_tasks", "praise_area", "groupsUserMsg", "send_praise"]),
    lineWidth() {
      return (this.finish_count / this.nowTask_list[this.nowTask_list.length - 1].counts) * 100 + '%'
    },
    sucStep() {
      for (var i = this.nowTask_list.length - 1; i >= 0; i--) {
        if (this.finish_count >= this.nowTask_list[i].counts) {
          return i
        }
      }
      return -1
    }
  },
  methods: {
    showWhole(finish_count, task_list) {
      this.nowTask_list = task_list
      this.finish_count = finish_count
      this.wholePup = true
    },
    closeWholePup() {
      this.wholePup = false
    },
    goPeoplePage(uid) {
      location.href = `uid:${uid}`
    },
    assistance() {  //跳转助力好友页
      globalBus.$emit('commonEvent', callback => {
        //合成数据存入本地
        let userState = {
          uid: this.groupsUserMsg[2].msg.uid,
          send_praise: this.send_praise
        }
        sessionStorage.setItem('userMsg', JSON.stringify(userState))
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      })
    },
    share() {
      globalBus.$emit('commonEvent', callback => {
        api.shareUpda()  //統計熱度
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        var data = {
          "share_title": "متعة! أنا أضرب غوفر سعيدا",
          "share_content": "تعال وساعدني في الفوز بنقود اللعبة!",
          "share_image": "http://activity.gosingapp.com/static_html/2019/numberOnePlayer/share.png",
          "link": `http://activity.gosingapp.com/static_html/2019/numberOnePlayer/index.html?uid=${this.groupsUserMsg[2].msg.uid}`,
          "image": "http://activity.gosingapp.com/static_html/2019/numberOnePlayer/share.png",
        }
        if (ios) {
          // if (window.share != undefined) {
          //   share(JSON.stringify(data))
          // } else {
          location.href = 'shareUserInfo://http://activity.gosingapp.com/static_html/2019/numberOnePlayer/index.html&shareText=bantu saya dapat koin main kok!  &userImg=http://activity.gosingapp.com/static_html/2019/numberOnePlayer/share.png&title=mantap！saya sedang pukul tikus utk undian';
          // }
        } else {
          // if (getAppUaInfo(ua).ver >= 670682) {
          //   javascript: JSInterface.share(JSON.stringify(data));
          // } else {
          javascript: JSInterface.share('http://activity.gosingapp.com/static_html/2019/numberOnePlayer/index.html?uid=' + this.groupsUserMsg[2].msg.uid + '', 'mantap！saya sedang pukul tikus utk undian', 'bantu saya dapat koin main kok! ', 'http://activity.gosingapp.com/static_html/2019/numberOnePlayer/share.png');
          // }
        }
      })
    }
  }
}
</script>
<style lang= "scss" scoped>
.pointBody {
  height: 1.93rem;
  padding: 0 0.33rem 0;
  display: flex;
  justify-content: center;
  .success {
    width: 2.25rem;
    .successTips {
      width: 0.99rem;
      height: 0.88rem;
      /* background: url(../assets/img/ewqreew.png); */
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  .people {
    width: 3.5rem;
    .peopleItem {
      height: 1.27rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      background: #ff863d;
      border-radius: 0.2rem;
      span {
        position: relative;
        .peopleImg {
          width: 0.86rem;
          height: 0.86rem;
          box-sizing: border-box;
          border-radius: 50%;
          border: 0.04rem solid rgba(248, 186, 76, 1);
        }
        .defaluteImg {
          width: 0.86rem;
          height: 0.86rem;
          background: url(../assets/img/peopleItem.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .goPeople {
    width: 2rem;
    margin-right: 0.35rem;
    .title {
      text-align: center;
      font-size: 83%;
      white-space: nowrap;
    }
    .goTips {
      width: 2rem;
      height: 1.27rem;
      background: url(../assets/img/goPeople.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  .title {
    height: 0.67rem;
    line-height: 0.67rem;
    color: #ffe178;
    font-size: 83%;
  }
}
.rankListCon {
  width: 7.07rem;
  overflow: hidden;
  border-radius: 0.2rem !important;
  margin: 0.19rem auto;
  position: relative;
  .rankTitle {
    height: 0.7rem;
    display: flex;
    align-items: center;
    color: #ffe178;
    text-align: center;
    background: #e96b25;
    font-size: 80%;
    .day {
      width: 4.7rem;
      text-align: right;
      padding-right: 0.14rem;
      color: #ffe178;
    }
    .point {
      width: 0.7rem;
    }
    .du {
      flex: 1;
    }
  }
  li {
    display: flex;
    min-height: 0.6rem;
    background: #f58c52;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff5c0;
    font-size: 80%;
    padding: 0.05rem 0;
    em {
      font-size: 80%;
    }
    &.act {
      background: #f57f3b;
    }
    .day {
      width: 4.7rem;
      text-align: right;
      padding-right: 0.14rem;
    }
    .point {
      width: 0.7rem;
    }
    .du {
      flex: 1;
      color: #fff;
      .nosuc {
        em {
          font-size: 100%;
          &.col {
            color: #fdff71;
          }
        }
      }
      .suc {
        color: #fdff71;
      }
      b {
        display: block;
        font-size: 80%;
        color: #fdff71;
        white-space: nowrap;
        text-decoration: underline;
      }
    }
  }
}
.whole {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .wholeCon {
    width: 5.49rem;
    padding: 0.35rem 0;
    /* height: 2.56rem; */
    background: rgba(234, 71, 78, 1);
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 120%;
      color: #ffefd7;
      text-align: center;
    }
    .close {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.9rem;
    }
    .coinsBox {
      width: 4.5rem;
      margin: 0.28rem 0.42rem 0 0;
      display: flex;
      justify-content: space-between;
      .coins {
        display: block;
        width: 0.4rem;
        height: 0.41rem;
        background: url(../assets/img/coins.png);
        background-size: 100% 100%;
        &.coins1 {
          margin: 0 0.13rem 0 0.2rem;
        }
        &.coins2 {
          margin: 0 -0.13rem 0 0;
        }
      }
    }
    .intrgral {
      margin: 0 auto 0;
      width: 4.29rem;
      display: flex;
      position: relative;
      color: #ffd08c;
      font-size: 80%;

      span {
        text-align: right;
      }
      span:nth-child(1) {
        width: 1.41rem;
      }
      span:nth-child(2) {
        width: 1.41rem;
      }
      span:nth-child(3) {
        width: 1.41rem;
      }
    }
    .count {
      margin: 0.28rem auto 0;
      width: 4.29rem;
      display: flex;
      position: relative;
      font-size: 80%;
      span {
        text-align: right;
      }
      span:nth-child(1) {
        width: 1.35rem;
      }
      span:nth-child(2) {
        width: 1.41rem;
      }
      span:nth-child(3) {
        width: 1.41rem;
        text-indent: 0.1rem;
      }
    }
    .line {
      width: 4.29rem;
      height: 0.16rem;
      background: rgba(159, 82, 0, 1);
      border: 0.02rem solid rgba(255, 201, 115, 1);
      border-radius: 0.1rem;
      margin: 0.23rem auto;
      position: relative;
      .actLine {
        height: 0.16rem;
        position: absolute;
        right: 0;
        top: 0;
        background: #ffad1e;
        z-index: 10;
        border-radius: 0.1rem;
      }
      span {
        display: block;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
        background: #ffd48a;
        position: absolute;
        top: 0rem;
        z-index: 10;
        &.act {
          background: #ffd08c;
        }
        &.item1 {
          left: 0;
        }
        &.item2 {
          left: 1.41rem;
        }
        &.item3 {
          left: 2.82rem;
        }
        &.item4 {
          right: 0rem;
        }
      }
    }
  }
}
</style>
