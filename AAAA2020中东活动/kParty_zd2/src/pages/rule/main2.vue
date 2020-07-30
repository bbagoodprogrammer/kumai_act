<template>
  <div class="applicationPage">
    <h3>رقم الغرفة لإقامة الحفلة<span> *لازم تملأ</span> </h3>
    <div class="inputBox">
      <label for="rid">يرجي إدخال رقم الغرفة بدقة</label>
      <input type="number" name="" id="rid" v-model="actRid" @input="roomChange()">
    </div>
    <div class="roomType" v-if="roomType != -1">
      <span :class="{act:roomType==1}">غرفة الغناء</span>
      <span :class="{act:roomType==2}">غرفة الدردشة</span>
    </div>
    <h3>موضوع النشاط<span> *لازم تملأ</span> </h3>
    <div class="inputBox">
      <label for="actTitle">يرجي إدخال موضوع الحفلة</label>
      <input type="text" id="actTitle" v-model="actTitle" maxlength="55">
      <span class="strNum">{{actTitle.length}}/55</span>
    </div>
    <h3>UID لمذيع النشاط</h3>
    <div class="inputBox">
      <label for="actUid">يرجي ملأ UID للمذيع</label>
      <input type="text" id="actUid" v-model="actUid" maxlength="8">
    </div>
    <h3>العدد المتوقع للمشاركين<span> *لازم تملأ</span> </h3>
    <div class="inputBox">
      <label for="pelpleNum">يرجي ملأ العدد المتوقع للمشاركين بصدق</label>
      <input type="number" name="" id="pelpleNum" v-model="partyNums">
    </div>
    <h3>يرجي اختيار غطاء النشاط<span> *لازم تملأ</span></h3>
    <div class="actType">
      <span v-for="(item,index) in actTypeArr" :key="index" @click="setActType(item.type)" :class="{act:actType == item.type}">
        <span class="bg" :class="'type' + item.type"></span>
        <strong>{{item.name}}</strong>
      </span>
    </div>
    <h3>وقت النشاط<span> *لازم تملأ</span></h3>
    <div class="userActTime">
      <div class="startTime" @click="openTime(1)">
        وقت البداية:
        <span v-if="isChang1"><em>{{startTime.year}}</em> / <em>{{startTime.month}}</em> /<em>{{startTime.date}}</em> /<em>{{startTime.hours}}：{{startTime.minute}}</em></span>
        <span v-else class="noTime"><em>(بتوقيت دبي)</em> *يرجي اختيار وقت البداية </span>
      </div>
      <div class="endTime" @click="openTime(2)">
        وقت الإنتهاء:
        <span v-if="isChang2"><em>{{endTime.year}}</em> / <em>{{endTime.month}}</em> / <em>{{endTime.date}}</em> / <em>{{endTime.hours}}：{{endTime.minute}}</em></span>
        <span v-else class="noTime"><em>(بتوقيت دبي)</em>*يرجي اختيار وقت الإنتهاء </span>
      </div>
    </div>
    <h3>وصف النشاط<span> *لازم تملأ</span></h3>
    <div class="actTips">
      <textarea :placeholder="placeholder1" v-model="actTips" maxlength="500"></textarea>
      <span class="tipsNum">{{actTips.length}}/500</span>
    </div>
    <h3>جوائز النشاط</h3>
    <div class="actTips">
      <textarea :placeholder="placeholder2" v-model="actGifts" maxlength="500"></textarea>
      <span class="tipsNum">{{actGifts.length}}/500</span>
    </div>
    <!-- <h3>是否需要歌友報名<span>*لازم تملأ</span></h3>
    <div class="cSingUp">
      <strong>如需歌友报名擔任演唱嘉賓请選擇需要報名，詳情可在【我的趴踢】查看</strong>
      <span :class="{act:needSingUp==2}" @click="setNeed(2)">需要</span>
      <span class="noNeed" :class="{act:needSingUp==1}" @click="setNeed(1)">不需要</span>
    </div> -->
    <div class="commitBtn" @click="commitAct()">تقديم الطلب</div>
    <Popup v-model="show" position="bottom" round :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate" @cancel="show = false" cancel-button-text="إلغاء" confirm-button-text="تحديد" type="datetime" title="" :min-date="minDate" :max-date="maxDate" @confirm="confirmTime()" />
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
          name: 'الحفلات الرائعة'
        },
        {
          type: 2,
          img: require(`../../assets/img/type2.png`),
          name: 'مناقشة موضوع'
        },
        {
          type: 3,
          img: require(`../../assets/img/type3.png`),
          name: 'حفلة عيد الميلاد'
        },
        {
          type: 4,
          img: require(`../../assets/img/type4.png`),
          name: 'مسابقة ممتعة'
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
      needSingUp: 1,
      setType: null,
      actUid: '',//uid
      roomType: -1,
    }
  },
  computed: {
    placeholder1() {
      return `سوف يشارك كثير من المغنيين في هذا نشاط و هم سيقدمون حفلة الموسيقى الرائعة للمتفرجين، تابعنا بسرعة~نحن في انتظارك لمشاركة فينا!`
    },
    placeholder2() {
      return `"الأول:xxxx
الثاني:xxxx
الثالث:xxxx
يمكن أن تملأ جوائز تريد توزيعها في النشاط، جوائز النشاط سوف يعطي بمنظم النشاط يعني الشخص الذي قدم الطلب لإقامة النشاط ليس super voice، و ليس من اللازم أن تملأها، هذا اختياري~"

`
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
              this.roomType = res.data.response_data.type
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
          this.toast('لا يمكن لوقت الانتهاء قبل وقت البداية')
        } else if (currenStamp - this.startTimeStamp < 1000 * 60 * 60 || currenStamp - this.startTimeStamp > 1000 * 60 * 60 * 10) {
          this.toast('يجب على وقت كل النشاط أكثر من ساعة و أقل من 10 ساعات، يرجي تعديل نطاق الوقت.')
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
          msg: 'يرجي إدخال رقم الغرفة بدقة'
        })
      } else if (this.actTitle == '') {
        this.vxc('setToast', {
          msg: 'يرجي إدخال موضوع الحفلة'
        })
      } else if (!this.partyNums) {
        this.vxc('setToast', {
          msg: 'يرجي ملأ العدد المتوقع للمشاركين بصدق'
        })
      } else if (!this.actType) {
        this.vxc('setToast', {
          msg: 'يرجي اختيار غطاء النشاط'
        })
      } else if (!this.isChang1 || !this.isChang2) {
        this.vxc('setToast', {
          msg: 'يرجي إدخال وقت النشاط الكامل!'
        })
      } else if (this.actTips == '') {
        this.vxc('setToast', {
          msg: 'يرجي ملأ وصف النشاط!'
        })
      }
      // else if (this.needSingUp == -1) {
      //   this.vxc('setToast', {
      //     msg: '請選擇活動是否需要報名！'
      //   })
      // }
      else {
        let stTime = `${this.startTime.year}-${this.startTime.month}-${this.startTime.date} ${this.startTime.hours}:${this.startTime.minute}`
        let endTime = `${this.endTime.year}-${this.endTime.month}-${this.endTime.date} ${this.endTime.hours}:${this.endTime.minute}`
        store.dispatch("setloading", true)
        api.commitAct(this.comRid, this.actTitle, this.partyNums, this.actType, this.actTips, stTime, endTime, this.actGifts, this.needSingUp, this.setType, this.actUid).then(res => {
          store.dispatch("setloading", false)
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              msg: `تم تقديم طلب النشاط بنجاح، يرجي إنتظار نتيجة المراجعة بصبر، يمكن تحقق التفاصيل في صفحة "الحفلة لي".`
            })
            setTimeout(() => {
              let regstr = getString('token')
              location.href = `./index.html?token=${regstr}`
            }, 1000)
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
.van-picker {
  direction: ltr !important;
}
body {
  background-color: #41177a;
  direction: rtl;
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
    padding-right: 0.24rem;
    label {
      font-size: 0.22rem;
      color: #a072de;
      font-weight: 500;
    }
    input {
      height: 0.5rem;
      margin-right: 0.38rem;
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
  .roomType {
    display: flex;
    margin-bottom: 0.2rem;
    span {
      display: block;
      width: 1.34rem;
      height: 0.5rem;
      background: #41177a;
      border: 0.02rem solid #a072de;
      border-radius: 0.25rem;
      color: #a072de;
      font-size: 0.22rem;
      text-align: center;
      line-height: 0.5rem;
      &.act {
        background: #a64fff;
        color: #fff;
      }
    }
    span:first-child {
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
    // direction: ltr !important;
    height: 1.68rem;
    margin-right: 0.45rem;
    font-size: 0.22rem;
    color: #a072de;
    .noTime {
      color: #ffdd93;
      em {
        display: inline-block;
      }
    }
    div {
      margin-top: 0.39rem;
      span {
        display: inline-block;
        direction: ltr !important;
      }
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
    width: 3.86rem;
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
