<template>
  <div class="song">
    <h5 v-if="isLength">Pilih nyanyian yg Anda puaskan utk ikut kontes</h5>
    <h5 class="noSong" v-else>Anda blm ada nyanyian yg cocok persyarat masuk~</h5>
    <div class="songList" v-if="isLength">
      <ul>
        <li v-for="(item,index) in songList" :key="index">
          <div class="songLeft">
            <span class="name">{{item.name}}</span>
            <span class="tm">{{item.time}}</span>
          </div>
          <span class="joinBtn" @click="choiceSong(item.sid,index)">Ikut</span>
        </li>
      </ul>
    </div>
    <div class="goSing" :class="{border:isLength}">
      <p v-if="isLength> 0">apa tiada nyanyian yg Anda puaskan?</p>
      <div class="sing" @click="goSing()">Bernyanyi</div>
      <span>Ingat daftar stlh selesai bernyanyi~</span>
    </div>
    <p class="tips">1.Karya harus yg dipublikasikan selama acara (kecuali Vokal 5 menit)</p>
    <p class="tips">2.Bisa upload beberapa karya utk ikut acara, hadiah utk karya tersebut hanya akan dihitung stlh daftar</p>
    <p>3.Jika karya yg daftar dihapus selama acara, nilai pesona total dari karya yang dihapus akan dibatalkan</p>
    <div class="determinePup" v-if="showPup">
      <div class="determinCon">
        <p>Apakah Anda yakin untuk mengirimkan karya ini untuk kompetisi?</p>
        <div class="chang">
          <span class="no" @click="hdPup()"> Batal</span>
          <span class="ok" @click="changed()">Ya</span>
        </div>
      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" :tostTitle="tostTitle" :back="back" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig.js"
import Loading from "../../components/Loading"
import msgToast from "../../components/commonToast"
import getString from "../../utils/getString"
export default {
  components: { Loading, msgToast },
  data () {
    return {
      songList: [],
      showPup: false,
      songid: null,
      tastMsg: '',
      showT: false,
      songIndex: null,
      tostTitle: '',
      back: false
    }
  },
  computed: {
    isLength () {
      return this.songList.length > 0
    }
  },
  created () {
    document.title = 'Kontes Bintang Famili'
    api.getSongList().then((res) => { //请求歌曲列表
      console.log(res)
      if (res.data.response_status.code === 0) {
        this.songList = res.data.response_data.list
      }
    })
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    goSing () {
      location.href = "goto:songLibrary"
    },
    choiceSong (itemId, index) { //选择歌曲
      this.songid = itemId  //當前歌曲ID
      this.showPup = true
      this.songIndex = index //當前歌曲索引
    },
    changed () {
      api.selectSong(this.songid).then((res) => {
        if (res.data.response_status.code === 0) { //提交成功顯示OK提示
          this.showPup = false
          // let gift = res.data.response_data.gift
          // if (gift) {
          //   this.tostTitle = `送出心願歌曲成功`
          //   this.tastMsg = `恭喜你成功送出1首心願歌曲，獎勵${gift.count}個${gift.name}背包禮物，快去你的背包看看吧！`
          // } else {
          //   this.tostTitle = `送出心願歌曲成功 `
          //   this.tastMsg = `恭喜你成功送出1首心願歌曲，再接再厲唷!`
          // }
          // this.showT = true
          //刪除當前歌曲
          this.songList.splice(this.songIndex, 1)
          this.back = true
        } else {
          this.showPup = false
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    hdPup () {
      this.showPup = false
    },
    closeToast () {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(29, 14, 9, 1);
}
.noSong {
  color: rgba(207, 135, 110, 1);
}
.song {
  padding: 0.64rem 0.38rem 0.5rem;
  .determinePup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .determinCon {
      position: absolute;
      background: #2e3846;
      padding: 0.2rem 0.2rem 0.3rem;
      top: 5rem;
      left: 1rem;
      width: 5.5rem;
      text-align: center;
      .chang {
        margin-top: 0.2rem;
        span {
          display: inline-block;
          width: 2rem;
          height: 0.5rem;
          line-height: 0.5rem;
        }
        .ok {
          background: #f44a56;
          margin-left: 0.2rem;
        }
        .no {
          background: #795aac;
        }
      }
    }
  }
  > h5 {
    color: #fffde4;
    font-size: 0.33rem;
    text-align: center;
  }
  .bMsg {
    color: #fffde4;
    margin-top: 0.51rem;
    font-size: 0.26rem;
    text-align: center;
  }
  .songList {
    ul {
      border-radius: 0.12rem;
      padding: 0 0.25rem;
      margin-top: 0.31rem;
    }
    li {
      height: 1.35rem;
      display: flex;
      padding-left: 0.1rem;
      align-items: center;
      justify-content: space-between;
      border-top: 0.02rem solid RGBA(68, 44, 20, 1);
      .songLeft {
        span {
          display: block;
          height: 50%;
        }
        .name {
          color: rgba(238, 172, 104, 1);
          font-size: 0.26rem;
        }
        // .tm {
        //   color: #7f25de;
        //   font-size: 0.21rem;
        // }
      }
      .joinBtn {
        width: 1.38rem;
        height: 0.55rem;
        text-align: center;
        line-height: 0.55rem;
        font-size: 0.24rem;
        color: rgba(137, 63, 30, 1);
        background: url(../../assets/img/songBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .goSing {
    margin-top: 2.46rem;
    position: relative;
    &.border {
      border-bottom: 0.02rem solid RGBA(68, 44, 20, 1);
      margin-top: 1rem;
    }
    > p {
      color: rgba(238, 172, 104, 1);
      font-size: 0.26rem;
      text-align: center;
    }
    .sing {
      width: 2.15rem;
      height: 0.73rem;
      background: url(../../assets/img/actDayTitle.png);
      background-size: 100% 100%;
      margin: 0.4rem auto 0;
      text-align: center;
      line-height: 0.73rem;
      color: rgba(137, 63, 30, 1);
    }
    span {
      display: block;
      color: rgba(238, 172, 104, 1);
      font-size: 0.26rem;
      margin: 0.45rem 0;
      text-align: center;
    }
  }
}
.tips {
  font-size: 0.24rem;
  color: rgba(207, 135, 110, 1);
  margin: 0.4rem 0;
  em {
    color: rgba(237, 114, 72, 1);
    font-size: 0.24rem;
  }
}
@import '../../assets/scss/common.scss';
</style>
