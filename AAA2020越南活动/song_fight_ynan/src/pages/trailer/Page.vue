<template>
  <div class="trailer">
    <div class="title">List nhạc võ đài</div>
    <div class="searchBox">
      <input type="text" placeholder="Bài hát/Ca sĩ" v-on:input="inputChange()" v-model="searchMsg">
      <span class="search" @click="search()"></span>
    </div>
    <p class="tips">Kỳ sau {{stime}}-{{etime}}<br />Bài hát đăng vào thời gian võ đài kỳ sau mới được tham gia</p>
    <div class="noSongTips">
      <h3 v-if="noData">Không có bài này trong danh sách kỳ sau</h3>
    </div>
    <ul class="songList scrollable">
      <li v-for="(item,index) in showSong" :key="index">
        <div class="songMsg">
          <div class="sName">{{item.name}}<i v-if="item.mp3!=''"></i> </div>
          <div class="songNick"><em>{{item.artist}}</em></div>
        </div>
        <div class="songStatusBtn" @click="goSong(item.accid)">
          <em>Luyện tập</em>
        </div>
      </li>
    </ul>
    <loading />
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import getDate from "../../utils/getDate"
export default {
  components: { loading },
  data() {
    return {
      sList: [],
      showSong: [],
      loaded: false,
      more: true,
      searchMsg: '',
      noData: false,
      time: {},
      version_allowed: null
    }
  },
  computed: {
    stime() {
      if (this.time.stime) {
        return getDate(new Date(this.time.stime * 1000), 2)
      }
    },
    etime() {
      if (this.time.etime) {
        return getDate(new Date(this.time.etime * 1000), 2)
      }
    }
  },
  created() {
    document.title = 'List nhạc võ đài'
    this.version_allowed = sessionStorage.getItem('version_allowed')
    api.getNextSong().then(res => {
      console.log(res)
      this.sList = res.data.response_data.data
      this.time = res.data.response_data.time
      this.showSong = this.sList
    })
  },
  mounted() {
    // this.scrollable = this.$el.querySelector('.scrollable');
    // if (this.scrollable) {
    //   this.scrollable.addEventListener('scroll', this.onScroll);
    // }
  },
  methods: {
    inputChange() {
      this.showSong = this.sList
      this.noData = false
    },
    // onScroll() {
    //   const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
    //   if (scrollToBottom) { //滾動加載，沒有加載完成
    //     if (this.loaded) return
    //     if (this.more) {
    //       this.more = false
    //       api.getNextSong(this.sList.length, 'more').then(res => {
    //         this.more = true
    //         if (res.data.response_data.list.length === 0) {
    //           this.loaded = true
    //         } else {
    //           this.sList = this.sList.concat(res.data.response_data.list)
    //         }
    //       })
    //     }
    //   }
    // },
    goSong(sid) {
      // location.href = `record:${sid}`
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i); //ios终端
      if (isiOS) {
        location.href = `accid:${sid}`
        return
      }
      if (this.version_allowed) {
        location.href = `record:${sid}`
      } else {
        // this.vxc('setToast', {
        //   title: '無法參加打擂',
        //   msg: '您的APP版本過低，無法使用本活動的部分功能，請更新至最新版本喔～'
        // })
        location.href = `accid:${sid}`
      }
      // location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
    },
    search() {
      if (this.searchMsg != '') {
        api.searchSong(this.searchMsg, 1).then(res => {
          const data = res.data.response_data.data
          if (data.length) {
            this.showSong = data
          } else {
            this.noData = true
            this.showSong = []
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .trailer {
    padding: 0.41rem 0.47rem 0;
    .title {
      text-align: center;
      font-size: 0.48rem;
      font-weight: bold;
      color: rgba(255, 213, 86, 1);
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
      margin: 0.3rem auto;
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
        background: url(../../assets/img/searchIcon.png);
        background-size: 100% 100%;
      }
    }
    .tips {
      font-size: 0.24rem;
      color: RGBA(255, 240, 255, 1);
      text-align: center;
      line-height: 0.4rem;
    }
    .noSongTips {
      text-align: center;
      margin-top: 0.52rem;
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
    .songList {
      margin-top: 0.25rem;
      height: 9.6rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.12rem;
        border-bottom: 0.02rem solid rgba(138, 90, 255, 1);
        border-radius: 0.01rem;
        padding-left: 0.15rem;
        .songMsg {
          .sName {
            font-weight: normal;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 0.7rem;
              height: 0.31rem;
              background: url(../../assets/img/songIcon.png);
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
          background: url(../../assets/img/songActBtn.png);
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
            background: url(../../assets/img/songBlackBtn.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
