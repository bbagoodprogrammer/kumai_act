<template>
  <div class="hotSong " :class="{max:length>1,con:length==1}">
    <div class="searchBox">
      <input type="text" :placeholder="songNum" v-on:input="inputChange()" v-model="searchSong">
      <span class="search" @click="search()"></span>
    </div>
    <div class="noSongTips" v-if="nextTips || noTips">
      <div class="next" v-show="nextTips">
        <h3>Lagu ini adalah lagu arena berikutnya</h3>
        <p>Berlatihlah</p>
        <p>Lagu latihan yg diposting tidak termasuk lagu arena lain kali tidak  bisa mendaftar utk ikut acara</p>
      </div>
      <div class="noSong" v-show="noTips">
        <h3>Lagu arena ini gak ada dlm periode ini</h3>
        <p>Mari kita lihat lagu hot </p>
      </div>
    </div>
    <ul class="hotSongList">
      <li v-for="(item,index) in showSong" :key="index">
        <div class="songMsg">
          <!-- <i v-if="item.mp3 != ''"></i> -->
          <div class="sName">{{item.name}} </div>
          <div class="songNick"><em>{{item.artist}}</em><strong> / org lakukan arena {{item.join}} </strong></div>
        </div>
        <div class="songStatusBtn" :class="{black:!can||item.deleted}">
          <em v-if="item.deleted">Udah keluar arena</em>
          <em v-else-if="item.current ==1" @click="goSong(item.accid)">Berlatih</em>
          <em v-else-if="item.status == 0" @click="goSong(item.accid)">Arena</em>
          <em v-else-if="item.status == 1" @click="commitSong(item.accid,index)">Kirim nyanyian</em>
          <em v-else-if="item.status == 2">Udah ikut arena</em>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="isOverTime">
      <transition name="slide">
        <div class="overTime" v-show="isOverTime">
          <i class="close" @click="closeOverTime()"></i>
          <h3>Gak bisa ikut arena</h3>
          <p>Waktu arena sudah berakhir, ayo menjadi juri utk kasih skor! Hadiah Super menunggumu</p>
          <div class="goBtn" @click="goSongVote()">Menjadi juri</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="cSongPup">
      <transition name="slide">
        <div class="choiceSong" v-if="cSongPup">
          <i class="close" @click="closeSongPup()"></i>
          <h3>Pilih nyanyianmu yg paling memuaskan utk ikut acara</h3>
          <!-- <p class="red"> 歌曲提交後，若活動期間刪除一首打擂歌曲，則分數扣2分</p> -->
          <ul class="choiceSongList">
            <li v-for="(item,index) in mySong" :key="index">
              <div class="songMsg">
                <!-- <i></i> -->
                <div class="sName">{{item.name}} </div>
                <!-- <em>{{item.artist}}</em><strong> / 打擂 {{item.join}} 人</strong> -->
                <div class="songNick">{{getDateSecond(item.addtime)}}</div>
              </div>
              <div class="songStatusBtn" @click="commit(item)">
                <em>Pilih</em>
              </div>
            </li>
          </ul>
          <div class="choicetips">
            <p>1. Anda perlu menyanyikan lagu resmi yg ditentukan(yaitu Anda perlu menyanyikan lagu iringan yg melompat setelah Klik Lagu Arena)setelah pukul {{time}} utk berpartisipasi dalam acara, menyanyikan lagu iringan lain tidak bisa ikut acara.</p>
            <p>2. Jenis nyanyian yg ikut acara hanya terbatas pada solo</p>
            <p>3. Satu lagu iringan hanya dapat dipilih 1 nyanyian untuk ikut acara</p>
            <p>4. Beberapa lagu iringan dapat dipilih untuk berpartisipasi dalam arena di setiap periode. Pengguna akan menerima 1 hadiah ransel ketika setiap kali upload 1 lagu arena(setiap orang hanya bisa menerima sebanyak 1 hadiah, dan banyak hadiah ransel akan dkirimkan secara acak).</p>
            <p>5. Pengguna yang ikut acara harus memiliki setidaknya 1 lagu online setelah acara berakhir, dan mereka akan dptkan 50 kacang emas.</p>
            <p>6. Selama acara, kalo hapus 1 lagu yg ikut acara ,kamu akan dikurangi 1 poin. </p>
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
  data() {
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
    hotSong(val) {
      this.showSong = val
    }
  },
  computed: {
    ...mapState(['hotSong', 'can', 'isShare', 'act', 'version_allowed']),
    time() {
      return getDate(new Date(this.act.stime * 1000), 3)
    },
    songNum() {
      return `Lagu arena periode ini(${this.hotSong.length})`
    }
  },
  methods: {
    inputChange() {
      this.showSong = this.hotSong
      this.nextTips = false
      this.noTips = false
    },
    search() {
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
    closeOverTime() {
      this.isOverTime = false
    },
    closeSongPup() {
      this.cSongPup = false
    },
    goSongVote() {
      let regstr = getString('token')
      location.href = `./songVote.html?token=${regstr}`
    },
    goSong(id) {
      globalBus.$emit('commonEvent', () => {
        if (!this.can) {
          this.isOverTime = true
          return
        }
        // if (!this.is_push) {
        //   this.vxc('setToast', {
        //     msg: "每人每期最多僅可參加20首歌曲打擂"
        //   })
        //   return
        // }
        var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i); //ios终端
        if (!this.update) {
          this.vxc('setToast', {
            msg: "Versi ini terlalu rendah ,gak bisa ikut acara! Silakan pergi ke App Store utk mengunduh \"Wekara\" utk ikut acara"
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
    commitSong(sid, cindex) {
      if (!this.can) {
        this.isOverTime = true
        return
      }
      // if (!this.is_push) {
      //   this.vxc('setToast', {
      //     msg: "每人每期最多僅可參加20首歌曲打擂"
      //   })
      //   return
      // }
      this.sid = sid
      this.cindex = cindex
      api.searchMySong(sid).then(res => {
        this.mySong = res.data.response_data.data
        this.cSongPup = true
      })
    },
    commit(item) {
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
    getDateSecond(tm) {
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
        color: rgba(174, 72, 0, 1);
        font-size: 0.26rem;
        em {
          height: 100%;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.25rem;
          font-size: 0.26rem;
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
