<template>
  <div class="applicationPage">
    <h3>舉辦活動的房間ID（非常重要）<span>*必填</span> </h3>
    <div class="inputBox">
      <label for="rid">請輸入房間ID</label>
      <input type="number" name="" id="rid" v-model="actRid" @input="roomChange()">
    </div>
    <h3>活動主題<span>*必填</span> </h3>
    <div class="inputBox">
      <label for="actTitle">請輸入活動主題</label>
      <input type="text" id="actTitle" v-model="actTitle" maxlength="10">
      <span class="strNum">{{actTitle.length}}/10</span>
    </div>
    <h3>活動主持人UID</h3>
    <div class="inputBox">
      <label for="actUid">請輸入UID</label>
      <input type="text" id="actUid" v-model="actUid" maxlength="8">
    </div>
    <h3>預計活動參與人數<span>*必填</span> </h3>
    <div class="inputBox">
      <label for="pelpleNum">請如實填寫預計參與人數</label>
      <input type="number" name="" id="pelpleNum" v-model="partyNums">
    </div>
    <h3>請選擇活動展示封面<span>*必填</span></h3>
    <div class="actType">
      <span v-for="(item,index) in actTypeArr" :key="index" @click="setActType(item.type)" :class="{act:actType == item.type}">
        <!-- <img :src="item.img" alt=""> -->
        <span class="bg" :class="'type' + item.type"></span>
        <strong>{{item.name}}</strong>
      </span>
    </div>
    <h3>活動時間<span>*必填</span></h3>
    <div class="userActTime">
      <div class="startTime" @click="openTime(1)">
        開始時間：
        <span v-if="isChang1"><em>{{startTime.year}}</em> 年 <em>{{startTime.month}}</em> 月 <em>{{startTime.date}}</em> 日 <em>{{startTime.hours}}：{{startTime.minute}}</em></span>
        <span v-else class="noTime"> *請選擇開始時間</span>
      </div>
      <div class="endTime" @click="openTime(2)">
        結束時間：
        <span v-if="isChang2"><em>{{endTime.year}}</em> 年 <em>{{endTime.month}}</em> 月 <em>{{endTime.date}}</em> 日 <em>{{endTime.hours}}：{{endTime.minute}}</em></span>
        <span v-else class="noTime">*選擇結束時間</span>
      </div>
    </div>
    <h3>活動介紹<span>*必填</span></h3>
    <div class="actTips">
      <textarea :placeholder="placeholder1" v-model="actTips" maxlength="140"></textarea>
      <span class="tipsNum">{{actTips.length}}/140</span>
    </div>
    <h3>活動獎勵</h3>
    <div class="actTips">
      <textarea :placeholder="placeholder2" v-model="actGifts" maxlength="140"></textarea>
      <span class="tipsNum">{{actGifts.length}}/140</span>
    </div>
    <h3>是否需要歌友報名<span>*必填</span></h3>
    <div class="cSingUp">
      <strong>如需歌友报名擔任演唱嘉賓请選擇需要報名，詳情可在【我的趴踢】查看</strong>
      <span :class="{act:needSingUp==2}" @click="setNeed(2)">需要</span>
      <span class="noNeed" :class="{act:needSingUp==1}" @click="setNeed(1)">不需要</span>
    </div>
    <div class="commitBtn" @click="commitAct()">提交申請</div>
    <Popup v-model="show" position="bottom" round :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate" type="datetime" title="选择完整时间" :min-date="minDate" :max-date="maxDate" @confirm="confirmTime()" />
    </Popup>
    <msg-toast></msg-toast>
    <Loading />
  </div>
</template>

<script>

