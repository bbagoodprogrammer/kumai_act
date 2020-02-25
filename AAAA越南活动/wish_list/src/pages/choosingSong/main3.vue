<template>
  <div class="ChoosingSong">
    <div class="top">
      <textarea maxlength="300" placeholder="Mời viết điều ước trên 4 từ để được dễ dàng thực hiện!" @input="descInput()" v-model="desc">
      </textarea>
      <span class="strLength">{{remnant}}/300</span>
    </div>
    <div class="bottom">
      <p class="title" v-if="!isChoosing">Mời chọn 1 bài hát</p>
      <p class="title2" v-else>{{songItem.name}}</p>
      <div class="btnBox" v-if="!isChoosing">
        <span class="btn" @click="showSongListPup()"></span>
      </div>
      <div v-else class="songUserName">{{songItem.artist}}
      </div>
      <p class="tips">
        Sau khi điền xong mới có thể gửi
      </p>
    </div>
    <div class="footer" :class="{active:isChoosing&& desc!== ''}" @click="Release()">
      <span>Gửi Điều Ước</span>
    </div>
    <transition name="slide">
      <div class="choosingSongPup" v-show="showSongList">
        <div class="shear">
          <input type="text" placeholder="Tên bài hát/Tên ca sĩ" v-model="sheraVal" />
          <span class="go" @click="goSearch()"></span>
        </div>
        <p v-if="songList.length == 0" class="noSong">Chưa có bài này</p>
        <ul class="scrollable">
          <li v-for="(item,index) in songList" :key="index">
            <div class="songMsg">
              <span class="songName">{{item.name}}</span>
              <span class="songSize">{{(item.size/1024/1024).toFixed(2)}}M {{item.artist}}</span>
            </div>
            <span class="queding" @click="defineSong(item)"></span>
          </li>
        </ul>
      </div>
    </transition>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import api from '../../api/apiConfig'
import getString from "../../utils/getString"
import MsgToast from "../../components/commonToast"
import Loading from "../../components/Loading"
export default {
  components: { Loading, MsgToast },
  data() {
    return {
      showChoosing: false,
      desc: '',  //当前表单输入字符
      remnant: 0, //当前表单剩余字符
      showSongList: false,
      songList: [], //搜索歌曲列表
      sheraVal: '', //搜索内容
      copyVal: '',
      more: true, //滚动加载
      loaded: false,
      songItem: {},
      isChoosing: false, //是否已选歌
      tastMsg: '',
      showT: false
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    descInput() {
      this.remnant = this.desc.length
    },
    showSongListPup() {
      api.shareSong('first', 0).then(res => {
        this.songList = res.data.response_data.list
        this.showSongList = true
      })
    },
    goSearch() {
      if (this.sheraVal != '') {
        api.shareSong(this.sheraVal, 0).then((res) => {
          if (res.data.response_status.code === 0) {
            this.songList = res.data.response_data.list
            this.copyVal = JSON.parse(JSON.stringify(this.sheraVal))
          }
        })
      }
    },
    defineSong(item) {
      this.songItem = item
      this.isChoosing = true
      this.showSongList = false
    },
    Release() {
      if (this.isChoosing && this.desc !== '') {
        let newSongItem = this.songItem
        api.releaseWish(this.desc, newSongItem.id, newSongItem.name, newSongItem.artist).then((res) => {
          if (res.data.response_status.code === 0) {//发布成功
            let regstr = getString('token')
            location.href = `./index.html?token=${regstr}`
          } else {//错误显示
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          let tips = ''
          if (this.copyVal == '') {
            tips = 'first'
          } else {
            tips = this.copyVal
          }
          api.shareSong(this.copyVal, this.songList.length).then((res) => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.songList = this.songList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
.ChoosingSong {
  position: fixed;
  background: #2d0080;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .top {
    position: relative;
    textarea {
      width: 6.38rem;
      height: 4.88rem;
      padding: 0.56rem 0.56rem;
      outline: none;
      resize: none;
      color: #aaa3bd;
      background: #240066;
      font-size: 93%;
      border: none;
    }
    .strLength {
      position: absolute;
      right: 0.24rem;
      bottom: 0.24rem;
      height: 0.25rem;
      font-size: 80%;
      color: #7f749e;
    }
  }
  .bottom {
    height: 6.24rem;
    padding-top: 1.1rem;
    background: #2d0080;
    text-align: center;
    .title {
      font-size: 140%;
      color: #72f1fc;
    }
    .title2 {
      font-size: 140%;
      color: #72f1fc;
    }
    .btnBox {
      text-align: center;
      .btn {
        display: inline-block;
        width: 2.44rem;
        height: 0.72rem;
        margin-top: 0.2rem;
        background: url(../../assets/img/goChioos.png);
        background-size: 100% 100%;
      }
    }
    .songUserName {
      font-size: 140%;
      color: #72f1fc;
    }
    .tips {
      font-size: 93%;
      color: #ffffff;
      text-align: center;
      margin-top: 1.13rem;
    }
  }
  .footer {
    width: 7.5rem;
    height: 2.03rem;
    background: url(../../assets/img/blackFooterBg.png);
    background-size: 100% 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      background: url(../../assets/img/footerBg.png);
      background-size: 100% 100%;
    }
    span {
      color: #fffde3;
      font-size: 160%;
      margin-top: 0.6rem;
    }
  }
  .choosingSongPup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2d0080;
    padding: 0.44rem 0.25rem;
    .noSong {
      text-align: center;
      margin-top: 0.2rem;
    }
    .shear {
      width: 7rem;
      height: 0.66rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 0.33rem;
      display: flex;
      align-items: center;
      input {
        width: 80%;
        height: 100%;
        background: none;
        outline: none;
        border: none;
        color: #7f749e;
        padding-left: 0.2rem;
      }
      .go {
        display: block;
        width: 1.08rem;
        height: 0.51rem;
        background: url(../../assets/img/goShare.png);
        background-size: 100% 100%;
      }
    }
    ul {
      width: 7.02rem;
      height: 11.5rem;
      margin-top: 0.14rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 0.25rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        opacity: 1;
        padding: 0.26rem 0 0 0.28rem;
        border-bottom: 0.015rem solid #1f0354;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .songMsg {
          width: 5.4rem;
          span {
            height: 50%;
            display: block;
          }
          .songName {
            font-size: 120%;
            color: #fff;
          }
          .songSize {
            font-size: 70%;
            color: #7f25de;
          }
        }
        .queding {
          display: block;
          margin-right: 0.2rem;
          width: 1.25rem;
          height: 0.4rem;
          background: url(../../assets/img/queding.png);
          background-size: 100% 100%;
        }
      }
    }
    ul::-webkit-scrollbar {
      width: 0rem;
    }
    ul::-webkit-scrollbar-thumb {
      background: #7f25de;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
