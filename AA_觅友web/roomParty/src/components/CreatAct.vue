<template>
  <div class="creat">
    <div class="title">
      <strong>發佈活動預告</strong>
      <i class="close" @click="$router.go(-1)"></i>
    </div>
    <div class="tips_title title1"></div>
    <div class="creatTypeList">
      <span v-for="(item,index) in 4" :key="index" :class="[{act:showType == item},'type' + item]" @click="showType = item"> </span>
    </div>
    <div class="tips_title title2"></div>
    <div class="timeSet">
      <div class="startTime" @click="showTimeSet = true" :class="{opt:startTimStr == ''}">{{startTimStr?startTimStr:'開始時間'}}</div>
      <div class="endTime" @click="showTimeSet = true" :class="{opt:endTimStr == ''}">{{endTimStr?endTimStr:'結束時間'}}</div>
    </div>
    <div class="tips_title title3"></div>
    <div class="actTitleBox">
      <textarea v-model="actTitle" class="actTitle" maxlength="15" />
      <span class="strLength">{{actTitle.length}}/15</span>
    </div>

    <div class="tips_title title4"></div>
    <div class="actsMsgBox">
      <textarea v-model="actMsg" class="actMsg" maxlength="200" />
      <span class="strLength">{{actMsg.length}}/200</span>
    </div>

    <div class="tipsList">
      <div class="tipsTitle">注意事項</div>
      <ul>
        <li>1、發布活動需完整填寫活動預告信息，目前僅支持發布緣分配對、團戰PK、生日派對、浪漫婚禮4個活動主題；</li>
        <li>2、允許發布多個房間活動預告，房間內的預告提醒僅展示最近一場的活動信息； </li>
        <li>3、活動時間最長為6個小時，允許跨天設置，房主需在達到開始時間後手動操作“開始活動”，即可進行活動數據統計；超出設定的結束時間2個小時後將自動結束活動；</li>
        <li>4、活動開始後，將自動替換本場活動設置的話題話題、活動公告信息，無須再次手動設置；</li>
        <li>5、活動開始後，參與活動預告的用戶將收到小秘書通知進入活動，參與預告的用戶越多房間越有人氣哦；</li>
      </ul>
    </div>

    <div class="create">
      <div class="btn" @click="creatAct()">發布</div>
    </div>

    <van-popup v-model="showTimeSet" position="bottom" round :style="{ height: '55%' }">
      <van-datetime-picker @confirm="confirmTime()" @cancel="cancelTime()" v-model="currentDate" type="datetime" :title="timeType==1?'開始時間':'結束時間'" :min-date="minDate" :max-date="maxDate"
        :formatter="formatter" />
    </van-popup>
  </div>
</template>

<script>

const nowTime = new Date()

import getDate from "../utils/getDate"
import { mapState } from "vuex"
import { publishAct } from "../apis"

export default {
  data () {
    return {
      showType: 1,
      showTimeSet: false,
      timeType: 1,   //1start  2end
      currentDate: new Date(),
      starTms: '',
      endTms: '',
      startTimStr: '',
      endTimStr: '',
      actTitle: '',
      actMsg: ''
    }
  },
  created () {
    const actObj = this.editActObj
    if (actObj.actId) {
      this.showType = actObj.themeType
      this.actTitle = actObj.topic
      this.actMsg = actObj.bulletin
      this.startTimStr = actObj.beginTime
      this.endTimStr = actObj.endTime
    }
  },
  //   watch: {
  //     editActObj (val) {
  //       console.log(val)
  //       if (val.actId) {
  //         this.showType = val.themeType
  //         this.actTitle = val.topic
  //         this.actMsg = val.bulletin
  //       }
  //     }
  //   },
  computed: {
    ...mapState(['editActObj']),
    minDate () {
      if (this.timeType == 1) {
        return nowTime
      } else {
        return new Date(this.starTms)
      }
    },
    maxDate () {  //开始时间选择范围为一个月，开始-结束范围六个小时
      if (this.timeType == 1) {
        var d = new Date();
        return new Date(d.setMonth(d.getMonth() + 1))
      } else {
        return new Date(this.starTms.setHours(this.starTms.getHours() + 6))
      }
    }
  },
  methods: {
    creatAct () {
      if (this.startTimStr == '' || this.endTimStr == '') {
        this.toast('請填寫活動時間！')
        return
      } else if (this.actTitle == '') {
        this.toast('請填寫活動話題！')
        return
      } else if (this.actMsg == '') {
        this.toast('請填寫活動公告！')
        return
      } else {
        this.vxc('updateLoading', true)
        publishAct(this.editActObj.actId ? this.editActObj.actId : 0, this.showType, this.addSecondStr(this.startTimStr), this.addSecondStr(this.endTimStr), this.actTitle, this.actMsg).then(res => {
          if (res.data.response_data) {
            this.vxc('updateLoading', false)
            this.toast(`創建成功！`)
            this.$router.go(-1)
          } else {
            this.toast(res.data.response_status.error)
            this.vxc('updateLoading', false)
          }
        })
      }
    },
    addSecondStr (str) {
      return str.replace('.', '-').replace('.', '-') + ':00'
    },
    confirmTime () {
      if (this.timeType == 1) {
        this.starTms = this.currentDate
        this.startTimStr = getDate(new Date(this.currentDate), 1)
        this.timeType = 2
      } else {
        this.endTms = this.currentDate
        this.endTimStr = getDate(new Date(this.currentDate), 1)
        this.timeType = 1
        this.showTimeSet = false
      }
    },
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      } else if (type === 'hour') {
        return `${val}時`;
      } else if (type === 'minute') {
        return `${val}分`;
      } else if (type === 'second') {
        return `${val}秒`;
      }
      return val;
    },
  },
}
</script>

