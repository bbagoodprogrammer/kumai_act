<template>
  <div class="day" @click="closeActPup()">
    <div class="header">Cần điểm danh liên tục {{nowData.days}} ngày để nhận 1 quà ngẫu nhiên</div>
    <h5>Tháng 11</h5>
    <div class="week">
      <span v-for="(item,index) in week" :key="index">{{item}}</span>
    </div>
    <div class="dayList">
      <span v-for="(item,index) in dayList" :key="index" :class="[{gift:item.style == 'gift',sed:item.singIn,black:nowMonth == 12 ||(nowMonth==11&& item.day<nowDay),now:item.now&& !nowData.mark},item.style]" @click.stop="dayClick(11,item.day)">
        <strong v-if="!item.singIn">{{item.day}}</strong>
        <i class="hand" v-if="item.now && !nowData.mark"></i>
        <em class="singInDay" v-if="item.now && !nowData.mark">Đã có {{nowData.nums}} người điểm danh </em>
        <transition name="day">
          <strong class="act" :class="{bian:item.day == 30}" v-html="item.act" v-if="item.act && showMouth ==11 &&showDay==item.day"></strong>
        </transition>
      </span>
    </div>
    <h5>Tháng 12</h5>
    <div class="week">
      <span v-for="(item,index) in week" :key="index">{{item}}</span>
    </div>
    <div class="dayList">
      <span v-for="(item,index) in dayList2" :key="index" :class="[{gift:item.style == 'gift',sed:item.singIn,black:nowMonth==12&& item.day<nowDay,now:item.now},item.style]" @click.stop="dayClick(12,item.day)">
        <strong v-if="!item.singIn">{{item.day}}</strong>
        <i class="hand" v-if="item.now && !nowData.mark"></i>
        <em class="singInDay" v-if="item.now && !nowData.mark">Đã có {{nowData.nums}} người điểm danh</em>
        <transition name="day">
          <strong class="act" :class="{bian:item.day == 7||item.day == 14||item.day == 21||item.day == 28}" v-html="item.act" v-if="item.act && showMouth ==12 &&showDay==item.day"></strong>
        </transition>
      </span>
    </div>
    <h5>Tháng 1</h5>
    <div class="week">
      <span v-for="(item,index) in week" :key="index">{{item}}</span>
    </div>
    <div class="dayList">
      <span v-for="(item,index) in dayList3" :key="index" :class="[{gift:item.style == 'gift',sed:item.singIn,black:nowMonth==1&& item.day<nowDay,now:item.now},item.style]" @click.stop="dayClick(1,item.day)">
        <strong v-if="!item.singIn">{{item.day}}</strong>
        <i class="hand" v-if="item.now && !nowData.mark"></i>
        <em class="singInDay" v-if="item.now && !nowData.mark">Đã có {{nowData.nums}} người điểm danh</em>
        <transition name="day">
          <strong class="act" :class="{bian:item.day == 11}" v-html="item.act" v-if="item.act && showMouth ==1 &&showDay==item.day"></strong>
        </transition>
      </span>
    </div>
    <Loading />
  </div>
</template>
<script>

