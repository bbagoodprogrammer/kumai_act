<template>
  <div class="myStandings">
    <div class="title">نجاحاتي <i class="questIcon" @click="tipsClick()"></i></div>
    <div class="userMsg">
      <img v-lazy="userinfo.avatar" alt="">
      <div class="msg">
        <div class="nick"><strong>{{userinfo.nick}}</strong> <em>درجة موسم السباق:</em> <i>Lv.{{star}}</i> </div>
        <div class="tips">
          <span> عدد أغاني PK هذا الموسم: {{nums}}</span>
          <!-- <span>支持率：<em>{{pop/10}}%</em></span> -->
        </div>
      </div>
    </div>
    <div class="preSong" v-for="(item,index) in newData" :key="index">
      <div class="preMsg">
        <span class="pre">العدد {{item.key}}
          <strong class="time dl">{{getDate(item.stime)}}-{{getDate(item.etime) }}</strong>
        </span>
        <span class="score" v-if="item.key != id || status!=1">النتيجة الحالية :<em class="dl">{{item.score>0?`+${item.score}`:item.score}}</em> </span>
      </div>
      <FightSong :list="item.hList" :set="item.key == id && status==1"></FightSong>
    </div>
    <div class="mask" v-show="showTips">
      <transition name="slide">
        <div class="lvTips" v-show="showTips">
          <i class="close" @click="tipsClick()"></i>
          <div class="con mh">
            <h3>نظام الدرجات</h3>
            <div class="tipsItem">
              <p>1. يتم قائمة ملك الأغاني لهذا الموسم وفقًا للترتيب ، أي الترتيب الإجمالي للنتائج التي تم الحصول عليها في جميع مراحل المسابقة ؛ إذا كان الترتيب نفسه ، فسيكون الترتيب الذي يحصل على عدد
                أكبر من الأصوات في المقدمة.</p>
              <p>2. في بداية كل موسم ، المستوى الافتراضي للاعب هو Lv.0. في كل مرة تحصل فيها المنافسة على نقطة واحدة ، ستزداد بمقدار مستوى واحد ، وسيتم تخفيض كل نقطة بمستوى واحد ، وقد يكون المستوى
                سالبًا.</p>
            </div>
            <p>في نهاية موسم السباق ، سيحصل أفضل 50 لاعبًا على جائزة شارة لمدة 30 يومًا:</p>
            <img src="../../assets/img/lvTab.png" alt="" class="lvTab">
          </div>
          <span class="ok" @click="tipsClick()">أعرف</span>
        </div>
      </transition>
    </div>
    <loading />
  </div>
</template>
<script>
import FightSong from "../../components/FightSong"
import loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
var getKey = function (arr, time) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].key == time) {
      return index;
    }
  }
  return -1;
};
export default {
  components: { FightSong, loading },
  data () {
    return {
      showTips: false,
      userinfo: {},
      star: 0,
      nums: 0,
      pop: 0,
      hList: [],
      ismore: true,
      loaded: false,
      id: null,
      status: null
    }
  },
  computed: {
    newData () {
      // let data = []
      // this.hList.forEach((element, index) => {
      //   if (data[element.aid]) {
      //     data[element.aid].list.push(element)
      //     data[element.aid].score += element.star
      //   } else {
      //     data[element.aid] = {
      //       pre: element.aid,
      //       stime: element.stime,
      //       etime: element.etime,
      //       list: [element],
      //       score: element.star
      //     }
      //   }
      // });
      var arr = [];
      for (let i = 0; i < this.hList.length; i++) {
        var times = this.hList[i].aid;
        var index = getKey(arr, times);
        if (index == -1) {
          arr.push({ key: times, hList: [this.hList[i]], stime: this.hList[i].stime, etime: this.hList[i].etime, score: this.hList[i].star })
        } else {
          arr[index].score += this.hList[i].star
          arr[index].hList.push(this.hList[i]);
        }
      }
      console.log(arr)
      return arr
    }
  },
  created () {
    this.status = sessionStorage.getItem('status')
    this.id = sessionStorage.getItem('id')
    console.log(this.id, this.status)
    document.title = 'نجاحاتي'
    api.myPushWorkHistory(0).then(res => {
      const { list, nums, pop, star, userinfo } = res.data.response_data
      this.userinfo = userinfo
      this.star = star
      this.nums = nums
      this.pop = pop
      this.hList = list
    })
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && this.ismore && !this.loaded) { //加載更多合併數組存入vuex
        this.ismore = false
        api.myPushWorkHistory(this.hList.length, 'more').then(res => {
          this.ismore = true
          let list = res.data.response_data.list
          if (list.length < 20) {
            this.loaded = true
          } else {
            this.hList = this.hList.concat(list)
          }
        })
      }
    },
    tipsClick () {
      this.showTips = !this.showTips
    },
    getDate (val) {
      return getDate(new Date(val * 1000), 1)
    }
  }
}
</script>
<style lang="scss">
.mh {
  height: 5.6rem;
  overflow-y: scroll;
}
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .myStandings {
    padding: 0.29rem 0 0;
    .title {
      text-align: center;
      color: rgba(255, 213, 86, 1);
      font-size: 0.48rem;
      font-weight: bold;
      .questIcon {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../../assets/img/standIcon.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.29rem;
        right: 0.26rem;
      }
    }
    .userMsg {
      display: flex;
      align-items: center;
      padding-right: 0.5rem;
      margin-top: 0.41rem;
      img {
        width: 1rem;
        height: rem;
        border-radius: 50%;
        margin-left: 0.2rem;
      }
      .msg {
        margin-left: 0.13rem;
        .nick {
          display: flex;
          align-items: center;
          strong {
            max-width: 2.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 0.4rem;
          }
          em {
            margin-left: 0.2rem;
            font-size: 0.24rem;
          }
          i {
            display: inline-block;
            vertical-align: bottom;
            font-size: 0.24rem;
            width: 0.81rem;
            height: 0.33rem;
            background: rgba(251, 162, 91, 1);
            border-radius: 0.1rem;
            text-align: center;
            line-height: 0.35rem;
            margin-left: 0.11rem;
          }
        }
        .tips {
          span {
            font-size: 0.24rem;
            margin-right: 0.2rem;
            em {
              color: rgba(251, 162, 91, 1);
              font-weight: bold;
            }
          }
        }
      }
    }
    .preSong {
      margin: 0.25rem auto 0.8rem;
      width: 6.86rem;
      .preMsg {
        padding: 0 0.22rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.26rem;
        margin-bottom: 0.12rem;
        .pre {
          display: flex;
        }
        .time {
          display: block;
          font-size: 0.26rem;
          margin-right: 0.15rem;
        }
        .score {
          display: flex;
          align-items: center;
          em {
            display: block;
            color: rgba(255, 197, 25, 1);
            font-weight: bold;
          }
        }
      }
    }
  }
  .lvTips {
    width: 4.91rem;
    height: 6.96rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    padding: 0.33rem 0.37rem;
    position: relative;
    .close {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.9rem;
    }
    h3 {
      font-size: 0.36rem;
      text-align: center;
    }
    .tipsItem {
      margin: 0.2rem 0 0.23rem;
    }
    p {
      color: #e5deff;
      font-size: 0.24rem;
      padding-right: 0.1rem;
    }
    .lvTab {
      width: 4.67rem;
      height: 2.33rem;
      margin-top: 0.1rem;
    }
    .ok {
      display: block;
      width: 2.24rem;
      height: 0.74rem;
      background: url(../../assets/img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      color: rgba(174, 72, 0, 1);
      margin: 0.2rem auto 0;
    }
  }
}
</style>
