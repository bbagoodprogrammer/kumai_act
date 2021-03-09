<template>
  <div class="hotSong " :class="{max:length>1,con:length==1}">
    <div class="searchBox">
      <input type="text" :placeholder="songNum" v-on:input="inputChange()" v-model="searchSong">
      <span class="search" @click="search()"></span>
    </div>
    <div class="noSongTips" v-if="nextTips || noTips">
      <div class="next" v-show="nextTips">
        <h3>هذه الأغنية هي أغنية المنافسة التالية</h3>
        <p>دعاء إلى الممارسة</p>
        <p>لا يمكن تسجيل الأغاني التدريبية التي لم يتم إصدارها خلال المسابقة التالية في المسابقة</p>
      </div>
      <div class="noSong" v-show="noTips">
        <h3>لا توجد مثل هذه الأغنية في المسابقة </h3>
        <p>دعونا نلقي نظرة على الأغاني الشعبية التي يغنيها الجميع</p>
      </div>
    </div>
    <ul class="hotSongList">
      <li v-for="(item,index) in showSong" :key="index">
        <div class="songMsg">
          <div class="sName">{{item.name}}<i v-if="item.mp3 != ''"></i> </div>
          <div class="songNick"><em>{{item.artist}}</em><strong> / 打擂 {{item.join}} 人</strong></div>
        </div>
        <div class="songStatusBtn" :class="{black:!can||item.deleted}">
          <em v-if="item.deleted">انسحب من المسابقة</em>
          <em v-else-if="item.current ==1" @click="goSong(item.accid)">ممارسة</em>
          <em v-else-if="item.status == 0" @click="goSong(item.accid)">打擂</em>
          <em v-else-if="item.status == 1" @click="commitSong(item.accid,index)">تقدّم الأغنية</em>
          <em v-else-if="item.status == 2">شاركت</em>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="isOverTime">
      <transition name="slide">
        <div class="overTime" v-show="isOverTime">
          <i class="close" @click="closeOverTime()"></i>
          <h3>無法打擂</h3>
          <p>本期打擂時間已結束，快去做評委評分吧！<br />超多好禮在等你</p>
          <div class="goBtn" @click="goSongVote()">كن الحكّم</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="cSongPup">
      <transition name="slide">
        <div class="choiceSong" v-if="cSongPup">
          <i class="close" @click="closeSongPup()"></i>
          <h3>اختر أكثر أعمال المسابقة رضاءًا للمشاركة فيها</h3>
          <p class="red">بعد تقدّم الأغنية ، إذا تم حذف أغنية المنافسة أثناء النسشاط ، فسيتم خصم نقطتين من النتيجة</p>
          <ul class="choiceSongList">
            <li v-for="(item,index) in mySong" :key="index">
              <div class="songMsg">
                <div class="sName">{{item.name}}<i></i> </div>
                <!-- <em>{{item.artist}}</em><strong> / 打擂 {{item.join}} 人</strong> -->
                <div class="songNick">{{getDateSecond(item.addtime)}}</div>
              </div>
              <div class="songStatusBtn" @click="commit(item)">
                <em>選擇</em>
              </div>
            </li>
          </ul>
          <div class="choicetips">
            <p>1、需演唱{{time}}後發佈的官方指定伴奏參賽（即需演唱點擊打擂後跳轉的伴奏），演唱其他伴奏無法參賽</p>
            <p>2. تقتصر أنواع الأعمال المشاركة في المسابقة على عمل فردي</p>
            <p>3. يمكن اختيار عمل واحد فقط لكل مرافق للمشاركة في المسابقة</p>
            <p>4. يمكن اختيار 20 مرافقًا على الأكثر للمشاركة في PK في كل مسابقة</p>
            <p>5. يجب أن تكون الأغنية الغنائية أغنية كاملة(مدة الأغنية أطول\أقصر بـ 30 ثانية على الأكثر من مدة المصاحبة) ، وإلا فلا يمكن تقديم الأغنية للمنافسة"</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import getString from "../utils/getString"
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import getDate from "../utils/getDate"
import APP from '../utils/openApp'
export default {
  props: ["length", "update", "is_push"],
  data () {
    return {
      searchSong: '',
      isOverTime: false,
      cSongPup: false,
      showSong: [],
      mySong: [],
      sid: 0,
      nextTips: false,
      noTips: false,
      cindex: 0
    }
  },
  watch: {
    hotSong (val) {
      this.showSong = val
    }
  },
  computed: {
    ...mapState(['hotSong', 'can', 'isShare', 'act', 'version_allowed']),
    time () {
      return getDate(new Date(this.act.stime * 1000), 3)
    },
    songNum () {
      return `اغاني مسابقة (${this.hotSong.length})`
    }
  },
  methods: {
    inputChange () {
      this.showSong = this.hotSong
      this.nextTips = false
      this.noTips = false
    },
    search () {
      if (this.isShare) {
        APP()
        return
      }
      if (this.searchSong != '') {
        api.searchSong(this.searchSong).then(res => {
          const data = res.data.response_data.data
          console.log(data.length)
          if (data.length) {
            if (data[0].current == 1) {
              this.nextTips = true
              this.showSong = data
            } else {
              this.showSong = data
            }
          } else {
            console.log('x')
            this.noTips = true
          }
        })
      }
    },
    closeOverTime () {
      this.isOverTime = false
    },
    closeSongPup () {
      this.cSongPup = false
    },
    goSongVote () {
      let regstr = getString('token')
      location.href = `./songVote.html?token=${regstr}`
    },
    goSong (id) {
      globalBus.$emit('commonEvent', () => {
        if (!this.can) {
          this.isOverTime = true
          return
        }
        if (!this.is_push) {
          this.vxc('setToast', {
            msg: "يمكن لكل شخص المشاركة بحد أقصى 20 مسابقة أغنية لكل عدد"
          })
          return
        }
        var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i); //ios终端
        if (!this.update) {
          this.vxc('setToast', {
            msg: "此版本過低，無法參賽！請前往app store下載“高歌”參賽喔"
          })
          return
        }
        if (this.version_allowed) {
          location.href = `record:${id}`
        } else {
          // this.vxc('setToast', {
          //   title: '無法參加打擂',
          //   msg: '您的APP版本過低，無法使用本活動的部分功能，請更新至最新版本喔～'
          // })
          location.href = `accid:${id}`
        }
      })
    },
    commitSong (sid, cindex) {
      if (!this.can) {
        this.isOverTime = true
        return
      }
      if (!this.is_push) {
        this.vxc('setToast', {
          msg: "يمكن لكل شخص المشاركة بحد أقصى 20 مسابقة أغنية لكل عدد"
        })
        return
      }
      this.sid = sid
      this.cindex = cindex
      api.searchMySong(sid).then(res => {
        this.mySong = res.data.response_data.data
        this.cSongPup = true
      })
    },
    commit (item) {
      api.pushWork(item.id, this.sid).then(res => {
        if (res.data.response_status.code == 0) {
          this.cSongPup = false
          this.vxc('cSongSuc', this.cindex)
          // this.$emit('addSong', item)
          this.$parent.getDefaultData('toast')
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getDateSecond (tm) {
      return getDate(new Date(tm * 1000), 3)
    }
  },
}
</script>
<style lang="scss">
.hotSong {
  margin-top: 0.1rem;
  padding: 0 0.47rem;
  &.con {
    margin-top: 0.25rem;
  }
  &.max {
    margin-top: 0.8rem;
  }
  .searchBox {
    width: 6.56rem;
    height: 0.8rem;
    background: rgba(147, 103, 255, 1);
    border: 0.02rem solid rgba(201, 165, 255, 1);
    border-radius: 0.39rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.33rem 0 0.3rem;
    margin: 0 auto;
    input {
      height: 0.6rem;
      color: #fff;
    }
    input::placeholder {
      color: rgba(201, 165, 255, 1);
      font-size: 0.24rem;
      font-weight: bold;
    }
    .search {
      width: 0.43rem;
      height: 0.43rem;
      background: url(../assets/img/searchIcon.png);
      background-size: 100% 100%;
    }
  }
  .noSongTips {
    text-align: center;
    margin-top: 0.32rem;
    h3 {
      font-size: 0.36rem;
      color: rgba(110, 255, 216, 1);
      font-weight: bold;
    }
    p {
      color: rgba(110, 255, 216, 1);
      font-weight: 500;
    }
  }
  .hotSongList {
    margin-top: 0.2rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 1.02rem;
      border-bottom: 0.02rem solid rgba(138, 90, 255, 1);
      border-radius: 0.01rem;
      padding: 0.05rem 0 0.05rem 0.15rem;
      .songMsg {
        width: 4.6rem;
        .sName {
          font-weight: normal;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 0.7rem;
            height: 0.31rem;
            background: url(../assets/img/songIcon.png);
            background-size: 100% 100%;
            margin-left: 0.13rem;
          }
        }
        .songNick {
          em {
            font-size: 0.24rem;
            color: rgba(165, 218, 255, 1);
          }
          strong {
            font-size: 0.24rem;
            color: rgba(201, 165, 255, 1);
          }
        }
      }
      .songStatusBtn {
        width: 1.7rem;
        height: 0.66rem;
        background: url(../assets/img/songActBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.66rem;
        color: rgba(174, 72, 0, 1);
        font-size: 0.26rem;
        em {
          font-weight: bold;
        }
        &.black {
          color: rgba(255, 255, 255, 1);
          background: url(../assets/img/songBlackBtn.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .overTime {
    width: 6.16rem;
    height: 2.82rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    position: relative;
    padding-top: 0.6rem;

    h3 {
      text-align: center;
      color: rgba(255, 213, 86, 1);
      font-size: 0.36rem;
      font-weight: bold;
    }
    p {
      text-align: center;
      font-size: 0.24rem;
      color: RGBA(255, 239, 255, 1);
      margin-top: 0.34rem;
    }
    .goBtn {
      width: 2.24rem;
      height: 0.84rem;
      line-height: 0.84rem;
      text-align: center;
      font-weight: bold;
      color: rgba(174, 72, 0, 1);
      background: url(../assets/img/ok.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
    }
  }
  .choiceSong {
    width: 5.7rem;
    // height: 7.23rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    position: relative;
    padding: 0.45rem 0.23rem 0.15rem;
    h3 {
      color: rgba(255, 213, 86, 1);
      font-size: 0.36rem;
      text-align: center;
      font-weight: 600;
    }
    .red {
      color: red;
      text-align: center;
      font-size: 0.24rem;
    }
    .choiceSongList {
      margin-top: 0.37rem;
      height: 3.8rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.12rem;
        border-radius: 0.01rem;
        padding-left: 0.3rem;
        .songMsg {
          .sName {
            font-weight: normal;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 0.7rem;
              height: 0.31rem;
              background: url(../assets/img/songIcon.png);
              background-size: 100% 100%;
              margin-left: 0.13rem;
            }
          }
          .songNick {
            color: rgba(221, 202, 255, 1);
            font-size: 0.22rem;
            em {
              font-size: 0.24rem;
            }
            strong {
              font-size: 0.24rem;
            }
          }
        }
        .songStatusBtn {
          width: 1.7rem;
          height: 0.66rem;
          background: url(../assets/img/songActBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.66rem;
          color: rgba(174, 72, 0, 1);
          font-size: 0.26rem;
          em {
            font-weight: bold;
          }
          &.black {
            color: rgba(255, 255, 255, 1);
            background: url(../assets/img/songBlackBtn.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .choicetips {
      p {
        font-size: 0.24rem;
        color: RGBA(255, 244, 255, 1);
      }
    }
  }
  .close {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.9rem;
  }
}
</style>