// import days from "../../config/days.js"
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      week: [
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'CN'
      ],
      nowData: {},
      showMouth: 0,
      showDay: 0,
      days: {
        11: [
          {},
          {},
          {},
          {},
          {},
          {},
          {
            day: 1,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 2,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 3,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 4,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 5,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 6,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 7,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 8,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 9,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 10,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 11,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 12,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 13,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 14,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 15,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 16,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 17,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 18,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 19,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 20,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 21,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 22,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 23,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 24,
            act: 'mở Bình Chọn Nhân Vật<br/>Mở Lễ Hội Gala',
            style: 'red',
            singIn: false,
            gift: []
          },
          {
            day: 25,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 26,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 27,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 28,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 29,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 30,
            act: ' mở Vua Ca Nhạc',
            style: 'red',
            singIn: false,
            gift: []
          }
        ],
        12: [
          {},
          {
            day: 1,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 2,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 3,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 4,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 5,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 6,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 7,
            act: 'mở Nam Nữ Thần Kara',
            style: 'red',
            singIn: false,
            gift: []
          },
          {
            day: 8,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 9,
            act: ' chung kết Vua Ca Nhạc ',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 10,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 11,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 12,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 13,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 14,
            act: 'mở Gương Mặt Đại Diện',
            style: 'red',
            singIn: false,
            gift: []
          },
          {
            day: 15,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 16,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 17,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 18,
            act: 'chung kết Nam Nữ Thần Kara',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 19,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 20,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 21,
            act: 'mở Đại Chiến MC',
            style: 'red',
            singIn: false,
            gift: []
          },
          {
            day: 22,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 23,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 24,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 25,
            act: 'chung kết Gương Mặt Đại Diện<br/>mở Giọng Ca Hay Nhất',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 26,
            act: null,
            // style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 27,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 28,
            act: 'mở Gia Tộc Mạnh Nhất',
            style: 'red',
            singIn: false,
            gift: []
          },
          {
            day: 29,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 30,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 31,
            act: null,
            singIn: false,
            gift: []
          },
        ],
        1: [
          {},
          {},
          {},
          {},
          {
            day: 1,
            act: 'chung kết Giọng Ca Hay Nhất',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 2,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 3,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 4,
            act: 'null',
            singIn: false,
            gift: []
          },
          {
            day: 5,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 6,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 7,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 8,
            act: 'chung kết Gia Tộc Mạnh Nhất<br/> chung kết Đại Chiến MC',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 9,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 10,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 11,
            act: 'chung kết Nhân Vật Tiêu Biểu <br/> Chung kết Lễ Hội Gala',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 12,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 13,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 14,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 15,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 16,
            act: 'Đêm nhạc Gala',
            style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 17,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 18,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 19,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 20,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 21,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 22,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 23,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 24,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 25,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 26,
            act: null,
            // style: 'crown',
            singIn: false,
            gift: []
          },
          {
            day: 27,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 28,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 29,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 30,
            act: null,
            singIn: false,
            gift: []
          },
          {
            day: 31,
            act: null,
            singIn: false,
            gift: []
          }
        ],
      }
    }
  },
  created() {
    document.title = 'Điểm danh'
    api.markInfo().then(res => {
      this.nowData = res.data.response_data
      // this.nowData = {
      //   days: 6,
      //   mark: false,
      //   my_list: { 11: [1, 2, 3], 12: [1, 3], 1: [2] },
      //   now: 1603685786,
      //   nums: 0,
      //   prize_time: { 11: [], 12: [], 1: [] }
      // }
    })
  },
  computed: {
    dayList() {
      if (this.nowData.my_list) {
        let arr = this.days[11]
        let dayList = this.nowData.my_list[11]
        let prizeList = this.nowData.prize_time[11]
        for (let i = 0; i < dayList.length; i++) {
          arr[dayList[i] + 5].singIn = true
        }
        for (let i = 0; i < prizeList.length; i++) {
          arr[prizeList[i] + 5].style = 'gift'
        }
        if (this.nowMonth == 11) {
          arr[this.nowDay + 5]['now'] = true
        }
        return arr
      } else {
        return this.days[11]
      }
    },
    dayList2() {
      if (this.nowData.my_list) {
        let arr = this.days[12]
        let dayList = this.nowData.my_list[12]
        let prizeList = this.nowData.prize_time[12]
        for (let i = 0; i < dayList.length; i++) {
          arr[dayList[i]].singIn = true
        }
        for (let i = 0; i < prizeList.length; i++) {
          arr[prizeList[i]].style = 'gift'
        }
        if (this.nowMonth == 12) {
          arr[this.nowDay]['now'] = true
        }
        return arr
      } else {
        return this.days[12]
      }
    },
    dayList3() {
      if (this.nowData.my_list) {
        let arr = this.days[1]
        let dayList = this.nowData.my_list[1]
        let prizeList = this.nowData.prize_time[1]
        for (let i = 0; i < dayList.length; i++) {
          arr[dayList[i] + 3].singIn = true
        }
        for (let i = 0; i < prizeList.length; i++) {
          arr[prizeList[i] + 3].style = 'gift'
        }
        if (this.nowMonth == 1) {
          arr[this.nowDay + 3]['now'] = true
        }
        return arr
      } else {
        return this.days[1]
      }
    },
    nowMonth() {
      return new Date(this.nowData.now * 1000).getMonth() + 1
    },
    nowDay() {
      return new Date(this.nowData.now * 1000).getDate()
    }
  },
  methods: {
    dayClick(mouth, day) {
      console.log(mouth, day)
      if (this.nowMonth == mouth && this.nowDay == day && !this.nowData.mark) {
        api.mark().then(res => {
          if (res.data.response_status.code == 0) {
            const { days, is_prize } = res.data.response_data
            this.nowData.mark = true
            this.nowData.days = days
            this.showMouth = mouth
            this.showDay = day
            if (mouth == 11) {
              this.days[mouth][day + 5].now = false
              this.days[mouth][day + 5].singIn = true
              if (is_prize) {
                this.days[mouth][day + 5].style = "gift"
              }
            } else if (mouth == 12) {
              this.days[mouth][day].now = false
              this.days[mouth][day].singIn = true
              if (is_prize) {
                this.days[mouth][day].style = "gift"
              }
            } else if (mouth == 1) {
              this.days[mouth][day + 3].now = false
              this.days[mouth][day + 3].singIn = true
              if (is_prize) {
                this.days[mouth][day + 3].style = "gift"
              }
            }

          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.showMouth = mouth
        this.showDay = day
      }
    },
    closeActPup() {
      this.showMouth = null
      this.showDay = null
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(10, 6, 5, 1);
  .day {
    width: 7rem;
    height: 21.5rem;
    padding-top: 0.1rem;
    background: url(../../assets/img/day/bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 1.05rem auto 0;
    position: relative;
    .header {
      width: 6.4rem;
      height: 1.11rem;
      background: url(../../assets/img/day/header.png);
      background-size: 100% 100%;
      font-size: 0.26rem;
      color: rgba(255, 223, 43, 1);
      position: absolute;
      top: -0.67rem;
      left: 0.29rem;
      text-align: center;
      line-height: 1.5rem;
    }
    h5 {
      margin-top: 0.8rem;
      text-align: center;
      font-size: 0.36rem;
      font-weight: 600;
    }
    .week {
      display: flex;
      width: 6.8rem;
      height: 0.48rem;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 0.24rem;
      line-height: 0.48rem;
      margin: 0.27rem auto 0;
      span {
        flex: 1;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(255, 223, 113, 1);
        font-weight: 600;
      }
    }
    .dayList {
      width: 6.8rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      span {
        width: 0.73rem;
        height: 0.73rem;
        line-height: 0.73rem;
        text-align: center;
        margin: 0.12rem 0.12rem;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        position: relative;
        .hand {
          display: block;
          width: 1.41rem;
          height: 1.54rem;
          background: url(../../assets/img/day/hand.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0.25rem;
          animation: heartbeat 3s linear infinite;
        }
        .singInDay {
          display: block;
          margin: -0.15rem 0 0 -1rem;
          font-size: 0.2rem;
          white-space: nowrap;
          color: rgba(255, 232, 166, 1);
        }
        .act {
          width: 3.5rem;
          height: 0.7rem;
          background: linear-gradient(0deg, #8f541e, #9b5619);
          border: 0.02rem solid;
          box-shadow: 0 0 0.1rem RGBA(235, 132, 39, 1) inset,
            0 0 0.05rem rgba(200, 200, 200, 0.5);
          border-radius: 0.2rem;
          color: rgba(254, 246, 152, 1);
          font-size: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.3rem;
          position: absolute;
          top: -0.9rem;
          left: -1.4rem;
          &.bian {
            left: 0rem;
          }
          &.bian::before {
            left: 7%;
          }
        }
        .act::before {
          content: "";
          width: 0;
          height: 0;
          border-top: 0.1rem solid rgba(243, 193, 121, 1);
          border-left: 0.1rem solid transparent;
          border-right: 0.1rem solid transparent;
          position: absolute;
          bottom: -0.1rem;
          left: 47%;
        }
        &.black {
          color: rgba(255, 255, 255, 0.2);
        }
        &.red {
          color: rgba(249, 83, 75, 1);
        }
        &.crown {
          color: rgba(95, 26, 4, 1);
          background: url(../../assets/img/day/crown.png);
          background-size: 100% 100%;
        }
        &.sed {
          background: url(../../assets/img/day/sed.png);
          background-size: 100% 100%;
        }
        &.gift {
          color: rgba(95, 26, 4, 1);
          background: url(../../assets/img/day/gift.png);
          background-size: 100% 100%;
        }
        &.now {
          color: rgba(255, 223, 113, 1);
          background: url(../../assets/img/day/item.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
