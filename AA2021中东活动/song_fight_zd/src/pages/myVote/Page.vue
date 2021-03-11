<template>
  <div class="myVote">
    <div class="title">تصويتي <i class="questIcon" @click="tipsClick()"></i>
    </div>
    <div class="userMsg">
      <img v-lazy="userinfo.avatar" alt="">
      <div class="msg">
        <!-- <em>Lv.{{star}}</em> -->
        <div class="nick"><strong>{{userinfo.nick}}</strong> </div>
        <div class="tips">
          <span>التصويت التراكمي لمجموعة <em> {{dat.all}} </em></span>
          <span>إجمالي معدل الفوز في التصويت: <em> {{dat.right}}٪ </em></span>
        </div>
      </div>
    </div>
    <div class="preResTime" v-for="(item,index) in list " :key="index">
      <div class="timeTips">
        <p class="noRes" v-if="item.result == 0">{{getDate(item.etime,2)}} إعلان نتائج التصويت</p>
        <p v-else>
          <span class="time">{{getDate(item.stime,1)}}-{{getDate(item.etime,1)}}</span>
          التصويت لمجموعة {{item.counts}} ، معدل فوز التصويت {{item.right}}٪
          <span v-if="item.title != 0"> ، احصل على {{err [item.title]}} اللقب </span>
          <strong v-if="item.eight > 0"> صوت 8 أصوات متتالية ل{{item.eight}} مرات وفز في التصويت</strong>
        </p>
      </div>
      <VoteSongList :list="item.list" :index="index" v-if="item.list" />
    </div>
    <div class="mask" v-show="showTips">
      <transition name="slide">
        <div class="lvTips" v-show="showTips">
          <i class="close" @click="tipsClick()"></i>
          <div class="con mh">
            <h3>امتياز التصويت</h3>
            <img src="../../assets/img/chTab.png" alt="" class="chTab">
            <!-- <p>PS.</p>
          <p>1、稱號展示在下一期的活動中</p>
          <p>2、如本期獲得金耳朵稱號，下期每投一票相當於普通用戶投2票</p>
          <p>3、本期獲得的評委稱號及投票特權僅在下一期活動中生效</p> -->
            <p>
              الوصف الآخر:<br />
              1. سيتم عرض القب في المنافسة التالي<br />
              2. إذا حصلت على لقب الأذن البلاتينية في هذا المنافسة ، فإن كل تصويت في المنافسة التالي يعادل صوتين للمستخدمين العاديين<br />
              3. لقب الحكّم وامتيازات التصويت التي تم الحصول عليها في هذه المنافسة لن تدخل حيز التنفيذ إلا في فترة المنافسة التالية

            </p>
          </div>

        </div>
      </transition>
    </div>
    <loading />
  </div>
</template>
<script>
import VoteSongList from "../../components/VoteSongList"
import loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
export default {
  components: { VoteSongList, loading },
  data () {
    return {
      list: [],
      showTips: false,
      userinfo: {},
      star: 0,
      dat: {},
      err: ['', 'آذان حديدية', 'آذان نحاسية', 'الأذن الفضية', 'آذان بلاتينية', 'آذان ذهبية']
    }
  },
  created () {
    document.title = 'تصويتي'
    api.myJun().then(res => {
      const { data, star, userinfo, dat } = res.data.response_data
      this.userinfo = userinfo
      this.star = star
      this.list = data
      this.dat = dat
    })
  },
  methods: {
    tipsClick () {
      this.showTips = !this.showTips
    },
    getDate (val, type) {
      return getDate(new Date(val * 1000), type)
    }
  }
}
</script>
<style lang="scss">
.mh {
  height: 6.7rem;
  overflow-y: scroll;
}
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .myVote {
    padding: 0.5rem 0.35rem 0 0.5rem;
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
            width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          em {
            display: inline-block;
            vertical-align: bottom;
            font-size: 0.24rem;
            width: 0.81rem;
            height: 0.33rem;
            background: rgba(251, 162, 91, 1);
            border-radius: 0.1rem;
            text-align: center;
            line-height: 0.4rem;
            margin-left: 0.11rem;
          }
          .star {
            width: 0.33rem;
            height: 0.31rem;
            background: url(../../assets/img/star.png);
            background-size: 100% 100%;
            margin: 0 0.04rem;
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
    .preResTime {
      margin-top: 0.4rem;
      .timeTips {
        text-align: center;
        color: rgba(110, 255, 216, 1);
        span {
          display: block;
        }
        .noRes {
          font-weight: bold;
        }
        .time {
          font-weight: bold;
          display: block;
        }
      }
    }
  }
  .lvTips {
    width: 5.6rem;
    height: 7.16rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    padding: 0.36rem 0.26rem;
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
      font-size: 0.48rem;
      color: rgba(255, 213, 86, 1);
      text-align: center;
    }
    .tipsItem {
      margin: 0.2rem 0 0.23rem;
    }
    p {
      color: #e5deff;
      font-size: 0.24rem;
    }
    .chTab {
      width: 5.65rem;
      height: 4.22rem;
      margin: 0.29rem auto 0.22rem;
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
