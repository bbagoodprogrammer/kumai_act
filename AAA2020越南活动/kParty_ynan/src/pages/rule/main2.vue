<template>
  <div class="applicationPage">
    <h3>ID Phòng tổ chức tiệc(rất quan trọng)<span>*Phải điền</span> </h3>
    <div class="inputBox">
      <label for="rid">Mời nhập ID phòng chính xác</label>
      <input type="number" name="" id="rid" v-model="actRid" @input="roomChange()">
    </div>
    <h3>Chủ đề tiệc<span>*Phải điền</span> </h3>
    <div class="inputBox">
      <label for="actTitle">Mời nhập chủ đề tiệc</label>
      <input type="text" id="actTitle" v-model="actTitle" maxlength="40">
      <span class="strNum">{{actTitle.length}}/40</span>
    </div>
    <h3> UID của MC</h3>
    <div class="inputBox">
      <label for="actUid">Hãy nhập UID</label>
      <input type="text" id="actUid" v-model="actUid" maxlength="8">
    </div>
    <h3>Số người tham dự<span>*Phải điền</span> </h3>
    <div class="inputBox">
      <label for="pelpleNum">Mời điền số người dự tính sẽ tham gia</label>
      <input type="number" name="" id="pelpleNum" v-model="partyNums">
    </div>
    <h3>Mời chọn ảnh bìa tiệc<span>*Phải điền</span></h3>
    <div class="actType">
      <span v-for="(item,index) in actTypeArr" :key="index" @click="setActType(item.type)" :class="{act:actType == item.type}">
        <img :src="item.img" alt="">
        <strong>{{item.name}}</strong>
      </span>
    </div>
    <h3>Thời gian<span>*Phải điền</span></h3>
    <div class="userActTime">
      <div class="startTime" @click="openTime(1)">
        Bắt đầu:
        <span v-if="isChang1"><em>{{startTime.hours}}：{{startTime.minute}}</em> <em>{{startTime.date}}</em> /<em>{{startTime.month}}</em> / <em>{{startTime.year}}</em></span>
        <span v-else class="noTime"> * Hãy chọn thời gian bắt đầu</span>
      </div>
      <div class="endTime" @click="openTime(2)">
        Kết thúc:
        <span v-if="isChang2"><em>{{endTime.hours}}：{{endTime.minute}}</em> <em>{{endTime.date}}</em> /<em>{{endTime.month}}</em> / <em>{{endTime.year}}</em></span>
        <span v-else class="noTime">* Hãy chọn thời gian kết thúc</span>
      </div>
    </div>
    <h3>Giới thiệu<span>*Phải điền</span></h3>
    <div class="actTips">
      <textarea class="tipsMsg" :placeholder="placeholder1" v-model="actTips" maxlength="500"></textarea>
      <span class="tipsNum">{{actTips.length}}/500</span>
    </div>
    <h3>Phần thưởng</h3>
    <div class="actTips">
      <textarea :placeholder="placeholder2" v-model="actGifts" maxlength="300"></textarea>
      <span class="tipsNum">{{actGifts.length}}/300</span>
    </div>
    <h3>Có cần báo danh tham dự không<span>*Phải điền</span></h3>
    <div class="cSingUp">
      <strong>Nếu muốn người tham dự phải báo danh trước hãy chọn cần báo danh, danh sách xem tại [Tiệc của tôi]</strong>
      <span :class="{act:needSingUp==2}" @click="setNeed(2)">Cần</span>
      <span class="noNeed" :class="{act:needSingUp==1}" @click="setNeed(1)">Không cần</span>
    </div>
    <div class="commitBtn" @click="commitAct()">Gửi yêu cầu</div>
    <Popup v-model="show" position="bottom" round :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate" @cancel="show = false" cancel-button-text="Huỷ" confirm-button-text="Xác nhận" type="datetime" title="" :min-date="minDate" :max-date="maxDate" @confirm="confirmTime()" />
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
import { setTimeout } from 'timers';
export default {
  components: { Popup, MsgToast, Loading },
  data() {
    return {
      actTypeArr: [
        {
          type: 1,
          img: require(`../../assets/img/type1.png`),
          name: 'Tiệc vui vẻ'
        },
        {
          type: 2,
          img: require(`../../assets/img/type2.png`),
          name: 'Tiệc gia tộc'
        },
        {
          type: 3,
          img: require(`../../assets/img/type3.png`),
          name: 'Tiệc sinh nhật'
        },
        {
          type: 4,
          img: require(`../../assets/img/type4.png`),
          name: 'Đại nhạc hội'
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
      return `Sự kiện này quy tụ 8 nghệ sĩ tham dự, lần lượt trình diễn tài năng như hát, chơi nhạc cụ, nhảy, giả giọng,... hứa hẹn sẽ mang đến chương trình nghệ thuật phong phú đa dạng cho tất cả khán giả. Hãy theo dõi chương trình nhé, rất mong được cùng bạn thưởng thức đại tiệc âm nhạc này! (ví dụ tham khảo)`
    },
    placeholder2() {
      return `Hạng nhất: 100 xu + 500 đậu
Hạng nhì: 50 xu + 500 đậu
Hạng ba: 30 xu + 500 đậu
(ví dụ tham khảo)`
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
          this.toast('Thời gian kết thúc không thể sớm hơn thời gian mở')
        } else if (currenStamp - this.startTimeStamp < 1000 * 60 * 60 || currenStamp - this.startTimeStamp > 1000 * 60 * 60 * 3) {
          this.toast('Mỗi bữa tiệc phải hơn 1 giờ và dưới 3 giờ, mời điều chỉnh lại thời gian')
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
          msg: 'Mời nhập ID phòng chính xác!'
        })
      } else if (this.actTitle == '') {
        this.vxc('setToast', {
          msg: 'Mời nhập chủ đề tiệc!'
        })
      } else if (!this.partyNums) {
        this.vxc('setToast', {
          msg: 'Mời điền số người dự tính sẽ tham gia!'
        })
      } else if (!this.actType) {
        this.vxc('setToast', {
          msg: 'Mời chọn ảnh bìa tiệc!'
        })
      } else if (!this.isChang1 || !this.isChang2) {
        this.vxc('setToast', {
          msg: 'Hãy nhập đầy đủ thời gian sự kiện'
        })
      } else if (this.actTips == '') {
        this.vxc('setToast', {
          msg: 'Hãy điền thông tin sự kiện!'
        })
      } else if (this.needSingUp == -1) {
        this.vxc('setToast', {
          msg: 'Hãy xác nhận hoạt động cần báo danh hay không!'
        })
      } else {
        let stTime = `${this.startTime.year}-${this.startTime.month}-${this.startTime.date} ${this.startTime.hours}:${this.startTime.minute}`
        let endTime = `${this.endTime.year}-${this.endTime.month}-${this.endTime.date} ${this.endTime.hours}:${this.endTime.minute}`
        store.dispatch("setloading", true)
        api.commitAct(this.comRid, this.actTitle, this.partyNums, this.actType, this.actTips, stTime, endTime, this.actGifts, this.needSingUp, this.setType, this.actUid).then(res => {
          store.dispatch("setloading", false)
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              msg: `Bạn đã gửi yêu cầu mở tiệc, vui lòng đợi kết quả duyệt, chi tiết xem tại [Tiệc của tôi]`
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
      img {
        width: 1.1rem;
        height: 1.1rem;
        display: block;
        margin: 0 auto;
      }
      strong {
        display: block;
        width: 1.45rem;
        height: 0.5rem;
        background: #41177a;
        border: 0.02rem solid #a072de;
        border-radius: 0.25rem;
        color: #a072de;
        font-size: 0.22rem;
        text-align: center;
        line-height: 0.5rem;
        margin: 0.17rem auto;
        white-space: nowrap;
      }
      &.act {
        strong {
          background: #a64fff;
          color: #fff;
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
    .tipsMsg {
      height: 2.21rem;
    }
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