<style lang="scss">
.creat {
  position: relative;
  padding-top: 0.88rem;
  > .title {
    width: 100%;
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #fff;
    color: #2C2B36;
    position: relative;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    strong {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .close {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/back.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
    }
  }
  .tips_title {
    width: 2.96rem;
    height: 0.48rem;
    margin-left: 0.3rem;
    &.title1 {
      margin-top: 0.55rem;
    }
    &.title2 {
      margin-top: 0.5rem;
    }
    &.title3,
    &.title4 {
      margin-top: 0.68rem;
    }
  }
  .creatTypeList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.08rem;
    > span {
      width: 3.86rem;
      height: 1.72rem;
    }
  }
  .timeSet {
    margin-top: 0.22rem;
    display: flex;
    align-items: center;
    > div {
      width: 2.93rem;
      height: 0.76rem;
      padding-left: 0.27rem;
      background: rgba(206, 208, 229, 0.3);
      border-radius: 0.16rem;
      font-size: 0.28rem;
      color: rgba(44, 43, 54, 1);
      line-height: 0.76rem;
      &.startTime {
        margin: 0 0.5rem 0 0.3rem;
        position: relative;
      }
      &.startTime::before {
        content: '';
        display: block;
        width: 0.18rem;
        height: 0.04rem;
        background: rgba(209, 208, 220, 0.3);
        position: absolute;
        right: -0.34rem;
        top: 0.37rem;
      }
      &.opt {
        color: rgba(209, 208, 220, 1);
      }
    }
  }
  .van-picker__title {
    color: #576b95;
  }
  .actTitleBox,
  .actsMsgBox {
    width: 6.15rem;
    height: 0.74rem;
    padding: 0.32rem 0.48rem 0.32rem 0.27rem;
    background: rgba(206, 208, 229, 0.3);
    border-radius: 0.16rem;
    margin: 0.22rem 0 0 0.3rem;
    font-size: 0.28rem;
    color: rgba(44, 43, 54, 1);
  }
  .actTitleBox {
    position: relative;
    .actTitle {
      width: 100%;
      height: 100%;
      background: rgba(206, 208, 229, 0);
    }
    .strLength {
      font-size: 0.2rem;
      color: rgba(140, 137, 149, 1);
      position: absolute;
      bottom: 0.22rem;
      right: 0.25rem;
    }
  }
  .actsMsgBox {
    height: 1.52rem;
    padding-bottom: 0.65rem;
    position: relative;
    .actMsg {
      width: 100%;
      height: 100%;
      background: rgba(206, 208, 229, 0);
    }
    .strLength {
      font-size: 0.2rem;
      color: rgba(140, 137, 149, 1);
      position: absolute;
      bottom: 0.22rem;
      right: 0.25rem;
    }
  }
  .tipsList {
    margin-top: 0.64rem;
    padding: 0 0.71rem 1rem 0.31rem;
    font-size: 0.24rem;
    color: rgba(92, 91, 103, 1);
    ul {
      margin-top: 0.23rem;
      li {
        font-size: 0.24rem;
        line-height: 0.37rem;
        margin-bottom: 0.25rem;
      }
    }
  }
  .create {
    width: 100%;
    height: 1.08rem;
    padding-top: 1.02rem;
    background: linear-gradient(0deg, #FFFFFF, rgba(255, 255, 255, 0));
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    .btn {
      width: 5.61rem;
      height: 0.84rem;
      background: linear-gradient(90deg, #7A68F8, #9585FF);
      border-radius: 0.41rem;
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.32rem;
      margin: 0 auto;
    }
  }
}
</style>