import Popup from 'vant/lib/Popup';
import MsgToast from "../../components/commonToast"
import api from "../../api/apiConfig"
import getString from "../../utils/getString"
import Loading from "../../components/Loading"
import store from "../../store/stores.js"
export default {
  components: { Popup, MsgToast, Loading },
  data() {
    return {
      actTypeArr: [
        {
          type: 1,
          img: require(`../../assets/img/type1.png`),
          name: '狂歡趴踢'
        },
        {
          type: 2,
          img: require(`../../assets/img/type2.png`),
          name: '家族聯誼'
        },
        {
          type: 3,
          img: require(`../../assets/img/type3.png`),
          name: '生日派對'
        },
        {
          type: 4,
          img: require(`../../assets/img/type4.png`),
          name: '巨星演唱會'
        }
      ],
      show: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      startTimeStamp: 0,
      endTimeStamp: 0,
      startTime: {},
      endTime: {},
      isChang1: false,
      isChang2: false,
      timeType: 1,
      actTitle: '',
      actRid: null,
      actGifts: '',
      comRid: null,
      actType: 0,
      actTips: '',
      partyNums: null,
      needSingUp: -1,
      setType: null,
      actUid: '',//uid
    }
  },
  computed: {
    placeholder1() {
      return `本次活動邀請8位音樂達人參與，分別展示樂器、舞蹈、仿聲演唱等個人才藝，為歌友們帶來一場豐富多彩的音樂表演，趕快關注我們吧，期待與你共享視聽盛宴！（參考案例）`
    },
    placeholder2() {
      return `第一名：100金幣+500金豆\n第二名：50金幣+500金豆\n第三名：30金幣+500金豆（參考範例）`
    }
  },
  created() {
    // document.title = '提交申請'
    let id = getString('id')
    if (id != undefined) {
      this.setType = id
      api.getActData(id).then(res => {
        console.log(res)
        if (res.data.response_status.code == 0) {
          let data = res.data.response_data.data
          this.actRid = data.rid
          this.comRid = data.rid
          this.actTitle = data.them
          this.partyNums = data.nums //缺少參與人數data.nums
          this.actType = data.cover
          this.isChang1 = true
          this.isChang2 = true
          this.startTime = this.getDate(new Date(data.stime * 1000))
          this.endTime = this.getDate(new Date(data.etime * 1000))
          this.actTips = data.p_desc
          this.actGifts = data.prize
          this.needSingUp = data.is_reg    //缺少    
          this.actUid = data.host_uid
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    }
  },
  methods: {
    roomChange() {
      let r = this.actRid
      this.comRid = null
      setTimeout(() => {
        if (r == this.actRid) {
          api.adminOrOwner(this.actRid).then(res => {
            if (res.data.response_status.code == 0) {
              this.comRid = this.actRid
            } else {
              this.vxc('setToast', {
                msg: res.data.response_status.error
              })
            }
          })
        }
      }, 1000)
    },
    setActType(type) {
      this.actType = type
    },
    getDate(time) {
      var year = time.getFullYear(),
        month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
        date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
        hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
        minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      return {
        year,
        month,
        date,
        hours,
        minute
      }
    },
    openTime(val) {
      this.show = true
      this.timeType = val
    },
    confirmTime(value) {
      if (this.timeType == 1) {
        this.startTimeStamp = this.currentDate.getTime()
        this.startTime = this.getDate(this.currentDate)
        this.isChang1 = true
        this.isChang2 = false
      } else {
        let currenStamp = this.currentDate.getTime()
        if (currenStamp < this.startTimeStamp) {
          this.toast('活動結束時間不能比活動開始時間提前')
        } else if (currenStamp - this.startTimeStamp < 1000 * 60 * 60 || currenStamp - this.startTimeStamp > 1000 * 60 * 60 * 3) {
          this.toast('每場活動申請時間應大於1小時，小於3小時，請注意修改時間範圍')
        } else {
          this.isChang2 = true
          this.endTime = this.getDate(this.currentDate)
          this.endTimeStamp = this.currentDate.getTime()
        }
      }
      this.show = false
    },
    setNeed(val) {
      this.needSingUp = val
    },
    commitAct() {
      if (!this.comRid) {
        this.vxc('setToast', {
          msg: '請填寫舉辦活動的房間ID！'
        })
      } else if (this.actTitle == '') {
        this.vxc('setToast', {
          msg: '請填寫活動主題！'
        })
      } else if (!this.partyNums) {
        this.vxc('setToast', {
          msg: '請填寫預計活動參與人數！'
        })
      } else if (!this.actType) {
        this.vxc('setToast', {
          msg: '請填寫活動展示封面！'
        })
      } else if (!this.isChang1 || !this.isChang2) {
        this.vxc('setToast', {
          msg: '請填寫完整活動時間！'
        })
      } else if (this.actTips == '') {
        this.vxc('setToast', {
          msg: '請填寫活動介紹！'
        })
      } else if (this.needSingUp == -1) {
        this.vxc('setToast', {
          msg: '請選擇活動是否需要報名！'
        })
      } else {
        let stTime = `${this.startTime.year}-${this.startTime.month}-${this.startTime.date} ${this.startTime.hours}:${this.startTime.minute}`
        let endTime = `${this.endTime.year}-${this.endTime.month}-${this.endTime.date} ${this.endTime.hours}:${this.endTime.minute}`
        store.dispatch("setloading", true)
        api.commitAct(this.comRid, this.actTitle, this.partyNums, this.actType, this.actTips, stTime, endTime, this.actGifts, this.needSingUp, this.setType, this.actUid).then(res => {
          store.dispatch("setloading", false)
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              msg: `您的活動申請已提交，請耐心等待審核結果，具體情況可點擊【我的趴踢】查看`
            })
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/common.scss";
body {
  background-color: #41177a;
}
.applicationPage {
  padding: 0.36rem 0.32rem;
  h3 {
    font-size: 0.26rem;
    font-weight: 600;
    span {
      font-size: 0.24rem;
      color: #b78686;
      margin-left: 0.16rem;
    }
  }
  .inputBox {
    width: 6.61rem;
    height: 0.8rem;
    background: rgba(92, 45, 156, 1);
    border: 0.01rem solid rgba(48, 9, 101, 1);
    border-radius: 0.1rem;
    margin: 0.17rem auto 0.25rem;
    display: flex;
    align-items: center;
    padding-left: 0.24rem;
    label {
      font-size: 0.22rem;
      color: #a072de;
      font-weight: 500;
    }
    input {
      height: 0.5rem;
      margin-left: 0.38rem;
      font-size: 0.26rem;
      color: #fff;
    }
    .strNum {
      width: 0.7rem;
      font-size: 0.22rem;
      color: #a072de;
      text-align: center;
      margin-left: 0.15rem;
    }
  }
  .actType {
    display: flex;
    margin-top: 0.45rem;
    span {
      flex: 1;
      translate: all 0.5s;
      .bg {
        width: 1.1rem;
        height: 1.1rem;
        display: block;
        margin: 0 auto;
        &.type1 {
          background: url(../../assets/img/type1.png);
          background-size: 100% 100%;
        }
        &.type2 {
          background: url(../../assets/img/type2.png);
          background-size: 100% 100%;
        }
        &.type3 {
          background: url(../../assets/img/type3.png);
          background-size: 100% 100%;
        }
        &.type4 {
          background: url(../../assets/img/type4.png);
          background-size: 100% 100%;
        }
      }
      strong {
        display: block;
        width: 1.34rem;
        height: 0.5rem;
        background: url(../../assets/img/setType1.png);
        background-size: 100% 100%;
        color: #a072de;
        font-size: 0.22rem;
        text-align: center;
        line-height: 0.5rem;
        margin: 0.17rem auto;
      }
      &.act {
        .type1 {
          background: url(../../assets/img/type_1.png);
          background-size: 100% 100%;
        }
        .type2 {
          background: url(../../assets/img/type_2.png);
          background-size: 100% 100%;
        }
        .type3 {
          background: url(../../assets/img/type_3.png);
          background-size: 100% 100%;
        }
        .type4 {
          background: url(../../assets/img/type_4.png);
          background-size: 100% 100%;
        }
        strong {
          color: #fff;
          background: url(../../assets/img/setType2.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .userActTime {
    height: 1.68rem;
    margin-left: 0.45rem;
    font-size: 0.22rem;
    color: #a072de;
    .noTime {
      color: #ffdd93;
    }
    div {
      margin-top: 0.39rem;
      em {
        color: #ffdd93;
        margin: 0 0.1rem;
      }
      .red {
        display: block;
        color: red;
      }
    }
  }
  .actTips {
    position: relative;
    .tipsNum {
      width: 0.7rem;
      position: absolute;
      bottom: 0.35rem;
      right: 0.17rem;
      font-size: 0.22rem;
      text-align: center;
      color: #a072de;
    }
  }
  textarea {
    background: red;
    width: 6.46rem;
    height: 1.15rem;
    margin: 0.16rem auto 0.24rem;
    background: rgba(92, 45, 156, 1);
    border: 0.01rem solid rgba(48, 9, 101, 1);
    border-radius: 0.1rem;
    font-size: 0.24rem;
    padding: 0.13rem 0.15rem 0.42rem 0.24rem;
    color: #a072de;
  }
  textarea::-webkit-input-placeholder {
    color: #a072de;
  }
  .cSingUp {
    display: flex;
    align-items: center;
    strong {
      display: block;
      width: 3.71rem;
      font-size: 0.24rem;
      color: #a072de;
      margin-left: 0.24rem;
    }
    span {
      width: 1.34rem;
      height: 0.5rem;
      background: #320e63;
      border: 0.02rem solid #a072de;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.22rem;
      font-weight: 500;
      &.act {
        background: #a64fff;
        border: 0.02rem solid #a072de;
      }
    }
    .noNeed {
      margin-left: 0.11rem;
    }
  }
  .commitBtn {
    width: 2.74rem;
    height: 0.9rem;
    font-size: 0.32rem;
    background: url(../../assets/img/commitBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.65rem auto 0.53rem;
  }
}
</style>
